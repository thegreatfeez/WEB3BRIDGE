// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {NumberFactory} from "../src/NumberFactory.sol";


contract NumberFactoryTest is Test {
    NumberFactory nfactory;

    function setUp() public {
        vm.prank(address(0xdead), address(0xdead));
        nfactory = new NumberFactory();
        // console2.log(type(NumberChildren).creationCode);
    }

   function testChildDep() external {
    // vm.prank(address(0xdead), address(0xdead));
    nfactory.registerNumber(123456);
   }
}
