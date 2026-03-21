//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/libraries/SignatureLib.sol";
import "forge-std/Test.sol";

contract SignatureLibWrapper {
    function buildDomainSeparator(string memory name, string memory version) external view returns (bytes32) {
        return SignatureLib.buildDomainSeparator(name, version);
    }

    function hashTypedData(bytes32 domainSeparator, bytes32 structHash) external pure returns (bytes32) {
        return SignatureLib.hashTypedData(domainSeparator, structHash);
    }

    function recover(bytes32 digest, uint8 v, bytes32 r, bytes32 s) external pure returns (address) {
        return SignatureLib.recover(digest, v, r, s);
    }

    function validateMalleability(bytes32 s) external pure returns (bool) {
        return SignatureLib.validateMalleability(s);
    }

    function nonceKey(address signer, uint256 nonce) external pure returns (bytes32) {
        return SignatureLib.nonceKey(signer, nonce);
    }
}

contract SignatureLibTest is Test {
    SignatureLibWrapper wrapper;

    function setUp() public {
        wrapper = new SignatureLibWrapper();
    }

    function testBuildDomainSeparator() public {
        bytes32 ds = wrapper.buildDomainSeparator("Test", "1");
        bytes32 expected = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("Test")),
                keccak256(bytes("1")),
                block.chainid,
                address(wrapper)
            )
        );
        assertEq(ds, expected);
    }

    function testHashTypedDataAndRecover() public {
        uint256 pk = 0xA11CE;
        address signer = vm.addr(pk);

        bytes32 domainSeparator = wrapper.buildDomainSeparator("Test", "1");
        bytes32 structHash = keccak256(abi.encode("hello"));
        bytes32 digest = wrapper.hashTypedData(domainSeparator, structHash);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(pk, digest);
        address recovered = wrapper.recover(digest, v, r, s);
        assertEq(recovered, signer);
    }

    function testNonceKey() public {
        address ganiyat = makeAddr("ganiyat");
        bytes32 key = wrapper.nonceKey(ganiyat, 5);
        bytes32 expected = keccak256(abi.encodePacked(ganiyat, uint256(5)));
        assertEq(key, expected);
    }
}
