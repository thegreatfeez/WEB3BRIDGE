# ARES Protocol (Minimal)

ARES Protocol is a small, modular DAO treasury design. It is built around simple, readable contracts that show how proposals are created, approved, queued, and executed with safety checks. The goal is not to be a full production system, but a clear learning‑friendly layout that still follows good security practices like EIP‑712 signatures, timelock delays, and guardrails against fast drain or flash‑loan style voting.

## Core Modules
- `ProposalHub`: stores proposals in a `mapping` and tracks their lifecycle (Pending → Approved → Queued → Executed/Cancelled).
- `AuthLayer`: holds an allowlist of signers and a threshold. Signers approve proposals with EIP‑712 signatures and per‑signer nonces.
- `Timelock`: enforces a delay before execution and prevents re‑execution. It also uses a simple reentrancy guard.
- `Guard`: tracks a rolling execution window and blocks transfers that exceed a configured drain limit. It also records snapshot blocks to limit flash‑loan voting.
- `Rewards`: lets contributors claim rewards using a merkle root. Each address can claim once.
- `Treasury`: orchestrator that calls `Guard`, `AuthLayer`, and `Timelock` in order.

## Lifecycle
1. A proposer creates a proposal in `ProposalHub`.
2. Authorized signers approve it in `AuthLayer` using signatures.
3. The proposal is queued in `Timelock` and waits for the delay.
4. `Treasury` executes the proposal after checks pass.

## Repository Notes
- Interfaces live in `src/Interface/`
- Libraries live in `src/libraries/`
- Modules live in `src/modules/`
- The orchestrator is in `src/core/`

This repo focuses on contract structure and flow, not frontend or deployment scripts. Tests are intentionally left out for now, but the design is ready for them.
