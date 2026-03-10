//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;
import "../Interface/IProposalHub.sol";

/**
Store proposals in a mapping(bytes32 => Proposal)
use Proposal struct and Status enum from the interface 
propose() — hashes proposal content into a proposalId, records block timestamp, sets status Pending
cancel() — only callable by proposer or governance, sets Cancelled
Emits events for every state change
Use custom errors for gas effifciency.
 */

contract ProposalHub is IProposalHub {
    mapping(bytes32 => Proposal) private proposals;

    error ProposalExists(bytes32 proposalId);
    error ProposalMissing(bytes32 proposalId);
    error NotProposer(address caller);

    event ProposalCreated(
        bytes32 proposalId,
        address proposer,
        address target,
        bytes data,
        uint256 value
    );
    event ProposalCancelled(bytes32 proposalId);

    function propose(address target, bytes calldata data, uint256 value) external returns (bytes32) {
        bytes32 proposalId = keccak256(abi.encode(msg.sender, target, data, value));
        if (proposals[proposalId].createdAt != 0) {
            revert ProposalExists(proposalId);
        }

        proposals[proposalId] = Proposal({
            proposer: msg.sender,
            target: target,
            data: data,
            value: value,
            status: Status.Pending,
            createdAt: block.timestamp
        });

        emit ProposalCreated(proposalId, msg.sender, target, data, value);
        return proposalId;
    }

    function cancel(bytes32 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        if (proposal.createdAt == 0) {
            revert ProposalMissing(proposalId);
        }
        if (msg.sender != proposal.proposer) {
            revert NotProposer(msg.sender);
        }

        proposal.status = Status.Cancelled;
        emit ProposalCancelled(proposalId);
    }

    function getProposal(bytes32 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }
}
