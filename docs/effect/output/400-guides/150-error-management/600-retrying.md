# Retrying

Learn how to enhance the resilience of your applications by mastering the retrying capabilities of Effect. Explore `retry`, `retryN`, and `retryOrElse` functions, along with scheduling policies, to automatically handle transient failures. Whether dealing with network requests, database interactions, or other error-prone operations, discover how Effect simplifies the implementation of robust retry strategies.

In software development, it's common to encounter situations where an operation may fail temporarily due to various factors such as network issues, resource unavailability, or external dependencies. In such cases, it's often desirable to retry the operation automatically, allowing it to succeed eventually.

Retrying is a powerful mechanism to handle transient failures and ensure the successful execution of critical operations. In Effect, retrying is made simple and flexible with built-in functions and scheduling strategies.

This guide explores the concept of retrying in Effect and how to use the `retry` and `retryOrElse` functions to handle failure scenarios. We'll see how to define retry policies using schedules, which dictate when and how many times the operation should be retried.

To demonstrate the functionality of different retry functions, we will be working with the following helper that simulates an effect with possible failures:

```typescript
import { Effect } from "effect"

let count = 0

// Simulates an effect with possible failures
export const effect = Effect.async<string, Error>((resume) => {
  if (count <= 2) {
    count++
    console.log("failure")
    resume(Effect.fail(new Error()))
  } else {
    console.log("success")
    resume(Effect.succeed("yay!"))
  }
})
```

## retry

The basic syntax of `retry` is as follows:

```typescript
Effect.retry(effect, policy)
```

**Example**

```typescript
import { Effect, Schedule } from "effect"
import { effect } from "./fake"

// Define a repetition policy using a fixed delay between retries
const policy = Schedule.fixed("100 millis")

const repeated = Effect.retry(effect, policy)

Effect.runPromise(repeated).then(console.log)
/*
Output:
failure
failure
failure
success
yay!
*/
```

## retry n times

There is a shortcut when the policy is trivial and the failed effect is immediately retried:

```typescript
import { Effect } from "effect"
import { effect } from "./fake"

Effect.runPromise(Effect.retry(effect, { times: 5 }))
/*
Output:
failure
failure
failure
success
*/
```

## retryOrElse

There is another version of `retry` that allows us to define a fallback strategy in case of errors. If something goes wrong, we can handle it using the `retryOrElse` function. It lets us add an `orElse` callback that will run when the repetition fails.

The basic syntax of `retryOrElse` is as follows:

```typescript
Effect.retryOrElse(effect, policy, fallback)
```

**Example**

```typescript
import { Effect, Schedule, Console } from "effect"
import { effect } from "./fake"

const policy = Schedule.addDelay(
  Schedule.recurs(2), // Retry for a maximum of 2 times
  () => "100 millis" // Add a delay of 100 milliseconds between retries
)

// Create a new effect that retries the effect with the specified policy,
// and provides a fallback effect if all retries fail
const repeated = Effect.retryOrElse(effect, policy, () =>
  Console.log("orElse").pipe(Effect.as("default value"))
)

Effect.runPromise(repeated).then(console.log)
/*
Output:
failure
failure
failure
orElse
default value
*/
```

## Retrying Based on a Condition

You can manage how an effect is retried by specifying conditions using either the `while` or `until` options.

```typescript
import { Effect } from "effect"

let count = 0

// Define an effect that simulates varying error on each invocation
const action = Effect.failSync(() => {
  console.log(`Action called ${++count} time(s)`)
  return `Error ${count}`
})

// Retry the action until a specific condition is met
const program = Effect.retry(action, { until: (err) => err === "Error 3" })

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Action called 1 time(s)
Action called 2 time(s)
Action called 3 time(s)
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Error 3' }
}
*/
```

Consider using Effect.repeat to set conditions based on successful outcomes rather than errors.