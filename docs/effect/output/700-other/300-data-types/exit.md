# Exit

An `Exit<A, E>` describes the result of executing an `Effect` workflow.

There are two possible values for an `Exit<A, E>`:

- `Exit.Success` contains a success value of type `A`.
- `Exit.Failure` contains a failure Cause of type `E`.

## Matching

To handle the different outcomes of an `Exit`, we can use the `Exit.match` function:

```ts
import { Effect, Exit } from "effect"

const simulatedSuccess = Effect.runSyncExit(Effect.succeed(1))

Exit.match(simulatedSuccess, {
  onFailure: (cause) =>
    console.error(`Exited with failure state: ${cause._tag}`),
  onSuccess: (value) => console.log(`Exited with success value: ${value}`)
})
// Output: "Exited with success value: 1"

const simulatedFailure = Effect.runSyncExit(Effect.fail("error"))

Exit.match(simulatedFailure, {
  onFailure: (cause) =>
    console.error(`Exited with failure state: ${cause._tag}`),
  onSuccess: (value) => console.log(`Exited with success value: ${value}`)
})
// Output: "Exited with failure state: Fail"
```

In this example, we first simulate a successful `Effect` execution using `Effect.runSyncExit` and `Effect.succeed`. We then handle the `Exit` using `Exit.match`, where the `onSuccess` callback prints the success value.

Next, we simulate a failure using `Effect.runSyncExit` and `Effect.fail`, and handle the `Exit` again using `Exit.match`, where the `onFailure` callback prints the failure state.

## Exit vs Either

An `Exit<A, E>` is conceptually an `Either<A, Cause<E>>`. However, it's important to note that Cause encompasses more states than just the expected error type `E`. It also includes other states such as interruption and defects (unexpected errors), as well as the possibility of combining multiple Cause values together.

## Exit vs Effect

The `Exit` data type is a subtype of the `Effect` type, which means that an `Exit` is itself an `Effect`. The reason for this is that a result can be considered as a constant computation. Technically, `Effect.succeed` is an alias for `Exit.succeed`, and `Effect.fail` is an alias for `Exit.fail` (avoiding conversions between `Exit` and `Effect` is important for performance, as boxing and unboxing have a cost).