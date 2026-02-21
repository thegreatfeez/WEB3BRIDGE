// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Owner} from "../src/Owner.sol";

contract OwnerScript is Script {
    Owner public ownerIns;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        ownerIns = new Owner();

        vm.stopBroadcast();
    }
}
