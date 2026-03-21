//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "../src/libraries/MerkleLib.sol";
import "forge-std/Test.sol";

contract MerkleLibTest is Test {
    function testHashLeaf() public {
        address ganiyat = makeAddr("ganiyat");
        bytes32 leaf = MerkleLib.hashLeaf(ganiyat, 123);
        bytes32 expected = keccak256(abi.encodePacked(ganiyat, uint256(123)));
        assertEq(leaf, expected);
    }

    function testVerifySingleLeaf() public {
        address mutmahinat = makeAddr("mutmahinat");
        bytes32 leaf = MerkleLib.hashLeaf(mutmahinat, 50);
        bytes32[] memory proof = new bytes32[](0);
        bool ok = MerkleLib.verify(proof, leaf, leaf);
        assertTrue(ok);
    }

    function testVerifyFailsForWrongLeaf() public {
        address halimah = makeAddr("halimah");
        bytes32 leaf = MerkleLib.hashLeaf(halimah, 50);
        bytes32 wrongLeaf = MerkleLib.hashLeaf(halimah, 60);
        bytes32[] memory proof = new bytes32[](0);
        bool ok = MerkleLib.verify(proof, leaf, wrongLeaf);
        assertTrue(!ok);
    }
}
