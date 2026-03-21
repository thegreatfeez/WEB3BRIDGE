//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/modules/Rewards.sol";
import "forge-std/Test.sol";

contract RewardsTest is Test {
    Rewards rewards;
    address governor;
    address ganiyat;

    function setUp() public {
        governor = makeAddr("ganiyat");
        ganiyat = makeAddr("ganiyat");

        bytes32 leaf = keccak256(abi.encodePacked(ganiyat, uint256(1 ether)));
        rewards = new Rewards(leaf, governor);
        vm.deal(address(rewards), 2 ether);
    }

    function testClaimSuccess() public {
        bytes32[] memory proof = new bytes32[](0);
        rewards.claim(ganiyat, 1 ether, proof);
        assertTrue(rewards.hasClaimed(ganiyat));
        assertEq(ganiyat.balance, 1 ether);
    }

    function testClaimRevertsOnDoubleClaim() public {
        bytes32[] memory proof = new bytes32[](0);
        rewards.claim(ganiyat, 1 ether, proof);

        vm.expectRevert(abi.encodeWithSelector(Rewards.AlreadyClaimed.selector, ganiyat));
        rewards.claim(ganiyat, 1 ether, proof);
    }

    function testUpdateRootOnlyGovernor() public {
        bytes32 newRoot = keccak256(abi.encodePacked(address(2), uint256(2 ether)));

        vm.prank(makeAddr("mutmahinat"));
        vm.expectRevert(abi.encodeWithSelector(Rewards.NotGovernor.selector, makeAddr("mutmahinat")));
        rewards.updateRoot(newRoot);

        vm.prank(governor);
        rewards.updateRoot(newRoot);
        assertEq(rewards.merkleRoot(), newRoot);
    }
}
