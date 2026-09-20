---
title: "Postgres advisory locks: when a queue table is enough"
date: 2026-07-02
tags: [postgres, golang]
description: Before you add a broker, check whether SKIP LOCKED and a table already solve the problem.
---

Not every background job needs Kafka or SQS. If you already run Postgres and your throughput is in the hundreds per second, a jobs table with `FOR UPDATE SKIP LOCKED` is often all you need, with transactional enqueue for free.

## The claim query

```sql
WITH next AS (
  SELECT id FROM jobs
  WHERE status = 'pending' AND run_at <= now()
  ORDER BY run_at
  LIMIT 10
  FOR UPDATE SKIP LOCKED
)
UPDATE jobs SET status = 'running', started_at = now()
FROM next WHERE jobs.id = next.id
RETURNING jobs.*;
```

Workers never block each other: rows locked by another transaction are simply skipped.

## Advisory locks for singletons

For "only one instance may run this cron" problems, `pg_try_advisory_lock(key)` gives you a cheap leader election without any extra infrastructure. The lock is released automatically when the session ends, which is exactly the failure behaviour you want.

## When to stop

Move to a real broker when you need fan-out to many consumers, replay, or sustained throughput that makes the table hot. Until then, fewer moving parts wins.
