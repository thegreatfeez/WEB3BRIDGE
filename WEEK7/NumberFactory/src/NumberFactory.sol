// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract NumberFactory {
    // event YYY(address);

    // function registerNumber(uint256 _no) external {

    //     // deploy clone
    //     bytes32 y = keccak256(abi.encodePacked(_no));
    //     NumberChildren n = new NumberChildren{salt: y}(_no);

    //     emit YYY(address(n));

    // }
    function registerNumber(uint256 _no) public returns(address){
        bytes32 y = keccak256(abi.encodePacked(_no));
        bytes memory _bytecode = abi.encodePacked(type(NumberChildren).creationCode, abi.encode(_no));
        address addr;

        assembly {
            addr := create2(
                callvalue(),
                add(_bytecode, 0x20),
                mload(_bytecode),
                y
            )

            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        return addr;
    }
}

contract NumberChildren {
    uint256 ownerNumber;

    constructor(uint256 _no) {
        ownerNumber = _no;
    }

    function checkHash() public view returns(bytes32 r) {
        r = keccak256(abi.encodePacked(ownerNumber));
    }


}