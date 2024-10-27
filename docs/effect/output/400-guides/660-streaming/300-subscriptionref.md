---
title: SubscriptionRef
excerpt: Explore the capabilities of `SubscriptionRef` in Effect, a specialized form of `SynchronizedRef`. Learn how it allows you to subscribe and receive updates on the current value and any changes made to that value. Understand the power of the `changes` stream, which facilitates observing the value and subsequent changes. Dive into practical examples demonstrating the use of `SubscriptionRef` in modeling shared state, especially in scenarios where multiple observers need to react to every change. Witness the seamless integration of `SubscriptionRef` with asynchronous tasks and discover how it enhances efficient state management in your programs.
---

A `SubscriptionRef<A>` is a specialized form of a SynchronizedRef. It allows us to subscribe and receive updates on the current value and any changes made to that value.

```ts
export interface SubscriptionRef<A> extends Synchronized.SynchronizedRef<A> {
  readonly changes: Stream<A>
}
```

You can perform all the usual operations on a `SubscriptionRef`, such as `get`, `set`, or `modify` to work with the current value.

The `changes` stream lets you observe the current value and all subsequent changes. Each time you run this stream, you'll get the current value and any changes that occurred afterward.

To create a `SubscriptionRef`, use the `make` constructor, specifying the initial value:

```ts
import { SubscriptionRef } from "effect"

const ref = SubscriptionRef.make(0)
```

A `SubscriptionRef` is invaluable when modeling shared state, especially when multiple observers need to react to every change. For example, in a functional reactive programming context, the `SubscriptionRef` value might represent a part of the application state, and each observer could update various user interface elements based on changes to that state.

Example of a "server" that updates a value observed by multiple "clients":

```ts
import { Ref, Effect } from "effect"

const server = (ref: Ref.Ref<number>) =>
  Ref.update(ref, (n) => n + 1).pipe(Effect.forever)
```

The `server` function operates on a regular `Ref` and updates a value.

```ts
import { Ref, Effect, Stream, Random } from "effect"

const client = (changes: Stream.Stream<number>) =>
  Effect.gen(function* () {
    const n = yield* Random.nextIntBetween(1, 10)
    const chunk = yield* Stream.runCollect(Stream.take(changes, n))
    return chunk
  })
```

The `client` function works with a `Stream` of values and does not concern itself with the source of these values.

To tie everything together, start the server, launch multiple client instances in parallel, and shut down the server when finished. Create the `SubscriptionRef` in this process.

```ts
import { Ref, Effect, Stream, Random, SubscriptionRef, Fiber } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  const serverFiber = yield* Effect.fork(server(ref))
  const clients = new Array(5).fill(null).map(() => client(ref.changes))
  const chunks = yield* Effect.all(clients, { concurrency: "unbounded" })
  yield* Fiber.interrupt(serverFiber)
  for (const chunk of chunks) {
    console.log(chunk)
  }
})

Effect.runPromise(program)
/*
Output:
{
  _id: "Chunk",
  values: [ 2, 3, 4 ]
}
{
  _id: "Chunk",
  values: [ 2 ]
}
{
  _id: "Chunk",
  values: [ 2, 3, 4, 5, 6, 7 ]
}
{
  _id: "Chunk",
  values: [ 2, 3, 4 ]
}
{
  _id: "Chunk",
  values: [ 2, 3, 4, 5, 6, 7, 8, 9 ]
}
*/
```

This setup ensures that each client observes the current value when it starts and receives all subsequent changes.

Since the changes are represented as streams, you can easily build more complex programs using familiar stream operators. You can transform, filter, or merge these streams with other streams to achieve more sophisticated behavior.