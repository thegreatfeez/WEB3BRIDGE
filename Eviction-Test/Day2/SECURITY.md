# ARES Protocol Security Notes

This document is a plain‑language security overview of the current contracts in this repo. It is not an audit. The contracts are a learning‑focused implementation and should be treated as such.

## Scope
- `ProposalHub` (proposal storage and status)
- `AuthLayer` (signature approvals)
- `Timelock` (delay + execution)
- `Guard` (drain limit + snapshot guard)
- `Rewards` (merkle claims)
- `Treasury` (orchestrator)

## Main Risks and Current Mitigations

### 1. Compromised signers
If enough signer keys are stolen to meet the threshold, a malicious proposal can pass.
Mitigation: M‑of‑N threshold in `AuthLayer`.
Residual risk: signer key security is an off‑chain problem.

### 2. Signature replay
A valid signature could be reused if the message isn’t domain‑separated or nonces are missing.
Mitigation: `AuthLayer` uses EIP‑712 typed data with a domain separator and per‑signer nonces.
Residual risk: signer UX mistakes (signing wrong data) are still possible.

### 3. Flash‑loan voting
Attackers can borrow voting power in the same block to pass checks.
Mitigation: `Guard` records a snapshot block and blocks same‑block voting.
Residual risk: long‑term whales can still vote.

### 4. Timelock bypass
If a proposal can be executed immediately or re‑executed, the delay loses meaning.
Mitigation: `Timelock` enforces a fixed delay, tracks queued proposals, and blocks re‑execution.
Residual risk: timestamp manipulation is small but real (block time is not exact).

### 5. Reentrancy in execution
External calls can re‑enter and run logic twice.
Mitigation: `Timelock` sets status before the external call and uses a simple reentrancy guard.

### 6. Reward double‑claim
If a claim can be replayed, reward funds can be drained.
Mitigation: `Rewards` uses a `claimed` mapping and never resets it.
Residual risk: wrong merkle tree data off‑chain can still block valid users.

### 7. Treasury drain in a short window
A valid proposal could move a large amount quickly.
Mitigation: `Guard` tracks a rolling window and rejects transfers beyond a percent cap.
Residual risk: the cap is an economic choice; if set too high it won’t help.

## Non‑Goals
- No upgrade mechanism is included.
- No on‑chain voting token logic is included.
- No multisig or key recovery logic is included.
