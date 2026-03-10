//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../Interface/IRewards.sol";
import "../libraries/MerkleLib.sol";

contract Rewards is IRewards {
    bytes32 public merkleRoot;
    address public governor;
    mapping(address => bool) private claimed;

    error AlreadyClaimed(address account);
    error InvalidProof();
    error NotGovernor(address caller);
    error TransferFailed();

    event RootUpdated(bytes32 newRoot);
    event RewardClaimed(address recipient, uint256 amount);

    constructor(bytes32 initialRoot, address governor_) {
        merkleRoot = initialRoot;
        governor = governor_;
    }

    function claim(address recipient, uint256 amount, bytes32[] calldata proof) external {
        if (claimed[recipient]) {
            revert AlreadyClaimed(recipient);
        }

        bytes32 leaf = MerkleLib.hashLeaf(recipient, amount);
        if (!MerkleLib.verify(proof, merkleRoot, leaf)) {
            revert InvalidProof();
        }

        claimed[recipient] = true;
        (bool ok, ) = recipient.call{value: amount}("");
        if (!ok) {
            revert TransferFailed();
        }
        emit RewardClaimed(recipient, amount);
    }

    function updateRoot(bytes32 newRoot) external {
        if (msg.sender != governor) {
            revert NotGovernor(msg.sender);
        }
        merkleRoot = newRoot;
        emit RootUpdated(newRoot);
    }

    function hasClaimed(address account) external view returns (bool) {
        return claimed[account];
    }

    receive() external payable {}
}
