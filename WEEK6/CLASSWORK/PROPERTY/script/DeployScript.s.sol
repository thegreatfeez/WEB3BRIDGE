//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {LitiumToken} from "../src/LitiumToken.sol";
import {AtomProperties} from "../src/AtomProperties.sol";
import {Script} from "forge-std/Script.sol";

contract DeployScript is Script {
    LitiumToken public token;
    AtomProperties public property;

    function run() public  {
        vm.startBroadcast();
        token = new LitiumToken(msg.sender);
        property = new AtomProperties(address(token));
       vm.stopBroadcast();
    }
}