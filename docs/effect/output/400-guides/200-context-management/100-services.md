# Managing Services

In the context of programming, a **service** refers to a reusable component or functionality that can be used by different parts of an application. Services are designed to provide specific capabilities and can be shared across multiple modules or components. They often encapsulate common tasks or operations needed by different parts of an application, handling complex operations, interacting with external systems or APIs, managing data, or performing other specialized tasks.

Services are typically designed to be modular and decoupled from the rest of the application, allowing for easy maintenance, testing, and replacement without affecting overall functionality.

## Overview

When integrating services in application development, it is essential to manage function dependencies effectively. Manually passing services to every function can become cumbersome as the application grows. Instead, consider using an environment object that bundles various services:

```ts
type Context = {
  databaseService: DatabaseService
  loggingService: LoggingService
}

const processData = (data: Data, context: Context) => {
  // Using multiple services from the context
}
```

However, this can lead to tightly coupled code. The Effect library simplifies managing dependencies by leveraging the type system. You can declare service dependencies directly in the function's type signature using the `Requirements` parameter in the `Effect<Success, Error, Requirements>` type.

- **Dependency Declaration**: Specify what services a function needs directly in its type.
- **Service Provision**: Use `Effect.provideService` to make a service implementation available to the functions that need it.

This method abstracts manual handling of services and dependencies, allowing developers to focus on business logic while the compiler manages dependencies.

### Creating a Service

To create a service, you need a unique identifier and a type describing the possible operations of the service. For example, to create a service for generating random numbers:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}
```

The exported `Random` value acts as a **tag** in Effect, allowing it to locate and use this service at runtime. The service is stored in a `Context`, functioning like a `Map` where keys are tags and values are services.

### Using the Service

To use the service, you can build a simple program:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

const program = Effect.gen(function* () {
  const random = yield* Random
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})
```

The type of the `program` variable includes `Random` in the `Requirements` type parameter: `Effect<void, never, Random>`. This indicates that the program requires the `Random` service to execute successfully.

### Providing a Service Implementation

To provide an implementation of the `Random` service, use the `Effect.provideService` function:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

const program = Effect.gen(function* () {
  const random = yield* Random
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})

const runnable = Effect.provideService(program, Random, {
  next: Effect.sync(() => Math.random())
})

Effect.runPromise(runnable)
```

### Extracting the Service Type

To retrieve the service type from a tag, use the `Context.Tag.Service` utility type:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

type RandomShape = Context.Tag.Service<Random>
```

## Using Multiple Services

When using more than one service, the process is similar. For example, if you need both `Random` and `Logger` services:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

class Logger extends Context.Tag("MyLoggerService")<
  Logger,
  { readonly log: (message: string) => Effect.Effect<void> }
>() {}

const program = Effect.gen(function* () {
  const random = yield* Random
  const logger = yield* Logger
  const randomNumber = yield* random.next
  return yield* logger.log(String(randomNumber))
})
```

To execute the program, provide implementations for both services:

```ts
const runnable1 = program.pipe(
  Effect.provideService(Random, {
    next: Effect.sync(() => Math.random())
  }),
  Effect.provideService(Logger, {
    log: (message) => Effect.sync(() => console.log(message))
  })
)
```

Alternatively, combine service implementations into a single `Context` and provide the entire context:

```ts
const context = Context.empty().pipe(
  Context.add(Random, { next: Effect.sync(() => Math.random()) }),
  Context.add(Logger, {
    log: (message) => Effect.sync(() => console.log(message))
  })
)

const runnable2 = Effect.provide(program, context)
```

## Optional Services

To access a service implementation only if it is available, use the `Effect.serviceOption` function. This function returns an implementation that is available only if it is provided before executing the effect.

Example:

```ts
import { Effect, Context, Option } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

const program = Effect.gen(function* () {
  const maybeRandom = yield* Effect.serviceOption(Random)
  const randomNumber = Option.isNone(maybeRandom)
    ? -1
    : yield* maybeRandom.value.next
  console.log(randomNumber)
})
```

If the `Random` service is not provided, the output will be `-1`. If it is provided, it will log a random number generated by the `next` operation of the `Random` service.