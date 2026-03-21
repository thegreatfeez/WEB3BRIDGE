// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DeployScript} from "../script/DeployScript.s.sol";
import {LitiumToken} from "../src/LitiumToken.sol";
import {AtomProperties} from "../src/AtomProperties.sol";

contract AtomPropertiesTest is Test {
    LitiumToken public token;
    AtomProperties public properties;

    function setUp() public {
        DeployScript deployer = new DeployScript();
        deployer.run();
        token = deployer.token();
        properties = deployer.property();
    }

    function testPurchaseProperties() public {
        address account = makeAddr("halimah");
        properties.addProperty("Vitalik Villa", "Ikorodu", 25_000e18);
        uint256 fee = 50_000e18;
        deal(address(token),account,fee);

        vm.startPrank(account);
        token.approve(address(properties), fee);
        properties.purchaseProperty(1);
        vm.stopPrank();
    }
}