---
sidebar_position: 3
---

# Features Overview


## Multi-VM

* EVM: maximally efficient Ethereum virtual machine interpreter
* FSM: finite state machine interpreter with graphical interface
* JS: JavaScript interpreter
* Python: Python interpreter
* CosmWASM
* Risc-V (planned)

## Language agnostic

- EVM: Solidity, Iul, EVM assembly
- WASM: AssemblyScript, Rust, TinyGo
- Javascript
- Python

## Host APIs

Communication interfaces between the host application and smart contracts. This interface may include imperative execution commands from contract-to-host and reentry mechanisms for host-to-contract communication.

- [ewasm (ethereumVM in WASM)](../apis/ewasm.md)
- [cosmwasm](../apis/cosmwasm.md)
- [wasmX blockchain-specific APIs](../apis/wasmx.md)
- WASI for blockchain
- JS web bindings (TODO)
- protocol APIs
- GRPC API
- HTTP REST API
- p2p API
- SQL-like databases API
- key-value databases API
- IMAP protocol API
- SMTP protocol API
- multi-chain API (one node, multiple chains)
- cross-chain API (cross-chain transactions and queries)
- system API: scheduler, background processes
- AI (vector embeddings) databases


## wasmX core modules (WASM contracts)

- roles
- hooks
- storage
- contract registry
- alias
- consensus
- bank
- governance
- staking
- slashing
- math operations precompiles
- various language interpreters
- various consensus algorithms
- dtype
- identity verification - European eID management
- multichain registry
- p2p chat
