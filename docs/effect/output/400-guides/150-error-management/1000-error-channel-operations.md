# Error Channel Operations

Explore various operations on the error channel in Effect, including error mapping, both channel mapping, filtering success values, inspecting errors, exposing errors, merging error and success channels, and flipping error and success channels. Learn how to handle errors effectively in your Effect programming.

In Effect you can perform various operations on the error channel of effects. These operations allow you to transform, inspect, and handle errors in different ways. Let's explore some of these operations.

## Map Operations

### mapError

The `Effect.mapError` function is used when you need to transform or modify an error produced by an effect, without affecting the success value. This can be helpful when you want to add extra information to the error or change its type.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))

const mapped = Effect.mapError(simulatedTask, (message) => new Error(message))
```

The type in the error channel of our program changes from `string` to `Error`.

It's important to note that using the `Effect.mapError` function does not change the overall success or failure of the effect. If the mapped effect is successful, then the mapping function is ignored. The `Effect.mapError` operation only applies the transformation to the error channel of the effect, while leaving the success channel unchanged.

### mapBoth

The `Effect.mapBoth` function allows you to apply transformations to both channels: the error channel and the success channel of an effect. It takes two map functions as arguments: one for the error channel and the other for the success channel.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))

const modified = Effect.mapBoth(simulatedTask, {
  onFailure: (message) => new Error(message),
  onSuccess: (n) => n > 0
})
```

After using `mapBoth`, the type of our program changes from `Effect<number, string>` to `Effect<boolean, Error>`.

It's important to note that using the `mapBoth` function does not change the overall success or failure of the effect. It only transforms the values in the error and success channels while preserving the effect's original success or failure status.

## Filtering the Success Channel

The Effect library provides several operators to filter values on the success channel based on a given predicate. These operators offer different strategies for handling cases where the predicate fails.

| Function                                         | Description                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Effect.filterOrFail`                            | Filters the values on the success channel based on a predicate. If the predicate fails for any value, the original effect fails with an error.                                                                                              |
| `Effect.filterOrDie` and `Effect.filterOrDieMessage` | Filters the values on the success channel based on a predicate. If the predicate fails for any value, the original effect terminates abruptly. The `filterOrDieMessage` variant allows you to provide a custom error message.                 |
| `Effect.filterOrElse`                            | Filters the values on the success channel based on a predicate. If the predicate fails for any value, an alternative effect is executed instead.                                                                                              |

Example demonstrating these filtering operators:

```ts
import { Effect, Random, Cause } from "effect"

const task1 = Effect.filterOrFail(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => "random number is negative"
)

const task2 = Effect.filterOrDie(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => new Cause.IllegalArgumentException("random number is negative")
)

const task3 = Effect.filterOrDieMessage(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  "random number is negative"
)

const task4 = Effect.filterOrElse(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => task3
)
```

Depending on the specific filtering operator used, the effect can either fail, terminate abruptly, or execute an alternative effect when the predicate fails. Choose the appropriate operator based on your desired error handling strategy and program logic.

You can further refine the type of the success channel by providing a user-defined type guard to the `filterOr*` APIs, enhancing type safety and improving code clarity.

Example:

```ts
import { Effect, pipe } from "effect"

// Define a user interface
interface User {
  readonly name: string
}

// Assume an asynchronous authentication function
declare const auth: () => Promise<User | null>

const program = pipe(
  Effect.promise(() => auth()),
  Effect.filterOrFail(
    (user): user is User => user !== null,
    () => new Error("Unauthorized")
  ),
  Effect.andThen((user) => user.name) // The 'user' here has type `User`, not `User | null`
)
```

If preferred, you can utilize a pre-made guard like Predicate.isNotNull for simplicity and consistency.

## Inspecting Errors

Effect provides several operators for inspecting error values. These operators allow developers to observe failures or underlying issues without modifying the outcome:

| Function        | Description                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `tapError`      | Executes an effectful operation to inspect the failure of an effect without altering it.                                                   |
| `tapErrorTag`   | Specifically inspects a failure with a particular tag, allowing focused error handling.                                                    |
| `tapErrorCause` | Inspects the underlying cause of an effect's failure.                                                                                      |
| `tapDefect`     | Specifically inspects non-recoverable failures or defects in an effect.                                                                    |
| `tapBoth`       | Inspects both success and failure outcomes of an effect, performing different actions based on the result.                                 |

Utilizing these error inspection tools does not alter the outcome or type of the effect.

### tapError

Executes an effectful operation to inspect the failure of an effect without altering it.

```ts
import { Effect, Console } from "effect"

const task: Effect.Effect<number, string> = Effect.fail("NetworkError")

const tapping = Effect.tapError(task, (error) =>
  Console.log(`expected error: ${error}`)
)

Effect.runFork(tapping)
/*
Output:
expected error: NetworkError
*/
```

### tapErrorTag

Specifically inspects a failure with a particular tag, allowing focused error handling.

```ts
import { Effect, Console } from "effect"

class NetworkError {
  readonly _tag = "NetworkError"
  constructor(readonly statusCode: number) {}
}

class ValidationError {
  readonly _tag = "ValidationError"
  constructor(readonly field: string) {}
}

const task: Effect.Effect<number, NetworkError | ValidationError> =
  Effect.fail(new NetworkError(504))

const tapping = Effect.tapErrorTag(task, "NetworkError", (error) =>
  Console.log(`expected error: ${error.statusCode}`)
)

Effect.runFork(tapping)
/*
Output:
expected error: 504
*/
```

### tapErrorCause

Inspects the underlying cause of an effect's failure.

```ts
import { Effect, Console } from "effect"

const task1: Effect.Effect<number, string> = Effect.fail("NetworkError")

const tapping1 = Effect.tapErrorCause(task1, (cause) =>
  Console.log(`error cause: ${cause}`)
)

Effect.runFork(tapping1)
/*
Output:
error cause: Error: NetworkError
*/

const task2: Effect.Effect<number, string> = Effect.dieMessage(
  "Something went wrong"
)

const tapping2 = Effect.tapErrorCause(task2, (cause) =>
  Console.log(`error cause: ${cause}`)
)

Effect.runFork(tapping2)
/*
Output:
error cause: RuntimeException: Something went wrong
  ... stack trace ...
*/
```

### tapDefect

Specifically inspects non-recoverable failures or defects in an effect.

```ts
import { Effect, Console } from "effect"

const task1: Effect.Effect<number, string> = Effect.fail("NetworkError")

const tapping1 = Effect.tapDefect(task1, (cause) =>
  Console.log(`defect: ${cause}`)
)

Effect.runFork(tapping1)
/*
No Output
*/

const task2: Effect.Effect<number, string> = Effect.dieMessage(
  "Something went wrong"
)

const tapping2 = Effect.tapDefect(task2, (cause) =>
  Console.log(`defect: ${cause}`)
)

Effect.runFork(tapping2)
/*
Output:
defect: RuntimeException: Something went wrong
  ... stack trace ...
*/
```

### tapBoth

Inspects both success and failure outcomes of an effect.

```ts
import { Effect, Random, Console } from "effect"

const task = Effect.filterOrFail(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => "random number is negative"
)

const tapping = Effect.tapBoth(task, {
  onFailure: (error) => Console.log(`failure: ${error}`),
  onSuccess: (randomNumber) => Console.log(`random number: ${randomNumber}`)
})

Effect.runFork(tapping)
/*
Example Output:
failure: random number is negative
*/
```

## Exposing Errors in The Success Channel

You can use the `Effect.either` function to convert an `Effect<A, E, R>` into another effect where both its failure (`E`) and success (`A`) channels have been lifted into an Either<A, E> data type:

```ts
Effect<A, E, R> -> Effect<Either<A, E>, never, R>
```

The resulting effect is an unexceptional effect, meaning it cannot fail, because the failure case has been exposed as part of the `Either` left case. Therefore, the error parameter of the returned Effect is `never`, as it is guaranteed that the effect does not model failure.

Example using Effect.gen:

```ts
import { Effect, Either, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(simulatedTask)
  if (Either.isLeft(failureOrSuccess)) {
    const error = failureOrSuccess.left
    yield* Console.log(`failure: ${error}`)
    return 0
  } else {
    const value = failureOrSuccess.right
    yield* Console.log(`success: ${value}`)
    return value
  }
})
```

Example using pipe:

```ts
import { Effect, Either, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.either(simulatedTask).pipe(
  Effect.andThen((failureOrSuccess) =>
    Either.match(failureOrSuccess, {
      onLeft: (error) => Console.log(`failure: ${error}`).pipe(Effect.as(0)),
      onRight: (value) =>
        Console.log(`success: ${value}`).pipe(Effect.as(value))
    })
  )
)
```

## Exposing the Cause in The Success Channel

You can use the `Effect.cause` function to expose the cause of an effect, which is a more detailed representation of failures, including error messages and defects.

Example using Effect.gen:

```ts
import { Effect, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const cause = yield* Effect.cause(simulatedTask)
  yield* Console.log(cause)
})
```

Example using pipe:

```ts
import { Effect, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.cause(simulatedTask).pipe(
  Effect.andThen((cause) => Console.log(cause))
)
```

## Merging the Error Channel into the Success Channel

Using the `Effect.merge` function, you can merge the error channel into the success channel, creating an effect that always succeeds with the merged value.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const merged = Effect.merge(simulatedTask)
```

## Flipping Error and Success Channels

Using the `Effect.flip` function, you can flip the error and success channels of an effect, effectively swapping their roles.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const flipped = Effect.flip(simulatedTask)
```