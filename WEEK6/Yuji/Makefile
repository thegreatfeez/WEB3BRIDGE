-include .env


deploy:
	forge script script/DeployNFT.s.sol:DeployNFT \
		--rpc-url $(LISK_SEPOLIA_URL) \
		--account myAccount \
		--sender $(YOUR_ADDRESS) \
		--broadcast \
		-vvvv