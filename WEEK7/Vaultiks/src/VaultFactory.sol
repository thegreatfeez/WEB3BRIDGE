// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TokenVault.sol";
import "./VaultNFT.sol";

contract VaultFactory {
    error VaultFactory__ZeroAddress();
    error VaultFactory__VaultAlreadyExists();

    VaultNFT public nft;
    uint256 public vaultCount;

    // token address => vault address
    mapping(address => address) public vaultOf;

    // vault address => tokenId
    mapping(address => uint256) public tokenIdOf;

    event VaultDeployed(
        address indexed token,
        address indexed vault,
        address indexed deployer,
        uint256 tokenId
    );

    constructor(string memory _svgTemplate) {
        nft = new VaultNFT(_svgTemplate, address(this));
    }

    function deployVault(address token) external returns (address vault) {
        if (token == address(0)) revert VaultFactory__ZeroAddress();
        if (vaultOf[token] != address(0)) revert VaultFactory__VaultAlreadyExists();

        bytes32 salt = bytes32(uint256(uint160(token)));

        vault = address(new TokenVault{salt: salt}(token, address(this)));

        uint256 tokenId = nft.mint(msg.sender, vault);

        vaultOf[token] = vault;
        tokenIdOf[vault] = tokenId;
        vaultCount++;

        emit VaultDeployed(token, vault, msg.sender, tokenId);
    }

    function getVaultAddress(address token) external view returns (address predicted) {
        bytes32 salt = bytes32(uint256(uint160(token)));

        bytes memory bytecode = abi.encodePacked(
            type(TokenVault).creationCode,
            abi.encode(token, address(this))
        );

        bytes32 hash = keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(bytecode)
        ));

        predicted = address(uint160(uint256(hash)));
    }
}
