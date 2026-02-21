-include .env

deploy:
	forge script script/ERC20Token.s.sol:ERC20TokenScript \
		--rpc-url $(LISK_SEPOLIA_URL) \
		--account myAccount \
		--sender $(YOUR_ADDRESS) \
		--broadcast \
		-vvvv