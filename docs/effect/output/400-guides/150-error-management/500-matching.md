# Matching

Discover how to handle both success and failure cases in the Effect data type using functions like `match` and `matchEffect`. Learn techniques to perform side effects, ignore values, and access the full cause of failures. Effectively manage control flow and handle errors in your Effect programs.

In the `Effect` data type, we have a `match` function that allows us to handle different cases simultaneously. When working with effects, we also have several functions that enable us to handle both success and failure scenarios.

## match

The `Effect.match` function allows us to handle both success and failure cases in a non-effectful manner by providing a handler for each case:

```ts
import { Effect } from "effect"

const success: Effect.Effect<number, Error> = Effect.succeed(42)
const failure: Effect.Effect<number, Error> = Effect.fail(new Error("Uh oh!"))

const program1 = Effect.match(success, {
  onFailure: (error) => `failure: ${error.message}`,
  onSuccess: (value) => `success: ${value}`
})

Effect.runPromise(program1).then(console.log) // Output: "success: 42"

const program2 = Effect.match(failure, {
  onFailure: (error) => `failure: ${error.message}`,
  onSuccess: (value) => `success: ${value}`
})

Effect.runPromise(program2).then(console.log) // Output: "failure: Uh oh!"
```

We can also choose to ignore the success and failure values if we're not interested in them:

```ts
import { Effect } from "effect"
import { constVoid } from "effect/Function"

const task = Effect.fail("Uh oh!").pipe(Effect.as(5))

const program = Effect.match(task, {
  onFailure: constVoid,
  onSuccess: constVoid
})
```

In this case, we use the `constVoid` function from the `Function` module, which constantly returns `void`, to provide handlers that perform no operation. This effectively discards the success and failure values and focuses solely on the control flow or side effects of the program. Alternatively, we can achieve the same result using the `Effect.ignore` function:

```ts
import { Effect } from "effect"

const task = Effect.fail("Uh oh!").pipe(Effect.as(5))

const program = Effect.ignore(task)
```

## matchEffect

In addition to `Effect.match`, we have the `Effect.matchEffect` function, which allows us to handle success and failure cases while performing additional side effects. Here's an example:

```ts
import { Effect } from "effect"

const success: Effect.Effect<number, Error> = Effect.succeed(42)
const failure: Effect.Effect<number, Error> = Effect.fail(new Error("Uh oh!"))

const program1 = Effect.matchEffect(success, {
  onFailure: (error) =>
    Effect.succeed(`failure: ${error.message}`).pipe(Effect.tap(Effect.log)),
  onSuccess: (value) =>
    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))
})

console.log(Effect.runSync(program1))
/*
Output:
... message="success: 42"
success: 42
*/

const program2 = Effect.matchEffect(failure, {
  onFailure: (error) =>
    Effect.succeed(`failure: ${error.message}`).pipe(Effect.tap(Effect.log)),
  onSuccess: (value) =>
    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))
})

console.log(Effect.runSync(program2))
/*
Output:
... message="failure: Uh oh!"
failure: Uh oh!
*/
```

In this example, we use `Effect.matchEffect` instead of `Effect.match`. The `Effect.matchEffect` function allows us to perform additional side effects while handling success and failure cases. We can log messages or perform other side effects within the respective handlers.

## matchCause / matchCauseEffect

Effect also provides `Effect.matchCause` and `Effect.matchCauseEffect` functions, which are useful for accessing the full cause of the underlying fiber in case of failure. This allows us to handle different failure causes separately and take appropriate actions. Here's an example:

```ts
import { Effect, Console } from "effect"

declare const exceptionalEffect: Effect.Effect<void, Error>

const program = Effect.matchCauseEffect(exceptionalEffect, {
  onFailure: (cause) => {
    switch (cause._tag) {
      case "Fail":
        return Console.log(`Fail: ${cause.error.message}`)
      case "Die":
        return Console.log(`Die: ${cause.defect}`)
      case "Interrupt":
        return Console.log(`${cause.fiberId} interrupted!`)
    }
    return Console.log("failed due to other causes")
  },
  onSuccess: (value) => Console.log(`succeeded with ${value} value`)
})
```