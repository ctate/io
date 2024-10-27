---
title: Getting Started with Micro
excerpt: "Getting Started with Micro: A Primer for New Users"
---

## Importing Micro

Ensure you have the `effect` library installed in your project:

```bash
npm install effect
```

Import Micro in your TypeScript project:

```ts
import * as Micro from "effect/Micro"
```

## The Micro Type

The `Micro` type uses three type parameters:

```ts
Micro<Success, Error, Requirements>
```

- **Success**: Type of value on success. `void` means no useful information; `never` means it runs forever.
- **Error**: Expected errors during execution. `never` means it cannot fail.
- **Requirements**: Contextual data needed for execution, stored in `Context`. `never` means no requirements.

## The MicroExit Type

The `MicroExit` type captures the outcome of a `Micro` computation:

```ts
type MicroExit<A, E = never> = Either<A, MicroCause<E>>
```

## The MicroCause Type

The `MicroCause` type represents possible causes of failure:

```ts
type MicroCause<E> = Die | Fail<E> | Interrupt
```

| **Failure Type** | **Description**                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `Die`            | Unforeseen defect not planned for in logic.                                                |
| `Fail<E>`        | Anticipated errors recognized and typically handled.                                       |
| `Interrupt`      | Operation that has been purposefully stopped.                                             |

## Tutorial: Wrapping a Promise-based API with Micro

### Step 1: Create a Promise-based API Function

Define a simple Promise-based function to fetch weather data:

```ts
function fetchWeather(city: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city === "London") {
        resolve("Sunny")
      } else {
        reject(new Error("Weather data not found for this location"))
      }
    }, 1_000)
  })
}
```

### Step 2: Wrap the Promise with Micro

Wrap the `fetchWeather` function using Micro:

```ts
import * as Micro from "effect/Micro"

function getWeather(city: string) {
  return Micro.promise(() => fetchWeather(city))
}
```

### Step 3: Running the Micro Effect

Execute the Micro effect and handle results:

```ts
const weatherEffect = getWeather("London")

Micro.runPromise(weatherEffect)
  .then((result) => console.log(`The weather in London is: ${result}`))
  .catch((error) =>
    console.error(`Failed to fetch weather data: ${error.message}`)
  )
```

### Step 4: Adding Error Handling

Handle specific errors using `Micro.tryPromise`:

```ts
class WeatherError {
  readonly _tag = "WeatherError"
  constructor(readonly message: string) {}
}

function getWeather(city: string) {
  return Micro.tryPromise({
    try: () => fetchWeather(city),
    catch: (error) => new WeatherError(String(error))
  })
}
```

## Expected Errors

Expected errors are tracked at the type level by the `Micro` data type in the "Error" channel.

### either

Transform an `Micro<A, E, R>` into an effect encapsulating both potential failure and success:

```ts
const recovered = Micro.gen(function* () {
  const failureOrSuccess = yield* Micro.either(task)
  return Either.match(failureOrSuccess, {
    onLeft: (error) => `Recovering from ${error._tag}`,
    onRight: (value) => `Result is: ${value}`
  })
})
```

### catchAll

Catch any error and provide a fallback:

```ts
const recovered = task.pipe(
  Micro.catchAll((error) => Micro.succeed(`Recovering from ${error._tag}`))
)
```

### catchTag

Catch and handle specific errors using the `_tag` field:

```ts
const recovered = task.pipe(
  Micro.catchTag("ValidationError", (_error) =>
    Micro.succeed("Recovering from ValidationError")
  )
)
```

## Unexpected Errors

Unexpected errors are not tracked at the type level but can be managed using various methods.

### die

```ts
const divide = (a: number, b: number): Micro.Micro<number> =>
  b === 0
    ? Micro.die(new Error("Cannot divide by zero"))
    : Micro.succeed(a / b)
```

### orDie

```ts
const program = Micro.orDie(divide(1, 0))
```

### catchAllDefect

```ts
const program = Micro.catchAllDefect(
  Micro.die("Boom!"),
  (defect) => consoleLog(`Unknown defect caught: ${defect}`)
)
```

## Fallback

### orElseSucceed

Replace the original failure with a success value:

```ts
const program = Micro.orElseSucceed(validate(3), () => 0)
```

## Matching

### match

```ts
const program1 = Micro.match(success, {
  onFailure: (error) => `failure: ${error.message}`,
  onSuccess: (value) => `success: ${value}`
})
```

### matchEffect

```ts
const program1 = Micro.matchEffect(success, {
  onFailure: (error) =>
    Micro.succeed(`failure: ${error.message}`).pipe(Micro.tap(consoleLog)),
  onSuccess: (value) =>
    Micro.succeed(`success: ${value}`).pipe(Micro.tap(consoleLog))
})
```

### matchCause / matchCauseEffect

```ts
const program = Micro.matchCauseEffect(exceptionalEffect, {
  onFailure: (cause) => {
    switch (cause._tag) {
      case "Fail":
        return consoleLog(`Fail: ${cause.error.message}`)
      case "Die":
        return consoleLog(`Die: ${cause.defect}`)
      case "Interrupt":
        return consoleLog("interrupted!")
    }
  },
  onSuccess: (value) => consoleLog(`succeeded with ${value} value`)
})
```

## Retrying

### retry

```ts
const repeated = Micro.retry(effect, { schedule: policy })
```

## Sandboxing

### Micro.sandbox

Encapsulate all potential causes of an error in an effect:

```ts
const sandboxed = Micro.sandbox(effect)
```

## Inspecting Errors

### tapError

Inspect the failure of an effect without altering it:

```ts
const tapping = Micro.tapError(task, (error) =>
  consoleLog(`expected error: ${error}`)
)
```

### tapErrorCause

Inspect the underlying cause of an effect's failure:

```ts
const tapping1 = Micro.tapErrorCause(task1, (cause) =>
  consoleLog(`error cause: ${cause}`)
)
```

### tapDefect

Specifically inspect non-recoverable failures:

```ts
const tapping2 = Micro.tapDefect(task2, (cause) =>
  consoleLog(`defect: ${cause}`)
)
```

## Yieldable Errors

### Error

```ts
class MyError extends Micro.Error<{ message: string }> {}

export const program = Micro.gen(function* () {
  yield* new MyError({ message: "Oh no!" })
})
```

### TaggedError

```ts
class FooError extends Micro.TaggedError("Foo")<{ message: string }> {}
```

## Requirements Management

### Defining a Service

```ts
class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Micro.Micro<number> }
>() {}
```

### Using a Service

```ts
const program = Micro.gen(function* () {
  const random = yield* Micro.service(Random)
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})
```

## Resource Management

### MicroScope

Manage the lifetime of resources:

```ts
const program = Micro.scopeMake.pipe(
  Micro.tap((scope) => scope.addFinalizer(() => consoleLog("finalizer 1"))),
  Micro.andThen((scope) =>
    scope.close(Micro.exitSucceed("scope closed successfully"))
  )
)
```

### Defining Resources

Define a resource using `Micro.acquireRelease(acquire, release)`:

```ts
const resource = Micro.acquireRelease(acquire, release)
```

### acquireUseRelease

Simplifies resource management:

```ts
const program = Micro.acquireUseRelease(acquire, use, release)
```

## Scheduling

### repeat

```ts
const program = Micro.repeat(action, { schedule: policy })
```

### scheduleSpaced

```ts
const policy = Micro.scheduleSpaced(10)
```

### scheduleExponential

```ts
const policy = Micro.scheduleExponential(10)
```

### scheduleUnion

```ts
const policy = Micro.scheduleUnion(
  Micro.scheduleExponential(10),
  Micro.scheduleSpaced(300)
)
```

### scheduleIntersect

```ts
const policy = Micro.scheduleIntersect(
  Micro.scheduleExponential(10),
  Micro.scheduleSpaced(300)
)
```

## Concurrency

### Forking Effects

```ts
const fib10Fiber = Micro.fork(fib(10))
```

### Joining Fibers

```ts
const program = Micro.gen(function* () {
  const fiber = yield* fib10Fiber
  const n = yield* fiber.join
  console.log(n)
})
```

### Awaiting Fibers

```ts
const program = Micro.gen(function* () {
  const exit = yield* fiber.await
  console.log(exit)
})
```

### Interrupting Fibers

```ts
const program = Micro.gen(function* () {
  const fiber = yield* Micro.fork(Micro.forever(Micro.succeed("Hi!")))
  const exit = yield* fiber.interrupt
  console.log(exit)
})
```

### Racing

```ts
const program = Micro.race(task1, task2)
```

### Timing out

**Interruptible Operation**:

```ts
const timedEffect = myEffect.pipe(Micro.timeout(1_000))
```

**Uninterruptible Operation**:

```ts
const timedEffect = myEffect.pipe(Micro.uninterruptible, Micro.timeout(1_000))
```

### Calling Effect.interrupt

```ts
const program = Micro.gen(function* () {
  yield* Micro.interrupt
})
```

### Interruption of Concurrent Effects

```ts
const program = Micro.forEach(
  [1, 2, 3],
  (n) =>
    Micro.gen(function* () {
      yield* Micro.interrupt
    }),
  { concurrency: "unbounded" }
)
```