//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

//it Defines checkDrainLimit(), recordSnapshot(), isFlashLoanBlocked()
contract IGuard {
    function checkDrainLimit(address account, uint256 amount) external view returns (bool);

    function recordSnapshot(address account, uint256 balance) external;

    function isFlashLoanBlocked(address account) external view returns (bool);
}