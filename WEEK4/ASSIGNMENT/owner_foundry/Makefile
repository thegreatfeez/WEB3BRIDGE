-include .env

deploy-lisk:
	forge script script/Owner.s.sol:OwnerScript \
		--rpc-url $(LISK_SEPOLIA_URL) \
		--account myAccount \
		--sender $(YOUR_ADDRESS) \
		--broadcast \
		-vvvv

deploy-arc:
	forge script script/Owner.s.sol:OwnerScript \
		--rpc-url $(ARC_TESTNET_URL) \
		--account myAccount \
		--sender $(YOUR_ADDRESS) \
		--broadcast \
		-vvvv