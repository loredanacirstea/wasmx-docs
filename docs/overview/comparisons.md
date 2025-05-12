---
sidebar_position: 2
---

# Comparisons

## Blockchain VMs

| Dimension | WasmX | EthereumVM | CosmWasm |
|-----------|-------|------------|----------|
| Protocol Upgrades | 95% live on a running chain, 5% hard fork | 100% Hard Fork | Limited Governed Upgrades   |
| Smart Contract Languages    | any WASM-compiled or interpreted by a WASM contract | Solidity | Rust   |
| MultiChain    | yes | no | no   |
| CrossChain    | yes | no | yes   |
| VM host API extensions    | yes | no | no   |
| Mobile support    | yes | no | no   |
| Decentralized development    | yes | no | no   |


### Smart Contract Languages

* **wasmX**: any WASM-compiled language or any language with an interpreter compiled to WASM. Currently: AssemblyScript, Solidity, Rust, Go/TinyGo, JavaScript, Python, visual language for creating finite state machines, taylor (Lisp-like language)
* **EthereumVM**: Solidity
* **CosmWasm**: Rust

#### wasmX language support:

| Language | compiled to WASM | interpreted by WASM contract | compiled to assembly and interpreted by WASM contract |
|-----------|-------|------------|----------|
| Solidity | - | - | yes   |
| Yul | - | - | yes   |
| EVM assembly | yes | yes | -   |
| Rust | yes | - | -   |
| AssemblyScript | yes | - | -   |
| JavaScript | yes | yes | -   |
| Python | - | yes | -   |
| TinyGo | yes | - | -   |
| C/C++ | yes | - | -   |
| graphical FSM | - | yes | -   |


### MultiChain

* **wasmX**: supports running multiple chains on the same node client.
* **EthereumVM**: no
* **CosmWasm**: no

### CrossChain

* **wasmX**: supports cross-chain communication between wasmX blockchains and optionally, between wasmX and Cosmos chains (IBC)
* **EthereumVM**: no
* **CosmWasm** chains: yes, between Cosmos chains throught IBC.


### Protocol Upgrades
* **wasmX**: 95% of updates will be done live, on a running chain, through community governance. Including new feature additions, data structures extension, consensus changes. No need for validators to synchronize human presence for an upgrade.
* **EthereumVM**: hard forks for adding features, validators meet at appointed time for upgrade.
* **CosmWasm/Cosmos**: governed upgrades are limited to the hardcoded Cosmos SDK structure. Changing consensus protocols or data encodings requires a fork.

### VM host API extensions

* **wasmX**: yes, host API extensions are supported. Current API interfaces: wasmX, ewasm (EVM in WASM), CosmWasm, p2p, grpc, multichain, crosschain, SQL-like and key-value databases, IMAP, SMTP.
* **EthereumVM**: no
* **CosmWasm**: no

### Mobile support

* **wasmX**: yes, we have tested running a wasmX blockchain on Android and iOS
* **EthereumVM**: no
* **CosmWasm**: no

### Decentralized development

* **wasmX**: yes, anyone can build WASM modules to replace or add features and propose it by governance in a public way, with the same visibility as any other proposal.
* **EthereumVM**: multiple clients and teams with unequal public visibility
* **CosmWasm**: centralized CosmWasm development, multiple chains with centralized teams using CosmWasm



## WASM standards

wasmX vs. WASIX (https://wasix.org/)

| Dimension | WasmX | WASI | WASIX |
|-----------|-------|------|-------|
| Target   | Multi-node consensus | Single CPU | Multi CPU    |


