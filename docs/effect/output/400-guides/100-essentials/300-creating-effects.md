# Creating Effects

Learn various methods to create effects in the Effect ecosystem. Understand the drawbacks of throwing errors in traditional programming and explore constructors like `Effect.succeed` and `Effect.fail` for explicit success and failure handling. Dive into modeling synchronous effects with `Effect.sync` and `Effect.try`, and asynchronous effects with `Effect.promise` and `Effect.tryPromise`. Explore `Effect.async` for callback-based APIs and `Effect.suspend` for deferred effect evaluation. Check out a cheatsheet summarizing available constructors.

Effect provides different ways to create effects, which are units of computation that encapsulate side effects. In this guide, we will cover some of the common methods that you can use to create effects.

## Why Not Throw Errors?

In traditional programming, when an error occurs, it is often handled by throwing an exception:

```ts
const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("Cannot divide by zero")
  }
  return a / b
}
```

However, throwing errors can be problematic. The type signatures of functions do not indicate that they can throw exceptions, making it difficult to reason about potential errors.

To address this issue, Effect introduces dedicated constructors for creating effects that represent both success and failure: `Effect.succeed` and `Effect.fail`. These constructors allow you to explicitly handle success and failure cases while leveraging the type system to track errors.

### succeed

The `Effect.succeed` constructor in the Effect library is used to explicitly create an effect that is guaranteed to succeed. Here's how you can use it:

```ts
import { Effect } from "effect"

const success = Effect.succeed(42)
```

In this example, `success` is an instance of `Effect<number, never, never>`. This means it's an effect that:

- Always succeeds, yielding a value of type `number`.
- Does not generate any errors (`never` indicates that no errors are expected).
- Requires no additional data or dependencies from the environment (`never` indicates no requirements).

### fail

When a computation might fail, it's essential to manage the failure explicitly. The `Effect.fail` constructor allows you to encapsulate an error within your program flow explicitly. This method is useful for representing known error states in a predictable and type-safe way. Here's a practical example to illustrate:

```ts
import { Effect } from "effect"

// Creating an effect that represents a failure scenario
const failure = Effect.fail(
  new Error("Operation failed due to network error")
)
```

The type of `failure` is `Effect<never, Error, never>`, which means:

- It never produces a successful value (`never`).
- It fails with an error, specifically an `Error`.
- It does not depend on any external context to execute (`never`).

While you can use `Error` objects with `Effect.fail`, it also supports strings, numbers, or more complex objects, depending on your error management strategy. However, using "tagged" errors, which are objects with a `_tag` field, helps identify error types and integrates well with standard Effect functions.

```ts
import { Effect } from "effect"

class NetworkError {
  readonly _tag = "NetworkError"
}

const failure = Effect.fail(new NetworkError())
```

With `Effect.succeed` and `Effect.fail`, you can explicitly handle success and failure cases, and the type system will ensure that errors are tracked and accounted for.

**Example: Rewriting a Division Function**

Let's see an example of rewriting the `divide` function using Effect to make the error handling explicit:

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)
```

In this example, the `divide` function explicitly indicates that it can produce an effect that either fails with an `Error` or succeeds with a `number` value. The type signature makes it clear how errors are handled and ensures that callers are aware of the possible outcomes.

**Example: Simulating a User Retrieval Operation**

Let's imagine another scenario where we use `Effect.succeed` and `Effect.fail` to model a simple user retrieval operation where the user data is hardcoded, which could be useful in testing scenarios or when mocking data:

```ts
import { Effect } from "effect"

// Define a User type
interface User {
  readonly id: number
  readonly name: string
}

// A mocked function to simulate fetching a user from a database
const getUser = (userId: number): Effect.Effect<User, Error> => {
  const userDatabase: Record<number, User> = {
    1: { id: 1, name: "John Doe" },
    2: { id: 2, name: "Jane Smith" }
  }

  const user = userDatabase[userId]
  if (user) {
    return Effect.succeed(user)
  } else {
    return Effect.fail(new Error("User not found"))
  }
}

// When executed, this will successfully return the user with id 1
const exampleUserEffect = getUser(1)
```

In this example, `exampleUserEffect` can result in either a `User` object or an `Error`, depending on whether the user exists in the simulated database.

## Modeling Synchronous Effects

In JavaScript, you can delay the execution of synchronous computations using "thunks".

A "thunk" is a function that takes no arguments and may return some value.

Thunks are useful for delaying the computation of a value until it is needed.

To model synchronous side effects, Effect provides the `Effect.sync` and `Effect.try` constructors, which accept a thunk.

### sync

When working with side effects that are synchronous — meaning they don't involve asynchronous operations like fetching data from the internet — you can use the `Effect.sync` function. This function is ideal when you are certain these operations won't produce any errors.

**Example: Logging a Message**

```ts
import { Effect } from "effect"

const log = (message: string) =>
  Effect.sync(() => {
    console.log(message) // side effect
  })

const program = log("Hello, World!")
```

In the above example, `Effect.sync` is used to defer the side-effect of writing to the console.

The `program` has the type `Effect<void, never, never>`, indicating that:

- It doesn't produce a return value (`void`).
- It's not expected to fail (`never` indicates no expected errors).
- It doesn't require any external dependencies or context (`never`).

Important Notes:

- **Execution**: The side effect (logging to the console) encapsulated within `program` won't occur until the effect is explicitly run. This allows you to define side effects at one point in your code and control when they are activated, improving manageability and predictability of side effects in larger applications.
- **Error Handling**: It's crucial that the function you pass to `Effect.sync` does not throw any errors. If you anticipate potential errors, consider using `try` instead, which handles errors gracefully.

The thunk passed to `Effect.sync` should never throw errors.

**Handling Unexpected Errors**. Despite your best efforts to avoid errors in the function passed to `Effect.sync`, if an error does occur, it results in a "defect". This defect is not a standard error but indicates a flaw in the logic that was expected to be error-free. You can think of it similar to an unexpected crash in the program, which can be further managed or logged using tools like `Effect.catchAllDefect`. This feature ensures that even unexpected failures in your application are not lost and can be handled appropriately.

### try

In situations where you need to perform synchronous operations that might fail, such as parsing JSON, you can use the `Effect.try` constructor from the Effect library. This constructor is designed to handle operations that could throw exceptions by capturing those exceptions and transforming them into manageable errors within the Effect framework.

**Example: Safe JSON Parsing**

Suppose you have a function that attempts to parse a JSON string. This operation can fail and throw an error if the input string is not properly formatted as JSON:

```ts
import { Effect } from "effect"

const parse = (input: string) =>
  Effect.try(
    () => JSON.parse(input) // This might throw an error if input is not valid JSON
  )

const program = parse("")
```

In this example:

- `parse` is a function that creates an effect encapsulating the JSON parsing operation.
- If `JSON.parse(input)` throws an error due to invalid input, `Effect.try` catches this error and the effect represented by `program` will fail with an `UnknownException`. This ensures that errors are not silently ignored but are instead handled within the structured flow of effects.

**Customizing Error Handling**. You might want to transform the caught exception into a more specific error or perform additional operations when catching an error. `Effect.try` supports an overload that allows you to specify how caught exceptions should be transformed:

**Example: Custom Error Handling**

```ts
import { Effect } from "effect"

const parse = (input: string) =>
  Effect.try({
    try: () => JSON.parse(input), // JSON.parse may throw for bad input
    catch: (unknown) => new Error(`something went wrong ${unknown}`) // remap the error
  })

const program = parse("")
```

## Modeling Asynchronous Effects

In traditional programming, we often use `Promise`s to handle asynchronous computations. However, dealing with errors in promises can be problematic. By default, `Promise<Value>` only provides the type `Value` for the resolved value, which means errors are not reflected in the type system. This limits the expressiveness and makes it challenging to handle and track errors effectively.

To overcome these limitations, Effect introduces dedicated constructors for creating effects that represent both success and failure in an asynchronous context: `Effect.promise` and `Effect.tryPromise`. These constructors allow you to explicitly handle success and failure cases while leveraging the type system to track errors.

### promise

This constructor is similar to a regular `Promise`, where you're confident that the asynchronous operation will always succeed. It allows you to create an `Effect` that represents successful completion without considering potential errors. However, it's essential to ensure that the underlying Promise never rejects.

**Example: Delayed Message**

```ts
import { Effect } from "effect"

const delay = (message: string) =>
  Effect.promise<string>(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(message)
        }, 2000)
      })
  )

const program = delay("Async operation completed successfully!")
```

The `program` value has the type `Effect<string, never, never>` and can be interpreted as an effect that:

- succeeds with a value of type `string`
- does not produce any expected error (`never`)
- does not require any context (`never`)

The `Promise` within the thunk passed to `Effect.promise` should never reject.

**Handling Unexpected Errors**. If, despite precautions, the thunk passed to `Effect.promise` does reject, an `Effect` containing a "defect" is created, similar to what happens when using the `Effect.die` function.

### tryPromise

Unlike `Effect.promise`, this constructor is suitable when the underlying `Promise` might reject. It provides a way to catch errors and handle them appropriately. By default, if an error occurs, it will be caught and propagated to the error channel as an `UnknownException`.

**Example: Fetching a TODO Item**

```ts
import { Effect } from "effect"

const getTodo = (id: number) =>
  Effect.tryPromise(() =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  )

const program = getTodo(1)
```

The `program` value has the type `Effect<Response, UnknownException, never>` and can be interpreted as an effect that:

- succeeds with a value of type `Response`
- might produce an error (`UnknownException`)
- does not require any context (`never`)

**Customizing Error Handling**. If you want more control over what gets propagated to the error channel, you can use an overload of `Effect.tryPromise` that takes a remapping function:

```ts
import { Effect } from "effect"

const getTodo = (id: number) =>
  Effect.tryPromise({
    try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
    catch: (unknown) => new Error(`something went wrong ${unknown}`)
  })

const program = getTodo(1)
```

## From a callback

Sometimes you have to work with APIs that don't support `async/await` or `Promise` and instead use the callback style. To handle callback-based APIs, Effect provides the `Effect.async` constructor.

**Example: Reading a File**

For example, let's wrap the `readFile` async API from the Node.js `fs` module with Effect:

```ts
import { Effect } from "effect"
import * as NodeFS from "node:fs"

const readFile = (filename: string) =>
  Effect.async<Buffer, Error>((resume) => {
    NodeFS.readFile(filename, (error, data) => {
      if (error) {
        resume(Effect.fail(error))
      } else {
        resume(Effect.succeed(data))
      }
    })
  })

const program = readFile("todos.txt")
```

In the above example, we manually annotate the types when calling `Effect.async` because TypeScript cannot infer the type parameters for a callback based on the return value inside the callback body. Annotating the types ensures that the values provided to `resume` match the expected types.

You can seamlessly mix synchronous and asynchronous code within the Effect framework. Everything becomes an Effect, enabling you to handle different types of side effects in a unified way.

## Suspended Effects

`Effect.suspend` is used to delay the creation of an effect. It allows you to defer the evaluation of an effect until it is actually needed. The `Effect.suspend` function takes a thunk that represents the effect, and it wraps it in a suspended effect.

```ts
const suspendedEffect = Effect.suspend(() => effect)
```

Let's explore some common scenarios where `Effect.suspend` proves useful:

1. **Lazy Evaluation**. When you want to defer the evaluation of an effect until it is required. This can be useful for optimizing the execution of effects, especially when they are not always needed or when their computation is expensive.

   Also, when effects with side effects or scoped captures are created, use `Effect.suspend` to re-execute on each invocation.

   ```ts
   import { Effect } from "effect"

   let i = 0

   const bad = Effect.succeed(i++)

   const good = Effect.suspend(() => Effect.succeed(i++))

   console.log(Effect.runSync(bad)) // Output: 0
   console.log(Effect.runSync(bad)) // Output: 0

   console.log(Effect.runSync(good)) // Output: 1
   console.log(Effect.runSync(good)) // Output: 2
   ```

   In this example, `bad` is the result of calling `Effect.succeed(i++)` a single time, which increments the scoped variable but returns its original value. `Effect.runSync(bad)` does not result in any new computation, because `Effect.succeed(i++)` has already been called. On the other hand, each time `Effect.runSync(good)` is called, the thunk passed to `Effect.suspend()` will be executed, outputting the scoped variable's most recent value.

2. **Handling Circular Dependencies**. `Effect.suspend` is helpful in managing circular dependencies between effects, where one effect depends on another, and vice versa. For example, it's fairly common for `Effect.suspend` to be used in recursive functions to escape an eager call.

   ```ts
   import { Effect } from "effect"

   const blowsUp = (n: number): Effect.Effect<number> =>
     n < 2
       ? Effect.succeed(1)
       : Effect.zipWith(blowsUp(n - 1), blowsUp(n - 2), (a, b) => a + b)

   const allGood = (n: number): Effect.Effect<number> =>
     n < 2
       ? Effect.succeed(1)
       : Effect.zipWith(
           Effect.suspend(() => allGood(n - 1)),
           Effect.suspend(() => allGood(n - 2)),
           (a, b) => a + b
         )

   console.log(Effect.runSync(allGood(32))) // Output: 3524578
   ```

   The `blowsUp` function creates a recursive Fibonacci sequence without deferring execution. Each call to `blowsUp` triggers further immediate recursive calls, rapidly increasing the JavaScript call stack size.

   Conversely, `allGood` avoids stack overflow by using `Effect.suspend` to defer the recursive calls. This mechanism doesn't immediately execute the recursive effects but schedules them to be run later, thus keeping the call stack shallow and preventing a crash.

3. **Unifying Return Type**. In situations where TypeScript struggles to unify the returned effect type, `Effect.suspend` can be employed to resolve this issue.

   ```ts
   import { Effect } from "effect"

   const ugly = (a: number, b: number) =>
     b === 0
       ? Effect.fail(new Error("Cannot divide by zero"))
       : Effect.succeed(a / b)

   const nice = (a: number, b: number) =>
     Effect.suspend(() =>
       b === 0
         ? Effect.fail(new Error("Cannot divide by zero"))
         : Effect.succeed(a / b)
     )
   ```

## Cheatsheet

The table provides a summary of the available constructors, along with their input and output types, allowing you to choose the appropriate function based on your needs.

| **Function**            | **Given**                          | **To**                        |
| ----------------------- | ---------------------------------- | ----------------------------- |
| `succeed`               | `A`                                | `Effect<A>`                   |
| `fail`                  | `E`                                | `Effect<never, E>`            |
| `sync`                  | `() => A`                          | `Effect<A>`                   |
| `try`                   | `() => A`                          | `Effect<A, UnknownException>` |
| `try` (overload)        | `() => A`, `unknown => E`          | `Effect<A, E>`                |
| `promise`               | `() => Promise<A>`                 | `Effect<A>`                   |
| `tryPromise`            | `() => Promise<A>`                 | `Effect<A, UnknownException>` |
| `tryPromise` (overload) | `() => Promise<A>`, `unknown => E` | `Effect<A, E>`                |
| `async`                 | `(Effect<A, E> => void) => void`   | `Effect<A, E>`                |
| `suspend`               | `() => Effect<A, E, R>`            | `Effect<A, E, R>`             |

You can find the complete list of constructors here.

Now that we know how to create effects, it's time to learn how to run them. Check out the next guide on Running Effects to find out more.