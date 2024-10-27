# Glossary

Explore key concepts in Effect, such as context, dual APIs, distributed workflows, expected errors, fibers, interruption, local workflows, effect pipelines, schedules, services, tags, and unexpected errors. Understand their significance in managing dependencies, controlling concurrency, and handling errors within effectful computations.

## Context

In Effect, context refers to a container that holds important contextual data required for the execution of effects. It enables effects to access and utilize contextual data within their execution scope. Context is conceptualized as a Map<Tag, Impl> that associates Tags with their corresponding implementations. It plays a vital role in managing dependencies and facilitating the composition of effects in a modular manner.

## Dual (API)

"Dual" refers to a function that supports both "data-first" and "data-last" variants. An example is the `andThen` function of the Effect data type.

In the "data-first" variant:

```ts
import { Effect } from "effect"

Effect.andThen(Effect.succeed(1), (n) => n + 1)
```

In the "data-last" variant:

```ts
import { Effect, pipe } from "effect"

pipe(
  Effect.succeed(1),
  Effect.andThen((n) => n + 1)
)

// or

Effect.succeed(1).pipe(Effect.andThen((n) => n + 1))
```

## Distributed Workflow

Refers to tasks that may execute across multiple execution boundaries.

## Expected Errors

Also known as failures, typed errors, or recoverable errors. These are errors that developers anticipate as part of normal program execution, tracked at the type level by the Effect data type in the "Error" channel:

```ts
Effect<Value, Error, Context>
```

## Fiber

A fiber is a small unit of work or a lightweight thread of execution, representing a specific computation or effectful operation. Fibers manage concurrency and asynchronous tasks, allowing for efficient multitasking and responsiveness. An Effect is a higher-level concept describing an effectful computation, while a fiber represents the running execution of an Effect.

## Interruption

Interruption errors occur when the execution of a running fiber is deliberately interrupted.

## Local Workflow

Refers to tasks that execute within a single execution boundary.

## Pipeline (of Effects)

A pipeline refers to a series of sequential operations performed on Effect values to achieve a desired result. It typically consists of operations such as mapping, flat-mapping, filtering, and error handling.

## Schedule

A Schedule is an immutable value that defines a strategy for repeating or retrying an effectful operation. Schedules can be composed to create complex recurrence patterns.

## Service

A Service is an interface that defines a set of operations or functionality, encapsulating specific capabilities that can be utilized by effects. Services enhance the capabilities of effects and enable interaction with external systems or shared resources. Services are associated with Tags for locating implementations at runtime.

## Tag

In Effect, a Tag is a unique marker representing a specific value in a Context, used to identify something in a type-safe manner. Tags serve as keys that allow Effect to locate and use the corresponding service implementation at runtime.

## Unexpected Errors

Also known as defects, untyped errors, or unrecoverable errors. These are errors that occur unexpectedly and are not part of the intended program flow.