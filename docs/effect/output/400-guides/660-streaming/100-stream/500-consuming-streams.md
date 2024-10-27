---
title: Consuming Streams
excerpt: Consume streams effectively using methods like `runCollect` to gather elements into a single `Chunk`, `runForEach` to process elements with a callback, `fold` for performing operations, and `Sink` for specialized consumption. Learn key techniques for working with streams in your applications.
---

When working with streams, it's essential to understand how to consume the data they produce. This guide covers several common methods for consuming streams.

## Using runCollect

To gather all the elements from a stream into a single `Chunk`, use the `Stream.runCollect` function.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)

const collectedData = Stream.runCollect(stream)

Effect.runPromise(collectedData).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4, 5 ]
}
*/
```

## Using runForEach

Use `Stream.runForEach` to consume elements of a stream with a callback function that receives each element.

```ts
import { Stream, Effect, Console } from "effect"

const effect = Stream.make(1, 2, 3).pipe(
  Stream.runForEach((n) => Console.log(n))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
1
2
3
undefined
*/
```

## Using a Fold Operation

The `Stream.fold` function allows you to consume a stream by performing a fold operation over the stream of values and returning an effect containing the result.

```ts
import { Stream, Effect } from "effect"

const e1 = Stream.make(1, 2, 3, 4, 5).pipe(Stream.runFold(0, (a, b) => a + b))

Effect.runPromise(e1).then(console.log) // Output: 15

const e2 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.runFoldWhile(
    0,
    (n) => n <= 3,
    (a, b) => a + b
  )
)

Effect.runPromise(e2).then(console.log) // Output: 6
```

## Using a Sink

To consume a stream using a Sink, pass the `Sink` to the `Stream.run` function.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3).pipe(Stream.run(Sink.sum))

Effect.runPromise(effect).then(console.log) // Output: 6
```