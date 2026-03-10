// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// this interface defines the claimReward() function, updateRoot(), hasClaimed().

//note thing to remember when implementing this interface: i don't want to use a function for hasClaimed(), 
// will prefer to use an enum or mapping instead.

contract IRewards {
    function claimReward(bytes32[] calldata proof, uint256 amount) external;

    function updateRoot(bytes32 newRoot) external;

    function hasClaimed(address account) external view returns (bool);
}