---
sidebar_position: 1
---

```rust title="ewasm.wit"
package wasmx

world ethereum {
  import env: interface {
    ethereum_useGas: func(i64)
    ethereum_getGasLeft: func() -> i64

    ethereum_storageLoad: func(i32, i32)
    ethereum_storageStore: func(i32, i32)

    ethereum_getBalance: func(i32)
    ethereum_getExternalBalance: func(i32, i32)

    ethereum_getAddress: func(i32)
    ethereum_getCaller: func(i32)
    ethereum_getCallValue: func(i32)

    ethereum_getCallDataSize: func() -> i32
    ethereum_callDataCopy: func(i32, i32, i32)

    ethereum_getReturnDataSize: func() -> i32
    ethereum_returnDataCopy: func(i32, i32, i32)

    ethereum_getCodeSize: func() -> i32
    ethereum_getExternalCodeSize: func(i32) -> i32
    ethereum_codeCopy: func(i32, i32, i32)
    ethereum_externalCodeCopy: func(i32, i32, i32, i32)
    ethereum_getExternalCodeHash: func(i32, i32)

    ethereum_getTxGasPrice: func(i32)
    ethereum_getTxOrigin: func(i32)

    ethereum_getBlockNumber: func() -> i64
    ethereum_getBlockCoinbase: func(i32)
    ethereum_getBlockHash: func(i64, i32)
    ethereum_getBlockGasLimit: func() -> i64
    ethereum_getBlockTimestamp: func() -> i64
    ethereum_getBlockDifficulty: func(i32)
    ethereum_prevrandao: func(i32)
    ethereum_getChainId: func(i32)
    ethereum_getBaseFee: func(i32)

    ethereum_call: func(i64, i32, i32, i32, i32, i32, i32) -> i32
    ethereum_callCode: func(i64, i32, i32, i32, i32, i32, i32) -> i32
    ethereum_callDelegate: func(i64, i32, i32, i32, i32, i32) -> i32
    ethereum_callStatic: func(i64, i32, i32, i32, i32, i32) -> i32

    ethereum_create: func(i32, i32, i32, i32)
    ethereum_create2: func(i32, i32, i32, i32, i32)
    ethereum_selfDestruct: func(i32)

    ethereum_log: func(i32, i32, i32, i32, i32, i32, i32)

    ethereum_finish: func(i32, i32)
    ethereum_stop: func()
    ethereum_revert: func(i32, i32)

    ethereum_sendCosmosMsg: func(i32, i32) -> i32
    ethereum_sendCosmosQuery: func(i32, i32) -> i32

    ethereum_debugPrinti32: func(i32, i32) -> i32
    ethereum_debugPrinti64: func(i64, i32) -> i64
    ethereum_debugPrintMemHex: func(i32, i32)
  }
}


```
