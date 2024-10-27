---
title: TestClock
excerpt: Utilize Effect's `TestClock` to control time during testing. Learn how to simulate the passage of time and efficiently test time-related functionality. Examples include testing `Effect.timeout`, recurring effects, `Clock`, and `Deferred`.
---

In most cases, we want our unit tests to run as quickly as possible. Waiting for real time to pass can slow down our tests significantly. Effect provides a handy tool called `TestClock` that allows us to control time during testing. This means we can efficiently and predictably test code that involves time without having to wait for the actual time to pass.

The `TestClock` in Effect allows us to control time for testing purposes. It lets us schedule effects to run at specific times, making it ideal for testing time-related functionality.

Instead of waiting for real time to pass, we use the `TestClock` to set the clock time to a specific point. Any effects scheduled to run at or before that time will be executed in order.

## How TestClock Works

Imagine `TestClock` as a wall clock, but with a twist—it doesn't tick on its own. Instead, it only changes when we manually adjust it using the `TestClock.adjust` and `TestClock.setTime` functions. The clock time never progresses on its own.

When we adjust the clock time, any effects scheduled to run at or before the new time will be executed. This allows us to simulate the passage of time in our tests without waiting for real time.

### Example: Testing Effect.timeout

```ts
// @types: node
import { Effect, TestClock, Fiber, Option, TestContext } from "effect"
import * as assert from "node:assert"

const test = Effect.gen(function* () {
  const fiber = yield* Effect.sleep("5 minutes").pipe(
    Effect.timeoutTo({
      duration: "1 minute",
      onSuccess: Option.some,
      onTimeout: () => Option.none<void>()
    }),
    Effect.fork
  )

  yield* TestClock.adjust("1 minute")

  const result = yield* Fiber.join(fiber)

  assert.ok(Option.isNone(result))
}).pipe(Effect.provide(TestContext.TestContext))

Effect.runPromise(test)
```

```ts
// @types: node
import { Effect, TestClock, Fiber, Option, TestContext, pipe } from "effect"
import * as assert from "node:assert"

const test = pipe(
  Effect.sleep("5 minutes"),
  Effect.timeoutTo({
    duration: "1 minute",
    onSuccess: Option.some,
    onTimeout: () => Option.none<void>()
  }),
  Effect.fork,
  Effect.tap(() => TestClock.adjust("1 minute")),
  Effect.andThen((fiber) => Fiber.join(fiber)),
  Effect.andThen((result) => {
    assert.ok(Option.isNone(result))
  }),
  Effect.provide(TestContext.TestContext)
)

Effect.runPromise(test)
```

In this example, we create a test scenario involving a fiber that sleeps for 5 minutes and then times out after 1 minute. Instead of waiting for the full 5 minutes to elapse in real time, we utilize the `TestClock` to instantly advance time by 1 minute.

### More Examples

#### Testing Recurring Effects

```ts
// @types: node
import { Effect, Queue, TestClock, Option, TestContext } from "effect"
import * as assert from "node:assert"

const test = Effect.gen(function* () {
  const q = yield* Queue.unbounded()

  yield* Queue.offer(q, undefined).pipe(
    Effect.delay("60 minutes"),
    Effect.forever,
    Effect.fork
  )

  const a = yield* Queue.poll(q).pipe(Effect.andThen(Option.isNone))

  yield* TestClock.adjust("60 minutes")

  const b = yield* Queue.take(q).pipe(Effect.as(true))
  const c = yield* Queue.poll(q).pipe(Effect.andThen(Option.isNone))

  yield* TestClock.adjust("60 minutes")

  const d = yield* Queue.take(q).pipe(Effect.as(true))
  const e = yield* Queue.poll(q).pipe(Effect.andThen(Option.isNone))

  assert.ok(a && b && c && d && e)
}).pipe(Effect.provide(TestContext.TestContext))

Effect.runPromise(test)
```

```ts
// @types: node
import { Effect, Queue, TestClock, Option, TestContext, pipe } from "effect"
import * as assert from "node:assert"

const test = pipe(
  Queue.unbounded(),
  Effect.andThen((q) =>
    pipe(
      Queue.offer(q, undefined),
      Effect.delay("60 minutes"),
      Effect.forever,
      Effect.fork,
      Effect.andThen(
        pipe(
          Effect.Do,
          Effect.bind("a", () =>
            pipe(Queue.poll(q), Effect.andThen(Option.isNone))
          ),
          Effect.tap(() => TestClock.adjust("60 minutes")),
          Effect.bind("b", () => pipe(Queue.take(q), Effect.as(true))),
          Effect.bind("c", () =>
            pipe(Queue.poll(q), Effect.andThen(Option.isNone))
          ),
          Effect.tap(() => TestClock.adjust("60 minutes")),
          Effect.bind("d", () => pipe(Queue.take(q), Effect.as(true))),
          Effect.bind("e", () =>
            pipe(Queue.poll(q), Effect.andThen(Option.isNone))
          )
        )
      ),
      Effect.andThen(({ a, b, c, d, e }) => {
        assert.ok(a && b && c && d && e)
      })
    )
  ),
  Effect.provide(TestContext.TestContext)
)

Effect.runPromise(test)
```

#### Testing Clock

```ts
// @types: node
import { Effect, Clock, TestClock, TestContext } from "effect"
import * as assert from "node:assert"

const test = Effect.gen(function* () {
  const startTime = yield* Clock.currentTimeMillis

  yield* TestClock.adjust("1 minute")

  const endTime = yield* Clock.currentTimeMillis

  assert.ok(endTime - startTime >= 60_000)
}).pipe(Effect.provide(TestContext.TestContext))

Effect.runPromise(test)
```

```ts
// @types: node
import { Effect, Clock, TestClock, TestContext, pipe } from "effect"
import * as assert from "node:assert"

const test = pipe(
  Clock.currentTimeMillis,
  Effect.andThen((startTime) =>
    TestClock.adjust("1 minute").pipe(
      Effect.andThen(Clock.currentTimeMillis),
      Effect.andThen((endTime) => {
        assert.ok(endTime - startTime >= 60_000)
      })
    )
  ),
  Effect.provide(TestContext.TestContext)
)

Effect.runPromise(test)
```

#### Testing Deferred

```ts
// @types: node
import { Effect, Deferred, TestClock, TestContext } from "effect"
import * as assert from "node:assert"

const test = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, void>()

  yield* Effect.all(
    [Effect.sleep("10 seconds"), Deferred.succeed(deferred, 1)],
    { concurrency: "unbounded" }
  ).pipe(Effect.fork)

  yield* TestClock.adjust("10 seconds")

  const readRef = yield* Deferred.await(deferred)

  assert.ok(1 === readRef)
}).pipe(Effect.provide(TestContext.TestContext))

Effect.runPromise(test)
```

```ts
// @types: node
import { Effect, Deferred, TestClock, TestContext, pipe } from "effect"
import * as assert from "node:assert"

const test = pipe(
  Deferred.make<number, void>(),
  Effect.tap((deferred) =>
    Effect.fork(
      Effect.all(
        [Effect.sleep("10 seconds"), Deferred.succeed(deferred, 1)],
        { concurrency: "unbounded" }
      )
    )
  ),
  Effect.tap(() => TestClock.adjust("10 seconds")),
  Effect.andThen((deferred) => Deferred.await(deferred)),
  Effect.andThen((readRef) => {
    assert.ok(1 === readRef)
  }),
  Effect.provide(TestContext.TestContext)
)

Effect.runPromise(test)
```