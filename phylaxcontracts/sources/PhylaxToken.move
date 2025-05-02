module phylaxcontracts::phylax_token{
    use sui::coin::{Self,TreasuryCap,Coin};

    public struct PHYLAX_TOKEN has drop{}

    fun init(witness: PHYLAX_TOKEN, ctx: &mut TxContext) {
		let (treasury, metadata) = coin::create_currency(
				witness,
				6,
				b"PHYL",
				b"PHYLAX_TOKEN",
				b" LP token for Phylax",
				option::none(),
				ctx,
		);
		transfer::public_freeze_object(metadata);
		transfer::public_transfer(treasury, ctx.sender())
}

public fun mint(
		treasury_cap: &mut TreasuryCap<PHYLAX_TOKEN>,
		amount: u64,
		recipient: address,
		ctx: &mut TxContext,
) {
		coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
		
}

public fun burn(treasury_cap: &mut TreasuryCap<PHYLAX_TOKEN>, c: Coin<PHYLAX_TOKEN> ) {
         
coin::burn(treasury_cap, c);
        
}

}