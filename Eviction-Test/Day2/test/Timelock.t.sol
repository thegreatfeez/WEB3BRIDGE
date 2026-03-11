//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/modules/Timelock.sol";
import "../src/Interface/IProposalHub.sol";
import "../src/Interface/IAuthLayer.sol";
import "forge-std/Test.sol";

contract MockAuthLayer is IAuthLayer {
    bool public authorized;

    constructor(bool authorized_) {
        authorized = authorized_;
    }

    function approve(bytes32, uint8, bytes32, bytes32) external pure {}
    function revokeApproval(bytes32) external pure {}
    function isAuthorized(bytes32) external view returns (bool) {
        return authorized;
    }
}

contract MockProposalHubForTimelock is IProposalHub {
    mapping(bytes32 => Proposal) private proposals;

    function propose(address, bytes calldata, uint256) external pure returns (bytes32) {
        return bytes32(0);
    }
    function cancel(bytes32) external pure {}

    function getProposal(bytes32 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }

    function setStatus(bytes32 proposalId, Status status) external {
        proposals[proposalId].status = status;
    }

    function setProposal(
        bytes32 proposalId,
        address proposer,
        address target,
        bytes memory data,
        uint256 value,
        Status status
    ) external {
        proposals[proposalId] = Proposal({
            proposer: proposer,
            target: target,
            data: data,
            value: value,
            status: status,
            createdAt: block.timestamp
        });
    }
}

contract Target {
    uint256 public value;
    function setValue(uint256 v) external {
        value = v;
    }
}

contract TimelockTest is Test {
    function testQueueAndExecute() public {
        MockAuthLayer auth = new MockAuthLayer(true);
        MockProposalHubForTimelock hub = new MockProposalHubForTimelock();
        Timelock timelock = new Timelock(address(auth), address(hub));

        Target target = new Target();
        bytes memory data = abi.encodeWithSignature("setValue(uint256)", 42);
        bytes32 proposalId = keccak256("p1");
        hub.setProposal(proposalId, makeAddr("ganiyat"), address(target), data, 0, IProposalHub.Status.Pending);

        timelock.queue(proposalId);
        assertGt(timelock.getEta(proposalId), 0);

        vm.warp(block.timestamp + 2 days + 1);
        timelock.execute(proposalId);
        assertEq(target.value(), 42);
        assertEq(timelock.getEta(proposalId), 0);
    }

    function testQueueRevertsIfNotAuthorized() public {
        MockAuthLayer auth = new MockAuthLayer(false);
        MockProposalHubForTimelock hub = new MockProposalHubForTimelock();
        Timelock timelock = new Timelock(address(auth), address(hub));

        bytes32 proposalId = keccak256("p2");
        hub.setProposal(proposalId, makeAddr("mutmahinat"), address(1), hex"01", 0, IProposalHub.Status.Pending);

        vm.expectRevert(abi.encodeWithSelector(Timelock.NotAuthorized.selector, proposalId));
        timelock.queue(proposalId);
    }
}
