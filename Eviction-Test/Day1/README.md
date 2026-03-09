A README.md file detailing the implemented fixes and the current state of the contract.

# MerkleClaim and MultisigWallet Contracts
For the `setMerkleRoot` that was previously callable by anyone, what i did was to implement an `onlyOwner` modifier to restrict access to authorized addresses only. This ensures that only the contract owner can update the Merkle root, preventing unauthorized changes.

For the `emergencyWithdrawAll` function, I restricted access with the `onlyOwner` modifier and implemented a `whenPaused` modifier. This means that the emergency withdrawal can only be executed by the owner and only when the contract is paused, ensuring that it can only be used during a verified emergency.

And the `pause` and `unpause` functions, I changed the type of ownership to a Multisig type, which will require multiple signatures to execute critical functions. So this will solve for the single ownership vunurability.

For the `receive()` function that uses `tx.origin`, I removed all logic involving `tx.origin` and replaced it with `msg.sender` for address checks.

For the `withdraw` and `claim` functions that use `.transfer`, I replaced `.transfer()` with `.call{value: amount}("")`. I feel this was because what we were told in class that `.tranfer()` has a fixed gas limit of 2300 gas, which can cause issue during transaction. Also `send()` also have similar issue. So the only safe way is `.call()`.

Finally, for the timelock execution, I ensured that any sensitive state changes, such as root updates, are routed through a Timelock Controller contract.