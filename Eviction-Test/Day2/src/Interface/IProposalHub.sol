// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// this interface defines propose(), cancel(), getProposal() signatures and the Proposal struct

interface IProposalHub {
    struct Proposal {
        address proposer;
        address target;
        bytes data;
        uint256 value;
        Status status;
        uint256 createdAt;
    }

    enum Status {
        Pending,
        Approved,
        Queued,
        Executed,
        Cancelled
    }

    function propose(address target, bytes calldata data, uint256 value) external returns (bytes32);

    function cancel(bytes32 proposalId) external;

    function getProposal(bytes32 proposalId) external view returns (Proposal memory);
}
