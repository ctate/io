# Introduction to Effect's Interruption Model

Explore the intricacies of Effect's interruption model, a crucial aspect in concurrent application development. Learn the nuances of handling fiber interruptions, including scenarios such as parent fibers terminating child fibers, racing fibers, user-initiated interruptions, and timeouts. Delve into the comparison between polling and asynchronous interruption, understanding the advantages of the latter in maintaining consistency and adhering to functional paradigms. Gain insights into when fibers get interrupted, providing examples and scenarios for a comprehensive understanding of this vital feature.

## Handling Fiber Interruption

In concurrent applications, fibers may need to be interrupted for various reasons:

1. A parent fiber may start child fibers for a task and later decide that the results are no longer needed.
2. Multiple fibers may race against each other, with the first to complete winning and the others needing interruption.
3. Users may want to stop running tasks, such as clicking a "stop" button.
4. Long-running computations should be aborted using timeouts.
5. If user input changes during compute-intensive tasks, the current task should be canceled.

## Polling vs. Asynchronous Interruption

A naive approach to interrupting fibers is to allow one fiber to forcefully terminate another, which can lead to inconsistent shared states. Instead, two valid solutions are:

1. **Semi-asynchronous Interruption (Polling for Interruption)**: In this model, a fiber sends an interruption request to another fiber, which continuously polls for this status. If an interruption is detected, the target fiber terminates itself. However, if the programmer forgets to poll, the target fiber may become unresponsive, leading to deadlocks.

2. **Asynchronous Interruption**: Here, a fiber can terminate another without polling. During critical sections, the target fiber disables interruption. This solution is purely functional and avoids the drawbacks of polling, allowing for computation to be aborted at any point except during critical sections.

## When Does a Fiber Get Interrupted?

Fibers can be interrupted in several ways:

### Calling Effect.interrupt

A fiber can be interrupted by invoking the `Effect.interrupt` operator.

**Without interruptions:**

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.log("done")
})

Effect.runPromise(program).catch((error) =>
  console.log(`interrupted: ${error}`)
)
```

**With interruptions:**

```ts {6}
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.interrupt
  yield* Effect.log("done")
})

Effect.runPromiseExit(program).then(console.log)
```

### Interruption of Concurrent Effects

When using functions like `Effect.forEach` to combine multiple concurrent effects, if one effect is interrupted, all others will also be interrupted.

```ts
import { Effect } from "effect"

const program = Effect.forEach(
  [1, 2, 3],
  (n) =>
    Effect.gen(function* () {
      yield* Effect.log(`start #${n}`)
      yield* Effect.sleep(`${n} seconds`)
      if (n > 1) {
        yield* Effect.interrupt
      }
      yield* Effect.log(`done #${n}`)
    }),
  { concurrency: "unbounded" }
)

Effect.runPromiseExit(program).then((exit) =>
  console.log(JSON.stringify(exit, null, 2))
)
```

In this example, the array `[1, 2, 3]` represents three concurrent tasks. The task with `n = 1` completes successfully, while the task with `n = 2` is interrupted, leading to the interruption of all fibers.