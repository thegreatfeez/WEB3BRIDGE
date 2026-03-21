// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GAFToken is ERC20, Ownable {
    error NotEnoughFunds();
    error MaximumSupplyReached();
    error CooldownNotOver();
    error AccessDeniedForOwners();

    event Claimed(address indexed user, uint256 amount, uint256 nextClaimTime);

    uint256 public constant MAX_SUPPLY = 10_000_000 ether;
    uint256 public constant CLAIM_AMOUNT = 5 ether;
    uint256 public constant COOLDOWN = 1 days;
    mapping(address => uint256) public nextClaimTime;
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
        Ownable(msg.sender)
    {}

    function mint( uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, MaximumSupplyReached());
        _mint(address(this), amount);
    }

    function requestToken() external {
          if (balanceOf(address(this)) < CLAIM_AMOUNT) {
            revert NotEnoughFunds();
        }
        if(block.timestamp < nextClaimTime[msg.sender]) {
            revert CooldownNotOver();
        }
        if(msg.sender == owner()) revert AccessDeniedForOwners();

        nextClaimTime[msg.sender] = block.timestamp + COOLDOWN;

        _transfer(address(this), msg.sender, CLAIM_AMOUNT);

        emit Claimed(msg.sender, CLAIM_AMOUNT,  nextClaimTime[msg.sender]);
    }
}

