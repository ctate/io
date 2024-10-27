# PubSub

Dive into the world of `PubSub`, a powerful asynchronous message hub that facilitates seamless communication between publishers and subscribers. Learn the core operations, explore different types of pubsubs, and discover the optimal scenarios for their use. Understand the versatile operators available on pubsubs, from publishing multiple values to checking size and gracefully shutting down. Gain insights into the unique qualities that set pubsubs apart and their equivalence to queues in various scenarios. Elevate your understanding of `PubSub` to enhance your asynchronous workflows.

In this guide, we'll explore the concept of a `PubSub`, which is an asynchronous message hub. It allows publishers to send messages to the pubsub, and subscribers can receive those messages.

Unlike a Queue, where each value offered can be taken by **one** taker, each value published to a pubsub can be received by **all** subscribers. Whereas a Queue represents the optimal solution to the problem of how to **distribute** values, a `PubSub` represents the optimal solution to the problem of how to **broadcast** them.

## Basic Operations

The core operations of a `PubSub` are `PubSub.publish` and `PubSub.subscribe`:

- The `publish` operation sends a message of type `A` to the pubsub. It returns an effect that indicates whether the message was successfully published.
- The `subscribe` operation returns a scoped effect that allows you to subscribe to the pubsub. It automatically unsubscribes when the scope is closed. Within the scope, you gain access to a `Dequeue`, which is essentially a `Queue` for dequeuing messages published to the pubsub.

Example:

```ts
import { Effect, PubSub, Queue, Console } from "effect"

const program = PubSub.bounded<string>(2).pipe(
  Effect.andThen((pubsub) =>
    Effect.scoped(
      Effect.gen(function* () {
        const dequeue1 = yield* PubSub.subscribe(pubsub)
        const dequeue2 = yield* PubSub.subscribe(pubsub)
        yield* PubSub.publish(pubsub, "Hello from a PubSub!")
        yield* Queue.take(dequeue1).pipe(Effect.andThen(Console.log))
        yield* Queue.take(dequeue2).pipe(Effect.andThen(Console.log))
      })
    )
  )
)

Effect.runPromise(program)
/*
Output:
Hello from a PubSub!
Hello from a PubSub!
*/
```

A subscriber will only receive messages published to the pubsub while it's subscribed. Ensure that the subscription is established before publishing the message.

## Creating PubSubs

You can create a pubsub using various constructors provided by the PubSub module:

### Bounded PubSub

A bounded pubsub applies back pressure to publishers when it's at capacity, meaning publishers will block if the pubsub is full.

```ts
import { PubSub } from "effect"

const boundedPubSub = PubSub.bounded<string>(2)
```

### Dropping PubSub

A dropping pubsub discards values if it's full. The `PubSub.publish` function will return `false` when the pubsub is full.

```ts
import { PubSub } from "effect"

const droppingPubSub = PubSub.dropping<string>(2)
```

### Sliding PubSub

A sliding pubsub drops the oldest value when it's full, ensuring that publishing always succeeds immediately.

```ts
import { PubSub } from "effect"

const slidingPubSub = PubSub.sliding<string>(2)
```

### Unbounded PubSub

An unbounded pubsub can never be full, and publishing always succeeds immediately.

```ts
import { PubSub } from "effect"

const unboundedPubSub = PubSub.unbounded<string>()
```

Generally, it's recommended to use bounded, dropping, or sliding pubsubs unless you have specific use cases for unbounded pubsubs.

## Operators On PubSubs

PubSubs support various operations similar to those available on queues.

### Publishing Multiple Values

Use the `PubSub.publishAll` operator to publish multiple values to the pubsub at once:

```ts
import { Effect, PubSub, Queue, Console } from "effect"

const program = PubSub.bounded<string>(2).pipe(
  Effect.andThen((pubsub) =>
    Effect.scoped(
      Effect.gen(function* () {
        const dequeue = yield* PubSub.subscribe(pubsub)
        yield* PubSub.publishAll(pubsub, ["Message 1", "Message 2"])
        yield* Queue.takeAll(dequeue).pipe(Effect.andThen(Console.log))
      })
    )
  )
)

Effect.runPromise(program)
/*
Output:
{
  _id: "Chunk",
  values: [ "Message 1", "Message 2" ]
}
*/
```

### Checking Size

Determine the capacity and current size of the pubsub using `PubSub.capacity` and `PubSub.size`:

```ts
import { Effect, PubSub, Console } from "effect"

const program = PubSub.bounded<number>(2).pipe(
  Effect.tap((pubsub) => Console.log(`capacity: ${PubSub.capacity(pubsub)}`)),
  Effect.tap((pubsub) =>
    PubSub.size(pubsub).pipe(
      Effect.andThen((size) => Console.log(`size: ${size}`))
    )
  )
)

Effect.runPromise(program)
/*
Output:
capacity: 2
size: 0
*/
```

### Shutting Down a PubSub

Shut down a pubsub using `PubSub.shutdown`, check if it's shut down with `PubSub.isShutdown`, or await its shutdown with `PubSub.awaitShutdown`. Shutting down a pubsub also shuts down all associated queues.

## PubSub as an Enqueue

The operators on `PubSub` are identical to those on Queue, with `PubSub.publish` and `PubSub.subscribe` replacing `Queue.offer` and `Queue.take`. A `PubSub` can be viewed as a `Queue` that can only be written to:

```ts
interface PubSub<A> extends Queue.Enqueue<A> {}
```

This versatility allows you to use a `PubSub` wherever you currently use a `Queue` that you only write to.