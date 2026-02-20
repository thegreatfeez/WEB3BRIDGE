// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Chlorine} from "../src/Chlorine.sol";
import {ERC20Token} from "../src/ERC20Token.sol";

contract DeployScript is Script {
    Chlorine public chlorine;
    ERC20Token public token;

    function run() public {
        vm.startBroadcast();

        token = new ERC20Token("BoronToken", "BRT", 18 , 1000_000e18);

        chlorine = new Chlorine(address(token));

        vm.stopBroadcast();
    }
}
