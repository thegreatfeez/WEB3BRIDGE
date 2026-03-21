// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MerkleClaim.sol";
import "./MultisigWallet.sol";

contract EvictionVault is MerkleClaim {

    MultisigWallet public multisig;

    error NoOwners();
    error ZeroThreshold();
    error ThresholdExceedsOwners();

    constructor(
        address[] memory _owners,
        uint256 _threshold
    ) payable {
        if (_owners.length == 0) revert NoOwners();
        if (_threshold == 0) revert ZeroThreshold();
        if (_threshold > _owners.length) revert ThresholdExceedsOwners();

        MultisigWallet _multisig = new MultisigWallet(_owners, _threshold);
        multisig = _multisig;

        _transferOwnership(address(_multisig));

        totalVaultValue = msg.value;
    }
}
