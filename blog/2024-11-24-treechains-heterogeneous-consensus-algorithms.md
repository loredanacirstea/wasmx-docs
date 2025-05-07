---
slug: treechains-heterogeneous-consensus-algorithms
title: MythosX - Treechains - heterogeneous consensus algorithms for blockchains [visual finite state machines]
authors: loredana
tags: [wasmx,treechains,mythos]
---

# MythosX: Treechains: heterogeneous consensus algorithms for blockchains

Simple blockchains are dying, long live the trees of blockchains.

MythosX presents treechains:  heterogeneous consensus algorithms for blockchains as WASM-interpreted graphical finite state machines.

<!-- truncate -->

Decentralized, immutable, proof-based technology is to Artificial Intelligence what Shiva is to Shakti.

The digital world needs grounding, needs boundaries and a solid structure, for intelligence to flow harmoniously.

We are building the next-next generation of shivachains.

We have talked about trees of blockchains and MythosX and the type of cross-chain transactions that this system enables. You know by now that our systems are WebAssembly based and upgradable.

I will show you how MythosX uses a heterogeneous system of consensus algorithms.

First, Mythos uses Tendermint, implemented as a finite state machine, interpreted by a WASM contract. This diagram is what runs the protocol. I change this diagram, I change the protocol. In previous videos I've discussed our state machine interpreter and this diagram in detail.

Then, for our hierarchical tree chain that grows from the grassroots upwards, we have our LevelX consensus protocol. This is a simplified version of Tendermint. LevelX is the default consensus protocol, but the subchains can use whatever consensus algorithm is available.

Then, for our private, node-specific Level0 subchain, we have our Level0 on-demand consensus. Level0 is a private chain that records all node-specific negotiations, configurations, setups and even user chats. So, it does not need to produce blocks all the time. So, it only produces blocks at startup and whenever transactions come.
Most of the time, it stays in this waiting state. And when it produces a block, it transitions into the Validator state. This protocol is the LevelX protocol. So, we can have a version of Tendermint that does the same thing.

And this is a demonstration of this new, on-demand consensus protocol.

I have set up two nodes here, with Mythos and Level0. Let's start them and check the level0 logs.
So, after initialization, we see a block being produced and then, block production on Level0, stops.
But, we have a Lobby contract that negotiates the creation of a level1 subchain with the other node. So, these negotiation transactions trigger Level0 blocks.

If we send a transaction, for example a genesis transaction for this level1 subchain, we see it being registered and a block is produced.

Otherwise, no blocks are produced on Level0.

This family of on-demand consensus algorithms are great for mobile devices. And if you want to increase trust and provability, you can pair them with transactions on a remote chain that produces blocks continuously, so you can root your Level0 chain in time.

You can have a variety of consensus protocols that you can test on subchains. Developing new protocols is easy, creating chains programmatically is easy.

And anyone can create a subchain without being a developer. This is the system that we are building.

A system created for decentralized collaboration and development. Created to scale at network state levels. Created to provide a basis for a new human civilization rooted in the dynamic relationship between blockchain and AI: between Shiva and Shakti.



<iframe width="560" height="315" src="https://www.youtube.com/embed/4ocX_w_xj0g?si=qDwjOBJ6m7niuZo9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


