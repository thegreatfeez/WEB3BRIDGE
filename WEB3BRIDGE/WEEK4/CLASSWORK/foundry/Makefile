-include .env

deploy:
	forge script script/Greeter.s.sol:GreeterScript \
		--rpc-url $(CELO_ALFAJORES_URL) \
		--account myAccount \
		--sender $(YOUR_ADDRESS) \
		--broadcast \
		-vvvv