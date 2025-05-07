---
slug: multichain-cross-chain-tx
title: MythosX - Trees of blockchains - a scaling solution [multichain elective state syncing]
authors: loredana
tags: [wasmx,treechains,mythos,networkstate]
---

# Trees of blockchains: a scaling solution [atomic, cross-chain transactions]

We are building a trust scalable system powered by a networked set of homogeneous blockchains based on our WasmX engine.

Our wasmX engine is a WebAssembly-based, upgradable & customizable blockchain core that can be extended through WASM modules. It is compatible with both Cosmos and Ethereum blockchains. In fact, WasmX uses the Cosmos Baseapp, while reimplementing all additional modules as WASM contracts.

<!-- truncate -->

Now imagine a hierarchy of blockchain levels, without going into too much detail, the higher the level, the sparser the information on that chain. The highest level contains mostly proofs of the activity on the lower chains and aggregate data from the lower chains. The higher levels are also a trust provider for the lower level chains.
The lower level chains hold the actual data and they can be scaled independently.
Lower levels can have more independence as to their rules of use and they can eventually choose wether or not to be part of this hierarchy.

This type of system can reach instant national-scale voting for the country of France with 2200 validators - this is just 0.4% of the number of validators that Ethereum has.

Also, these levels can communicate through cross-chain transactions. And this is what I will demo today.

Let's create the simplest local setup: we have 3 validators on a Mythos testnet, with a minimum of 1 validator for each subchain that is created.

```
mythosd testnet init-files --chain-id=mythos_7000-14 --output-dir=$(pwd)/testnet --v=3 --keyring-backend=test --minimum-gas-prices="1000amyt" --same-machine=true --nocors --libp2p --min-level-validators=1 --enable-eid=false
```

we start the nodes and then run the setup for creating 2 levels, each with 1 validator. we execute this on the mythos local chain, because this is where the multichain registry is.

```
mythosd testnet create-levels 2 1 --chain-id="mythos_7000-14" --keyring-backend test --home ./testnet
```

when we register new chains, the multichain registry generates a default genesis setup for the chain and registers the node sending the request as a validator.

```
"start registering new default subchain"
"start registering new subchain validator"
```

in this version of the multichain registry, only Mythos validators can create subchains. And in the production version, only accounts with valid electronic IDs will be able to validate.

When the chain has enough validators, it can be initialized. And this simply triggers an event on Mythos. That is caught by each node and each node can decide to initialize this subchain or not.

```
"node is validating the new subchain"
```

generally, only the nodes who are validators are by default the ones that will initialize the subchain.

So, with the same software, we are running multiple chains here. mythos, this chain0_1_1001-1 chain, this level0 chain is a private blockchain, private to the device.

On top of this level1 chain0_1_1001-1 that we have created, another one is also created automatically - a level2 chain.

So, I can demonstrate communication between the level1 & level 2 chains.

So, lets deploy some contracts on these two chains. And we can interact with any of these chains.


* we will deploy a simple storage contract on level 1
* this is the simple storage contract - with set & get methods.

```
mythosd tx wasmx store ./x/network/keeper/testdata/wasmx/simple_storage.wasm --chain-id=chain0_1_1001-1 --registry-chain-id=mythos_7000-14 --from=node0 --keyring-backend=test --home=./testnet/node0/mythosd --fees=90000000000alvl0 --gas=9000000 --yes
```

* chain id is chain0 .. and the multichain registry is on the mythos chain - the multichain registry is a contract under consensus rules and holds the chain configurations - like address prefixes & denominations.

* we can look after the store_code event and we see it here, the code id is 50, for the wasm contract. so we can instante it.

```
mythosd tx wasmx instantiate 50 '{"data":"{}"}' --label "simple_storage" --chain-id=chain0_1_1001-1 --registry-chain-id=mythos_7000-14 --from=node0 --keyring-backend=test --home=./testnet/node0/mythosd --fees=90000000000alvl0 --gas=9000000 --yes
```

* search "instantiate" and we get the address of the new contract.

```
chain016tsljek8g3av2rp8wnztga65xkn2dns8vdh4rl
```

* now lets deploy on the level 2 chain a contract that knows how to make a cross-chain transaction.
* this is the crosschain test contract, it just forwards the request to the system. and we will use this contract to send a transaction to the level1 simple storage contract and change a value there. We deploy it.

```
mythosd tx wasmx store ./x/network/keeper/testdata/wasmx/crosschain.wasm --chain-id=leveln_2_1002-1 --registry-chain-id=mythos_7000-14 --from=node0 --keyring-backend=test --home=./testnet/node0/mythosd --fees=90000000000alvl2 --gas=9000000 --yes
```

* It also has a code id of 50. We instantiate it.

```
mythosd tx wasmx instantiate 50 '{"data":"{}"}' --label "crosschain" --chain-id=leveln_2_1002-1 --registry-chain-id=mythos_7000-14 --from=node0 --keyring-backend=test --home=./testnet/node0/mythosd --fees=90000000000alvl2 --gas=9000000 --yes
```

* Search "instantiate". And we get the address `leveln1dpfdf0r42qttzgg6qnkkc7tyscx4t6r44fdmxf`

* Now, let's set a variable on the simple storage contract at key "hello", we store the string "brian"

```
mythosd tx wasmx execute chain016tsljek8g3av2rp8wnztga65xkn2dns8vdh4rl '{"set":{"key":"hello","value":"brian"}}' --chain-id=chain0_1_1001-1 --registry-chain-id=mythos_7000-14 --from=node0 --keyring-backend=test --home=./testnet/node0/mythosd --fees=90000000000alvl0 --gas=9000000 --yes
```

* and now we can query it.

```
mythosd query multichain call chain016tsljek8g3av2rp8wnztga65xkn2dns8vdh4rl '{"get":{"key":"hello"}}' --from node0 --keyring-backend test --chain-id=chain0_1_1001-1 --registry-chain-id=mythos_7000-14 --home=./testnet/node0/mythosd
```

* and we get `brian`

* cross-chain transactions are part of what we call atomic transactions. and I have a cli command that makes it easy to create these atomic transactions from a json file.

* essentially, we call the CrossChain method of the crosschain test contract. with this request to the simple storage contract on level 1 chain. the message is base64 encoded and it is setting the value "sammy" for the "hello" key

* now we execute this atomic transaction, we need to say what chains are affected by it. Also, an atomic transaction can contain many internal transactions to several chains. in this case, we only have one cross-chain transaction.

```
mythosd tx multichain atomic "/Users/user/dev/blockchain/wasmx-tests/atomictx.json" leveln_2_1002-1,chain0_1_1001-1 --chain-id=leveln_2_1002-1 --registry-chain-id=mythos_7000-14 --from=node0 --keyring-backend=test --home=./testnet/node0/mythosd --fees=90000000000alvl2 --gas=9000000 --yes
```

We execute it and we will look at the logs containing the word "atomic"

But lets see if the value has changed in our storage contract. and it is now "sammy".

we see the atomic transaction was added to the level 2 chain mempool. and the level 2 chain is the leader for the atomic tx, so only this chain can begin execution.

now we see the atomic transaction being added to the level1 chain mempool. this chain will wait to execute this transaction until after the leader starts execution.

and this is what happens next - the leader starts execution by adding it to the block proposal.

now the level 1 chain tries to add the atomic transaction to its next block proposal and sees that the leader chain has begun execution, so it can also begin execution.
and then the internal cross-chain requests begin, where the two chains exchange requests and responses.

next, we see a block finalization for the level 1 chain and another block finalization for the level 2 chain.
so, the chains finalize their blocks together.

Cross-chain transactions, atomic transactions on multiple chains, that are executed by the chains finalizing a block at the same time on multiple hierarchical chains.

In future videos we will see cross-chain transactions on same level chains & much more.

This tech is possible due to our continuous innovations on blockchain tech designs. I remind you all that this effort is made 100% as self-funded volunteer effort over a course of 8 years. And we will achieve tech that can revolutionize human & digital consensus, soon.



<iframe width="560" height="315" src="https://www.youtube.com/embed/6wcV7OeReeQ?si=Z8_KmI54gRde8TEz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
