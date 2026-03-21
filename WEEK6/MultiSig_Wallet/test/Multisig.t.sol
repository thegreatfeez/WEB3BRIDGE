// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {MultiSig} from "../src/MultiSig.sol";

contract MultiSigTest is Test {
    MultiSig multisig;

    address internal jolah;
    address internal vickish;
    address internal yewande;

    function setUp() public {
        jolah = makeAddr("jolah");
        vickish = makeAddr("vickish");
        yewande = makeAddr("yewande");

        address[] memory signers = new address[](3);
        signers[0] = jolah;
        signers[1] = vickish;
        signers[2] = yewande;

        uint8 numOfConfirmationNeeded = 2;

        multisig = new MultiSig(signers, numOfConfirmationNeeded);
        vm.deal(address(multisig), 5 ether);
    }

    function testSubmitTransaction() public {
        address kemi = makeAddr("kemi");
        uint256 value = 1 ether;
        vm.prank(jolah);
        multisig.submitTransaction(kemi, value);
        (
            uint8 id,
            address recepient,
            address initiator,
            uint256 amount,
            bool executed,
            bool isCanceled,
            uint256 numOfConfirmations
        ) = multisig.transactions(0);
        assertEq(id, 1);
        assertEq(recepient, kemi);
        assertEq(initiator, jolah);
    }

    function testOnlyOwnerCanSubmitTransaction() public {
        address kemi = makeAddr("kemi");
        address joy = makeAddr("joy");
        uint256 value = 1 ether;

        vm.expectRevert();
        vm.prank(joy);
        multisig.submitTransaction(kemi, value);
    }

    function testconfirmTransaction() public {
        address kemi = makeAddr("kemi");
        uint256 value = 1 ether;
        vm.prank(jolah);
        multisig.submitTransaction(kemi, value);

        vm.prank(vickish);
        multisig.confirmTransaction(1);
    }
}

