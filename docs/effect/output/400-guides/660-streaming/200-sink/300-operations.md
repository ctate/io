# Sink Operations

Explore sink operations to transform or filter their behavior. Learn to adapt sinks for different input types using `Sink.mapInput`. Discover how `Sink.dimap` allows complete conversion between input and output types. Utilize `Sink.filterInput` to selectively process elements based on specific conditions.

## Changing the Input

`Sink.mapInput` modifies the input of a sink, allowing it to work with a different input type. For example, to adapt `Sink.sum` for a stream of strings:

```ts
import { Stream, Sink, Effect } from "effect"

const numericSum = Sink.sum

const stringSum = numericSum.pipe(
  Sink.mapInput((s: string) => Number.parseFloat(s))
)

Effect.runPromise(
  Stream.make("1", "2", "3", "4", "5").pipe(Stream.run(stringSum))
).then(console.log)
/*
Output:
15
*/
```

## Transforming Both Input and Output

`Sink.dimap` allows you to transform both the input and output of a sink. For instance, converting input strings to integers and outputting the result as a string:

```ts
import { Stream, Sink, Effect } from "effect"

const sumSink = Sink.sum.pipe(
  Sink.dimap({
    onInput: (s: string) => Number.parseFloat(s),
    onDone: (n) => String(n)
  })
)

Effect.runPromise(
  Stream.make("1", "2", "3", "4", "5").pipe(Stream.run(sumSink))
).then(console.log)
/*
Output:
15 <-- as string
*/
```

## Filtering Input

`Sink.filterInput` allows filtering of incoming elements based on specific conditions. For example, collecting elements in chunks of three while filtering out negative numbers:

```ts
import { Stream, Sink, Effect } from "effect"

const stream = Stream.make(1, -2, 0, 1, 3, -3, 4, 2, 0, 1, -3, 1, 1, 6).pipe(
  Stream.transduce(
    Sink.collectAllN<number>(3).pipe(Sink.filterInput((n) => n > 0))
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [
    {
      _id: "Chunk",
      values: [ 1, 1, 3 ]
    }, {
      _id: "Chunk",
      values: [ 4, 2, 1 ]
    }, {
      _id: "Chunk",
      values: [ 1, 1, 6 ]
    }, {
      _id: "Chunk",
      values: []
    }
  ]
}
*/