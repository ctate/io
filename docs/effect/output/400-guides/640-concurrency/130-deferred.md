# Deferred

Explore the power of `Deferred` in Effect, a specialized subtype of `Effect` that acts as a one-time variable with unique characteristics. Discover how `Deferred` serves as a synchronization tool for managing asynchronous operations, allowing coordination between different parts of your code. Learn common use cases, including coordinating fibers, synchronization, handing over work, and suspending execution. Dive into operations such as creating, awaiting, completing, and polling `Deferred`, providing practical examples and scenarios to enhance your understanding of this powerful tool.

A `Deferred<A, E>` is a special subtype of `Effect` that acts as a variable, but with unique characteristics. It can only be set once, making it a powerful synchronization tool for managing asynchronous operations.

A `Deferred` is essentially a synchronization primitive that represents a value that may not be available immediately. When you create a `Deferred`, it starts with an empty value. Later on, you can complete it exactly once with either a success value (`A`) or a failure value (`E`). Once completed, a `Deferred` can never be modified or emptied again.

## Common Use Cases

`Deferred` is useful when you need to wait for something specific to happen in your program. It's ideal for scenarios where one part of your code signals another part when it's ready. Common use cases include:

- **Coordinating Fibers**: Helps one fiber signal another when it has completed its task.
- **Synchronization**: Ensures one piece of code doesn't proceed until another has finished.
- **Handing Over Work**: Allows one fiber to prepare data for another to process.
- **Suspending Execution**: Blocks a fiber until a condition is met.

When a fiber calls `await` on a `Deferred`, it blocks until that `Deferred` is completed with either a value or an error. Importantly, blocking fibers don't block the main thread; they block only semantically, allowing other fibers to execute.

A `Deferred` in Effect is conceptually similar to JavaScript's `Promise`, with the key difference being that `Deferred` has two type parameters (`E` and `A`), allowing it to represent both successful results and errors.

## Operations

### Creating

Create a `Deferred` using `Deferred.make<A, E>()`, which returns an `Effect<Deferred<A, E>>`. `Deferred`s can only be created within an `Effect` due to effectful memory allocation.

### Awaiting

Retrieve a value from a `Deferred` using `Deferred.await`, which suspends the calling fiber until the `Deferred` is completed.

```ts
import { Effect, Deferred } from "effect"

const effectDeferred = Deferred.make<string, Error>()

const effectGet = effectDeferred.pipe(
  Effect.andThen((deferred) => Deferred.await(deferred))
)
```

### Completing

Complete a `Deferred<A, E>` in various ways:

- `Deferred.succeed`: Completes successfully with a value of type `A`.
- `Deferred.done`: Completes with an `Exit<A, E>` type.
- `Deferred.complete`: Completes with the result of an effect `Effect<A, E>`.
- `Deferred.completeWith`: Completes with an effect `Effect<A, E>`, executed by each waiting fiber.
- `Deferred.fail`: Fails with an error of type `E`.
- `Deferred.die`: Defects with a user-defined error.
- `Deferred.failCause`: Fails or defects with a `Cause<E>`.
- `Deferred.interrupt`: Interrupts the `Deferred`, stopping waiting fibers.

Example demonstrating completion methods:

```ts
import { Effect, Deferred, Exit, Cause } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()

  yield* Deferred.succeed(deferred, 1).pipe(Effect.fork)
  yield* Deferred.complete(deferred, Effect.succeed(2)).pipe(Effect.fork)
  yield* Deferred.completeWith(deferred, Effect.succeed(3)).pipe(Effect.fork)
  yield* Deferred.done(deferred, Exit.succeed(4)).pipe(Effect.fork)
  yield* Deferred.fail(deferred, "5").pipe(Effect.fork)
  yield* Deferred.failCause(deferred, Cause.die(new Error("6"))).pipe(Effect.fork)
  yield* Deferred.die(deferred, new Error("7")).pipe(Effect.fork)
  yield* Deferred.interrupt(deferred).pipe(Effect.fork)

  const value = yield* Deferred.await(deferred)
  return value
})

Effect.runPromise(program).then(console.log, console.error) // Output: 1
```

Completing a `Deferred` results in an `Effect<boolean>`, returning `true` if the value has been set and `false` if it was already set.

Example demonstrating state change:

```ts
import { Effect, Deferred } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()
  const b1 = yield* Deferred.fail(deferred, "oh no!")
  const b2 = yield* Deferred.succeed(deferred, 1)
  return [b1, b2]
})

Effect.runPromise(program).then(console.log) // Output: [ true, false ]
```

### Polling

Check whether a `Deferred` has been completed without suspending the fiber using `Deferred.poll`, which returns an `Option<Effect<A, E>>`.

- If not completed, returns `None`.
- If completed, returns `Some` with the result or error.

Use `Deferred.isDone`, which returns an `Effect<boolean>`, evaluating to `true` if completed.

Example:

```ts
import { Effect, Deferred } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()

  const done1 = yield* Deferred.poll(deferred)
  const done2 = yield* Deferred.isDone(deferred)

  return [done1, done2]
})

Effect.runPromise(program).then(console.log) // Output: [ none(), false ]
```

## Example: Using Deferred to Coordinate Two Fibers

Example using a `Deferred` to hand over a value between two fibers:

```ts
import { Effect, Deferred, Fiber } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<string, string>()

  const sendHelloWorld = Effect.gen(function* () {
    yield* Effect.sleep("1 second")
    return yield* Deferred.succeed(deferred, "hello world")
  })

  const getAndPrint = Effect.gen(function* () {
    const s = yield* Deferred.await(deferred)
    console.log(s)
    return s
  })

  const fiberA = yield* Effect.fork(sendHelloWorld)
  const fiberB = yield* Effect.fork(getAndPrint)

  return yield* Fiber.join(Fiber.zip(fiberA, fiberB))
})

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
hello world
[ true, "hello world" ]
*/
```

In this example, `fiberA` sets the `Deferred` value to "hello world" after waiting for 1 second, while `fiberB` waits for the `Deferred` to be completed and prints the value. This coordination mechanism effectively manages communication between different parts of your program.