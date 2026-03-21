/**
 * Make your existing multisig a factory contract.
 * Go through foundrys documentation and test the child contract with foundry.
 * Enjoy.
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {MultiSig} from "./MultiSig.sol";

contract MultiSigFactory {
    address[] allFactoryInstance;

    function createMultisigChild(address[] memory _signers, uint8 _numConfirmationsRequired)
        external
        returns (address multisigChild)
    {
        MultiSig multisig = new MultiSig(_signers, _numConfirmationsRequired);
        multisigChild = address(multisig);
        allFactoryInstance.push(multisigChild);
    }

    function getAllFactoryInstance() public view returns (address[] memory) {
        return allFactoryInstance;
    }
}
