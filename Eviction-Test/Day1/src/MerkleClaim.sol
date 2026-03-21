// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./VaultBase.sol";

contract MerkleClaim is VaultBase {
    error InvalidProof();
    error AlreadyClaimed();
    error TransferFailed();

    bytes32 public merkleRoot;
    mapping(address => bool) public claimed;

    event MerkleRootSet(bytes32 indexed newRoot);
    event Claim(address indexed claimant, uint256 amount);

    function setMerkleRoot(bytes32 root) external onlyOwner {
        merkleRoot = root;
        emit MerkleRootSet(root);
    }

    function claim(bytes32[] calldata proof, uint256 amount)
        external
        nonReentrant
        whenNotPaused
    {
        bytes32 leaf     = keccak256(abi.encodePacked(msg.sender, amount));
        bytes32 computed = MerkleProof.processProof(proof, leaf);
        if (computed != merkleRoot) {
            revert InvalidProof();
        }
        if (claimed[msg.sender]) {
            revert AlreadyClaimed();
        }

        claimed[msg.sender] = true;
        totalVaultValue -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert TransferFailed();
        }

        emit Claim(msg.sender, amount);
    }

    function verifySignature(
        address signer,
        bytes32 messageHash,
        bytes memory signature
    ) external pure returns (bool) {
        //I can't find any recover function in the MerkleProof lib folder.
        return ECDSA.recover(messageHash, signature) == signer;
    }
}
