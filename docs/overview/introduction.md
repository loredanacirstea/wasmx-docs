---
sidebar_position: 1
---

# Introduction

**wasmX** is a next-generation modular blockchain engine where the entire protocol stack, including consensus logic and core blockchain behavior, is implemented as WebAssembly (WASM) smart contracts.

This radical modularity enables full programmability and upgradability at every layer of the blockchain, empowering developers with unprecedented flexibility and control.

wasmX is a self-funded volunteer project spanning 4+ years.

## wasmX platform: truly decentralized development

wasmX enables fully independent (teams of) developers to work in parallel and in any language that can be compiled to WASM.
wasmX blockchains can be upgraded while they are running, through on-chain governance, achieving full programmability and upgradability at every protocol layer and extension, from consensus protocol to governance processes, to VM interpreters and encoding. Seamless customization and hot-swappable upgrades.

While wasmX blockchains can be used as a financial platform, our extensions enable a wide range of use cases: identity verification (wasmX already has Estonian eID signature verification), digital proof creation for transient web2 data, immutable time and space proofs for images and video, provable email standards for European citizens.

## Key Features


**wasmX is**:
- multiVM: multiple virtual machines: EthereumVM, wasmX standard, CosmWasm standard. In plan: Risc-V, upholding compatibility with the future [EthereumVM](https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617)
- language-agnostic smart contracts: any language that compiles to WASM or has a WASM interpreter contract; wasmX supports now: AssemblyScript, Rust, C/C++, Golang/TinyGo, Solidity, Yul, EVM assembly, JavaScript, Python, visual language for finite state machine diagrams
- agnostic WASM memory interface: supports adapters for reading and writing from/to WASM modules (a prerequisite for being language agnostic)
- consensus protocol agnostic: the consensus protocol is implemented as an upgradable smart contract
- WASM engine agnostic
- extensible: aside from protocol extensibility through WASM contracts, we have also added core WASM host APIs for networking (GRPC, p2p), SQL databases, IMPA/SMTP protocol.
- supports subchain creation: wasmX subchains are fully fledged blockchains, customized through a decentralized genesis process inscribed on an existing public or private blockchain
- extensible with both deterministic and non-deterministic  features or determinism guaranteed by multi-party verified protocols (creating immutable proofs for web2 items, like web pages, emails, and more)
- mobile-friendly: we have run wasmX blockchains on mobile (tested on both Android and iOS)
- encoding agnostic (work in progress)

**wasmX makes a distinction between:**
* deterministic contracts (public, external, on-chain) and non-deterministic contracts (can be internal, private, on private wasmX subchains)
* deterministic host APIs and non-deterministic host APIs (usually system/protocol-level APIs)

## Effects

wasmX offers the building blocks for a global blockchain platform. Our flexibility enables both experienced software engineers and young individuals to build consequential applications for their use cases.

wasmX drastically lowers the barrier for developers coming from diverse ecosystems. Easy to use languages for smart contracts are a gateway for many beginners to learn coding and build applications for their peers.

## The most flexible platform

Build sovereign blockchains with customizable consensus and protocol rules.

Prototype or evolve blockchain designs without deep C++/Golang kernel hacking and without forks.

Interconnect applications and data across domains using email, SQL, and standard networking.

Leverage existing Ethereum assets while exploring the broader capabilities of WASM.

Use high-level scripting and visual logic to define complex behaviors like consensus without sacrificing performance or modularity.
