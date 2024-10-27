# Concurrency Options

Effect provides powerful options to manage the execution of effects, offering control over the concurrency of operations. Explore the `concurrency` option, a key factor in determining how many effects can run concurrently. This guide delves into sequential execution, numbered concurrency, unbounded concurrency, and the flexible inherit concurrency option.

## Options Type

```ts
type Options = {
  readonly concurrency?: Concurrency
  /* ... other options ... */
}
```

## Concurrency Type

```ts
type Concurrency = number | "unbounded" | "inherit"
```

## Sequential Execution (Default)

By default, effects run sequentially, one after the other.

```ts
import { Effect, Duration } from "effect"

const makeTask = (n: number, delay: Duration.DurationInput) =>
  Effect.promise(
    () =>
      new Promise<void>((resolve) => {
        console.log(`start task${n}`)
        setTimeout(() => {
          console.log(`task${n} done`)
          resolve()
        }, Duration.toMillis(delay))
      })
  )

const task1 = makeTask(1, "200 millis")
const task2 = makeTask(2, "100 millis")

const sequential = Effect.all([task1, task2])

Effect.runPromise(sequential)
/*
Output:
start task1
task1 done
start task2
task2 done
*/
```

## Numbered Concurrency

Control the number of concurrent operations with the `concurrency` option.

```ts
import { Effect, Duration } from "effect"

const makeTask = (n: number, delay: Duration.DurationInput) =>
  Effect.promise(
    () =>
      new Promise<void>((resolve) => {
        console.log(`start task${n}`)
        setTimeout(() => {
          console.log(`task${n} done`)
          resolve()
        }, Duration.toMillis(delay))
      })
  )

const task1 = makeTask(1, "200 millis")
const task2 = makeTask(2, "100 millis")
const task3 = makeTask(3, "210 millis")
const task4 = makeTask(4, "110 millis")
const task5 = makeTask(5, "150 millis")

const number = Effect.all([task1, task2, task3, task4, task5], {
  concurrency: 2
})

Effect.runPromise(number)
/*
Output:
start task1
start task2
task2 done
start task3
task1 done
start task4
task4 done
start task5
task3 done
task5 done
*/
```

## Unbounded Concurrency

Set `concurrency: "unbounded"` to allow as many effects as needed to run concurrently.

```ts
import { Effect, Duration } from "effect"

const makeTask = (n: number, delay: Duration.DurationInput) =>
  Effect.promise(
    () =>
      new Promise<void>((resolve) => {
        console.log(`start task${n}`)
        setTimeout(() => {
          console.log(`task${n} done`)
          resolve()
        }, Duration.toMillis(delay))
      })
  )

const task1 = makeTask(1, "200 millis")
const task2 = makeTask(2, "100 millis")
const task3 = makeTask(3, "210 millis")
const task4 = makeTask(4, "110 millis")
const task5 = makeTask(5, "150 millis")

const unbounded = Effect.all([task1, task2, task3, task4, task5], {
  concurrency: "unbounded"
})

Effect.runPromise(unbounded)
/*
Output:
start task1
start task2
start task3
start task4
start task5
task2 done
task4 done
task5 done
task1 done
task3 done
*/
```

## Inherit Concurrency

The `concurrency: "inherit"` option adapts based on context, controlled by `Effect.withConcurrency(number | "unbounded")`.

If there's no `Effect.withConcurrency` call, the default is `"unbounded"`.

```ts
import { Effect, Duration } from "effect"

const makeTask = (n: number, delay: Duration.DurationInput) =>
  Effect.promise(
    () =>
      new Promise<void>((resolve) => {
        console.log(`start task${n}`)
        setTimeout(() => {
          console.log(`task${n} done`)
          resolve()
        }, Duration.toMillis(delay))
      })
  )

const task1 = makeTask(1, "200 millis")
const task2 = makeTask(2, "100 millis")
const task3 = makeTask(3, "210 millis")
const task4 = makeTask(4, "110 millis")
const task5 = makeTask(5, "150 millis")

const inherit = Effect.all([task1, task2, task3, task4, task5], {
  concurrency: "inherit"
})

Effect.runPromise(inherit)
/*
Output:
start task1
start task2
start task3
start task4
start task5
task2 done
task4 done
task5 done
task1 done
task3 done
*/
```

Using `Effect.withConcurrency`, it will adopt that specific concurrency configuration.

```ts
import { Effect, Duration } from "effect"

const makeTask = (n: number, delay: Duration.DurationInput) =>
  Effect.promise(
    () =>
      new Promise<void>((resolve) => {
        console.log(`start task${n}`)
        setTimeout(() => {
          console.log(`task${n} done`)
          resolve()
        }, Duration.toMillis(delay))
      })
  )

const task1 = makeTask(1, "200 millis")
const task2 = makeTask(2, "100 millis")
const task3 = makeTask(3, "210 millis")
const task4 = makeTask(4, "110 millis")
const task5 = makeTask(5, "150 millis")

const inherit = Effect.all([task1, task2, task3, task4, task5], {
  concurrency: "inherit"
})

const withConcurrency = inherit.pipe(Effect.withConcurrency(2))

Effect.runPromise(withConcurrency)
/*
Output:
start task1
start task2
task2 done
start task3
task1 done
start task4
task4 done
start task5
task3 done
task5 done
*/
```