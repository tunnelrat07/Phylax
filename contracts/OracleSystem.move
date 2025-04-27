module defi_platform::price_oracle {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::event;
    use sui::clock::{Self, Clock};
    
    // Price oracle struct
    struct PriceOracle has key {
        id: UID,
        prices: Table<vector<u8>, PriceData>, // Asset type -> Price data
        admin: address,
        authorized_updaters: vector<address>,
    }
    
    // Price data for an asset
    struct PriceData has store {
        price: u64,          // Price in USD with 8 decimals (e.g., 100000000 = $1.00)
        last_updated: u64,   // Timestamp of last update
        source: address,     // Address that last updated the price
    }
    
    // Events
    struct PriceUpdated has copy, drop {
        asset_type: vector<u8>,
        old_price: u64,
        new_price: u64,
        source: address,
        timestamp: u64,
    }
    
    // === Functions ===
    
    fun init(ctx: &mut TxContext) {
        let oracle = PriceOracle {
            id: object::new(ctx),
            prices: table::new(ctx),
            admin: tx_context::sender(ctx),
            authorized_updaters: vector::singleton(tx_context::sender(ctx)),
        };
        
        transfer::share_object(oracle);
    }
    
    // Add a new asset to the oracle
    public fun add_asset(
        oracle: &mut PriceOracle,
        asset_type: vector<u8>,
        initial_price: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == oracle.admin, 1); // Only admin
        assert!(!table::contains(&oracle.prices, asset_type), 2); // Asset already exists
        
        let price_data = PriceData {
            price: initial_price,
            last_updated: clock::timestamp_ms(clock),
            source: tx_context::sender(ctx),
        };
        
        table::add(&mut oracle.prices, asset_type, price_data);
    }
    
    // Update price for an asset
    public fun update_price(
        oracle: &mut PriceOracle,
        asset_type: vector<u8>,
        new_price: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Check if updater is authorized
        let sender = tx_context::sender(ctx);
        let is_authorized = vector::contains(&oracle.authorized_updaters, &sender);
        assert!(is_authorized, 1); // Not authorized
        
        // Get current price data
        assert!(table::contains(&oracle.prices, asset_type), 2); // Asset doesn't exist
        let price_data = table::borrow_mut(&mut oracle.prices, asset_type);
        
        let old_price = price_data.price;
        
        // Update price data
        price_data.price = new_price;
        price_data.last_updated = clock::timestamp_ms(clock);
        price_data.source = sender;
        
        // Emit price update event
        event::emit(PriceUpdated {
            asset_type,
            old_price,
            new_price,
            source: sender,
            timestamp: clock::timestamp_ms(clock),
        });
    }
    
    // Add an authorized updater
    public fun add_updater(
        oracle: &mut PriceOracle,
        updater: address,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == oracle.admin, 1); // Only admin
        assert!(!vector::contains(&oracle.authorized_updaters, &updater), 2); // Already authorized
        
        vector::push_back(&mut oracle.authorized_updaters, updater);
    }
    
    // Remove an authorized updater
    public fun remove_updater(
        oracle: &mut PriceOracle,
        updater: address,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == oracle.admin, 1); // Only admin
        
        let (exists, index) = vector::index_of(&oracle.authorized_updaters, &updater);
        assert!(exists, 2); // Updater not found
        
        vector::remove(&mut oracle.authorized_updaters, index);
    }
    
    // Get price for an asset
    public fun get_price(oracle: &PriceOracle, asset_type: vector<u8>): u64 {
        assert!(table::contains(&oracle.prices, asset_type), 1); // Asset doesn't exist
        table::borrow(&oracle.prices, asset_type).price
    }
    
    // Check if price is fresh (updated within time window)
    public fun is_price_fresh(oracle: &PriceOracle, asset_type: vector<u8>, max_age_ms: u64, clock: &Clock): bool {
        assert!(table::contains(&oracle.prices, asset_type), 1); // Asset doesn't exist
        
        let price_data = table::borrow(&oracle.prices, asset_type);
        let current_time = clock::timestamp_ms(clock);
        
        current_time - price_data.last_updated <= max_age_ms
    }
}