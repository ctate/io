# Schedule Combinators

Explore the power of combining schedules in Effect to create sophisticated recurring patterns. Learn about key combinators such as `Union`, `Intersection`, and `Sequencing`. Witness the impact of `Jittering` on scheduling by introducing randomness to delays. Understand how to `Filter` inputs or outputs and modify delays with precision. Leverage `Tapping` to effectfully process each schedule input/output, providing insights into the execution flow. Elevate your understanding of schedules for efficient and flexible handling of effectful operations.

Schedules define stateful, possibly effectful, recurring schedules of events, and compose in a variety of ways. Combinators allow us to take schedules and combine them together to get other schedules.

To demonstrate the functionality of different schedules, we will be working with the following helper:

```twoslash include Delay
import { Effect, Schedule, TestClock, Fiber, TestContext } from "effect"

let start = 0
let i = 0

export const log = <A, Out>(
  action: Effect.Effect<A>,
  schedule: Schedule.Schedule<Out, void>
) => {
  Effect.gen(function* () {
    const fiber: Fiber.RuntimeFiber<[Out, number]> = yield* Effect.gen(
      function* () {
        yield* action
        const now = yield* TestClock.currentTimeMillis
        console.log(
          i === 0
            ? `delay: ${now - start}`
            : i === 10
              ? "..."
              : `#${i} delay: ${now - start}`
        )
        i++
        start = now
      }
    ).pipe(
      Effect.repeat(schedule.pipe(Schedule.intersect(Schedule.recurs(10)))),
      Effect.fork
    )
    yield* TestClock.adjust(Infinity)
    yield* Fiber.join(fiber)
  }).pipe(Effect.provide(TestContext.TestContext), Effect.runPromise)
}
```

```ts
declare const log: <A, Out>(
  action: Effect.Effect<A>,
  schedule: Schedule.Schedule<Out, void>
) => void
```

The `log` helper logs the time delay between each execution. We will use this helper to showcase the behavior of various built-in schedules.

**Warning**: The `log` helper accelerates time using TestClock, which means it simulates the passing of time that would normally occur in a real-world application.

## Composition

Schedules compose in the following primary ways:

- **Union**: Performs the union of the intervals of two schedules.
- **Intersection**: Performs the intersection of the intervals of two schedules.
- **Sequencing**: Concatenates the intervals of one schedule onto another.

### Union

Combines two schedules through union, recurring if either schedule wants to recur, using the minimum of the two delays between recurrences.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.union(
  Schedule.exponential("100 millis"),
  Schedule.spaced("1 second")
)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 100  < exponential
#2 delay: 200
#3 delay: 400
#4 delay: 800
#5 delay: 1000 < spaced
#6 delay: 1000
#7 delay: 1000
#8 delay: 1000
#9 delay: 1000
...
*/
```

### Intersection

Combines two schedules through the intersection, recurring only if both schedules want to recur, using the maximum of the two delays between recurrences.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.intersect(
  Schedule.exponential("10 millis"),
  Schedule.recurs(5)
)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 10  < exponential
#2 delay: 20
#3 delay: 40
#4 delay: 80
#5 delay: 160
(end)         < recurs
*/
```

### Sequencing

Combines two schedules sequentially, following the first policy until it ends, and then following the second policy.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.andThen(
  Schedule.recurs(5),
  Schedule.spaced("1 second")
)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 0    < recurs
#2 delay: 0
#3 delay: 0
#4 delay: 0
#5 delay: 0
#6 delay: 1000 < spaced
#7 delay: 1000
#8 delay: 1000
#9 delay: 1000
...
*/
```

## Jittering

A `jittered` is a combinator that takes one schedule and returns another schedule of the same type except for the delay which is applied randomly. Jitter adds randomness to the delay of the schedule, helping to avoid synchronization issues.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.jittered(Schedule.exponential("10 millis"))
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 9.006765
#2 delay: 20.549507999999996
#3 delay: 45.86659000000001
#4 delay: 77.055037
#5 delay: 178.06722299999998
#6 delay: 376.056965
#7 delay: 728.732785
#8 delay: 1178.174953
#9 delay: 2331.4659370000004
...
*/
```

## Filtering

We can filter inputs or outputs of a schedule with `whileInput` and `whileOutput`.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.whileOutput(Schedule.recurs(5), (n) => n <= 2)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 0 < recurs
#2 delay: 0
#3 delay: 0
(end)       < whileOutput
*/
```

## Modifying

Modifies the delay of a schedule.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.modifyDelay(
  Schedule.spaced("1 second"),
  (_) => "100 millis"
)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 100 < modifyDelay
#2 delay: 100
#3 delay: 100
#4 delay: 100
#5 delay: 100
#6 delay: 100
#7 delay: 100
#8 delay: 100
#9 delay: 100
...
*/
```

## Tapping

Whenever we need to effectfully process each schedule input/output, we can use `tapInput` and `tapOutput`.

```ts twoslash
// @filename: Delay.ts
// @include: Delay

// @filename: index.ts
// ---cut---
import { Schedule, Effect, Console } from "effect"
import { log } from "./Delay"

const schedule = Schedule.tapOutput(Schedule.recurs(2), (n) =>
  Console.log(`repeating ${n}`)
)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
repeating 0
#1 delay: 0
repeating 1
#2 delay: 0
repeating 2
*/
```