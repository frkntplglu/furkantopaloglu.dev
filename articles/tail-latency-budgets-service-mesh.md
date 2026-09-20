---
title: Tail latency budgets across a service mesh
date: 2026-03-30
tags: [observability, microservices]
description: Averages hide the problem. Budget p99 per hop, or your fan-out will do it for you.
---

If a request fans out to ten services and each has a p99 of 200 ms, roughly one in ten user requests hits at least one slow call. Tail latency is not an edge case in a microservice architecture; it is the common case.

## Budget per hop

Give the edge a total budget, then split it explicitly:

| Hop | p99 budget |
| --- | --- |
| Gateway | 20 ms |
| Auth | 30 ms |
| Core service | 150 ms |
| Database | 60 ms |

Propagate the remaining deadline in the request context so downstream services can fail fast instead of doing work nobody is waiting for.

## Hedge carefully

Hedged requests (send a second copy after the p95 elapses) cut the tail dramatically, but only for idempotent reads, and only with a retry budget so they cannot amplify an outage.

Measure with histograms, not averages, and alert on burn rate against the budget.
