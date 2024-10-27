# Examples

## Making API Calls and Handling Timeouts

For our API calls to third-party services, we have a few requirements. We want to ensure that if the entire function takes more than `4` seconds to execute, it's interrupted. Additionally, we'll set up the system to retry the API call a maximum of `2` times.

**Solution**

```ts
import { NodeRuntime } from "@effect/platform-node"
import { Console, Effect } from "effect"

const getJson = (url: string) =>
  Effect.tryPromise(() =>
    fetch(url).then((res) => {
      if (!res.ok) {
        console.log("error")
        throw new Error(res.statusText)
      }
      console.log("ok")
      return res.json() as unknown
    })
  )

const program = (url: string) =>
  getJson(url).pipe(
    Effect.retry({ times: 2 }),
    Effect.timeout("4 seconds"),
    Effect.catchAll(Console.error)
  )

// testing the happy path
NodeRuntime.runMain(program("https://dummyjson.com/products/1?delay=1000"))
/*
Output:
ok
*/

// testing the timeout
// NodeRuntime.runMain(program("https://dummyjson.com/products/1?delay=5000"))
/*
Output:
TimeoutException
*/

// testing API errors
// NodeRuntime.runMain(
//   program("https://dummyjson.com/auth/products/1?delay=500")
// )
/*
Output:
error
error
error
UnknownException: Forbidden
*/
```

## Implementing Conditional Retries

We want to implement a mechanism to retry an API call only if it encounters certain types of errors.

**Solution**

```ts
import { NodeRuntime } from "@effect/platform-node"
import { Console, Effect } from "effect"

class Err extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
  }
}

const getJson = (url: string) =>
  Effect.tryPromise({
    try: () =>
      fetch(url).then((res) => {
        if (!res.ok) {
          console.log(res.status)
          throw new Err(res.statusText, res.status)
        }
        return res.json() as unknown
      }),
    catch: (e) => e as Err
  })

const program = (url: string) =>
  getJson(url).pipe(
    // Retry if the error is a 403
    Effect.retry({ while: (err) => err.status === 403 }),
    Effect.catchAll(Console.error)
  )

// testing 403
NodeRuntime.runMain(
  program("https://dummyjson.com/auth/products/1?delay=1000")
)
/*
Output:
403
403
403
403
...
*/

// testing 404
// NodeRuntime.runMain(program("https://dummyjson.com/-"))
/*
Output:
404
Err [Error]: Not Found
*/
```

## Running Scheduled Effects Until Completion

We can use schedules to run an effect periodically until another long-running effect completes. This can be useful for tasks like polling or periodic logging.

**Solution**

```ts
import { Effect, Console, Schedule } from "effect"

const longRunningEffect = Console.log("done").pipe(Effect.delay("5 seconds"))

const action = Console.log("action...")

const schedule = Schedule.fixed("1.5 seconds")

const program = Effect.race(
  Effect.repeat(action, schedule),
  longRunningEffect
)

Effect.runPromise(program)
/*
Output:
action...
action...
action...
action...
done
*/
```