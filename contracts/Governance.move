module defi_platform::governance {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::event;
    use sui::clock::{Self, Clock};
    
    use defi_platform::lending_pool::{Self, LendingPool};
    use defi_platform::insurance_pool::{Self, InsurancePool};
    use defi_platform::reputation_registry::{Self, ReputationRegistry};
    use defi_platform::price_oracle::{Self, PriceOracle};
    
    // Governance token type
    struct GOVERNANCE has drop {}
    
    // Governance system
    struct GovernanceSystem has key {
        id: UID,
        admin: address,
        proposals: Table<ID, Proposal>,
        next_proposal_id: u64,
        voting_period_ms: u64,  // Standard voting period
        execution_delay_ms: u64, // Delay between approval and execution
        quorum_threshold: u64,   // Minimum votes needed (in basis points of total supply)
        approval_threshold: u64, // Minimum approval ratio (in basis points)
    }
    
    // Proposal structure
    struct Proposal has store {
        id: ID,
        proposer: address,
        description: vector<u8>,
        action_type: u8, // 1: Update lending param, 2: Update insurance param, etc.
        target_module: vector<u8>,
        param_name: vector<u8>,
        param_value: vector<u8>,
        votes_for: u64,
        votes_against: u64,
        status: u8, // 0: Active, 1: Approved, 2: Rejected, 3: Executed, 4: Expired
        creation_time: u64,
        execution_time: u64,
    }
    
    // Vote receipt
    struct VoteReceipt has key, store {
        id: UID,
        voter: address,
        proposal_id: ID,
        vote_amount: u64,
        vote_direction: bool, // true = for, false = against
        timestamp: u64,
    }
    
    // Events
    struct ProposalCreated has copy, drop {
        proposal_id: ID,
        proposer: address,
        description: vector<u8>,
        action_type: u8,
        target_module: vector<u8>,
        param_name: vector<u8>,
        creation_time: u64,
    }
    
    struct VoteCast has copy, drop {
        proposal_id: ID,
        voter: address,
        vote_amount: u64,
        vote_direction: bool,
        timestamp: u64,
    }
    
    struct ProposalExecuted has copy, drop {
        proposal_id: ID,
        execution_time: u64,
        result: bool, // Whether execution succeeded
    }
    
    // === Functions ===
    
    fun init(ctx: &mut TxContext) {
        let governance = GovernanceSystem {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
            proposals: table::new(ctx),
            next_proposal_id: 0,
            voting_period_ms: 7 * 24 * 60 * 60 * 1000, // 7 days
            execution_delay_ms: 2 * 24 * 60 * 60 * 1000, // 2 days
            quorum_threshold: 1000, // 10% of total supply
            approval_threshold: 5000, // 50% of votes
        };
        
        transfer::share_object(governance);
    }
    
    // Create a new proposal
    public fun create_proposal(
        governance: &mut GovernanceSystem,
        description: vector<u8>,
        action_type: u8,
        target_module: vector<u8>,
        param_name: vector<u8>,
        param_value: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ): ID {
        let proposer = tx_context::sender(ctx);
        
        // Generate proposal ID
        let proposal_id_raw = governance.next_proposal_id;
        governance.next_proposal_id = governance.next_proposal_id + 1;
        
        let proposal_id = object::id_from_bytes(bcs::to_bytes(&proposal_id_raw));
        
        // Create proposal
        let proposal = Proposal {
            id: proposal_id,
            proposer,
            description,
            action_type,
            target_module,
            param_name,
            param_value,
            votes_for: 0,
            votes_against: 0,
            status: 0, // Active
            creation_time: clock::timestamp_ms(clock),
            execution_time: 0,
        };
        
        // Add proposal to table
        table::add(&mut governance.proposals, proposal_id, proposal);
        
        // Emit event
        event::emit(ProposalCreated {
            proposal_id,
            proposer,
            description,
            action_type,
            target_module,
            param_name,
            creation_time: clock::timestamp_ms(clock),
        });
        
        proposal_id
    }
    
    // Cast vote for a proposal
    public fun cast_vote(
        governance: &mut GovernanceSystem,
        proposal_id: ID,
        vote_coin: Coin<GOVERNANCE>,
        vote_direction: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let voter = tx_context::sender(ctx);
        
        // Verify proposal exists and is active
        assert!(table::contains(&governance.proposals, proposal_id), 1); // Proposal doesn't exist
        let proposal = table::borrow_mut(&mut governance.proposals, proposal_id);
        assert!(proposal.status == 0, 2); // Proposal not active
        
        // Check if voting period is still open
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time <= proposal.creation_time + governance.voting_period_ms, 3); // Voting closed
        
        // Calculate vote weight
        let vote_amount = coin::value(&vote_coin);
        
        // Update proposal votes
        if (vote_direction) {
            proposal.votes_for = proposal.votes_for + vote_amount;
        } else {
            proposal.votes_against = proposal.votes_against + vote_amount;
        };
        
        // Burn vote coins
        transfer::delete(coin::into_balance(vote_coin));
        
        // Create vote receipt
        let receipt = VoteReceipt {
            id: object::new(ctx),
            voter,
            proposal_id,
            vote_amount,
            vote_direction,
            timestamp: current_time,
        };
        
        transfer::transfer(receipt, voter);
        
        // Emit vote event
        event::emit(VoteCast {
            proposal_id,
            voter,
            vote_amount,
            vote_direction,
            timestamp: current_time,
        });
    }
    
    // Finalize proposal after voting period
    public fun finalize_proposal(
        governance: &mut GovernanceSystem,
        proposal_id: ID,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Verify proposal exists and is active
        assert!(table::contains(&governance.proposals, proposal_id), 1); // Proposal doesn't exist
        let proposal = table::borrow_mut(&mut governance.proposals, proposal_id);
        assert!(proposal.status == 0, 2); // Proposal not active
        
        // Check if voting period has ended
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time > proposal.creation_time + governance.voting_period_ms, 3); // Voting still open
        
        // Calculate total votes
        let total_votes = proposal.votes_for + proposal.votes_against;
        
        // Check quorum (using total supply from coin info)
        let total_supply = 10000000000000; // Example - should be fetched from coin info in real implementation
        let quorum_requirement = (total_supply * governance.quorum_threshold) / 10000;
        
        // Check if proposal meets quorum and approval threshold
        if (total_votes >= quorum_requirement) {
            let approval_rate = (proposal.votes_for * 10000) / total_votes;
            
            if (approval_rate >= governance.approval_threshold) {
                // Proposal approved
                proposal.status = 1; // Approved
                proposal.execution_time = current_time + governance.execution_delay_ms;
            } else {
                // Proposal rejected
                proposal.status = 2; // Rejected
            }
        } else {
            // Proposal failed due to low participation
            proposal.status = 4; // Expired
        }
    }
    
    // Execute approved proposal
    public fun execute_proposal(
        governance: &mut GovernanceSystem,
        proposal_id: ID,
        lending_pool: &mut LendingPool,
        insurance_pool: &mut InsurancePool<T>,
        reputation_registry: &mut ReputationRegistry,
        price_oracle: &mut PriceOracle,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Verify proposal exists and is approved
        assert!(table::contains(&governance.proposals, proposal_id), 1); // Proposal doesn't exist
        let proposal = table::borrow_mut(&mut governance.proposals, proposal_id);
        assert!(proposal.status == 1, 2); // Proposal not approved
        
        // Check if execution delay has passed
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time >= proposal.execution_time, 3); // Execution delay not passed
        
        // Execute proposal based on action type
        let result = execute_action(
            proposal.action_type,
            proposal.target_module,
            proposal.param_name,
            proposal.param_value,
            lending_pool,
            insurance_pool,
            reputation_registry,
            price_oracle,
            ctx
        );
        
        // Update proposal status
        proposal.status = 3; // Executed
        
        // Emit execution event
        event::emit(ProposalExecuted {
            proposal_id,
            execution_time: current_time,
            result,
        });
    }
    
    // Execute specific action based on proposal
    fun execute_action(
        action_type: u8,
        target_module: vector<u8>,
        param_name: vector<u8>,
        param_value: vector<u8>,
        lending_pool: &mut LendingPool,
        insurance_pool: &mut InsurancePool<T>,
        reputation_registry: &mut ReputationRegistry,
        price_oracle: &mut PriceOracle,
        _ctx: &mut TxContext
    ): bool {
        // Parse param value (example for u64)
        let param_value_u64 = parse_u64_param(param_value);
        
        // Execute based on action type and target
        if (action_type == 1 && bytes::to_string(target_module) == b"lending_pool") {
            if (bytes::to_string(param_name) == b"base_rate") {
                lending_pool::update_base_rate(lending_pool, param_value_u64);
                return true
            } else if (bytes::to_string(param_name) == b"collateral_factor") {
                lending_pool::update_collateral_factor(lending_pool, param_value_u64);
                return true
            }
            // Add more lending params here
        } else if (action_type == 2 && bytes::to_string(target_module) == b"insurance_pool") {
            if (bytes::to_string(param_name) == b"premium_multiplier") {
                insurance_pool::update_premium_multiplier(insurance_pool, param_value_u64);
                return true
            }
            // Add more insurance params here
        } else if (action_type == 3 && bytes::to_string(target_module) == b"reputation_registry") {
            if (bytes::to_string(param_name) == b"default_impact") {
                reputation_registry::update_default_impact(reputation_registry, param_value_u64);
                return true
            }
            // Add more reputation params here
        }
        
        // Action not recognized or failed
        false
    }
    
    // Helper function to parse u64 from bytes
    fun parse_u64_param(param_value: vector<u8>): u64 {
        let value = 0u64;
        let i = 0;
        
        while (i < vector::length(&param_value)) {
            let digit = (*vector::borrow(&param_value, i) - 48u8) as u64; // Convert ASCII to number
            value = value * 10 + digit;
            i = i + 1;
        };
        
        value
    }
}