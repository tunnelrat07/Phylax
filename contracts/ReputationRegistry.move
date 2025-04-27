module defi_platform::reputation_registry {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::event;
    
    // Reputation data structure
    struct ReputationScore has key, store {
        id: UID,
        address: address,
        score: u64,
        transaction_count: u64,
        loan_count: u64,
        defaults: u64,
        repayments: u64,
        active_loans: u64,
        last_updated: u64,
        history: vector<ReputationEvent>,
    }
    
    // Admin capability for reputation updates
    struct ReputationAdmin has key {
        id: UID,
    }
    
    struct ReputationEvent has store, drop {
        action_type: u8, // 1: loan_taken, 2: repayment, 3: default
        timestamp: u64,
        amount: u64,
        impact: i64, // Score impact (can be negative)
    }
    
    // Registry to store all reputation scores
    struct ReputationRegistry has key {
        id: UID,
        scores: Table<address, ReputationScore>,
    }
    
    // Events
    struct ReputationUpdated has copy, drop {
        address: address,
        old_score: u64,
        new_score: u64,
    }
    
    // === Functions ===
    
    fun init(ctx: &mut TxContext) {
        let admin = ReputationAdmin {
            id: object::new(ctx),
        };
        
        let registry = ReputationRegistry {
            id: object::new(ctx),
            scores: table::new(ctx),
        };
        
        transfer::share_object(registry);
        transfer::transfer(admin, tx_context::sender(ctx));
    }
    
    // Create initial reputation for a new user
    public fun create_initial_reputation(
        registry: &mut ReputationRegistry,
        user: address,
        ctx: &mut TxContext
    ) {
        assert!(!table::contains(&registry.scores, user), 1); // User already exists
        
        let score = ReputationScore {
            id: object::new(ctx),
            address: user,
            score: 500, // Base starting score
            transaction_count: 0,
            loan_count: 0,
            defaults: 0,
            repayments: 0,
            active_loans: 0,
            last_updated: tx_context::epoch(ctx),
            history: vector::empty(),
        };
        
        table::add(&mut registry.scores, user, score);
    }
    
    // Update reputation based on loan activity
    public fun update_reputation(
        _: &ReputationAdmin,
        registry: &mut ReputationRegistry,
        user: address,
        action_type: u8,
        amount: u64,
        score_change: i64,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&registry.scores, user), 1);
        let user_score = table::borrow_mut(&mut registry.scores, user);
        
        let old_score = user_score.score;
        
        // Update statistics based on action type
        if (action_type == 1) { // Loan taken
            user_score.loan_count = user_score.loan_count + 1;
            user_score.active_loans = user_score.active_loans + 1;
        } else if (action_type == 2) { // Repayment
            user_score.repayments = user_score.repayments + 1;
            user_score.active_loans = user_score.active_loans - 1;
        } else if (action_type == 3) { // Default
            user_score.defaults = user_score.defaults + 1;
            user_score.active_loans = user_score.active_loans - 1;
        };
        
        // Apply score change
        if (score_change >= 0) {
            user_score.score = user_score.score + (score_change as u64);
        } else {
            let abs_change = if (score_change < 0) (-(score_change) as u64) else (score_change as u64);
            user_score.score = if (user_score.score > abs_change) { user_score.score - abs_change } else { 1 };
        };
        
        // Cap score at 1000
        if (user_score.score > 1000) {
            user_score.score = 1000;
        };
        
        // Record event in history
        vector::push_back(&mut user_score.history, ReputationEvent {
            action_type,
            timestamp: tx_context::epoch(ctx),
            amount,
            impact: score_change,
        });
        
        user_score.last_updated = tx_context::epoch(ctx);
        
        // Emit event for indexers
        event::emit(ReputationUpdated {
            address: user,
            old_score,
            new_score: user_score.score,
        });
    }
    
    // View functions
    public fun get_score(registry: &ReputationRegistry, user: address): u64 {
        if (table::contains(&registry.scores, user)) {
            table::borrow(&registry.scores, user).score
        } else {
            0
        }
    }
    
    public fun get_full_reputation(registry: &ReputationRegistry, user: address): (u64, u64, u64, u64) {
        let score = table::borrow(&registry.scores, user);
        (score.score, score.loan_count, score.repayments, score.defaults)
    }
    
    // Calculate collateral factor based on reputation (0-90%)
    public fun calculate_collateral_factor(registry: &ReputationRegistry, user: address): u64 {
        let score = get_score(registry, user);
        
        // Example formula: higher score = lower collateral requirement
        // 0-300: 90%, 300-500: 80%, 500-700: 70%, 700-850: 60%, 850-950: 50%, 950+: 40%
        if (score < 300) { 90 }
        else if (score < 500) { 80 }
        else if (score < 700) { 70 }
        else if (score < 850) { 60 }
        else if (score < 950) { 50 }
        else { 40 }
    }
    
    // Calculate interest rate based on reputation (3-20%)
    public fun calculate_interest_rate(registry: &ReputationRegistry, user: address): u64 {
        let score = get_score(registry, user);
        
        // Example formula: higher score = lower interest
        // 0-300: 20%, 300-500: 15%, 500-700: 10%, 700-850: 7%, 850-950: 5%, 950+: 3%
        if (score < 300) { 20 }
        else if (score < 500) { 15 }
        else if (score < 700) { 10 }
        else if (score < 850) { 7 }
        else if (score < 950) { 5 }
        else { 3 }
    }
}