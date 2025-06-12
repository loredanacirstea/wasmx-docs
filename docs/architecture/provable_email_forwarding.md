---
sidebar_position: 1
title: Provable Email Forwarding
description: Provable Manual Email Forwarding (user-triggered)
image: /img/email1.png
keywords: [SPF, DKIM, DMARC, ARC, email, Sender Policy Framework, DomainKeys Identified Mail, Domain based Message Authentication, Authenticated Received Chain, cryptography, forwarding, email forwarding]
---

# Provable Email Forwarding

wasmX offers email verification standards for truly provable email.

[Current standards](./email.md) are not enough.

## Prelude

* header registry:
https://www.iana.org/assignments/message-headers/message-headers.xhtml

* deprecating `X-` prefix for custom headers https://datatracker.ietf.org/doc/html/rfc6648. Just use a unique and relevant prefix.

## Manual Forwarding Now

Current standards for [manual email forwarding](./email#manual-forwarding) do not allow users to verify the authenticity of a forwarded email. The email body is often changed by the email client itself.

**Why?**: Because society needs provability in order to have peace. And if communications are provable digitally, it reduces the need for abusive institution to seeze devices that may be an intrinsic part of your identity and everyday life.

## 1. Provable Manual Forwarding with ARC

* similar to automatic forwarding
* do not change the original email
* forwarding MTA's and receiving MTA's should add ARC headers

**PROs:**
* can verify original email authenticity
* provable intermediary chain - `ARC-Seal` signs `ARC-Authentication-Results`, which must contain `smtp.mailfrom` (sending email account)

**CONs:**
* requires MTA-level control
* `DKIM-Signature` expires and standard DKIM verification fails
* DNS key rotation will make it impossible to verify DKIM and ARC signatures and forwarding will fail
* intermediary privacy concerns: ARC exposes the authentication results and MTA domains of all intermediaries — may reveal infrastructure, forwarding flows, or internal systems
* end-user email clients (MUAs) rarely parse or display ARC results, so users won’t benefit without explicit client support or plugins.

## 2. Provable Manual Forwarding with Custom Headers & Blockchain Integration

* DNS key rotation is solved by keeping historical DNS public keys on a verifiable decentralized system

**PROs:**
* can verify original email authenticity
* provable intermediary chain
* maintain compatibility with current email verification checks, so emails are not marked as invalid or spam
* can work even without MTA support (custom headers are produced by MUAs, with user-controlled keys and blockchain published public keys) - decentralization of protocol, users can choose individually
* historical email verification for `DKIM`, `ARC` and `PROVABLE` headers
* maintains integrity of context/thread by including the `References` of previous emails.

**CONs:**
TBD

### Unchanged

* email body remains the same -> `bh` remains the same
* headers

```
MIME-Version
Content-Type
Content-Transfer-Encoding
DKIM-Signature
ARC headers
```

* original `DKIM-Signature` is kept, even if it may be expired
* original ARC headers, if email was automatically forwarded

### Changed Headers by Forwarding MTA

```
From
To
Date
Message-ID
Subject
References
In-Reply-To
```

### Added Headers by Forwarding MTA

```
DKIM-Signature
Provable-DNS-Registry
Provable-Email-Registry
Provable-Forward-Origin-DKIM-Context
Provable-Forward-Chain-Signature
```

### `Provable-DNS-Registry`

* a decentralized DNS registry with current and historical DNS records, for verifying SPF, DMARC
* TBD: make it general, so any decentralized, verifiable system can be used

| Field | Description |
| ----- | ----------- |
| chain.id | chain identifier |
| chain.name | chain name |
| chain.uri | URI pointing to chain info |

* chain info - JSON object containing the information needed to verify the email protocol, like API endpoints for querying DNS records [TBD]

### `Provable-Email-Registry`

* a decentralized registry where email body hashes `bh`, `Message-ID`, signature hashes (e.g. DKIM-Signature, ARC headers signatures) can be registered for authentication verification. While respecting user privacy.
* users may also register their consent for their emails to be forwarded or not, or to be notified when a provable forward happens.

### `Provable-Forward-Origin-DKIM-Context`

* original email context used to verify the original DKIM-Signature - any headers that have to be modified by the forwarding process

```
Subject
From
To
Cc
....TBD
```

### `Provable-Forward-Signature`

* chain of email addresses & DKIM hashes/signatures

| Field | Description |
| ----- | ----------- |
| v | version |
| i | instance number |
| f | forwarder email address |
| a | hash algorithm |
| x | DKIM-Signature hash |
| h | signed headers |
| b | signature |

* should be signed:

```
original DKIM-Signature hash?
original ARC-Message-Signature hash?
original ARC-Authentication-Results hash?
original ARC-Seal hash?
ARC-Authentication-Results // TBD do we need this? from received/forwarded email
previous Provable-Forward-Signature
```

* ensures previous headers are not removed, or previous forwarder signatures.

```
Provable-Forward-Chain: i=1; a=sha256; f=my@email.com>; x=<hash>
    h=
    b=<signature>
```

### Notes:

Forwarding also registers in the email registry, linked to the original `DKIM-Signature` hash, `bh`, `MessageID`, maybe header hash:
* your DKIM-Signature hash
* new `Message-ID`

`DKIM-Signature` must contain in `h` field:
```
From
To
Cc
Bcc
Reply-To
References
In-Reply-To
Subject
Date
Message-Id
Content-Type
```

* ensures context integrity when forwarding an email contained in a thread

### Extensions

* time-based ordering, proving time


