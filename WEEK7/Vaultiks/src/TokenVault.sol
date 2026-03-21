// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVault {
    error TokenVault__AmountMustBeGreaterThanZero();
    error TokenVault__TransferFromFailed();
    error TokenVault__InsufficientBalance();
    error TokenVault__TransferFailed();

    address public token;
    address public factory;
    uint256 public totalDeposited;
    uint256 public createdAt;
    mapping(address => uint256) public balanceOf;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _token, address _factory) {
        token = _token;
        factory = _factory;
        createdAt = block.timestamp;
    }

    function deposit(uint256 amount) external {
        if (amount == 0) revert TokenVault__AmountMustBeGreaterThanZero();

        bool ok = IERC20(token).transferFrom(msg.sender, address(this), amount);
        if (!ok) revert TokenVault__TransferFromFailed();

        balanceOf[msg.sender] += amount;
        totalDeposited += amount;

        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        if (amount == 0) revert TokenVault__AmountMustBeGreaterThanZero();
        if (balanceOf[msg.sender] < amount) revert TokenVault__InsufficientBalance();

        
        balanceOf[msg.sender] -= amount;
        totalDeposited -= amount;

        bool ok = IERC20(token).transfer(msg.sender, amount);
        if (!ok) revert TokenVault__TransferFailed();

        emit Withdrawn(msg.sender, amount);
    }
}
