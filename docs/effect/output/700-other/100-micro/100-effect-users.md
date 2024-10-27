---
title: Micro for Effect Users
excerpt: "Micro for Effect Users: Key Differences and Benefits"
---

The `Micro` module in Effect is a lightweight alternative to the standard `Effect` module, aimed at reducing bundle size. It is standalone and excludes complex functionalities like `Layer`, `Ref`, `Queue`, and `Deferred`, making it ideal for libraries that want to maintain a minimal footprint while providing `Promise`-based APIs.

Micro supports scenarios where a client application uses Micro while a server employs the full Effect features, ensuring compatibility across components. The initial bundle size is approximately **5kb gzipped**, which may vary based on used features.

**Warning:** Using major Effect modules beyond basic data modules like `Option`, `Either`, and `Array` will include the Effect runtime in your bundle, negating Micro's benefits.

## Importing Micro

Micro can be imported as follows:

```ts
import * as Micro from "effect/Micro"
```

## Main Types

### Micro

The `Micro` type uses three type parameters:

```ts
Micro<Success, Error, Requirements>
```

### MicroExit

The `MicroExit` type captures the outcome of a `Micro` computation using the `Either` data type:

```ts
type MicroExit<A, E = never> = Either<A, MicroCause<E>>
```

### MicroCause

The `MicroCause` type consists of three specific types:

```ts
type MicroCause<E> = Die | Fail<E> | Interrupt
```

| **Failure Type** | **Description**                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `Die`            | Indicates an unforeseen defect not planned for in the system's logic.                      |
| `Fail<E>`        | Covers anticipated errors typically handled within the application.                        |
| `Interrupt`      | Signifies an operation that has been purposefully stopped.                                 |

### MicroSchedule

The `MicroSchedule` type represents a function to calculate the delay between repeats:

```ts
type MicroSchedule = (attempt: number, elapsed: number) => Option<number>
```

## How to Use This Guide

The following comparisons outline the functionalities of `Effect` and `Micro`. Icons indicate:

- ⚠️: Available in `Micro` with differences from `Effect`.
- ❌: Not available in `Effect`.

## Creating Effects

| Effect                 | Micro                   |                                      |
| ---------------------- | ----------------------- | ------------------------------------ |
| `Effect.try`           | ⚠️ `Micro.try`          | requires a `try` block               |
| `Effect.tryPromise`    | ⚠️ `Micro.tryPromise`   | requires a `try` block               |
| `Effect.sleep`         | ⚠️ `Micro.sleep`        | only handles milliseconds            |
| `Effect.failCause`     | ⚠️ `Micro.failWith`     | uses `MicroCause` instead of `Cause` |
| `Effect.failCauseSync` | ⚠️ `Micro.failWithSync` | uses `MicroCause` instead of `Cause` |
| ❌                     | `Micro.make`            |                                      |
| ❌                     | `Micro.fromOption`      |                                      |
| ❌                     | `Micro.fromEither`      |                                      |

## Running Effects

| Effect                  | Micro                     |                                                |
| ----------------------- | ------------------------- | ---------------------------------------------- |
| `Effect.runSyncExit`    | ⚠️ `Micro.runSyncExit`    | returns a `MicroExit` instead of an `Exit`     |
| `Effect.runPromiseExit` | ⚠️ `Micro.runPromiseExit` | returns a `MicroExit` instead of an `Exit`     |
| `Effect.runFork`        | ⚠️ `Micro.runFork`        | returns a `Handle` instead of a `RuntimeFiber` |

### runSyncExit

```ts
import * as Micro from "effect/Micro"

const result1 = Micro.runSyncExit(Micro.succeed(1))
console.log(result1)

const result2 = Micro.runSyncExit(Micro.fail("my error"))
console.log(result2)
```

### runPromiseExit

```ts
import * as Micro from "effect/Micro"

Micro.runPromiseExit(Micro.succeed(1)).then(console.log)
Micro.runPromiseExit(Micro.fail("my error")).then(console.log)
```

### runFork

```ts
import * as Micro from "effect/Micro"

const handle = Micro.succeed(42).pipe(Micro.delay(1000), Micro.runFork)

handle.addObserver((result) => {
  console.log(result)
})
console.log("observing...")
```

## Building Pipelines

| Effect             | Micro                |                                                         |
| ------------------ | -------------------- | ------------------------------------------------------- |
| `Effect.andThen`   | ⚠️ `Micro.andThen`   | doesn't handle `Promise` or `() => Promise` as argument |
| `Effect.tap`       | ⚠️ `Micro.tap`       | doesn't handle `() => Promise` as argument              |
| `Effect.all`       | ⚠️ `Micro.all`       | no `batching` and `mode` options                        |
| `Effect.forEach`   | ⚠️ `Micro.forEach`   | no `batching` option                                    |
| `Effect.filter`    | ⚠️ `Micro.filter`    | no `batching` option                                    |
| `Effect.filterMap` | ⚠️ `Micro.filterMap` | effectful                                               |

## Expected Errors

| Effect        | Micro           |                                            |
| ------------- | --------------- | ------------------------------------------ |
| `Effect.exit` | ⚠️ `Micro.exit` | returns a `MicroExit` instead of an `Exit` |

## Unexpected Errors

| Effect | Micro                |     |
| ------ | -------------------- | --- |
| ❌     | `Micro.catchCauseIf` |     |

## Timing Out

| Effect | Micro                 |     |
| ------ | --------------------- | --- |
| ❌     | `Micro.timeoutOrElse` |     |

## Requirements Management

```ts
import * as Context from "effect/Context"
import * as Micro from "effect/Micro"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Micro.Micro<number> }
>() {}

const program = Micro.gen(function* () {
  const random = yield* Micro.service(Random)
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})

const runnable = Micro.provideService(program, Random, {
  next: Micro.sync(() => Math.random())
})

Micro.runPromise(runnable)
```

## Scope

| Effect       | Micro                |                                             |
| ------------ | -------------------- | ------------------------------------------- |
| `Scope`      | ⚠️ `MicroScope`      | returns a `MicroScope` instead of a `Scope` |
| `Scope.make` | ⚠️ `Micro.scopeMake` | returns a `MicroScope` instead of a `Scope` |

```ts
import * as Micro from "effect/Micro"

const consoleLog = (message: string) => Micro.sync(() => console.log(message))

const program =
  Micro.scopeMake.pipe(
    Micro.tap((scope) => scope.addFinalizer(() => consoleLog("finalizer 1"))),
    Micro.tap((scope) => scope.addFinalizer(() => consoleLog("finalizer 2"))),
    Micro.andThen((scope) =>
      scope.close(Micro.exitSucceed("scope closed successfully"))
    )
  )

Micro.runPromise(program)
```

## Retrying

| Effect         | Micro            |                     |
| -------------- | ---------------- | ------------------- |
| `Effect.retry` | ⚠️ `Micro.retry` | different `options` |

## Repetition

| Effect                               | Micro                 |                     |
| ------------------------------------ | --------------------- | ------------------- |
| `Effect.repeat`                      | ⚠️ `Micro.repeat`     | different `options` |
| ❌ (`Effect.exit` + `Effect.repeat`) | ⚠️ `Micro.repeatExit` |                     |

## Sandboxing

| Effect           | Micro              |                                       |
| ---------------- | ------------------ | ------------------------------------- |
| `Effect.sandbox` | ⚠️ `Micro.sandbox` | `MicroCause<E>` instead of `Cause<E>` |

## Error Channel Operations

| Effect                 | Micro                    |                                       |
| ---------------------- | ------------------------ | ------------------------------------- |
| ❌                     | `Micro.filterOrFailWith` |                                       |
| `Effect.tapErrorCause` | ⚠️ `Micro.tapErrorCause` | `MicroCause<E>` instead of `Cause<E>` |
| ❌                     | `Micro.tapCauseIf`       |                                       |
| `Effect.tapDefect`     | ⚠️ `Micro.tapDefect`     | `unknown` instead of `Cause<never>`   |

## Requirements Management

| Effect           | Micro                     |                        |
| ---------------- | ------------------------- | ---------------------- |
| `Effect.provide` | ⚠️ `Micro.provideContext` | only handles `Context` |
| ❌               | `Micro.provideScope`      |                        |
| ❌               | `Micro.service`           |                        |

## Scoping, Resources and Finalization

| Effect                     | Micro                        |                                          |
| -------------------------- | ---------------------------- | ---------------------------------------- |
| `Effect.addFinalizer`      | ⚠️ `Micro.addFinalizer`      | `MicroExit` instead of `Exit` and no `R` |
| `Effect.acquireRelease`    | ⚠️ `Micro.acquireRelease`    | `MicroExit` instead of `Exit`            |
| `Effect.acquireUseRelease` | ⚠️ `Micro.acquireUseRelease` | `MicroExit` instead of `Exit`            |
| `Effect.onExit`            | ⚠️ `Micro.onExit`            | `MicroExit` instead of `Exit`            |
| `Effect.onError`           | ⚠️ `Micro.onError`           | uses `MicroCause` instead of `Cause`     |

## Concurrency

| Effect              | Micro                 |                                    |
| ------------------- | --------------------- | ---------------------------------- |
| `Effect.fork`       | ⚠️ `Micro.fork`       | `Handle` instead of `RuntimeFiber` |
| `Effect.forkDaemon` | ⚠️ `Micro.forkDaemon` | `Handle` instead of `RuntimeFiber` |
| `Effect.forkIn`     | ⚠️ `Micro.forkIn`     | `Handle` instead of `RuntimeFiber` |
| `Effect.forkScoped` | ⚠️ `Micro.forkScoped` | `Handle` instead of `RuntimeFiber` |