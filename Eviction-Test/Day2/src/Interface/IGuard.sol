//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// it defines checkDrainLimit(), recordSnapshot(), isFlashLoanBlocked()
interface IGuard {
    function checkDrainLimit(address account, uint256 amount) external returns (bool);

    function recordSnapshot(address account, uint256 balance) external;

    function isFlashLoanBlocked(address account) external view returns (bool);
}
