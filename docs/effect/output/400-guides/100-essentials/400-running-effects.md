# Running Effects

Explore various "run" functions in the Effect module to execute effects. Learn about `runSync` for synchronous execution, `runSyncExit` for obtaining results as `Exit`, `runPromise` for executing with a Promise result, and `runPromiseExit` for Promise results with `Exit`. Understand their use cases and considerations. 

To execute an `Effect`, we can utilize a variety of "run" functions provided by the `Effect` module.

## runSync

The `Effect.runSync` function is used to execute an Effect synchronously, which means it runs immediately and returns the result.

```ts
import { Effect } from "effect"

const program = Effect.sync(() => {
  console.log("Hello, World!")
  return 1
})

const result = Effect.runSync(program)
// Output: Hello, World!

console.log(result)
// Output: 1
```

If you check the console, you will see the message `"Hello, World!"` printed.

**Warning**: `Effect.runSync` will throw an error if your Effect fails or performs any asynchronous tasks. In the latter case, the execution will not proceed beyond that asynchronous task.

```ts
import { Effect } from "effect"

Effect.runSync(Effect.fail("my error")) // throws

Effect.runSync(Effect.promise(() => Promise.resolve(1))) // throws
```

## runSyncExit

The `Effect.runSyncExit` function is used to execute an Effect synchronously, which means it runs immediately and returns the result as an Exit (a data type used to describe the result of executing an Effect workflow).

```ts
import { Effect } from "effect"

const result1 = Effect.runSyncExit(Effect.succeed(1))
console.log(result1)
/*
Output:
{
  _id: "Exit",
  _tag: "Success",
  value: 1
}
*/

const result2 = Effect.runSyncExit(Effect.fail("my error"))
console.log(result2)
/*
Output:
{
  _id: "Exit",
  _tag: "Failure",
  cause: {
    _id: "Cause",
    _tag: "Fail",
    failure: "my error"
  }
}
*/
```

**Warning**: `Effect.runSyncExit` will throw an error if your Effect performs any asynchronous tasks and the execution will not proceed beyond that asynchronous task.

```ts
import { Effect } from "effect"

Effect.runSyncExit(Effect.promise(() => Promise.resolve(1))) // throws
```

## runPromise

The `Effect.runPromise` function is used to execute an Effect and obtain the result as a Promise.

```ts
import { Effect } from "effect"

Effect.runPromise(Effect.succeed(1)).then(console.log) // Output: 1
```

**Warning**: `Effect.runPromise` will reject with an error if your Effect fails.

```ts
import { Effect } from "effect"

Effect.runPromise(Effect.fail("my error")) // rejects
```

## runPromiseExit

The `Effect.runPromiseExit` function is used to execute an Effect and obtain the result as a Promise that resolves to an Exit (a data type used to describe the result of executing an Effect workflow).

```ts
import { Effect } from "effect"

Effect.runPromiseExit(Effect.succeed(1)).then(console.log)
/*
Output:
{
  _id: "Exit",
  _tag: "Success",
  value: 1
}
*/

Effect.runPromiseExit(Effect.fail("my error")).then(console.log)
/*
Output:
{
  _id: "Exit",
  _tag: "Failure",
  cause: {
    _id: "Cause",
    _tag: "Fail",
    failure: "my error"
  }
}
*/
```

## runFork

The `Effect.runFork` function serves as a foundational building block for running effects. In fact, all other run functions are built upon it. Unless you have a specific need for a Promise or a synchronous operation, `Effect.runFork` is the recommended choice. It returns a fiber that you can observe or interrupt as needed.

```ts
import { Effect, Console, Schedule, Fiber } from "effect"

const program = Effect.repeat(
  Console.log("running..."),
  Schedule.spaced("200 millis")
)

const fiber = Effect.runFork(program)

setTimeout(() => {
  Effect.runFork(Fiber.interrupt(fiber))
}, 500)
```

In this example, the `program` continuously logs "running..." with each repetition spaced 200 milliseconds apart. To stop the execution of the program, we use `Fiber.interrupt` on the fiber returned by `Effect.runFork`. This allows you to control the execution flow and terminate it when necessary.

## Cheatsheet

The recommended approach is to design your program with the majority of its logic as Effects. It's advisable to use the `run*` functions closer to the "edge" of your program. This approach allows for greater flexibility in executing your program and building sophisticated Effects.

The table provides a summary of the available `run*` functions, along with their input and output types, allowing you to choose the appropriate function based on your needs.

| **Name**         | **Given**      | **To**                |
| ---------------- | -------------- | --------------------- |
| `runSync`        | `Effect<A, E>` | `A`                   |
| `runSyncExit`    | `Effect<A, E>` | `Exit<A, E>`          |
| `runPromise`     | `Effect<A, E>` | `Promise<A>`          |
| `runPromiseExit` | `Effect<A, E>` | `Promise<Exit<A, E>>` |
| `runFork`        | `Effect<A, E>` | `RuntimeFiber<A, E>`  |

You can find the complete list of `run*` functions at effect-ts.github.io/effect/effect/Effect.ts.html#execution.