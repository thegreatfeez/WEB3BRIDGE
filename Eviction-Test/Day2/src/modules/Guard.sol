//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../Interface/IGuard.sol";

contract Guard is IGuard {
    uint256 public windowSize = 1 days;
    uint256 public drainLimitBps = 1000; // 10%
    uint256 public windowStart;
    uint256 public windowTotal;
    uint256 public minHoldBlocks = 1;

    mapping(address => uint256) public lastVoteBlock;

    error DrainLimitExceeded(uint256 attempted, uint256 limit);

    function checkDrainLimit(address account, uint256 amount) external returns (bool) {
        if (block.timestamp > windowStart + windowSize) {
            windowStart = block.timestamp;
            windowTotal = 0;
        }

        uint256 limit = (account.balance * drainLimitBps) / 10_000;
        if (windowTotal + amount > limit) {
            revert DrainLimitExceeded(windowTotal + amount, limit);
        }

        windowTotal += amount;
        return true;
    }

    function recordSnapshot(address account, uint256) external {
        lastVoteBlock[account] = block.number;
    }

    function isFlashLoanBlocked(address account) external view returns (bool) {
        uint256 snap = lastVoteBlock[account];
        if (snap == 0) {
            return false;
        }
        return block.number <= snap + minHoldBlocks;
    }
}
