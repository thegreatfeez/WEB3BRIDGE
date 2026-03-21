// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract VaultBase is Ownable, ReentrancyGuard {

    mapping(address => uint256) public balances;
    uint256 public totalVaultValue;
    bool public paused;

    error VaultPaused();
    error VaultNotPaused();
    error InsufficientBalance();
    error VaultTransferFailed();
    error VaultEmergencyTransferFailed();

    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed withdrawer, uint256 amount);
    event EmergencyWithdrawal(address indexed recipient, uint256 amount);

    constructor() Ownable(msg.sender) {}

    modifier whenNotPaused() {
        if (paused) revert VaultPaused();
        _;
    }

    modifier whenPaused() {
        if (!paused) revert VaultNotPaused();
        _;
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
        totalVaultValue += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        totalVaultValue += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant whenNotPaused {
        if (balances[msg.sender] < amount) revert InsufficientBalance();

        balances[msg.sender] -= amount;
        totalVaultValue -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert VaultTransferFailed();

        emit Withdrawal(msg.sender, amount);
    }

    function pause() external onlyOwner {
        paused = true;
    }

    function unpause() external onlyOwner {
        paused = false;
    }

    function emergencyWithdrawAll() external onlyOwner whenPaused nonReentrant {
        uint256 balance = address(this).balance;
        totalVaultValue = 0;

        (bool success, ) = payable(msg.sender).call{value: balance}("");
        if (!success) revert VaultEmergencyTransferFailed();

        emit EmergencyWithdrawal(msg.sender, balance);
    }
}
