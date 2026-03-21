//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../Interface/ILock.sol";
import "../Interface/IAuthLayer.sol";
import "../Interface/IProposalHub.sol";


contract Timelock is ILock {
    uint256 public constant DELAY = 2 days;
    mapping(bytes32 => uint256) private eta;
    mapping(bytes32 => bool) private cancelled;
    mapping(bytes32 => bool) private executed;
    bool private executing;

    IAuthLayer public authLayer;
    IProposalHub public proposalHub;

    error NotAuthorized(bytes32 proposalId);
    error AlreadyQueued(bytes32 proposalId);
    error NotQueued(bytes32 proposalId);
    error NotReady(bytes32 proposalId, uint256 eta);
    error AlreadyExecuted(bytes32 proposalId);
    error ProposalCancelled(bytes32 proposalId);
    error Reentrancy();
    error ExecutionFailed(bytes32 proposalId);
    error NotProposer(address caller);

    event Queued(bytes32 proposalId, uint256 eta);
    event Executed(bytes32 proposalId);
    event Cancelled(bytes32 proposalId);

    constructor(address authLayer_, address proposalHub_) {
        authLayer = IAuthLayer(authLayer_);
        proposalHub = IProposalHub(proposalHub_);
    }

    function queue(bytes32 proposalId) external {
        if (!authLayer.isAuthorized(proposalId)) {
            revert NotAuthorized(proposalId);
        }
        if (cancelled[proposalId]) {
            revert ProposalCancelled(proposalId);
        }
        if (eta[proposalId] != 0) {
            revert AlreadyQueued(proposalId);
        }

        IProposalHub.Proposal memory proposal = proposalHub.getProposal(proposalId);
        if (proposal.status == IProposalHub.Status.Cancelled) {
            revert ProposalCancelled(proposalId);
        }

        uint256 eta_ = block.timestamp + DELAY;
        eta[proposalId] = eta_;
        proposalHub.setStatus(proposalId, IProposalHub.Status.Queued);
        emit Queued(proposalId, eta_);
    }

    function execute(bytes32 proposalId) external payable {
        uint256 eta_ = eta[proposalId];
        if (eta_ == 0) {
            revert NotQueued(proposalId);
        }
        if (block.timestamp < eta_) {
            revert NotReady(proposalId, eta_);
        }
        if (executed[proposalId]) {
            revert AlreadyExecuted(proposalId);
        }
        if (cancelled[proposalId]) {
            revert ProposalCancelled(proposalId);
        }
        if (executing) {
            revert Reentrancy();
        }

        IProposalHub.Proposal memory proposal = proposalHub.getProposal(proposalId);

        executing = true;
        proposalHub.setStatus(proposalId, IProposalHub.Status.Executed);
        (bool ok, ) = proposal.target.call{value: proposal.value}(proposal.data);
        executing = false;

        if (!ok) {
            revert ExecutionFailed(proposalId);
        }

        executed[proposalId] = true;
        eta[proposalId] = 0;
        emit Executed(proposalId);
    }

    function cancel(bytes32 proposalId) external {
        IProposalHub.Proposal memory proposal = proposalHub.getProposal(proposalId);
        if (proposal.proposer != msg.sender) {
            revert NotProposer(msg.sender);
        }

        cancelled[proposalId] = true;
        eta[proposalId] = 0;
        proposalHub.setStatus(proposalId, IProposalHub.Status.Cancelled);
        emit Cancelled(proposalId);
    }

    function getEta(bytes32 proposalId) external view returns (uint256) {
        return eta[proposalId];
    }
}
