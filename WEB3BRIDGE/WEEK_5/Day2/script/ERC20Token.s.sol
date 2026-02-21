// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {ERC20Token} from "../src/ERC20Token.sol";


contract ERC20TokenScript is Script {
    ERC20Token public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        token = new ERC20Token("MyToken", "MTK", 18, 1000000 ether);

        vm.stopBroadcast();
    }
}
