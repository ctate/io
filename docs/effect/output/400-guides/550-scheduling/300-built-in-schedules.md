# Built-in Schedules

Unlock the power of scheduling in Effect with built-in schedules. Dive into various schedules like `forever`, `once`, and `recurs`, each offering unique recurrence patterns. Witness the behavior of `spaced` and `fixed` schedules, understanding how they space repetitions at specific intervals. Delve into advanced schedules like `exponential` and `fibonacci`, providing controlled recurrence with increasing delays. Master the art of scheduling for precise and efficient execution of effectful operations.

To demonstrate the functionality of different schedules, we will be working with the following helper:

```typescript
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

The `log` helper logs the time delay between each execution. We will use this helper to showcase the behavior of various built-in schedules.

**Warning**: The `log` helper accelerates time using TestClock, which means it simulates the passing of time that would normally occur in a real-world application.

## forever

A schedule that always recurs and produces the number of recurrences at each run.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.forever
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 0 < forever
#2 delay: 0
#3 delay: 0
#4 delay: 0
#5 delay: 0
#6 delay: 0
#7 delay: 0
#8 delay: 0
#9 delay: 0
...
*/
```

## once

A schedule that recurs one time.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.once
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 0 < once
*/
```

## recurs

A schedule that only recurs the specified number of times.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.recurs(5)
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 0 < recurs
#2 delay: 0
#3 delay: 0
#4 delay: 0
#5 delay: 0
*/
```

## Recurring at specific intervals

In the context of scheduling, two commonly used schedules are `spaced` and `fixed`. While they both involve recurring at specific intervals, they have a fundamental difference in how they determine the timing of repetitions.

The `spaced` schedule creates a recurring pattern where each repetition is spaced apart by a specified duration. This means that there is a delay between the completion of one repetition and the start of the next. The duration between repetitions remains constant, providing a consistent spacing pattern.

On the other hand, the `fixed` schedule recurs on a fixed interval, regardless of the duration of the actions or the completion time of previous repetitions. It operates independently of the execution time, ensuring a regular recurrence at the specified interval.

### spaced

A schedule that recurs continuously, each repetition spaced the specified duration from the last run.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.spaced("200 millis")
const action = Effect.delay(Effect.void, "100 millis")
log(action, schedule)
/*
Output:
delay: 100
#1 delay: 300 < spaced
#2 delay: 300
#3 delay: 300
#4 delay: 300
#5 delay: 300
#6 delay: 300
#7 delay: 300
#8 delay: 300
#9 delay: 300
...
*/
```

The first delay is approximately 100 milliseconds, as the initial execution is not affected by the schedule. Subsequent delays are approximately 200 milliseconds apart, demonstrating the effect of the `spaced` schedule.

### fixed

A schedule that recurs on a fixed interval. Returns the number of repetitions of the schedule so far.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.fixed("200 millis")
const action = Effect.delay(Effect.void, "100 millis")
log(action, schedule)
/*
Output:
delay: 100
#1 delay: 300 < fixed
#2 delay: 200
#3 delay: 200
#4 delay: 200
#5 delay: 200
#6 delay: 200
#7 delay: 200
#8 delay: 200
#9 delay: 200
...
*/
```

The first delay is approximately 100 milliseconds, as the initial execution is not affected by the schedule. Subsequent delays are consistently around 200 milliseconds apart, demonstrating the effect of the `fixed` schedule.

## exponential

A schedule that recurs using exponential backoff.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.exponential("10 millis")
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 10 < exponential
#2 delay: 20
#3 delay: 40
#4 delay: 80
#5 delay: 160
#6 delay: 320
#7 delay: 640
#8 delay: 1280
#9 delay: 2560
...
*/
```

## fibonacci

A schedule that always recurs, increasing delays by summing the preceding two delays (similar to the Fibonacci sequence). Returns the current duration between recurrences.

```typescript
import { Schedule, Effect } from "effect"
import { log } from "./Delay"

const schedule = Schedule.fibonacci("10 millis")
const action = Effect.void
log(action, schedule)
/*
Output:
delay: 0
#1 delay: 10 < fibonacci
#2 delay: 10
#3 delay: 20
#4 delay: 30
#5 delay: 50
#6 delay: 80
#7 delay: 130
#8 delay: 210
#9 delay: 340
...
*/
```