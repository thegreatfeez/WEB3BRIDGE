// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import {ERC20Token} from "./ERC20Token.sol";

contract SaveEther {
    ERC20Token public token;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public tokenBalances;

    event DepositSuccessful(address indexed sender, uint256 indexed amount);
    event TokenDepositSuccessful(address indexed sender, uint256 indexed amount);
    event WithdrawalSuccessful(address indexed receiver, uint256 indexed amount, bytes data);
    event TokenWithdrawalSuccessful(address indexed receiver, uint256 indexed amount);

    constructor(address _tokenAddress) {
        token = ERC20Token(_tokenAddress);
    }

 
    function deposit() external payable {
        // require(msg.sender != address(0), "Address zero detected");
        require(msg.value > 0, "Can't deposit zero value");

        balances[msg.sender] = balances[msg.sender] + msg.value;

        emit DepositSuccessful(msg.sender, msg.value);
    }

    function depositToken(uint256 _amount) external {
        require(_amount > 0, "Can't deposit zero tokens");
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient token balance");
        
       
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        
        
        tokenBalances[msg.sender] = tokenBalances[msg.sender] + _amount;
        
        emit TokenDepositSuccessful(msg.sender, _amount);
    }

   
  
    function withdraw(uint256 _amount) external {
        require(msg.sender != address(0), "Address zero detected");

        // the balance mapping is a key to value pair, if the key is
        // provided it retuns the value at that location.
        //
        uint256 userSavings_ = balances[msg.sender];

        require(userSavings_ > 0, "Insufficient funds");

        balances[msg.sender] = userSavings_ - _amount;

        // (bool result,) = msg.sender.call{value: msg.value}("");
        (bool result, bytes memory data) = payable(msg.sender).call{value: _amount}("");

        require(result, "transfer failed");

        emit WithdrawalSuccessful(msg.sender, _amount, data);
    }
   
    function withdrawToken(uint256 _amount) external {
        require(msg.sender != address(0), "Address zero detected");
        require(_amount > 0, "Can't withdraw zero tokens");

        uint256 userTokenSavings_ = tokenBalances[msg.sender];
        require(userTokenSavings_ >= _amount, "Insufficient token funds");

       
        tokenBalances[msg.sender] = userTokenSavings_ - _amount;

       
        require(token.transfer(msg.sender, _amount), "Token transfer failed");

        emit TokenWithdrawalSuccessful(msg.sender, _amount);
    }

    function getUserSavings() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getUserTokenSavings() external view returns (uint256) {
        return tokenBalances[msg.sender];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getContractTokenBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    receive() external payable {}
    fallback() external {}
}