# Queue

Explore the lightweight, in-memory `Queue` in Effect, designed for composable and transparent back-pressure. Learn about its fully asynchronous, purely-functional, and type-safe characteristics. Delve into basic operations, creating different types of queues, and efficiently adding and consuming items. Discover how to shut down a queue gracefully and handle exclusive capabilities with offer-only and take-only queues. Enhance your understanding of `Queue` and leverage its power for seamless coordination in your asynchronous workflows.

A `Queue` is a lightweight in-memory queue built on Effect with composable and transparent back-pressure. It is fully asynchronous (no locks or blocking), purely-functional, and type-safe.

## Basic Operations

A `Queue<A>` stores values of type `A` and provides two fundamental operations:

- `Queue.offer`: Adds a value of type `A` to the `Queue`.
- `Queue.take`: Removes and returns the oldest value from the `Queue`.

Example:

```ts
import { Effect, Queue } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 1) // Add 1 to the queue
  const value = yield* Queue.take(queue) // Retrieve and remove the oldest value
  return value
})

Effect.runPromise(program).then(console.log) // Output: 1
```

## Creating a Queue

A `Queue` can have bounded (limited capacity) or unbounded storage. Choose from various strategies to handle new values when the queue reaches its capacity.

### Bounded Queue

Provides back-pressure when full. Attempts to add more items will be suspended until space is available.

```ts
import { Queue } from "effect"

// Creating a bounded queue with a capacity of 100
const boundedQueue = Queue.bounded<number>(100)
```

### Dropping Queue

Drops new items when full without waiting for space.

```ts
import { Queue } from "effect"

// Creating a dropping queue with a capacity of 100
const droppingQueue = Queue.dropping<number>(100)
```

### Sliding Queue

Removes old items when full to accommodate new ones.

```ts
import { Queue } from "effect"

// Creating a sliding queue with a capacity of 100
const slidingQueue = Queue.sliding<number>(100)
```

### Unbounded Queue

Has no capacity limit.

```ts
import { Queue } from "effect"

// Creating an unbounded queue
const unboundedQueue = Queue.unbounded<number>()
```

## Adding Items to a Queue

Use `Queue.offer` to add a value:

```ts
import { Effect, Queue } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 1) // put 1 in the queue
})
```

For back-pressured queues, if full, `offer` may suspend. Use `Effect.fork` to wait in a different execution context.

```ts
import { Effect, Queue, Fiber } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(1)
  yield* Queue.offer(queue, 1)
  const fiber = yield* Effect.fork(Queue.offer(queue, 2)) // will be suspended
  yield* Queue.take(queue)
  yield* Fiber.join(fiber)
})
```

Add multiple values using `Queue.offerAll`:

```ts
import { Effect, Queue, Array } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  const items = Array.range(1, 10)
  yield* Queue.offerAll(queue, items)
  return yield* Queue.size(queue)
})

Effect.runPromise(program).then(console.log) // Output: 10
```

## Consuming Items from a Queue

`Queue.take` removes the oldest item. If empty, it suspends until an item is added. Use `Effect.fork` to wait in a different execution context.

```ts
import { Effect, Queue, Fiber } from "effect"

const oldestItem = Effect.gen(function* () {
  const queue = yield* Queue.bounded<string>(100)
  const fiber = yield* Effect.fork(Queue.take(queue)) // will be suspended
  yield* Queue.offer(queue, "something")
  const value = yield* Fiber.join(fiber)
  return value
})

Effect.runPromise(oldestItem).then(console.log) // Output: something
```

Retrieve the first item using `Queue.poll`. If empty, returns `None`; otherwise, the top item is wrapped in `Some`.

```ts
import { Effect, Queue } from "effect"

const polled = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 10)
  yield* Queue.offer(queue, 20)
  const head = yield* Queue.poll(queue)
  return head
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 10
}
*/
```

Retrieve multiple items using `Queue.takeUpTo`. If not enough items, returns all available without waiting.

```ts
import { Effect, Queue } from "effect"

const polled = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 10)
  yield* Queue.offer(queue, 20)
  yield* Queue.offer(queue, 30)
  const chunk = yield* Queue.takeUpTo(queue, 2)
  return chunk
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 10, 20 ]
}
*/
```

Retrieve all items using `Queue.takeAll`. Returns immediately, providing an empty collection if the queue is empty.

```ts
import { Effect, Queue } from "effect"

const polled = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 10)
  yield* Queue.offer(queue, 20)
  yield* Queue.offer(queue, 30)
  const chunk = yield* Queue.takeAll(queue)
  return chunk
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 10, 20, 30 ]
}
*/
```

## Shutting Down a Queue

Use `Queue.shutdown` to interrupt all fibers suspended on `offer*` or `take*`. Empties the queue and terminates future `offer*` and `take*` calls.

```ts
import { Effect, Queue, Fiber } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(3)
  const fiber = yield* Effect.fork(Queue.take(queue))
  yield* Queue.shutdown(queue) // will interrupt fiber
  yield* Fiber.join(fiber) // will terminate
})
```

Use `Queue.awaitShutdown` to execute an effect when the queue is shut down. Waits until the queue is shut down, resuming immediately if already shut down.

```ts
import { Effect, Queue, Fiber, Console } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(3)
  const fiber = yield* Effect.fork(
    Queue.awaitShutdown(queue).pipe(
      Effect.andThen(Console.log("shutting down"))
    )
  )
  yield* Queue.shutdown(queue)
  yield* Fiber.join(fiber)
})

Effect.runPromise(program) // Output: shutting down
```

## Offer-only / Take-only Queues

For exclusive capabilities, use `Enqueue` for offering values or `Dequeue` for taking values.

Example of `Enqueue`:

```ts
import { Queue } from "effect"

const send = (offerOnlyQueue: Queue.Enqueue<number>, value: number) => {
  // This enqueue can only be used to offer values

  // @ts-expect-error
  Queue.take(offerOnlyQueue)

  // Ok
  return Queue.offer(offerOnlyQueue, value)
}
```

Example of `Dequeue`:

```ts
import { Queue } from "effect"

const receive = (takeOnlyQueue: Queue.Dequeue<number>) => {
  // This dequeue can only be used to take values

  // @ts-expect-error
  Queue.offer(takeOnlyQueue, 1)

  // Ok
  return Queue.take(takeOnlyQueue)
}
```

The `Queue` type extends both `Enqueue` and `Dequeue`, allowing you to pass it to different parts of your code to enforce either behavior:

```ts
import { Effect, Queue } from "effect"

const send = (offerOnlyQueue: Queue.Enqueue<number>, value: number) => {
  return Queue.offer(offerOnlyQueue, value)
}

const receive = (takeOnlyQueue: Queue.Dequeue<number>) => {
  return Queue.take(takeOnlyQueue)
}

const program = Effect.gen(function* () {
  const queue = yield* Queue.unbounded<number>()

  // Offer values to the queue
  yield* send(queue, 1)
  yield* send(queue, 2)

  // Take values from the queue
  console.log(yield* receive(queue))
  console.log(yield* receive(queue))
})

Effect.runPromise(program)
/*
Output:
1
2
*/