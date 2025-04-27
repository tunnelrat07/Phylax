module defi_platform::lending_pool {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::table::{Self, Table};
    use sui::event;
    use sui::clock::{Self, Clock};
    
    use defi_platform::reputation_registry::{Self, ReputationRegistry};
    
    // Type aliases for clarity
    const SECONDS_PER_YEAR: u64 = 31536000; // 365 days
    
    // Pool Asset configuration
    struct AssetConfig has store {
        // Interest rate model parameters
        base_rate: u64, // Base interest rate (in basis points)
        slope1: u64, // Slope for utilization below optimal
        slope2: u64, // Slope for utilization above optimal
        optimal_utilization: u64, // Optimal utilization point (in basis points)
        
        // Risk parameters
        collateral_factor: u64, // Max % of asset value that can be borrowed against (in basis points)
        liquidation_threshold: u64, // Threshold for liquidation (in basis points)
        liquidation_penalty: u64, // Penalty for liquidation (in basis points)
        
        // Pool constraints
        min_deposit: u64,
        deposit_cap: u64, // Maximum amount that can be deposited
    }
    
    // Market structure for each asset
    struct Market<phantom T> has key, store {
        id: UID,
        reserves: Balance<T>, // Total reserves
        total_borrowed: u64, // Total borrowed amount
        total_deposits: u64, // Total deposits
        cumulative_interest_rate: u64, // Accumulated interest (scaled by 1e18)
        last_update_timestamp: u64, // Last time interest was calculated
        config: AssetConfig, // Market configuration
    }
    
    // Pool that holds all markets
    struct LendingPool has key {
        id: UID,
        markets: Table<vector<u8>, address>, // Token type -> Market address
        admin: address,
    }
    
    // Deposit receipt to track user deposits
    struct DepositReceipt<phantom T> has key, store {
        id: UID,
        owner: address,
        amount: u64,         // Original deposit amount
        shares: u64,         // Pool shares (for interest accounting)
        deposit_timestamp: u64,
    }
    
    // Loan structure to track borrowing
    struct Loan<phantom T> has key, store {
        id: UID,
        borrower: address,
        principal: u64,
        interest_rate: u64,  // Annual interest rate in basis points
        collateral_factor: u64, // Required collateral % in basis points
        origination_timestamp: u64,
        last_interest_update: u64,
        duration: u64,       // Loan duration in seconds
        repaid: bool,
        defaulted: bool,
        insured: bool,       // Whether loan has insurance
        insurance_id: ID,    // Reference to insurance object if insured
    }
    
    // Events
    struct DepositEvent has copy, drop {
        depositor: address,
        asset_type: vector<u8>,
        amount: u64,
        shares: u64,
    }
    
    struct WithdrawEvent has copy, drop {
        withdrawer: address,
        asset_type: vector<u8>,
        amount: u64,
        shares: u64,
    }
    
    struct BorrowEvent has copy, drop {
        borrower: address,
        asset_type: vector<u8>,
        amount: u64,
        interest_rate: u64,
        collateral_factor: u64,
        duration: u64,
    }
    
    struct RepayEvent has copy, drop {
        borrower: address,
        asset_type: vector<u8>,
        principal: u64,
        interest: u64,
    }
    
    // === Functions ===
    
    fun init(ctx: &mut TxContext) {
        let pool = LendingPool {
            id: object::new(ctx),
            markets: table::new(ctx),
            admin: tx_context::sender(ctx),
        };
        
        transfer::share_object(pool);
    }
    
    // Create a new market for an asset
    public fun create_market<T>(
        pool: &mut LendingPool,
        base_rate: u64,
        slope1: u64,
        slope2: u64,
        optimal_utilization: u64,
        collateral_factor: u64,
        liquidation_threshold: u64,
        liquidation_penalty: u64,
        min_deposit: u64,
        deposit_cap: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == pool.admin, 1); // Only admin
        
        let config = AssetConfig {
            base_rate,
            slope1,
            slope2,
            optimal_utilization,
            collateral_factor,
            liquidation_threshold,
            liquidation_penalty,
            min_deposit,
            deposit_cap,
        };
        
        let market = Market<T> {
            id: object::new(ctx),
            reserves: balance::zero<T>(),
            total_borrowed: 0,
            total_deposits: 0,
            cumulative_interest_rate: 1000000000000000000, // 1e18 initial value
            last_update_timestamp: tx_context::epoch_timestamp_ms(ctx),
            config,
        };
        
        let market_id = object::id(&market);
        let type_bytes = type_name::into_string(type_name::get<T>());
        
        table::add(&mut pool.markets, type_bytes, market_id);
        transfer::share_object(market);
    }
    
    // Deposit assets into the pool
    public fun deposit<T>(
        pool: &LendingPool,
        market: &mut Market<T>,
        coin: Coin<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&coin);
        assert!(amount >= market.config.min_deposit, 1); // Below min deposit
        assert!(market.total_deposits + amount <= market.config.deposit_cap, 2); // Above deposit cap
        
        // Update market state with accumulated interest
        update_market_interest(market, clock);
        
        // Calculate shares based on current pool state
        let shares = calculate_shares(amount, market.total_deposits, market.total_borrowed);
        
        // Update market state
        let balance = coin::into_balance(coin);
        balance::join(&mut market.reserves, balance);
        market.total_deposits = market.total_deposits + amount;
        
        // Create deposit receipt
        let receipt = DepositReceipt<T> {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            amount,
            shares,
            deposit_timestamp: clock::timestamp_ms(clock),
        };
        
        transfer::transfer(receipt, tx_context::sender(ctx));
        
        // Emit deposit event
        event::emit(DepositEvent {
            depositor: tx_context::sender(ctx),
            asset_type: type_name::into_string(type_name::get<T>()),
            amount,
            shares,
        });
    }
    
    // Withdraw assets from the pool
    public fun withdraw<T>(
        pool: &LendingPool,
        market: &mut Market<T>,
        receipt: DepositReceipt<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ): Coin<T> {
        // Update market state with accumulated interest
        update_market_interest(market, clock);
        
        // Calculate withdraw amount based on shares
        let withdraw_amount = calculate_withdraw_amount(receipt.shares, market.total_deposits, market.total_borrowed);
        
        // Ensure pool has enough liquidity
        assert!(balance::value(&market.reserves) >= withdraw_amount, 1); // Insufficient liquidity
        
        // Update market state
        market.total_deposits = market.total_deposits - withdraw_amount;
        
        // Extract coins from reserves
        let withdrawn_balance = balance::split(&mut market.reserves, withdraw_amount);
        let withdrawn_coin = coin::from_balance(withdrawn_balance, ctx);
        
        // Clean up receipt
        let DepositReceipt { id, owner: _, amount: _, shares, deposit_timestamp: _ } = receipt;
        object::delete(id);
        
        // Emit withdraw event
        event::emit(WithdrawEvent {
            withdrawer: tx_context::sender(ctx),
            asset_type: type_name::into_string(type_name::get<T>()),
            amount: withdraw_amount,
            shares,
        });
        
        withdrawn_coin
    }
    
    // Borrow assets from the pool
    public fun borrow<T>(
        pool: &LendingPool,
        market: &mut Market<T>,
        reputation_registry: &ReputationRegistry,
        amount: u64,
        duration: u64, // Loan duration in seconds
        insured: bool,
        insurance_id: Option<ID>,
        clock: &Clock,
        ctx: &mut TxContext
    ): Coin<T> {
        let borrower = tx_context::sender(ctx);
        
        // Determine collateral factor based on reputation
        let base_collateral_factor = reputation_registry::calculate_collateral_factor(reputation_registry, borrower);
        
        // Determine interest rate based on reputation and market conditions
        let base_interest_rate = reputation_registry::calculate_interest_rate(reputation_registry, borrower);
        
        // If insured, adjust collateral factor and interest rate
        let final_collateral_factor = if (insured) {
            // Insured loans can have lower collateral requirements
            base_collateral_factor / 2
        } else {
            base_collateral_factor
        };
        
        let final_interest_rate = if (insured) {
            // Insured loans might have slightly higher interest to cover insurance cost
            base_interest_rate + 100 // Add 1% premium
        } else {
            base_interest_rate
        };
        
        // Ensure pool has enough liquidity
        assert!(balance::value(&market.reserves) >= amount, 1); // Insufficient liquidity
        
        // Update market state with accumulated interest
        update_market_interest(market, clock);
        
        // Update market state
        market.total_borrowed = market.total_borrowed + amount;
        
        // Create loan object
        let loan = Loan<T> {
            id: object::new(ctx),
            borrower,
            principal: amount,
            interest_rate: final_interest_rate,
            collateral_factor: final_collateral_factor,
            origination_timestamp: clock::timestamp_ms(clock),
            last_interest_update: clock::timestamp_ms(clock),
            duration,
            repaid: false,
            defaulted: false,
            insured,
            insurance_id: if (option::is_some(&insurance_id)) { option::extract(&mut insurance_id) } else { object::id_from_address(@0x0) },
        };
        
        // Extract coins from reserves
        let borrowed_balance = balance::split(&mut market.reserves, amount);
        let borrowed_coin = coin::from_balance(borrowed_balance, ctx);
        
        // Update borrower's reputation
        let reputation_admin = reputation_registry::get_admin_cap();
        reputation_registry::update_reputation(
            reputation_admin,
            reputation_registry,
            borrower,
            1, // Loan taken
            amount,
            10, // Small positive impact for taking loan
            ctx
        );
        
        transfer::transfer(loan, borrower);
        
        // Emit borrow event
        event::emit(BorrowEvent {
            borrower,
            asset_type: type_name::into_string(type_name::get<T>()),
            amount,
            interest_rate: final_interest_rate,
            collateral_factor: final_collateral_factor,
            duration,
        });
        
        borrowed_coin
    }
    
    // Repay loan
    public fun repay<T>(
        market: &mut Market<T>,
        loan: &mut Loan<T>,
        reputation_registry: &ReputationRegistry,
        payment: Coin<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(!loan.repaid && !loan.defaulted, 1); // Loan already settled
        
        // Calculate accrued interest
        let elapsed_time = clock::timestamp_ms(clock) - loan.last_interest_update;
        let interest_factor = (elapsed_time as u256) * (loan.interest_rate as u256) / 10000 / SECONDS_PER_YEAR;
        let interest_amount = ((loan.principal as u256) * interest_factor / 1000000000000000000 as u64);
        let total_due = loan.principal + interest_amount;
        
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= total_due, 2); // Insufficient payment
        
        // Update market state
        market.total_borrowed = market.total_borrowed - loan.principal;
        balance::join(&mut market.reserves, coin::into_balance(payment));
        
        // Update loan state
        loan.repaid = true;
        loan.last_interest_update = clock::timestamp_ms(clock);
        
        // Update borrower's reputation
        let reputation_admin = reputation_registry::get_admin_cap();
        reputation_registry::update_reputation(
            reputation_admin,
            reputation_registry,
            loan.borrower,
            2, // Repayment
            total_due,
            50, // Significant positive impact for repaying
            ctx
        );
        
        // Emit repay event
        event::emit(RepayEvent {
            borrower: loan.borrower,
            asset_type: type_name::into_string(type_name::get<T>()),
            principal: loan.principal,
            interest: interest_amount,
        });
        
        // Return excess payment if any
        if (payment_amount > total_due) {
            let return_amount = payment_amount - total_due;
            let return_balance = balance::split(&mut market.reserves, return_amount);
            let return_coin = coin::from_balance(return_balance, ctx);
            transfer::transfer(return_coin, loan.borrower);
        }
    }
    
    // Handle default
    public fun handle_default<T>(
        market: &mut Market<T>,
        loan: &mut Loan<T>,
        reputation_registry: &ReputationRegistry,
        insurance_pool: &mut insurance_pool::InsurancePool<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(!loan.repaid && !loan.defaulted, 1); // Loan already settled
        
        // Check if loan has expired
        let current_time = clock::timestamp_ms(clock);
        let expiry_time = loan.origination_timestamp + (loan.duration * 1000); // Convert seconds to ms
        
        assert!(current_time > expiry_time, 2); // Loan not yet expired
        
        // Calculate accrued interest
        let elapsed_time = current_time - loan.last_interest_update;
        let interest_factor = (elapsed_time as u256) * (loan.interest_rate as u256) / 10000 / SECONDS_PER_YEAR;
        let interest_amount = ((loan.principal as u256) * interest_factor / 1000000000000000000 as u64);
        let total_due = loan.principal + interest_amount;
        
        // Mark loan as defaulted
        loan.defaulted = true;
        loan.last_interest_update = current_time;
        
        // Update market state
        market.total_borrowed = market.total_borrowed - loan.principal;
        
        // Process insurance claim if loan is insured
        if (loan.insured) {
            insurance_pool::process_claim(
                insurance_pool,
                loan.insurance_id,
                loan.principal,
                interest_amount,
                ctx
            );
            
            // Add back the principal to the reserves
            balance::join(&mut market.reserves, balance::create_with_value<T>(loan.principal));
        };
        
        // Update borrower's reputation
        let reputation_admin = reputation_registry::get_admin_cap();
        reputation_registry::update_reputation(
            reputation_admin,
            reputation_registry,
            loan.borrower,
            3, // Default
            total_due,
            -200, // Significant negative impact for defaulting
            ctx
        );
    }
    
    // Internal function to update market interest
    fun update_market_interest<T>(market: &mut Market<T>, clock: &Clock) {
        let current_time = clock::timestamp_ms(clock);
        let time_elapsed = current_time - market.last_update_timestamp;
        
        if (time_elapsed == 0 || market.total_borrowed == 0) {
            // No time elapsed or no borrowing, no interest to accrue
            market.last_update_timestamp = current_time;
            return
        };
        
        // Calculate utilization rate
        let utilization_rate = if (market.total_deposits == 0) {
            0
        } else {
            (market.total_borrowed * 10000) / market.total_deposits
        };
        
        // Calculate interest rate based on utilization
        let interest_rate = if (utilization_rate <= market.config.optimal_utilization) {
            market.config.base_rate + (utilization_rate * market.config.slope1) / market.config.optimal_utilization
        } else {
            market.config.base_rate + market.config.slope1 + 
            ((utilization_rate - market.config.optimal_utilization) * market.config.slope2) / 
            (10000 - market.config.optimal_utilization)
        };
        
        // Calculate interest factor for the elapsed time period
        let interest_factor = (time_elapsed as u256) * (interest_rate as u256) / (SECONDS_PER_YEAR * 1000) / 10000;
        
        // Update cumulative interest rate
        market.cumulative_interest_rate = market.cumulative_interest_rate + 
            ((market.cumulative_interest_rate as u256) * interest_factor / 1000000000000000000 as u64);
        
        market.last_update_timestamp = current_time;
    }
    
    // Calculate shares for a deposit
    fun calculate_shares(deposit_amount: u64, total_deposits: u64, total_borrowed: u64): u64 {
        if (total_deposits == 0) {
            // First deposit gets shares equal to deposit amount
            return deposit_amount
        };
        
        // Calculate total pool value including borrowed funds
        let total_pool_value = total_deposits + total_borrowed;
        
        // Calculate shares proportional to contribution
        ((deposit_amount as u256) * (total_pool_value as u256) / (total_deposits as u256) as u64)
    }
    
    // Calculate withdraw amount based on shares
    fun calculate_withdraw_amount(shares: u64, total_deposits: u64, total_borrowed: u64): u64 {
        if (total_deposits == 0) {
            return 0 // No deposits, no withdraw
        };
        
        // Calculate total pool value including borrowed funds
        let total_pool_value = total_deposits + total_borrowed;
        
        // Calculate withdraw amount proportional to shares
        ((shares as u256) * (total_pool_value as u256) / (total_deposits as u256) as u64)
    }
}