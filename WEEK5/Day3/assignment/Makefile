-include .env

deploy:
	forge script script/DeployScript.s.sol:DeployScript \
		--rpc-url $(LISK_SEPOLIA_URL) \
		--account myAccount \
		--sender $(YOUR_ADDRESS) \
		--broadcast \
		-vvvv