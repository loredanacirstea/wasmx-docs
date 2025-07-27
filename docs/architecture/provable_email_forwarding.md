---
sidebar_position: 1
title: Provable Email Forwarding
description: Provable Manual Email Forwarding (user-triggered)
image: /img/email1.png
keywords: [SPF, DKIM, DMARC, ARC, email, Sender Policy Framework, DomainKeys Identified Mail, Domain-based Message Authentication, Authenticated Received Chain, cryptography, forwarding, email forwarding]
---

# Provable Email Forwarding

wasmX offers email verification standards for truly provable email.

[Current standards](./email.md) are not enough.

## Prelude

* header registry:
https://www.iana.org/assignments/message-headers/message-headers.xhtml

* deprecating `X-` prefix for custom headers https://datatracker.ietf.org/doc/html/rfc6648. Just use a unique and relevant prefix.

## Technical Demo Video

A 15 minute video with: explanation of why this is needed, technical summary, prototype demo with a custom email server doing multiple hops of forwarding.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5eWQqwad8wA?si=lgUuPgAo6USA38qD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Manual Forwarding Now

Current standards for [manual email forwarding](./email#manual-forwarding) do not allow users to verify the authenticity of a forwarded email. The email body is often changed by the email client itself.

**Why bother?**: Because society needs provability in order to have peace. And if communications are provable digitally, it reduces the need for abusive institutions to seize devices that may be an intrinsic part of your identity and everyday life.

## Provable Manual Forwarding with Custom Headers & Decentralized Registries

We have created a protocol that is heavily inspired from the ARC protocol, for automatic forwarding. However, manual forwarding requires some headers to change (compared to the original, forwarded email) - like `From`, `To`, etc. Also, in the case of ARC, DNS key rotation will make it impossible to verify DKIM and ARC signatures and forwarding will eventually fail. Our `Provable-Forward` protocol solves these issues.

* DNS key rotation is solved by keeping historical DNS public keys on a verifiable decentralized system

**PROs:**
* can verify original email authenticity
* provable intermediary chain (intermediary privacy concerns can be mitigated by email consent registries)
* maintain compatibility with current email verification checks, so emails are not marked as invalid or spam
* can work even without MTA support (custom headers can be produced by MUAs, with user-controlled keys and blockchain-published public keys) -> decentralization of protocol -> users can choose individually
* historical email verification for `DKIM`, `ARC` and `PROVABLE` headers
* maintains the integrity of context/thread by including the `References` of previous emails.

**CONs:**
* needs end-user email clients (MUAs) support or plugins, but it is time to upgrade the email experience anyway.

### Unchanged

* email body remains the same -> `bh` remains the same across all forwards
* headers:

```email
MIME-Version
Content-Type
Content-Transfer-Encoding
```

### Changed Headers by Forwarding MTA

```email
From
To
Cc
Bcc
Date
Message-ID
Subject
References
In-Reply-To
```

### Added Headers by Forwarding MTA

```email
Provable-Authentication-Results
Provable-Forward-DKIM-Context
Provable-Forward-Signature
Provable-Forward-Seal
Provable-Forward-Check
```

### `Provable-Authentication-Results`

* similar to ARC's `Authentication-Results` header
* it can be computed when an email is received, or, it may be computed before an email is forwarded (using the DNS registry with historical DKIM public keys)

```email
Provable-Authentication-Results: i=1; dmail.provable.dev;
	 dkim=pass header.d=dmail.provable.dev; spf=pass smtp.mailfrom=test@dmail.provable.dev; dmarc=pass header.from=dmail.provable.dev
```

### `Provable-Forward-DKIM-Context`

* email context used to verify the forwarded email's DKIM-Signature - contains any headers that have to be modified by the forwarding process
* TBD: we may consider a similar approach for maintaining original ARC headers too, so we can have the entire forwarding path (automatic forwarding and manual)

| Field | Description |
| ----- | ----------- |
| `i` | instance number |
| `<header_name>` | `<header_value>` |

* `header_name` can be:
```email
DKIM-Signature
Message-ID
Subject
From
To
Cc
Bcc
Date
```

* `DKIM-Signature` is base64 encoded
* `Subject` is URI encoded
* other header values are kept as in the original headers, but any spaces and `\r\n` characters are stripped.

```email
Provable-Forward-DKIM-Context: i=1;
 DKIM-Signature=dj0xOyBkPWRtYWlsLnByb3ZhYmxlLmRldjsgcz0yMDI1YTsNCglpPXRlc3RAZG1haWwucHJvdmFibGUuZGV2OyBhPXJzYS1zaGEyNTY7IGM9cmVsYXhlZC9yZWxheGVkOyB0PTA7IGg9RnJvbTpUbzoNCglDYzpCY2M6UmVwbHktVG86UmVmZXJlbmNlczpJbi1SZXBseS1UbzpTdWJqZWN0OkRhdGU6TWVzc2FnZS1JRDoNCglDb250ZW50LVR5cGU7IGJoPVFmLzBNaEg2WXNSNWlhT0RsdXoxOVJtaG84eHlJMkRRdmRPV0dWM2NOcDg9OyBiPU00NHdsTUwvcVMNCgl3UDY4dlJCbHhtKzhlN0Q3R3kyeVFEOHRuTVpiQWdkTXhWWFZqMFRzTk1yNjVxRFZkL2ROc3J6U2ZPdXgrWnVFOFo5WTl6Vlhpa2INCgl4U3J6TWdLLzhGSFQwaWhXc3FpWlpvTHV2bTdCeFFDY21QVERlcmJYV0NDYUhJYzdVUHlBNEcwdGt2aEM2TzZGRFZtOEVGOWE1YnINCgl1WnMybUZ1VDFoOD0=;
 Date=Fri, 25 Jul 2025 19:41:46 +0000;
 From=test@dmail.provable.dev;
 Message-ID=<2275ea76901e8668754397460cc1fd78f5.1753472506228210000@2025a.dmail.provable.dev>;
 Subject=this+is+an+email;
 To=test2@dmail.provable.dev;
```

### `Provable-Forward-Signature`

* similar to `DKIM-Signature`, this signature signs on the original body and headers that are being forwarded
* allows the `Subject`, `From`, `Date`, `To` etc. to be modified, by caching them in the `Provable-Forward-DKIM-Context` header and signing over this header.

| Tag  | Name           | Description                 |
| ---- | -------------- | --------------------------- |
| `v`  | Version        | `1`                         |
| `i`  | Instance       | instance number             |
| `dnsregistry`  | DNS Registry       | dns registry historical records for DKIM public keys             |
| `emailregistry`  | Email Registry       | email registry for user consent, etc.             |
| `a`  | Algorithm      | The cryptographic algorithm used to generate the signature, e.g. `rsa-sha256` or `ed25519-sha256`.   |
| `d`  | Domain         | SDID: the signing domain (`d=`) whose DNS contains the public key under `selector._domainkey.domain` (e.g. [2024a._domainkey.mail.provable.dev](https://dns.google/resolve?type=TXT&name=2024a._domainkey.mail.provable.dev))      |
| `h`  | Signed Headers | A colon-separated list of headers that were signed (in order), e.g. `Provable-Forward-DKIM-Context`.               |
| `s`  | Selector       | Indicates the DNS record selector under `_domainkey`, e.g. `s=2024a` → `2024a._domainkey.mail.provable.dev` (e.g. [2024a._domainkey.mail.provable.dev](https://dns.google/resolve?type=TXT&name=2024a._domainkey.mail.provable.dev). |
| `bh` | Body Hash      | Base64-encoded hash of the canonicalized body; used to verify the body wasn't modified.              |
| `b`  | Signature      | The actual Base64-encoded digital signature (generated using the private key).                       |


* example
```email
Provable-Forward-Signature: i=1;
 d=dmail.provable.dev;
 s=2025a;
 a=rsa-sha256;
 c=relaxed/relaxed;
 h=Provable-Forward-DKIM-Context;
 bh=Qf/0MhH6YsR5iaODluz19Rmho8xyI2DQvdOWGV3cNp8=;
 dnsregistry=someurl;
 emailregistry=someurl;
 b=LbAycOdLIQ6WdPhcRsZn+g+EkWEHNolthWjhZD/iSYwoUoV3/N
 DA65HiTO+zxLJoiKQ/RJdxGq3HzOF+j/sQDZiPnv4fyy1OLMsEnz7fjG6Ns2Ckd1BlGItU45H9a WPzzFb79yGMifPddE/bB+uN913stI3ucv6kAECkPwCg3Dg=
```

* TBD: original ARC headers - full or hash?

#### `dnsregistry`

* a decentralized DNS registry with current and historical DNS records, for verifying DKIM, SPF, DMARC
* TBD: make it general, so any decentralized, verifiable system can be used

| Field | Description |
| ----- | ----------- |
| chain.id | chain identifier |
| chain.name | chain name |
| chain.uri | URI pointing to chain info |

* it may become a header, or just a header field
* chain info - JSON object containing the information needed to verify the email protocol, like API endpoints for querying DNS records [TBD]

#### `emailregistry`

* a decentralized registry where email body hashes `bh`, `Message-ID`, and signature hashes (e.g. DKIM-Signature, ARC headers signatures) can be registered for authentication verification. While respecting user privacy.
* users may also register their consent for their emails to be forwarded or not, or to be notified when a provable forward happens.
* it may become a header, or just a header field

### `Provable-Forward-Seal`

* similar to `ARC-Seal`

| Field | Description                                                                                                     | Example         | Required |
| ----- | --------------------------------------------------------------------------------------------------------------- | --------------- | -------- |
| `i`   | instance number. Must match the corresponding `i=` in Provable-Authentication-Results and Provable-Forward-Signature. | `i=1`           | Yes    |
| `a`   | Algorithm used to generate the signature. Format: `<algorithm>-<hash>`.                                         | `a=rsa-sha256`  | Yes    |
| `d`   | Domain of the sealing entity (signer). Used with `s=` to retrieve the public key.                               | `d=example.org` | Yes    |
| `s`   | Selector used to locate the public key in DNS.                                                                  | `s=selector1`   | Yes    |
| `t`   | Signing timestamp (seconds since epoch).                                                                        | `t=1650000000`  | Yes    |
| `cv`  | Chain validation result for previous Provable sets. Values: `none`, `pass`, or `fail`.                               | `cv=none`       | Yes    |
| `b`   | Signature value (base64-encoded). Empty (`b=`) when computing the hash.                                         | `b=abc123...`   | Yes    |

* the canonicalization for `Provable-Forward-Seal` is always relaxed (c= is not specified).
* `Provable-Forward-Seal` signs over:
    * the current `Provable-Authentication-Results`
    * the current `Provable-Forward-Signature`
    * all prior `Provable-Forward-Seal`s (not including the current one)

* example
```email
Provable-Forward-Seal: i=1;
 d=dmail.provable.dev;
 s=2025a;
 a=rsa-sha256;
 cv=none;
 t=1753472514;
 b=wg0xyDX+jk9ajgu1zChYvWvZsam0M39KFtYlRQ701cCWjARetB
 6/8ZXzmCJX5aWWGXOHY7E7lU8WgHf//s5gqYw/HcKEywotb3sY6TiMo5yLlFYiyTYaBJN0VTPsY
 DmPqvNe6Syq8zRUPe2t17k0nPf/apE70j4BVMW0Fs5cMA8=
```

### `Provable-Forward-Check`

* an optional check that can be added when a forwarded email is received, that checks if all protocol verifications have passed and the forwarded email is authentic
* can be done by email servers, MTAs, email clients capable of verifying

```email
Provable-Forward-Check: pass; agent=myemailagent;
```

### Notes to be considered:

Forwarding can also register hashes in the email registry, linked to the original `DKIM-Signature` hash, `bh`, `MessageID`, and maybe header hash:
* your DKIM-Signature hash
* new `Message-ID`

`DKIM-Signature` must contain in the `h` field:
```email
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

* the above also ensures context integrity when forwarding an email contained in a thread

### Extensions

* time-based ordering, proving time


