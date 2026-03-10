//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// verify(proof[], root, leaf) and return bool and also hashLeaf(address, amount)

 library MerkleLib {
    function verify(bytes32[] memory proof,bytes32 root,bytes32 leaf) internal pure returns (bool) {
        bytes32 hashedLeaf = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 hashProof = proof[i];

            if (hashedLeaf <= hashProof) {
                hashedLeaf = keccak256(abi.encodePacked(hashedLeaf, hashProof));
            } else {
                hashedLeaf = keccak256(abi.encodePacked(hashProof, hashedLeaf));
            }
        }

        return hashedLeaf == root;
    }

    function hashLeaf(address account, uint256 amount) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(account, amount));
    }
}