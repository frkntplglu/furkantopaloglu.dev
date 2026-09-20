---
title: Reading EXPLAIN ANALYZE like a profiler
date: 2026-02-11
tags: [postgres]
description: Treat the plan as a flame graph. Find the node where estimated and actual rows diverge.
---

`EXPLAIN ANALYZE` output looks like noise until you read it like a profiler: find where the time goes, then ask why the planner was surprised.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE customer_id = 42 AND status = 'open';
```

## What I look at, in order

1. **Actual time** of the slowest node, remembering it is per loop.
2. **Rows: estimated vs actual.** A 100x gap means stale or missing statistics.
3. **Buffers.** `shared read` means disk; `shared hit` means cache.
4. **Sort and hash nodes spilling** to disk (`Sort Method: external merge`).

## Common fixes

- Run `ANALYZE`, or raise the statistics target on skewed columns.
- Add a composite index that matches the filter and sort order.
- Rewrite `OR` across columns into a `UNION ALL`.

Most slow queries are one wrong estimate away from a fast plan.
