//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../libraries/SignatureLib.sol";
import "../Interface/IAuthLayer.sol";
import "../Interface/IProposalHub.sol";

 contract AuthLayer is IAuthLayer {
    mapping(address => bool) public isSigner;
    mapping(address => uint256) public nonces;
    mapping(bytes32 => mapping(address => bool)) public approvals;
    address[] private signers;
    uint256 public threshold;
    bytes32 public domainSeparator;
    IProposalHub public proposalHub;

    bytes32 private constant _APPROVE_TYPEHASH =
        keccak256("Approve(bytes32 proposalId,uint256 nonce)");
    string private constant _NAME = "AuthLayer";
    string private constant _VERSION = "1";

    error NotASigner(address caller);
    error InvalidSignature(address signer);
    error AlreadyApproved(bytes32 proposalId, address signer);

    event SignerAdded(address signer);
    event SignerRemoved(address signer);
    event ThresholdUpdated(uint256 newThreshold);
    event ProposalApproved(bytes32 proposalId, address signer);

    constructor(address[] memory initialSigners, uint256 initialThreshold, address proposalHub_) {
        require(initialThreshold > 0 && initialThreshold <= initialSigners.length, "Invalid threshold");
        for (uint256 i = 0; i < initialSigners.length; i++) {
            isSigner[initialSigners[i]] = true;
            signers.push(initialSigners[i]);
            emit SignerAdded(initialSigners[i]);
        }
        threshold = initialThreshold;
        emit ThresholdUpdated(initialThreshold);
        domainSeparator = SignatureLib.buildDomainSeparator(_NAME, _VERSION);
        proposalHub = IProposalHub(proposalHub_);
    }

    function approve(bytes32 proposalId, uint8 v, bytes32 r, bytes32 s) external {
        if (!isSigner[msg.sender]) {
            revert NotASigner(msg.sender);
        }

        uint256 currentNonce = nonces[msg.sender];
        if (approvals[proposalId][msg.sender]) {
            revert AlreadyApproved(proposalId, msg.sender);
        }

        bytes32 structHash = keccak256(abi.encode(_APPROVE_TYPEHASH, proposalId, currentNonce));
        bytes32 digest = SignatureLib.hashTypedData(domainSeparator, structHash);
        address recoveredSigner = SignatureLib.recover(digest, v, r, s);
        if (recoveredSigner != msg.sender) {
            revert InvalidSignature(msg.sender);
        }

        approvals[proposalId][msg.sender] = true;
        nonces[msg.sender]++;
        emit ProposalApproved(proposalId, msg.sender);

        if (this.isAuthorized(proposalId)) {
            proposalHub.setStatus(proposalId, IProposalHub.Status.Approved);
        }
    }

    function revokeApproval(bytes32 proposalId) external {
        if (!isSigner[msg.sender]) {
            revert NotASigner(msg.sender);
        }
        approvals[proposalId][msg.sender] = false;
    }

    function isAuthorized(bytes32 proposalId) external view returns (bool) {
        uint256 approvalCount = 0;
        for (uint256 i = 0; i < signers.length; i++) {
            address signer = signers[i];
            if (approvals[proposalId][signer]) {
                approvalCount++;
                if (approvalCount >= threshold) {
                    return true;
                }
            }
        }
        return false;
    }

    function getAllSigners() external view returns (address[] memory) {
        return signers;
    }
}
