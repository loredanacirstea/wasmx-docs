---
sidebar_position: 1
---

# Introduction

**wasmX** is a next-generation modular blockchain engine where the entire protocol stack—including consensus logic and core blockchain behavior—is implemented as WebAssembly (WASM) smart contracts. This radical modularity enables full programmability and upgradability at every layer of the blockchain, empowering developers with unprecedented flexibility and control.

## Key Features

### Fully Modular WASM Runtime
wasmX replaces the traditional hard-coded blockchain kernel with a modular runtime built entirely from smart contracts compiled to WASM. This includes core protocol logic, enabling seamless customization and hot-swappable upgrades.

### Language-Agnostic Smart Contracts
Developers can write contracts in any language that compiles to WebAssembly, including Rust, AssemblyScript, C/C++, and even Solidity via an Ethereum compatibility layer. This drastically lowers the barrier for developers coming from diverse ecosystems.

### Rich Host APIs
wasmX provides a powerful suite of host APIs that smart contracts can use:

* Ethereum API – Supports existing Solidity contracts and tools.

* WasmX Native API – Offers basic blockchain functions like storage, block info, and message handling.

* Multichain, crosschain & P2P APIs – For building interconnected blockchains and decentralized networks.

* gRPC Request API – Facilitates secure, extensible cross-chain or off-chain service communication.

* SQL & Key-Value Database APIs – Allowing structured and efficient on-chain/off-chain data access.

* IMAP/SMTP APIs – Enabling email-native interactions, identity, and verifiable communication on-chain.

### Built-In Interpreters for EVM, Python, JavaScript, and Diagrams
wasmX includes multiple built-in interpreters, allowing contracts or modules to run code written in EVM bytecode, Python, JavaScript, and a custom diagram-based interpreter. The diagram interpreter is currently used to define and run consensus algorithms visually and declaratively, powering consensus logic for wasmX-based chains without hardcoding it into the binary.

### AssemblyScript SDK
wasmX already includes a dedicated SDK for AssemblyScript, offering a streamlined developer experience for building lightweight, high-performance contracts in a TypeScript-like language.

### Cosmos Compatibility, Reinvented

While wasmX is compatible with Cosmos SDK-based chains, it has been completely WASM-modularized, decoupling it from the limitations of monolithic Cosmos modules and enabling new forms of governance, logic upgrades, and experimentation, all while the chain is live and running.

## The most flexible platform

Build sovereign blockchains with customizable consensus and protocol rules.

Prototype or evolve blockchain designs without deep C++/Golang kernel hacking and without forks.

Interconnect applications and data across domains using email, SQL, and standard networking.

Leverage existing Ethereum assets while exploring the broader capabilities of WASM.

Use high-level scripting and visual logic to define complex behaviors like consensus without sacrificing performance or modularity.
