---
sidebar_position: 1
title: Email Verification Protocols
description: Email Verification Protocols (SPF, DKIM, DMARC, ARC)
image: /img/email1.png
keywords: [SPF, DKIM, DMARC, ARC, email, Sender Policy Framework, DomainKeys Identified Mail, Domain based Message Authentication, Authenticated Received Chain, cryptography]
---

# Email

## SPF (Sender Policy Framework)

https://datatracker.ietf.org/doc/html/rfc7208

* `MAILFROM` set by SMTP email sender
* `IP`

SMTP email receiver queries the SPF record for the `MAIL FROM` domain and checks that `IP` is authorized.

SPF record example for [mail.provable.dev](https://dns.google/resolve?type=TXT&name=mail.provable.dev)

## DKIM (DomainKeys Identified Mail)

* https://datatracker.ietf.org/doc/html/rfc6376

### Required DKIM Signature Tags

| Tag  | Name           | Description                                                                                          |
| ---- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `v`  | Version        | `1` for rfc6376                                                                                 |
| `a`  | Algorithm      | The cryptographic algorithm used to generate the signature, e.g. `rsa-sha256` or `ed25519-sha256`.   |
| `b`  | Signature      | The actual Base64-encoded digital signature (generated using the private key).                       |
| `bh` | Body Hash      | Base64-encoded hash of the canonicalized body; used to verify the body wasn't modified.              |
| `d`  | Domain         | SDID: the signing domain (`d=`) whose DNS contains the public key under `selector._domainkey.domain` (e.g. [2024a._domainkey.mail.provable.dev](https://dns.google/resolve?type=TXT&name=2024a._domainkey.mail.provable.dev))      |
| `h`  | Signed Headers | A colon-separated list of headers that were signed (in order), e.g. `from:to:subject`.               |
| `s`  | Selector       | Indicates the DNS record selector under `_domainkey`, e.g. `s=2024a` → `2024a._domainkey.mail.provable.dev` (e.g. [2024a._domainkey.mail.provable.dev](https://dns.google/resolve?type=TXT&name=2024a._domainkey.mail.provable.dev). |

### Optional DKIM Signature Tags

| Tag | Name                       | Description                                                                                                 |
| --- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `c` | Canonicalization Algorithm | Header/body canonicalization, e.g. `relaxed/relaxed`, `simple/simple`. Default is `simple/simple`.          |
| `i` | Identity                   | AUID (User identifier), e.g. `i=@example.com` or `i=user@example.com`. Must be a subdomain or exact match of `d=`. |
| `l` | Body Length Count          | Number of body bytes hashed (used for partial signing). Rarely used.                                        |
| `q` | Query Method               | How to retrieve the public key. Usually just `dns/txt`. Deprecated and ignored by most systems.             |
| `t` | Timestamp                  | Integer (Unix timestamp) when the signature was created.                                                    |
| `x` | Expiration                 | Integer (Unix timestamp) after which the signature is no longer valid.                                      |
| `z` | Copied Headers             | Original headers (folded) to aid debugging; optional and rarely used.                                       |


```email
DKIM-Signature: v=1;
  d=mail.provable.dev;
  s=2024a;
  i=test@mail.provable.dev;
  a=ed25519-sha256;
  t=1749589922;
  x=1749849122;
  h=From:To:Cc:Bcc:Reply-To: References:In-Reply-To:Subject:Date:Message-Id:Content-Type:From:To:Subject: Date:Message-Id:Content-Type;
  bh=4fWAjR8dybJoJ7oc+ua358Qnylv7LASFrox6UiJwQ8g=;
  b=7J39El5KDL4NPguv2fK3m7xm/F
    evJN9QFqECm90XGwfWnlqBEEjHteY/P28AJ5xwfenf08TdtBLIMes6PMZTBA==
DKIM-Signature: v=1;
  d=mail.provable.dev;
  s=2024b;
  i=test@mail.provable.dev;
  a=rsa-sha256;
  t=1749589922;
  x=1749849122;
  h=From:To:Cc:Bcc:Reply-To: References:In-Reply-To:Subject:Date:Message-Id:Content-Type:From:To:Subject: Date:Message-Id:Content-Type;
  bh=4fWAjR8dybJoJ7oc+ua358Qnylv7LASFrox6UiJwQ8g=;
  b=K043WB+2sby57d3sihT+xRSou8
    H2+XTKqUxrfBRaOa6q48hcUs7DVg9n+0bA6T7cAQYlNsc1MNoViH5ebdjYKigJepnwrh4CCGweJUZ
    plhBWUF2McU4Kgz8XaLyCt5ipots2aOLRG7yT0FkudXYBY2bnG64fbyQABf6LClIF9Gwuq8gNF5Mj
    YF+oZZCZdnsQnf/AT+qDYCjOgTbjoPosZDOypsHSu42/m12UsYEqAZsBrsqaFV1rmFLlpdWzQ8y41
    dySACyWpRiVayzU5vFvfBkd/juhG94xlER9cs8RLE/oeFXqtOqq21HDUfqLp3koxqOeHTgmctN/0r
    BI+nuopA==
```

Allows the sender's mail server to digitally sign email messages using their domain's private key. The recipient’s mail server can then verify the signature using the public key published in DNS, ensuring:
* The email was not altered in transit.
* It was authorized by the domain it claims to be from.

## DMARC (Domain-based Message Authentication, Reporting and Conformance)

* https://datatracker.ietf.org/doc/html/rfc7489

1. Check DKIM signature
2. Check SPF
3. Check alignment: `header.From` domain - DKIM `d=` domain - SPF `MAILFROM` domain must match. (*required)

If alignment (3) + one of SPF (2) or DKIM (1) passes → DMARC passes

## ARC (Authenticated Received Chain)

* https://datatracker.ietf.org/doc/html/rfc8617
* https://arc-spec.org/

### ARC-Authentication-Results

* https://datatracker.ietf.org/doc/html/rfc8617#section-4.1.1

General syntax: `method = result (comment) [ kv-pairs ]`
* `method`: e.g., dkim, spf, dmarc
* `result`: one of the defined values
* `comment`: optional human-readable info
* `kv-pairs`: optional, like header.i=...

#### Common Methods and Fields

| Method          | Meaning                                      | Example                                        |
| --------------- | -------------------------------------------- | ---------------------------------------------- |
| `dkim`          | DKIM signature validation result             | `dkim=pass header.i=@example.com`              |
| `spf`           | SPF result for SMTP envelope sender          | `spf=fail smtp.mailfrom=bad.example.com`       |
| `dmarc`         | DMARC result (based on SPF & DKIM alignment) | `dmarc=pass header.from=example.com`           |
| `arc`           | ARC chain validation result                  | `arc=pass (i=1 spf=pass dkim=pass dmarc=pass)` |
| `iprev`         | Reverse DNS validation                       | `iprev=pass policy.iprev=203.0.113.1`          |
| `auth`          | Authentication status                        | `auth=pass smtp.auth=user@example.com`         |
| `smtp.mailfrom` | The domain in the `MAIL FROM` envelope       | `smtp.mailfrom=example.com`                    |
| `header.from`   | The domain in the `From:` header             | `header.from=example.com`                      |

#### Possible Results (for each method):
| Result      | Meaning                               |
| ----------- | ------------------------------------- |
| `pass`      | Authentication succeeded              |
| `fail`      | Authentication failed                 |
| `neutral`   | Indeterminate / ambiguous result      |
| `none`      | No data / method not applied          |
| `temperror` | Temporary error                       |
| `permerror` | Permanent error (e.g., malformed DNS) |


```email
ARC-Authentication-Results: i=3; mx.google.com;
    dkim=neutral (no key) header.i=@mail.provable.dev header.s=2024a;
    dkim=pass header.i=@mail.provable.dev header.s=2024b header.b=K043WB+2;
    arc=pass (i=2 spf=pass spfdomain=mail.provable.dev dkim=pass dkdomain=mail.provable.dev dmarc=pass fromdomain=mail.provable.dev);
    spf=pass (google.com: domain of thelaurel.bot+caf_=seth.one.info=gmail.com@gmail.com designates 209.85.220.41 as permitted sender) smtp.mailfrom="thelaurel.bot+caf_=seth.one.info=gmail.com@gmail.com";
    dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=mail.provable.dev;
    dara=pass header.i=@gmail.com
```

### ARC-Message-Signature

* https://datatracker.ietf.org/doc/html/rfc8617#section-4.1.2

| Field | Description                                                                                    | Example                  | Required                        |
| ----- | ---------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------- |
| `i`   | ARC instance number. Must match corresponding ARC-Seal and ARC-Authentication-Results headers. | `i=1`                    |Yes                           |
| `a`   | Signing algorithm used. Typically RSA or Ed25519 with a hash function.                         | `a=rsa-sha256`           |Yes                           |
| `c`   | Canonicalization algorithm for headers/body.                                                   | `c=relaxed/relaxed`      |No (default: `simple/simple`) |
| `d`   | Domain of the signer (signing domain).                                                         | `d=example.org`          |Yes                           |
| `s`   | Selector used to locate the public key in DNS.                                                 | `s=brisbane`             |Yes                           |
| `t`   | Signing timestamp (Unix seconds since epoch).                                                  | `t=1610000000`           |No                            |
| `h`   | List of signed headers, in the order they were signed.                                         | `h=from:to:subject:date` |Yes                           |
| `bh`  | Body hash (base64 of hash of canonicalized body).                                              | `bh=abcdefg...=`         |Yes                           |
| `b`   | Signature itself (base64). Must be empty (`b=`) at time of signing.                            | `b=abc123...`            |Yes                           |


```email
ARC-Message-Signature: i=3;
    a=rsa-sha256;
    c=relaxed/relaxed;
    d=google.com;
    s=arc-20240605;
    h=content-transfer-encoding:mime-version:user-agent:date:message-id
        :subject:to:from:dkim-signature:dkim-signature:delivered-to;
    bh=4fWAjR8dybJoJ7oc+ua358Qnylv7LASFrox6UiJwQ8g=;
    fh=Ml91QZNjOUBF4lPxdodEISvnG8cKMzALenqeNxoWqdI=;
    b=VEGNq275dIibd6+54GYZnP2dIHqFiGkAwALj/FA4hw7weJGTiFvfcb/O7p20PPWbUY
        isM3m4twYpknpID3hRN/euJJNWqj4VgclnJST3nQ+F0WgfwBCOl/wuVJbu9pO9vgJAY7
        WglNuiona7FL0Rlwp+KGHllLbR5CA0pak3s9E+OI3fhZya9/v5Gldis8vzsyfOiCnGta
        5IYVB42Mgdi+tS2SaUaHqPUL+g9eo2hnca56CTkEieuOZcLFDcCOHQTZol4n8ti5aiiI
        UB2EKnu+PC1JX7Tm2MYYBbIRZhuB9OF2TQat13rr8Hph3I1/cupScIWFRr/8Hkh4PP0q
        9kUw==;
    dara=google.com
```

* cryptographically similar to `DKIM-Signature`, but the signed content has some differences.

### ARC-Seal

* https://datatracker.ietf.org/doc/html/rfc8617#section-4.1.3

| Field | Description                                                                                                     | Example         | Required |
| ----- | --------------------------------------------------------------------------------------------------------------- | --------------- | -------- |
| `i`   | ARC instance number. Must match the corresponding `i=` in ARC-Authentication-Results and ARC-Message-Signature. | `i=1`           | Yes    |
| `a`   | Algorithm used to generate the signature. Format: `<algorithm>-<hash>`.                                         | `a=rsa-sha256`  | Yes    |
| `d`   | Domain of the sealing entity (signer). Used with `s=` to retrieve the public key.                               | `d=example.org` | Yes    |
| `s`   | Selector used to locate the public key in DNS.                                                                  | `s=selector1`   | Yes    |
| `t`   | Signing timestamp (seconds since epoch).                                                                        | `t=1650000000`  | Yes    |
| `cv`  | Chain validation result for previous ARC sets. Values: `none`, `pass`, or `fail`.                               | `cv=none`       | Yes    |
| `b`   | Signature value (base64-encoded). Empty (`b=`) when computing the hash.                                         | `b=abc123...`   | Yes    |

#### CV

| Result | Description                   |
| ------ | ------------------------------|
| none | this is the first ARC set (i=1) |
| pass | all previous ARC sets validated |
| fail | if any prior ARC set failed     |

```email
ARC-Seal: i=3;
    a=rsa-sha256;
    t=1749589924;
    cv=pass;
    d=google.com;
    s=arc-20240605;
    b=k/DDEvhaKSwq1fjWM0FrkW5lbFEVRHln8sdi0ExNdxC5DX2e6Wcc+yDxxesyjpccS/
        H8f5Ii2NnZShlTB37lgzP0s8knWd0sLnqorv/EM9DaCU/jRPwcPN51k4TOdMZqxzCzUy
        MHPNZzTN1o4XomdeC2EP2gw90XdaYhzTlmwR6F4uRdU42uPTPfAxHQp7muQSqez8ptF+
        GC641X6SE9SrCMNdakyj14W85fhc6rRvTzf8itaD1Rl3W3BoYjulSGVoRSYWS16He3uT
        l6YR7/0sc0tAKKhLYdkwesc81qo65crK6Qc/4F3Xq1iS88+kDc9kqizrg0lT++PNfFgO
        BC0w==
```

* the canonicalization for ARC-Seal is always relaxed (c= is not specified).
* ARC-Seal signs over:
    * the current ARC-Authentication-Results
    * the current ARC-Message-Signature
    * all prior ARC-Seals (not including the current one)

## Headers

* topmost headers are most recent
* https://www.iana.org/assignments/message-headers/message-headers.xhtml
* header formatting: https://datatracker.ietf.org/doc/html/rfc5322#section-2.2.3 (Long header fields folding)

### `From`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Specifies the author of the message (the visible sender).
* Set by: Mail User Agent (MUA) or sender.

### `To`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Specifies the primary recipient(s) of the message.
* Set by: Sender or email client.

### `Subject`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Provides a summary or title of the message content.
* Set by: Sender.

### `Date`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Indicates the date and time at which the message was composed.
* Set by: Sending mail client.

### `Message-ID`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Provides a unique identifier for the message for threading and deduplication.
* Set by: Sending MUA or mail server.

### `Reply-To`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Indicates an alternate address for replies.
* Set by: Sender.

### `Sender`
* RFC: [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322)
* Purpose: Identifies the actual sender when From is a group or different role.
* Set by: Sender.

### `MIME-Version`
* RFC: [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045)
* Purpose: Indicates that the message uses MIME formatting.
* Set by: Mail client.

### `Content-Type`
* RFC: [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045)
* Purpose: Specifies the media type of the message body (e.g., text/plain, multipart).
* Set by: Mail client.

### `Content-Transfer-Encoding`
* RFC: [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045)
* Purpose: Indicates encoding used for the body content (e.g., base64, quoted-printable).
* Set by: Mail client.

### `Delivered-To`
* RFC: Not standardized in an RFC, but widely used.
* Purpose: Indicates the final mailbox address where the message was delivered.
* Set by: The receiving mail server.

### `Received`
* RFC: https://datatracker.ietf.org/doc/html/rfc5321, https://datatracker.ietf.org/doc/html/rfc5322
* Purpose: Tracks the path an email took from the sender to the recipient by listing each mail server that processed it.
* Set by: Each mail server in the delivery chain.

### `Return-Path`
* RFC: https://datatracker.ietf.org/doc/html/rfc5321#section-4.4
* Purpose: Specifies the return address for bounced messages (MAIL FROM in SMTP).
* Set by: The final mail server upon delivery.

### `Received-SPF`
* RFC: https://datatracker.ietf.org/doc/html/rfc7208#section-9.1
* Purpose: Indicates the result of SPF (Sender Policy Framework) evaluation.
* Set by: The receiving server.

### `Authentication-Results`
* RFC: https://datatracker.ietf.org/doc/html/rfc8601
* Purpose: Records the results of authentication checks like SPF, DKIM, and DMARC.
* Set by: Receiving server which does the authentication checks.

### `DKIM-Signature`
* RFC: [RFC 6376](https://datatracker.ietf.org/doc/html/rfc6376)
* Purpose: Contains the cryptographic signature and parameters for DKIM verification.
* Set by: Signing domain’s outgoing SMTP server.

### `ARC-Seal`
* RFC: [RFC 8617](https://datatracker.ietf.org/doc/html/rfc8617#section-4.1.3)
* Purpose: Protects the ARC chain’s integrity and validity status.
* Set by: Intermediary forwarding server participating in ARC.

### `ARC-Message-Signature`
* RFC: [RFC 8617](https://datatracker.ietf.org/doc/html/rfc8617#section-4.1.2)
* Purpose: Signs the original message content and headers at the ARC step.
* Set by: ARC-aware forwarder.

### `ARC-Authentication-Results`
* RFC: [RFC 8617](https://datatracker.ietf.org/doc/html/rfc8617#section-4.1.1)
* Purpose: Captures the authentication results (SPF, DKIM, DMARC) of the original message at the forwarding server.
* Set by: Forwarding server participating in ARC.


## Envelope

The IMAP Envelope is extracted from the SMTP transaction metadata when the email was received by the server.

| Field              | Source                       | Example                           |
| ------------------ | ---------------------------- | --------------------------------- |
| `ENVELOPE.From`    | From the SMTP `MAIL FROM`    | `MAIL FROM:<sender@example.com>`  |
| `ENVELOPE.To`      | From the SMTP `RCPT TO`      | `RCPT TO:<recipient@example.com>` |
| `ENVELOPE.Subject` | From the message headers     | `Subject:` header                 |
| `ENVELOPE.Sender`  | From headers, fallback logic | `Sender:` or `From:` header       |
| `ENVELOPE.Date`    | From `Date:` header          |                                   |

