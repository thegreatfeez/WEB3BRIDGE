//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../Interface/IProposalHub.sol";
import "../Interface/IAuthLayer.sol";
import "../Interface/ILock.sol";
import "../Interface/IGuard.sol";

contract Treasury {
    IProposalHub public proposalHub;
    IAuthLayer public authLayer;
    ILock public timelock;
    IGuard public guard;

    address public guardian;
    bool public paused;

    error Paused();
    error NotGuardian(address caller);
    error NotAuthorized(bytes32 proposalId);

    event PausedSet(bool paused);
    event Executed(bytes32 proposalId);

    constructor(
        address proposalHub_,
        address authLayer_,
        address timelock_,
        address guard_,
        address guardian_
    ) {
        proposalHub = IProposalHub(proposalHub_);
        authLayer = IAuthLayer(authLayer_);
        timelock = ILock(timelock_);
        guard = IGuard(guard_);
        guardian = guardian_;
    }

    function setPaused(bool paused_) external {
        if (msg.sender != guardian) {
            revert NotGuardian(msg.sender);
        }
        paused = paused_;
        emit PausedSet(paused_);
    }

    function execute(bytes32 proposalId) external {
        if (paused) {
            revert Paused();
        }
        if (!authLayer.isAuthorized(proposalId)) {
            revert NotAuthorized(proposalId);
        }

        IProposalHub.Proposal memory proposal = proposalHub.getProposal(proposalId);
        guard.checkDrainLimit(address(this), proposal.value);
        timelock.execute(proposalId);
        emit Executed(proposalId);
    }

    receive() external payable {}
}
