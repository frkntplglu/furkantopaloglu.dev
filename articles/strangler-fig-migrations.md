---
title: Strangler fig migrations without a big-bang cutover
date: 2026-05-21
tags: [architecture, microservices]
description: Move a monolith one route at a time and keep the ability to roll back at every step.
---

Big-bang rewrites fail for a boring reason: you stop shipping value for a year and the old system keeps changing underneath you. The strangler fig pattern avoids that by routing traffic **one slice at a time** to the new implementation.

![Traffic shifting from the monolith to new services behind a router](/articles/strangler-routing.svg)

## The loop

1. Put a routing layer in front of the monolith (a gateway or even nginx).
2. Pick one capability with a clear boundary.
3. Build it in the new service, and **shadow** production traffic to compare responses.
4. Shift 1%, 10%, 50%, 100% behind a flag.
5. Delete the old code path. This step is the one people skip.

## Data is the hard part

Routes are easy; shared tables are not. Prefer the new service owning its data and the monolith reading it through an API or a replicated view, never two writers on the same table.

Every step is reversible with a flag flip. That reversibility is the whole point.
