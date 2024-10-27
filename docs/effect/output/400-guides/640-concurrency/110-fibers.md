---
title: Fibers
excerpt: Discover the power of fibers in Effect, providing a lightweight and efficient way to manage concurrency and asynchronous tasks. Learn the fundamentals of fibers, their role in multitasking, and how they contribute to responsive applications. Explore the creation of fibers, their lifetimes, and various forking strategies, gaining insights into structured concurrency and daemon fibers. Unravel the intricacies of when fibers run, enabling you to optimize their execution and harness the full potential of concurrent programming in Effect.
---

## What is a Fiber?

A "fiber" is a small unit of work or a lightweight thread of execution, representing a specific computation or an effectful operation in a program. Fibers manage concurrency and asynchronous tasks, allowing multiple tasks to run simultaneously without blocking the main program.

- An `Effect` is a higher-level concept describing an effectful computation that is lazy and immutable.
- A fiber represents the running execution of an `Effect`, which can be interrupted or awaited to retrieve its result.

## Creating Fibers

A fiber is created whenever an effect is run. Each concurrent effect results in a new fiber.

## Lifetime of Child Fibers

When forking fibers, there are four different lifetime strategies for child fibers:

1. **Fork With Automatic Supervision**: Using `Effect.fork`, the child fiber is supervised by the parent fiber. It terminates when the parent fiber ends or naturally completes.

2. **Fork in Global Scope (Daemon)**: Using `Effect.forkDaemon`, the child fiber runs in a global scope and is not supervised by the parent. It terminates when the application ends or naturally completes.

3. **Fork in Local Scope**: Using `Effect.forkScoped`, the child fiber can outlive its parent fiber and will terminate when the local scope is closed.

4. **Fork in Specific Scope**: Using `Effect.forkIn`, the child fiber is forked in a specific scope, allowing for more control over its lifetime.

### Fork with Automatic Supervision

Effect employs a structured concurrency model where the lifespan of a fiber depends on its parent fiber. 

Example:
```ts
import { Effect, Console, Schedule } from "effect"

const child = Effect.repeat(
  Console.log("child: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.fork(child)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

Effect.runPromise(parent)
```

Output:
```
parent: started!
child: still running!
child: still running!
child: still running!
parent: finished!
```

### Fork in Global Scope (Daemon)

Using `Effect.forkDaemon`, the daemon fiber runs independently of the parent fiber.

Example:
```ts
import { Effect, Console, Schedule } from "effect"

const daemon = Effect.repeat(
  Console.log("daemon: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.forkDaemon(daemon)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

Effect.runPromise(parent)
```

Output:
```
parent: started!
daemon: still running!
daemon: still running!
parent: finished!
daemon: still running!
...etc...
```

### Fork in Local Scope

Using `Effect.forkScoped`, the child fiber can outlive its parent fiber.

Example:
```ts
import { Effect, Console, Schedule } from "effect"

const child = Effect.repeat(
  Console.log("child: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.forkScoped(child)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

const program = Effect.scoped(
  Effect.gen(function* () {
    console.log("Local scope started!")
    yield* Effect.fork(parent)
    yield* Effect.sleep("5 seconds")
    console.log("Leaving the local scope!")
  })
)

Effect.runPromise(program)
```

Output:
```
Local scope started!
parent: started!
child: still running!
parent: finished!
Leaving the local scope!
```

### Fork in Specific Scope

Using `Effect.forkIn`, the child fiber is forked in a specific scope.

Example:
```ts
import { Console, Effect, Schedule } from "effect"

const child = Console.log("child: still running!").pipe(
  Effect.repeat(Schedule.fixed("1 second"))
)

const program = Effect.scoped(
  Effect.gen(function* () {
    yield* Effect.addFinalizer(() =>
      Console.log("The outer scope is about to be closed!")
    )

    const outerScope = yield* Effect.scope

    yield* Effect.scoped(
      Effect.gen(function* () {
        yield* Effect.addFinalizer(() =>
          Console.log("The inner scope is about to be closed!")
        )
        yield* Effect.forkIn(child, outerScope)
        yield* Effect.sleep("3 seconds")
      })
    )

    yield* Effect.sleep("5 seconds")
  })
)

Effect.runPromise(program)
```

Output:
```
child: still running!
The inner scope is about to be closed!
The outer scope is about to be closed!
```

## When do Fibers run?

New fibers begin execution after the current fiber completes or yields. This prevents infinite loops and is important when using the `fork` APIs.

Example:
```ts
import { Effect, SubscriptionRef, Stream, Console } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  yield* ref.changes.pipe(
    Stream.tap((n) => Console.log(`SubscriptionRef changed to ${n}`)),
    Stream.runDrain,
    Effect.fork
  )
  yield* SubscriptionRef.set(ref, 1)
  yield* SubscriptionRef.set(ref, 2)
})

Effect.runPromise(program)
/*
Output:
SubscriptionRef changed to 2
*/
```

Adding `Effect.yieldNow()` allows the stream to capture all values:
```ts
import { Effect, SubscriptionRef, Stream, Console } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  yield* ref.changes.pipe(
    Stream.tap((n) => Console.log(`SubscriptionRef changed to ${n}`)),
    Stream.runDrain,
    Effect.fork
  )
  yield* Effect.yieldNow()
  yield* SubscriptionRef.set(ref, 1)
  yield* SubscriptionRef.set(ref, 2)
})

Effect.runPromise(program)
/*
Output:
SubscriptionRef changed to 0
SubscriptionRef changed to 1
SubscriptionRef changed to 2
*/
```