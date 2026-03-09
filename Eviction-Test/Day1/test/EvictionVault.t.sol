// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../src/EvictionVault.sol";
import "../src/MerkleClaim.sol";
import "../src/VaultBase.sol";

contract EvictionVaultTest is Test {
    EvictionVault public vault;
    MultisigWallet public multisig;

    address internal jolah;
    address internal vickish;
    address internal kemi;

    function setUp() public {
        jolah = makeAddr("jolah");
        vickish = makeAddr("vickish");
        kemi = makeAddr("kemi");

        address[] memory signers = new address[](3);
        signers[0] = jolah;
        signers[1] = vickish;
        signers[2] = kemi;

        uint256 numOfConfirmationNeeded = 2;

        vault = new EvictionVault(signers, numOfConfirmationNeeded);
        multisig = vault.multisig();
        vm.deal(address(vault), 5 ether);
    }

    function testOnlyOwnerCanPause() public {
        vm.expectRevert();
        vm.prank(jolah);
        vault.pause();

        bytes memory data = abi.encodeWithSelector(vault.pause.selector);

        vm.prank(jolah);
        multisig.submitTransaction(address(vault), 0, data);

        vm.prank(vickish);
        multisig.confirmTransaction(0);

        vm.warp(block.timestamp + multisig.TIMELOCK_DURATION());

        vm.prank(jolah);
        multisig.executeTransaction(0);

        assertTrue(vault.paused());
    }

    function testOnlyOwnerCanSetMerkleRoot() public {
        bytes32 root = keccak256("root");

        vm.expectRevert();
        vm.prank(jolah);
        vault.setMerkleRoot(root);

        bytes memory data = abi.encodeWithSelector(vault.setMerkleRoot.selector, root);

        vm.prank(jolah);
        multisig.submitTransaction(address(vault), 0, data);

        vm.prank(kemi);
        multisig.confirmTransaction(0);

        vm.warp(block.timestamp + multisig.TIMELOCK_DURATION());

        vm.prank(vickish);
        multisig.executeTransaction(0);

        assertEq(vault.merkleRoot(), root);
    }

    function testWithdrawWhenPaused() public {
        bytes memory data = abi.encodeWithSelector(vault.pause.selector);

        vm.prank(jolah);
        multisig.submitTransaction(address(vault), 0, data);

        vm.prank(vickish);
        multisig.confirmTransaction(0);

        vm.warp(block.timestamp + multisig.TIMELOCK_DURATION());

        vm.prank(jolah);
        multisig.executeTransaction(0);

        vm.expectRevert(VaultBase.VaultPaused.selector);
        vm.prank(jolah);
        vault.withdraw(1 ether);
    }
}
