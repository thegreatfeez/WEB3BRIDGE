//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ERC20Token {
    error ERC20Token__InvalidAddress();
    error ERC20Token__InsufficientBalance();
    error ERC20Token__InsufficientAllowance();
    error ERC20Token__ResetAllowanceFirst();

    string public tokenName;
    uint8 public tokenDecimal;
    string public tokenSymbol;
    uint256 public tokenSupply;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed sender, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimal, uint256 _supply) {
        tokenName = _name;
        tokenSymbol = _symbol;
        tokenDecimal = _decimal;
        tokenSupply = _supply;
        balances[msg.sender] = _supply;
    }

    function name() public view returns (string memory) {
        return tokenName;
    }

    function decimal() public view returns (uint8) {
        return tokenDecimal;
    }

    function symbol() public view returns (string memory) {
        return tokenSymbol;
    }

    function totalSupply() public view returns (uint256) {
        return tokenSupply;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        if (_owner == address(0)) revert ERC20Token__InvalidAddress();
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) external returns (bool success) {
        if (balances[msg.sender] < _value) revert ERC20Token__InsufficientBalance();

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success) {
        if (_from == address(0) || _to == address(0)) revert ERC20Token__InvalidAddress();
        if (balances[_from] < _value) revert ERC20Token__InsufficientBalance();
        if (allowances[_from][msg.sender] < _value) revert ERC20Token__InsufficientAllowance();

        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool success) {
        if (_spender == address(0)) revert ERC20Token__InvalidAddress();
        if (allowances[msg.sender][_spender] != 0) revert ERC20Token__ResetAllowanceFirst();

        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return allowances[_owner][_spender];
    }
}