//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// this interface defines the queu(), execute(), and cancel

contract ILock {
    function queue(
        address target,
        uint256 value,
        bytes calldata data,
        uint256 estimatedTimeOfArrival
    ) external returns (bytes32);

    function execute(
        address target,
        uint256 value,
        bytes calldata data,
        uint256 estimatedTimeOfArrival
    ) external payable returns (bytes memory);

    function cancel(bytes32 txHash) external;
}