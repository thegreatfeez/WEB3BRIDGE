//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/modules/AuthLayer.sol";
import "../src/Interface/IProposalHub.sol";
import "../src/libraries/SignatureLib.sol";
import "forge-std/Test.sol";

contract MockProposalHub is IProposalHub {
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
}

contract AuthLayerTest is Test {
    AuthLayer auth;
    MockProposalHub hub;

    uint256 signerPk;
    address signer;
    address ganiyat;

    function setUp() public {
        signerPk = 0xB0B;
        signer = vm.addr(signerPk);
        ganiyat = makeAddr("ganiyat");

        hub = new MockProposalHub();
        address[] memory signers = new address[](1);
        signers[0] = signer;
        auth = new AuthLayer(signers, 1, address(hub));
    }

    function testApproveSetsAuthorized() public {
        bytes32 proposalId = keccak256("proposal");
        uint256 nonce = auth.nonces(signer);

        bytes32 typehash = keccak256("Approve(bytes32 proposalId,uint256 nonce)");
        bytes32 structHash = keccak256(abi.encode(typehash, proposalId, nonce));
        bytes32 digest = SignatureLib.hashTypedData(auth.domainSeparator(), structHash);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk, digest);
        vm.prank(signer);
        auth.approve(proposalId, v, r, s);

        bool ok = auth.isAuthorized(proposalId);
        assertTrue(ok);
    }

    function testApproveRevertsForNonSigner() public {
        bytes32 proposalId = keccak256("proposal");
        vm.expectRevert(abi.encodeWithSelector(AuthLayer.NotASigner.selector, ganiyat));
        vm.prank(ganiyat);
        auth.approve(proposalId, 27, bytes32(0), bytes32(0));
    }
}
