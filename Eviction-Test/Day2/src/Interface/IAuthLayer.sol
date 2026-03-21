// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// this interface defines approve(), revokeApproval(), isAuthorized() and the SignedApproval struct.

interface IAuthLayer {
    struct SignedApproval {
        address approver;
        bytes32 proposalId;
        uint256 nonce;
    }

    function approve(bytes32 proposalId, uint8 v, bytes32 r, bytes32 s) external;

    function revokeApproval(bytes32 proposalId) external;

    function isAuthorized(bytes32 proposalId) external view returns (bool);
}
