# Sandboxing

Errors are a common part of programming, arising from various reasons such as failures, defects, fiber interruptions, or combinations of these factors. This guide explores how to use the `Effect.sandbox` function to isolate and understand the causes of errors in your code.

## sandbox

The `Effect.sandbox` function encapsulates all potential causes of an error in an effect, exposing the full cause of an effect, whether due to a failure, defect, fiber interruption, or a combination of these factors.

### Signature

```ts
sandbox: Effect<A, E, R> -> Effect<A, Cause<E>, R>
```

This function transforms an effect `Effect<A, E, R>` into an effect `Effect<A, Cause<E>, R>`, where the error channel now contains a detailed cause of the error.

Using `Effect.sandbox`, you gain access to the underlying causes of exceptional effects, represented as a type of `Cause<E>`, available in the error channel of the `Effect` data type.

Once the causes are exposed, you can utilize standard error-handling operators like `Effect.catchAll` and `Effect.catchTags` to handle errors more effectively, allowing you to respond to specific error conditions.

### Example

```ts
import { Effect, Console } from "effect"

const effect = Effect.fail("Oh uh!").pipe(Effect.as("primary result"))

const sandboxed = Effect.sandbox(effect)

const program = Effect.catchTags(sandboxed, {
  Die: (cause) =>
    Console.log(`Caught a defect: ${cause.defect}`).pipe(
      Effect.as("fallback result on defect")
    ),
  Interrupt: (cause) =>
    Console.log(`Caught a defect: ${cause.fiberId}`).pipe(
      Effect.as("fallback result on fiber interruption")
    ),
  Fail: (cause) =>
    Console.log(`Caught a defect: ${cause.error}`).pipe(
      Effect.as("fallback result on failure")
    )
})

const main = Effect.unsandbox(program)

Effect.runPromise(main).then(console.log)
/*
Output:
Caught a defect: Oh uh!
fallback result on failure
*/
```

In this example, we expose the full cause of an effect using `Effect.sandbox`, handle specific error conditions with `Effect.catchTags`, and can undo the sandboxing operation with `Effect.unsandbox`.