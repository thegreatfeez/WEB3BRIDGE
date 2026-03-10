// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

//this interface defines the approve(), revokeApproval(), isApproved() and SignedApproval struct.
// can isApproved() be a mapping?

interface IAuthLayer {
    struct SignedApproval {
        address approver;
        bytes32 operationHash;
        uint256 timestamp;
        bytes signature;
    }

    function approve(bytes32 operationHash, bytes calldata signature) external;

    function revokeApproval(bytes32 operationHash) external;

    function isApproved(bytes32 operationHash, address approver) external view returns (bool);
}