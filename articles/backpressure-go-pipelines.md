---
title: Backpressure in Go pipelines, done properly
date: 2025-12-05
tags: [golang, concurrency]
description: Unbounded queues turn slow consumers into out-of-memory kills. Use bounded channels and let them push back.
---

A pipeline without backpressure is a memory leak waiting for a slow stage. In Go, the built-in answer is a **bounded channel**: when it is full, the producer blocks, and pressure propagates upstream naturally.

```go
func stage(ctx context.Context, in <-chan Job, workers int) <-chan Result {
	out := make(chan Result, workers) // small, bounded buffer
	var wg sync.WaitGroup
	for i := 0; i < workers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for job := range in {
				select {
				case out <- process(job):
				case <-ctx.Done():
					return
				}
			}
		}()
	}
	go func() { wg.Wait(); close(out) }()
	return out
}
```

## Checklist

- Every channel has a deliberate capacity, and `0` or a small number is usually right.
- Every send is paired with `ctx.Done()` so shutdown never deadlocks.
- At the network edge, shed load (return `429`) instead of queueing forever.

Blocking is a feature: it is the cheapest form of flow control you have.
