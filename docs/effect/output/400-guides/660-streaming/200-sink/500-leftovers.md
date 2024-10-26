# Leftovers

Explore handling unconsumed elements with sinks. Learn to collect or ignore leftovers using `Sink.collectLeftover` and `Sink.ignoreLeftover`. Efficiently manage and process remaining elements from upstream sources in data streams.

## Collecting Leftovers

When a sink consumes elements from an upstream source, it may not use all of them. These unconsumed elements are referred to as "leftovers." To collect these leftovers, we can use `Sink.collectLeftover`. It returns a tuple containing the result of the previous sink operation and any leftover elements:

```ts
import { Stream, Sink, Effect } from "effect"

const s1 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(Sink.take<number>(3).pipe(Sink.collectLeftover))
)

Effect.runPromise(s1).then(console.log)
/*
Output:
[
  {
    _id: "Chunk",
    values: [ 1, 2, 3 ]
  }, {
    _id: "Chunk",
    values: [ 4, 5 ]
  }
]
*/

const s2 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(Sink.head<number>().pipe(Sink.collectLeftover))
)

Effect.runPromise(s2).then(console.log)
/*
Output:
[
  {
    _id: "Option",
    _tag: "Some",
    value: 1
  }, {
    _id: "Chunk",
    values: [ 2, 3, 4, 5 ]
  }
]
*/
```

## Ignoring Leftovers

When leftover elements are not needed, they can be ignored using `Sink.ignoreLeftover`:

```ts
import { Stream, Sink, Effect } from "effect"

const s1 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(
    Sink.take<number>(3).pipe(Sink.ignoreLeftover).pipe(Sink.collectLeftover)
  )
)

Effect.runPromise(s1).then(console.log)
/*
Output:
[
  {
    _id: "Chunk",
    values: [ 1, 2, 3 ]
  }, {
    _id: "Chunk",
    values: []
  }
]
*/
```