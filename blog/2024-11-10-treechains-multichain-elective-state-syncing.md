---
slug: treechains-multichain-elective-state-syncing
title: MythosX - Trees of blockchains - a scaling solution [multichain elective state syncing]
authors: loredana
tags: [wasmx,treechains,mythos,networkstate]
---

# Trees of blockchains: a scaling solution: [multichain elective state syncing]

Introducing MythosX: a trust-scalable system powered by a networked set of homogeneous blockchains based on our WasmX engine, as a multi-level decentralized hierarchical tree.

Simple blockchains are dead. Long live the trees of blockchains.

Today we demo multichain elective state syncing. One node, three or more chains with on-demand state-sync.

<!-- truncate -->

Simple blockchains are dead. Long live the trees of blockchains.

We are building a trust scalable system powered by a networked set of homogeneous blockchains based on our WasmX engine. This network is a multi-level decentralized hierarchical tree, where the tree is constructed in reverse.

Our wasmX engine, the core of every chain is a WebAssembly-based, upgradable & customizable blockchain core that can be extended through WASM modules. It is compatible with both Cosmos and Ethereum blockchains. In fact, WasmX uses the Cosmos Baseapp, while reimplementing all additional modules as WASM contracts.
WasmX is extensible with different languages, different consensus algorithms, different roles and privileges for contracts, rollup chains and something that we will demonstrate in the near future, plugins for sets or groups of nodes.

Our MythosX system is a collaboraboration between Mythos, a private level0 chain and our networked subchains, that we call levels. All of these blockchains run on WasmX.
And today you will see a demo of nodes running MythosX.

We now have 3 nodes, each running Mythos and their own private level0 chain. They are also running a time chain, that we presented in a previous video.

We can see these 3 validators in the explorer here. And Mythos is producing blocks.

Two of these nodes will negotiate and spawn a level1 chain.
The negotiation transactions are recorded on each level0 chain, so each node has the negotiation history.

Each node sends a genesis transaction with their validator information, to their respective level0 chain.
At the moment, creation of these levels is programmatic and before the genesis transaction, the nodes have already negotiated their genesis data.

```
mythosd tx multichain register-subchain-gentx /Users/user/dev/blockchain/wasmx-tests/validator_lvl.json --chain-id="level0_1000-1" --from node0 --keyring-backend test --home ./testnet/node0/mythosd --fees 200000000000alvl --gas 90000000 --yes --log_level trace --trace

mythosd tx multichain register-subchain-gentx /Users/user/dev/blockchain/wasmx-tests/validator_lvl.json --chain-id="level0_1000-1" --from node1 --keyring-backend test --home ./testnet/node1/mythosd --fees 200000000000alvl --gas 90000000 --yes --log_level trace --trace --node tcp://localhost:26660
```

And the new level1 chain is started.

And we can see the chain also on the explorer, with 2 validators. And producing blocks.

Now the 3rd node that runs Mythos, does not know about the level1 chain.
But it can take the chain_id information and basic information about denominations & address prefix and can connect to one of the other nodes and sync it.

So, we register the level1 chain on our multichain registry on level0:

```
[registration tx]
```

And now, we can sync it by chain ID.

We get the trust height and trust hash from a block.

```
http://86.120.99.11:26657/block

TRUST_HEIGHT=2024
TRUST_HASH=2FAF0F3912166FE7E79A6A328AD12B99FD441B8856449415326369E3328B565F

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$RPC,$RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$TRUST_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOMEMAIN/config/config.toml
```

And we send this information in a transaction on the level0 chain.

```
[sync tx]
```

And we see it finding snapshots, verifying them and applying them.
We wait for the chain to be synced.

Now, that it is synced, we can send a transaction to become a validator. So, the 3rd node can also become a validator.
First, we send the 3rd node some level1 tokens.
And then the create validator transaction.

```
[create-valid tx]
```

We see the transaction was added to the mempool and executed and indexed in the block.

And we see can see it in the explorer too. And now, there are 3 validators producing blocks.

Each node now runs 3 and a half chains: the independent and public Mythos chain, the private level0 chain, the level1 chain and the time chain that can be used by any of the other chains.

This multichain, hierarchical tree-like system is heavily based on our consensusless contracts theory, that we have explained in detail in previous videos.
The core protocol is contracts. Contracts that can be upgraded through governance at any time. The chain negotiation protocol for example, can be upgraded at any time, during the lifespan of the chains. The consensus protocols also.

This is the most complex decentralized treechain system. A system created for decentralized collaboration and development. Created to scale at network state levels.



<iframe width="560" height="315" src="https://www.youtube.com/embed/fGoTvMAYth0?si=z3CDr6VmuyN-u1ki" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
