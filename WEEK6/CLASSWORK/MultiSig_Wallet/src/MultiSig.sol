// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MultiSig {
    address[] public signers;
    mapping(address => bool) public isSigner;
    uint8 public minRequiredConfirmation;
    mapping(uint8 => mapping(address => bool)) public confirmations;

    struct Transaction {
        uint8 id;
        address recepient;
        uint256 amount;
        bool executed;
        uint256 numOfConfirmations;
    }
    Transaction[] public transactions;
    uint8 txId;

    modifier onlyOwner() {
        require(isSigner[msg.sender], "Not the owner");
        _;
    }

    constructor(address[] memory _signers, uint8 _numConfirmationsRequired) {
        require(_signers.length > 0, "At least one owner required");
        require(
            _numConfirmationsRequired > 0 && _numConfirmationsRequired <= _signers.length,
            "Invalid number of required confirmations"
        );
        minRequiredConfirmation = _numConfirmationsRequired;

        for (uint256 i = 0; i < _signers.length; i++) {
            address signer = _signers[i];
            require(signer != address(0), "Invalid Account");
            require(!isSigner[signer], "Not a signer");
            isSigner[signer] = true;
            signers.push(signer);
        }
    }

    function submitTransaction(address _to, uint256 _value) external onlyOwner {
        require(address(_to) != address(0), "can't send to address zero");
        require(_value != 0, "can not withdraw zero balance");
        txId = txId + 1;

        Transaction memory transaction = Transaction(txId, _to, _value, false, 0);
        transactions.push(transaction);
    }

    function confirmTransaction(uint8 _txId) external onlyOwner {
        require(!confirmations[_txId][msg.sender], "Transaction already confirmed");
        for (uint8 i; i < transactions.length; i++) {
            if (_txId == transactions[i].id) {
                require(!transactions[i].executed, "Transaction already executed");
                confirmations[_txId][msg.sender] = true;
                transactions[i].numOfConfirmations = transactions[i].numOfConfirmations + 1;
                break;
            }
        }
    }

    function executeTransaction(uint8 _txId) public onlyOwner {
        for (uint8 i; i < transactions.length; i++) {
            if (_txId == transactions[i].id) {
                require(
                    transactions[i].numOfConfirmations >= minRequiredConfirmation,
                    "Cannot execute transaction: not enough confirmations"
                );
                transactions[i].executed = true;
                (bool success,) = payable(transactions[i].recepient).call{value: transactions[i].amount}("");
                require(success, "Transaction failed");
            }
        }
    }

    function getSigners() public view returns (address[] memory) {
        return signers;
    }

    function deposit() public payable {}
}
