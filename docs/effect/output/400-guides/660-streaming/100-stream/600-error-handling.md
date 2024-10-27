---
title: Error Handling in Streams
navTitle: Error Handling
excerpt: Effectively handle errors in streams using functions like `orElse` for seamless recovery, `catchAll` for advanced error handling, and `retry` to handle temporary failures. Learn to refine errors, set timeouts with various operators, and gracefully recover from defects, ensuring robust stream processing in your applications.
bottomNavigation: pagination
---

## Recovering from Failure

When working with streams that may encounter errors, it's crucial to handle these errors gracefully. The `Stream.orElse` function is a powerful tool for recovering from failures and switching to an alternative stream in case of an error.

Example:

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.orElse(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

The `Stream.orElseEither` variant uses the Either data type to distinguish elements from the two streams based on success or failure:

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.orElseEither(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [
    {
      _id: "Either",
      _tag: "Left",
      left: 1
    }, {
      _id: "Either",
      _tag: "Left",
      left: 2
    }, {
      _id: "Either",
      _tag: "Left",
      left: 3
    }, {
      _id: "Either",
      _tag: "Right",
      right: "a"
    }, {
      _id: "Either",
      _tag: "Right",
      right: "b"
    }, {
      _id: "Either",
      _tag: "Right",
      right: "c"
    }
  ]
}
*/
```

The `Stream.catchAll` function provides advanced error handling capabilities compared to `Stream.orElse`. With `Stream.catchAll`, you can make decisions based on both the type and value of the encountered failure.

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Uh Oh!" as const)),
  Stream.concat(Stream.make(4, 5)),
  Stream.concat(Stream.fail("Ouch" as const))
)

const s2 = Stream.make("a", "b", "c")

const s3 = Stream.make(true, false, false)

const stream = Stream.catchAll(
  s1,
  (error): Stream.Stream<string | boolean> => {
    switch (error) {
      case "Uh Oh!":
        return s2
      case "Ouch":
        return s3
    }
  }
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

## Recovering from Defects

To handle defects during stream processing, use the `Stream.catchAllCause` function. It enables graceful recovery from any type of failure.

Example:

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.dieMessage("Boom!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.catchAllCause(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

## Recovery from Some Errors

Use `Stream.catchSome` and `Stream.catchSomeCause` to recover from specific types of failures.

Example with `Stream.catchSome`:

```ts
import { Stream, Effect, Option } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.catchSome(s1, (error) => {
  if (error === "Oh! Error!") {
    return Option.some(s2)
  }
  return Option.none()
})

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

Example with `Stream.catchSomeCause`:

```ts
import { Stream, Effect, Option, Cause } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.dieMessage("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.catchSomeCause(s1, (cause) => {
  if (Cause.isDie(cause)) {
    return Option.some(s2)
  }
  return Option.none()
})

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

## Recovering to Effect

Use `Stream.onError` to handle errors gracefully and perform cleanup tasks when needed.

```ts
import { Stream, Console, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.dieMessage("Oh! Boom!")),
  Stream.concat(Stream.make(4, 5)),
  Stream.onError(() =>
    Console.log(
      "Stream application closed! We are doing some cleanup jobs."
    ).pipe(Effect.orDie)
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
Stream application closed! We are doing some cleanup jobs.
error: RuntimeException: Oh! Boom!
*/
```

## Retry a Failing Stream

Use the `Stream.retry` operator to handle temporary or recoverable failures.

Example:

```ts
import { Stream, Effect, Schedule } from "effect"
import * as NodeReadLine from "node:readline"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(
    Stream.fromEffect(
      Effect.gen(function* () {
        const s = yield* readLine("Enter a number: ")
        const n = parseInt(s)
        if (Number.isNaN(n)) {
          return yield* Effect.fail("NaN")
        }
        return n
      })
    ).pipe(Stream.retry(Schedule.exponential("1 second")))
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
Enter a number: a
Enter a number: b
Enter a number: c
Enter a number: 4
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4 ]
}
*/

const readLine = (message: string): Effect.Effect<string> =>
  Effect.promise(
    () =>
      new Promise((resolve) => {
        const rl = NodeReadLine.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        rl.question(message, (answer) => {
          rl.close()
          resolve(answer)
        })
      })
  )
```

## Refining Errors

Use `Stream.refineOrDie` to selectively keep certain errors and terminate the stream with the remaining errors.

Example:

```ts
import { Stream, Option } from "effect"

const stream = Stream.fail(new Error())

const res = Stream.refineOrDie(stream, (error) => {
  if (error instanceof SyntaxError) {
    return Option.some(error)
  }
  return Option.none()
})
```

## Timing Out

Manage timeouts using various operators.

### timeout

The `Stream.timeout` operator sets a timeout on a stream. If the stream does not produce a value within the specified duration, it terminates.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeout("2 seconds")
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
{
  _id: "Chunk",
  values: []
}
*/
```

### timeoutFail

The `Stream.timeoutFail` operator combines a timeout with a custom failure message.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeoutFail(() => "timeout", "2 seconds")
)

Effect.runPromiseExit(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'timeout' }
}
*/
```

### timeoutFailCause

Similar to `Stream.timeoutFail`, `Stream.timeoutFailCause` combines a timeout with a custom failure cause.

```ts
import { Stream, Effect, Cause } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeoutFailCause(() => Cause.die("timeout"), "2 seconds")
)

Effect.runPromiseExit(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Die', defect: 'timeout' }
}
*/
```

### timeoutTo

The `Stream.timeoutTo` operator allows you to switch to another stream if the first stream does not produce a value within the specified duration.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeoutTo("2 seconds", Stream.make(1, 2, 3))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
{
  _id: "Chunk",
  values: [ 1, 2, 3 ]
}
*/
```