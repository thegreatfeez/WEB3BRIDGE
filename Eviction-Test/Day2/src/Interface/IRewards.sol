// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// this interface defines claim(), updateRoot(), hasClaimed().

interface IRewards {
    function claim(address recipient, uint256 amount, bytes32[] calldata proof) external;

    function updateRoot(bytes32 newRoot) external;

    function hasClaimed(address account) external view returns (bool);
}
