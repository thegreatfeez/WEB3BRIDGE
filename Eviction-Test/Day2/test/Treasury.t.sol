//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/Interface/IAuthLayer.sol";
import "../src/Interface/IProposalHub.sol";
import "../src/Interface/ILock.sol";
import "../src/Interface/IGuard.sol";
import "../src/core/Treasury.sol";
import "../src/modules/ProposalHub.sol";
import "../src/modules/AuthLayer.sol";
import "../src/modules/Timelock.sol";
import "../src/modules/Guard.sol";
import "forge-std/Test.sol";

contract TreasuryTest is Test {
    Treasury treasury;
    IProposalHub proposalHub;
    IAuthLayer authLayer;
    ILock timelock;
    IGuard guard;

    address internal ganiyat;
    address internal mutmahinat;
    address internal halimah;
    address internal mariam;
    address internal hafsoh;

    function setUp() public {
        ganiyat = makeAddr("ganiyat");
        mutmahinat = makeAddr("mutmahinat");
        halimah = makeAddr("halimah");
        mariam = makeAddr("mariam");
        hafsoh = makeAddr("hafsoh");

        proposalHub = new ProposalHub(address(0), address(0));
        address[] memory signers = new address[](4);
        signers[0] = mutmahinat;
        signers[1] = halimah;
        signers[2] = mariam;
        signers[3] = hafsoh;
        authLayer = new AuthLayer(signers, 4, address(proposalHub));
        timelock = new Timelock(address(authLayer), address(proposalHub));
        guard = new Guard();
        treasury = new Treasury(address(proposalHub), address(authLayer), address(timelock), address(guard), ganiyat);
    }

    function testProposeStoresCallData() public {
        bytes memory data = abi.encodeWithSignature("transfer(address,uint256)", ganiyat, 1 ether);
        uint256 value = 0;

        bytes32 proposalId = proposalHub.propose(mariam, data, value);
        IProposalHub.Proposal memory p = proposalHub.getProposal(proposalId);

        assertEq(p.proposer, address(this));
        assertEq(p.target, mariam);
        assertEq(p.value, value);
        assertEq(keccak256(p.data), keccak256(data));
        assertEq(uint256(p.status), uint256(IProposalHub.Status.Pending));
    }

    function testCancelSetsStatus() public {
        bytes32 proposalId = proposalHub.propose(hafsoh, hex"1234", 0);
        proposalHub.cancel(proposalId);
        IProposalHub.Proposal memory p = proposalHub.getProposal(proposalId);
        assertEq(uint256(p.status), uint256(IProposalHub.Status.Cancelled));
    }
}
