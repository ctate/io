---
title: Cause
excerpt: Explore the `Cause` data type in the `Effect` type, which stores comprehensive information about failures, including unexpected errors, stack traces, and fiber interruption causes. Learn how `Cause` ensures no failure information is lost, providing a complete story for precise error analysis and handling in your codebase. Discover various causes such as Empty, Fail, Die, Interrupt, Sequential, and Parallel, each representing different error scenarios within the `Effect` workflow.
---

The `Effect<A, E, R>` type is polymorphic in values of type `E`, allowing the use of any error type. However, additional failure information is not captured by the `E` value alone.

To provide comprehensive failure information, Effect uses the `Cause<E>` data type, which stores:

- Unexpected errors or defects
- Stack and execution traces
- Causes of fiber interruptions

Effect captures and stores the complete story of failure in the `Cause` data type, ensuring no information is lost, allowing precise determination of what happened during execution.

Although direct interaction with `Cause` values is uncommon, it represents errors within an Effect workflow, providing access to all concurrent and sequential errors for comprehensive failure analysis and handling.

## Creating Causes

To create effects with specific causes, use the `Effect.failCause` constructor:

```ts
import { Effect, Cause } from "effect"

// Create an effect that intentionally fails with an empty cause
const effect = Effect.failCause(Cause.empty)
```

To uncover the underlying cause of an effect, use the `Effect.cause` function:

```ts
Effect.cause(effect).pipe(
  Effect.andThen((cause) => ...)
)
```

## Cause Variations

### Empty

Represents a lack of errors.

### Fail

Represents a `Cause` that failed with an expected error of type `E`.

### Die

Represents a `Cause` that failed due to an unexpected error.

### Interrupt

Represents failure due to `Fiber` interruption, containing the `FiberId` of the interrupted `Fiber`.

### Sequential

Represents the composition of two causes that occurred sequentially.

### Parallel

Represents the composition of two causes that occurred in parallel.

## Guards

To identify the type of a `Cause`, use specific guards from the `Cause` module:

- `Cause.isEmpty`
- `Cause.isFailType`
- `Cause.isDie`
- `Cause.isInterruptType`
- `Cause.isSequentialType`
- `Cause.isParallelType`

Example of using guards:

```ts
import { Cause } from "effect"

const cause = Cause.fail(new Error("my message"))

if (Cause.isFailType(cause)) {
  console.log(cause.error.message) // Output: my message
}
```

## Pattern Matching

Handle different cases of a `Cause` using the `Cause.match` function:

```ts
import { Cause } from "effect"

const cause = Cause.parallel(
  Cause.fail(new Error("my fail message")),
  Cause.die("my die message")
)

console.log(
  Cause.match(cause, {
    onEmpty: "(empty)",
    onFail: (error) => `(error: ${error.message})`,
    onDie: (defect) => `(defect: ${defect})`,
    onInterrupt: (fiberId) => `(fiberId: ${fiberId})`,
    onSequential: (left, right) =>
      `(onSequential (left: ${left}) (right: ${right}))`,
    onParallel: (left, right) =>
      `(onParallel (left: ${left}) (right: ${right})`
  })
)
/*
Output:
(onParallel (left: (error: my fail message)) (right: (defect: my die message))
*/
```

## Pretty Printing

Use the `Cause.pretty` function for clear and readable error messages:

```ts
import { Cause, FiberId } from "effect"

console.log(Cause.pretty(Cause.empty)) // All fibers interrupted without errors.
console.log(Cause.pretty(Cause.fail(new Error("my fail message")))) // Error: my fail message
console.log(Cause.pretty(Cause.die("my die message"))) // Error: my die message
console.log(Cause.pretty(Cause.interrupt(FiberId.make(1, 0)))) // All fibers interrupted without errors.
console.log(
  Cause.pretty(Cause.sequential(Cause.fail("fail1"), Cause.fail("fail2")))
)
/*
Output:
Error: fail1
Error: fail2
*/
```

## Retrieval of Failures and Defects

To obtain collections of failures or defects from a `Cause`, use `Cause.failures` and `Cause.defects` functions:

```ts
import { Cause } from "effect"

const cause = Cause.parallel(
  Cause.fail(new Error("my fail message 1")),
  Cause.sequential(
    Cause.die("my die message"),
    Cause.fail(new Error("my fail message 2"))
  )
)

console.log(Cause.failures(cause))
/*
Output:
{
  _id: 'Chunk',
  values: [
    Error: my fail message 1 ...,
    Error: my fail message 2 ...
  ]
}
*/

console.log(Cause.defects(cause))
/*
Output:
{ _id: 'Chunk', values: [ 'my die message' ] }
*/