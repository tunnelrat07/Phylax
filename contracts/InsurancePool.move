module defi_platform::insurance_pool {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::table::{Self, Table};
    use sui::event;
    use sui::clock::{Self, Clock};
    
    use defi_platform::reputation_registry::{Self, ReputationRegistry};
    use defi_platform::lending_pool::{Self, Loan};
    
    // Insurance pool for a specific asset
    struct InsurancePool<phantom T> has key {
        id: UID,
        reserves: Balance<T>, // Insurance pool reserves
        total_coverage: u64, // Total coverage provided
        total_premiums: u64, // Total premiums collected
        claims_paid: u64, // Total claims paid
        policies: Table<ID, InsurancePolicy>, // Insurance policies by ID
        admin: address,
    }
    
    // Insurance policy
    struct InsurancePolicy has store {
        policy_id: ID,
        loan_id: ID, // Associated loan
        borrower: address,
        coverage_amount: u64,
        premium_amount: u64,
        premium_rate: u64, // In basis points
        start_timestamp: u64,
        expiry_timestamp: u64,
        active: bool,
        claimed: bool,
    }
    
    // User-held policy certificate
    struct PolicyCertificate has key, store {
        id: UID,
        policy_id: ID,
        borrower: address,
        coverage_amount: u64,
        premium_paid: u64,
        expiry_timestamp: u64,
    }
    
    // Events
    struct PolicyCreated has copy, drop {
        policy_id: ID,
        loan_id: ID,
        borrower: address,
        coverage_amount: u64,
        premium_amount: u64,
        premium_rate: u64,
        expiry_timestamp: u64,
    }
    
    struct ClaimPaid has copy, drop {
        policy_id: ID,
        loan_id: ID,
        borrower: address,
        coverage_amount: u64,
        principal: u64,
        interest: u64,
    }
    
    // === Functions ===
    
    fun init(ctx: &mut TxContext) {
        let pool = InsurancePool<T> {
            id: object::new(ctx),
            reserves: balance::zero<T>(),
            total_coverage: 0,
            total_premiums: 0,
            claims_paid: 0,
            policies: table::new(ctx),
            admin: tx_context::sender(ctx),
        };
        
        transfer::share_object(pool);
    }
    
    // Create a new insurance policy for a loan
    public fun create_policy<T>(
        pool: &mut InsurancePool<T>,
        loan: &Loan<T>,
        reputation_registry: &ReputationRegistry,
        premium_payment: Coin<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ): ID {
        let borrower = loan.borrower;
        assert!(tx_context::sender(ctx) == borrower, 1); // Only borrower can insure
        assert!(!loan.repaid && !loan.defaulted, 2); // Loan already settled
        assert!(!loan.insured, 3); // Loan already insured
        
        let coverage_amount = loan.principal;
        
        // Calculate premium rate based on borrower's reputation
        let base_premium_rate = calculate_premium_rate(reputation_registry, borrower);
        
        // Calculate premium amount
        let premium_amount = (coverage_amount * base_premium_rate) / 10000;
        
        // Verify premium payment
        let payment_amount = coin::value(&premium_payment);
        assert!(payment_amount >= premium_amount, 4); // Insufficient premium
        
        // Add premium to reserves
        balance::join(&mut pool.reserves, coin::into_balance(premium_payment));
        
        // Calculate policy expiry (same as loan duration)
        let expiry_timestamp = loan.origination_timestamp + (loan.duration * 1000); // Convert seconds to ms
        
        // Create policy
        let policy_
        // Create a new insurance policy for a loan (continued)
    public fun create_policy<T>(
        pool: &mut InsurancePool<T>,
        loan: &Loan<T>,
        reputation_registry: &ReputationRegistry,
        premium_payment: Coin<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ): ID {
        // ...continuing from before

        // Create policy object
        let policy_id = object::new(ctx);
        let policy = InsurancePolicy {
            policy_id: object::uid_to_inner(&policy_id),
            loan_id: loan.id,
            borrower,
            coverage_amount,
            premium_amount,
            premium_rate: base_premium_rate,
            start_timestamp: clock::timestamp_ms(clock),
            expiry_timestamp,
            active: true,
            claimed: false,
        };
        
        // Create certificate for borrower
        let certificate = PolicyCertificate {
            id: object::new(ctx),
            policy_id: object::uid_to_inner(&policy_id),
            borrower,
            coverage_amount,
            premium_paid: premium_amount,
            expiry_timestamp,
        };
        
        // Add policy to pool
        table::add(&mut pool.policies, object::uid_to_inner(&policy_id), policy);
        
        // Update pool stats
        pool.total_coverage = pool.total_coverage + coverage_amount;
        pool.total_premiums = pool.total_premiums + premium_amount;
        
        // Return excess premium if any
        if (payment_amount > premium_amount) {
            let return_amount = payment_amount - premium_amount;
            let return_balance = balance::split(&mut pool.reserves, return_amount);
            let return_coin = coin::from_balance(return_balance, ctx);
            transfer::transfer(return_coin, borrower);
        }
        
        // Transfer certificate to borrower
        transfer::transfer(certificate, borrower);
        
        // Emit event
        event::emit(PolicyCreated {
            policy_id: object::uid_to_inner(&policy_id),
            loan_id: loan.id,
            borrower,
            coverage_amount,
            premium_amount,
            premium_rate: base_premium_rate,
            expiry_timestamp,
        });
        
        object::uid_to_inner(&policy_id)
    }
    
    // Process insurance claim when a loan defaults
    public fun process_claim<T>(
        pool: &mut InsurancePool<T>,
        policy_id: ID,
        principal: u64,
        interest: u64,
        ctx: &mut TxContext
    ) {
        // Verify policy exists and is active
        assert!(table::contains(&pool.policies, policy_id), 1); // Policy doesn't exist
        
        let policy = table::borrow_mut(&mut pool.policies, policy_id);
        assert!(policy.active && !policy.claimed, 2); // Policy inactive or already claimed
        
        // Calculate payout amount (principal + interest up to coverage amount)
        let total_loss = principal + interest;
        let payout_amount = if (total_loss > policy.coverage_amount) {
            policy.coverage_amount
        } else {
            total_loss
        };
        
        // Update policy state
        policy.active = false;
        policy.claimed = true;
        
        // Update pool stats
        pool.claims_paid = pool.claims_paid + payout_amount;
        pool.total_coverage = pool.total_coverage - policy.coverage_amount;
        
        // Process payment to lending pool (handled by the calling function)
        
        // Emit claim event
        event::emit(ClaimPaid {
            policy_id,
            loan_id: policy.loan_id,
            borrower: policy.borrower,
            coverage_amount: policy.coverage_amount,
            principal,
            interest,
        });
    }
    
    // Calculate premium rate based on reputation (1-10%)
    fun calculate_premium_rate(reputation_registry: &ReputationRegistry, borrower: address): u64 {
        let score = reputation_registry::get_score(reputation_registry, borrower);
        
        // Example formula: higher score = lower premium
        // 0-300: 1000 (10%), 300-500: 800 (8%), 500-700: 500 (5%), 700-850: 300 (3%), 850-950: 200 (2%), 950+: 100 (1%)
        if (score < 300) { 1000 }
        else if (score < 500) { 800 }
        else if (score < 700) { 500 }
        else if (score < 850) { 300 }
        else if (score < 950) { 200 }
        else { 100 }
    }
    
    // View functions
    public fun get_policy_details(pool: &InsurancePool<T>, policy_id: ID): (address, u64, u64, u64, bool, bool) {
        let policy = table::borrow(&pool.policies, policy_id);
        (policy.borrower, policy.coverage_amount, policy.premium_amount, policy.expiry_timestamp, policy.active, policy.claimed)
    }
    
    public fun get_pool_stats(pool: &InsurancePool<T>): (u64, u64, u64) {
        (pool.total_coverage, pool.total_premiums, pool.claims_paid)
    }
}