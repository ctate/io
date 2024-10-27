# Operations

In this section, explore essential stream operations, including tapping, taking elements, exploring streams as an alternative to async iterables, mapping, filtering, scanning, draining, detecting changes, zipping, grouping, concatenation, merging, interleaving, interspersing, broadcasting, buffering, and debouncing.

## Tapping

Tapping is an operation that involves running an effect on each emission of the stream. It allows you to observe each element, perform some effectful operation, and discard the result of this observation. The `Stream.tap` operation does not alter the elements of the stream.

Example:
```ts
import { Stream, Console, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.tap((n) => Console.log(`before mapping: ${n}`)),
  Stream.map((n) => n * 2),
  Stream.tap((n) => Console.log(`after mapping: ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Taking Elements

Taking elements allows you to extract a specific number of elements from a stream.

- `take`: Extract a fixed number of elements.
- `takeWhile`: Extract elements until a condition is met.
- `takeUntil`: Extract elements until a specific condition is met.
- `takeRight`: Extract a specified number of elements from the end.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.iterate(0, (n) => n + 1)

const s1 = Stream.take(stream, 5)
Effect.runPromise(Stream.runCollect(s1)).then(console.log)

const s2 = Stream.takeWhile(stream, (n) => n < 5)
Effect.runPromise(Stream.runCollect(s2)).then(console.log)

const s3 = Stream.takeUntil(stream, (n) => n === 5)
Effect.runPromise(Stream.runCollect(s3)).then(console.log)

const s4 = Stream.takeRight(s3, 3)
Effect.runPromise(Stream.runCollect(s4)).then(console.log)
```

## Exploring Streams as an Alternative to Async Iterables

Streams can replicate the behavior of async iterables. 

1. **Stream.takeUntil**: Take elements until a condition is true.
2. **Stream.toPull**: Returns an effect that repeatedly pulls data chunks from the stream.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromIterable([1, 2, 3, 4, 5]).pipe(Stream.rechunk(2))

const program = Effect.gen(function* () {
  const getChunk = yield* Stream.toPull(stream)

  while (true) {
    const chunk = yield* getChunk
    console.log(chunk)
  }
})

Effect.runPromise(Effect.scoped(program)).then(console.log, console.error)
```

## Mapping

Transform elements within a stream using the `Stream.map` family of operations.

### Basic Mapping
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(Stream.map((n) => n + 1))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Effectful Mapping
```ts
import { Stream, Random, Effect } from "effect"

const stream = Stream.make(10, 20, 30).pipe(
  Stream.mapEffect((n) => Random.nextIntBetween(0, n))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Stateful Mapping
```ts
import { Stream, Effect } from "effect"

const runningTotal = (stream: Stream.Stream<number>): Stream.Stream<number> =>
  stream.pipe(Stream.mapAccum(0, (s, a) => [s + a, s + a]))

Effect.runPromise(Stream.runCollect(runningTotal(Stream.range(0, 5)))).then(console.log)
```

### Mapping and Flattening
```ts
import { Stream, Effect } from "effect"

const numbers = Stream.make("1-2-3", "4-5", "6").pipe(
  Stream.mapConcat((s) => s.split("-")),
  Stream.map((s) => parseInt(s))
)

Effect.runPromise(Stream.runCollect(numbers)).then(console.log)
```

### Mapping to a Constant Value
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5).pipe(Stream.as(null))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Filtering

The `Stream.filter` operation lets through elements that meet a specified condition.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 11).pipe(Stream.filter((n) => n % 2 === 0))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Scanning

Scans emit every intermediate result as part of the stream.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5).pipe(Stream.scan(0, (a, b) => a + b))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Draining

The `Stream.drain` function executes effects and discards the results.

Example:
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.range(1, 5).pipe(Stream.drain)

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
```

## Detecting Changes in a Stream

The `Stream.changes` operation detects and emits elements that differ from their preceding elements.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 1, 1, 2, 2, 3, 4).pipe(Stream.changes)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Zipping

Zipping combines two or more streams to create a new stream by pairing elements.

Example:
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.zip(
  Stream.make(1, 2, 3, 4, 5, 6),
  Stream.make("a", "b", "c")
)

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
```

### Handling Stream Endings
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.zipAll(Stream.make(1, 2, 3, 4, 5, 6), {
  other: Stream.make("a", "b", "c"),
  defaultSelf: 0,
  defaultOther: "x"
})

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
```

### Zipping Streams at Different Rates
```ts
import { Stream, Schedule, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.schedule(Schedule.spaced("1 second"))
)

const s2 = Stream.make("a", "b", "c", "d").pipe(
  Stream.schedule(Schedule.spaced("500 millis"))
)

const stream = Stream.zipLatest(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Pairing with Previous and Next Elements
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4)

const s1 = Stream.zipWithPrevious(stream)
const s2 = Stream.zipWithNext(stream)
const s3 = Stream.zipWithPreviousAndNext(stream)

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
Effect.runPromise(Stream.runCollect(s2)).then(console.log)
Effect.runPromise(Stream.runCollect(s3)).then(console.log)
```

### Indexing Stream Elements
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make("Mary", "James", "Robert", "Patricia")

const indexedStream = Stream.zipWithIndex(stream)

Effect.runPromise(Stream.runCollect(indexedStream)).then(console.log)
```

## Cartesian Product of Streams

The `Stream.cross` operator computes the Cartesian Product of two streams.

Example:
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make("a", "b")

const product = Stream.cross(s1, s2)

Effect.runPromise(Stream.runCollect(product)).then(console.log)
```

## Partitioning

Partitioning a stream divides it into two separate streams based on a specified condition.

### partition
```ts
import { Stream, Effect } from "effect"

const partition = Stream.range(1, 9).pipe(
  Stream.partition((n) => n % 2 === 0, { bufferSize: 5 })
)

Effect.runPromise(
  Effect.scoped(
    Effect.gen(function* () {
      const [evens, odds] = yield* partition
      console.log(yield* Stream.runCollect(evens))
      console.log(yield* Stream.runCollect(odds))
    })
  )
)
```

### partitionEither
```ts
import { Stream, Effect, Either } from "effect"

const partition = Stream.range(1, 9).pipe(
  Stream.partitionEither(
    (n) => Effect.succeed(n % 2 === 0 ? Either.left(n) : Either.right(n)),
    { bufferSize: 5 }
  )
)

Effect.runPromise(
  Effect.scoped(
    Effect.gen(function* () {
      const [evens, odds] = yield* partition
      console.log(yield* Stream.runCollect(evens))
      console.log(yield* Stream.runCollect(odds))
    })
  )
)
```

## GroupBy

The `Stream.groupByKey` function allows you to partition a stream by a function.

### groupByKey
```ts
import { Stream, GroupBy, Effect, Chunk } from "effect"

class Exam {
  constructor(readonly person: string, readonly score: number) {}
}

const examResults = [
  new Exam("Alex", 64),
  new Exam("Michael", 97),
  new Exam("Bill", 77),
  new Exam("John", 78),
  new Exam("Bobby", 71)
]

const groupByKeyResult = Stream.fromIterable(examResults).pipe(
  Stream.groupByKey((exam) => Math.floor(exam.score / 10) * 10)
)

const stream = GroupBy.evaluate(groupByKeyResult, (key, stream) =>
  Stream.fromEffect(
    Stream.runCollect(stream).pipe(
      Effect.andThen((chunk) => [key, Chunk.size(chunk)] as const)
    )
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### groupBy
```ts
import { Stream, GroupBy, Effect, Chunk } from "effect"

const groupByKeyResult = Stream.fromIterable([
  "Mary",
  "James",
  "Robert",
  "Patricia",
  "John",
  "Jennifer",
  "Rebecca",
  "Peter"
]).pipe(
  Stream.groupBy((name) => Effect.succeed([name.substring(0, 1), name]))
)

const stream = GroupBy.evaluate(groupByKeyResult, (key, stream) =>
  Stream.fromEffect(
    Stream.runCollect(stream).pipe(
      Effect.andThen((chunk) => [key, Chunk.size(chunk)] as const)
    )
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Grouping

### grouped
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(0, 8).pipe(Stream.grouped(3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### groupedWithin
```ts
import { Stream, Schedule, Effect, Chunk } from "effect"

const stream = Stream.range(0, 9).pipe(
  Stream.repeat(Schedule.spaced("1 second")),
  Stream.groupedWithin(18, "1.5 seconds"),
  Stream.take(3)
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Concatenation

### Simple Concatenation
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make(4, 5)

const stream = Stream.concat(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Concatenating Multiple Streams
```ts
import { Stream, Effect, Chunk } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make(4, 5)
const s3 = Stream.make(6, 7, 8)

const stream = Stream.concatAll(Chunk.make(s1, s2, s3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Advanced Concatenation with flatMap
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.flatMap((a) => Stream.repeatValue(a).pipe(Stream.take(4)))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Merging

### merge
```ts
import { Schedule, Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.make(4, 5, 6).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

const stream = Stream.merge(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Termination Strategy
```ts
import { Stream, Schedule, Effect } from "effect"

const s1 = Stream.range(1, 5).pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.repeatValue(0).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

const stream = Stream.merge(s1, s2, { haltStrategy: "left" })

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### mergeWith
```ts
import { Schedule, Stream, Effect } from "effect"

const s1 = Stream.make("1", "2", "3").pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.make(4.1, 5.3, 6.2).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

const stream = Stream.mergeWith(s1, s2, {
  onSelf: (s) => parseInt(s),
  onOther: (n) => Math.floor(n)
})

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Interleaving

### interleave
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make(4, 5, 6)

const stream = Stream.interleave(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### interleaveWith
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 3, 5, 7, 9)
const s2 = Stream.make(2, 4, 6, 8, 10)

const booleanStream = Stream.make(true, false, false).pipe(Stream.forever)

const stream = Stream.interleaveWith(s1, s2, booleanStream)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Interspersing

### intersperse
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5).pipe(Stream.intersperse(0))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### intersperseAffixes
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.intersperseAffixes({
    start: "[",
    middle: "-",
    end: "]"
  })
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Broadcasting

Broadcasting creates multiple streams that contain the same elements as the source stream.

Example:
```ts
import { Effect, Stream, Console, Schedule, Fiber } from "effect"

const numbers = Effect.scoped(
  Stream.range(1, 20).pipe(
    Stream.tap((n) => Console.log(`Emit ${n} element before broadcasting`)),
    Stream.broadcast(2, 5),
    Stream.flatMap(([first, second]) =>
      Effect.gen(function* () {
        const fiber1 = yield* Stream.runFold(first, 0, (acc, e) =>
          Math.max(acc, e)
        ).pipe(
          Effect.andThen((max) => Console.log(`Maximum: ${max}`)),
          Effect.fork
        )
        const fiber2 = yield* second.pipe(
          Stream.schedule(Schedule.spaced("1 second")),
          Stream.runForEach((n) =>
            Console.log(`Logging to the Console: ${n}`)
          ),
          Effect.fork
        )
        yield* Fiber.join(fiber1).pipe(
          Effect.zip(Fiber.join(fiber2), { concurrent: true })
        )
      })
    ),
    Stream.runCollect
  )
)

Effect.runPromise(numbers).then(console.log)
```

## Buffering

The `Stream.buffer` operator facilitates scenarios where a faster producer needs to work independently of a slower consumer.

Example:
```ts
import { Stream, Console, Schedule, Effect } from "effect"

const stream = Stream.range(1, 10).pipe(
  Stream.tap((n) => Console.log(`before buffering: ${n}`)),
  Stream.buffer({ capacity: 4 }),
  Stream.tap((n) => Console.log(`after buffering: ${n}`)),
  Stream.schedule(Schedule.spaced("5 seconds"))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Debouncing

Debouncing ensures that a function doesn't fire too frequently, waiting for a specified duration to pass without new values before emitting the latest value.

Example:
```ts
import { Stream, Effect } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(
    Stream.fromEffect(Effect.sleep("200 millis").pipe(Effect.as(4)))
  ),
  Stream.concat(Stream.make(5, 6)),
  Stream.concat(
    Stream.fromEffect(Effect.sleep("150 millis").pipe(Effect.as(7)))
  ),
  Stream.concat(Stream.make(8)),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.debounce("100 millis"),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Throttling

Throttling regulates the rate at which elements are emitted from a stream.

### Shape Strategy (Default)
```ts
import { Stream, Effect, Schedule, Chunk } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.fromSchedule(Schedule.spaced("50 millis")).pipe(
  Stream.take(6),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.throttle({
    cost: Chunk.size,
    duration: "100 millis",
    units: 1
  }),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Enforce Strategy
```ts
import { Stream, Effect, Schedule, Chunk } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.make(1, 2, 3, 4, 5, 6).pipe(
  Stream.schedule(Schedule.exponential("100 millis")),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.throttle({
    cost: Chunk.size,
    duration: "1 second",
    units: 1,
    strategy: "enforce"
  }),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### burst option
```ts
import { Effect, Schedule, Stream, Chunk } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.fromSchedule(Schedule.spaced("10 millis")).pipe(
  Stream.take(20),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.throttle({
    cost: Chunk.size,
    duration: "200 millis",
    units: 5,
    strategy: "enforce",
    burst: 2
  }),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```