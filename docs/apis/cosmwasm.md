---
sidebar_position: 2
---

```rust title="cosmwasm.wit"
package wasmx

world cosmwasm {
  import env: interface {
    db_read: func(i32) -> i32
    db_write: func(i32, i32)
    db_remove: func(i32)
    db_scan: func(i32, i32, i32) -> i32
    db_next: func(i32) -> i32

    addr_validate: func(i32) -> i32
    addr_canonicalize: func(i32, i32) -> i32
    addr_humanize: func(i32, i32) -> i32

    secp256k1_verify: func(i32, i32, i32) -> i32
    secp256k1_recover_pubkey: func(i32, i32, i32) -> i64
    ed25519_verify: func(i32, i32, i32) -> i32
    ed25519_batch_verify: func(i32, i32, i32) -> i32

    debug: func(i32)
    query_chain: func(i32) -> i32
    abort: func(i32)
  }
}


```
