//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./libraries/SignatureLib.sol";
import "../Interface/IAuthLayer.sol";

/**
Have a set of authorized signers and a threshold
Each signer calls approve(proposalId, signature)
mapping(proposalId => mapping(signer => bool)) approvals
Uses SignatureLib to verify signatures
mapping(address => uint256) nonces
isAuthorized(proposalId) returns true only when approval count ≥ threshold
Rejects already used nonces.
 */

 contract AuthLayer is IAuthLayer {
    mapping(address => bool) public isSigner;
    mapping(address => uint256) public nonces;
    mapping(bytes32 => mapping(address => bool)) public approvals;
    address[] private signers;
    uint256 public threshold;

    error NotASigner(address caller);
    error InvalidNonce(address signer, uint256 expected, uint256 actual);
    error AlreadyApproved(bytes32 proposalId, address signer);

    event SignerAdded(address signer);
    event SignerRemoved(address signer);
    event ThresholdUpdated(uint256 newThreshold);
    event ProposalApproved(bytes32 proposalId, address signer);

    constructor(address[] memory initialSigners, uint256 initialThreshold) {
        require(initialThreshold > 0 && initialThreshold <= initialSigners.length, "Invalid threshold");
        for (uint256 i = 0; i < initialSigners.length; i++) {
            isSigner[initialSigners[i]] = true;
            signers.push(initialSigners[i]);
            emit SignerAdded(initialSigners[i]);
        }
        threshold = initialThreshold;
        emit ThresholdUpdated(initialThreshold);
    }

    function approve(bytes32 proposalId, bytes calldata signature) external {
        if (!isSigner[msg.sender]) {
            revert NotASigner(msg.sender);
        }

        uint256 currentNonce = nonces[msg.sender];
        bytes32 signatureHash = SignatureLib.getTypedDataHash(proposalId, currentNonce);
        address recoveredSigner = SignatureLib.recoverSigner(signatureHash, signature);

        if (recoveredSigner != msg.sender) {
            revert InvalidNonce(msg.sender, currentNonce, nonces[msg.sender]);
        }
        if (approvals[proposalId][msg.sender]) {
            revert AlreadyApproved(proposalId, msg.sender);
        }

        approvals[proposalId][msg.sender] = true;
        nonces[msg.sender]++;
        emit ProposalApproved(proposalId, msg.sender);
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
