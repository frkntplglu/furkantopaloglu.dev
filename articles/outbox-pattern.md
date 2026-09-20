---
title: "Outbox pattern: the boring way to publish events"
date: 2025-10-18
tags: [architecture, postgres, kafka]
cover: /articles/outbox-flow.svg
description: Write the event and the state change in one transaction, then relay it. No dual writes.
---

The dual-write problem: you update the database and publish an event, and one of the two fails. The outbox pattern removes it by making the event part of the same transaction.

## How it works

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 7;
INSERT INTO outbox (aggregate_id, type, payload)
VALUES (7, 'MoneyWithdrawn', '{"amount": 100}');
COMMIT;
```

A separate relay process reads unpublished outbox rows and sends them to the broker, marking them as sent afterwards. Because the relay can crash between publish and mark, delivery is **at-least-once**, so pair it with [idempotent consumers](/articles/idempotent-consumers-at-least-once).

## Relay options

- **Polling** with `SKIP LOCKED`: simple and good enough for most systems.
- **Log-based CDC** (Debezium): lower latency, more infrastructure.

Start with polling. Switch only when latency or load demands it.
