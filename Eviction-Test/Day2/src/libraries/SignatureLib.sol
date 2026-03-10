//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

library SignatureLib {
    //this is like the fingerprint itself. It is the hash of the message that we want to sign.
    bytes32 internal constant _EIP712_DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

    //This helps to prevent one signature being used multiple times. 
    bytes32 internal constant _SECP256K1N_HALF = 0x7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0;

    // its hashes the protocol name, version, chainId and contract address, so we can only use the signature for this specific contract and chain.
    function buildDomainSeparator(string memory name, string memory version) internal view returns (bytes32) {
        return keccak256(
            abi.encode(
                _EIP712_DOMAIN_TYPEHASH,
                keccak256(bytes(name)),
                keccak256(bytes(version)),
                block.chainid,
                address(this)
            )
        );
    }

    // This is the final hash that we will sign. It combines the domain separator and the message hash.
    function hashTypedData(bytes32 domainSeparator, bytes32 structHash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
    }

    // as the name sounds, it recovers the signer address from the signature. It checks that the signature is valid and has not been used, before recovering the address.
    function recover(bytes32 digest, uint8 v, bytes32 r, bytes32 s) internal pure returns (address) {
        if (v < 27) {
            v += 27;
        }
        require(v == 27 || v == 28, "SignatureLib: bad v");
        require(validateMalleability(s), "SignatureLib: high s");

        return ecrecover(digest, v, r, s);
    }

    function validateMalleability(bytes32 s) internal pure returns (bool) {
        return uint256(s) <= uint256(_SECP256K1N_HALF) && s != bytes32(0);
    }

    function nonceKey(address signer, uint256 nonce) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(signer, nonce));
    }
}
