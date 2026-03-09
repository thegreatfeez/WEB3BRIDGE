// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MultisigWallet is ReentrancyGuard {

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;
        uint256 submissionTime;
        uint256 executionTime;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public threshold;

    mapping(uint256 => mapping(address => bool)) public confirmed;
    mapping(uint256 => Transaction) public transactions;
    uint256 public txCount;

    uint256 public constant TIMELOCK_DURATION = 1 hours;

    error NotOwner();
    error NoOwners();
    error ZeroThreshold();
    error ThresholdExceedsOwners();
    error ZeroAddressOwner();
    error DuplicateOwner();
    error AlreadyExecuted();
    error AlreadyConfirmed();
    error BelowThreshold();
    error NotReady();
    error TimelockActive();
    error ExecutionFailed();

    event Submission(uint256 indexed txId);
    event Confirmation(uint256 indexed txId, address indexed owner);
    event Execution(uint256 indexed txId);

    modifier onlyOwner() {
        if (!isOwner[msg.sender]) revert NotOwner();
        _;
    }

    constructor(address[] memory _owners, uint256 _threshold) {
        if (_owners.length == 0) revert NoOwners();
        if (_threshold == 0) revert ZeroThreshold();
        if (_threshold > _owners.length) revert ThresholdExceedsOwners();

        threshold = _threshold;

        for (uint256 i = 0; i < _owners.length; i++) {
            address o = _owners[i];
            if (o == address(0)) revert ZeroAddressOwner();
            if (isOwner[o]) revert DuplicateOwner();
            isOwner[o] = true;
            owners.push(o);
        }
    }

    function submitTransaction(address to, uint256 value, bytes calldata data)
        external
        onlyOwner
    {
        uint256 id = txCount++;
        transactions[id] = Transaction({
            to:            to,
            value:         value,
            data:          data,
            executed:      false,
            confirmations: 1,
            submissionTime: block.timestamp,
            executionTime:  0
        });
        confirmed[id][msg.sender] = true;
        emit Submission(id);
    }

    function confirmTransaction(uint256 txId) external onlyOwner {
        Transaction storage txn = transactions[txId];
        if (txn.executed) revert AlreadyExecuted();
        if (confirmed[txId][msg.sender]) revert AlreadyConfirmed();

        confirmed[txId][msg.sender] = true;
        txn.confirmations++;

        if (txn.confirmations == threshold) {
            txn.executionTime = block.timestamp + TIMELOCK_DURATION;
        }
        emit Confirmation(txId, msg.sender);
    }

    function executeTransaction(uint256 txId) external nonReentrant onlyOwner {
        Transaction storage txn = transactions[txId];
        if (txn.confirmations < threshold) revert BelowThreshold();
        if (txn.executed) revert AlreadyExecuted();
        if (txn.executionTime == 0) revert NotReady();
        if (block.timestamp < txn.executionTime) revert TimelockActive();

        txn.executed = true;

        (bool success, ) = txn.to.call{value: txn.value}(txn.data);
        if (!success) revert ExecutionFailed();

        emit Execution(txId);
    }

    receive() external payable {}
}
