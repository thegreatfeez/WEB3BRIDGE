//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/modules/Guard.sol";
import "forge-std/Test.sol";

contract GuardTest is Test {
    Guard guard;
    address treasury;

    function setUp() public {
        guard = new Guard();
        treasury = makeAddr("ganiyat");
        vm.deal(treasury, 100 ether);
    }

    function testCheckDrainLimitPasses() public {
        bool ok = guard.checkDrainLimit(treasury, 5 ether);
        assertTrue(ok);
    }

    function testCheckDrainLimitRevertsWhenExceeding() public {
        vm.expectRevert(abi.encodeWithSelector(Guard.DrainLimitExceeded.selector, 11 ether, 10 ether));
        guard.checkDrainLimit(treasury, 11 ether);
    }

    function testFlashLoanBlocker() public {
        guard.recordSnapshot(treasury, 0);
        bool blockedNow = guard.isFlashLoanBlocked(treasury);
        assertTrue(blockedNow);

        vm.roll(block.number + 2);
        bool blockedLater = guard.isFlashLoanBlocked(treasury);
        assertTrue(!blockedLater);
    }
}
