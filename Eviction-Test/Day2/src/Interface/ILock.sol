//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// this interface defines queue(), execute(), and cancel for proposal-based timelock

interface ILock {
    function queue(bytes32 proposalId) external;

    function execute(bytes32 proposalId) external payable;

    function cancel(bytes32 proposalId) external;

    function getEta(bytes32 proposalId) external view returns (uint256);
}
