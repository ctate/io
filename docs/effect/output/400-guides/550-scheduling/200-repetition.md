# Repetition

Discover the significance of repetition in effect-driven software development with functions like `repeat` and `repeatOrElse`. Explore repeat policies, which enable you to execute effects multiple times according to specific criteria. Learn the syntax and examples of `repeat` and `repeatOrElse` for effective handling of repeated actions, including optional fallback strategies for errors.

Repetition is a common requirement when working with effects in software development. It allows us to perform an effect multiple times according to a specific repetition policy.

## repeat

The `Effect.repeat` function returns a new effect that repeats the given effect according to a specified schedule or until the first failure.

**Warning**: The scheduled recurrences are in addition to the initial execution, so `Effect.repeat(action, Schedule.once)` executes `action` once initially, and if it succeeds, repeats it an additional time.

**Success Example**

```ts
import { Effect, Schedule, Console } from "effect"

const action = Console.log("success")

const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis")

const program = Effect.repeat(action, policy)

Effect.runPromise(program).then((n) => console.log(`repetitions: ${n}`))
/*
Output:
success
success
success
repetitions: 2
*/
```

**Failure Example**

```ts
import { Effect, Schedule } from "effect"

let count = 0

const action = Effect.async<string, string>((resume) => {
  if (count > 1) {
    console.log("failure")
    resume(Effect.fail("Uh oh!"))
  } else {
    count++
    console.log("success")
    resume(Effect.succeed("yay!"))
  }
})

const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis")

const program = Effect.repeat(action, policy)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
success
success
failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' }
}
*/
```

### Skipping the First Occurrence

If you want to skip the first occurrence of a repeat, you can use `Effect.schedule`:

```ts
import { Effect, Schedule, Console } from "effect"

const action = Console.log("success")

const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis")

const program = Effect.schedule(action, policy)

Effect.runPromise(program).then((n) => console.log(`repetitions: ${n}`))
/*
Output:
success
success
repetitions: 2
*/
```

## repeatN

The `repeatN` function returns a new effect that repeats the specified effect a given number of times or until the first failure. The repeats are in addition to the initial execution, so `Effect.repeatN(action, 1)` executes `action` once initially and then repeats it one additional time if it succeeds.

```ts
import { Effect, Console } from "effect"

const action = Console.log("success")

const program = Effect.repeatN(action, 2)

Effect.runPromise(program)
/*
Output:
success
success
success
*/
```

## repeatOrElse

The `repeatOrElse` function returns a new effect that repeats the specified effect according to the given schedule or until the first failure. When a failure occurs, the failure value and schedule output are passed to a specified handler. Scheduled recurrences are in addition to the initial execution, so `Effect.repeat(action, Schedule.once)` executes `action` once initially and then repeats it an additional time if it succeeds.

```ts
import { Effect, Schedule } from "effect"

let count = 0

const action = Effect.async<string, string>((resume) => {
  if (count > 1) {
    console.log("failure")
    resume(Effect.fail("Uh oh!"))
  } else {
    count++
    console.log("success")
    resume(Effect.succeed("yay!"))
  }
})

const policy = Schedule.addDelay(
  Schedule.recurs(2),
  () => "100 millis"
)

const program = Effect.repeatOrElse(action, policy, () =>
  Effect.sync(() => {
    console.log("orElse")
    return count - 1
  })
)

Effect.runPromise(program).then((n) => console.log(`repetitions: ${n}`))
/*
Output:
success
success
failure
orElse
repetitions: 1
*/
```

## Repeating Based on a Condition

You can control the repetition of an effect by a condition using either a `while` or `until` option, allowing for dynamic control based on runtime outcomes.

```ts
import { Effect } from "effect"

let count = 0

const action = Effect.sync(() => {
  console.log(`Action called ${++count} time(s)`)
  return count
})

const program = Effect.repeat(action, { until: (n) => n === 3 })

Effect.runFork(program)
/*
Output:
Action called 1 time(s)
Action called 2 time(s)
Action called 3 time(s)
*/
```

Consider using Effect.retry to set conditions based on errors rather than successful outcomes.