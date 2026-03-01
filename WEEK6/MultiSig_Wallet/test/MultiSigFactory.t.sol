// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import {Test} from "forge-std/Test.sol";
// import {MultiSigFactory} from "../src/MultiSigFactory.sol";
// import {MultiSig} from "../src/MultiSig.sol";

// contract MultiSigFactoryTest is Test {
//     MultiSig public multiSig;
//     MultiSigFactory public factory;

//     address internal justice;
//     address internal isaac;
//     address internal azeez;

//     function setUp() public {
//         justice = makeAddr("justice");
//         isaac = makeAddr("isaac");
//         azeez = makeAddr("azeez");

//         address[] memory signers = new address[](3);
//         signers[0] = justice;
//         signers[1] = isaac;
//         signers[2] = azeez;

//         uint8 numberOfComfirmation = 2;

//         factory = new MultiSigFactory();
//         address multisigChild = factory.createMultisigChild(signers, numberOfComfirmation);
//         multiSig = MultiSig(payable(multisigChild));
//         vm.deal(address(multiSig), 3 ether);
//     }

//     function testSubmitTransaction() public {
//         address to = makeAddr("to");
//         uint256 value = 1 ether;

//         vm.prank(justice);
//         multiSig.submitTransaction(to, value);

//         (uint8 id,address recepient,uint256 amount,bool executed,uint256 numOfConfirmations)= multiSig.transactions(0);
//         assertEq(id,1);
//         assertEq(recepient, to);
//         assertEq(amount,value);
//         assertEq(executed, false);
//         assertEq(numOfConfirmations,0);
//     }

//     function testConfirmTransaction() public {
//         address to = makeAddr("to");
//         uint256 value = 1 ether;
//         vm.prank(justice);
//         multiSig.submitTransaction(to, value);

//         vm.prank(isaac);
//         multiSig.confirmTransaction(1);

//         (,,,, uint256 numOfConfirmations) = multiSig.transactions(0);
//         assertEq(numOfConfirmations, 1);
//     }

//     function testExecuteTransaction() public {
//         address to = makeAddr("to");
//         uint256 value = 1 ether;

//         vm.prank(justice);
//         multiSig.submitTransaction(to, value);

//         vm.prank(azeez);
//         multiSig.confirmTransaction(1);

//         vm.prank(isaac);
//         multiSig.confirmTransaction(1);

//         vm.prank(justice);
//         multiSig.executeTransaction(1);

//         (,,, bool executed,) = multiSig.transactions(0);
//         assertEq(executed, true);
//     }
// }
