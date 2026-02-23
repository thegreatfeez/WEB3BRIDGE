//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AtomProperties {
    error PriceMustBeGreaterThanZero();
    error NotPropertyOwner();
    error PropertyNotFound();


    struct Property {
        uint8 id;
        string name;
        string location;
        uint256 price;
        bool forSale;
        address owner;
    }

    IERC20 public paymentToken;

    constructor(address _tokenAddress) {
        paymentToken = IERC20(_tokenAddress);
    }

    function getIndex(uint8 _id) internal view returns (uint8) {
        for (uint8 i; i < properties.length; i++) {
            if (_id == properties[i].id) return i;
        }
        revert PropertyNotFound();
    }

    modifier onlyPropertyOwner(uint8 _id) {
        uint8 index = getIndex(_id);
        if (msg.sender != properties[index].owner) revert NotPropertyOwner();
        _;
    }

    uint8 property_id;
    Property[] public properties;

    function addProperty(string memory _name, string memory _location, uint256 _price) external {
        if (_price == 0) revert PriceMustBeGreaterThanZero();
        property_id = property_id + 1;
        properties.push(Property(property_id, _name, _location, _price, true, msg.sender));
    }

    function removeProperty(uint8 _id) external onlyPropertyOwner(_id) {
        uint8 index = getIndex(_id);
        properties[index] = properties[(properties.length) - 1];
        properties.pop();
    }

   

    function getAllProperties() external view returns (Property[] memory) {
        return properties;
    }
}
