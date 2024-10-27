# Basic Concurrency

Effect is a highly concurrent framework powered by fibers. Fibers are lightweight virtual threads with resource-safe cancellation capabilities, enabling many features in Effect.

In this section, you will learn the basics of fibers and get familiar with some of the powerful high-level operators that utilize fibers.

## What Are Virtual Threads?

JavaScript is inherently single-threaded, executing code in a single sequence of instructions. Modern JavaScript environments use an event loop to manage asynchronous operations, creating the illusion of multitasking. In this context, virtual threads, or fibers, are logical threads simulated by the Effect runtime, allowing concurrent execution without true multi-threading.

## Fibers

All effects in Effect are executed by fibers. If you didn't create the fiber yourself, it was created by an operation you're using or by the Effect runtime system. There is always at least one fiber: the "main" fiber that executes your effect.

Effect fibers have a well-defined lifecycle based on the effect they are executing and exit with either a failure or success.

Effect fibers have unique identities, local state, and a status (such as done, running, or suspended).

### The Fiber Data Type

The Fiber data type in Effect represents a "handle" on the execution of an effect.

The `Fiber<A, E>` data type has two type parameters:

- **A (Success Type)**: The type of value the fiber may succeed with.
- **E (Failure Type)**: The type of value the fiber may fail with.

Fibers do not have an `R` type parameter because they only execute effects that have already had their requirements provided.

### Forking Effects

You can create a fiber by forking an existing effect. When you fork an effect, it starts executing on a new fiber, giving you a reference to this newly-created fiber.

Example:

```ts
import { Effect } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }
    return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b))
  })

const fib10Fiber = Effect.fork(fib(10))
```

### Joining Fibers

You can join fibers using the `Fiber.join` function, which returns an `Effect` that will succeed or fail based on the outcome of the fiber it joins.

Example:

```ts
import { Effect, Fiber } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }
    return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b))
  })

const fib10Fiber = Effect.fork(fib(10))

const program = Effect.gen(function* () {
  const fiber = yield* fib10Fiber
  const n = yield* Fiber.join(fiber)
  console.log(n)
})

Effect.runPromise(program) // 55
```

### Awaiting Fibers

The `Fiber.await` function returns an effect containing an Exit value, providing detailed information about how the fiber completed.

Example:

```ts
import { Effect, Fiber } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }
    return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b))
  })

const fib10Fiber = Effect.fork(fib(10))

const program = Effect.gen(function* () {
  const fiber = yield* fib10Fiber
  const exit = yield* Fiber.await(fiber)
  console.log(exit)
})

Effect.runPromise(program) // { _id: 'Exit', _tag: 'Success', value: 55 }
```

### Interrupting Fibers

If a fiber's result is no longer needed, it can be interrupted, terminating the fiber and safely releasing all resources.

Example:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(Effect.forever(Effect.succeed("Hi!")))
  const exit = yield* Fiber.interrupt(fiber)
  console.log(exit)
})

Effect.runPromise(program)
/*
Output
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Interrupt',
    fiberId: {
      _id: 'FiberId',
      _tag: 'Runtime',
      id: 0,
      startTimeMillis: 1715787137490
    }
  }
}
*/
```

You can also fork the interruption into a new fiber:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(Effect.forever(Effect.succeed("Hi!")))
  const _ = yield* Effect.fork(Fiber.interrupt(fiber))
})
```

There is a shorthand for background interruption called `Fiber.interruptFork`.

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(Effect.forever(Effect.succeed("Hi!")))
  const _ = yield* Fiber.interruptFork(fiber)
})
```

### Composing Fibers

The `Fiber.zip` and `Fiber.zipWith` functions allow you to combine two fibers into a single fiber. The resulting fiber produces the results of both input fibers. If either input fiber fails, the composed fiber will also fail.

Example using `Fiber.zip`:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber1 = yield* Effect.fork(Effect.succeed("Hi!"))
  const fiber2 = yield* Effect.fork(Effect.succeed("Bye!"))
  const fiber = Fiber.zip(fiber1, fiber2)
  const tuple = yield* Fiber.join(fiber)
  console.log(tuple)
})

Effect.runPromise(program)
/*
Output:
[ 'Hi!', 'Bye!' ]
*/
```

Using `Fiber.orElse` allows you to specify an alternative fiber that will execute if the first fiber fails.

Example using `Fiber.orElse`:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber1 = yield* Effect.fork(Effect.fail("Uh oh!"))
  const fiber2 = yield* Effect.fork(Effect.succeed("Hurray!"))
  const fiber = Fiber.orElse(fiber1, fiber2)
  const message = yield* Fiber.join(fiber)
  console.log(message)
})

Effect.runPromise(program)
/*
Output:
Hurray!
*/
```

## Concurrency Options

Effect provides functions that accept Concurrency Options to help identify opportunities to parallelize your code.

Example using standard `Effect.zip`:

```ts
import { Effect, Console } from "effect"

const task1 = Effect.delay(Console.log("task1"), "1 second")
const task2 = Effect.delay(Console.log("task2"), "2 seconds")

const program = Effect.zip(task1, task2)

Effect.runPromise(Effect.timed(program)).then(([duration]) =>
  console.log(String(duration))
)
/*
Output:
task1
task2
Duration(3s 5ms 369875ns)
*/
```

Example using concurrent version of `Effect.zip`:

```ts
import { Effect, Console } from "effect"

const task1 = Effect.delay(Console.log("task1"), "1 second")
const task2 = Effect.delay(Console.log("task2"), "2 seconds")

const program = Effect.zip(task1, task2, { concurrent: true })

Effect.runPromise(Effect.timed(program)).then(([duration]) =>
  console.log(String(duration))
)
/*
Output:
task1
task2
Duration(2s 8ms 179666ns)
*/
```

## Racing

The `Effect.race` function lets you race multiple effects concurrently and returns the result of the first one that successfully completes.

Example:

```ts
import { Effect } from "effect"

const task1 = Effect.delay(Effect.fail("task1"), "1 second")
const task2 = Effect.delay(Effect.succeed("task2"), "2 seconds")

const program = Effect.race(task1, task2)

Effect.runPromise(program).then(console.log)
/*
Output:
task2
*/
```

Using `Effect.either` allows you to handle the first effect to complete, whether it succeeds or fails.

Example:

```ts
import { Effect } from "effect"

const task1 = Effect.delay(Effect.fail("task1"), "1 second")
const task2 = Effect.delay(Effect.succeed("task2"), "2 seconds")

const program = Effect.race(Effect.either(task1), Effect.either(task2))

Effect.runPromise(program).then(console.log)
/*
Output:
{ _id: 'Either', _tag: 'Left', left: 'task1' }
*/
```

## Timeout

Effect provides a way to enforce time limits on effects using the `Effect.timeout` function. This function returns a new effect that will fail with a `TimeoutException` if the original effect does not complete within the specified duration.

Example:

```ts
import { Effect } from "effect"

const task = Effect.delay(Effect.succeed("task1"), "10 seconds")

const program = Effect.timeout(task, "2 seconds")

Effect.runPromise(program)
/*
throws:
TimeoutException
*/
```

If an effect times out, the library automatically interrupts it to prevent it from continuing to execute in the background.