# Unexpected Errors

Learn how Effect handles unrecoverable errors, such as defects, providing functions like `die`, `dieMessage`, `orDie`, and `orDieWith`. Explore techniques to terminate effect execution, handle unexpected errors, and recover from defects. Discover the use of `catchAllDefect` and `catchSomeDefect` to manage and selectively recover from specific defects.

There are situations where you may encounter unexpected errors, and you need to decide how to handle them. Effect provides functions to help you deal with such scenarios, allowing you to take appropriate actions when errors occur during the execution of your effects.

## Creating Unrecoverable Errors

Creating defects is a common necessity when dealing with errors from which it is not possible to recover from a business logic perspective, such as attempting to establish a connection that is refused after multiple retries. In those cases, terminating the execution of the effect and moving into reporting, through an output such as stdout or some external monitoring service, might be the best solution.

The following functions and combinators allow for termination of the effect and are often used to convert values of type `Effect<A, E, R>` into values of type `Effect<A, never, R>` allowing the programmer an escape hatch from having to handle and recover from errors for which there is no sensible way to recover.

### die / dieMessage

The `Effect.die` function returns an effect that throws a specified error, while `Effect.dieMessage` throws a `RuntimeException` with a specified text message. These functions are useful for terminating a fiber when a defect, a critical and unexpected error, is detected in the code.

Example using `die`:

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number> =>
  b === 0
    ? Effect.die(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

Effect.runSync(divide(1, 0)) // throws Error: Cannot divide by zero
```

Example using `dieMessage`:

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number> =>
  b === 0 ? Effect.dieMessage("Cannot divide by zero") : Effect.succeed(a / b)

Effect.runSync(divide(1, 0)) // throws RuntimeException: Cannot divide by zero
```

### orDie

The `Effect.orDie` function transforms an effect's failure into a termination of the fiber, making all failures unchecked and not part of the type of the effect. It can be used to handle errors that you do not wish to recover from.

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const program = Effect.orDie(divide(1, 0))

Effect.runSync(program) // throws Error: Cannot divide by zero
```

### orDieWith

Similar to `Effect.orDie`, the `Effect.orDieWith` function transforms an effect's failure into a termination of the fiber using a specified mapping function. It allows you to customize the error message before terminating the fiber.

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const program = Effect.orDieWith(
  divide(1, 0),
  (error) => new Error(`defect: ${error.message}`)
)

Effect.runSync(program) // throws Error: defect: Cannot divide by zero
```

## Catching

Effect provides two functions that allow you to handle unexpected errors that may occur during the execution of your effects.

**Warning**: There is no sensible way to recover from defects. The functions we're about to discuss should be used only at the boundary between Effect and an external system, to transmit information on a defect for diagnostic or explanatory purposes.

### exit

The `Effect.exit` function transforms an `Effect<A, E, R>` into an effect that encapsulates both potential failure and success within an Exit data type:

```ts
Effect<A, E, R> -> Effect<Exit<A, E>, never, R>
```

The resulting effect cannot fail because the potential failure is now represented within the `Exit`'s `Failure` type. The error type of the returned `Effect` is specified as `never`, confirming that the effect is structured to not fail.

```ts
import { Effect, Cause, Console, Exit } from "effect"

// Simulating a runtime error
const task = Effect.dieMessage("Boom!")

const program = Effect.gen(function* () {
  const exit = yield* Effect.exit(task)
  if (Exit.isFailure(exit)) {
    const cause = exit.cause
    if (Cause.isDieType(cause) && Cause.isRuntimeException(cause.defect)) {
      yield* Console.log(
        `RuntimeException defect caught: ${cause.defect.message}`
      )
    } else {
      yield* Console.log("Unknown defect caught.")
    }
  }
})

Effect.runPromiseExit(program).then(console.log)
```

### catchAllDefect

The `Effect.catchAllDefect` function allows you to recover from all defects using a provided function.

```ts
import { Effect, Cause, Console } from "effect"

// Simulating a runtime error
const task = Effect.dieMessage("Boom!")

const program = Effect.catchAllDefect(task, (defect) => {
  if (Cause.isRuntimeException(defect)) {
    return Console.log(`RuntimeException defect caught: ${defect.message}`)
  }
  return Console.log("Unknown defect caught.")
})

Effect.runPromiseExit(program).then(console.log)
```

It's important to understand that `catchAllDefect` can only handle defects, not expected errors (such as those caused by `Effect.fail`) or interruptions in execution (such as when using `Effect.interrupt`).

### catchSomeDefect

The `Effect.catchSomeDefect` function in Effect allows you to recover from specific defects using a provided partial function.

```ts
import { Effect, Cause, Option, Console } from "effect"

// Simulating a runtime error
const task = Effect.dieMessage("Boom!")

const program = Effect.catchSomeDefect(task, (defect) => {
  if (Cause.isIllegalArgumentException(defect)) {
    return Option.some(
      Console.log(
        `Caught an IllegalArgumentException defect: ${defect.message}`
      )
    )
  }
  return Option.none()
})

Effect.runPromiseExit(program).then(console.log)
```

It's important to understand that `catchSomeDefect` can only handle defects, not expected errors or interruptions in execution.