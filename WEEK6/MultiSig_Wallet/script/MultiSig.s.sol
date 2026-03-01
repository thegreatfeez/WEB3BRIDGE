// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {MultiSig} from "../src/MultiSig.sol";

contract MultiSigScript is Script {
    MultiSig public multiSig;

    function setUp() public {}

    function run() public {
        address[] memory signers = new address[](3);
        signers[0] = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        signers[1] = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        signers[2] = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;

        vm.startBroadcast();
        multiSig = new MultiSig(signers, 2);
        vm.stopBroadcast();
    }
}
