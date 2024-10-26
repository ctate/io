---
title: Semaphore
excerpt: Discover the power of semaphores in Effect, a synchronization mechanism that regulates access to shared resources and coordinates tasks in an asynchronous and concurrent environment. Delve into the fundamental concept of semaphores, learn how they function in Effect, and explore real-world examples showcasing their application in controlling asynchronous tasks. Gain insights into precise control over concurrency using permits and understand how semaphores elevate your ability to manage resources effectively.
---

A semaphore is a synchronization mechanism that controls access to a shared resource. In Effect, semaphores manage resource access or coordinate tasks in an asynchronous and concurrent environment.

## What is a Semaphore?

A semaphore generalizes a mutex and has a certain number of **permits** that can be held and released concurrently. Permits act as tickets allowing entities (e.g., tasks or fibers) to access a shared resource. If no permits are available, an entity attempting to acquire one will be suspended until a permit becomes available.

### Example with Asynchronous Tasks

```ts
import { Effect } from "effect"

const task = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.log("end")
})

const semTask = (sem: Effect.Semaphore) => sem.withPermits(1)(task)

const semTaskSeq = (sem: Effect.Semaphore) =>
  [1, 2, 3].map(() => semTask(sem).pipe(Effect.withLogSpan("elapsed")))

const program = Effect.gen(function* () {
  const mutex = yield* Effect.makeSemaphore(1)
  yield* Effect.all(semTaskSeq(mutex), { concurrency: "unbounded" })
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#1 message=start elapsed=3ms
timestamp=... level=INFO fiber=#1 message=end elapsed=2010ms
timestamp=... level=INFO fiber=#2 message=start elapsed=2012ms
timestamp=... level=INFO fiber=#2 message=end elapsed=4017ms
timestamp=... level=INFO fiber=#3 message=start elapsed=4018ms
timestamp=... level=INFO fiber=#3 message=end elapsed=6026ms
*/
```

In this example, we synchronize and control the execution of asynchronous tasks using a semaphore with one permit. When all permits are in use, additional tasks will wait until some become available.

### Example with Multiple Permits

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const sem = yield* Effect.makeSemaphore(5)

  yield* Effect.forEach(
    [1, 2, 3, 4, 5],
    (n) =>
      sem
        .withPermits(n)(
          Effect.delay(Effect.log(`process: ${n}`), "2 seconds")
        )
        .pipe(Effect.withLogSpan("elapsed")),
    { concurrency: "unbounded" }
  )
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#1 message="process: 1" elapsed=2011ms
timestamp=... level=INFO fiber=#2 message="process: 2" elapsed=2017ms
timestamp=... level=INFO fiber=#3 message="process: 3" elapsed=4020ms
timestamp=... level=INFO fiber=#4 message="process: 4" elapsed=6025ms
timestamp=... level=INFO fiber=#5 message="process: 5" elapsed=8034ms
*/
```

This example demonstrates acquiring and releasing any number of permits with `withPermits(n)`, allowing for precise control over concurrency.

It is crucial to remember that `withPermits` ensures each acquisition is matched with an equivalent number of releases, regardless of the task's success, failure, or interruption.