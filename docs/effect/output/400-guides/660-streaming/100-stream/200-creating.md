---
title: Creating Streams
excerpt: Explore diverse methods for crafting `Stream`s in Effect, tailored to your specific needs. Learn about common constructors like `make`, `empty`, `unit`, `range`, `iterate`, and `scoped`. Discover how to generate streams from success and failure using `succeed` and `fail` functions, and construct streams from chunks, effects, asynchronous callbacks, iterables, repetitions, unfolding, pagination, queues, pub/sub, and schedules. Dive into practical examples and gain insights into the nuances of each method, enabling you to harness the full power of Effect's streaming capabilities.
---

In this section, we'll explore various methods for creating Effect `Stream`s. These methods will help you generate streams tailored to your needs.

## Common Constructors

### make

Create a pure stream using `Stream.make` with a variable list of values.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }
```

### empty

Use `Stream.empty` to create a stream that doesn't produce any values.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.empty

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [] }
```

### void

Use `Stream.void` for a stream that contains a single `void` value.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.void

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ undefined ] }
```

### range

Create a stream of integers within a specified range `[min, max]` using `Stream.range`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }
```

### iterate

Generate a stream by applying a function iteratively to an initial value with `Stream.iterate`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.iterate(1, (n) => n + 1)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }
```

### scoped

Create a single-valued stream from a scoped resource using `Stream.scoped`.

```ts
import { Stream, Effect, Console } from "effect"

const stream = Stream.scoped(
  Effect.acquireUseRelease(
    Console.log("acquire"),
    () => Console.log("use"),
    () => Console.log("release")
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
acquire
use
release
{ _id: 'Chunk', values: [ undefined ] }
*/
```

## From Success and Failure

Generate a `Stream` using the `fail` and `succeed` functions:

```ts
import { Stream, Effect } from "effect"

const streamWithError: Stream.Stream<never, string> = Stream.fail("Uh oh!")

Effect.runPromise(Stream.runCollect(streamWithError))
// throws Error: Uh oh!

const streamWithNumber: Stream.Stream<number> = Stream.succeed(5)

Effect.runPromise(Stream.runCollect(streamWithNumber)).then(console.log)
// { _id: 'Chunk', values: [ 5 ] }
```

## From Chunks

Construct a stream from a `Chunk`:

```ts
import { Stream, Chunk, Effect } from "effect"

const stream = Stream.fromChunk(Chunk.make(1, 2, 3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }
```

Create a stream from multiple `Chunk`s:

```ts
import { Stream, Chunk, Effect } from "effect"

const stream = Stream.fromChunks(Chunk.make(1, 2, 3), Chunk.make(4, 5, 6))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5, 6 ] }
```

## From Effect

Generate a stream from an Effect workflow using `Stream.fromEffect`.

```ts
import { Stream, Random, Effect } from "effect"

const stream = Stream.fromEffect(Random.nextInt)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// Example Output: { _id: 'Chunk', values: [ 1042302242 ] }
```

## From Asynchronous Callback

Capture results emitted by asynchronous callbacks as a stream using `Stream.async`.

```ts
import { Stream, Effect, Chunk, Option, StreamEmit } from "effect"

const events = [1, 2, 3, 4]

const stream = Stream.async(
  (emit: StreamEmit.Emit<never, never, number, void>) => {
    events.forEach((n) => {
      setTimeout(() => {
        if (n === 3) {
          emit(Effect.fail(Option.none())) // Terminate the stream
        } else {
          emit(Effect.succeed(Chunk.of(n))) // Add the current item to the stream
        }
      }, 100 * n)
    })
  }
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2 ] }
```

## From Iterables

### fromIterable

Create a pure stream from an `Iterable` using `Stream.fromIterable`.

```ts
import { Stream, Effect } from "effect"

const numbers = [1, 2, 3]

const stream = Stream.fromIterable(numbers)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }
```

### fromIterableEffect

Generate a stream from an effect that produces an `Iterable` using `Stream.fromIterableEffect`.

```ts
import { Stream, Effect, Context } from "effect"

class Database extends Context.Tag("Database")<
  Database,
  { readonly getUsers: Effect.Effect<Array<string>> }
>() {}

const getUsers = Database.pipe(Effect.andThen((_) => _.getUsers))

const stream = Stream.fromIterableEffect(getUsers)

Effect.runPromise(
  Stream.runCollect(
    stream.pipe(
      Stream.provideService(Database, {
        getUsers: Effect.succeed(["user1", "user2"])
      })
    )
  )
).then(console.log)
// { _id: 'Chunk', values: [ 'user1', 'user2' ] }
```

### fromAsyncIterable

Convert async iterables into a stream using `Stream.fromAsyncIterable`.

```ts
import { Stream, Effect } from "effect"

const myAsyncIterable = async function* () {
  yield 1
  yield 2
}

const stream = Stream.fromAsyncIterable(
  myAsyncIterable(),
  (e) => new Error(String(e)) // Error Handling
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2 ] }
```

## From Repetition

### Repeating a Single Value

Create a stream that endlessly repeats a specific value using `Stream.repeatValue`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.repeatValue(0)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 0, 0, 0, 0, 0 ] }
```

### Repeating a Stream's Content

Use `Stream.repeat` to create a stream that repeats a specified stream's content.

```ts
import { Stream, Effect, Schedule } from "effect"

const stream = Stream.repeat(Stream.succeed(1), Schedule.forever)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 1, 1, 1, 1, 1 ] }
```

### Repeating an Effect's Result

Generate a stream of random numbers by repeating an effect.

```ts
import { Stream, Effect, Random } from "effect"

const stream = Stream.repeatEffect(Random.nextInt)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// Example Output: { _id: 'Chunk', values: [ 1666935266, 604851965, 2194299958, 3393707011, 4090317618 ] }
```

### Repeating an Effect with Termination

Evaluate a given effect repeatedly and terminate based on specific conditions.

```ts
import { Stream, Effect, Option } from "effect"

const drainIterator = <A>(it: Iterator<A>): Stream.Stream<A> =>
  Stream.repeatEffectOption(
    Effect.sync(() => it.next()).pipe(
      Effect.andThen((res) => {
        if (res.done) {
          return Effect.fail(Option.none())
        }
        return Effect.succeed(res.value)
      })
    )
  )
```

### Generating Ticks

Create a stream that emits `void` values at specified intervals using `Stream.tick`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.tick("100 millis")

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ undefined, undefined, undefined, undefined, undefined ] }
```

## From Unfolding/Pagination

### Unfold

Use `Stream.unfold` to generate a recursive data structure from an initial value.

```ts
import { Stream, Effect, Option } from "effect"

const stream = Stream.unfold(1, (n) => Option.some([n, n + 1]))

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }
```

### unfoldEffect

Perform effectful state transformations during unfolding with `Stream.unfoldEffect`.

```ts
import { Stream, Effect, Option, Random } from "effect"

const stream = Stream.unfoldEffect(1, (n) =>
  Random.nextBoolean.pipe(
    Effect.map((b) => (b ? Option.some([n, -n]) : Option.some([n, n])))
  )
)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// Example Output: { _id: 'Chunk', values: [ 1, 1, 1, 1, -1 ] }
```

### Pagination

Use `Stream.paginate` to emit values one step further.

```ts
import { Stream, Effect, Option } from "effect"

const stream = Stream.paginate(0, (n) => [
  n,
  n < 3 ? Option.some(n + 1) : Option.none()
])

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 0, 1, 2, 3 ] }
```

## From Queue and PubSub

Transform Queue and PubSub into `Stream`s using `Stream.fromQueue` and `Stream.fromPubSub`.

## From Schedule

Create a stream from a Schedule that emits an element for each value output from the schedule.

```ts
import { Effect, Stream, Schedule } from "effect"

const schedule = Schedule.spaced("1 second").pipe(
  Schedule.compose(Schedule.recurs(10))
)

const stream = Stream.fromSchedule(schedule)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] }
```