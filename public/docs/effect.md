---
title: Welcome to Effect
navTitle: Introduction
excerpt: Effect is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs.
bottomNavigation: pagination
---

Welcome to the Effect documentation!

## What is Effect?

Effect is a powerful TypeScript library designed to help developers
easily create complex, synchronous, and asynchronous programs.

## Main Features

Some of the main Effect features include:

| **Feature**         | **Description**                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Concurrency**     | Achieve highly-scalable, ultra low-latency applications through Effect's fiber-based concurrency model.            |
| **Composability**   | Construct highly maintainable, readable, and flexible software through the use of small, reusable building blocks. |
| **Resource Safety** | Safely manage acquisition and release of resources, even when your program fails.                                  |
| **Type Safety**     | Leverage the TypeScript type system to the fullest with Effect's focus on type inference and type safety.          |
| **Error Handling**  | Handle errors in a structured and reliable manner using Effect's built-in error handling capabilities.             |
| **Asynchronicity**  | Write code that looks the same, whether it is synchronous or asynchronous.                                         |
| **Observability**   | With full tracing capabilities, you can easily debug and monitor the execution of your Effect program.             |

## How to Use These Docs

The documentation is structured in a sequential manner, starting from the basics and progressing to more advanced topics. This allows you to follow along step-by-step as you build your Effect application. However, you have the flexibility to read the documentation in any order or jump directly to the pages that are relevant to your specific use case.

To facilitate navigation within a page, you will find a table of contents on the right side of the screen. This allows you to easily jump between different sections of the page.

## Join our Community

If you have questions about anything related to Effect,
you're always welcome to ask our community on [Discord](https://discord.gg/effect-ts).


# Why Effect?

## Motivation

Programming is challenging. When building libraries and apps, we rely on various tools to manage complexity. Effect presents a new way of thinking about programming in TypeScript, offering an ecosystem of tools to enhance application and library development. This approach helps you learn more about TypeScript and utilize the type system for improved reliability and maintainability.

In typical TypeScript, functions are assumed to either succeed or throw exceptions. For example, consider the following division function:

```ts
const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("Cannot divide by zero")
  }
  return a / b
}
```

The type signature does not indicate that this function can throw an exception, which can lead to oversight in larger codebases. Developers often resort to wrapping functions in `try/catch` blocks, which, while preventing crashes, do not simplify the management of complex applications or libraries. 

The TypeScript compiler serves as the first line of defense against bugs and complexity.

## The Effect Pattern

Effect's core insight is using the type system to track errors and context, not just success values. Here’s the same divide function using the Effect pattern:

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number, Error, never> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)
```

The type signature clearly indicates the success value (`number`), possible errors (`Error`), and required context (`never`). This function no longer throws exceptions, allowing errors to be passed cleanly to the caller. Effect provides functions to manage errors and success values ergonomically, and tracking context enables additional information to be provided without cluttering function arguments.

## Effect's Ecosystem

This unique insight has led to a rich ecosystem of libraries that simplify building complex applications in TypeScript. Effect's ecosystem is rapidly growing, with a list available on Effect's GitHub.

## Don't Re-Invent the Wheel

TypeScript application code often addresses common problems like interacting with external services, filesystems, and databases. Effect offers a comprehensive library ecosystem that provides standardized solutions for these challenges. It simplifies error handling, debugging, tracing, async/promises, retries, streaming, concurrency, caching, and resource management, reducing the need for multiple dependencies.

## Solving Practical Problems

Effect draws inspiration from languages like Scala and Haskell but aims to be a practical toolkit that addresses real-world developer challenges in TypeScript.

## Enjoy Building and Learning

Learning Effect can be enjoyable. Many developers use it to solve real problems and experiment with innovative ideas in TypeScript. You can adopt Effect incrementally, starting with the components that best address your needs. As you integrate more of Effect into your codebase, you may find yourself wanting to explore additional features.

Effect's concepts may initially seem unfamiliar, which is normal. Take your time to understand the core ideas, as this will benefit you when engaging with more advanced tools. The Effect community is supportive and encourages learning and growth. Engage with the community on Discord or GitHub for feedback and contributions.

# Quickstart

Learn how to set up a new Effect project from scratch in TypeScript, covering Node.js, Deno, Bun, and Vite + React environments. Follow step-by-step instructions for each platform to create a basic program using the Effect library.

In this tutorial, we will guide you through the process of setting up a new Effect project from scratch using plain TypeScript 5.4 or newer.

## Node.js

Follow these steps to create a new Effect project for Node.js:

1. Create a project directory and navigate into it:

   ```bash
   mkdir hello-effect
   cd hello-effect
   ```

2. Initialize a TypeScript project using npm (ensure TypeScript 5.0 or newer is installed):

   ```bash
   npm init -y
   npm install typescript --save-dev
   ```

3. Initialize TypeScript:

   ```bash
   npx tsc --init
   ```

   Open the `tsconfig.json` file and set the `strict` option to `true`:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

4. Install the necessary package as a dependency:

   ```bash
   npm install effect
   ```

5. Create a simple program:

   ```bash
   mkdir src
   touch src/index.ts
   ```

   Add the following code to `index.ts`:

   ```ts
   import { Effect, Console } from "effect"

   const program = Console.log("Hello, World!")

   Effect.runSync(program)
   ```

6. Run the program:

   ```bash
   npx tsx src/index.ts
   ```

   You should see the message "Hello, World!" printed.

## Deno

Follow these steps to create a new Effect project for Deno:

1. Create a project directory and navigate into it:

   ```bash
   mkdir hello-effect
   cd hello-effect
   ```

2. Initialize Deno:

   ```bash
   deno init
   ```

3. Create a simple program by replacing the content of `main.ts` with:

   ```ts
   import { Effect, Console } from "npm:effect"

   const program = Console.log("Hello, World!")

   Effect.runSync(program)
   ```

4. Run the program:

   ```bash
   deno run main.ts
   ```

   You should see the message "Hello, World!" printed.

## Bun

Follow these steps to create a new Effect project for Bun:

1. Create a project directory and navigate into it:

   ```bash
   mkdir hello-effect
   cd hello-effect
   ```

2. Initialize Bun:

   ```bash
   bun init
   ```

   Open the `tsconfig.json` file and set the `strict` option to `true`:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

3. Install the necessary package as a dependency:

   ```bash
   bun add effect
   ```

4. Create a simple program by replacing the content of `index.ts` with:

   ```ts
   import { Effect, Console } from "effect"

   const program = Console.log("Hello, World!")

   Effect.runSync(program)
   ```

5. Run the program:

   ```bash
   bun index.ts
   ```

   You should see the message "Hello, World!" printed.

## Vite + React

Follow these steps to create a new Effect project for Vite + React:

1. Scaffold your Vite project:

   ```bash
   npm create vite@latest hello-effect --template react-ts
   ```

   Navigate into the newly created project directory and install the required packages:

   ```bash
   cd hello-effect
   npm install
   ```

   Open the `tsconfig.json` file and set the `strict` option to `true`:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. Install the necessary `effect` package as a dependency:

   ```bash
   npm install effect
   ```

3. Create a simple program by replacing the content of `src/App.tsx` with:

   ```tsx
   import { useState, useMemo, useCallback } from "react"
   import reactLogo from "./assets/react.svg"
   import viteLogo from "/vite.svg"
   import "./App.css"
   import { Effect } from "effect"

   function App() {
     const [count, setCount] = useState(0)

     const task = useMemo(
       () => Effect.sync(() => setCount((current) => current + 1)),
       [setCount]
     )

     const increment = useCallback(() => Effect.runSync(task), [task])

     return (
       <>
         <div>
           <a href="https://vitejs.dev" target="_blank">
             <img src={viteLogo} className="logo" alt="Vite logo" />
           </a>
           <a href="https://react.dev" target="_blank">
             <img src={reactLogo} className="logo react" alt="React logo" />
           </a>
         </div>
         <h1>Vite + React</h1>
         <div className="card">
           <button onClick={increment}>count is {count}</button>
           <p>
             Edit <code>src/App.tsx</code> and save to test HMR
           </p>
         </div>
         <p className="read-the-docs">
           Click on the Vite and React logos to learn more
         </p>
       </>
     )
   }

   export default App
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Press **o** to open the application in your browser. When you click the button, you should see the counter increment.

# Importing Effect

Welcome to Effect! If you're just getting started, you might feel overwhelmed by the variety of modules and functions that Effect offers. However, rest assured that you don't need to worry about all of them right away. In this guide, we will provide you with a simple orientation on how to import modules and functions and assure you that, in most cases, installing the `effect` package is all you need to get started. Let's dive in!

## Installing Effect

To begin your journey with Effect, you first need to install the `effect` package. Open your terminal and run the following command:

```bash
npm install effect
```

```bash
pnpm add effect
```

```bash
yarn add effect
```

By installing this single package, you gain access to the core functionality of Effect.

For more detailed installation instructions on other platforms like Deno or Bun, refer to the Quickstart tutorial. This will provide you with step-by-step guidance to set up Effect on different environments.

## Importing Modules and Functions

Once you have installed the `effect` package, you can start using its modules and functions in your projects. Importing modules and functions is straightforward and follows the standard JavaScript/TypeScript import syntax.

To import a module or a function from the `effect` package, simply use the `import` statement at the top of your file. Here's how you can import the `Effect` module:

```ts
import { Effect } from "effect"
```

Now, you have access to the `Effect` module, which is the heart of the Effect library. It provides various functions to create, compose, and manipulate effectful computations.

## Namespace Imports

In addition to importing the `Effect` module with a named import, you can also import it using a namespace import like this:

```ts
import * as Effect from "effect/Effect"
```

Both forms of import allow you to access the functionalities provided by the `Effect` module. However, an important consideration is tree shaking, which refers to a process that eliminates unused code during the bundling of your application. Named imports may generate tree shaking issues when a bundler doesn't support deep scope analysis.

Bundlers that support deep scope analysis and thus don't have issues with named imports include:

- Rollup
- Webpack 5+

## Functions vs Methods

In the Effect ecosystem, libraries often expose functions rather than methods. This design choice is important for two key reasons: tree shakeability and extendibility.

### Tree Shakeability

Tree shakeability refers to the ability of a build system to eliminate unused code during the bundling process. Functions are tree shakeable, while methods are not. When functions are used in the Effect ecosystem, only the functions that are actually imported and used in your application will be included in the final bundled code. Unused functions are automatically removed, resulting in a smaller bundle size and improved performance.

On the other hand, methods are attached to objects or prototypes, and they cannot be easily tree shaken. Even if you only use a subset of methods, all methods associated with an object or prototype will be included in the bundle, leading to unnecessary code bloat.

### Extendibility

Another important advantage of using functions in the Effect ecosystem is the ease of extendibility. With methods, extending the functionality of an existing API often requires modifying the prototype of the object, which can be complex and error-prone. In contrast, with functions, extending the functionality is much simpler. You can define your own "extension methods" as plain old functions without the need to modify the prototypes of objects. This promotes cleaner and more modular code, and it also allows for better compatibility with other libraries and modules.

The use of functions in the Effect ecosystem libraries is important for achieving tree shakeability and ensuring extendibility. Functions enable efficient bundling by eliminating unused code, and they provide a flexible and modular approach to extending the libraries' functionality.

## Commonly Used Functions

As you start your adventure with Effect, you don't need to dive into every function in the `effect` package right away. Instead, focus on some commonly used functions that will provide a solid foundation for your journey into the world of Effect.

In the upcoming guides, we will explore some of these essential functions, specifically those for creating and running `Effect`s and building pipelines.

Before we dive into those, let's start from the very heart of Effect: understanding the `Effect` type. This will lay the groundwork for your understanding of how Effect brings composability, type safety, and error handling into your applications.

# The Effect Type

The `Effect<Success, Error, Requirements>` type represents an **immutable** value that **lazily** describes a workflow or job.

This type encapsulates the logic of a program, defining whether it succeeds, providing a value of type `Success`, or fails, resulting in an error of type `Error`. Additionally, the program requires a collection of contextual data `Context<Requirements>` to execute.

Conceptually, you can think of `Effect<Success, Error, Requirements>` as an effectful version of the following function type:

```ts
type Effect<Success, Error, Requirements> = (
  context: Context<Requirements>
) => Error | Success
```

However, effects are not actually functions. They can model synchronous, asynchronous, concurrent, and resourceful computations.

## Type Parameters

The `Effect` type has three type parameters with the following meanings:

- **Success**: Represents the type of value that an effect can succeed with when executed. If this type parameter is `void`, it means the effect produces no useful information, while if it is `never`, it means the effect runs forever (or until failure).
- **Error**: Represents the expected errors that can occur when executing an effect. If this type parameter is `never`, it means the effect cannot fail, because there are no values of type `never`.
- **Requirements**: Represents the contextual data required by the effect to be executed. This data is stored in a collection named `Context`. If this type parameter is `never`, it means the effect has no requirements and the `Context` collection is empty.

In the Effect ecosystem, you may often encounter the type parameters of `Effect` abbreviated as `A`, `E`, and `R` respectively. This is just shorthand for the success value of type **A**, **E**rror, and **R**equirements.

`Effect` values are immutable, and all Effect functions produce new `Effect` values.

`Effect` values do not actually do anything; they are just values that model or describe effectful interactions.

An `Effect` can be interpreted by the Effect Runtime System into effectful interactions with the external world. Ideally, this occurs at a single entry point in our application where the effectful interactions are initiated, such as the starting point of your program's execution.

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

# Running Effects

Explore various "run" functions in the Effect module to execute effects. Learn about `runSync` for synchronous execution, `runSyncExit` for obtaining results as `Exit`, `runPromise` for executing with a Promise result, and `runPromiseExit` for Promise results with `Exit`. Understand their use cases and considerations. 

To execute an `Effect`, we can utilize a variety of "run" functions provided by the `Effect` module.

## runSync

The `Effect.runSync` function is used to execute an Effect synchronously, which means it runs immediately and returns the result.

```ts
import { Effect } from "effect"

const program = Effect.sync(() => {
  console.log("Hello, World!")
  return 1
})

const result = Effect.runSync(program)
// Output: Hello, World!

console.log(result)
// Output: 1
```

If you check the console, you will see the message `"Hello, World!"` printed.

**Warning**: `Effect.runSync` will throw an error if your Effect fails or performs any asynchronous tasks. In the latter case, the execution will not proceed beyond that asynchronous task.

```ts
import { Effect } from "effect"

Effect.runSync(Effect.fail("my error")) // throws

Effect.runSync(Effect.promise(() => Promise.resolve(1))) // throws
```

## runSyncExit

The `Effect.runSyncExit` function is used to execute an Effect synchronously, which means it runs immediately and returns the result as an Exit (a data type used to describe the result of executing an Effect workflow).

```ts
import { Effect } from "effect"

const result1 = Effect.runSyncExit(Effect.succeed(1))
console.log(result1)
/*
Output:
{
  _id: "Exit",
  _tag: "Success",
  value: 1
}
*/

const result2 = Effect.runSyncExit(Effect.fail("my error"))
console.log(result2)
/*
Output:
{
  _id: "Exit",
  _tag: "Failure",
  cause: {
    _id: "Cause",
    _tag: "Fail",
    failure: "my error"
  }
}
*/
```

**Warning**: `Effect.runSyncExit` will throw an error if your Effect performs any asynchronous tasks and the execution will not proceed beyond that asynchronous task.

```ts
import { Effect } from "effect"

Effect.runSyncExit(Effect.promise(() => Promise.resolve(1))) // throws
```

## runPromise

The `Effect.runPromise` function is used to execute an Effect and obtain the result as a Promise.

```ts
import { Effect } from "effect"

Effect.runPromise(Effect.succeed(1)).then(console.log) // Output: 1
```

**Warning**: `Effect.runPromise` will reject with an error if your Effect fails.

```ts
import { Effect } from "effect"

Effect.runPromise(Effect.fail("my error")) // rejects
```

## runPromiseExit

The `Effect.runPromiseExit` function is used to execute an Effect and obtain the result as a Promise that resolves to an Exit (a data type used to describe the result of executing an Effect workflow).

```ts
import { Effect } from "effect"

Effect.runPromiseExit(Effect.succeed(1)).then(console.log)
/*
Output:
{
  _id: "Exit",
  _tag: "Success",
  value: 1
}
*/

Effect.runPromiseExit(Effect.fail("my error")).then(console.log)
/*
Output:
{
  _id: "Exit",
  _tag: "Failure",
  cause: {
    _id: "Cause",
    _tag: "Fail",
    failure: "my error"
  }
}
*/
```

## runFork

The `Effect.runFork` function serves as a foundational building block for running effects. In fact, all other run functions are built upon it. Unless you have a specific need for a Promise or a synchronous operation, `Effect.runFork` is the recommended choice. It returns a fiber that you can observe or interrupt as needed.

```ts
import { Effect, Console, Schedule, Fiber } from "effect"

const program = Effect.repeat(
  Console.log("running..."),
  Schedule.spaced("200 millis")
)

const fiber = Effect.runFork(program)

setTimeout(() => {
  Effect.runFork(Fiber.interrupt(fiber))
}, 500)
```

In this example, the `program` continuously logs "running..." with each repetition spaced 200 milliseconds apart. To stop the execution of the program, we use `Fiber.interrupt` on the fiber returned by `Effect.runFork`. This allows you to control the execution flow and terminate it when necessary.

## Cheatsheet

The recommended approach is to design your program with the majority of its logic as Effects. It's advisable to use the `run*` functions closer to the "edge" of your program. This approach allows for greater flexibility in executing your program and building sophisticated Effects.

The table provides a summary of the available `run*` functions, along with their input and output types, allowing you to choose the appropriate function based on your needs.

| **Name**         | **Given**      | **To**                |
| ---------------- | -------------- | --------------------- |
| `runSync`        | `Effect<A, E>` | `A`                   |
| `runSyncExit`    | `Effect<A, E>` | `Exit<A, E>`          |
| `runPromise`     | `Effect<A, E>` | `Promise<A>`          |
| `runPromiseExit` | `Effect<A, E>` | `Promise<Exit<A, E>>` |
| `runFork`        | `Effect<A, E>` | `RuntimeFiber<A, E>`  |

You can find the complete list of `run*` functions at effect-ts.github.io/effect/effect/Effect.ts.html#execution.

# Using Generators in Effect

Explore the syntax of using generators in Effect to write effectful code. Learn about the `Effect.gen` function. Compare `Effect.gen` with `async`/`await` for writing asynchronous code. Understand how generators enhance control flow, handle errors, and utilize short-circuiting in effectful programs. Discover passing references to `this` in generator functions.

In the previous sections, we learned how to create effects and execute them. Now, it's time to write our first simple program.

Effect offers a convenient syntax, similar to `async`/`await`, to write effectful code using generators.

**Note:** The use of generators is an optional feature in Effect. If you find generators unfamiliar or prefer a different coding style, you can explore the documentation about Building Pipelines in Effect.

## Understanding Effect.gen

The `Effect.gen` utility simplifies the task of writing effectful code by utilizing JavaScript's generator functions. This method helps your code appear and behave more like traditional synchronous code, enhancing both readability and error management.

### Example Program

```ts
import { Effect } from "effect"

// Function to add a small service charge to a transaction amount
const addServiceCharge = (amount: number) => amount + 1

// Function to apply a discount safely to a transaction amount
const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

// Simulated asynchronous task to fetch a transaction amount from a database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Simulated asynchronous task to fetch a discount rate from a configuration file
const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))

// Assembling the program using a generator function
const program = Effect.gen(function* () {
  const transactionAmount = yield* fetchTransactionAmount
  const discountRate = yield* fetchDiscountRate
  const discountedAmount = yield* applyDiscount(transactionAmount, discountRate)
  const finalAmount = addServiceCharge(discountedAmount)
  return `Final amount to charge: ${finalAmount}`
})

// Execute the program and log the result
Effect.runPromise(program).then(console.log) // Output: "Final amount to charge: 96"
```

Key steps to follow when using `Effect.gen`:

- Wrap your logic in `Effect.gen`
- Use `yield*` to handle effects
- Return the final result

**Warning:** The generator API is only available when using the `downlevelIteration` flag or with a `target` of `"es2015"` or higher in your `tsconfig.json` file.

## Comparing Effect.gen with async/await

If you are familiar with `async`/`await`, you may notice that the flow of writing code is similar.

### Using Effect.gen

```ts
import { Effect } from "effect"
// ---cut---
const addServiceCharge = (amount: number) => amount + 1

const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))

export const program = Effect.gen(function* () {
  const transactionAmount = yield* fetchTransactionAmount
  const discountRate = yield* fetchDiscountRate
  const discountedAmount = yield* applyDiscount(transactionAmount, discountRate)
  const finalAmount = addServiceCharge(discountedAmount)
  return `Final amount to charge: ${finalAmount}`
})
```

### Using async/await

```ts
const addServiceCharge = (amount: number) => amount + 1

const applyDiscount = (
  total: number,
  discountRate: number
): Promise<number> =>
  discountRate === 0
    ? Promise.reject(new Error("Discount rate cannot be zero"))
    : Promise.resolve(total - (total * discountRate) / 100)

const fetchTransactionAmount = Promise.resolve(100)

const fetchDiscountRate = Promise.resolve(5)

export const program = async function () {
  const transactionAmount = await fetchTransactionAmount
  const discountRate = await fetchDiscountRate
  const discountedAmount = await applyDiscount(transactionAmount, discountRate)
  const finalAmount = addServiceCharge(discountedAmount)
  return `Final amount to charge: ${finalAmount}`
}
```

Although the code appears similar, the two programs are not identical. The purpose of comparing them side by side is to highlight the resemblance in how they are written.

## Embracing Control Flow

One significant advantage of using `Effect.gen` is its capability to employ standard control flow constructs within the generator function, such as `if`/`else`, `for`, and `while`.

### Example Program with Control Flow

```ts
import { Effect } from "effect"

const calculateTax = (
  amount: number,
  taxRate: number
): Effect.Effect<number, Error> =>
  taxRate > 0
    ? Effect.succeed((amount * taxRate) / 100)
    : Effect.fail(new Error("Invalid tax rate"))

const program = Effect.gen(function* () {
  let i = 1

  while (true) {
    if (i === 10) {
      break // Break the loop when counter reaches 10
    } else {
      if (i % 2 === 0) {
        // Calculate tax for even numbers
        console.log(yield* calculateTax(100, i))
      }
      i++
      continue
    }
  }
})

Effect.runPromise(program)
/*
Output:
2
4
6
8
*/
```

## Raising Errors

The `Effect.gen` API allows you to incorporate error handling directly into your program flow by yielding failed effects.

### Example Program with Error Handling

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  console.log("Task1...")
  console.log("Task2...")
  // Introduce an error into the flow
  yield* Effect.fail("Something went wrong!")
})

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Task1...
Task2...
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Something went wrong!' }
}
*/
```

### The Role of Short-Circuiting

The `Effect.gen` API is designed to short-circuit the execution upon encountering the first error. If any error occurs during the execution of one of these effects, the remaining computations will be skipped, and the error will be propagated to the final result.

### Example Program with Short-Circuiting

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  console.log("Task1...")
  console.log("Task2...")
  yield* Effect.fail("Something went wrong!")
  console.log("This won't be executed")
})

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
Task1...
Task2...
(FiberFailure) Error: Something went wrong!
*/
```

**Note:** If you want to dive deeper into effective error handling with Effect, you can explore the Error Management section.

## Passing this

You might need to pass a reference to the current object (`this`) into the body of your generator function. You can achieve this by utilizing an overload that accepts the reference as the first argument:

### Example Program Passing this

```ts
import { Effect } from "effect"

class MyService {
  readonly local = 1
  compute = Effect.gen(this, function* () {
    return yield* Effect.succeed(this.local + 1)
  })
}

console.log(Effect.runSync(new MyService().compute)) // Output: 2
```

## Adapter

You may still come across some code snippets that use an adapter, typically indicated by `_` or `$` symbols. In earlier versions of TypeScript, the generator "adapter" function was necessary to ensure correct type inference within generators.

### Example with Adapter

```ts
import { Effect } from "effect"

const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Older usage with an adapter for proper type inference
const programWithAdapter = Effect.gen(function* (_ /* <-- Adapter */) {
  const transactionAmount = yield* _(fetchTransactionAmount)
})

// Current usage without an adapter
const program = Effect.gen(function* () {
  const transactionAmount = yield* fetchTransactionAmount
})
```

With advances in TypeScript (v5.5+), the adapter is no longer necessary for type inference. While it remains in the codebase for backward compatibility, it is anticipated to be removed in the upcoming major release of Effect.

# Building Pipelines

Explore the power of Effect pipelines for composing and sequencing operations on values. Learn about key functions like `pipe`, `Effect.map`, `Effect.flatMap`, `Effect.andThen`, `Effect.tap`, and `Effect.all` for building modular and concise transformations. Understand the advantages of using functions over methods in the Effect ecosystem for tree shakeability and extensibility.

Effect pipelines allow for the composition and sequencing of operations on values, enabling the transformation and manipulation of data in a concise and modular manner.

## Why Pipelines are Good for Structuring Your Application

Pipelines are an excellent way to structure your application and handle data transformations in a concise and modular manner. They offer several benefits:

1. **Readability**: Pipelines allow you to compose functions in a readable and sequential manner. You can clearly see the flow of data and the operations applied to it, making it easier to understand and maintain the code.

2. **Code Organization**: With pipelines, you can break down complex operations into smaller, manageable functions. Each function performs a specific task, making your code more modular and easier to reason about.

3. **Reusability**: Pipelines promote the reuse of functions. By breaking down operations into smaller functions, you can reuse them in different pipelines or contexts, improving code reuse and reducing duplication.

4. **Type Safety**: By leveraging the type system, pipelines help catch errors at compile-time. Functions in a pipeline have well-defined input and output types, ensuring that the data flows correctly through the pipeline and minimizing runtime errors.

## pipe

The `pipe` function is a utility that allows us to compose functions in a readable and sequential manner. It takes the output of one function and passes it as the input to the next function in the pipeline. This enables us to build complex transformations by chaining multiple functions together.

The basic syntax of `pipe` is as follows:

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ..., `funcN` are the functions to be applied in sequence. The result of each function becomes the input for the next function, and the final result is returned.

Here's an illustration of how `pipe` works:

It's important to note that functions passed to `pipe` must have a **single argument** because they are only called with a single argument.

Let's see an example to better understand how `pipe` works:

```ts twoslash
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result) // Output: 2
```

In the above example, we start with an input value of `5`. The `increment` function adds `1` to the initial value, resulting in `6`. Then, the `double` function doubles the value, giving us `12`. Finally, the `subtractTen` function subtracts `10` from `12`, resulting in the final output of `2`.

The result is equivalent to `subtractTen(double(increment(5)))`, but using `pipe` makes the code more readable because the operations are sequenced from left to right, rather than nesting them inside out.

## Functions vs Methods

In the Effect ecosystem, libraries often expose functions rather than methods. This design choice is important for two key reasons: tree shakeability and extensibility.

### Tree Shakeability

Tree shakeability refers to the ability of a build system to eliminate unused code during the bundling process. Functions are tree shakeable, while methods are not.

When functions are used in the Effect ecosystem, only the functions that are actually imported and used in your application will be included in the final bundled code. Unused functions are automatically removed, resulting in a smaller bundle size and improved performance.

On the other hand, methods are attached to objects or prototypes, and they cannot be easily tree shaken. Even if you only use a subset of methods, all methods associated with an object or prototype will be included in the bundle, leading to unnecessary code bloat.

### Extensibility

Another important advantage of using functions in the Effect ecosystem is the ease of extensibility. With methods, extending the functionality of an existing API often requires modifying the prototype of the object, which can be complex and error-prone.

In contrast, with functions, extending the functionality is much simpler. You can define your own "extension methods" as plain old functions without the need to modify the prototypes of objects. This promotes cleaner and more modular code, and it also allows for better compatibility with other libraries and modules.

The use of functions in the Effect ecosystem libraries is important for achieving **tree shakeability** and ensuring **extensibility**. Functions enable efficient bundling by eliminating unused code, and they provide a flexible and modular approach to extending the libraries' functionality.

## map

The `Effect.map` function is used to transform the value inside an `Effect`. It takes a function and applies it to the value contained within the `Effect`, creating a **new** `Effect` with the transformed value.

**Usage of Effect.map**

The syntax for `Effect.map` is as follows:

```ts
import { pipe, Effect } from "effect"

const mappedEffect = pipe(myEffect, Effect.map(transformation))
// or
const mappedEffect = Effect.map(myEffect, transformation)
// or
const mappedEffect = myEffect.pipe(Effect.map(transformation))
```

In the code above, `transformation` is the function applied to the value, and `myEffect` is the `Effect` being transformed.

It's important to note that `Effect`s are immutable, meaning that when you use `Effect.map` on an `Effect`, it doesn't modify the original data type. Instead, it returns a new copy of the `Effect` with the transformed value.

**Example**

Consider a program that adds a small service charge to a transaction:

```ts twoslash
import { pipe, Effect } from "effect"

// Function to add a small service charge to a transaction amount
const addServiceCharge = (amount: number) => amount + 1

// Simulated asynchronous task to fetch a transaction amount from a database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Apply service charge to the transaction amount
const finalAmount = pipe(fetchTransactionAmount, Effect.map(addServiceCharge))

Effect.runPromise(finalAmount).then(console.log) // Output: 101
```

## as

To map an `Effect` to a constant value, replacing the original value, use `Effect.as`:

```ts twoslash
import { pipe, Effect } from "effect"

const program = pipe(Effect.succeed(5), Effect.as("new value"))

Effect.runPromise(program).then(console.log) // Output: "new value"
```

## flatMap

The `Effect.flatMap` function is used when you need to chain transformations that produce `Effect` instances. This is useful for asynchronous operations or computations that depend on the results of previous effects.

**Usage of Effect.flatMap**

The `Effect.flatMap` function enables you to sequence computations that result in new `Effect` values, "flattening" any nested `Effect` structures that arise.

The syntax for `Effect.flatMap` is as follows:

```ts
import { pipe, Effect } from "effect"

const flatMappedEffect = pipe(myEffect, Effect.flatMap(transformation))
// or
const flatMappedEffect = Effect.flatMap(myEffect, transformation)
// or
const flatMappedEffect = myEffect.pipe(Effect.flatMap(transformation))
```

In the code above, `transformation` is the function that takes a value and returns an `Effect`, and `myEffect` is the initial `Effect` being transformed.

It's important to note that `Effect`s are immutable, meaning that when you use `Effect.flatMap` on an `Effect`, it doesn't modify the original data type. Instead, it returns a new copy of the `Effect` with the transformed value.

**Example**

```ts twoslash
import { pipe, Effect } from "effect"

// Function to apply a discount safely to a transaction amount
const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

// Simulated asynchronous task to fetch a transaction amount from a database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

const finalAmount = pipe(
  fetchTransactionAmount,
  Effect.flatMap((amount) => applyDiscount(amount, 5))
)

Effect.runPromise(finalAmount).then(console.log) // Output: 95
```

**Ensuring All Effects Are Considered**

It's vital to ensure that all effects within `Effect.flatMap` contribute to the final computation. Neglecting any effect can lead to unexpected behaviors or incorrect outcomes:

```ts {1}
Effect.flatMap((amount) => {
  Effect.sync(() => console.log(`Apply a discount to: ${amount}`)) // This effect is ignored
  return applyDiscount(amount, 5)
})
```

The `Effect.sync` above is ignored and does not influence the result of `applyDiscount(amount, 5)`. To include effects properly and avoid errors, explicitly chain them using functions like `Effect.map`, `Effect.flatMap`, `Effect.andThen`, or `Effect.tap`.

**Further Information on `flatMap`**

Although many developers may recognize `flatMap` from its usage with arrays, in the `Effect` framework, it's utilized to manage and resolve nested `Effect` structures. If your goal is to flatten nested arrays within an Effect (`Effect<Array<Array<A>>>`), this can be done using:

```ts twoslash
import { pipe, Effect, Array } from "effect"

const flattened = pipe(
  Effect.succeed([
    [1, 2],
    [3, 4]
  ]),
  Effect.map((nested) => Array.flatten(nested))
)
```

or using the standard `Array.prototype.flat()` method.

## andThen

Both the `Effect.map` and `Effect.flatMap` functions serve to transform an `Effect` into another `Effect` in two different scenarios. In the first scenario, `Effect.map` is used when the transformation function does not return an `Effect`, while in the second scenario, `Effect.flatMap` is used when the transformation function still returns an `Effect`. However, since both scenarios involve transformations, the Effect module also exposes a convenient all-in-one solution to use: `Effect.andThen`.

The `Effect.andThen` function executes a sequence of two actions, typically two `Effect`s, where the second action can depend on the result of the first action.

```ts
import { pipe, Effect } from "effect"

const transformedEffect = pipe(myEffect, Effect.andThen(anotherEffect))
// or
const transformedEffect = Effect.andThen(myEffect, anotherEffect)
// or
const transformedEffect = myEffect.pipe(Effect.andThen(anotherEffect))
```

The `anotherEffect` action can take various forms:

1. a value (i.e. same functionality of `Effect.as`)
2. a function returning a value (i.e. same functionality of `Effect.map`)
3. a `Promise`
4. a function returning a `Promise`
5. an `Effect`
6. a function returning an `Effect`(i.e. same functionality of `Effect.flatMap`)

**Example**

Let's see an example where we can compare the use of `Effect.andThen` instead of `Effect.map` and `Effect.flatMap`:

```ts
import { pipe, Effect } from "effect"

// Function to apply a discount safely to a transaction amount
const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

// Simulated asynchronous task to fetch a transaction amount from a database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Using Effect.map, Effect.flatMap
const result1 = pipe(
  fetchTransactionAmount,
  Effect.map((amount) => amount * 2),
  Effect.flatMap((amount) => applyDiscount(amount, 5))
)

Effect.runPromise(result1).then(console.log) // Output: 190

// Using Effect.andThen
const result2 = pipe(
  fetchTransactionAmount,
  Effect.andThen((amount) => amount * 2),
  Effect.andThen((amount) => applyDiscount(amount, 5))
)

Effect.runPromise(result2).then(console.log) // Output: 190
```

It's worth noting that Option and Either, types commonly used to handle optional values and simple error scenarios, are also compatible with `Effect.andThen`. However, it is important to understand that when these types are used, the operations are categorized under scenarios 5 and 6 as described previously, as both `Option` and `Either` operate as `Effect`s in this context.

**Example with Option**

```ts twoslash
import { pipe, Effect, Option } from "effect"

// Simulated asynchronous task fetching a number from a database
const fetchNumberValue = Effect.promise(() => Promise.resolve(42))

const program = pipe(
  fetchNumberValue,
  Effect.andThen((x) => (x > 0 ? Option.some(x) : Option.none()))
)
```

A value of type `Option<A>` is interpreted as an effect of type `Effect<A, NoSuchElementException>`.

**Example with Either**

```ts twoslash
import { pipe, Effect, Either } from "effect"

// Function to parse an integer from a string that can fail
const parseInteger = (input: string): Either.Either<number, string> =>
  isNaN(parseInt(input))
    ? Either.left("Invalid integer")
    : Either.right(parseInt(input))

// Simulated asynchronous task fetching a string from a database
const fetchStringValue = Effect.promise(() => Promise.resolve("42"))

const program = pipe(
  fetchStringValue,
  Effect.andThen((str) => parseInteger(str))
)
```

A value of type `Either<A, E>` is interpreted as an effect of type `Effect<A, E>`.

## tap

The `Effect.tap` API has a similar signature to `Effect.flatMap`, but the result of the transformation function is **ignored**. This means that the value returned by the previous computation will still be available for the next computation.

**Example**

```ts twoslash
import { pipe, Effect } from "effect"

// Function to apply a discount safely to a transaction amount
const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

// Simulated asynchronous task to fetch a transaction amount from a database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

const finalAmount = pipe(
  fetchTransactionAmount,
  Effect.tap((amount) =>
    Effect.sync(() => console.log(`Apply a discount to: ${amount}`))
  ),
  Effect.flatMap((amount) => applyDiscount(amount, 5))
)

Effect.runPromise(finalAmount).then(console.log)
/*
Output:
Apply a discount to: 100
95
*/
```

Using `Effect.tap` allows us to execute side effects during the computation without altering the result. This can be useful for logging, performing additional actions, or observing the intermediate values without interfering with the main computation flow.

## all

The `Effect.all` function is a powerful utility provided by Effect that allows you to combine multiple effects into a single effect that produces a tuple of results.

**Usage of Effect.all**

The syntax for `Effect.all` is as follows:

```ts
import { Effect } from "effect"

const combinedEffect = Effect.all([effect1, effect2, ...])
```

The `Effect.all` function will execute all these effects in **sequence**. It will return a new effect that produces a tuple containing the results of each individual effect. Keep in mind that the order of the results corresponds to the order of the original effects passed to `Effect.all`.

**Example**

```ts twoslash
import { Effect } from "effect"

// Simulated function to read configuration from a file
const webConfig = Effect.promise(() =>
  Promise.resolve({ dbConnection: "localhost", port: 8080 })
)

// Simulated function to test database connectivity
const checkDatabaseConnectivity = Effect.promise(() =>
  Promise.resolve("Connected to Database")
)

// Combine both effects to perform startup checks
const startupChecks = Effect.all([webConfig, checkDatabaseConnectivity])

Effect.runPromise(startupChecks).then(([config, dbStatus]) => {
  console.log(
    `Configuration: ${JSON.stringify(config)}, DB Status: ${dbStatus}`
  )
})
/*
Output:
Configuration: {"dbConnection":"localhost","port":8080}, DB Status: Connected to Database
*/
```

The `Effect.all` function not only combines tuples but also works with iterables, structs, and records.

## Build your first pipeline

Now, let's combine `pipe`, `Effect.all` and `Effect.andThen` to build a pipeline that performs a series of transformations:

```ts twoslash
import { Effect, pipe } from "effect"

// Function to add a small service charge to a transaction amount
const addServiceCharge = (amount: number) => amount + 1

// Function to apply a discount safely to a transaction amount
const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

// Simulated asynchronous task to fetch a transaction amount from a database
const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

// Simulated asynchronous task to fetch a discount rate from a configuration file
const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))

// Assembling the program using a pipeline of effects
const program = pipe(
  Effect.all([fetchTransactionAmount, fetchDiscountRate]),
  Effect.flatMap(([transactionAmount, discountRate]) =>
    applyDiscount(transactionAmount, discountRate)
  ),
  Effect.map(addServiceCharge),
  Effect.map((finalAmount) => `Final amount to charge: ${finalAmount}`)
)

// Execute the program and log the result
Effect.runPromise(program).then(console.log) // Output: "Final amount to charge: 96"
```

## The pipe method

Effect provides a `pipe` method that works similarly to the `pipe` method found in other libraries. This method allows you to chain multiple operations together, making your code more concise and readable.

Here's how the `pipe` **method** works:

```ts
const result = effect.pipe(func1, func2, ..., funcN)
```

This is equivalent to using the `pipe` **function** like this:

```ts
const result = pipe(effect, func1, func2, ..., funcN)
```

The `pipe` method is available on all effects and many other data types, eliminating the need to import the `pipe` function from the `Function` module and saving you some keystrokes.

Let's rewrite the previous example using the `pipe` method:

```ts twoslash
import { Effect } from "effect"

const addServiceCharge = (amount: number) => amount + 1

const applyDiscount = (
  total: number,
  discountRate: number
): Effect.Effect<number, Error> =>
  discountRate === 0
    ? Effect.fail(new Error("Discount rate cannot be zero"))
    : Effect.succeed(total - (total * discountRate) / 100)

const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))

const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))

const program = Effect.all([fetchTransactionAmount, fetchDiscountRate]).pipe(
  Effect.flatMap(([transactionAmount, discountRate]) =>
    applyDiscount(transactionAmount, discountRate)
  ),
  Effect.map(addServiceCharge),
  Effect.map((finalAmount) => `Final amount to charge: ${finalAmount}`)
)
```

## Cheatsheet

Let's summarize the transformation functions we have seen so far:

| **Function** | **Input**                                 | **Output**                  |
| ------------ | ----------------------------------------- | --------------------------- |
| `map`        | `Effect<A, E, R>`, `A => B`               | `Effect<B, E, R>`           |
| `flatMap`    | `Effect<A, E, R>`, `A => Effect<B, E, R>` | `Effect<B, E, R>`           |
| `andThen`    | `Effect<A, E, R>`, \*                     | `Effect<B, E, R>`           |
| `tap`        | `Effect<A, E, R>`, `A => Effect<B, E, R>` | `Effect<A, E, R>`           |
| `all`        | `[Effect<A, E, R>, Effect<B, E, R>, ...]` | `Effect<[A, B, ...], E, R>` |

These functions are powerful tools for transforming and chaining `Effect` computations. They allow you to apply functions to values inside `Effect` and build complex pipelines of computations.

---
title: Effect Essentials
excerpt: Effect Essentials
collapsible: true
bottomNavigation: childCards
---


# Two Types of Errors

Just like any other program, Effect programs may fail for expected or unexpected reasons. The difference between a non-Effect program and an Effect program is in the detail provided when the program fails. Effect attempts to preserve as much information as possible about the cause of the failure, resulting in detailed, comprehensive, and human-readable failure messages.

In an Effect program, there are two possible ways for a program to fail:

- **Expected Errors**: These are errors that developers anticipate as part of normal program execution.

- **Unexpected Errors**: These are errors that occur unexpectedly and are not part of the intended program flow.

## Expected Errors

These errors, also referred to as failures, typed errors, or recoverable errors, are anticipated by developers during normal program execution. They serve a similar purpose to checked exceptions and play a role in defining the program's domain and control flow.

Expected errors are tracked at the type level by the Effect data type in the "Error" channel. For example, it is evident from the type that the program can fail with an error of type `HttpError`:

```
Effect<string, HttpError>
```

## Unexpected Errors

Unexpected errors, also referred to as defects, untyped errors, or unrecoverable errors, are not anticipated during normal program execution. Unlike expected errors, which are part of a program's domain and control flow, unexpected errors resemble unchecked exceptions and lie outside the expected behavior of the program.

Since these errors are not expected, Effect does not track them at the type level. However, the Effect runtime does keep track of these errors and provides several methods to aid in recovering from unexpected errors.

# Error Channel Operations

Explore various operations on the error channel in Effect, including error mapping, both channel mapping, filtering success values, inspecting errors, exposing errors, merging error and success channels, and flipping error and success channels. Learn how to handle errors effectively in your Effect programming.

In Effect you can perform various operations on the error channel of effects. These operations allow you to transform, inspect, and handle errors in different ways. Let's explore some of these operations.

## Map Operations

### mapError

The `Effect.mapError` function is used when you need to transform or modify an error produced by an effect, without affecting the success value. This can be helpful when you want to add extra information to the error or change its type.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))

const mapped = Effect.mapError(simulatedTask, (message) => new Error(message))
```

The type in the error channel of our program changes from `string` to `Error`.

It's important to note that using the `Effect.mapError` function does not change the overall success or failure of the effect. If the mapped effect is successful, then the mapping function is ignored. The `Effect.mapError` operation only applies the transformation to the error channel of the effect, while leaving the success channel unchanged.

### mapBoth

The `Effect.mapBoth` function allows you to apply transformations to both channels: the error channel and the success channel of an effect. It takes two map functions as arguments: one for the error channel and the other for the success channel.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))

const modified = Effect.mapBoth(simulatedTask, {
  onFailure: (message) => new Error(message),
  onSuccess: (n) => n > 0
})
```

After using `mapBoth`, the type of our program changes from `Effect<number, string>` to `Effect<boolean, Error>`.

It's important to note that using the `mapBoth` function does not change the overall success or failure of the effect. It only transforms the values in the error and success channels while preserving the effect's original success or failure status.

## Filtering the Success Channel

The Effect library provides several operators to filter values on the success channel based on a given predicate. These operators offer different strategies for handling cases where the predicate fails.

| Function                                         | Description                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Effect.filterOrFail`                            | Filters the values on the success channel based on a predicate. If the predicate fails for any value, the original effect fails with an error.                                                                                              |
| `Effect.filterOrDie` and `Effect.filterOrDieMessage` | Filters the values on the success channel based on a predicate. If the predicate fails for any value, the original effect terminates abruptly. The `filterOrDieMessage` variant allows you to provide a custom error message.                 |
| `Effect.filterOrElse`                            | Filters the values on the success channel based on a predicate. If the predicate fails for any value, an alternative effect is executed instead.                                                                                              |

Example demonstrating these filtering operators:

```ts
import { Effect, Random, Cause } from "effect"

const task1 = Effect.filterOrFail(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => "random number is negative"
)

const task2 = Effect.filterOrDie(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => new Cause.IllegalArgumentException("random number is negative")
)

const task3 = Effect.filterOrDieMessage(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  "random number is negative"
)

const task4 = Effect.filterOrElse(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => task3
)
```

Depending on the specific filtering operator used, the effect can either fail, terminate abruptly, or execute an alternative effect when the predicate fails. Choose the appropriate operator based on your desired error handling strategy and program logic.

You can further refine the type of the success channel by providing a user-defined type guard to the `filterOr*` APIs, enhancing type safety and improving code clarity.

Example:

```ts
import { Effect, pipe } from "effect"

// Define a user interface
interface User {
  readonly name: string
}

// Assume an asynchronous authentication function
declare const auth: () => Promise<User | null>

const program = pipe(
  Effect.promise(() => auth()),
  Effect.filterOrFail(
    (user): user is User => user !== null,
    () => new Error("Unauthorized")
  ),
  Effect.andThen((user) => user.name) // The 'user' here has type `User`, not `User | null`
)
```

If preferred, you can utilize a pre-made guard like Predicate.isNotNull for simplicity and consistency.

## Inspecting Errors

Effect provides several operators for inspecting error values. These operators allow developers to observe failures or underlying issues without modifying the outcome:

| Function        | Description                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `tapError`      | Executes an effectful operation to inspect the failure of an effect without altering it.                                                   |
| `tapErrorTag`   | Specifically inspects a failure with a particular tag, allowing focused error handling.                                                    |
| `tapErrorCause` | Inspects the underlying cause of an effect's failure.                                                                                      |
| `tapDefect`     | Specifically inspects non-recoverable failures or defects in an effect.                                                                    |
| `tapBoth`       | Inspects both success and failure outcomes of an effect, performing different actions based on the result.                                 |

Utilizing these error inspection tools does not alter the outcome or type of the effect.

### tapError

Executes an effectful operation to inspect the failure of an effect without altering it.

```ts
import { Effect, Console } from "effect"

const task: Effect.Effect<number, string> = Effect.fail("NetworkError")

const tapping = Effect.tapError(task, (error) =>
  Console.log(`expected error: ${error}`)
)

Effect.runFork(tapping)
/*
Output:
expected error: NetworkError
*/
```

### tapErrorTag

Specifically inspects a failure with a particular tag, allowing focused error handling.

```ts
import { Effect, Console } from "effect"

class NetworkError {
  readonly _tag = "NetworkError"
  constructor(readonly statusCode: number) {}
}

class ValidationError {
  readonly _tag = "ValidationError"
  constructor(readonly field: string) {}
}

const task: Effect.Effect<number, NetworkError | ValidationError> =
  Effect.fail(new NetworkError(504))

const tapping = Effect.tapErrorTag(task, "NetworkError", (error) =>
  Console.log(`expected error: ${error.statusCode}`)
)

Effect.runFork(tapping)
/*
Output:
expected error: 504
*/
```

### tapErrorCause

Inspects the underlying cause of an effect's failure.

```ts
import { Effect, Console } from "effect"

const task1: Effect.Effect<number, string> = Effect.fail("NetworkError")

const tapping1 = Effect.tapErrorCause(task1, (cause) =>
  Console.log(`error cause: ${cause}`)
)

Effect.runFork(tapping1)
/*
Output:
error cause: Error: NetworkError
*/

const task2: Effect.Effect<number, string> = Effect.dieMessage(
  "Something went wrong"
)

const tapping2 = Effect.tapErrorCause(task2, (cause) =>
  Console.log(`error cause: ${cause}`)
)

Effect.runFork(tapping2)
/*
Output:
error cause: RuntimeException: Something went wrong
  ... stack trace ...
*/
```

### tapDefect

Specifically inspects non-recoverable failures or defects in an effect.

```ts
import { Effect, Console } from "effect"

const task1: Effect.Effect<number, string> = Effect.fail("NetworkError")

const tapping1 = Effect.tapDefect(task1, (cause) =>
  Console.log(`defect: ${cause}`)
)

Effect.runFork(tapping1)
/*
No Output
*/

const task2: Effect.Effect<number, string> = Effect.dieMessage(
  "Something went wrong"
)

const tapping2 = Effect.tapDefect(task2, (cause) =>
  Console.log(`defect: ${cause}`)
)

Effect.runFork(tapping2)
/*
Output:
defect: RuntimeException: Something went wrong
  ... stack trace ...
*/
```

### tapBoth

Inspects both success and failure outcomes of an effect.

```ts
import { Effect, Random, Console } from "effect"

const task = Effect.filterOrFail(
  Random.nextRange(-1, 1),
  (n) => n >= 0,
  () => "random number is negative"
)

const tapping = Effect.tapBoth(task, {
  onFailure: (error) => Console.log(`failure: ${error}`),
  onSuccess: (randomNumber) => Console.log(`random number: ${randomNumber}`)
})

Effect.runFork(tapping)
/*
Example Output:
failure: random number is negative
*/
```

## Exposing Errors in The Success Channel

You can use the `Effect.either` function to convert an `Effect<A, E, R>` into another effect where both its failure (`E`) and success (`A`) channels have been lifted into an Either<A, E> data type:

```ts
Effect<A, E, R> -> Effect<Either<A, E>, never, R>
```

The resulting effect is an unexceptional effect, meaning it cannot fail, because the failure case has been exposed as part of the `Either` left case. Therefore, the error parameter of the returned Effect is `never`, as it is guaranteed that the effect does not model failure.

Example using Effect.gen:

```ts
import { Effect, Either, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(simulatedTask)
  if (Either.isLeft(failureOrSuccess)) {
    const error = failureOrSuccess.left
    yield* Console.log(`failure: ${error}`)
    return 0
  } else {
    const value = failureOrSuccess.right
    yield* Console.log(`success: ${value}`)
    return value
  }
})
```

Example using pipe:

```ts
import { Effect, Either, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.either(simulatedTask).pipe(
  Effect.andThen((failureOrSuccess) =>
    Either.match(failureOrSuccess, {
      onLeft: (error) => Console.log(`failure: ${error}`).pipe(Effect.as(0)),
      onRight: (value) =>
        Console.log(`success: ${value}`).pipe(Effect.as(value))
    })
  )
)
```

## Exposing the Cause in The Success Channel

You can use the `Effect.cause` function to expose the cause of an effect, which is a more detailed representation of failures, including error messages and defects.

Example using Effect.gen:

```ts
import { Effect, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const cause = yield* Effect.cause(simulatedTask)
  yield* Console.log(cause)
})
```

Example using pipe:

```ts
import { Effect, Console } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.cause(simulatedTask).pipe(
  Effect.andThen((cause) => Console.log(cause))
)
```

## Merging the Error Channel into the Success Channel

Using the `Effect.merge` function, you can merge the error channel into the success channel, creating an effect that always succeeds with the merged value.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const merged = Effect.merge(simulatedTask)
```

## Flipping Error and Success Channels

Using the `Effect.flip` function, you can flip the error and success channels of an effect, effectively swapping their roles.

```ts
import { Effect } from "effect"

const simulatedTask = Effect.fail("Oh uh!").pipe(Effect.as(2))

const flipped = Effect.flip(simulatedTask)
```

# Parallel and Sequential Errors

Learn how to handle parallel and sequential errors in Effect programming. Understand the behavior of error handling in scenarios involving parallel computations and sequential operations. Explore combinator `Effect.parallelErrors` to expose and handle multiple parallel failures efficiently.

In a typical Effect application, when an error occurs, it usually fails with the first error encountered by the Effect runtime. 

Example:

```ts
import { Effect } from "effect"

const fail = Effect.fail("Oh uh!")
const die = Effect.dieMessage("Boom!")

const program = Effect.all([fail, die]).pipe(
  Effect.andThen(die),
  Effect.asVoid
)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' }
}
*/
```

In this case, the `program` will fail with the first error, which is "Oh uh!".

## Parallel Errors

In some situations, you may encounter multiple errors, especially when performing parallel computations. When parallel computations are involved, the application may fail due to multiple errors. 

Example:

```ts
import { Effect } from "effect"

const fail = Effect.fail("Oh uh!")
const die = Effect.dieMessage("Boom!")

const program = Effect.all([fail, die], { concurrency: "unbounded" }).pipe(
  Effect.asVoid
)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Parallel',
    left: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' },
    right: { _id: 'Cause', _tag: 'Die', defect: [Object] }
  }
}
*/
```

In this example, the `program` runs both `fail` and `die` concurrently, and if both fail, it will result in multiple errors.

### parallelErrors

Effect provides a useful combinator called `Effect.parallelErrors` that exposes all parallel failure errors in the error channel. 

Example:

```ts
import { Effect } from "effect"

const fail1 = Effect.fail("Oh uh!")
const fail2 = Effect.fail("Oh no!")
const die = Effect.dieMessage("Boom!")

const program = Effect.all([fail1, fail2, die], {
  concurrency: "unbounded"
}).pipe(Effect.asVoid, Effect.parallelErrors)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: [ 'Oh uh!', 'Oh no!' ] }
}
*/
```

In this example, `Effect.parallelErrors` combines the errors from `fail1` and `fail2` into a single error.

Warning: Note that this operator is **only for failures**, not defects or interruptions.

## Sequential Errors

When working with resource-safety operators like `Effect.ensuring`, you may encounter multiple sequential errors. This happens because regardless of whether the original effect has any errors or not, the finalizer is uninterruptible and will run. 

Example:

```ts
import { Effect } from "effect"

const fail = Effect.fail("Oh uh!")
const die = Effect.dieMessage("Boom!")

const program = fail.pipe(Effect.ensuring(die))

Effect.runPromiseExit(program).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Sequential',
    left: { _id: 'Cause', _tag: 'Fail', failure: 'Oh uh!' },
    right: { _id: 'Cause', _tag: 'Die', defect: [Object] }
  }
}
*/
```

In this case, the `program` will result in multiple sequential errors if both `fail` and the finalizer `die` encounter errors.

# Yieldable Errors

"Yieldable Errors" are special types of errors that can be yielded within a generator function used by `Effect.gen`. The unique feature of these errors is that you don't need to use the `Effect.fail` API explicitly to handle them. They offer a more intuitive and convenient way to work with custom errors in your code.

## Data.Error

The `Data.Error` constructor enables you to create a base yieldable error class. This class can be used to represent different types of errors in your code. Here's how you can use it:

```ts
import { Effect, Data } from "effect"

class MyError extends Data.Error<{ message: string }> {}

export const program = Effect.gen(function* () {
  yield* new MyError({ message: "Oh no!" }) // same as yield* Effect.fail(new MyError({ message: "Oh no!" })
})

Effect.runPromiseExit(program).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: { message: 'Oh no!' } }
}
*/
```

## Data.TaggedError

The `Data.TaggedError` constructor is useful for creating tagged yieldable errors. These errors bear a distinct property named `_tag`, which acts as their unique identifier, allowing you to differentiate them from one another. Here's how you can use it:

```ts
import { Effect, Data, Random } from "effect"

// An error with _tag: "Foo"
class FooError extends Data.TaggedError("Foo")<{
  message: string
}> {}

// An error with _tag: "Bar"
class BarError extends Data.TaggedError("Bar")<{
  randomNumber: number
}> {}

export const program = Effect.gen(function* () {
  const n = yield* Random.next
  return n > 0.5
    ? "yay!"
    : n < 0.2
      ? yield* new FooError({ message: "Oh no!" })
      : yield* new BarError({ randomNumber: n })
}).pipe(
  Effect.catchTags({
    Foo: (error) => Effect.succeed(`Foo error: ${error.message}`),
    Bar: (error) => Effect.succeed(`Bar error: ${error.randomNumber}`)
  })
)

Effect.runPromise(program).then(console.log, console.error)
/*
Example Output (n < 0.2):
Foo error: Oh no!
*/
```

In this example, we create `FooError` and `BarError` classes with distinct tags ("Foo" and "Bar"). These tags help identify the type of error when handling errors in your code.

# Expected Errors

Explore how Effect represents and manages expected errors. Learn about creating error instances, tracking errors at the type level, and the short-circuiting behavior of Effect programs. Discover techniques to catch and recover from errors, and gain insights into error handling strategies using Effect's powerful combinators.

In this guide you will learn:

- How Effect represents expected errors
- The tools Effect provides for robust and comprehensive error management

As we saw in the guide Creating Effects, we can use the `fail` constructor to create an Effect that represents an error:

```ts
import { Effect } from "effect"

class HttpError {
  readonly _tag = "HttpError"
}

const program = Effect.fail(new HttpError())
```

We use a class to represent the `HttpError` type above simply to gain access to both the error type and a free constructor. However, you can use whatever you like to model your error types.

It's worth noting that we added a readonly `_tag` field as discriminant to our error in the example:

```ts
class HttpError {
  readonly _tag = "HttpError"
}
```

Adding a discriminant field, such as `_tag`, can be beneficial for distinguishing between different types of errors during error handling. It also prevents TypeScript from unifying types, ensuring that each error is treated uniquely based on its discriminant value.

Expected errors **are tracked at the type level** by the `Effect` data type in the "Error" channel.

It is evident from the type of `program` that it can fail with an error of type `HttpError`:

```ts
Effect<never, HttpError, never>
```

## Error Tracking

The following program serves as an illustration of how errors are automatically tracked for you:

```ts
import { Effect, Random } from "effect"

export class HttpError {
  readonly _tag = "HttpError"
}

export class ValidationError {
  readonly _tag = "ValidationError"
}

export const program = Effect.gen(function* () {
  const n1 = yield* Random.next
  const n2 = yield* Random.next

  const httpResult =
    n1 > 0.5 ? "yay!" : yield* Effect.fail(new HttpError())
  const validationResult =
    n2 > 0.5 ? "yay!" : yield* Effect.fail(new ValidationError())

  return httpResult + validationResult
})
```

In the above program, we compute two values: `httpResult` and `validationResult`, each representing a potential source of error.

In the above program, we have two operations: `httpResult` and `validationResult`, each representing a potential source of error. These operations are combined using the `Effect.all(effects)` function from the Effect library, which allows us to sequence them together.

Effect automatically keeps track of the possible errors that can occur during the execution of the program. In this case, we have `HttpError` and `ValidationError` as the possible error types. The error channel of the `program` is specified as

```ts
Effect<string, HttpError | ValidationError, never>
```

indicating that it can potentially fail with either a `HttpError` or a `ValidationError`.

## Short-Circuiting

When working with APIs like `Effect.gen`, `Effect.map`, `Effect.flatMap`, `Effect.andThen` and `Effect.all`, it's important to understand how they handle errors. These APIs are designed to **short-circuit the execution** upon encountering the **first error**.

What does this mean for you as a developer? If any error occurs during the execution of one of these effects, the remaining computations will be skipped, and the error will be propagated to the final result.

In simpler terms, the short-circuiting behavior ensures that if something goes wrong at any step of your program, it won't waste time executing unnecessary computations. Instead, it will immediately stop and return the error to let you know that something went wrong.

```ts
import { Effect, Console } from "effect"

// Define three effects representing different tasks.
const task1 = Console.log("Executing task1...")
const task2 = Effect.fail("Something went wrong!")
const task3 = Console.log("Executing task3...")

// Compose the three tasks to run them in sequence.
// If one of the tasks fails, the subsequent tasks won't be executed.
const program = Effect.gen(function* () {
  yield* task1
  yield* task2 // After task1, task2 is executed, but it fails with an error
  yield* task3 // This computation won't be executed because the previous one fails
})

Effect.runPromiseExit(program).then(console.log)
```

This code snippet demonstrates the short-circuiting behavior when an error occurs. Each operation depends on the successful execution of the previous one. If any error occurs, the execution is short-circuited, and the error is propagated.

## Catching all Errors

### either

The `Effect.either` function transforms an `Effect<A, E, R>` into an effect that encapsulates both potential failure and success within an Either data type:

```ts
Effect<A, E, R> -> Effect<Either<A, E>, never, R>
```

The resulting effect cannot fail because the potential failure is now represented within the `Either`'s `Left` type. The error type of the returned `Effect` is specified as `never`, confirming that the effect is structured to not fail.

By yielding an `Either`, we gain the ability to "pattern match" on this type to handle both failure and success cases within the generator function.

```ts
import { Effect, Either } from "effect"
import { program } from "./error-tracking"

const recovered = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(program)
  if (Either.isLeft(failureOrSuccess)) {
    const error = failureOrSuccess.left
    return `Recovering from ${error._tag}`
  } else {
    return failureOrSuccess.right
  }
})
```

We can make the code less verbose by using the `Either.match` function, which directly accepts the two callback functions for handling errors and successful values:

```ts
import { Effect, Either } from "effect"
import { program } from "./error-tracking"

const recovered = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(program)
  return Either.match(failureOrSuccess, {
    onLeft: (error) => `Recovering from ${error._tag}`,
    onRight: (value) => value // do nothing in case of success
  })
})
```

### catchAll

The `Effect.catchAll` function allows you to catch any error that occurs in the program and provide a fallback.

```ts
import { Effect } from "effect"
import { program } from "./error-tracking"

const recovered = program.pipe(
  Effect.catchAll((error) => Effect.succeed(`Recovering from ${error._tag}`))
)
```

We can observe that the type in the error channel of our program has changed to `never`, indicating that all errors have been handled.

## Catching Some Errors

Suppose we want to handle a specific error, such as `HttpError`.

```ts
import { Effect, Either } from "effect"
import { program } from "./error-tracking"

const recovered = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(program)
  if (Either.isLeft(failureOrSuccess)) {
    const error = failureOrSuccess.left
    if (error._tag === "HttpError") {
      return "Recovering from HttpError"
    }
    return yield* Effect.fail(error)
  } else {
    return failureOrSuccess.right
  }
})
```

If we also want to handle `ValidationError`, we can easily add another case to our code:

```ts
import { Effect, Either } from "effect"
import { program } from "./error-tracking"

const recovered = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(program)
  if (Either.isLeft(failureOrSuccess)) {
    const error = failureOrSuccess.left
    if (error._tag === "HttpError") {
      return "Recovering from HttpError"
    } else {
      return "Recovering from ValidationError"
    }
  } else {
    return failureOrSuccess.right
  }
})
```

### catchSome

If we want to catch and recover from only some types of errors and effectfully attempt recovery, we can use the `Effect.catchSome` function:

```ts
import { Effect, Option } from "effect"
import { program } from "./error-tracking"

const recovered = program.pipe(
  Effect.catchSome((error) => {
    if (error._tag === "HttpError") {
      return Option.some(Effect.succeed("Recovering from HttpError"))
    }
    return Option.none()
  })
)
```

### catchIf

Similar to `Effect.catchSome`, the function `Effect.catchIf` allows you to recover from specific errors based on a predicate:

```ts
import { Effect } from "effect"
import { program } from "./error-tracking"

const recovered = program.pipe(
  Effect.catchIf(
    (error) => error._tag === "HttpError",
    () => Effect.succeed("Recovering from HttpError")
  )
)
```

### catchTag

If your program's errors are all tagged with a `_tag` field that acts as a discriminator you can use the `Effect.catchTag` function to catch and handle specific errors with precision.

```ts
import { Effect } from "effect"
import { program } from "./error-tracking"

const recovered = program.pipe(
  Effect.catchTag("HttpError", (_HttpError) =>
    Effect.succeed("Recovering from HttpError")
  )
)
```

If we also wanted to handle `ValidationError`, we can simply add another `catchTag`:

```ts
import { Effect } from "effect"
import { program } from "./error-tracking"

const recovered = program.pipe(
  Effect.catchTag("HttpError", (_HttpError) =>
    Effect.succeed("Recovering from HttpError")
  ),
  Effect.catchTag("ValidationError", (_ValidationError) =>
    Effect.succeed("Recovering from ValidationError")
  )
)
```

### catchTags

Instead of using the `Effect.catchTag` function multiple times to handle individual error types, we have a more convenient option called `Effect.catchTags`. With `Effect.catchTags`, we can handle multiple errors in a single block of code.

```ts
import { Effect } from "effect"
import { program } from "./error-tracking"

const recovered = program.pipe(
  Effect.catchTags({
    HttpError: (_HttpError) => Effect.succeed(`Recovering from HttpError`),
    ValidationError: (_ValidationError) =>
      Effect.succeed(`Recovering from ValidationError`)
  })
)
```

# Unexpected Errors

Learn how Effect handles unrecoverable errors, such as defects, providing functions like `die`, `dieMessage`, `orDie`, and `orDieWith`. Explore techniques to terminate effect execution, handle unexpected errors, and recover from defects. Discover the use of `catchAllDefect` and `catchSomeDefect` to manage and selectively recover from specific defects.

There are situations where you may encounter unexpected errors, and you need to decide how to handle them. Effect provides functions to help you deal with such scenarios, allowing you to take appropriate actions when errors occur during the execution of your effects.

## Creating Unrecoverable Errors

Creating defects is a common necessity when dealing with errors from which it is not possible to recover from a business logic perspective, such as attempting to establish a connection that is refused after multiple retries. In those cases, terminating the execution of the effect and moving into reporting, through an output such as stdout or some external monitoring service, might be the best solution.

The following functions and combinators allow for termination of the effect and are often used to convert values of type `Effect<A, E, R>` into values of type `Effect<A, never, R>` allowing the programmer an escape hatch from having to handle and recover from errors for which there is no sensible way to recover.

### die / dieMessage

The `Effect.die` function returns an effect that throws a specified error, while `Effect.dieMessage` throws a `RuntimeException` with a specified text message. These functions are useful for terminating a fiber when a defect, a critical and unexpected error, is detected in the code.

Example using `die`:

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number> =>
  b === 0
    ? Effect.die(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

Effect.runSync(divide(1, 0)) // throws Error: Cannot divide by zero
```

Example using `dieMessage`:

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number> =>
  b === 0 ? Effect.dieMessage("Cannot divide by zero") : Effect.succeed(a / b)

Effect.runSync(divide(1, 0)) // throws RuntimeException: Cannot divide by zero
```

### orDie

The `Effect.orDie` function transforms an effect's failure into a termination of the fiber, making all failures unchecked and not part of the type of the effect. It can be used to handle errors that you do not wish to recover from.

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const program = Effect.orDie(divide(1, 0))

Effect.runSync(program) // throws Error: Cannot divide by zero
```

### orDieWith

Similar to `Effect.orDie`, the `Effect.orDieWith` function transforms an effect's failure into a termination of the fiber using a specified mapping function. It allows you to customize the error message before terminating the fiber.

```ts
import { Effect } from "effect"

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const program = Effect.orDieWith(
  divide(1, 0),
  (error) => new Error(`defect: ${error.message}`)
)

Effect.runSync(program) // throws Error: defect: Cannot divide by zero
```

## Catching

Effect provides two functions that allow you to handle unexpected errors that may occur during the execution of your effects.

**Warning**: There is no sensible way to recover from defects. The functions we're about to discuss should be used only at the boundary between Effect and an external system, to transmit information on a defect for diagnostic or explanatory purposes.

### exit

The `Effect.exit` function transforms an `Effect<A, E, R>` into an effect that encapsulates both potential failure and success within an Exit data type:

```ts
Effect<A, E, R> -> Effect<Exit<A, E>, never, R>
```

The resulting effect cannot fail because the potential failure is now represented within the `Exit`'s `Failure` type. The error type of the returned `Effect` is specified as `never`, confirming that the effect is structured to not fail.

```ts
import { Effect, Cause, Console, Exit } from "effect"

// Simulating a runtime error
const task = Effect.dieMessage("Boom!")

const program = Effect.gen(function* () {
  const exit = yield* Effect.exit(task)
  if (Exit.isFailure(exit)) {
    const cause = exit.cause
    if (Cause.isDieType(cause) && Cause.isRuntimeException(cause.defect)) {
      yield* Console.log(
        `RuntimeException defect caught: ${cause.defect.message}`
      )
    } else {
      yield* Console.log("Unknown defect caught.")
    }
  }
})

Effect.runPromiseExit(program).then(console.log)
```

### catchAllDefect

The `Effect.catchAllDefect` function allows you to recover from all defects using a provided function.

```ts
import { Effect, Cause, Console } from "effect"

// Simulating a runtime error
const task = Effect.dieMessage("Boom!")

const program = Effect.catchAllDefect(task, (defect) => {
  if (Cause.isRuntimeException(defect)) {
    return Console.log(`RuntimeException defect caught: ${defect.message}`)
  }
  return Console.log("Unknown defect caught.")
})

Effect.runPromiseExit(program).then(console.log)
```

It's important to understand that `catchAllDefect` can only handle defects, not expected errors (such as those caused by `Effect.fail`) or interruptions in execution (such as when using `Effect.interrupt`).

### catchSomeDefect

The `Effect.catchSomeDefect` function in Effect allows you to recover from specific defects using a provided partial function.

```ts
import { Effect, Cause, Option, Console } from "effect"

// Simulating a runtime error
const task = Effect.dieMessage("Boom!")

const program = Effect.catchSomeDefect(task, (defect) => {
  if (Cause.isIllegalArgumentException(defect)) {
    return Option.some(
      Console.log(
        `Caught an IllegalArgumentException defect: ${defect.message}`
      )
    )
  }
  return Option.none()
})

Effect.runPromiseExit(program).then(console.log)
```

It's important to understand that `catchSomeDefect` can only handle defects, not expected errors or interruptions in execution.

# Fallback

Explore techniques for handling failures and fallbacks in Effect, including `orElse` to try alternate effects, `orElseFail` and `orElseSucceed` to modify failures, and `firstSuccessOf` to retrieve the result of the first successful effect. Learn how to gracefully handle errors and create fallback mechanisms in your Effect programs.

## orElse

We can attempt one effect, and if it fails, we can try another effect using the `Effect.orElse` combinator:

```ts
import { Effect } from "effect"

const success = Effect.succeed("success")
const failure = Effect.fail("failure")
const fallback = Effect.succeed("fallback")

const program1 = Effect.orElse(success, () => fallback)
console.log(Effect.runSync(program1)) // Output: "success"

const program2 = Effect.orElse(failure, () => fallback)
console.log(Effect.runSync(program2)) // Output: "fallback"
```

## orElseFail / orElseSucceed

These two operators modify the original failure by replacing it with constant succeed or failure values.

The `Effect.orElseFail` will always replace the original failure with the new one:

```ts
import { Effect } from "effect"

class NegativeAgeError {
  readonly _tag = "NegativeAgeError"
  constructor(readonly age: number) {}
}

class IllegalAgeError {
  readonly _tag = "IllegalAgeError"
  constructor(readonly age: number) {}
}

const validate = (
  age: number
): Effect.Effect<number, NegativeAgeError | IllegalAgeError> => {
  if (age < 0) {
    return Effect.fail(new NegativeAgeError(age))
  } else if (age < 18) {
    return Effect.fail(new IllegalAgeError(age))
  } else {
    return Effect.succeed(age)
  }
}
```

```ts
const program1 = Effect.orElseFail(validate(3), () => "invalid age")
```

The `Effect.orElseSucceed` function will always replace the original failure with a success value, so the resulting effect cannot fail:

```ts
const program2 = Effect.orElseSucceed(validate(3), () => 0)
```

## firstSuccessOf

The `firstSuccessOf` operator simplifies running a series of effects and returns the result of the first one that succeeds. If none of the effects succeed, the resulting effect will fail with the error of the last effect in the series.

This operator utilizes `Effect.orElse` to combine multiple effects into a single effect.

In the following example, we attempt to retrieve a configuration from different nodes. If retrieving from the primary node fails, we successively try retrieving from the next available nodes until we find a successful result:

```ts
import { Effect, Console } from "effect"

interface Config {
  // ...
}

const makeConfig = (/* ... */): Config => ({})

const remoteConfig = (name: string): Effect.Effect<Config, Error> =>
  Effect.gen(function* () {
    if (name === "node3") {
      yield* Console.log(`Config for ${name} found`)
      return makeConfig()
    } else {
      yield* Console.log(`Unavailable config for ${name}`)
      return yield* Effect.fail(new Error())
    }
  })

const masterConfig = remoteConfig("master")

const nodeConfigs = ["node1", "node2", "node3", "node4"].map(remoteConfig)

const config = Effect.firstSuccessOf([masterConfig, ...nodeConfigs])

console.log(Effect.runSync(config))
/*
Output:
Unavailable config for master
Unavailable config for node1
Unavailable config for node2
Config for node3 found
{}
*/
```

Warning: If the collection provided to the `Effect.firstSuccessOf` function is empty, it will throw an `IllegalArgumentException` error.

# Matching

Discover how to handle both success and failure cases in the Effect data type using functions like `match` and `matchEffect`. Learn techniques to perform side effects, ignore values, and access the full cause of failures. Effectively manage control flow and handle errors in your Effect programs.

In the `Effect` data type, we have a `match` function that allows us to handle different cases simultaneously. When working with effects, we also have several functions that enable us to handle both success and failure scenarios.

## match

The `Effect.match` function allows us to handle both success and failure cases in a non-effectful manner by providing a handler for each case:

```ts
import { Effect } from "effect"

const success: Effect.Effect<number, Error> = Effect.succeed(42)
const failure: Effect.Effect<number, Error> = Effect.fail(new Error("Uh oh!"))

const program1 = Effect.match(success, {
  onFailure: (error) => `failure: ${error.message}`,
  onSuccess: (value) => `success: ${value}`
})

Effect.runPromise(program1).then(console.log) // Output: "success: 42"

const program2 = Effect.match(failure, {
  onFailure: (error) => `failure: ${error.message}`,
  onSuccess: (value) => `success: ${value}`
})

Effect.runPromise(program2).then(console.log) // Output: "failure: Uh oh!"
```

We can also choose to ignore the success and failure values if we're not interested in them:

```ts
import { Effect } from "effect"
import { constVoid } from "effect/Function"

const task = Effect.fail("Uh oh!").pipe(Effect.as(5))

const program = Effect.match(task, {
  onFailure: constVoid,
  onSuccess: constVoid
})
```

In this case, we use the `constVoid` function from the `Function` module, which constantly returns `void`, to provide handlers that perform no operation. This effectively discards the success and failure values and focuses solely on the control flow or side effects of the program. Alternatively, we can achieve the same result using the `Effect.ignore` function:

```ts
import { Effect } from "effect"

const task = Effect.fail("Uh oh!").pipe(Effect.as(5))

const program = Effect.ignore(task)
```

## matchEffect

In addition to `Effect.match`, we have the `Effect.matchEffect` function, which allows us to handle success and failure cases while performing additional side effects. Here's an example:

```ts
import { Effect } from "effect"

const success: Effect.Effect<number, Error> = Effect.succeed(42)
const failure: Effect.Effect<number, Error> = Effect.fail(new Error("Uh oh!"))

const program1 = Effect.matchEffect(success, {
  onFailure: (error) =>
    Effect.succeed(`failure: ${error.message}`).pipe(Effect.tap(Effect.log)),
  onSuccess: (value) =>
    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))
})

console.log(Effect.runSync(program1))
/*
Output:
... message="success: 42"
success: 42
*/

const program2 = Effect.matchEffect(failure, {
  onFailure: (error) =>
    Effect.succeed(`failure: ${error.message}`).pipe(Effect.tap(Effect.log)),
  onSuccess: (value) =>
    Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))
})

console.log(Effect.runSync(program2))
/*
Output:
... message="failure: Uh oh!"
failure: Uh oh!
*/
```

In this example, we use `Effect.matchEffect` instead of `Effect.match`. The `Effect.matchEffect` function allows us to perform additional side effects while handling success and failure cases. We can log messages or perform other side effects within the respective handlers.

## matchCause / matchCauseEffect

Effect also provides `Effect.matchCause` and `Effect.matchCauseEffect` functions, which are useful for accessing the full cause of the underlying fiber in case of failure. This allows us to handle different failure causes separately and take appropriate actions. Here's an example:

```ts
import { Effect, Console } from "effect"

declare const exceptionalEffect: Effect.Effect<void, Error>

const program = Effect.matchCauseEffect(exceptionalEffect, {
  onFailure: (cause) => {
    switch (cause._tag) {
      case "Fail":
        return Console.log(`Fail: ${cause.error.message}`)
      case "Die":
        return Console.log(`Die: ${cause.defect}`)
      case "Interrupt":
        return Console.log(`${cause.fiberId} interrupted!`)
    }
    return Console.log("failed due to other causes")
  },
  onSuccess: (value) => Console.log(`succeeded with ${value} value`)
})
```

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

# Timing out

Learn how to set time constraints on operations with `Effect.timeout`. Discover how to handle scenarios where tasks need to complete within a specified timeframe. Explore variations like `timeoutTo`, `timeoutFail`, and `timeoutFailCause` to customize behavior when a timeout occurs, providing more control and flexibility in managing time-sensitive operations.

In programming, we often deal with tasks that take time to complete. Sometimes, we want to set a limit on how long we are willing to wait for a task to finish. This is where the `Effect.timeout` function comes into play. It allows us to put a time constraint on an operation, ensuring that it doesn't run indefinitely.

## Basic Usage

### timeout

The `Effect.timeout` function employs a Duration parameter to establish a time limit on an operation. If the operation exceeds this limit, a `TimeoutException` is triggered, indicating a timeout has occurred.

Here's a basic example where `Effect.timeout` is applied to an operation:

```ts
import { Effect } from "effect"

const myEffect = Effect.gen(function* () {
  console.log("Start processing...")
  yield* Effect.sleep("2 seconds") // Simulates a delay in processing
  console.log("Processing complete.")
  return "Result"
})

// wraps this effect, setting a maximum allowable duration of 3 seconds
const timedEffect = myEffect.pipe(Effect.timeout("3 seconds"))

// Output will show that the task completes successfully
Effect.runPromiseExit(timedEffect).then(console.log)
/*
Output:
Start processing...
Processing complete.
{ _id: 'Exit', _tag: 'Success', value: 'Result' }
*/
```

In the above example, the operation completes within the specified duration, so the result is returned successfully.

If the operation takes longer than the specified duration, a `TimeoutException` is raised:

```ts
import { Effect } from "effect"

const myEffect = Effect.gen(function* () {
  console.log("Start processing...")
  yield* Effect.sleep("2 seconds")
  console.log("Processing complete.")
  return "Result"
})

const timedEffect = myEffect.pipe(Effect.timeout("1 second"))

Effect.runPromiseExit(timedEffect).then(console.log)
/*
Output:
Start processing...
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: { _tag: 'TimeoutException' } }
}
*/
```

### timeoutOption

If you want to handle the timeout as a regular result, you can use `Effect.timeoutOption` instead of `Effect.timeout`.

```ts
import { Effect } from "effect"

const myEffect = Effect.gen(function* () {
  console.log("Start processing...")
  yield* Effect.sleep("2 seconds")
  console.log("Processing complete.")
  return "Result"
})

const timedOutEffect = Effect.all([
  myEffect.pipe(Effect.timeoutOption("3 seconds")),
  myEffect.pipe(Effect.timeoutOption("1 second"))
])

Effect.runPromise(timedOutEffect).then(console.log)
/*
Output:
Start processing...
Processing complete.
Start processing...
[
  { _id: 'Option', _tag: 'Some', value: 'Result' },
  { _id: 'Option', _tag: 'None' }
]
*/
```

In this example, the first effect completes within the specified duration, while the second effect times out. The result of the timed-out effect is wrapped in an Option type, allowing you to handle the timeout as a regular result.

## Handling Timeouts

When an operation does not finish within the specified duration, the behavior of the `Effect.timeout` depends on whether the operation is uninterruptible.

An **uninterruptible** effect is one that, once started, cannot be stopped mid-execution by the timeout mechanism directly. This could be because the operations within the effect need to run to completion to avoid leaving the system in an inconsistent state.

1. **Interruptible Operation**: If the operation can be interrupted, it is terminated immediately once the timeout threshold is reached, resulting in a `TimeoutException`.

   ```ts
   import { Effect } from "effect"

   const myEffect = Effect.gen(function* () {
     console.log("Start processing...")
     yield* Effect.sleep("2 seconds") // Simulates a delay in processing
     console.log("Processing complete.")
     return "Result"
   })

   const timedEffect = myEffect.pipe(Effect.timeout("1 second"))

   Effect.runPromiseExit(timedEffect).then(console.log)
   /*
   Output:
   Start processing...
   {
     _id: 'Exit',
     _tag: 'Failure',
     cause: { _id: 'Cause', _tag: 'Fail', failure: { _tag: 'TimeoutException' } }
   }
   */
   ```

2. **Uninterruptible Operation**: If the operation is uninterruptible, it continues until completion before the `TimeoutException` is assessed.

   ```ts
   import { Effect } from "effect"

   const myEffect = Effect.gen(function* () {
     console.log("Start processing...")
     yield* Effect.sleep("2 seconds") // Simulates a delay in processing
     console.log("Processing complete.")
     return "Result"
   })

   const timedEffect = myEffect.pipe(
     Effect.uninterruptible,
     Effect.timeout("1 second")
   )

   Effect.runPromiseExit(timedEffect).then(console.log)
   /*
   Output:
   Start processing...
   Processing complete.
   {
     _id: 'Exit',
     _tag: 'Failure',
     cause: { _id: 'Cause', _tag: 'Fail', failure: { _tag: 'TimeoutException' } }
   }
   */
   ```

## Disconnection on Timeout

The `Effect.disconnect` function is used to handle timeouts in a nuanced way, particularly when dealing with uninterruptible effects.

It allows the uninterruptible effect to complete its operations in the background, while the main control flow proceeds as if a timeout had occurred.

Here's the distinction:

- **Without Effect.disconnect**: An uninterruptible effect will ignore the timeout and continue executing until it completes, after which the timeout error is assessed. This can lead to delays in recognizing a timeout condition because the system must wait for the effect to complete.

- **With Effect.disconnect**: The uninterruptible effect is allowed to continue in the background, independent of the main control flow. The main control flow recognizes the timeout immediately and proceeds with the timeout error or alternative logic, without having to wait for the effect to complete. This method is particularly useful when the operations of the effect do not need to block the continuation of the program, despite being marked as uninterruptible.

**Example**

Consider a scenario where a long-running data processing task is initiated, and you want to ensure the system remains responsive, even if the data processing takes too long:

```ts
import { Effect } from "effect"

const longRunningTask = Effect.gen(function* () {
  console.log("Start heavy processing...")
  yield* Effect.sleep("5 seconds") // Simulate a long process
  console.log("Heavy processing done.")
  return "Data processed"
})

const timedEffect = longRunningTask.pipe(
  Effect.uninterruptible,
  Effect.disconnect, // Allows the task to finish independently if it times out
  Effect.timeout("1 second")
)

Effect.runPromiseExit(timedEffect).then(console.log)
/*
Output:
Start heavy processing...
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: { _tag: 'TimeoutException' } }
}
Heavy processing done.
*/
```

## Customizing Timeout Behavior

In addition to the basic `Effect.timeout` function, there are variations available that allow you to customize the behavior when a timeout occurs.

### timeoutFail

The `Effect.timeoutFail` function allows you to produce a specific error when a timeout happens:

```ts
import { Effect } from "effect"

const myEffect = Effect.gen(function* () {
  console.log("Start processing...")
  yield* Effect.sleep("2 seconds") // Simulates a delay in processing
  console.log("Processing complete.")
  return "Result"
})

class MyTimeoutError {
  readonly _tag = "MyTimeoutError"
}

const program = myEffect.pipe(
  Effect.timeoutFail({
    duration: "1 second",
    onTimeout: () => new MyTimeoutError()
  })
)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Start processing...
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Fail',
    failure: MyTimeoutError { _tag: 'MyTimeoutError' }
  }
}
*/
```

### timeoutFailCause

The `Effect.timeoutFailCause` function allows you to produce a specific defect when a timeout occurs. This is useful when you need to handle timeouts as exceptional cases in your code:

```ts
import { Effect, Cause } from "effect"

const myEffect = Effect.gen(function* () {
  console.log("Start processing...")
  yield* Effect.sleep("2 seconds") // Simulates a delay in processing
  console.log("Processing complete.")
  return "Result"
})

const program = myEffect.pipe(
  Effect.timeoutFailCause({
    duration: "1 second",
    onTimeout: () => Cause.die("Timed out!")
  })
)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Start processing...
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Die', defect: 'Timed out!' }
}
*/
```

### timeoutTo

The `Effect.timeoutTo` function is similar to `Effect.timeout`, but it provides more control over the final result type. It allows you to define alternative outcomes for both successful and timed-out operations:

```ts
import { Effect, Either } from "effect"

const myEffect = Effect.gen(function* () {
  console.log("Start processing...")
  yield* Effect.sleep("2 seconds") // Simulates a delay in processing
  console.log("Processing complete.")
  return "Result"
})

const program = myEffect.pipe(
  Effect.timeoutTo({
    duration: "1 second",
    onSuccess: (result): Either.Either<string, string> =>
      Either.right(result),
    onTimeout: (): Either.Either<string, string> => Either.left("Timed out!")
  })
)

Effect.runPromise(program).then(console.log)
/*
Output:
Start processing...
{
  _id: "Either",
  _tag: "Left",
  left: "Timed out!"
}
*/

# Sandboxing

Errors are a common part of programming, arising from various reasons such as failures, defects, fiber interruptions, or combinations of these factors. This guide explores how to use the `Effect.sandbox` function to isolate and understand the causes of errors in your code.

## sandbox

The `Effect.sandbox` function encapsulates all potential causes of an error in an effect, exposing the full cause of an effect, whether due to a failure, defect, fiber interruption, or a combination of these factors.

### Signature

```ts
sandbox: Effect<A, E, R> -> Effect<A, Cause<E>, R>
```

This function transforms an effect `Effect<A, E, R>` into an effect `Effect<A, Cause<E>, R>`, where the error channel now contains a detailed cause of the error.

Using `Effect.sandbox`, you gain access to the underlying causes of exceptional effects, represented as a type of `Cause<E>`, available in the error channel of the `Effect` data type.

Once the causes are exposed, you can utilize standard error-handling operators like `Effect.catchAll` and `Effect.catchTags` to handle errors more effectively, allowing you to respond to specific error conditions.

### Example

```ts
import { Effect, Console } from "effect"

const effect = Effect.fail("Oh uh!").pipe(Effect.as("primary result"))

const sandboxed = Effect.sandbox(effect)

const program = Effect.catchTags(sandboxed, {
  Die: (cause) =>
    Console.log(`Caught a defect: ${cause.defect}`).pipe(
      Effect.as("fallback result on defect")
    ),
  Interrupt: (cause) =>
    Console.log(`Caught a defect: ${cause.fiberId}`).pipe(
      Effect.as("fallback result on fiber interruption")
    ),
  Fail: (cause) =>
    Console.log(`Caught a defect: ${cause.error}`).pipe(
      Effect.as("fallback result on failure")
    )
})

const main = Effect.unsandbox(program)

Effect.runPromise(main).then(console.log)
/*
Output:
Caught a defect: Oh uh!
fallback result on failure
*/
```

In this example, we expose the full cause of an effect using `Effect.sandbox`, handle specific error conditions with `Effect.catchTags`, and can undo the sandboxing operation with `Effect.unsandbox`.

# Error Accumulation

Discover how to handle errors in your Effect programming by exploring sequential combinators, such as `Effect.zip` and `Effect.forEach`. Learn about the "fail fast" policy and explore alternative approaches for error accumulation using functions like `Effect.validate`, `Effect.validateAll`, `Effect.validateFirst`, and `Effect.partition`.

Sequential combinators such as `Effect.zip` and `Effect.forEach` have a "fail fast" policy when it comes to error management. This means that they stop and return immediately when they encounter the first error.

## Example of Effect.zip

In this example, `Effect.zip` will fail as soon as it encounters the first failure. As a result, only the first error is displayed:

```ts
import { Effect } from "effect"

const task1 = Effect.succeed(1)
const task2 = Effect.fail("Oh uh!").pipe(Effect.as(2))
const task3 = Effect.succeed(3)
const task4 = Effect.fail("Oh no!").pipe(Effect.as(4))

const program = task1.pipe(
  Effect.zip(task2),
  Effect.zip(task3),
  Effect.zip(task4)
)

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
(FiberFailure) Error: Oh uh!
*/
```

## Example of Effect.forEach

The `Effect.forEach` function behaves similarly. It takes a collection and an effectful operation, and tries to apply the operation to all elements of the collection. However, it also follows the "fail fast" policy and fails when it encounters the first error:

```ts
import { Effect } from "effect"

const program = Effect.forEach([1, 2, 3, 4, 5], (n) => {
  if (n < 4) {
    return Effect.succeed(n)
  } else {
    return Effect.fail(`${n} is not less than 4`)
  }
})

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
(FiberFailure) Error: 4 is not less than 4
*/
```

## validate

The `Effect.validate` function is similar to `Effect.zip`, but if it encounters an error, it continues the zip operation instead of stopping. It combines the effects and accumulates both errors and successes:

```ts
import { Effect } from "effect"

const task1 = Effect.succeed(1)
const task2 = Effect.fail("Oh uh!").pipe(Effect.as(2))
const task3 = Effect.succeed(3)
const task4 = Effect.fail("Oh no!").pipe(Effect.as(4))

const program = task1.pipe(
  Effect.validate(task2),
  Effect.validate(task3),
  Effect.validate(task4)
)

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
(FiberFailure) Error: Oh uh!
Error: Oh no!
*/
```

With `Effect.validate`, we can collect all the errors encountered during the computation instead of stopping at the first error. This allows us to have a complete picture of all the potential errors and successes in our program.

## validateAll

The `Effect.validateAll` function is similar to the `Effect.forEach` function. It transforms all elements of a collection using the provided effectful operation, but it collects all errors in the error channel, as well as the success values in the success channel.

```ts
import { Effect } from "effect"

const program = Effect.validateAll([1, 2, 3, 4, 5], (n) => {
  if (n < 4) {
    return Effect.succeed(n)
  } else {
    return Effect.fail(`${n} is not less than 4`)
  }
})

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
(FiberFailure) Error: ["4 is not less than 4","5 is not less than 4"]
*/
```

Note that this function is lossy, which means that if there are any errors, all successes will be lost. If you need a function that preserves both successes and failures, please refer to the partition function.

## validateFirst

The `Effect.validateFirst` function is similar to `Effect.validateAll` but it will return the first success (or all the failures):

```ts
import { Effect } from "effect"

const program = Effect.validateFirst([1, 2, 3, 4, 5], (n) => {
  if (n < 4) {
    return Effect.fail(`${n} is not less than 4`)
  } else {
    return Effect.succeed(n)
  }
})

Effect.runPromise(program).then(console.log, console.error)
// Output: 4
```

Please note that the return type is `number` instead of `number[]`, as in the case of `validateAll`.

## partition

The `Effect.partition` function takes an iterable and an effectful function that transforms each value of the iterable. It then creates a tuple of both failures and successes in the success channel:

```ts
import { Effect } from "effect"

const program = Effect.partition([0, 1, 2, 3, 4], (n) => {
  if (n % 2 === 0) {
    return Effect.succeed(n)
  } else {
    return Effect.fail(`${n} is not even`)
  }
})

Effect.runPromise(program).then(console.log, console.error)
// Output: [ [ '1 is not even', '3 is not even' ], [ 0, 2, 4 ] ]
```

Please note that this operator is an unexceptional effect, which means that the type of the error channel is `never`. Therefore, if we encounter a failure case, the whole effect doesn't fail.

---
title: Error Management
excerpt: Error Management
collapsible: true
bottomNavigation: childCards
---


# Managing Services

In the context of programming, a **service** refers to a reusable component or functionality that can be used by different parts of an application. Services are designed to provide specific capabilities and can be shared across multiple modules or components. They often encapsulate common tasks or operations needed by different parts of an application, handling complex operations, interacting with external systems or APIs, managing data, or performing other specialized tasks.

Services are typically designed to be modular and decoupled from the rest of the application, allowing for easy maintenance, testing, and replacement without affecting overall functionality.

## Overview

When integrating services in application development, it is essential to manage function dependencies effectively. Manually passing services to every function can become cumbersome as the application grows. Instead, consider using an environment object that bundles various services:

```ts
type Context = {
  databaseService: DatabaseService
  loggingService: LoggingService
}

const processData = (data: Data, context: Context) => {
  // Using multiple services from the context
}
```

However, this can lead to tightly coupled code. The Effect library simplifies managing dependencies by leveraging the type system. You can declare service dependencies directly in the function's type signature using the `Requirements` parameter in the `Effect<Success, Error, Requirements>` type.

- **Dependency Declaration**: Specify what services a function needs directly in its type.
- **Service Provision**: Use `Effect.provideService` to make a service implementation available to the functions that need it.

This method abstracts manual handling of services and dependencies, allowing developers to focus on business logic while the compiler manages dependencies.

### Creating a Service

To create a service, you need a unique identifier and a type describing the possible operations of the service. For example, to create a service for generating random numbers:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}
```

The exported `Random` value acts as a **tag** in Effect, allowing it to locate and use this service at runtime. The service is stored in a `Context`, functioning like a `Map` where keys are tags and values are services.

### Using the Service

To use the service, you can build a simple program:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

const program = Effect.gen(function* () {
  const random = yield* Random
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})
```

The type of the `program` variable includes `Random` in the `Requirements` type parameter: `Effect<void, never, Random>`. This indicates that the program requires the `Random` service to execute successfully.

### Providing a Service Implementation

To provide an implementation of the `Random` service, use the `Effect.provideService` function:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

const program = Effect.gen(function* () {
  const random = yield* Random
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})

const runnable = Effect.provideService(program, Random, {
  next: Effect.sync(() => Math.random())
})

Effect.runPromise(runnable)
```

### Extracting the Service Type

To retrieve the service type from a tag, use the `Context.Tag.Service` utility type:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

type RandomShape = Context.Tag.Service<Random>
```

## Using Multiple Services

When using more than one service, the process is similar. For example, if you need both `Random` and `Logger` services:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

class Logger extends Context.Tag("MyLoggerService")<
  Logger,
  { readonly log: (message: string) => Effect.Effect<void> }
>() {}

const program = Effect.gen(function* () {
  const random = yield* Random
  const logger = yield* Logger
  const randomNumber = yield* random.next
  return yield* logger.log(String(randomNumber))
})
```

To execute the program, provide implementations for both services:

```ts
const runnable1 = program.pipe(
  Effect.provideService(Random, {
    next: Effect.sync(() => Math.random())
  }),
  Effect.provideService(Logger, {
    log: (message) => Effect.sync(() => console.log(message))
  })
)
```

Alternatively, combine service implementations into a single `Context` and provide the entire context:

```ts
const context = Context.empty().pipe(
  Context.add(Random, { next: Effect.sync(() => Math.random()) }),
  Context.add(Logger, {
    log: (message) => Effect.sync(() => console.log(message))
  })
)

const runnable2 = Effect.provide(program, context)
```

## Optional Services

To access a service implementation only if it is available, use the `Effect.serviceOption` function. This function returns an implementation that is available only if it is provided before executing the effect.

Example:

```ts
import { Effect, Context, Option } from "effect"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Effect.Effect<number> }
>() {}

const program = Effect.gen(function* () {
  const maybeRandom = yield* Effect.serviceOption(Random)
  const randomNumber = Option.isNone(maybeRandom)
    ? -1
    : yield* maybeRandom.value.next
  console.log(randomNumber)
})
```

If the `Random` service is not provided, the output will be `-1`. If it is provided, it will log a random number generated by the `next` operation of the `Random` service.

---
title: Default Services
excerpt: Explore the default services in Effect - Clock, Console, Random, ConfigProvider, and Tracer. Learn how Effect automatically provides live versions of these services, eliminating the need for explicit implementations in your programs.
bottomNavigation: pagination
---

Effect comes equipped with five pre-built services:

```ts
type DefaultServices = Clock | Console | Random | ConfigProvider | Tracer
```

When we employ these services, there's no need to explicitly provide their implementations. Effect automatically supplies live versions of these services to our effects, sparing us from manual setup.

```ts twoslash
import { Effect, Clock, Console } from "effect"

const program = Effect.gen(function* () {
  const now = yield* Clock.currentTimeMillis
  yield* Console.log(`Application started at ${new Date(now)}`)
})
```

As you can observe, even if our program utilizes both `Clock` and `Console`, the `Requirements` parameter, representing the services required for the effect to execute, remains set to `never`.
Effect takes care of handling these services seamlessly for us.


# Managing Layers

Learn how to use Layers to control the construction of service dependencies and manage the "dependency graph" of your program more effectively.

In the previous sections, you learned how to create effects which depend on some service to be provided in order to execute, as well as how to provide that service to an Effect.

However, what if we have a service within our effect program that has dependencies on other services in order to be built? We want to avoid leaking these implementation details into the service interface.

To represent the "dependency graph" of our program and manage these dependencies more effectively, we can utilize a powerful abstraction called **Layer**.

Layers act as **constructors** for creating services, allowing us to manage dependencies during construction rather than at the service level. This approach helps to keep our service interfaces clean and focused.

**Concepts:**

- **Service**: A reusable component providing specific functionality, used across different parts of an application.
- **Tag**: A unique identifier representing a **service**, allowing Effect to locate and use it.
- **Context**: A collection storing services, functioning like a map with **tags** as keys and **services** as values.
- **Layer**: An abstraction for constructing **services**, managing dependencies during construction rather than at the service level.

## Designing the Dependency Graph

Imagine building a web application where the dependency graph includes configuration, logging, and database access:

- The `Config` service provides application configuration.
- The `Logger` service depends on the `Config` service.
- The `Database` service depends on both the `Config` and `Logger` services.

Our goal is to build the `Database` service along with its direct and indirect dependencies, ensuring that the `Config` service is available for both `Logger` and `Database`.

## Creating Layers

We will use Layers to construct the `Database` service instead of providing a service implementation directly. Layers separate implementation details from the service itself.

A `Layer<RequirementsOut, Error, RequirementsIn>` represents a blueprint for constructing a `RequirementsOut`. It takes a value of type `RequirementsIn` as input and may potentially produce an error of type `Error` during the construction process.

In our case, the `RequirementsOut` type represents the service we want to construct, while `RequirementsIn` represents the dependencies required for construction.

For simplicity, let's assume that we won't encounter any errors during the value construction (meaning `Error = never`).

### Layer Requirements

| **Layer**      | **Dependencies**                                           | **Type**                                   |
| -------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `ConfigLive`   | The `Config` service does not depend on any other services | `Layer<Config>`                            |
| `LoggerLive`   | The `Logger` service depends on the `Config` service       | `Layer<Logger, never, Config>`             |
| `DatabaseLive` | The `Database` service depends on `Config` and `Logger`    | `Layer<Database, never, Config | Logger>` |

A common convention when naming the `Layer` for a particular service is to add a `Live` suffix for the "live" implementation and a `Test` suffix for the "test" implementation.

### Config

The `Config` service does not depend on any other services, so `ConfigLive` will be the simplest layer to implement. We must create a `Tag` for the service. Since the service has no dependencies, we can create the layer directly using `Layer.succeed`:

```ts
import { Effect, Context, Layer } from "effect"

// Create a tag for the Config service
class Config extends Context.Tag("Config")<
  Config,
  {
    readonly getConfig: Effect.Effect<{
      readonly logLevel: string
      readonly connection: string
    }>
  }
>() {}

const ConfigLive = Layer.succeed(
  Config,
  Config.of({
    getConfig: Effect.succeed({
      logLevel: "INFO",
      connection: "mysql://username:password@hostname:port/database_name"
    })
  })
)
```

### Logger

Now we can implement the `Logger` service, which depends on the `Config` service to retrieve some configuration. We can map over the `Config` tag to "extract" the service from the context.

```ts
import { Effect, Context, Layer } from "effect"

class Logger extends Context.Tag("Logger")<
  Logger,
  { readonly log: (message: string) => Effect.Effect<void> }
>() {}

const LoggerLive = Layer.effect(
  Logger,
  Effect.gen(function* () {
    const config = yield* Config
    return {
      log: (message) =>
        Effect.gen(function* () {
          const { logLevel } = yield* config.getConfig
          console.log(`[${logLevel}] ${message}`)
        })
    }
  })
)
```

### Database

Finally, we can use our `Config` and `Logger` services to implement the `Database` service.

```ts
import { Effect, Context, Layer } from "effect"

class Database extends Context.Tag("Database")<
  Database,
  { readonly query: (sql: string) => Effect.Effect<unknown> }
>() {}

const DatabaseLive = Layer.effect(
  Database,
  Effect.gen(function* () {
    const config = yield* Config
    const logger = yield* Logger
    return {
      query: (sql: string) =>
        Effect.gen(function* () {
          yield* logger.log(`Executing query: ${sql}`)
          const { connection } = yield* config.getConfig
          return { result: `Results from ${connection}` }
        })
    }
  })
)
```

## Combining Layers

Layers can be combined in two primary ways: merging and composing.

### Merging Layers

Layers can be combined through merging using the `Layer.merge` combinator:

```ts
Layer.merge(layer1, layer2)
```

When merging two layers, the resulting layer requires all the services that both of them require and produces all services that both of them produce.

### Composing Layers

Layers can be composed using the `Layer.provide` function:

```ts
const composition = inner.pipe(Layer.provide(outer))
```

Now we can compose the `AppConfigLive` layer with the `DatabaseLive` layer:

```ts
const MainLive = DatabaseLive.pipe(
  Layer.provide(AppConfigLive),
  Layer.provide(ConfigLive)
)
```

### Merging and Composing Layers

To return both the `Config` and `Database` services, we can use `Layer.provideMerge`:

```ts
const MainLive = DatabaseLive.pipe(
  Layer.provide(AppConfigLive),
  Layer.provideMerge(ConfigLive)
)
```

## Providing a Layer to an Effect

Now that we have assembled the fully resolved `MainLive` for our application, we can provide it to our program to satisfy the program's requirements using `Effect.provide`:

```ts
const program = Effect.gen(function* () {
  const database = yield* Database
  const result = yield* database.query("SELECT * FROM users")
  return yield* Effect.succeed(result)
})

const runnable = Effect.provide(program, MainLive)

Effect.runPromise(runnable).then(console.log)
```

# Layer Memoization

Layer memoization allows a layer to be created once and used multiple times in the dependency graph. If the same layer is used twice, for example:

```
Layer.merge(Layer.provide(b, a), Layer.provide(c, a))
```

then the `a` layer will be allocated only once.

**Warning:** Layers are memoized using **reference equality**. Therefore, if you have a layer that is created by calling a function like `f()`, you should _only_ call that `f` once and re-use the resulting layer to ensure you are always using the same instance.

## Memoization When Providing Globally

In an Effect application, layers are shared by default. This means that if the same layer is used twice and provided globally, it will only be allocated a single time. For every layer in the dependency graph, there is only one instance shared between all layers that depend on it.

For example, consider the services `A`, `B`, and `C`, where both `B` and `C` depend on `A`:

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

class B extends Context.Tag("B")<B, { readonly b: string }>() {}

class C extends Context.Tag("C")<C, { readonly c: boolean }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const b = Layer.effect(
  B,
  Effect.gen(function* () {
    const { a } = yield* A
    return { b: String(a) }
  })
)

const c = Layer.effect(
  C,
  Effect.gen(function* () {
    const { a } = yield* A
    return { c: a > 0 }
  })
)

const program = Effect.gen(function* () {
  yield* B
  yield* C
})

const runnable = Effect.provide(
  program,
  Layer.merge(Layer.provide(b, a), Layer.provide(c, a))
)

Effect.runPromise(runnable)
/*
Output:
timestamp=... level=INFO fiber=#2 message=initialized
*/
```

Although both `b` and `c` layers require the `a` layer, the `a` layer is instantiated only once and shared with both `b` and `c`.

## Acquiring a Fresh Version

To create a fresh, non-shared version of a module, use `Layer.fresh`.

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

class B extends Context.Tag("B")<B, { readonly b: string }>() {}

class C extends Context.Tag("C")<C, { readonly c: boolean }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const b = Layer.effect(
  B,
  Effect.gen(function* () {
    const { a } = yield* A
    return { b: String(a) }
  })
)

const c = Layer.effect(
  C,
  Effect.gen(function* () {
    const { a } = yield* A
    return { c: a > 0 }
  })
)

const program = Effect.gen(function* () {
  yield* B
  yield* C
})

// ---cut---
const runnable = Effect.provide(
  program,
  Layer.merge(
    Layer.provide(b, Layer.fresh(a)),
    Layer.provide(c, Layer.fresh(a))
  )
)

Effect.runPromise(runnable)
/*
Output:
timestamp=... level=INFO fiber=#2 message=initialized
timestamp=... level=INFO fiber=#3 message=initialized
*/
```

## No Memoization When Providing Locally

When providing a layer locally, it does not support memoization by default. In the following example, the `a` layer is provided twice locally, resulting in two initializations:

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const program = Effect.gen(function* () {
  yield* Effect.provide(A, a)
  yield* Effect.provide(A, a)
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=initialized
timestamp=... level=INFO fiber=#0 message=initialized
*/
```

## Manual Memoization

You can manually memoize the `a` layer using the `Layer.memoize` operator, which returns a scoped effect that, when evaluated, returns the lazily computed result of this layer:

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const program = Effect.scoped(
  Layer.memoize(a).pipe(
    Effect.andThen((memoized) =>
      Effect.gen(function* () {
        yield* Effect.provide(A, memoized)
        yield* Effect.provide(A, memoized)
      })
    )
  )
)

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=initialized
*/

---
title: Requirements Management
excerpt: Requirements Management
collapsible: true
bottomNavigation: childCards
---


# Introduction

In the context of developing long-lived applications, resource management plays a critical role. Effective resource management is indispensable when building large-scale applications. It's imperative that our application is resource-efficient and does not result in resource leaks.

Resource leaks, such as unclosed socket connections, database connections, or file descriptors, are unacceptable in web applications. Effect offers robust constructs to address this concern effectively.

To create an application that manages resources safely, we must ensure that every time we open a resource, we have a mechanism in place to close it. This applies whether we fully utilize the resource or encounter exceptions during its use.

In the following sections, we'll delve deeper into how Effect simplifies resource management and ensures resource safety in your applications.

## Scope

The `Scope` data type is fundamental for managing resources safely and in a composable manner in Effect.

In simple terms, a scope represents the lifetime of one or more resources. When a scope is closed, the resources associated with it are guaranteed to be released.

With the `Scope` data type, you can:

- **Add finalizers**, which represent the release of a resource.
- **Close** the scope, releasing all acquired resources and executing any added finalizers.

To grasp the concept better, let's delve into an example that demonstrates how it works. It's worth noting that in typical Effect usage, you won't often find yourself working with these low-level APIs for managing scopes.

```ts
import { Scope, Effect, Console, Exit } from "effect"

const program =
  Scope.make().pipe(
    Effect.tap((scope) =>
      Scope.addFinalizer(scope, Console.log("finalizer 1"))
    ),
    Effect.tap((scope) =>
      Scope.addFinalizer(scope, Console.log("finalizer 2"))
    ),
    Effect.andThen((scope) =>
      Scope.close(scope, Exit.succeed("scope closed successfully"))
    )
  )

Effect.runPromise(program)
/*
Output:
finalizer 2 <-- finalizers are closed in reverse order
finalizer 1
*/
```

By default, when a `Scope` is closed, all finalizers added to that `Scope` are executed in the reverse order in which they were added. This approach makes sense because releasing resources in the reverse order of acquisition ensures that resources are properly closed.

For instance, if you open a network connection and then access a file on a remote server, you must close the file before closing the network connection. This sequence is critical to maintaining the ability to interact with the remote server.

## addFinalizer

Now, let's dive into the `Effect.addFinalizer` function, which provides a higher-level API for adding finalizers to the scope of an `Effect` value. These finalizers are guaranteed to execute when the associated scope is closed, and their behavior may depend on the `Exit` value with which the scope is closed.

Let's explore some examples to understand this better.

Let's observe how things behave in the event of success:

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.addFinalizer((exit) =>
    Console.log(`finalizer after ${exit._tag}`)
  )
  return 1
})

const runnable = Effect.scoped(program)

Effect.runPromise(runnable).then(console.log, console.error)
/*
Output:
finalizer after Success
1
*/
```

```ts
import { Effect, Console } from "effect"

const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.andThen(Effect.succeed(1)))

const runnable = Effect.scoped(program)

Effect.runPromise(runnable).then(console.log, console.error)
/*
Output:
finalizer after Success
1
*/
```

Here, the `Effect.addFinalizer` operator adds a `Scope` to the context required by the workflow. This signifies that the workflow needs a `Scope` to execute. You can provide this `Scope` using the `Effect.scoped` operator. It creates a new `Scope`, supplies it to the workflow, and closes the `Scope` once the workflow is complete.

The `Effect.scoped` operator removes the `Scope` from the context, indicating that the workflow no longer requires any resources associated with a scope.

Next, let's explore how things behave in the event of a failure:

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.addFinalizer((exit) =>
    Console.log(`finalizer after ${exit._tag}`)
  )
  return yield* Effect.fail("Uh oh!")
})

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' }
}
*/
```

```ts
import { Effect, Console } from "effect"

const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.andThen(Effect.fail("Uh oh!")))

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' }
}
*/
```

Finally, let's explore the behavior in the event of an interruption:

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.addFinalizer((exit) =>
    Console.log(`finalizer after ${exit._tag}`)
  )
  return yield* Effect.interrupt
})

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Interrupt',
    fiberId: {
      _id: 'FiberId',
      _tag: 'Runtime',
      id: 0,
      startTimeMillis: ...
    }
  }
}
*/
```

```ts
import { Effect, Console } from "effect"

const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.andThen(Effect.interrupt))

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Interrupt',
    fiberId: {
      _id: 'FiberId',
      _tag: 'Runtime',
      id: 0,
      startTimeMillis: ...
    }
  }
}
*/
```

## Manually Create and Close Scopes

When you're working with multiple scoped resources within a single operation, it's important to understand how their scopes interact. By default, these scopes are merged into one, but you can have more fine-grained control over when each scope is closed by manually creating and closing them.

Let's start by looking at how scopes are merged by default. Take a look at this code example:

```ts
import { Effect, Console } from "effect"

const task1 = Effect.gen(function* () {
  console.log("task 1")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 1"))
})

const task2 = Effect.gen(function* () {
  console.log("task 2")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 2"))
})

const program = Effect.gen(function* () {
  yield* task1
  yield* task2
})

Effect.runPromise(program.pipe(Effect.scoped))
/*
Output:
task 1
task 2
finalizer after task 2
finalizer after task 1
*/
```

```ts
import { Effect, Console } from "effect"

const task1 = Console.log("task 1").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 1"))
  )
)

const task2 = Console.log("task 2").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 2"))
  )
)

const program =
  Effect.all([task1, task2], { discard: true })

Effect.runPromise(program.pipe(Effect.scoped))
/*
Output:
task 1
task 2
finalizer after task 2
finalizer after task 1
*/
```

In this case, the scopes of `task1` and `task2` are merged into a single scope, and when the program is run, it outputs the tasks and their finalizers in a specific order.

If you want more control over when each scope is closed, you can manually create and close them, as shown in this example:

```ts
import { Console, Effect, Exit, Scope } from "effect"

const task1 = Effect.gen(function* () {
  console.log("task 1")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 1"))
})

const task2 = Effect.gen(function* () {
  console.log("task 2")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 2"))
})

const program = Effect.gen(function* () {
  const scope1 = yield* Scope.make()
  const scope2 = yield* Scope.make()

  yield* task1.pipe(Scope.extend(scope1))
  yield* task2.pipe(Scope.extend(scope2))

  yield* Scope.close(scope1, Exit.void)
  yield* Console.log("doing something else")
  yield* Scope.close(scope2, Exit.void)
})

Effect.runPromise(program)
/*
Output:
task 1
task 2
finalizer after task 1
doing something else
finalizer after task 2
*/
```

```ts
import { Console, Effect, Exit, Scope } from "effect"

const task1 = Console.log("task 1").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 1"))
  )
)

const task2 = Console.log("task 2").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 2"))
  )
)

const program = Effect.all([Scope.make(), Scope.make()]).pipe(
  Effect.andThen(([scope1, scope2]) =>
    Scope.extend(task1, scope1).pipe(
      Effect.andThen(Scope.extend(task2, scope2)),
      Effect.andThen(Scope.close(scope1, Exit.void)),
      Effect.andThen(Console.log("doing something else")),
      Effect.andThen(Scope.close(scope2, Exit.void))
    )
  )
)

Effect.runPromise(program)
/*
Output:
task 1
task 2
finalizer after task 1
doing something else
finalizer after task 2
*/
```

In this example, we create two separate scopes, `scope1` and `scope2`, and extend the scope of each task into its respective scope. When you run the program, it outputs the tasks and their finalizers in a different order.

The `Scope.extend` function allows you to extend the scope of an `Effect` workflow that requires a scope into another scope without closing the scope when the workflow finishes executing. This allows you to extend a scoped value into a larger scope.

You might wonder what happens when a scope is closed, but a task within that scope hasn't completed yet. The key point to note is that the scope closing doesn't force the task to be interrupted. It will continue running, and the finalizer will execute immediately when registered. The call to `close` will only wait for the finalizers that have already been registered.

So, finalizers run when the scope is closed, not necessarily when the effect finishes running. When you're using `Effect.scoped`, the scope is managed automatically, and finalizers are executed accordingly. However, when you manage the scope manually, you have control over when finalizers are executed.

## Defining Resources

We can define a resource using operators like `Effect.acquireRelease(acquire, release)`, which allows us to create a scoped value from an `acquire` and `release` workflow.

Every acquire release requires three actions:

- **Acquiring Resource**. An effect describing the acquisition of resource. For example, opening a file.
- **Using Resource**. An effect describing the actual process to produce a result. For example, counting the number of lines in a file.
- **Releasing Resource**. An effect describing the final step of releasing or cleaning up the resource. For example, closing a file.

The `Effect.acquireRelease` operator performs the `acquire` workflow **uninterruptibly**. This is important because if we allowed interruption during resource acquisition we could be interrupted when the resource was partially acquired.

The guarantee of the `Effect.acquireRelease` operator is that if the `acquire` workflow successfully completes execution then the `release` workflow is guaranteed to be run when the `Scope` is closed.

For example, let's define a simple resource:

```ts
import { Effect } from "effect"

// Define the interface for the resource
export interface MyResource {
  readonly contents: string
  readonly close: () => Promise<void>
}

// Simulate getting the resource
const getMyResource = (): Promise<MyResource> =>
  Promise.resolve({
    contents: "lorem ipsum",
    close: () =>
      new Promise((resolve) => {
        console.log("Resource released")
        resolve()
      })
  })

// Define the acquisition of the resource with error handling
export const acquire = Effect.tryPromise({
  try: () =>
    getMyResource().then((res) => {
      console.log("Resource acquired")
      return res
    }),
  catch: () => new Error("getMyResourceError")
})

// Define the release of the resource
export const release = (res: MyResource) => Effect.promise(() => res.close())

export const resource = Effect.acquireRelease(acquire, release)
```

Notice that the `Effect.acquireRelease` operator added a `Scope` to the context required by the workflow:

```ts
Effect<MyResource, Error, Scope>
```

This indicates that the workflow needs a `Scope` to run and adds a finalizer that will close the resource when the scope is closed.

We can continue working with the resource for as long as we want by using `Effect.andThen` or other Effect operators. For example, here's how we can read the contents:

```ts
import { Effect } from "effect"
import { resource } from "./resource"

const program = Effect.gen(function* () {
  const res = yield* resource
  console.log(`content is ${res.contents}`)
})
```

```ts
import { Effect, Console } from "effect"
import { resource } from "./resource"

const program = resource.pipe(
  Effect.andThen((res) => Console.log(`content is ${res.contents}`))
)
```

Once we are done working with the resource, we can close the scope using the `Effect.scoped` operator. It creates a new `Scope`, provides it to the workflow, and closes the `Scope` when the workflow is finished.

```ts
import { Effect } from "effect"
import { resource } from "./resource"

const program = Effect.scoped(
  Effect.gen(function* () {
    const res = yield* resource
    console.log(`content is ${res.contents}`)
  })
)
```

```ts
import { Effect, Console } from "effect"
import { resource } from "./resource"

const program = Effect.scoped(
  resource.pipe(
    Effect.andThen((res) => Console.log(`content is ${res.contents}`))
  )
)
```

The `Effect.scoped` operator removes the `Scope` from the context, indicating that there are no longer any resources used by this workflow which require a scope.

We now have a workflow that is ready to run:

```ts
Effect.runPromise(program)
/*
Resource acquired
content is lorem ipsum
Resource released
*/
```

## acquireUseRelease

The `Effect.acquireUseRelease(acquire, use, release)` function is a specialized version of the `Effect.acquireRelease` function that simplifies resource management by automatically handling the scoping of resources.

The main difference is that `acquireUseRelease` eliminates the need to manually call `Effect.scoped` to manage the resource's scope. It has additional knowledge about when you are done using the resource created with the `acquire` step. This is achieved by providing a `use` argument, which represents the function that operates on the acquired resource. As a result, `acquireUseRelease` can automatically determine when it should execute the release step.

Here's an example that demonstrates the usage of `acquireUseRelease`:

```ts
import { Effect, Console } from "effect"
import { MyResource, acquire, release } from "./resource"

const use = (res: MyResource) => Console.log(`content is ${res.contents}`)

const program = Effect.acquireUseRelease(acquire, use, release)

Effect.runPromise(program)
/*
Output:
Resource acquired
content is lorem ipsum
Resource released
*/
```

# Sequence of Operations with Compensating Actions on Failure

In certain scenarios, you might need to perform a sequence of chained operations where the success of each operation depends on the previous one. However, if any of the operations fail, you would want to reverse the effects of all previous successful operations. This pattern is valuable when you need to ensure that either all operations succeed, or none of them have any effect at all.

Effect offers a way to achieve this pattern using the Effect.acquireRelease function in combination with the Exit type. The Effect.acquireRelease function allows you to acquire a resource, perform operations with it, and release the resource when you're done. The Exit type represents the outcome of an effectful computation, indicating whether it succeeded or failed.

Let's go through an example of implementing this pattern. Suppose we want to create a "Workspace" in our application, which involves creating an S3 bucket, an ElasticSearch index, and a Database entry that relies on the previous two.

To begin, we define the domain model for the required services: S3, ElasticSearch, and Database.

```typescript
import { Effect, Context } from "effect"

export class S3Error {
  readonly _tag = "S3Error"
}

export interface Bucket {
  readonly name: string
}

export class S3 extends Context.Tag("S3")<
  S3,
  {
    readonly createBucket: Effect.Effect<Bucket, S3Error>
    readonly deleteBucket: (bucket: Bucket) => Effect.Effect<void>
  }
>() {}

export class ElasticSearchError {
  readonly _tag = "ElasticSearchError"
}

export interface Index {
  readonly id: string
}

export class ElasticSearch extends Context.Tag("ElasticSearch")<
  ElasticSearch,
  {
    readonly createIndex: Effect.Effect<Index, ElasticSearchError>
    readonly deleteIndex: (index: Index) => Effect.Effect<void>
  }
>() {}

export class DatabaseError {
  readonly _tag = "DatabaseError"
}

export interface Entry {
  readonly id: string
}

export class Database extends Context.Tag("Database")<
  Database,
  {
    readonly createEntry: (
      bucket: Bucket,
      index: Index
    ) => Effect.Effect<Entry, DatabaseError>
    readonly deleteEntry: (entry: Entry) => Effect.Effect<void>
  }
>() {}
```

Next, we define the three create actions and the overall transaction (`make`) for the Workspace.

```typescript
import { Effect, Exit } from "effect"
import * as Services from "./Services"

// Create a bucket, and define the release function that deletes the bucket if the operation fails.
const createBucket = Effect.gen(function* () {
  const { createBucket, deleteBucket } = yield* Services.S3
  return yield* Effect.acquireRelease(createBucket, (bucket, exit) =>
    Exit.isFailure(exit) ? deleteBucket(bucket) : Effect.void
  )
})

// Create an index, and define the release function that deletes the index if the operation fails.
const createIndex = Effect.gen(function* () {
  const { createIndex, deleteIndex } = yield* Services.ElasticSearch
  return yield* Effect.acquireRelease(createIndex, (index, exit) =>
    Exit.isFailure(exit) ? deleteIndex(index) : Effect.void
  )
})

// Create an entry in the database, and define the release function that deletes the entry if the operation fails.
const createEntry = (bucket: Services.Bucket, index: Services.Index) =>
  Effect.gen(function* () {
    const { createEntry, deleteEntry } = yield* Services.Database
    return yield* Effect.acquireRelease(
      createEntry(bucket, index),
      (entry, exit) =>
        Exit.isFailure(exit) ? deleteEntry(entry) : Effect.void
    )
  })

export const make = Effect.scoped(
  Effect.gen(function* () {
    const bucket = yield* createBucket
    const index = yield* createIndex
    return yield* createEntry(bucket, index)
  })
)
```

We then create simple service implementations to test the behavior of our Workspace code. To achieve this, we will utilize layers to construct test services. These layers will be able to handle various scenarios, including errors, which we can control using the `FailureCase` type.

```typescript
import { Effect, Context, Layer, Console } from "effect"
import * as Services from "./Services"
import * as Workspace from "./Workspace"

type FailureCaseLiterals = "S3" | "ElasticSearch" | "Database" | undefined

class FailureCase extends Context.Tag("FailureCase")<
  FailureCase,
  FailureCaseLiterals
>() {}

const S3Test = Layer.effect(
  Services.S3,
  Effect.gen(function* () {
    const failureCase = yield* FailureCase
    return {
      createBucket: Effect.gen(function* () {
        console.log("[S3] creating bucket")
        if (failureCase === "S3") {
          return yield* Effect.fail(new Services.S3Error())
        } else {
          return { name: "<bucket.name>" }
        }
      }),
      deleteBucket: (bucket) =>
        Console.log(`[S3] delete bucket ${bucket.name}`)
    }
  })
)

const ElasticSearchTest = Layer.effect(
  Services.ElasticSearch,
  Effect.gen(function* () {
    const failureCase = yield* FailureCase
    return {
      createIndex: Effect.gen(function* () {
        console.log("[ElasticSearch] creating index")
        if (failureCase === "ElasticSearch") {
          return yield* Effect.fail(new Services.ElasticSearchError())
        } else {
          return { id: "<index.id>" }
        }
      }),
      deleteIndex: (index) =>
        Console.log(`[ElasticSearch] delete index ${index.id}`)
    }
  })
)

const DatabaseTest = Layer.effect(
  Services.Database,
  Effect.gen(function* () {
    const failureCase = yield* FailureCase
    return {
      createEntry: (bucket, index) =>
        Effect.gen(function* () {
          console.log(
            `[Database] creating entry for bucket ${bucket.name} and index ${index.id}`
          )
          if (failureCase === "Database") {
            return yield* Effect.fail(new Services.DatabaseError())
          } else {
            return { id: "<entry.id>" }
          }
        }),
      deleteEntry: (entry) =>
        Console.log(`[Database] delete entry ${entry.id}`)
    }
  })
)

const layer = Layer.mergeAll(S3Test, ElasticSearchTest, DatabaseTest)

const runnable = Workspace.make.pipe(
  Effect.provide(layer),
  Effect.provideService(FailureCase, undefined)
)

Effect.runPromise(Effect.either(runnable)).then(console.log)
```

In this case, all operations succeed, and we see a successful result with `right({ id: '<entry.id>' })`.

Now, let's simulate a failure in the `Database`:

```typescript
const runnable = Workspace.make.pipe(
  Effect.provide(layer),
  Effect.provideService(FailureCase, "Database")
)
```

The console output will show the rollback actions taken due to the failure.

You can observe that once the `Database` error occurs, there is a complete rollback that deletes the `ElasticSearch` index first and then the associated `S3` bucket. The result is a failure with `left(new DatabaseError())`.

Let's now make the index creation fail instead:

```typescript
const runnable = Workspace.make.pipe(
  Effect.provide(layer),
  Effect.provideService(FailureCase, "ElasticSearch")
)
```

In this case, the console output will show the rollback actions taken due to the failure.

As expected, once the `ElasticSearch` index creation fails, there is a rollback that deletes the `S3` bucket. The result is a failure with `left(new ElasticSearchError())`.

---
title: Patterns
excerpt: Resource Management Patterns
collapsible: true
bottomNavigation: childCards
---


---
title: Resource Management
excerpt: Resource Management
collapsible: true
bottomNavigation: childCards
---


# Logging

Explore the power of logging in Effect for enhanced debugging and monitoring. Learn about dynamic log level control, custom logging output, fine-grained logging, environment-based logging, and additional features. Dive into specific logging utilities such as log, logDebug, logInfo, logWarning, logError, logFatal, and spans. Discover how to disable default logging and load log levels from configuration. Finally, explore the creation of custom loggers to tailor logging to your needs.

Logging is a crucial aspect of software development, especially when it comes to debugging and monitoring the behavior of your applications. In this section, we'll delve into Effect's logging utilities and explore their advantages over traditional methods like `console.log`.

## Advantages Over Traditional Logging

Effect's logging utilities offer several advantages over traditional logging methods like `console.log`:

1. **Dynamic Log Level Control**: Change the log level dynamically to control which log messages get displayed based on their severity.

2. **Custom Logging Output**: Direct log messages to various destinations using a custom logger, ensuring logs are stored and processed according to your application's requirements.

3. **Fine-Grained Logging**: Set different log levels for different parts of your application, allowing for tailored detail in logs.

4. **Environment-Based Logging**: Combine logging utilities with deployment environments for granular logging strategies.

5. **Additional Features**: Measure time spans, alter log levels on a per-effect basis, and integrate spans for performance monitoring.

## Logging Utilities

### log

The `Effect.log` function outputs a log message at the default `INFO` level.

```ts
import { Effect } from "effect"

const program = Effect.log("Application started")

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="Application started"
*/
```

Log entries include:

- `timestamp`: When the log message was generated.
- `level`: The log level.
- `fiber`: The identifier of the fiber executing the program.
- `message`: The log content.
- `span`: (Optional) The duration of the span in milliseconds.

You can log multiple messages simultaneously:

```ts
import { Effect } from "effect"

const program = Effect.log("message1", "message2", "message3")

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 message=message2 message=message3
*/
```

Include one or more Cause instances in your logs for detailed error information:

```ts
import { Effect, Cause } from "effect"

const program = Effect.log(
  "message1",
  "message2",
  Cause.die("Oh no!"),
  Cause.die("Oh uh!")
)

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no! Error: Oh uh!"
*/
```

### Log Levels

#### logDebug

By default, `DEBUG` messages are not printed. Enable them using `Logger.withMinimumLogLevel`.

Example:

```ts
import { Effect, Logger, LogLevel } from "effect"

const task1 = Effect.gen(function* () {
  yield* Effect.sleep("2 seconds")
  yield* Effect.logDebug("task1 done")
}).pipe(Logger.withMinimumLogLevel(LogLevel.Debug))

const program = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* task1
  yield* Effect.log("done")
})

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO message=start
timestamp=... level=DEBUG message="task1 done" <-- 2 seconds later
timestamp=... level=INFO message=done
*/
```

#### logInfo

By default, `INFO` messages are printed.

Example:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.logInfo("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.logInfo("done")
})

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO message=start
timestamp=... level=INFO message=done
*/
```

#### logWarning

By default, `WARN` messages are printed.

Example:

```ts
import { Effect, Either } from "effect"

const task = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(task)
  if (Either.isLeft(failureOrSuccess)) {
    yield* Effect.logWarning(failureOrSuccess.left)
    return 0
  } else {
    return failureOrSuccess.right
  }
})

Effect.runFork(program)
/*
Output:
timestamp=... level=WARN fiber=#0 message="Oh uh!"
*/
```

#### logError

By default, `ERROR` messages are printed.

Example:

```ts
import { Effect, Either } from "effect"

const task = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(task)
  if (Either.isLeft(failureOrSuccess)) {
    yield* Effect.logError(failureOrSuccess.left)
    return 0
  } else {
    return failureOrSuccess.right
  }
})

Effect.runFork(program)
/*
Output:
timestamp=... level=ERROR fiber=#0 message="Oh uh!"
*/
```

#### logFatal

By default, `FATAL` messages are printed.

Example:

```ts
import { Effect, Either } from "effect"

const task = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(task)
  if (Either.isLeft(failureOrSuccess)) {
    yield* Effect.logFatal(failureOrSuccess.left)
    return 0
  } else {
    return failureOrSuccess.right
  }
})

Effect.runFork(program)
/*
Output:
timestamp=... level=FATAL fiber=#0 message="Oh uh!"
*/
```

## Custom Annotations

Enhance log outputs by incorporating custom annotations with the `Effect.annotateLogs` function.

Example of a single annotation:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("message1")
  yield* Effect.log("message2")
}).pipe(Effect.annotateLogs("key", "value"))

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 key=value
timestamp=... level=INFO fiber=#0 message=message2 key=value
*/
```

To apply multiple annotations:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("message1")
  yield* Effect.log("message2")
}).pipe(Effect.annotateLogs({ key1: "value1", key2: "value2" }))

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 key2=value2 key1=value1
timestamp=... level=INFO fiber=#0 message=message2 key2=value2 key1=value1
*/
```

## Log Spans

Effect provides support for log spans, allowing you to measure the duration of specific operations.

Example:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.sleep("1 second")
  yield* Effect.log("The job is finished!")
}).pipe(Effect.withLogSpan("myspan"))

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="The job is finished!" myspan=1011ms
*/
```

## Disabling Default Logging

To turn off default logging, you can use various methods:

**Using withMinimumLogLevel**

```ts
import { Effect, Logger, LogLevel } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("Executing task...")
  yield* Effect.sleep("100 millis")
  console.log("task done")
})

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="Executing task..."
task done
*/

Effect.runFork(program.pipe(Logger.withMinimumLogLevel(LogLevel.None)))
/*
Output:
task done
*/
```

**Using a Layer**

```ts
import { Effect, Logger, LogLevel } from "effect"

const layer = Logger.minimumLogLevel(LogLevel.None)

Effect.runFork(program.pipe(Effect.provide(layer)))
/*
Output:
task done
*/
```

**Using a Custom Runtime**

```ts
import { Effect, Logger, LogLevel, ManagedRuntime } from "effect"

const customRuntime = ManagedRuntime.make(
  Logger.minimumLogLevel(LogLevel.None)
)

customRuntime.runPromise(program)
/*
Output:
task done
*/
```

## Loading the Log Level from Configuration

To retrieve the log level from a configuration, utilize the layer produced by `Logger.minimumLogLevel`:

```ts
import {
  Effect,
  Config,
  Logger,
  Layer,
  ConfigProvider,
  LogLevel
} from "effect"

const program = Effect.gen(function* () {
  yield* Effect.logError("ERROR!")
  yield* Effect.logWarning("WARNING!")
  yield* Effect.logInfo("INFO!")
  yield* Effect.logDebug("DEBUG!")
})

const LogLevelLive = Config.logLevel("LOG_LEVEL").pipe(
  Effect.andThen((level) => Logger.minimumLogLevel(level)),
  Layer.unwrapEffect
)

const configured = Effect.provide(program, LogLevelLive)

const test = Effect.provide(
  configured,
  Layer.setConfigProvider(
    ConfigProvider.fromMap(new Map([["LOG_LEVEL", LogLevel.Warning.label]]))
  )
)

Effect.runFork(test)
/*
Output:
... level=ERROR fiber=#0 message=ERROR!
... level=WARN fiber=#0 message=WARNING!
*/
```

## Custom Loggers

Define a custom logger using `Logger.make`:

```ts
import { Logger } from "effect"

export const logger = Logger.make(({ logLevel, message }) => {
  globalThis.console.log(`[${logLevel.label}] ${message}`)
})
```

To replace the default logger, create a layer using `Logger.replace` and provide it to your program:

```ts
import { Effect, Logger, LogLevel } from "effect"
import * as CustomLogger from "./CustomLogger"
import { program } from "./program"

const layer = Logger.replace(Logger.defaultLogger, CustomLogger.logger)

Effect.runFork(
  program.pipe(
    Logger.withMinimumLogLevel(LogLevel.Debug),
    Effect.provide(layer)
  )
)
```

## Built-in Loggers

### json

Formats log entries as JSON objects.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.json)))
```

### logFmt

Outputs logs in a human-readable format.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.logFmt)))
```

### structured

Provides detailed log outputs, structured for comprehensive traceability.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.structured)))
```

### pretty

Generates visually engaging and color-enhanced log outputs.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.pretty)))
```

Log levels are colored as follows:

| Log Level | Color        |
| --------- | ------------ |
| Trace     | Gray         |
| Debug     | Blue         |
| Info      | Green        |
| Warning   | Yellow       |
| Error     | Red          |
| Fatal     | White on Red |

# Supervisor

Learn about Effect's `Supervisor` for managing fibers, creating supervisors with `Supervisor.track`, and supervising effects with `Effect.supervised`. Explore an example that demonstrates periodic monitoring of fibers throughout an application's lifecycle using supervisors.

A `Supervisor<A>` is a tool that manages the creation and termination of fibers, producing some visible value of type `A` based on its supervision.

## Creating

### track

To create a supervisor, you can use the `Supervisor.track` function. It generates a new supervisor that keeps track of its child fibers in a set.

## Supervising

### supervised

Whenever you need to supervise an effect, you can employ the `Effect.supervised` function. This function takes a supervisor and returns an effect that behaves the same as the original effect. However, all child fibers forked within this effect are reported to the specified supervisor.

By doing this, you associate the behavior of child fibers with the provided supervisor, giving you access to all the information about these child fibers through the supervisor.

## Example

In the following example, we will periodically monitor the number of fibers throughout our application's lifecycle:

```ts
import { Effect, Supervisor, Schedule, Fiber, FiberStatus } from "effect"

const program = Effect.gen(function* () {
  const supervisor = yield* Supervisor.track
  const fibFiber = yield* fib(20).pipe(
    Effect.supervised(supervisor),
    Effect.fork
  )
  const policy = Schedule.spaced("500 millis").pipe(
    Schedule.whileInputEffect((_) =>
      Fiber.status(fibFiber).pipe(
        Effect.andThen((status) => status !== FiberStatus.done)
      )
    )
  )
  const monitorFiber = yield* monitorFibers(supervisor).pipe(
    Effect.repeat(policy),
    Effect.fork
  )
  yield* Fiber.join(monitorFiber)
  const result = yield* Fiber.join(fibFiber)
  console.log(`fibonacci result: ${result}`)
})

const monitorFibers = (
  supervisor: Supervisor.Supervisor<Array<Fiber.RuntimeFiber<any, any>>>
): Effect.Effect<void> =>
  Effect.gen(function* () {
    const fibers = yield* supervisor.value
    console.log(`number of fibers: ${fibers.length}`)
  })

const fib = (n: number): Effect.Effect<number> =>
  Effect.gen(function* () {
    if (n <= 1) {
      return 1
    }
    yield* Effect.sleep("500 millis")
    const fiber1 = yield* Effect.fork(fib(n - 2))
    const fiber2 = yield* Effect.fork(fib(n - 1))
    const v1 = yield* Fiber.join(fiber1)
    const v2 = yield* Fiber.join(fiber2)
    return v1 + v2
  })

Effect.runPromise(program)
/*
Output:
number of fibers: 0
number of fibers: 2
number of fibers: 6
number of fibers: 14
number of fibers: 30
number of fibers: 62
number of fibers: 126
number of fibers: 254
number of fibers: 510
number of fibers: 1022
number of fibers: 2034
number of fibers: 3795
number of fibers: 5810
number of fibers: 6474
number of fibers: 4942
number of fibers: 2515
number of fibers: 832
number of fibers: 170
number of fibers: 18
number of fibers: 0
fibonacci result: 10946
*/
```

---
title: Introduction to Telemetry in Effect
navTitle: Introduction to Telemetry
excerpt: Explore the seamless integration of Telemetry in Effect, providing insights into metrics and traces. Learn how Telemetry empowers developers to monitor, analyze, and optimize the performance and behavior of TypeScript applications, enhancing observability and debugging capabilities.
bottomNavigation: pagination
---

Telemetry enables developers to collect, process, and export telemetry data such as [metrics](metrics) and [traces](tracing), providing valuable insights into the performance and behavior of their applications. In this guide, we will explore how Telemetry can be seamlessly integrated into Effect.

By incorporating Telemetry, you can gain deep visibility into the inner workings of your TypeScript applications, effortlessly tracing the flow of requests, pinpointing bottlenecks, and identifying performance optimizations. This integration empowers you to monitor, analyze, and improve your application's reliability and efficiency, ensuring a better user experience.

In the following sections, we will delve into the fundamentals of Telemetry, how it works within the Effect framework, and the benefits it brings to your TypeScript projects. Whether you are building a small-scale application or a complex distributed system, this guide will help you harness the power of Telemetry to enhance your observability and debugging capabilities in Effect.


# Introduction

Effect Metrics provides a powerful solution for monitoring and analyzing various metrics, offering support for counters, gauges, histograms, summaries, and frequencies. Learn how these metrics enhance visibility into your application's performance and behavior.

In complex and highly concurrent applications, managing various interconnected components can be quite challenging. Ensuring that everything runs smoothly and avoiding application downtime becomes crucial in such setups.

Imagine a sophisticated infrastructure with numerous services, replicated and distributed across servers. However, we often lack insight into what's happening across these services, including error rates, response times, and service uptime. This lack of visibility can make it challenging to identify and address issues effectively. This is where Effect Metrics comes into play; it allows us to capture and analyze various metrics, providing valuable data for later investigation.

Effect Metrics offers support for five different types of metrics:

1. **Counter**: Tracks values that increase over time, such as request counts.
2. **Gauge**: Represents a single numerical value that can fluctuate over time, like memory usage.
3. **Histogram**: Tracks the distribution of observed values across different buckets, useful for metrics like request latencies.
4. **Summary**: Provides insight into a sliding window of a time series and offers metrics for specific percentiles.
5. **Frequency**: Counts occurrences of distinct string values, useful for tracking how often different events occur.

## Counter

A Counter is a metric that represents a single numerical value that can be incremented and decremented over time. It provides a running total of changes, reflecting the dynamic nature of certain metrics.

### How to Create a Counter

To create a counter, use the `Metric.counter` constructor:

```ts
import { Metric } from "effect"

const numberCounter = Metric.counter("request_count", {
  description: "A counter for tracking requests"
})

const bigintCounter = Metric.counter("error_count", {
  description: "A counter for tracking errors",
  bigint: true
})
```

For a counter that only increases, use the `incremental: true` option:

```ts
import { Metric } from "effect"

const incrementalCounter = Metric.counter("count", {
  description: "a counter that only increases its value",
  incremental: true
})
```

### When to Use Counters

Counters are useful for tracking cumulative values that can both increase and decrease over time, such as:

- Request Counts
- Completed Tasks
- Error Counts

### Example

```ts
import { Metric, Effect, Console } from "effect"

const taskCount = Metric.counter("task_count").pipe(
  Metric.withConstantInput(1)
)

const task1 = Effect.succeed(1).pipe(Effect.delay("100 millis"))
const task2 = Effect.succeed(2).pipe(Effect.delay("200 millis"))

const program = Effect.gen(function* () {
  const a = yield* taskCount(task1)
  const b = yield* taskCount(task2)
  return a + b
})

const showMetric = Metric.value(taskCount).pipe(Effect.andThen(Console.log))

Effect.runPromise(program.pipe(Effect.tap(() => showMetric))).then(
  console.log
)
```

## Gauge

A Gauge is a metric that represents a single numerical value that can be set or adjusted. It is used to monitor values that can both increase and decrease.

### How to Create a Gauge

To create a gauge, use the `Metric.gauge` constructor:

```ts
import { Metric } from "effect"

const numberGauge = Metric.gauge("memory_usage", {
  description: "A gauge for memory usage"
})

const bigintGauge = Metric.gauge("cpu_load", {
  description: "A gauge for CPU load",
  bigint: true
})
```

### When to Use Gauges

Gauges are best for monitoring values at a specific moment, such as:

- Memory Usage
- Queue Size
- In-Progress Request Counts

### Example

```ts
import { Metric, Effect, Random, Console } from "effect"

const temperature = Metric.gauge("temperature")

const getTemperature = Effect.gen(function* () {
  const n = yield* Random.nextIntBetween(-10, 10)
  console.log(`variation: ${n}`)
  return n
})

const program = Effect.gen(function* () {
  const series: Array<number> = []
  series.push(yield* temperature(getTemperature))
  series.push(yield* temperature(getTemperature))
  series.push(yield* temperature(getTemperature))
  return series
})

const showMetric = Metric.value(temperature).pipe(Effect.andThen(Console.log))

Effect.runPromise(program.pipe(Effect.tap(() => showMetric))).then(
  console.log
)
```

## Histogram

A Histogram helps understand how a collection of numerical values is distributed over time, organizing values into distinct intervals called buckets.

### Key Concepts

- Observes numerical values and counts how many observations fall into specific buckets.
- Keeps track of the total count of observed values and the sum of all observed values.

### When to Use Histograms

Histograms are useful for analyzing performance metrics such as response times and latencies. They help identify performance bottlenecks and variations.

### Examples

#### Histogram With Linear Buckets

```ts
import { Effect, Metric, MetricBoundaries, Random } from "effect"

const latencyHistogram = Metric.histogram(
  "request_latency",
  MetricBoundaries.linear({ start: 0, width: 10, count: 11 })
)

const program = latencyHistogram(Random.nextIntBetween(1, 120)).pipe(
  Effect.repeatN(99)
)

Effect.runPromise(
  program.pipe(Effect.andThen(Metric.value(latencyHistogram)))
).then((histogramState) => console.log("%o", histogramState))
```

#### Timer Metric

```ts
import { Metric, Array, Random, Effect } from "effect"

const timer = Metric.timerWithBoundaries("timer", Array.range(1, 10))

const program = Random.nextIntBetween(1, 10).pipe(
  Effect.andThen((n) => Effect.sleep(`${n} millis`)),
  Metric.trackDuration(timer),
  Effect.repeatN(99)
)

Effect.runPromise(program.pipe(Effect.andThen(Metric.value(timer)))).then(
  (histogramState) => console.log("%o", histogramState)
)
```

## Summary

A Summary provides insights into a time series by calculating specific percentiles, helping to understand the distribution of values.

### How Summaries Work

Summaries retain observed samples in their internal state and are configured with a maximum age and size to prevent uncontrolled growth.

### When to Use Summaries

Summaries are excellent for monitoring latencies when histograms are not suitable due to accuracy concerns.

### Example

```ts
import { Metric, Random, Effect } from "effect"

const responseTimeSummary = Metric.summary({
  name: "response_time_summary",
  maxAge: "1 day",
  maxSize: 100,
  error: 0.03,
  quantiles: [0.1, 0.5, 0.9]
})

const program = responseTimeSummary(Random.nextIntBetween(1, 120)).pipe(
  Effect.repeatN(99)
)

Effect.runPromise(
  program.pipe(Effect.andThen(Metric.value(responseTimeSummary)))
).then((summaryState) => console.log("%o", summaryState))
```

## Frequency

Frequencies count occurrences of specific values, automatically creating new counters for observed values.

### When to Use Frequencies

Frequencies are useful for counting occurrences of distinct string values, such as:

- Tracking service invocations
- Monitoring failure types

### Example

```ts
import { Metric, Random, Effect } from "effect"

const errorFrequency = Metric.frequency("error_frequency")

const program = errorFrequency(
  Random.nextIntBetween(1, 10).pipe(Effect.andThen((n) => `Error-${n}`))
).pipe(Effect.repeatN(99))

Effect.runPromise(
  program.pipe(Effect.andThen(Metric.value(errorFrequency)))
).then((frequencyState) => console.log("%o", frequencyState))
```

## Tagging Metrics

When creating metrics, you can add tags to provide additional context, helping in categorizing and filtering metrics.

### Tagging multiple Metrics

Use `Effect.tagMetrics` to apply tags to all metrics created in the same context.

```ts
import { Metric, Effect } from "effect"

const taskCount = Metric.counter("task_count")
const task1 = Effect.succeed(1).pipe(Effect.delay("100 millis"))

Effect.gen(function* () {
  yield* taskCount(task1)
}).pipe(
  Effect.tagMetrics("environment", "production")
)
```

### Tagging a specific Metric

For individual metrics, use `Metric.tagged` to apply tags to a specific metric.

```ts
import { Metric } from "effect"

const counter = Metric.counter('request_count').pipe(
  Metric.tagged('environment', 'production'),
);
```

# Introduction

Although logs and metrics are useful to understand the behavior of individual services, they are not enough to provide a complete overview of the lifetime of a request in a distributed system.

In a distributed system, a request can span multiple services, and each service can make multiple requests to other services to fulfill the request. We need a way to track the lifetime of a request across multiple services to diagnose bottlenecks and understand where the request spends most of its time.

## Spans

A span represents a unit of work or operation. It tracks specific operations that a request makes, painting a picture of what happened during the time in which that operation was executed.

A typical Span contains the following information:

- **Name:** Describes the operation being tracked.
- **Time-Related Data:** Timestamps to measure when the operation started and how long it took.
- **Structured Log Messages:** Records essential information during the operation.
- **Metadata (Attributes):** Additional data that provides context about the operation.

## Traces

A trace records the paths taken by requests as they propagate through multi-service architectures, like microservice and serverless applications. Without tracing, it is challenging to pinpoint the cause of performance problems in a distributed system.

A trace is made of one or more spans. The first span represents the root span. Each root span represents a request from start to finish. The spans underneath the parent provide a more in-depth context of what occurs during a request.

Many observability back-ends visualize traces as waterfall diagrams that show the parent-child relationship between a root span and its child spans.

## Creating Spans

You can instrument an effect with a Span using the `Effect.withSpan` API. Here's how you can do it:

```ts
import { Effect } from "effect"

const program = Effect.void.pipe(Effect.delay("100 millis"))

const instrumented = program.pipe(Effect.withSpan("myspan"))
```

Instrumenting an effect doesn't change its type. You start with an `Effect<void>`, and you still get an `Effect<void>`.

## Printing Spans

To print a Span to the console, you need specific tools, including:

- `@effect/opentelemetry`
- `@opentelemetry/sdk-metrics`
- `@opentelemetry/sdk-trace-base`
- `@opentelemetry/sdk-trace-node`
- `@opentelemetry/sdk-trace-web`

Here's a code snippet demonstrating how to set up the necessary environment and print the Span to the console:

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const program = Effect.void.pipe(Effect.delay("100 millis"))

const instrumented = program.pipe(Effect.withSpan("myspan"))

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(instrumented.pipe(Effect.provide(NodeSdkLive)))
```

### Output Breakdown

- `traceId`: Unique identifier for the entire trace.
- `parentId`: Identifies the parent span of the current span.
- `name`: Describes the name of the span.
- `id`: Unique identifier for the current span.
- `timestamp`: When the span started.
- `duration`: Time taken to complete the operation.
- `attributes`: Key-value pairs providing additional context.
- `status`: Information about the span's status.
- `events`: Records of specific moments during the span's lifecycle.
- `links`: Associations with other spans in different traces.

## Adding Annotations

You can provide extra information to a span using the `Effect.annotateCurrentSpan` function. This allows you to associate key-value pairs, offering more context about the execution of the span.

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const program = Effect.void.pipe(
  Effect.delay("100 millis"),
  Effect.tap(() => Effect.annotateCurrentSpan("key", "value")),
  Effect.withSpan("myspan")
)

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(program.pipe(Effect.provide(NodeSdkLive)))
```

## Logs as Events

Logs are transformed into "Span Events," providing structured information and a timeline of occurrences within your application.

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const program = Effect.log("Hello").pipe(
  Effect.delay("100 millis"),
  Effect.withSpan("myspan")
)

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(program.pipe(Effect.provide(NodeSdkLive)))
```

## Nesting Spans

Spans can be nested, creating a hierarchy of operations. This concept is illustrated in the following code:

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const child = Effect.void.pipe(
  Effect.delay("100 millis"),
  Effect.withSpan("child")
)

const parent = Effect.gen(function* () {
  yield* Effect.sleep("20 millis")
  yield* child
  yield* Effect.sleep("10 millis")
}).pipe(Effect.withSpan("parent"))

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(parent.pipe(Effect.provide(NodeSdkLive)))
```

## Tutorial: Visualizing Traces with Docker, Prometheus, Grafana, and Tempo

In this tutorial, we'll guide you through simulating and visualizing traces using a sample instrumented Node.js application. We will use Docker, Prometheus, Grafana, and Tempo to create, collect, and visualize traces.

### Tools Explained

- **Docker**: Runs applications in containers, providing a consistent environment.
- **Prometheus**: A monitoring and alerting toolkit that collects metrics and data.
- **Grafana**: A visualization platform for creating interactive dashboards.
- **Tempo**: A distributed tracing system for tracing requests through applications.

### Getting Docker

1. Visit the Docker website.
2. Download Docker Desktop for your operating system and install it.
3. Open Docker Desktop to run it in the background.

### Simulating Traces

1. **Download Docker Files**. Download the required Docker files.
2. **Set Up Docker**. Unzip the downloaded file, navigate to the `/docker/local` directory, and run:

   ```bash
   docker-compose up
   ```

3. **Simulate Traces**. Run the following example code in your Node.js environment. Install the required libraries:

   ```ts
   import { Effect } from "effect"
   import { NodeSdk } from "@effect/opentelemetry"
   import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
   import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

   const task = (
     name: string,
     delay: number,
     children: ReadonlyArray<Effect.Effect<void>> = []
   ) =>
     Effect.gen(function* () {
       yield* Effect.log(name)
       yield* Effect.sleep(`${delay} millis`)
       for (const child of children) {
         yield* child
       }
       yield* Effect.sleep(`${delay} millis`)
     }).pipe(Effect.withSpan(name))

   const poll = task("/poll", 1)

   const program = task("client", 2, [
     task("/api", 3, [
       task("/authN", 4, [task("/authZ", 5)]),
       task("/payment Gateway", 6, [task("DB", 7), task("Ext. Merchant", 8)]),
       task("/dispatch", 9, [
         task("/dispatch/search", 10),
         Effect.all([poll, poll, poll], { concurrency: "inherit" }),
         task("/pollDriver/{id}", 11)
       ])
     ])
   ])

   const NodeSdkLive = NodeSdk.layer(() => ({
     resource: { serviceName: "example" },
     spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter())
   }))

   Effect.runPromise(
     program.pipe(
       Effect.provide(NodeSdkLive),
       Effect.catchAllCause(Effect.logError)
     )
   )
   ```

4. **Visualize Traces**. Open your web browser and go to the local Grafana URL to see the generated Trace ID and its details.

---
title: Telemetry
excerpt: Telemetry is the automated process of collecting and transmitting data from applications and infrastructure to monitor performance and diagnose issues. It captures metrics, logs, and traces, providing insights into system behavior and aiding in effective system management.
collapsible: true
bottomNavigation: childCards
---


---
title: Observability
excerpt: Observability
collapsible: true
bottomNavigation: childCards
---


# Configuration

Configuration is an essential aspect of any cloud-native application. Effect simplifies the process of managing configuration by offering a convenient interface for configuration providers.

The configuration front-end in Effect enables ecosystem libraries and applications to specify their configuration requirements in a declarative manner. It offloads the complex tasks to a `ConfigProvider`, which can be supplied by third-party libraries.

Effect comes bundled with a straightforward default `ConfigProvider` that retrieves configuration data from environment variables. This default provider can be used during development or as a starting point before transitioning to more advanced configuration providers.

To make our application configurable, we need to understand three essential elements:

- **Config Description**: We describe the configuration data using an instance of `Config<A>`. If the configuration data is simple, such as a `string`, `number`, or `boolean`, we can use the built-in functions provided by the `Config` module. For more complex data types like HostPort, we can combine primitive configs to create a custom configuration description.

- **Config Frontend**: We utilize the instance of `Config<A>` to load the configuration data described by the instance (a `Config` is, in itself, an effect). This process leverages the current `ConfigProvider` to retrieve the configuration.

- **Config Backend**: The `ConfigProvider` serves as the underlying engine that manages the configuration loading process. Effect comes with a default config provider as part of its default services. This default provider reads the configuration data from environment variables. If we want to use a custom config provider, we can utilize the `Layer.setConfigProvider` layer to configure the Effect runtime accordingly.

## Getting Started

Effect provides a set of primitives for the most common types like `string`, `number`, `boolean`, `integer`, etc.

Let's start with a simple example of how to read configuration from environment variables:

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const host = yield* Config.string("HOST")
  const port = yield* Config.number("PORT")
  console.log(`Application started: ${host}:${port}`)
})

Effect.runSync(program)
```

If we run this program we will get the following output:

```bash
npx tsx primitives.ts
(Missing data at HOST: "Expected HOST to exist in the process context")
```

This is because we have not provided any configuration. Let's try running it with the following environment variables:

```bash
HOST=localhost PORT=8080 npx tsx primitives.ts
Application started: localhost:8080
```

## Primitives

Effect offers these basic types out of the box:

- `string`: Constructs a config for a string value.
- `number`: Constructs a config for a float value.
- `boolean`: Constructs a config for a boolean value.
- `integer`: Constructs a config for an integer value.
- `date`: Constructs a config for a date value.
- `literal`: Constructs a config for a literal value.
- `logLevel`: Constructs a config for a LogLevel value.
- `duration`: Constructs a config for a duration value.
- `redacted`: Constructs a config for a secret value.

## Default Values

In some cases, you may encounter situations where an environment variable is not set, leading to a missing value in the configuration. To handle such scenarios, Effect provides the `Config.withDefault` function. This function allows you to specify a fallback or default value to use when an environment variable is not present.

Here's how you can use `Config.withDefault` to handle fallback values:

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const host = yield* Config.string("HOST")
  const port = yield* Config.number("PORT").pipe(Config.withDefault(8080))
  console.log(`Application started: ${host}:${port}`)
})

Effect.runSync(program)
```

When running the program with the command:

```bash
HOST=localhost npx tsx withDefault.ts
```

you will see the following output:

```bash
Application started: localhost:8080
```

## Constructors

Effect provides several built-in constructors. These are functions that take a `Config` as input and produce another `Config`.

- `array`: Constructs a config for an array of values.
- `chunk`: Constructs a config for a sequence of values.
- `option`: Returns an optional version of this config, which will be `None` if the data is missing from configuration, and `Some` otherwise.
- `repeat`: Returns a config that describes a sequence of values, each of which has the structure of this config.
- `hashSet`: Constructs a config for a sequence of values.
- `hashMap`: Constructs a config for a sequence of values.

**Example**

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const config = yield* Config.array(Config.string(), "MY_ARRAY")
  console.log(config)
})

Effect.runSync(program)
```

```bash
MY_ARRAY=a,b,c npx tsx array.ts

[ 'a', 'b', 'c' ]
```

## Operators

Effect comes with a set of built-in operators to help you manipulate and handle configurations.

### Transforming Operators

These operators allow you to transform a config into a new one:

- `validate`: Returns a config that describes the same structure as this one, but which performs validation during loading.
- `map`: Creates a new config with the same structure as the original but with values transformed using a given function.
- `mapAttempt`: Similar to `map`, but if the function throws an error, it's caught and turned into a validation error.
- `mapOrFail`: Like `map`, but allows for functions that might fail. If the function fails, it results in a validation error.

**Example**

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const config = yield* Config.string("NAME").pipe(
    Config.validate({
      message: "Expected a string at least 4 characters long",
      validation: (s) => s.length >= 4
    })
  )
  console.log(config)
})

Effect.runSync(program)
```

### Fallback Operators

These operators help you set up fallbacks in case of errors or missing data:

- `orElse`: Sets up a config that tries to use this config first. If there's an issue, it falls back to another specified config.
- `orElseIf`: This one also tries to use the main config first but switches to a fallback config if there's an error that matches a specific condition.

**Example**

```ts
import { Config, ConfigProvider, Effect, Layer } from "effect"

const program = Effect.gen(function* () {
  const A = yield* Config.string("A")
  const B = yield* Config.string("B")
  console.log(`A: ${A}`, `B: ${B}`)
})

const provider1 = ConfigProvider.fromMap(
  new Map([
    ["A", "A"]
  ])
)

const provider2 = ConfigProvider.fromMap(
  new Map([
    ["B", "B"]
  ])
)

const layer = Layer.setConfigProvider(
  provider1.pipe(ConfigProvider.orElse(() => provider2))
)

Effect.runSync(Effect.provide(program, layer))
```

```bash
npx tsx orElse.ts

A: A B: B
```

## Custom Configurations

In addition to primitive types, we can also define configurations for custom types. To achieve this, we use primitive configs and combine them using `Config` operators and constructors.

Let's consider the `HostPort` data type, which consists of two fields: `host` and `port`.

```ts
class HostPort {
  constructor(
    readonly host: string,
    readonly port: number
  ) {}
}
```

We can define a configuration for this data type by combining primitive configs for `string` and `number`:

```ts
import { Config } from "effect"

export class HostPort {
  constructor(
    readonly host: string,
    readonly port: number
  ) {}

  get url() {
    return `${this.host}:${this.port}`
  }
}

const both = Config.all([Config.string("HOST"), Config.number("PORT")])

export const config = Config.map(
  both,
  ([host, port]) => new HostPort(host, port)
)
```

## Top-level and Nested Configurations

We can also define nested configurations. Let's assume we have a `ServiceConfig` data type that consists of two fields: `hostPort` and `timeout`.

```ts
import * as HostPort from "./HostPort"
import { Config } from "effect"

class ServiceConfig {
  constructor(
    readonly hostPort: HostPort.HostPort,
    readonly timeout: number
  ) {}
}

const config = Config.map(
  Config.all([HostPort.config, Config.number("TIMEOUT")]),
  ([hostPort, timeout]) => new ServiceConfig(hostPort, timeout)
)
```

To read configurations from a nested namespace, we can use the `Config.nested` combinator:

```ts
const config = Config.map(
  Config.all([
    Config.nested(HostPort.config, "HOSTPORT"),
    Config.number("TIMEOUT")
  ]),
  ([hostPort, timeout]) => new ServiceConfig(hostPort, timeout)
)
```

## Testing Services

When testing services, we can use the `ConfigProvider.fromMap` constructor to mock the backend that reads the configuration data.

```ts
import { ConfigProvider, Layer, Effect } from "effect"
import * as App from "./App"

const mockConfigProvider = ConfigProvider.fromMap(
  new Map([
    ["HOST", "localhost"],
    ["PORT", "8080"]
  ])
)

const layer = Layer.setConfigProvider(mockConfigProvider)

Effect.runSync(Effect.provide(App.program, layer))
```

## Redacted

What sets `Config.redacted` apart from `Config.string` is its handling of sensitive information. It parses the config value and wraps it in a `Redacted<string>`, designed for holding secrets.

```ts
import { Effect, Config, Console, Redacted } from "effect"

const program = Config.redacted("API_KEY").pipe(
  Effect.tap((redacted) => Console.log(`Console output: ${redacted}`)),
  Effect.tap((redacted) =>
    Console.log(`Actual value: ${Redacted.value(redacted)}`)
  )
)

Effect.runSync(program)
```

## Secret

**Deprecated since version 3.3.0**: Please use `Config.redacted` for handling sensitive information going forward.

```ts
import { Effect, Config, Console, Secret } from "effect"

const program = Config.secret("API_KEY").pipe(
  Effect.tap((secret) => Console.log(`Console output: ${secret}`)),
  Effect.tap((secret) => Console.log(`Secret value: ${Secret.value(secret)}`))
)

Effect.runSync(program)
```

# Introduction

The `Runtime<R>` data type represents a Runtime System that can execute effects. To execute any effect, we need a `Runtime` that includes the necessary requirements for that effect.

A `Runtime<R>` consists of three main components:

- A value of type `Context<R>`
- A value of type `FiberRefs`
- A value of type `RuntimeFlags`

## The Default Runtime

When we use functions like `Effect.run*`, we are actually using the **default runtime** without explicitly mentioning it. These functions are designed as convenient shortcuts for executing our effects using the default runtime.

For instance, in the `Runtime` module, there is a corresponding `Runtime.run*(defaultRuntime)` function that is called internally by `Effect.run*`, e.g., `Effect.runSync` is simply an alias for `Runtime.runSync(defaultRuntime)`.

The default runtime includes:

- An empty `Context<never>`
- A set of `FiberRefs` that include the default services
- A default configuration for `RuntimeFlags` that enables `Interruption` and `CooperativeYielding`

In most cases, using the default runtime is sufficient. However, it can be useful to create a custom runtime to reuse a specific context or configuration. It is common to create a `Runtime<R>` by initializing a `Layer<R, Err, RIn>`. This allows for context reuse across execution boundaries, such as in a React App or when executing operations on a server in response to API requests.

## What is a Runtime System?

When we write an Effect program, we construct an `Effect` using constructors and combinators. Essentially, we are creating a blueprint of a program. An `Effect` is merely a data structure that describes the execution of a concurrent program. It represents a tree-like structure that combines various primitives to define what the `Effect` should do.

However, this data structure itself does not perform any actions; it is solely a description of a concurrent program.

Therefore, it is crucial to understand that when working with a functional effect system like Effect, our code for actions such as printing to the console, reading files, or querying databases is actually building a workflow or blueprint for an application. We are constructing a data structure.

So how does Effect actually run these workflows? This is where the Effect Runtime System comes into play. When we invoke a `Runtime.run*` function, the Runtime System takes over. First, it creates an empty root Fiber with:

- The initial context
- The initial fiberRefs
- The initial Effect

After the creation of the Fiber, it invokes the Fiber's runLoop, which follows the instructions described by the `Effect` and executes them step by step.

To simplify, we can envision the Runtime System as a black box that takes both the effect and its associated context `Context<R>`. It runs the effect and returns the result as an `Exit<A, E>` value.

## Responsibilities of the Runtime System

Runtime Systems have a lot of responsibilities:

1. Execute every step of the blueprint.
2. Handle unexpected errors.
3. Spawn concurrent fibers.
4. Cooperatively yield to other fibers.
5. Ensure finalizers are run appropriately.
6. Handle asynchronous callbacks.

## Default Runtime

Effect provides a default runtime named `Runtime.defaultRuntime` designed for mainstream usage.

The default runtime provides the minimum capabilities to bootstrap execution of Effect tasks.

Both of the following executions are equivalent:

```ts
import { Effect, Runtime } from "effect"

const program = Effect.log("Application started!")

Effect.runSync(program)
/*
Output:
... level=INFO fiber=#0 message="Application started!"
*/

Runtime.runSync(Runtime.defaultRuntime)(program)
/*
Output:
... level=INFO fiber=#0 message="Application started!"
*/
```

Under the hood, `Effect.runSync` serves as a convenient shorthand for `Runtime.runSync(Runtime.defaultRuntime)`.

## Locally Scoped Runtime Configuration

In Effect, runtime configurations are typically inherited from their parent workflows. This means that when we access a runtime configuration or obtain a runtime inside a workflow, we are essentially using the configuration of the parent workflow. However, there are cases where we want to temporarily override the runtime configuration for a specific part of our code. This concept is known as locally scoped runtime configuration.

To achieve this, we make use of `Effect.provide*` functions, which allow us to provide a new runtime configuration to a specific section of our code.

### Configuring Runtime by Providing Configuration Layers

By utilizing the `Effect.provide` function and providing runtime configuration layers to an Effect workflow, we can easily modify runtime configurations.

Here's an example:

```ts
import { Logger, Effect } from "effect"

// Define a configuration layer
const addSimpleLogger = Logger.replace(
  Logger.defaultLogger,
  Logger.make(({ message }) => console.log(message))
)

const program = Effect.gen(function* () {
  yield* Effect.log("Application started!")
  yield* Effect.log("Application is about to exit!")
})

Effect.runSync(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="Application started!"
timestamp=... level=INFO fiber=#0 message="Application is about to exit!"
*/

// Overriding the default logger
Effect.runSync(program.pipe(Effect.provide(addSimpleLogger)))
/*
Output:
Application started!
Application is about to exit!
*/
```

In this example, we first create a configuration layer for a simple logger using `Logger.replace`. Then, we use `Effect.provide` to provide this configuration to our program, effectively overriding the default logger with the simple logger.

To ensure that the runtime configuration is only applied to a specific part of an Effect application, we should provide the configuration layer exclusively to that particular section, as demonstrated in the following example:

```ts
import { Logger, Effect } from "effect"

// Define a configuration layer
const addSimpleLogger = Logger.replace(
  Logger.defaultLogger,
  Logger.make(({ message }) => console.log(message))
)

const program = Effect.gen(function* () {
  yield* Effect.log("Application started!")
  yield* Effect.gen(function* () {
    yield* Effect.log("I'm not going to be logged!")
    yield* Effect.log("I will be logged by the simple logger.").pipe(
      Effect.provide(addSimpleLogger)
    )
    yield* Effect.log(
      "Reset back to the previous configuration, so I won't be logged."
    )
  }).pipe(Effect.provide(Logger.remove(Logger.defaultLogger)))
  yield* Effect.log("Application is about to exit!")
})

Effect.runSync(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="Application started!"
I will be logged by the simple logger.
timestamp=... level=INFO fiber=#0 message="Application is about to exit!"
*/
```

## Top-level Runtime Configuration

When developing an Effect application and executing it using `Effect.run*` functions, the application is automatically run using the default runtime behind the scenes. While we can adjust and customize specific aspects of our Effect application by providing locally scoped configuration layers using `Effect.provide` operations, there are scenarios where we need to customize the runtime configuration for the entire application from the top level.

In such situations, we can create a top-level runtime by converting a configuration layer into a runtime using the `ManagedRuntime.make` constructor.

### ManagedRuntime

```ts
import { Effect, ManagedRuntime, Logger } from "effect"

// Define a configuration layer
const appLayer = Logger.replace(
  Logger.defaultLogger,
  Logger.make(({ message }) => console.log(message))
)

// Transform the configuration layer into a runtime
const runtime = ManagedRuntime.make(appLayer)

const program = Effect.log("Application started!")

// Execute the program using the custom runtime
runtime.runSync(program)

// Cleaning up any resources used by the configuration layer
Effect.runFork(runtime.disposeEffect)
/*
Output:
Application started!
*/
```

In this example, we first create a custom configuration layer called `appLayer`, which includes modifications to the logger configuration. Next, we transform this configuration layer into a runtime using `ManagedRuntime.make`. This results in a top-level runtime that encapsulates the desired configuration for the entire Effect application.

By customizing the top-level runtime configuration, we can tailor the behavior of our entire Effect application to meet our specific needs and requirements.

### Effect.Tag

When you utilize a runtime that you pass around, you can use `Effect.Tag` to define a new tag and simplify access to a service. This incorporates the service shape directly into the static side of the tag class.

You can define a new tag using `Effect.Tag` as shown below:

```ts
import { Effect } from "effect"

class Notifications extends Effect.Tag("Notifications")<
  Notifications,
  { readonly notify: (message: string) => Effect.Effect<void> }
>() {}
```

In this setup, every field of the service shape is converted into a static property of the `Notifications` class.

This allows you to access the service shape directly:

```ts
import { Effect } from "effect"

class Notifications extends Effect.Tag("Notifications")<
  Notifications,
  { readonly notify: (message: string) => Effect.Effect<void> }
>() {}

// ---cut---
const action = Notifications.notify("Hello, world!")
```

As you can see, `action` depends on `Notifications`, but this isn't a problem because you can later construct a `Layer` that provides `Notifications` and build a `ManagedRuntime` with it.

### Integrations

The `ManagedRuntime` simplifies the integration of services and layers with other frameworks or tools, particularly in environments where Effect is not the primary framework and access to the main entry point is restricted.

For instance, `ManagedRuntime` can be particularly useful in environments like React or other frameworks where control over the main application entry point is limited. Here's how you can use `ManagedRuntime` to manage service lifecycle within an external framework:

```ts
import { Effect, ManagedRuntime, Layer, Console } from "effect"

class Notifications extends Effect.Tag("Notifications")<
  Notifications,
  { readonly notify: (message: string) => Effect.Effect<void> }
>() {
  static Live = Layer.succeed(this, {
    notify: (message) => Console.log(message)
  })
}

// Example entry point for an external framework
async function main() {
  const runtime = ManagedRuntime.make(Notifications.Live)
  await runtime.runPromise(Notifications.notify("Hello, world!"))
  await runtime.dispose()
}
```

# Introduction

Scheduling is an important concept in Effect that allows you to define recurring effectful operations. It involves the use of `Schedule<Out, In, Context>`, which is an immutable value that describes a scheduled pattern for executing effects.

A `Schedule` operates by consuming values of type `In` (such as errors in the case of retry, or values in the case of repeat) and producing values of type `Out`. It determines when to halt or continue the execution based on input values and its internal state.

The inclusion of a `Context` parameter allows the schedule to leverage additional services or resources as needed.

Schedules are defined as a collection of intervals spread out over time. Each interval represents a window during which the recurrence of an effect is possible.

## Retrying and Repetition

In the realm of scheduling, there are two related concepts: Retrying and Repetition. While they share the same underlying idea, they differ in their focus. Retrying aims to handle failures by executing an effect again, while repetition focuses on executing an effect repeatedly to achieve a desired outcome.

When using schedules for retrying or repetition, each interval's starting boundary determines when the effect will be executed again. For example, in retrying, if an error occurs, the schedule defines when the effect should be retried.

## Composability of Schedules

Schedules are composable, meaning you can combine simple schedules to create more complex recurrence patterns. Operators like union or intersect allow you to build sophisticated schedules by combining and modifying existing ones. This flexibility enables you to tailor the scheduling behavior to meet specific requirements.

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

# Scheduling

Scheduling refers to the process of planning and organizing tasks or events within a specific timeframe. It is essential for effective time management and resource allocation in various contexts, including project management, personal productivity, and operational efficiency. 

Key components of scheduling include:

- **Task Prioritization**: Identifying the most important tasks to focus on.
- **Time Allocation**: Assigning specific time slots for each task or event.
- **Resource Management**: Ensuring that the necessary resources are available for each scheduled task.
- **Flexibility**: Allowing for adjustments in the schedule as needed to accommodate changes or unforeseen circumstances.

Effective scheduling can lead to improved productivity, reduced stress, and better overall outcomes in both personal and professional settings.

# Ref

Learn how to leverage Effect's `Ref` data type for efficient state management in your programs. Understand the importance of managing state in dynamic applications and the challenges posed by traditional approaches. Dive into the powerful capabilities of `Ref`, a mutable reference that provides a controlled way to handle mutable state and ensure safe updates in a concurrent environment. Explore practical examples, from simple counters to complex scenarios involving shared state and concurrent interactions. Enhance your programming skills by mastering the effective use of `Ref` for state management in your Effect programs.

When we write programs, it is common to need to keep track of some form of state during execution. State refers to any data that can change as the program runs. For example, in a counter application, the count value changes as the user increments or decrements it. Similarly, in a banking application, the account balance changes as deposits and withdrawals are made. State management is crucial to building interactive and dynamic applications.

In traditional imperative programming, one common way to store state is using variables. However, this approach can introduce bugs, especially when the state is shared between multiple components or functions. As the program becomes more complex, managing shared state can become challenging.

To overcome these issues, Effect introduces a powerful data type called `Ref`, which represents a mutable reference. With `Ref`, we can share state between different parts of our program without relying on mutable variables directly. Instead, `Ref` provides a controlled way to handle mutable state and safely update it in a concurrent environment.

Effect's `Ref` data type enables communication between different fibers in your program. This capability is crucial in concurrent programming, where multiple tasks may need to access and update shared state simultaneously.

## Using Ref

Let's explore how to use the `Ref` data type with a simple example of a counter:

```typescript
import { Effect, Ref } from "effect"

export class Counter {
  inc: Effect.Effect<void>
  dec: Effect.Effect<void>
  get: Effect.Effect<number>

  constructor(private value: Ref.Ref<number>) {
    this.inc = Ref.update(this.value, (n) => n + 1)
    this.dec = Ref.update(this.value, (n) => n - 1)
    this.get = Ref.get(this.value)
  }
}

export const make = Effect.andThen(Ref.make(0), (value) => new Counter(value))
```

Here is the usage example of the `Counter`:

```typescript
import { Effect } from "effect"
import * as Counter from "./Counter"

const program = Effect.gen(function* () {
  const counter = yield* Counter.make
  yield* counter.inc
  yield* counter.inc
  yield* counter.dec
  yield* counter.inc
  const value = yield* counter.get
  console.log(`This counter has a value of ${value}.`)
})

Effect.runPromise(program)
/*
Output:
This counter has a value of 2.
*/
```

## Using Ref in a Concurrent Environment

We can use this counter in a concurrent environment, such as counting the number of requests in a RESTful API. For this example, let's update the counter concurrently:

```typescript
import { Effect } from "effect"
import * as Counter from "./Counter"

const program = Effect.gen(function* () {
  const counter = yield* Counter.make

  const logCounter = <R, E, A>(
    label: string,
    effect: Effect.Effect<A, E, R>
  ) =>
    Effect.gen(function* () {
      const value = yield* counter.get
      yield* Effect.log(`${label} get: ${value}`)
      return yield* effect
    })

  yield* logCounter("task 1", counter.inc).pipe(
    Effect.zip(logCounter("task 2", counter.inc), { concurrent: true }),
    Effect.zip(logCounter("task 3", counter.dec), { concurrent: true }),
    Effect.zip(logCounter("task 4", counter.inc), { concurrent: true })
  )
  const value = yield* counter.get
  yield* Effect.log(`This counter has a value of ${value}.`)
})

Effect.runPromise(program)
/*
Output:
... fiber=#2 message="task 4 get: 0"
... fiber=#4 message="task 3 get: 1"
... fiber=#5 message="task 1 get: 0"
... fiber=#5 message="task 2 get: 1"
... fiber=#0 message="This counter has a value of 2."
*/
```

## Using Ref as a Service

You can also pass a `Ref` as a service to share state between different parts of your program. Let's see how this works:

```typescript
import { Effect, Context, Ref } from "effect"

// Create a Tag for our state
class MyState extends Context.Tag("MyState")<MyState, Ref.Ref<number>>() {}

// Subprogram 1: Increment the state value twice
const subprogram1 = Effect.gen(function* () {
  const state = yield* MyState
  yield* Ref.update(state, (n) => n + 1)
  yield* Ref.update(state, (n) => n + 1)
})

// Subprogram 2: Decrement the state value and then increment it
const subprogram2 = Effect.gen(function* () {
  const state = yield* MyState
  yield* Ref.update(state, (n) => n - 1)
  yield* Ref.update(state, (n) => n + 1)
})

// Subprogram 3: Read and log the current value of the state
const subprogram3 = Effect.gen(function* () {
  const state = yield* MyState
  const value = yield* Ref.get(state)
  console.log(`MyState has a value of ${value}.`)
})

// Compose subprograms 1, 2, and 3 to create the main program
const program = Effect.gen(function* () {
  yield* subprogram1
  yield* subprogram2
  yield* subprogram3
})

// Create a Ref instance with an initial value of 0
const initialState = Ref.make(0)

// Provide the Ref as a service
const runnable = Effect.provideServiceEffect(program, MyState, initialState)

// Run the program and observe the output
Effect.runPromise(runnable)
/*
Output:
MyState has a value of 2.
*/
```

## Sharing state between Fibers

Let's consider an example where we want to read names from user input until the user enters the command `"q"` to exit.

First, let's introduce a `readLine` utility to read user input:

```typescript
import { Effect } from "effect"
import * as NodeReadLine from "node:readline"

export const readLine = (
  message: string
): Effect.Effect<string> =>
  Effect.promise(
    () =>
      new Promise((resolve) => {
        const rl = NodeReadLine.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        rl.question(message, (answer) => {
          rl.close()
          resolve(answer)
        })
      })
  )
```

Now, let's take a look at the main program:

```typescript
import { Effect, Chunk, Ref } from "effect"
import * as ReadLine from "./ReadLine"

const getNames = Effect.gen(function* () {
  const ref = yield* Ref.make(Chunk.empty<string>())
  while (true) {
    const name = yield* ReadLine.readLine(
      "Please enter a name or `q` to exit: "
    )
    if (name === "q") {
      break
    }
    yield* Ref.update(ref, (state) => Chunk.append(state, name))
  }
  return yield* Ref.get(ref)
})

Effect.runPromise(getNames).then(console.log)
/*
Output:
Please enter a name or `q` to exit: Alice
Please enter a name or `q` to exit: Bob
Please enter a name or `q` to exit: q
{
  _id: "Chunk",
  values: [ "Alice", "Bob" ]
}
*/
```

Now that we have learned how to use the `Ref` data type, we can use it to manage the state concurrently. For example, assume while we are reading from the console, we have another fiber that is trying to update the state from a different source:

```typescript
import { Effect, Chunk, Ref, Fiber } from "effect"
import * as ReadLine from "./ReadLine"

const getNames = Effect.gen(function* () {
  const ref = yield* Ref.make(Chunk.empty<string>())
  const fiber1 = yield* Effect.fork(
    Effect.gen(function* () {
      while (true) {
        const name = yield* ReadLine.readLine(
          "Please enter a name or `q` to exit: "
        )
        if (name === "q") {
          break
        }
        yield* Ref.update(ref, (state) => Chunk.append(state, name))
      }
    })
  )
  const fiber2 = yield* Effect.fork(
    Effect.gen(function* () {
      for (const name of ["John", "Jane", "Joe", "Tom"]) {
        yield* Ref.update(ref, (state) => Chunk.append(state, name))
        yield* Effect.sleep("1 second")
      }
    })
  )
  yield* Fiber.join(fiber1)
  yield* Fiber.join(fiber2)
  return yield* Ref.get(ref)
})

Effect.runPromise(getNames).then(console.log)
/*
Output:
Please enter a name or `q` to exit: Alice
Please enter a name or `q` to exit: Bob
Please enter a name or `q` to exit: q
{
  _id: "Chunk",
  values: [ ... ]
}
*/
```

# Introduction

`SynchronizedRef<A>` serves as a mutable reference to a value of type `A`. With it, we can store immutable data and perform updates atomically and effectfully.

Most of the operations for `SynchronizedRef` are similar to those of `Ref`. If you're not already familiar with `Ref`, it's recommended to read about the Ref concept first.

The distinctive function in `SynchronizedRef` is `updateEffect`. This function takes an effectful operation and executes it to modify the shared state. This is the key feature setting `SynchronizedRef` apart from `Ref`.

```ts
import { Effect, SynchronizedRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SynchronizedRef.make("current")
  const updateEffect = Effect.succeed("update")
  yield* SynchronizedRef.updateEffect(ref, () => updateEffect)
  const value = yield* SynchronizedRef.get(ref)
  return value
})

Effect.runPromise(program).then(console.log)
/*
Output:
update
*/
```

In real-world applications, there are scenarios where we need to execute an effect (e.g., querying a database) and then update the shared state accordingly. This is where `SynchronizedRef` shines, allowing us to update shared state in an actor-model fashion. We have a shared mutable state, but for each distinct command or message, we want to execute our effect and update the state.

We can pass an effectful program into every single update. All of these updates will be performed in parallel, but the results will be sequenced in such a way that they only affect the state at different times, resulting in a consistent state at the end.

In the following example, we send a `getAge` request for each user, updating the state accordingly:

```ts
import { Effect, SynchronizedRef } from "effect"

// Simulate API
const getAge = (userId: number) =>
  Effect.succeed({ userId, age: userId * 10 })

const users = [1, 2, 3, 4]

const meanAge = Effect.gen(function* () {
  const ref = yield* SynchronizedRef.make(0)

  const log = <R, E, A>(label: string, effect: Effect.Effect<A, E, R>) =>
    Effect.gen(function* () {
      const value = yield* SynchronizedRef.get(ref)
      yield* Effect.log(`${label} get: ${value}`)
      return yield* effect
    })

  const task = (id: number) =>
    log(
      `task ${id}`,
      SynchronizedRef.updateEffect(ref, (sumOfAges) =>
        Effect.gen(function* () {
          const user = yield* getAge(id)
          return sumOfAges + user.age
        })
      )
    )

  yield* task(1).pipe(
    Effect.zip(task(2), { concurrent: true }),
    Effect.zip(task(3), { concurrent: true }),
    Effect.zip(task(4), { concurrent: true })
  )

  const value = yield* SynchronizedRef.get(ref)
  return value / users.length
})

Effect.runPromise(meanAge).then(console.log)
/*
Output:
... fiber=#1 message="task 4 get: 0"
... fiber=#2 message="task 3 get: 40"
... fiber=#3 message="task 1 get: 70"
... fiber=#4 message="task 2 get: 80"
25
*/
```

# State Management

State management refers to the handling of the state of an application. It involves the storage, retrieval, and updating of data that represents the current status of the application. Effective state management is crucial for building responsive and efficient applications.

Key concepts in state management include:

- **State**: The data that represents the current condition of the application.
- **State Container**: A structure that holds the state and provides methods to update it.
- **State Management Libraries**: Tools that help manage state in applications, such as Redux, MobX, and Context API.

Best practices for state management:

1. **Keep State Local**: Only store state that is necessary for the component.
2. **Use Immutable Data Structures**: This helps in tracking changes and improves performance.
3. **Centralize State Management**: For larger applications, consider using a centralized state management solution.
4. **Optimize Performance**: Use techniques like memoization to prevent unnecessary re-renders.

Understanding and implementing effective state management strategies can significantly enhance the performance and maintainability of applications.

# Batching

Effect is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs.

## Classic Approach to API Integration

In typical application development, when interacting with external APIs, databases, or other data sources, we often define functions that perform requests and handle their results or failures accordingly.

### Simple Model Setup

Here's a basic model that outlines the structure of our data and possible errors:

```typescript
export interface User {
  readonly _tag: "User";
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

export class GetUserError {
  readonly _tag = "GetUserError";
}

export interface Todo {
  readonly _tag: "Todo";
  readonly id: number;
  readonly message: string;
  readonly ownerId: number;
}

export class GetTodosError {
  readonly _tag = "GetTodosError";
}

export class SendEmailError {
  readonly _tag = "SendEmailError";
}
```

### Defining API Functions

Let's define functions that interact with an external API, handling common operations such as fetching todos, retrieving user details, and sending emails.

```typescript
import { Effect } from "effect";
import * as Model from "./Model";

// Fetches a list of todos from an external API
export const getTodos = Effect.tryPromise({
  try: () =>
    fetch("https://api.example.demo/todos").then(
      (res) => res.json() as Promise<Array<Model.Todo>>
    ),
  catch: () => new Model.GetTodosError()
});

// Retrieves a user by their ID from an external API
export const getUserById = (id: number) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://api.example.demo/getUserById?id=${id}`).then(
        (res) => res.json() as Promise<Model.User>
      ),
    catch: () => new Model.GetUserError()
  });

// Sends an email via an external API
export const sendEmail = (address: string, text: string) =>
  Effect.tryPromise({
    try: () =>
      fetch("https://api.example.demo/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ address, text })
      }).then((res) => res.json() as Promise<void>),
    catch: () => new Model.SendEmailError()
  });

// Sends an email to a user by fetching their details first
export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(
    Effect.andThen((user) => sendEmail(user.email, message))
  );

// Notifies the owner of a todo by sending them an email
export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.andThen((user) =>
      sendEmailToUser(user.id, `hey ${user.name} you got a todo!`)
    )
  );
```

While this approach is straightforward and readable, it may not be the most efficient. Repeated API calls, especially when many todos share the same owner, can significantly increase network overhead and slow down your application.

### Using the API Functions

While these functions are clear and easy to understand, their use may not be the most efficient. For example, notifying todo owners involves repeated API calls which can be optimized.

```typescript
import { Effect } from "effect";
import * as API from "./API";

// Orchestrates operations on todos, notifying their owners
const program = Effect.gen(function* () {
  const todos = yield* API.getTodos;
  yield* Effect.forEach(todos, (todo) => API.notifyOwner(todo), {
    concurrency: "unbounded"
  });
});
```

This implementation performs an API call for each todo to fetch the owner's details and send an email. If multiple todos have the same owner, this results in redundant API calls.

### Improving Efficiency with Batch Calls

To optimize, consider implementing batch API calls if your backend supports them. This reduces the number of HTTP requests by grouping multiple operations into a single request, thereby enhancing performance and reducing load.

## Batching

Batching API calls can drastically improve the performance of your application by reducing the number of HTTP requests.

Let's assume that `getUserById` and `sendEmail` can be batched. This means that we can send multiple requests in a single HTTP call, reducing the number of API requests and improving performance.

### Step-by-Step Guide to Batching

1. **Structuring Requests:** Transform requests into structured data models, detailing input parameters, expected outputs, and possible errors.

2. **Defining Resolvers:** Resolvers handle multiple requests simultaneously, maximizing the utility of batching.

3. **Creating Queries:** Define queries that utilize batch-resolvers to perform operations.

### Declaring Requests

Define a structured model for the types of requests our data sources can handle.

```typescript
import { Request } from "effect";
import * as Model from "./Model";

// Define a request to get multiple Todo items which might fail with a GetTodosError
export interface GetTodos
  extends Request.Request<Array<Model.Todo>, Model.GetTodosError> {
  readonly _tag: "GetTodos";
}

// Create a tagged constructor for GetTodos requests
export const GetTodos = Request.tagged<GetTodos>("GetTodos");

// Define a request to fetch a User by ID which might fail with a GetUserError
export interface GetUserById
  extends Request.Request<Model.User, Model.GetUserError> {
  readonly _tag: "GetUserById";
  readonly id: number;
}

// Create a tagged constructor for GetUserById requests
export const GetUserById = Request.tagged<GetUserById>("GetUserById");

// Define a request to send an email which might fail with a SendEmailError
export interface SendEmail
  extends Request.Request<void, Model.SendEmailError> {
  readonly _tag: "SendEmail";
  readonly address: string;
  readonly text: string;
}

// Create a tagged constructor for SendEmail requests
export const SendEmail = Request.tagged<SendEmail>("SendEmail");

// Combine all requests into a union type for easier management
export type ApiRequest = GetTodos | GetUserById | SendEmail;
```

### Declaring Resolvers

Configure how Effect resolves these requests using `RequestResolver`.

```typescript
import { Effect, RequestResolver, Request } from "effect";
import * as API from "./API";
import * as Model from "./Model";
import * as Requests from "./Requests";

// Assuming GetTodos cannot be batched, we create a standard resolver.
export const GetTodosResolver = RequestResolver.fromEffect(
  (request: Requests.GetTodos) => API.getTodos
);

// Assuming GetUserById can be batched, we create a batched resolver.
export const GetUserByIdResolver = RequestResolver.makeBatched(
  (requests: ReadonlyArray<Requests.GetUserById>) =>
    Effect.tryPromise({
      try: () =>
        fetch("https://api.example.demo/getUserByIdBatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            users: requests.map(({ id }) => ({ id }))
          })
        }).then((res) => res.json()) as Promise<Array<Model.User>>,
      catch: () => new Model.GetUserError()
    }).pipe(
      Effect.andThen((users) =>
        Effect.forEach(requests, (request, index) =>
          Request.completeEffect(request, Effect.succeed(users[index]))
        )
      ),
      Effect.catchAll((error) =>
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.fail(error))
        )
      )
    )
);

// Assuming SendEmail can be batched, we create a batched resolver.
export const SendEmailResolver = RequestResolver.makeBatched(
  (requests: ReadonlyArray<Requests.SendEmail>) =>
    Effect.tryPromise({
      try: () =>
        fetch("https://api.example.demo/sendEmailBatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emails: requests.map(({ address, text }) => ({ address, text }))
          })
        }).then((res) => res.json() as Promise<void>),
      catch: () => new Model.SendEmailError()
    }).pipe(
      Effect.andThen(
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.void)
        )
      ),
      Effect.catchAll((error) =>
        Effect.forEach(requests, (request) =>
          Request.completeEffect(request, Effect.fail(error))
        )
      )
    )
);
```

### Defining Queries

Now that we've set up our resolvers, we're ready to define our queries.

```typescript
import { Effect } from "effect";
import * as Model from "./Model";
import * as Requests from "./Requests";
import * as Resolvers from "./Resolvers";

// Defines a query to fetch all Todo items
export const getTodos: Effect.Effect<
  Array<Model.Todo>,
  Model.GetTodosError
> = Effect.request(Requests.GetTodos({}), Resolvers.GetTodosResolver);

// Defines a query to fetch a user by their ID
export const getUserById = (id: number) =>
  Effect.request(
    Requests.GetUserById({ id }),
    Resolvers.GetUserByIdResolver
  );

// Defines a query to send an email to a specific address
export const sendEmail = (address: string, text: string) =>
  Effect.request(
    Requests.SendEmail({ address, text }),
    Resolvers.SendEmailResolver
  );

// Composes getUserById and sendEmail to send an email to a specific user
export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(
    Effect.andThen((user) => sendEmail(user.email, message))
  );

// Uses getUserById to fetch the owner of a Todo and then sends them an email notification
export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.andThen((user) =>
      sendEmailToUser(user.id, `hey ${user.name} you got a todo!`)
    )
  );
```

By using the `Effect.request` function, we integrate the resolvers with the request model effectively. This approach ensures that each query is optimally resolved using the appropriate resolver.

### Final Program

Assuming you've wired everything up correctly:

```typescript
import { Effect, Schedule } from "effect";
import * as Queries from "./Queries";

const program = Effect.gen(function* () {
  const todos = yield* Queries.getTodos;
  yield* Effect.forEach(todos, (todo) => Queries.notifyOwner(todo), {
    concurrency: "unbounded"
  });
}).pipe(Effect.repeat(Schedule.fixed("10 seconds")));
```

With this program, the `getTodos` operation retrieves the todos for each user. Then, the `Effect.forEach` function is used to notify the owner of each todo concurrently, without waiting for the notifications to complete.

The program incorporates a caching mechanism, which prevents the same `GetUserById` operation from being executed more than once within a span of 1 minute. This default caching behavior helps optimize the program's execution and reduces unnecessary requests to fetch user data.

### Customizing Request Caching

In real-world applications, effective caching strategies can significantly improve performance by reducing redundant data fetching. The Effect library provides flexible caching mechanisms that can be tailored for specific parts of your application or applied globally.

### Creating a Custom Cache

Here's how you can create a custom cache and apply it to part of your application.

```typescript
import { Effect, Schedule, Layer, Request } from "effect";
import * as Queries from "./Queries";

const program = Effect.gen(function* () {
  const todos = yield* Queries.getTodos;
  yield* Effect.forEach(todos, (todo) => Queries.notifyOwner(todo), {
    concurrency: "unbounded"
  });
}).pipe(
  Effect.repeat(Schedule.fixed("10 seconds")),
  Effect.provide(
    Layer.setRequestCache(
      Request.makeCache({ capacity: 256, timeToLive: "60 minutes" })
    )
  )
);
```

# Caching Effects

This section outlines several functions provided by the library that help manage caching and memoization in your application:

| Function Name               | Description                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cachedFunction**          | Returns a memoized version of a function with effects. Memoization ensures that results are stored and reused for the same inputs, reducing the need to recompute them.                                     |
| **once**                    | Returns an effect that executes only once, regardless of how many times it's called.                                                                                                                        |
| **cached**                  | Returns an effect that computes a result lazily and caches it. Subsequent evaluations of this effect will return the cached result without re-executing the logic.                                          |
| **cachedWithTTL**           | Returns an effect that caches its result for a specified duration, known as the `timeToLive`. When the cache expires after the duration, the effect will be recomputed upon next evaluation.                |
| **cachedInvalidateWithTTL** | Similar to `cachedWithTTL`, this function caches an effect's result for a specified duration. It also includes an additional effect for manually invalidating the cached value before it naturally expires. |

## cachedFunction

Returns a memoized version of a function with effects. Memoization ensures that results are stored and reused for the same inputs, reducing the need to recompute them.

```ts
import { Effect, Random } from "effect"

const program = Effect.gen(function* () {
  const randomNumber = (n: number) => Random.nextIntBetween(1, n)
  console.log("non-memoized version:")
  console.log(yield* randomNumber(10))
  console.log(yield* randomNumber(10))

  console.log("memoized version:")
  const memoized = yield* Effect.cachedFunction(randomNumber)
  console.log(yield* memoized(10))
  console.log(yield* memoized(10))
})

Effect.runFork(program)
/*
Example Output:
non-memoized version:
2
8
memoized version:
5
5
*/
```

## once

Returns an effect that executes only once, regardless of how many times it's called.

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  const task1 = Console.log("task1")
  yield* Effect.repeatN(task1, 2)
  const task2 = yield* Effect.once(Console.log("task2"))
  yield* Effect.repeatN(task2, 2)
})

Effect.runFork(program)
/*
Output:
task1
task1
task1
task2
*/
```

## cached

Returns an effect that computes a result lazily and caches it. Subsequent evaluations of this effect will return the cached result without re-executing the logic.

```ts
import { Effect, Console } from "effect"

let i = 1
const expensiveTask = Effect.promise<string>(() => {
  console.log("expensive task...")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`result ${i++}`)
    }, 100)
  })
})

const program = Effect.gen(function* () {
  console.log("non-cached version:")
  yield* expensiveTask.pipe(Effect.andThen(Console.log))
  yield* expensiveTask.pipe(Effect.andThen(Console.log))
  console.log("cached version:")
  const cached = yield* Effect.cached(expensiveTask)
  yield* cached.pipe(Effect.andThen(Console.log))
  yield* cached.pipe(Effect.andThen(Console.log))
})

Effect.runFork(program)
/*
Output:
non-cached version:
expensive task...
result 1
expensive task...
result 2
cached version:
expensive task...
result 3
result 3
*/
```

## cachedWithTTL

Returns an effect that caches its result for a specified duration, known as the `timeToLive`. When the cache expires after the duration, the effect will be recomputed upon next evaluation.

```ts
import { Effect, Console } from "effect"

let i = 1
const expensiveTask = Effect.promise<string>(() => {
  console.log("expensive task...")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`result ${i++}`)
    }, 100)
  })
})

const program = Effect.gen(function* () {
  const cached = yield* Effect.cachedWithTTL(expensiveTask, "150 millis")
  yield* cached.pipe(Effect.andThen(Console.log))
  yield* cached.pipe(Effect.andThen(Console.log))
  yield* Effect.sleep("100 millis")
  yield* cached.pipe(Effect.andThen(Console.log))
})

Effect.runFork(program)
/*
Output:
expensive task...
result 1
result 1
expensive task...
result 2
*/
```

## cachedInvalidateWithTTL

Similar to `cachedWithTTL`, this function caches an effect's result for a specified duration. It also includes an additional effect for manually invalidating the cached value before it naturally expires.

```ts
import { Effect, Console } from "effect"

let i = 1
const expensiveTask = Effect.promise<string>(() => {
  console.log("expensive task...")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`result ${i++}`)
    }, 100)
  })
})

const program = Effect.gen(function* () {
  const [cached, invalidate] = yield* Effect.cachedInvalidateWithTTL(
    expensiveTask,
    "1 hour"
  )
  yield* cached.pipe(Effect.andThen(Console.log))
  yield* cached.pipe(Effect.andThen(Console.log))
  yield* invalidate
  yield* cached.pipe(Effect.andThen(Console.log))
})

Effect.runFork(program)
/*
Output:
expensive task...
result 1
result 1
expensive task...
result 2
*/
```

# Introduction

The Cache module optimizes application performance by caching values, preventing redundant work in scenarios with overlapping tasks.

## Key Features of Cache

- **Compositionality**: Supports overlapping work while adhering to compositional programming principles.
- **Unification of Synchronous and Asynchronous Caches**: A unified lookup function allows for both synchronous and asynchronous value computation.
- **Deep Effect Integration**: Works natively with the Effect library, supporting concurrent lookups, failure handling, and interruption.
- **Caching Policy**: Determines when values are removed from the cache, consisting of:
  - **Priority (Optional Removal)**: Order of potential value removal when space is low.
  - **Evict (Mandatory Removal)**: Specifies when values must be removed due to invalidity.
- **Composition Caching Policy**: Enables complex caching policies using simpler ones.
- **Cache/Entry Statistics**: Tracks metrics like entries, hits, and misses for performance assessment.

## How to Define a Cache

A cache is defined by a lookup function that computes the value associated with a key if not already cached.

```ts
export type Lookup<Key, Value, Error = never, Environment = never> = (
  key: Key
) => Effect.Effect<Value, Error, Environment>
```

The lookup function returns an `Effect` that can fail or succeed, describing both synchronous and asynchronous workflows.

To construct a cache, use a lookup function, maximum size, and time to live:

```ts
export declare const make: <
  Key,
  Value,
  Error = never,
  Environment = never
>(options: {
  readonly capacity: number
  readonly timeToLive: Duration.DurationInput
  readonly lookup: Lookup<Key, Value, Error, Environment>
}) => Effect.Effect<Cache<Key, Value, Error>, never, Environment>
```

The `get` operator retrieves the current value or computes a new one, ensuring that concurrent requests for the same value are handled efficiently.

### Example

```ts twoslash
import { Effect, Cache, Duration } from "effect"

const timeConsumingEffect = (key: string) =>
  Effect.sleep("2 seconds").pipe(Effect.as(key.length))

const program = Effect.gen(function* () {
  const cache = yield* Cache.make({
    capacity: 100,
    timeToLive: Duration.infinity,
    lookup: timeConsumingEffect
  })
  const result = yield* cache
    .get("key1")
    .pipe(
      Effect.zip(cache.get("key1"), { concurrent: true }),
      Effect.zip(cache.get("key1"), { concurrent: true })
    )
  console.log(
    `Result of parallel execution of three effects with the same key: ${result}`
  )

  const hits = yield* cache.cacheStats.pipe(Effect.map((_) => _.hits))
  const misses = yield* cache.cacheStats.pipe(Effect.map((_) => _.misses))
  console.log(`Number of cache hits: ${hits}`)
  console.log(`Number of cache misses: ${misses}`)
})

Effect.runPromise(program)
/*
Output:
Result of parallel execution of three effects with the same key: 4,4,4
Number of cache hits: 2
Number of cache misses: 1
*/
```

## Concurrent Access

The cache supports safe and efficient concurrent access. If multiple processes request the same value, it is computed once and shared. Errors during lookup are propagated to all waiting processes, and failed values are cached to avoid repeated computation.

## Capacity

A cache has a specified capacity, removing the least recently accessed values when full. The size may slightly exceed the specified capacity between operations.

## Time To Live (TTL)

Values older than the TTL are not returned, with age calculated from when the value was cached.

## Operators

Cache provides several operators:

- **refresh**: Triggers re-computation of a value without invalidating it.
- **size**: Returns the current size of the cache (approximate under concurrent access).
- **contains**: Checks if a value exists for a specified key (valid at check time).
- **invalidate**: Evicts the value for a specified key.
- **invalidateAll**: Evicts all values in the cache.

# Caching

Caching is a technique used to store copies of files or data in a temporary storage location for quick access. This process improves data retrieval times and reduces the load on the primary data source.

## Benefits of Caching

- **Improved Performance**: Reduces latency by serving data from the cache instead of fetching it from the original source.
- **Reduced Load**: Decreases the number of requests to the primary data source, which can enhance overall system performance.
- **Cost Efficiency**: Minimizes the need for expensive data retrieval operations.

## Types of Caching

1. **Memory Caching**: Stores data in RAM for fast access.
2. **Disk Caching**: Uses disk storage to hold frequently accessed data.
3. **Distributed Caching**: Involves multiple cache nodes to share the load and improve scalability.

## Implementation Strategies

- **Cache Invalidation**: Establish rules for when cached data should be refreshed or removed.
- **Cache Expiration**: Set time limits for how long data remains in the cache.
- **Cache Hierarchy**: Use multiple layers of caching to optimize performance.

## Best Practices

- Monitor cache performance and hit rates.
- Optimize cache size based on usage patterns.
- Implement fallback mechanisms for cache misses.

## Conclusion

Effective caching strategies can significantly enhance application performance and user experience. Proper implementation and management are crucial for maximizing the benefits of caching.

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

---
title: Fibers
excerpt: Discover the power of fibers in Effect, providing a lightweight and efficient way to manage concurrency and asynchronous tasks. Learn the fundamentals of fibers, their role in multitasking, and how they contribute to responsive applications. Explore the creation of fibers, their lifetimes, and various forking strategies, gaining insights into structured concurrency and daemon fibers. Unravel the intricacies of when fibers run, enabling you to optimize their execution and harness the full potential of concurrent programming in Effect.
---

## What is a Fiber?

A "fiber" is a small unit of work or a lightweight thread of execution, representing a specific computation or an effectful operation in a program. Fibers manage concurrency and asynchronous tasks, allowing multiple tasks to run simultaneously without blocking the main program.

- An `Effect` is a higher-level concept describing an effectful computation that is lazy and immutable.
- A fiber represents the running execution of an `Effect`, which can be interrupted or awaited to retrieve its result.

## Creating Fibers

A fiber is created whenever an effect is run. Each concurrent effect results in a new fiber.

## Lifetime of Child Fibers

When forking fibers, there are four different lifetime strategies for child fibers:

1. **Fork With Automatic Supervision**: Using `Effect.fork`, the child fiber is supervised by the parent fiber. It terminates when the parent fiber ends or naturally completes.

2. **Fork in Global Scope (Daemon)**: Using `Effect.forkDaemon`, the child fiber runs in a global scope and is not supervised by the parent. It terminates when the application ends or naturally completes.

3. **Fork in Local Scope**: Using `Effect.forkScoped`, the child fiber can outlive its parent fiber and will terminate when the local scope is closed.

4. **Fork in Specific Scope**: Using `Effect.forkIn`, the child fiber is forked in a specific scope, allowing for more control over its lifetime.

### Fork with Automatic Supervision

Effect employs a structured concurrency model where the lifespan of a fiber depends on its parent fiber. 

Example:
```ts
import { Effect, Console, Schedule } from "effect"

const child = Effect.repeat(
  Console.log("child: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.fork(child)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

Effect.runPromise(parent)
```

Output:
```
parent: started!
child: still running!
child: still running!
child: still running!
parent: finished!
```

### Fork in Global Scope (Daemon)

Using `Effect.forkDaemon`, the daemon fiber runs independently of the parent fiber.

Example:
```ts
import { Effect, Console, Schedule } from "effect"

const daemon = Effect.repeat(
  Console.log("daemon: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.forkDaemon(daemon)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

Effect.runPromise(parent)
```

Output:
```
parent: started!
daemon: still running!
daemon: still running!
parent: finished!
daemon: still running!
...etc...
```

### Fork in Local Scope

Using `Effect.forkScoped`, the child fiber can outlive its parent fiber.

Example:
```ts
import { Effect, Console, Schedule } from "effect"

const child = Effect.repeat(
  Console.log("child: still running!"),
  Schedule.fixed("1 second")
)

const parent = Effect.gen(function* () {
  console.log("parent: started!")
  yield* Effect.forkScoped(child)
  yield* Effect.sleep("3 seconds")
  console.log("parent: finished!")
})

const program = Effect.scoped(
  Effect.gen(function* () {
    console.log("Local scope started!")
    yield* Effect.fork(parent)
    yield* Effect.sleep("5 seconds")
    console.log("Leaving the local scope!")
  })
)

Effect.runPromise(program)
```

Output:
```
Local scope started!
parent: started!
child: still running!
parent: finished!
Leaving the local scope!
```

### Fork in Specific Scope

Using `Effect.forkIn`, the child fiber is forked in a specific scope.

Example:
```ts
import { Console, Effect, Schedule } from "effect"

const child = Console.log("child: still running!").pipe(
  Effect.repeat(Schedule.fixed("1 second"))
)

const program = Effect.scoped(
  Effect.gen(function* () {
    yield* Effect.addFinalizer(() =>
      Console.log("The outer scope is about to be closed!")
    )

    const outerScope = yield* Effect.scope

    yield* Effect.scoped(
      Effect.gen(function* () {
        yield* Effect.addFinalizer(() =>
          Console.log("The inner scope is about to be closed!")
        )
        yield* Effect.forkIn(child, outerScope)
        yield* Effect.sleep("3 seconds")
      })
    )

    yield* Effect.sleep("5 seconds")
  })
)

Effect.runPromise(program)
```

Output:
```
child: still running!
The inner scope is about to be closed!
The outer scope is about to be closed!
```

## When do Fibers run?

New fibers begin execution after the current fiber completes or yields. This prevents infinite loops and is important when using the `fork` APIs.

Example:
```ts
import { Effect, SubscriptionRef, Stream, Console } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  yield* ref.changes.pipe(
    Stream.tap((n) => Console.log(`SubscriptionRef changed to ${n}`)),
    Stream.runDrain,
    Effect.fork
  )
  yield* SubscriptionRef.set(ref, 1)
  yield* SubscriptionRef.set(ref, 2)
})

Effect.runPromise(program)
/*
Output:
SubscriptionRef changed to 2
*/
```

Adding `Effect.yieldNow()` allows the stream to capture all values:
```ts
import { Effect, SubscriptionRef, Stream, Console } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  yield* ref.changes.pipe(
    Stream.tap((n) => Console.log(`SubscriptionRef changed to ${n}`)),
    Stream.runDrain,
    Effect.fork
  )
  yield* Effect.yieldNow()
  yield* SubscriptionRef.set(ref, 1)
  yield* SubscriptionRef.set(ref, 2)
})

Effect.runPromise(program)
/*
Output:
SubscriptionRef changed to 0
SubscriptionRef changed to 1
SubscriptionRef changed to 2
*/
```

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

# Deferred

Explore the power of `Deferred` in Effect, a specialized subtype of `Effect` that acts as a one-time variable with unique characteristics. Discover how `Deferred` serves as a synchronization tool for managing asynchronous operations, allowing coordination between different parts of your code. Learn common use cases, including coordinating fibers, synchronization, handing over work, and suspending execution. Dive into operations such as creating, awaiting, completing, and polling `Deferred`, providing practical examples and scenarios to enhance your understanding of this powerful tool.

A `Deferred<A, E>` is a special subtype of `Effect` that acts as a variable, but with unique characteristics. It can only be set once, making it a powerful synchronization tool for managing asynchronous operations.

A `Deferred` is essentially a synchronization primitive that represents a value that may not be available immediately. When you create a `Deferred`, it starts with an empty value. Later on, you can complete it exactly once with either a success value (`A`) or a failure value (`E`). Once completed, a `Deferred` can never be modified or emptied again.

## Common Use Cases

`Deferred` is useful when you need to wait for something specific to happen in your program. It's ideal for scenarios where one part of your code signals another part when it's ready. Common use cases include:

- **Coordinating Fibers**: Helps one fiber signal another when it has completed its task.
- **Synchronization**: Ensures one piece of code doesn't proceed until another has finished.
- **Handing Over Work**: Allows one fiber to prepare data for another to process.
- **Suspending Execution**: Blocks a fiber until a condition is met.

When a fiber calls `await` on a `Deferred`, it blocks until that `Deferred` is completed with either a value or an error. Importantly, blocking fibers don't block the main thread; they block only semantically, allowing other fibers to execute.

A `Deferred` in Effect is conceptually similar to JavaScript's `Promise`, with the key difference being that `Deferred` has two type parameters (`E` and `A`), allowing it to represent both successful results and errors.

## Operations

### Creating

Create a `Deferred` using `Deferred.make<A, E>()`, which returns an `Effect<Deferred<A, E>>`. `Deferred`s can only be created within an `Effect` due to effectful memory allocation.

### Awaiting

Retrieve a value from a `Deferred` using `Deferred.await`, which suspends the calling fiber until the `Deferred` is completed.

```ts
import { Effect, Deferred } from "effect"

const effectDeferred = Deferred.make<string, Error>()

const effectGet = effectDeferred.pipe(
  Effect.andThen((deferred) => Deferred.await(deferred))
)
```

### Completing

Complete a `Deferred<A, E>` in various ways:

- `Deferred.succeed`: Completes successfully with a value of type `A`.
- `Deferred.done`: Completes with an `Exit<A, E>` type.
- `Deferred.complete`: Completes with the result of an effect `Effect<A, E>`.
- `Deferred.completeWith`: Completes with an effect `Effect<A, E>`, executed by each waiting fiber.
- `Deferred.fail`: Fails with an error of type `E`.
- `Deferred.die`: Defects with a user-defined error.
- `Deferred.failCause`: Fails or defects with a `Cause<E>`.
- `Deferred.interrupt`: Interrupts the `Deferred`, stopping waiting fibers.

Example demonstrating completion methods:

```ts
import { Effect, Deferred, Exit, Cause } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()

  yield* Deferred.succeed(deferred, 1).pipe(Effect.fork)
  yield* Deferred.complete(deferred, Effect.succeed(2)).pipe(Effect.fork)
  yield* Deferred.completeWith(deferred, Effect.succeed(3)).pipe(Effect.fork)
  yield* Deferred.done(deferred, Exit.succeed(4)).pipe(Effect.fork)
  yield* Deferred.fail(deferred, "5").pipe(Effect.fork)
  yield* Deferred.failCause(deferred, Cause.die(new Error("6"))).pipe(Effect.fork)
  yield* Deferred.die(deferred, new Error("7")).pipe(Effect.fork)
  yield* Deferred.interrupt(deferred).pipe(Effect.fork)

  const value = yield* Deferred.await(deferred)
  return value
})

Effect.runPromise(program).then(console.log, console.error) // Output: 1
```

Completing a `Deferred` results in an `Effect<boolean>`, returning `true` if the value has been set and `false` if it was already set.

Example demonstrating state change:

```ts
import { Effect, Deferred } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()
  const b1 = yield* Deferred.fail(deferred, "oh no!")
  const b2 = yield* Deferred.succeed(deferred, 1)
  return [b1, b2]
})

Effect.runPromise(program).then(console.log) // Output: [ true, false ]
```

### Polling

Check whether a `Deferred` has been completed without suspending the fiber using `Deferred.poll`, which returns an `Option<Effect<A, E>>`.

- If not completed, returns `None`.
- If completed, returns `Some` with the result or error.

Use `Deferred.isDone`, which returns an `Effect<boolean>`, evaluating to `true` if completed.

Example:

```ts
import { Effect, Deferred } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<number, string>()

  const done1 = yield* Deferred.poll(deferred)
  const done2 = yield* Deferred.isDone(deferred)

  return [done1, done2]
})

Effect.runPromise(program).then(console.log) // Output: [ none(), false ]
```

## Example: Using Deferred to Coordinate Two Fibers

Example using a `Deferred` to hand over a value between two fibers:

```ts
import { Effect, Deferred, Fiber } from "effect"

const program = Effect.gen(function* () {
  const deferred = yield* Deferred.make<string, string>()

  const sendHelloWorld = Effect.gen(function* () {
    yield* Effect.sleep("1 second")
    return yield* Deferred.succeed(deferred, "hello world")
  })

  const getAndPrint = Effect.gen(function* () {
    const s = yield* Deferred.await(deferred)
    console.log(s)
    return s
  })

  const fiberA = yield* Effect.fork(sendHelloWorld)
  const fiberB = yield* Effect.fork(getAndPrint)

  return yield* Fiber.join(Fiber.zip(fiberA, fiberB))
})

Effect.runPromise(program).then(console.log, console.error)
/*
Output:
hello world
[ true, "hello world" ]
*/
```

In this example, `fiberA` sets the `Deferred` value to "hello world" after waiting for 1 second, while `fiberB` waits for the `Deferred` to be completed and prints the value. This coordination mechanism effectively manages communication between different parts of your program.

# Queue

Explore the lightweight, in-memory `Queue` in Effect, designed for composable and transparent back-pressure. Learn about its fully asynchronous, purely-functional, and type-safe characteristics. Delve into basic operations, creating different types of queues, and efficiently adding and consuming items. Discover how to shut down a queue gracefully and handle exclusive capabilities with offer-only and take-only queues. Enhance your understanding of `Queue` and leverage its power for seamless coordination in your asynchronous workflows.

A `Queue` is a lightweight in-memory queue built on Effect with composable and transparent back-pressure. It is fully asynchronous (no locks or blocking), purely-functional, and type-safe.

## Basic Operations

A `Queue<A>` stores values of type `A` and provides two fundamental operations:

- `Queue.offer`: Adds a value of type `A` to the `Queue`.
- `Queue.take`: Removes and returns the oldest value from the `Queue`.

Example:

```ts
import { Effect, Queue } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 1) // Add 1 to the queue
  const value = yield* Queue.take(queue) // Retrieve and remove the oldest value
  return value
})

Effect.runPromise(program).then(console.log) // Output: 1
```

## Creating a Queue

A `Queue` can have bounded (limited capacity) or unbounded storage. Choose from various strategies to handle new values when the queue reaches its capacity.

### Bounded Queue

Provides back-pressure when full. Attempts to add more items will be suspended until space is available.

```ts
import { Queue } from "effect"

// Creating a bounded queue with a capacity of 100
const boundedQueue = Queue.bounded<number>(100)
```

### Dropping Queue

Drops new items when full without waiting for space.

```ts
import { Queue } from "effect"

// Creating a dropping queue with a capacity of 100
const droppingQueue = Queue.dropping<number>(100)
```

### Sliding Queue

Removes old items when full to accommodate new ones.

```ts
import { Queue } from "effect"

// Creating a sliding queue with a capacity of 100
const slidingQueue = Queue.sliding<number>(100)
```

### Unbounded Queue

Has no capacity limit.

```ts
import { Queue } from "effect"

// Creating an unbounded queue
const unboundedQueue = Queue.unbounded<number>()
```

## Adding Items to a Queue

Use `Queue.offer` to add a value:

```ts
import { Effect, Queue } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 1) // put 1 in the queue
})
```

For back-pressured queues, if full, `offer` may suspend. Use `Effect.fork` to wait in a different execution context.

```ts
import { Effect, Queue, Fiber } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(1)
  yield* Queue.offer(queue, 1)
  const fiber = yield* Effect.fork(Queue.offer(queue, 2)) // will be suspended
  yield* Queue.take(queue)
  yield* Fiber.join(fiber)
})
```

Add multiple values using `Queue.offerAll`:

```ts
import { Effect, Queue, Array } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  const items = Array.range(1, 10)
  yield* Queue.offerAll(queue, items)
  return yield* Queue.size(queue)
})

Effect.runPromise(program).then(console.log) // Output: 10
```

## Consuming Items from a Queue

`Queue.take` removes the oldest item. If empty, it suspends until an item is added. Use `Effect.fork` to wait in a different execution context.

```ts
import { Effect, Queue, Fiber } from "effect"

const oldestItem = Effect.gen(function* () {
  const queue = yield* Queue.bounded<string>(100)
  const fiber = yield* Effect.fork(Queue.take(queue)) // will be suspended
  yield* Queue.offer(queue, "something")
  const value = yield* Fiber.join(fiber)
  return value
})

Effect.runPromise(oldestItem).then(console.log) // Output: something
```

Retrieve the first item using `Queue.poll`. If empty, returns `None`; otherwise, the top item is wrapped in `Some`.

```ts
import { Effect, Queue } from "effect"

const polled = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 10)
  yield* Queue.offer(queue, 20)
  const head = yield* Queue.poll(queue)
  return head
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 10
}
*/
```

Retrieve multiple items using `Queue.takeUpTo`. If not enough items, returns all available without waiting.

```ts
import { Effect, Queue } from "effect"

const polled = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 10)
  yield* Queue.offer(queue, 20)
  yield* Queue.offer(queue, 30)
  const chunk = yield* Queue.takeUpTo(queue, 2)
  return chunk
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 10, 20 ]
}
*/
```

Retrieve all items using `Queue.takeAll`. Returns immediately, providing an empty collection if the queue is empty.

```ts
import { Effect, Queue } from "effect"

const polled = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(100)
  yield* Queue.offer(queue, 10)
  yield* Queue.offer(queue, 20)
  yield* Queue.offer(queue, 30)
  const chunk = yield* Queue.takeAll(queue)
  return chunk
})

Effect.runPromise(polled).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 10, 20, 30 ]
}
*/
```

## Shutting Down a Queue

Use `Queue.shutdown` to interrupt all fibers suspended on `offer*` or `take*`. Empties the queue and terminates future `offer*` and `take*` calls.

```ts
import { Effect, Queue, Fiber } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(3)
  const fiber = yield* Effect.fork(Queue.take(queue))
  yield* Queue.shutdown(queue) // will interrupt fiber
  yield* Fiber.join(fiber) // will terminate
})
```

Use `Queue.awaitShutdown` to execute an effect when the queue is shut down. Waits until the queue is shut down, resuming immediately if already shut down.

```ts
import { Effect, Queue, Fiber, Console } from "effect"

const program = Effect.gen(function* () {
  const queue = yield* Queue.bounded<number>(3)
  const fiber = yield* Effect.fork(
    Queue.awaitShutdown(queue).pipe(
      Effect.andThen(Console.log("shutting down"))
    )
  )
  yield* Queue.shutdown(queue)
  yield* Fiber.join(fiber)
})

Effect.runPromise(program) // Output: shutting down
```

## Offer-only / Take-only Queues

For exclusive capabilities, use `Enqueue` for offering values or `Dequeue` for taking values.

Example of `Enqueue`:

```ts
import { Queue } from "effect"

const send = (offerOnlyQueue: Queue.Enqueue<number>, value: number) => {
  // This enqueue can only be used to offer values

  // @ts-expect-error
  Queue.take(offerOnlyQueue)

  // Ok
  return Queue.offer(offerOnlyQueue, value)
}
```

Example of `Dequeue`:

```ts
import { Queue } from "effect"

const receive = (takeOnlyQueue: Queue.Dequeue<number>) => {
  // This dequeue can only be used to take values

  // @ts-expect-error
  Queue.offer(takeOnlyQueue, 1)

  // Ok
  return Queue.take(takeOnlyQueue)
}
```

The `Queue` type extends both `Enqueue` and `Dequeue`, allowing you to pass it to different parts of your code to enforce either behavior:

```ts
import { Effect, Queue } from "effect"

const send = (offerOnlyQueue: Queue.Enqueue<number>, value: number) => {
  return Queue.offer(offerOnlyQueue, value)
}

const receive = (takeOnlyQueue: Queue.Dequeue<number>) => {
  return Queue.take(takeOnlyQueue)
}

const program = Effect.gen(function* () {
  const queue = yield* Queue.unbounded<number>()

  // Offer values to the queue
  yield* send(queue, 1)
  yield* send(queue, 2)

  // Take values from the queue
  console.log(yield* receive(queue))
  console.log(yield* receive(queue))
})

Effect.runPromise(program)
/*
Output:
1
2
*/

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

---
title: Semaphore
excerpt: Discover the power of semaphores in Effect, a synchronization mechanism that regulates access to shared resources and coordinates tasks in an asynchronous and concurrent environment. Delve into the fundamental concept of semaphores, learn how they function in Effect, and explore real-world examples showcasing their application in controlling asynchronous tasks. Gain insights into precise control over concurrency using permits and understand how semaphores elevate your ability to manage resources effectively.
---

A semaphore is a synchronization mechanism that controls access to a shared resource. In Effect, semaphores manage resource access or coordinate tasks in an asynchronous and concurrent environment.

## What is a Semaphore?

A semaphore generalizes a mutex and has a certain number of **permits** that can be held and released concurrently. Permits act as tickets allowing entities (e.g., tasks or fibers) to access a shared resource. If no permits are available, an entity attempting to acquire one will be suspended until a permit becomes available.

### Example with Asynchronous Tasks

```ts
import { Effect } from "effect"

const task = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.log("end")
})

const semTask = (sem: Effect.Semaphore) => sem.withPermits(1)(task)

const semTaskSeq = (sem: Effect.Semaphore) =>
  [1, 2, 3].map(() => semTask(sem).pipe(Effect.withLogSpan("elapsed")))

const program = Effect.gen(function* () {
  const mutex = yield* Effect.makeSemaphore(1)
  yield* Effect.all(semTaskSeq(mutex), { concurrency: "unbounded" })
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#1 message=start elapsed=3ms
timestamp=... level=INFO fiber=#1 message=end elapsed=2010ms
timestamp=... level=INFO fiber=#2 message=start elapsed=2012ms
timestamp=... level=INFO fiber=#2 message=end elapsed=4017ms
timestamp=... level=INFO fiber=#3 message=start elapsed=4018ms
timestamp=... level=INFO fiber=#3 message=end elapsed=6026ms
*/
```

In this example, we synchronize and control the execution of asynchronous tasks using a semaphore with one permit. When all permits are in use, additional tasks will wait until some become available.

### Example with Multiple Permits

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const sem = yield* Effect.makeSemaphore(5)

  yield* Effect.forEach(
    [1, 2, 3, 4, 5],
    (n) =>
      sem
        .withPermits(n)(
          Effect.delay(Effect.log(`process: ${n}`), "2 seconds")
        )
        .pipe(Effect.withLogSpan("elapsed")),
    { concurrency: "unbounded" }
  )
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#1 message="process: 1" elapsed=2011ms
timestamp=... level=INFO fiber=#2 message="process: 2" elapsed=2017ms
timestamp=... level=INFO fiber=#3 message="process: 3" elapsed=4020ms
timestamp=... level=INFO fiber=#4 message="process: 4" elapsed=6025ms
timestamp=... level=INFO fiber=#5 message="process: 5" elapsed=8034ms
*/
```

This example demonstrates acquiring and releasing any number of permits with `withPermits(n)`, allowing for precise control over concurrency.

It is crucial to remember that `withPermits` ensures each acquisition is matched with an equivalent number of releases, regardless of the task's success, failure, or interruption.

# Basic Concurrency

Effect is a highly concurrent framework powered by fibers. Fibers are lightweight virtual threads with resource-safe cancellation capabilities, enabling many features in Effect.

In this section, you will learn the basics of fibers and get familiar with some of the powerful high-level operators that utilize fibers.

## What Are Virtual Threads?

JavaScript is inherently single-threaded, executing code in a single sequence of instructions. Modern JavaScript environments use an event loop to manage asynchronous operations, creating the illusion of multitasking. In this context, virtual threads, or fibers, are logical threads simulated by the Effect runtime, allowing concurrent execution without true multi-threading.

## Fibers

All effects in Effect are executed by fibers. If you didn't create the fiber yourself, it was created by an operation you're using or by the Effect runtime system. There is always at least one fiber: the "main" fiber that executes your effect.

Effect fibers have a well-defined lifecycle based on the effect they are executing and exit with either a failure or success.

Effect fibers have unique identities, local state, and a status (such as done, running, or suspended).

### The Fiber Data Type

The Fiber data type in Effect represents a "handle" on the execution of an effect.

The `Fiber<A, E>` data type has two type parameters:

- **A (Success Type)**: The type of value the fiber may succeed with.
- **E (Failure Type)**: The type of value the fiber may fail with.

Fibers do not have an `R` type parameter because they only execute effects that have already had their requirements provided.

### Forking Effects

You can create a fiber by forking an existing effect. When you fork an effect, it starts executing on a new fiber, giving you a reference to this newly-created fiber.

Example:

```ts
import { Effect } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }
    return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b))
  })

const fib10Fiber = Effect.fork(fib(10))
```

### Joining Fibers

You can join fibers using the `Fiber.join` function, which returns an `Effect` that will succeed or fail based on the outcome of the fiber it joins.

Example:

```ts
import { Effect, Fiber } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }
    return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b))
  })

const fib10Fiber = Effect.fork(fib(10))

const program = Effect.gen(function* () {
  const fiber = yield* fib10Fiber
  const n = yield* Fiber.join(fiber)
  console.log(n)
})

Effect.runPromise(program) // 55
```

### Awaiting Fibers

The `Fiber.await` function returns an effect containing an Exit value, providing detailed information about how the fiber completed.

Example:

```ts
import { Effect, Fiber } from "effect"

const fib = (n: number): Effect.Effect<number> =>
  Effect.suspend(() => {
    if (n <= 1) {
      return Effect.succeed(n)
    }
    return fib(n - 1).pipe(Effect.zipWith(fib(n - 2), (a, b) => a + b))
  })

const fib10Fiber = Effect.fork(fib(10))

const program = Effect.gen(function* () {
  const fiber = yield* fib10Fiber
  const exit = yield* Fiber.await(fiber)
  console.log(exit)
})

Effect.runPromise(program) // { _id: 'Exit', _tag: 'Success', value: 55 }
```

### Interrupting Fibers

If a fiber's result is no longer needed, it can be interrupted, terminating the fiber and safely releasing all resources.

Example:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(Effect.forever(Effect.succeed("Hi!")))
  const exit = yield* Fiber.interrupt(fiber)
  console.log(exit)
})

Effect.runPromise(program)
/*
Output
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Interrupt',
    fiberId: {
      _id: 'FiberId',
      _tag: 'Runtime',
      id: 0,
      startTimeMillis: 1715787137490
    }
  }
}
*/
```

You can also fork the interruption into a new fiber:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(Effect.forever(Effect.succeed("Hi!")))
  const _ = yield* Effect.fork(Fiber.interrupt(fiber))
})
```

There is a shorthand for background interruption called `Fiber.interruptFork`.

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber = yield* Effect.fork(Effect.forever(Effect.succeed("Hi!")))
  const _ = yield* Fiber.interruptFork(fiber)
})
```

### Composing Fibers

The `Fiber.zip` and `Fiber.zipWith` functions allow you to combine two fibers into a single fiber. The resulting fiber produces the results of both input fibers. If either input fiber fails, the composed fiber will also fail.

Example using `Fiber.zip`:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber1 = yield* Effect.fork(Effect.succeed("Hi!"))
  const fiber2 = yield* Effect.fork(Effect.succeed("Bye!"))
  const fiber = Fiber.zip(fiber1, fiber2)
  const tuple = yield* Fiber.join(fiber)
  console.log(tuple)
})

Effect.runPromise(program)
/*
Output:
[ 'Hi!', 'Bye!' ]
*/
```

Using `Fiber.orElse` allows you to specify an alternative fiber that will execute if the first fiber fails.

Example using `Fiber.orElse`:

```ts
import { Effect, Fiber } from "effect"

const program = Effect.gen(function* () {
  const fiber1 = yield* Effect.fork(Effect.fail("Uh oh!"))
  const fiber2 = yield* Effect.fork(Effect.succeed("Hurray!"))
  const fiber = Fiber.orElse(fiber1, fiber2)
  const message = yield* Fiber.join(fiber)
  console.log(message)
})

Effect.runPromise(program)
/*
Output:
Hurray!
*/
```

## Concurrency Options

Effect provides functions that accept Concurrency Options to help identify opportunities to parallelize your code.

Example using standard `Effect.zip`:

```ts
import { Effect, Console } from "effect"

const task1 = Effect.delay(Console.log("task1"), "1 second")
const task2 = Effect.delay(Console.log("task2"), "2 seconds")

const program = Effect.zip(task1, task2)

Effect.runPromise(Effect.timed(program)).then(([duration]) =>
  console.log(String(duration))
)
/*
Output:
task1
task2
Duration(3s 5ms 369875ns)
*/
```

Example using concurrent version of `Effect.zip`:

```ts
import { Effect, Console } from "effect"

const task1 = Effect.delay(Console.log("task1"), "1 second")
const task2 = Effect.delay(Console.log("task2"), "2 seconds")

const program = Effect.zip(task1, task2, { concurrent: true })

Effect.runPromise(Effect.timed(program)).then(([duration]) =>
  console.log(String(duration))
)
/*
Output:
task1
task2
Duration(2s 8ms 179666ns)
*/
```

## Racing

The `Effect.race` function lets you race multiple effects concurrently and returns the result of the first one that successfully completes.

Example:

```ts
import { Effect } from "effect"

const task1 = Effect.delay(Effect.fail("task1"), "1 second")
const task2 = Effect.delay(Effect.succeed("task2"), "2 seconds")

const program = Effect.race(task1, task2)

Effect.runPromise(program).then(console.log)
/*
Output:
task2
*/
```

Using `Effect.either` allows you to handle the first effect to complete, whether it succeeds or fails.

Example:

```ts
import { Effect } from "effect"

const task1 = Effect.delay(Effect.fail("task1"), "1 second")
const task2 = Effect.delay(Effect.succeed("task2"), "2 seconds")

const program = Effect.race(Effect.either(task1), Effect.either(task2))

Effect.runPromise(program).then(console.log)
/*
Output:
{ _id: 'Either', _tag: 'Left', left: 'task1' }
*/
```

## Timeout

Effect provides a way to enforce time limits on effects using the `Effect.timeout` function. This function returns a new effect that will fail with a `TimeoutException` if the original effect does not complete within the specified duration.

Example:

```ts
import { Effect } from "effect"

const task = Effect.delay(Effect.succeed("task1"), "10 seconds")

const program = Effect.timeout(task, "2 seconds")

Effect.runPromise(program)
/*
throws:
TimeoutException
*/
```

If an effect times out, the library automatically interrupts it to prevent it from continuing to execute in the background.

# Concurrency

Concurrency refers to the ability of a system to handle multiple tasks simultaneously. It is a key concept in computer science and software development, allowing for more efficient use of resources and improved performance.

## Key Concepts

- **Threads**: The smallest unit of processing that can be scheduled by an operating system. Multiple threads can exist within the same process, sharing resources but executing independently.

- **Asynchronous Programming**: A programming paradigm that allows tasks to run in the background, enabling the main program to continue executing without waiting for the task to complete.

- **Synchronization**: The coordination of concurrent processes to ensure that they do not interfere with each other. This can involve mechanisms like locks, semaphores, and monitors.

- **Deadlock**: A situation where two or more processes are unable to proceed because each is waiting for the other to release resources.

- **Race Condition**: A situation that occurs when the outcome of a process depends on the sequence or timing of uncontrollable events, leading to unpredictable results.

## Best Practices

- Use thread pools to manage multiple threads efficiently.
- Implement proper synchronization to avoid race conditions and deadlocks.
- Favor asynchronous programming models when dealing with I/O-bound tasks.
- Monitor and profile concurrent applications to identify bottlenecks.

## Conclusion

Understanding concurrency is essential for developing efficient and responsive applications. By leveraging threads, asynchronous programming, and proper synchronization techniques, developers can create systems that perform well under load.

# Introduction to Streams

Discover the power of `Stream<A, E, R>` in Effect, a program description that goes beyond the capabilities of `Effect`. Unlike an `Effect` that always produces a single result, a `Stream` can emit zero or more values of type `A`, making it a versatile tool for various tasks. Explore scenarios such as empty streams, single-element streams, finite streams, and infinite streams. Learn how to use `Stream` to handle a wide range of tasks, from processing finite lists to dealing with infinite sequences.

In this guide, we'll explore the concept of a `Stream<A, E, R>`. A `Stream` is a program description that, when executed, can emit zero or more values of type `A`, handle errors of type `E`, and operates within a context of type `R`.

## Use Cases

Streams are particularly handy whenever you're dealing with sequences of values over time. They can serve as replacements for observables, node streams, and AsyncIterables.

## What is a Stream?

Think of a `Stream` as an extension of an `Effect`. While an `Effect<A, E, R>` represents a program that requires a context of type `R`, may encounter an error of type `E`, and always produces a single result of type `A`, a `Stream<A, E, R>` takes this further by allowing the emission of zero or more values of type `A`.

To clarify, let's examine some examples using `Effect`:

```ts
import { Effect, Chunk, Option } from "effect"

// An Effect that fails with a string error
const failedEffect = Effect.fail("fail!")

// An Effect that produces a single number
const oneNumberValue = Effect.succeed(3)

// An Effect that produces a chunk of numbers
const oneListValue = Effect.succeed(Chunk.make(1, 2, 3))

// An Effect that produces an optional number
const oneOption = Effect.succeed(Option.some(1))
```

In each case, the `Effect` always ends with exactly one value. There is no variability; you always get one result.

## Understanding Streams

Now, let's shift our focus to `Stream`. A `Stream` represents a program description that shares similarities with `Effect`, requiring a context of type `R`, may signal errors of type `E`, and yields values of type `A`. However, the key distinction is that it can yield zero or more values.

Here are the possible scenarios for a `Stream`:

- **An Empty Stream**: It can end up empty, representing a stream with no values.
- **A Single-Element Stream**: It can represent a stream with just one value.
- **A Finite Stream of Elements**: It can represent a stream with a finite number of values.
- **An Infinite Stream of Elements**: It can represent a stream that continues indefinitely.

Let's see these scenarios in action:

```ts
import { Stream } from "effect"

// An empty Stream
const emptyStream = Stream.empty

// A Stream with a single number
const oneNumberValueStream = Stream.succeed(3)

// A Stream with a range of numbers from 1 to 10
const finiteNumberStream = Stream.range(1, 10)

// An infinite Stream of numbers starting from 1 and incrementing
const infiniteNumberStream = Stream.iterate(1, (n) => n + 1)
```

In summary, a `Stream` is a versatile tool for representing programs that may yield multiple values, making it suitable for a wide range of tasks, from processing finite lists to handling infinite sequences.

---
title: Creating Streams
excerpt: Explore diverse methods for crafting `Stream`s in Effect, tailored to your specific needs. Learn about common constructors like `make`, `empty`, `unit`, `range`, `iterate`, and `scoped`. Discover how to generate streams from success and failure using `succeed` and `fail` functions, and construct streams from chunks, effects, asynchronous callbacks, iterables, repetitions, unfolding, pagination, queues, pub/sub, and schedules. Dive into practical examples and gain insights into the nuances of each method, enabling you to harness the full power of Effect's streaming capabilities.
---

In this section, we'll explore various methods for creating Effect `Stream`s. These methods will help you generate streams tailored to your needs.

## Common Constructors

### make

Create a pure stream using `Stream.make` with a variable list of values.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }
```

### empty

Use `Stream.empty` to create a stream that doesn't produce any values.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.empty

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [] }
```

### void

Use `Stream.void` for a stream that contains a single `void` value.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.void

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ undefined ] }
```

### range

Create a stream of integers within a specified range `[min, max]` using `Stream.range`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }
```

### iterate

Generate a stream by applying a function iteratively to an initial value with `Stream.iterate`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.iterate(1, (n) => n + 1)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }
```

### scoped

Create a single-valued stream from a scoped resource using `Stream.scoped`.

```ts
import { Stream, Effect, Console } from "effect"

const stream = Stream.scoped(
  Effect.acquireUseRelease(
    Console.log("acquire"),
    () => Console.log("use"),
    () => Console.log("release")
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
acquire
use
release
{ _id: 'Chunk', values: [ undefined ] }
*/
```

## From Success and Failure

Generate a `Stream` using the `fail` and `succeed` functions:

```ts
import { Stream, Effect } from "effect"

const streamWithError: Stream.Stream<never, string> = Stream.fail("Uh oh!")

Effect.runPromise(Stream.runCollect(streamWithError))
// throws Error: Uh oh!

const streamWithNumber: Stream.Stream<number> = Stream.succeed(5)

Effect.runPromise(Stream.runCollect(streamWithNumber)).then(console.log)
// { _id: 'Chunk', values: [ 5 ] }
```

## From Chunks

Construct a stream from a `Chunk`:

```ts
import { Stream, Chunk, Effect } from "effect"

const stream = Stream.fromChunk(Chunk.make(1, 2, 3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }
```

Create a stream from multiple `Chunk`s:

```ts
import { Stream, Chunk, Effect } from "effect"

const stream = Stream.fromChunks(Chunk.make(1, 2, 3), Chunk.make(4, 5, 6))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5, 6 ] }
```

## From Effect

Generate a stream from an Effect workflow using `Stream.fromEffect`.

```ts
import { Stream, Random, Effect } from "effect"

const stream = Stream.fromEffect(Random.nextInt)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// Example Output: { _id: 'Chunk', values: [ 1042302242 ] }
```

## From Asynchronous Callback

Capture results emitted by asynchronous callbacks as a stream using `Stream.async`.

```ts
import { Stream, Effect, Chunk, Option, StreamEmit } from "effect"

const events = [1, 2, 3, 4]

const stream = Stream.async(
  (emit: StreamEmit.Emit<never, never, number, void>) => {
    events.forEach((n) => {
      setTimeout(() => {
        if (n === 3) {
          emit(Effect.fail(Option.none())) // Terminate the stream
        } else {
          emit(Effect.succeed(Chunk.of(n))) // Add the current item to the stream
        }
      }, 100 * n)
    })
  }
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2 ] }
```

## From Iterables

### fromIterable

Create a pure stream from an `Iterable` using `Stream.fromIterable`.

```ts
import { Stream, Effect } from "effect"

const numbers = [1, 2, 3]

const stream = Stream.fromIterable(numbers)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3 ] }
```

### fromIterableEffect

Generate a stream from an effect that produces an `Iterable` using `Stream.fromIterableEffect`.

```ts
import { Stream, Effect, Context } from "effect"

class Database extends Context.Tag("Database")<
  Database,
  { readonly getUsers: Effect.Effect<Array<string>> }
>() {}

const getUsers = Database.pipe(Effect.andThen((_) => _.getUsers))

const stream = Stream.fromIterableEffect(getUsers)

Effect.runPromise(
  Stream.runCollect(
    stream.pipe(
      Stream.provideService(Database, {
        getUsers: Effect.succeed(["user1", "user2"])
      })
    )
  )
).then(console.log)
// { _id: 'Chunk', values: [ 'user1', 'user2' ] }
```

### fromAsyncIterable

Convert async iterables into a stream using `Stream.fromAsyncIterable`.

```ts
import { Stream, Effect } from "effect"

const myAsyncIterable = async function* () {
  yield 1
  yield 2
}

const stream = Stream.fromAsyncIterable(
  myAsyncIterable(),
  (e) => new Error(String(e)) // Error Handling
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 1, 2 ] }
```

## From Repetition

### Repeating a Single Value

Create a stream that endlessly repeats a specific value using `Stream.repeatValue`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.repeatValue(0)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 0, 0, 0, 0, 0 ] }
```

### Repeating a Stream's Content

Use `Stream.repeat` to create a stream that repeats a specified stream's content.

```ts
import { Stream, Effect, Schedule } from "effect"

const stream = Stream.repeat(Stream.succeed(1), Schedule.forever)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 1, 1, 1, 1, 1 ] }
```

### Repeating an Effect's Result

Generate a stream of random numbers by repeating an effect.

```ts
import { Stream, Effect, Random } from "effect"

const stream = Stream.repeatEffect(Random.nextInt)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// Example Output: { _id: 'Chunk', values: [ 1666935266, 604851965, 2194299958, 3393707011, 4090317618 ] }
```

### Repeating an Effect with Termination

Evaluate a given effect repeatedly and terminate based on specific conditions.

```ts
import { Stream, Effect, Option } from "effect"

const drainIterator = <A>(it: Iterator<A>): Stream.Stream<A> =>
  Stream.repeatEffectOption(
    Effect.sync(() => it.next()).pipe(
      Effect.andThen((res) => {
        if (res.done) {
          return Effect.fail(Option.none())
        }
        return Effect.succeed(res.value)
      })
    )
  )
```

### Generating Ticks

Create a stream that emits `void` values at specified intervals using `Stream.tick`.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.tick("100 millis")

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ undefined, undefined, undefined, undefined, undefined ] }
```

## From Unfolding/Pagination

### Unfold

Use `Stream.unfold` to generate a recursive data structure from an initial value.

```ts
import { Stream, Effect, Option } from "effect"

const stream = Stream.unfold(1, (n) => Option.some([n, n + 1]))

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// { _id: 'Chunk', values: [ 1, 2, 3, 4, 5 ] }
```

### unfoldEffect

Perform effectful state transformations during unfolding with `Stream.unfoldEffect`.

```ts
import { Stream, Effect, Option, Random } from "effect"

const stream = Stream.unfoldEffect(1, (n) =>
  Random.nextBoolean.pipe(
    Effect.map((b) => (b ? Option.some([n, -n]) : Option.some([n, n])))
  )
)

Effect.runPromise(Stream.runCollect(stream.pipe(Stream.take(5)))).then(console.log)
// Example Output: { _id: 'Chunk', values: [ 1, 1, 1, 1, -1 ] }
```

### Pagination

Use `Stream.paginate` to emit values one step further.

```ts
import { Stream, Effect, Option } from "effect"

const stream = Stream.paginate(0, (n) => [
  n,
  n < 3 ? Option.some(n + 1) : Option.none()
])

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 0, 1, 2, 3 ] }
```

## From Queue and PubSub

Transform Queue and PubSub into `Stream`s using `Stream.fromQueue` and `Stream.fromPubSub`.

## From Schedule

Create a stream from a Schedule that emits an element for each value output from the schedule.

```ts
import { Effect, Stream, Schedule } from "effect"

const schedule = Schedule.spaced("1 second").pipe(
  Schedule.compose(Schedule.recurs(10))
)

const stream = Stream.fromSchedule(schedule)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
// { _id: 'Chunk', values: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] }
```

---
title: Resourceful Streams
excerpt: Discover how to manage resources effectively in Effect's `Stream` module. Explore constructors tailored for lifting scoped resources, ensuring safe acquisition and release within streams. Dive into examples illustrating the use of `Stream.acquireRelease` for file operations, finalization for cleanup tasks, and `ensuring` for post-finalization actions. Master the art of resource management in streaming applications with Effect.
---

In the Stream module, most constructors offer a special variant for lifting a scoped resource into a `Stream`. These constructors create streams that are safe regarding resource management, handling resource acquisition before stream creation and ensuring proper closure after usage.

Stream provides `Stream.acquireRelease` and `Stream.finalizer` constructors similar to `Effect.acquireRelease` and `Effect.addFinalizer`, allowing for cleanup or finalization tasks before the stream concludes.

## Acquire Release

Example demonstrating `Stream.acquireRelease` for file operations:

```ts
import { Stream, Console, Effect } from "effect"

const open = (filename: string) =>
  Effect.gen(function* () {
    yield* Console.log(`Opening ${filename}`)
    return {
      getLines: Effect.succeed(["Line 1", "Line 2", "Line 3"]),
      close: Console.log(`Closing ${filename}`)
    }
  })

const stream = Stream.acquireRelease(
  open("file.txt"),
  (file) => file.close
).pipe(Stream.flatMap((file) => file.getLines))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

In this code, the `open` function simulates file operations. `Stream.acquireRelease` ensures the file is opened and closed correctly while processing the lines.

## Finalization

Finalization allows executing a specific action before a stream ends, useful for cleanup tasks. Example using `Stream.finalizer` to clean up a temporary directory:

```ts
import { Stream, Console, Effect } from "effect"

const application = Stream.fromEffect(Console.log("Application Logic."))

const deleteDir = (dir: string) => Console.log(`Deleting dir: ${dir}`)

const program = application.pipe(
  Stream.concat(
    Stream.finalizer(
      deleteDir("tmp").pipe(
        Effect.andThen(Console.log("Temporary directory was deleted."))
      )
    )
  )
)

Effect.runPromise(Stream.runCollect(program)).then(console.log)
```

This example shows the application logic and uses `Stream.finalizer` to delete a temporary directory and log a message upon completion.

## Ensuring

`Stream.ensuring` allows performing actions after the finalization of a stream. Example:

```ts
import { Stream, Console, Effect } from "effect"

const program = Stream.fromEffect(Console.log("Application Logic.")).pipe(
  Stream.concat(Stream.finalizer(Console.log("Finalizing the stream"))),
  Stream.ensuring(
    Console.log("Doing some other works after stream's finalization")
  )
)

Effect.runPromise(Stream.runCollect(program)).then(console.log)
```

In this code, the application logic is followed by a finalization step and additional tasks using `Stream.ensuring`, ensuring post-finalization actions are executed.

# Operations

In this section, explore essential stream operations, including tapping, taking elements, exploring streams as an alternative to async iterables, mapping, filtering, scanning, draining, detecting changes, zipping, grouping, concatenation, merging, interleaving, interspersing, broadcasting, buffering, and debouncing.

## Tapping

Tapping is an operation that involves running an effect on each emission of the stream. It allows you to observe each element, perform some effectful operation, and discard the result of this observation. The `Stream.tap` operation does not alter the elements of the stream.

Example:
```ts
import { Stream, Console, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.tap((n) => Console.log(`before mapping: ${n}`)),
  Stream.map((n) => n * 2),
  Stream.tap((n) => Console.log(`after mapping: ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Taking Elements

Taking elements allows you to extract a specific number of elements from a stream.

- `take`: Extract a fixed number of elements.
- `takeWhile`: Extract elements until a condition is met.
- `takeUntil`: Extract elements until a specific condition is met.
- `takeRight`: Extract a specified number of elements from the end.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.iterate(0, (n) => n + 1)

const s1 = Stream.take(stream, 5)
Effect.runPromise(Stream.runCollect(s1)).then(console.log)

const s2 = Stream.takeWhile(stream, (n) => n < 5)
Effect.runPromise(Stream.runCollect(s2)).then(console.log)

const s3 = Stream.takeUntil(stream, (n) => n === 5)
Effect.runPromise(Stream.runCollect(s3)).then(console.log)

const s4 = Stream.takeRight(s3, 3)
Effect.runPromise(Stream.runCollect(s4)).then(console.log)
```

## Exploring Streams as an Alternative to Async Iterables

Streams can replicate the behavior of async iterables. 

1. **Stream.takeUntil**: Take elements until a condition is true.
2. **Stream.toPull**: Returns an effect that repeatedly pulls data chunks from the stream.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromIterable([1, 2, 3, 4, 5]).pipe(Stream.rechunk(2))

const program = Effect.gen(function* () {
  const getChunk = yield* Stream.toPull(stream)

  while (true) {
    const chunk = yield* getChunk
    console.log(chunk)
  }
})

Effect.runPromise(Effect.scoped(program)).then(console.log, console.error)
```

## Mapping

Transform elements within a stream using the `Stream.map` family of operations.

### Basic Mapping
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(Stream.map((n) => n + 1))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Effectful Mapping
```ts
import { Stream, Random, Effect } from "effect"

const stream = Stream.make(10, 20, 30).pipe(
  Stream.mapEffect((n) => Random.nextIntBetween(0, n))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Stateful Mapping
```ts
import { Stream, Effect } from "effect"

const runningTotal = (stream: Stream.Stream<number>): Stream.Stream<number> =>
  stream.pipe(Stream.mapAccum(0, (s, a) => [s + a, s + a]))

Effect.runPromise(Stream.runCollect(runningTotal(Stream.range(0, 5)))).then(console.log)
```

### Mapping and Flattening
```ts
import { Stream, Effect } from "effect"

const numbers = Stream.make("1-2-3", "4-5", "6").pipe(
  Stream.mapConcat((s) => s.split("-")),
  Stream.map((s) => parseInt(s))
)

Effect.runPromise(Stream.runCollect(numbers)).then(console.log)
```

### Mapping to a Constant Value
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5).pipe(Stream.as(null))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Filtering

The `Stream.filter` operation lets through elements that meet a specified condition.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 11).pipe(Stream.filter((n) => n % 2 === 0))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Scanning

Scans emit every intermediate result as part of the stream.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(1, 5).pipe(Stream.scan(0, (a, b) => a + b))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Draining

The `Stream.drain` function executes effects and discards the results.

Example:
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.range(1, 5).pipe(Stream.drain)

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
```

## Detecting Changes in a Stream

The `Stream.changes` operation detects and emits elements that differ from their preceding elements.

Example:
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 1, 1, 2, 2, 3, 4).pipe(Stream.changes)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Zipping

Zipping combines two or more streams to create a new stream by pairing elements.

Example:
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.zip(
  Stream.make(1, 2, 3, 4, 5, 6),
  Stream.make("a", "b", "c")
)

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
```

### Handling Stream Endings
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.zipAll(Stream.make(1, 2, 3, 4, 5, 6), {
  other: Stream.make("a", "b", "c"),
  defaultSelf: 0,
  defaultOther: "x"
})

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
```

### Zipping Streams at Different Rates
```ts
import { Stream, Schedule, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.schedule(Schedule.spaced("1 second"))
)

const s2 = Stream.make("a", "b", "c", "d").pipe(
  Stream.schedule(Schedule.spaced("500 millis"))
)

const stream = Stream.zipLatest(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Pairing with Previous and Next Elements
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4)

const s1 = Stream.zipWithPrevious(stream)
const s2 = Stream.zipWithNext(stream)
const s3 = Stream.zipWithPreviousAndNext(stream)

Effect.runPromise(Stream.runCollect(s1)).then(console.log)
Effect.runPromise(Stream.runCollect(s2)).then(console.log)
Effect.runPromise(Stream.runCollect(s3)).then(console.log)
```

### Indexing Stream Elements
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make("Mary", "James", "Robert", "Patricia")

const indexedStream = Stream.zipWithIndex(stream)

Effect.runPromise(Stream.runCollect(indexedStream)).then(console.log)
```

## Cartesian Product of Streams

The `Stream.cross` operator computes the Cartesian Product of two streams.

Example:
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make("a", "b")

const product = Stream.cross(s1, s2)

Effect.runPromise(Stream.runCollect(product)).then(console.log)
```

## Partitioning

Partitioning a stream divides it into two separate streams based on a specified condition.

### partition
```ts
import { Stream, Effect } from "effect"

const partition = Stream.range(1, 9).pipe(
  Stream.partition((n) => n % 2 === 0, { bufferSize: 5 })
)

Effect.runPromise(
  Effect.scoped(
    Effect.gen(function* () {
      const [evens, odds] = yield* partition
      console.log(yield* Stream.runCollect(evens))
      console.log(yield* Stream.runCollect(odds))
    })
  )
)
```

### partitionEither
```ts
import { Stream, Effect, Either } from "effect"

const partition = Stream.range(1, 9).pipe(
  Stream.partitionEither(
    (n) => Effect.succeed(n % 2 === 0 ? Either.left(n) : Either.right(n)),
    { bufferSize: 5 }
  )
)

Effect.runPromise(
  Effect.scoped(
    Effect.gen(function* () {
      const [evens, odds] = yield* partition
      console.log(yield* Stream.runCollect(evens))
      console.log(yield* Stream.runCollect(odds))
    })
  )
)
```

## GroupBy

The `Stream.groupByKey` function allows you to partition a stream by a function.

### groupByKey
```ts
import { Stream, GroupBy, Effect, Chunk } from "effect"

class Exam {
  constructor(readonly person: string, readonly score: number) {}
}

const examResults = [
  new Exam("Alex", 64),
  new Exam("Michael", 97),
  new Exam("Bill", 77),
  new Exam("John", 78),
  new Exam("Bobby", 71)
]

const groupByKeyResult = Stream.fromIterable(examResults).pipe(
  Stream.groupByKey((exam) => Math.floor(exam.score / 10) * 10)
)

const stream = GroupBy.evaluate(groupByKeyResult, (key, stream) =>
  Stream.fromEffect(
    Stream.runCollect(stream).pipe(
      Effect.andThen((chunk) => [key, Chunk.size(chunk)] as const)
    )
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### groupBy
```ts
import { Stream, GroupBy, Effect, Chunk } from "effect"

const groupByKeyResult = Stream.fromIterable([
  "Mary",
  "James",
  "Robert",
  "Patricia",
  "John",
  "Jennifer",
  "Rebecca",
  "Peter"
]).pipe(
  Stream.groupBy((name) => Effect.succeed([name.substring(0, 1), name]))
)

const stream = GroupBy.evaluate(groupByKeyResult, (key, stream) =>
  Stream.fromEffect(
    Stream.runCollect(stream).pipe(
      Effect.andThen((chunk) => [key, Chunk.size(chunk)] as const)
    )
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Grouping

### grouped
```ts
import { Stream, Effect } from "effect"

const stream = Stream.range(0, 8).pipe(Stream.grouped(3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### groupedWithin
```ts
import { Stream, Schedule, Effect, Chunk } from "effect"

const stream = Stream.range(0, 9).pipe(
  Stream.repeat(Schedule.spaced("1 second")),
  Stream.groupedWithin(18, "1.5 seconds"),
  Stream.take(3)
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Concatenation

### Simple Concatenation
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make(4, 5)

const stream = Stream.concat(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Concatenating Multiple Streams
```ts
import { Stream, Effect, Chunk } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make(4, 5)
const s3 = Stream.make(6, 7, 8)

const stream = Stream.concatAll(Chunk.make(s1, s2, s3))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Advanced Concatenation with flatMap
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.flatMap((a) => Stream.repeatValue(a).pipe(Stream.take(4)))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Merging

### merge
```ts
import { Schedule, Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.make(4, 5, 6).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

const stream = Stream.merge(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Termination Strategy
```ts
import { Stream, Schedule, Effect } from "effect"

const s1 = Stream.range(1, 5).pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.repeatValue(0).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

const stream = Stream.merge(s1, s2, { haltStrategy: "left" })

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### mergeWith
```ts
import { Schedule, Stream, Effect } from "effect"

const s1 = Stream.make("1", "2", "3").pipe(
  Stream.schedule(Schedule.spaced("100 millis"))
)
const s2 = Stream.make(4.1, 5.3, 6.2).pipe(
  Stream.schedule(Schedule.spaced("200 millis"))
)

const stream = Stream.mergeWith(s1, s2, {
  onSelf: (s) => parseInt(s),
  onOther: (n) => Math.floor(n)
})

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Interleaving

### interleave
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3)
const s2 = Stream.make(4, 5, 6)

const stream = Stream.interleave(s1, s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### interleaveWith
```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 3, 5, 7, 9)
const s2 = Stream.make(2, 4, 6, 8, 10)

const booleanStream = Stream.make(true, false, false).pipe(Stream.forever)

const stream = Stream.interleaveWith(s1, s2, booleanStream)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Interspersing

### intersperse
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5).pipe(Stream.intersperse(0))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### intersperseAffixes
```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.intersperseAffixes({
    start: "[",
    middle: "-",
    end: "]"
  })
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Broadcasting

Broadcasting creates multiple streams that contain the same elements as the source stream.

Example:
```ts
import { Effect, Stream, Console, Schedule, Fiber } from "effect"

const numbers = Effect.scoped(
  Stream.range(1, 20).pipe(
    Stream.tap((n) => Console.log(`Emit ${n} element before broadcasting`)),
    Stream.broadcast(2, 5),
    Stream.flatMap(([first, second]) =>
      Effect.gen(function* () {
        const fiber1 = yield* Stream.runFold(first, 0, (acc, e) =>
          Math.max(acc, e)
        ).pipe(
          Effect.andThen((max) => Console.log(`Maximum: ${max}`)),
          Effect.fork
        )
        const fiber2 = yield* second.pipe(
          Stream.schedule(Schedule.spaced("1 second")),
          Stream.runForEach((n) =>
            Console.log(`Logging to the Console: ${n}`)
          ),
          Effect.fork
        )
        yield* Fiber.join(fiber1).pipe(
          Effect.zip(Fiber.join(fiber2), { concurrent: true })
        )
      })
    ),
    Stream.runCollect
  )
)

Effect.runPromise(numbers).then(console.log)
```

## Buffering

The `Stream.buffer` operator facilitates scenarios where a faster producer needs to work independently of a slower consumer.

Example:
```ts
import { Stream, Console, Schedule, Effect } from "effect"

const stream = Stream.range(1, 10).pipe(
  Stream.tap((n) => Console.log(`before buffering: ${n}`)),
  Stream.buffer({ capacity: 4 }),
  Stream.tap((n) => Console.log(`after buffering: ${n}`)),
  Stream.schedule(Schedule.spaced("5 seconds"))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Debouncing

Debouncing ensures that a function doesn't fire too frequently, waiting for a specified duration to pass without new values before emitting the latest value.

Example:
```ts
import { Stream, Effect } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(
    Stream.fromEffect(Effect.sleep("200 millis").pipe(Effect.as(4)))
  ),
  Stream.concat(Stream.make(5, 6)),
  Stream.concat(
    Stream.fromEffect(Effect.sleep("150 millis").pipe(Effect.as(7)))
  ),
  Stream.concat(Stream.make(8)),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.debounce("100 millis"),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

## Throttling

Throttling regulates the rate at which elements are emitted from a stream.

### Shape Strategy (Default)
```ts
import { Stream, Effect, Schedule, Chunk } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.fromSchedule(Schedule.spaced("50 millis")).pipe(
  Stream.take(6),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.throttle({
    cost: Chunk.size,
    duration: "100 millis",
    units: 1
  }),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### Enforce Strategy
```ts
import { Stream, Effect, Schedule, Chunk } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.make(1, 2, 3, 4, 5, 6).pipe(
  Stream.schedule(Schedule.exponential("100 millis")),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.throttle({
    cost: Chunk.size,
    duration: "1 second",
    units: 1,
    strategy: "enforce"
  }),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

### burst option
```ts
import { Effect, Schedule, Stream, Chunk } from "effect"

let last = Date.now()
const log = (message: string) =>
  Effect.sync(() => {
    const end = Date.now()
    console.log(`${message} after ${end - last}ms`)
    last = end
  })

const stream = Stream.fromSchedule(Schedule.spaced("10 millis")).pipe(
  Stream.take(20),
  Stream.tap((n) => log(`Received ${n}`)),
  Stream.throttle({
    cost: Chunk.size,
    duration: "200 millis",
    units: 5,
    strategy: "enforce",
    burst: 2
  }),
  Stream.tap((n) => log(`> Emitted ${n}`))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

---
title: Consuming Streams
excerpt: Consume streams effectively using methods like `runCollect` to gather elements into a single `Chunk`, `runForEach` to process elements with a callback, `fold` for performing operations, and `Sink` for specialized consumption. Learn key techniques for working with streams in your applications.
---

When working with streams, it's essential to understand how to consume the data they produce. This guide covers several common methods for consuming streams.

## Using runCollect

To gather all the elements from a stream into a single `Chunk`, use the `Stream.runCollect` function.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5)

const collectedData = Stream.runCollect(stream)

Effect.runPromise(collectedData).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4, 5 ]
}
*/
```

## Using runForEach

Use `Stream.runForEach` to consume elements of a stream with a callback function that receives each element.

```ts
import { Stream, Effect, Console } from "effect"

const effect = Stream.make(1, 2, 3).pipe(
  Stream.runForEach((n) => Console.log(n))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
1
2
3
undefined
*/
```

## Using a Fold Operation

The `Stream.fold` function allows you to consume a stream by performing a fold operation over the stream of values and returning an effect containing the result.

```ts
import { Stream, Effect } from "effect"

const e1 = Stream.make(1, 2, 3, 4, 5).pipe(Stream.runFold(0, (a, b) => a + b))

Effect.runPromise(e1).then(console.log) // Output: 15

const e2 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.runFoldWhile(
    0,
    (n) => n <= 3,
    (a, b) => a + b
  )
)

Effect.runPromise(e2).then(console.log) // Output: 6
```

## Using a Sink

To consume a stream using a Sink, pass the `Sink` to the `Stream.run` function.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3).pipe(Stream.run(Sink.sum))

Effect.runPromise(effect).then(console.log) // Output: 6
```

---
title: Error Handling in Streams
navTitle: Error Handling
excerpt: Effectively handle errors in streams using functions like `orElse` for seamless recovery, `catchAll` for advanced error handling, and `retry` to handle temporary failures. Learn to refine errors, set timeouts with various operators, and gracefully recover from defects, ensuring robust stream processing in your applications.
bottomNavigation: pagination
---

## Recovering from Failure

When working with streams that may encounter errors, it's crucial to handle these errors gracefully. The `Stream.orElse` function is a powerful tool for recovering from failures and switching to an alternative stream in case of an error.

Example:

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.orElse(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

The `Stream.orElseEither` variant uses the Either data type to distinguish elements from the two streams based on success or failure:

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.orElseEither(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [
    {
      _id: "Either",
      _tag: "Left",
      left: 1
    }, {
      _id: "Either",
      _tag: "Left",
      left: 2
    }, {
      _id: "Either",
      _tag: "Left",
      left: 3
    }, {
      _id: "Either",
      _tag: "Right",
      right: "a"
    }, {
      _id: "Either",
      _tag: "Right",
      right: "b"
    }, {
      _id: "Either",
      _tag: "Right",
      right: "c"
    }
  ]
}
*/
```

The `Stream.catchAll` function provides advanced error handling capabilities compared to `Stream.orElse`. With `Stream.catchAll`, you can make decisions based on both the type and value of the encountered failure.

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Uh Oh!" as const)),
  Stream.concat(Stream.make(4, 5)),
  Stream.concat(Stream.fail("Ouch" as const))
)

const s2 = Stream.make("a", "b", "c")

const s3 = Stream.make(true, false, false)

const stream = Stream.catchAll(
  s1,
  (error): Stream.Stream<string | boolean> => {
    switch (error) {
      case "Uh Oh!":
        return s2
      case "Ouch":
        return s3
    }
  }
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

## Recovering from Defects

To handle defects during stream processing, use the `Stream.catchAllCause` function. It enables graceful recovery from any type of failure.

Example:

```ts
import { Stream, Effect } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.dieMessage("Boom!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.catchAllCause(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

## Recovery from Some Errors

Use `Stream.catchSome` and `Stream.catchSomeCause` to recover from specific types of failures.

Example with `Stream.catchSome`:

```ts
import { Stream, Effect, Option } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.fail("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.catchSome(s1, (error) => {
  if (error === "Oh! Error!") {
    return Option.some(s2)
  }
  return Option.none()
})

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

Example with `Stream.catchSomeCause`:

```ts
import { Stream, Effect, Option, Cause } from "effect"

const s1 = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.dieMessage("Oh! Error!")),
  Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.catchSomeCause(s1, (cause) => {
  if (Cause.isDie(cause)) {
    return Option.some(s2)
  }
  return Option.none()
})

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
```

## Recovering to Effect

Use `Stream.onError` to handle errors gracefully and perform cleanup tasks when needed.

```ts
import { Stream, Console, Effect } from "effect"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(Stream.dieMessage("Oh! Boom!")),
  Stream.concat(Stream.make(4, 5)),
  Stream.onError(() =>
    Console.log(
      "Stream application closed! We are doing some cleanup jobs."
    ).pipe(Effect.orDie)
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
Stream application closed! We are doing some cleanup jobs.
error: RuntimeException: Oh! Boom!
*/
```

## Retry a Failing Stream

Use the `Stream.retry` operator to handle temporary or recoverable failures.

Example:

```ts
import { Stream, Effect, Schedule } from "effect"
import * as NodeReadLine from "node:readline"

const stream = Stream.make(1, 2, 3).pipe(
  Stream.concat(
    Stream.fromEffect(
      Effect.gen(function* () {
        const s = yield* readLine("Enter a number: ")
        const n = parseInt(s)
        if (Number.isNaN(n)) {
          return yield* Effect.fail("NaN")
        }
        return n
      })
    ).pipe(Stream.retry(Schedule.exponential("1 second")))
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
Enter a number: a
Enter a number: b
Enter a number: c
Enter a number: 4
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4 ]
}
*/

const readLine = (message: string): Effect.Effect<string> =>
  Effect.promise(
    () =>
      new Promise((resolve) => {
        const rl = NodeReadLine.createInterface({
          input: process.stdin,
          output: process.stdout
        })
        rl.question(message, (answer) => {
          rl.close()
          resolve(answer)
        })
      })
  )
```

## Refining Errors

Use `Stream.refineOrDie` to selectively keep certain errors and terminate the stream with the remaining errors.

Example:

```ts
import { Stream, Option } from "effect"

const stream = Stream.fail(new Error())

const res = Stream.refineOrDie(stream, (error) => {
  if (error instanceof SyntaxError) {
    return Option.some(error)
  }
  return Option.none()
})
```

## Timing Out

Manage timeouts using various operators.

### timeout

The `Stream.timeout` operator sets a timeout on a stream. If the stream does not produce a value within the specified duration, it terminates.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeout("2 seconds")
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
{
  _id: "Chunk",
  values: []
}
*/
```

### timeoutFail

The `Stream.timeoutFail` operator combines a timeout with a custom failure message.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeoutFail(() => "timeout", "2 seconds")
)

Effect.runPromiseExit(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'timeout' }
}
*/
```

### timeoutFailCause

Similar to `Stream.timeoutFail`, `Stream.timeoutFailCause` combines a timeout with a custom failure cause.

```ts
import { Stream, Effect, Cause } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeoutFailCause(() => Cause.die("timeout"), "2 seconds")
)

Effect.runPromiseExit(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Die', defect: 'timeout' }
}
*/
```

### timeoutTo

The `Stream.timeoutTo` operator allows you to switch to another stream if the first stream does not produce a value within the specified duration.

```ts
import { Stream, Effect } from "effect"

const stream = Stream.fromEffect(Effect.never).pipe(
  Stream.timeoutTo("2 seconds", Stream.make(1, 2, 3))
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
{
  _id: "Chunk",
  values: [ 1, 2, 3 ]
}
*/
```

# Scheduling Streams

## schedule

When working with streams, you might need to introduce specific time intervals between each emission of stream elements. This can be achieved using the `Stream.schedule` combinator.

```ts
import { Stream, Schedule, Console, Effect } from "effect"

const stream = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.schedule(Schedule.spaced("1 second")),
  Stream.tap(Console.log)
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
1
2
3
4
5
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4, 5 ]
}
*/
```

In this example, we've used the `Schedule.spaced("1 second")` schedule to introduce a one-second gap between each emission in the stream.

# Streams

## Overview
Streams are a powerful abstraction for handling sequences of data. They allow for processing data in a continuous flow, making it easier to work with large datasets or real-time data.

## Key Concepts

- **Stream Creation**: Streams can be created from various sources, including arrays, files, and network connections.
- **Stream Operations**: Common operations include mapping, filtering, and reducing data as it flows through the stream.
- **Backpressure**: Mechanism to handle situations where the data producer is faster than the consumer.

## Types of Streams

1. **Readable Streams**: Allow data to be read from a source.
2. **Writable Streams**: Allow data to be written to a destination.
3. **Duplex Streams**: Support both reading and writing.
4. **Transform Streams**: Modify data as it is read or written.

## Use Cases

- Real-time data processing
- File manipulation
- Network communication

## Best Practices

- Use streams for large data sets to minimize memory usage.
- Handle errors gracefully to avoid crashes.
- Implement backpressure to maintain performance.

## Conclusion
Streams provide an efficient way to handle data in motion, enabling developers to build responsive and scalable applications.

# Introduction to Sinks

Explore the role of `Sink<A, In, L, E, R>` in stream processing. Learn how a `Sink` consumes elements, handles errors, produces values, and manages leftover elements. Use it seamlessly with `Stream.run` for efficient stream processing.

In the world of streams, a `Sink<A, In, L, E, R>` plays a crucial role. It's like a specialized function designed to consume elements generated by a `Stream`. Here's a breakdown of what a `Sink` does:

- It can consume a varying number of `In` elements, which might be zero, one, or more.
- It has the potential to encounter errors of type `E`.
- Ultimately, it produces a value of type `A`.
- Additionally, it can return a remainder of type `L`, which represents any leftover elements.

To use a `Sink` for processing a stream, you simply pass it to the `Stream.run` function:

```ts
import { Stream, Sink, Effect } from "effect"

const stream = Stream.make(1, 2, 3) // Define a stream with numbers 1, 2, and 3

const sink = Sink.sum // Choose a sink that sums up numbers

const sum = Stream.run(stream, sink) // Run the stream through the sink

Effect.runPromise(sum).then(console.log)
/*
Output:
6
*/
```

---
title: Creating Sinks
excerpt: Learn how to construct powerful sinks for processing stream elements. Explore common constructors like head, last, count, sum, take, drain, timed, forEach, and discover how to create sinks from success and failure. Dive into collecting strategies using collectAll, collectAllToSet, collectAllToMap, collectAllN, collectAllWhile, collectAllToSetN, collectAllToMapN, folding techniques with foldLeft, fold, foldWeighted, foldUntil, and more.
bottomNavigation: pagination
---

In the world of streams, sinks are used to consume and process the elements of a stream. Here, we will introduce some common sink constructors that allow you to create sinks for specific tasks.

## Common Constructors

### head

The head sink creates a sink that captures the first element of a stream. If the stream is empty, it returns None.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.head()))

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 1
}
*/
```

### last

The last sink consumes all elements of a stream and returns the last element of the stream.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.last()))

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 4
}
*/
```

### count

The count sink consumes all elements of the stream and counts the number of elements fed to it.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.count))

Effect.runPromise(effect).then(console.log)
/*
Output:
4
*/
```

### sum

The sum sink consumes all elements of the stream and sums incoming numeric values.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.sum))

Effect.runPromise(effect).then(console.log)
/*
Output:
10
*/
```

### take

The take sink takes the specified number of values from the stream and results in a Chunk data type.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.take(3)))

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3 ]
}
*/
```

### drain

The drain sink ignores its inputs, effectively discarding them.

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.drain))

Effect.runPromise(effect).then(console.log)
/*
Output:
undefined
*/
```

### timed

The timed sink executes the stream and measures its execution time, providing the duration.

```ts
import { Stream, Schedule, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(
  Stream.schedule(Schedule.spaced("100 millis")),
  Stream.run(Sink.timed)
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Duration",
  _tag: "Millis",
  millis: 523
}
*/
```

### forEach

The forEach sink executes the provided effectful function for every element fed to it.

```ts
import { Stream, Sink, Console, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(
  Stream.run(Sink.forEach(Console.log))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
1
2
3
4
undefined
*/
```

## From Success and Failure

In the realm of data streams, similar to crafting streams to hold and manipulate data, we can also create sinks using the Sink.fail and Sink.succeed functions.

### Succeeding Sink

A sink that doesn't consume any elements from its upstream but instead succeeds with a numeric value:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.succeed(0)))

Effect.runPromise(effect).then(console.log)
/*
Output:
0
*/
```

### Failing Sink

A sink that doesn't consume any elements from its upstream but deliberately fails, generating an error message of type string:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.fail("fail!")))

Effect.runPromiseExit(effect).then(console.log)
/*
Output:
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'fail!' }
}
*/
```

## Collecting

### Collecting All Elements

To gather all the elements from a data stream into a Chunk, you can employ the Sink.collectAll() function:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(Stream.run(Sink.collectAll()))

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3, 4 ]
}
*/
```

### Collecting into a HashSet

To accumulate the elements into a HashSet, use Sink.collectAllToSet(). This function ensures that each element appears only once in the resulting set:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 2, 3, 4, 4).pipe(
  Stream.run(Sink.collectAllToSet())
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "HashSet",
  values: [ 1, 2, 3, 4 ]
}
*/
```

### Collecting into a HashMap

For more advanced collection needs, use Sink.collectAllToMap(). This function allows you to accumulate and merge elements into a HashMap<K, A> using a specified merge function:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 3, 2, 3, 1, 5, 1).pipe(
  Stream.run(
    Sink.collectAllToMap(
      (n) => n % 3,
      (a, b) => a + b
    )
  )
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "HashMap",
  values: [
    [ 0, 6 ], [ 1, 3 ], [ 2, 7 ]
  ]
}
*/
```

### Collecting a Specified Number

To collect a specific number of elements from a stream into a Chunk, use Sink.collectAllN(n):

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(Sink.collectAllN(3))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, 3 ]
}
*/
```

### Collecting While Meeting a Condition

To accumulate elements as long as they satisfy a specific condition, use Sink.collectAllWhile(predicate):

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 0, 4, 0, 6, 7).pipe(
  Stream.run(Sink.collectAllWhile((n) => n !== 0))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2 ]
}
*/
```

### Collecting into HashSets of a Specific Size

For controlled collection into sets with a maximum size of n, utilize Sink.collectAllToSetN(n):

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 2, 3, 4, 4).pipe(
  Stream.run(Sink.collectAllToSetN(3))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "HashSet",
  values: [ 1, 2, 3 ]
}
*/
```

### Collecting into HashMaps with Limited Keys

To accumulate elements into maps with a maximum of n keys, employ Sink.collectAllToMapN(n, keyFunction, mergeFunction):

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 3, 2, 3, 1, 5, 1).pipe(
  Stream.run(
    Sink.collectAllToMapN(
      3,
      (n) => n,
      (a, b) => a + b
    )
  )
)

Effect.runPromise(effect).then(console.log)
/*
Output:
{
  _id: "HashMap",
  values: [
    [ 1, 2 ], [ 2, 2 ], [ 3, 6 ]
  ]
}
*/
```

## Folding

### Folding Left

To reduce a stream of numbers into a single value by applying an operation to each element sequentially, use the Sink.foldLeft function:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4).pipe(
  Stream.run(Sink.foldLeft(0, (a, b) => a + b))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
10
*/
```

### Folding with Termination

To fold elements in a stream but stop the folding process when a certain condition is met, use the Sink.fold function:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.iterate(0, (n) => n + 1).pipe(
  Stream.run(
    Sink.fold(
      0,
      (sum) => sum <= 10,
      (a, b) => a + b
    )
  )
)

Effect.runPromise(effect).then(console.log)
/*
Output:
15
*/
```

### Folding with Weighted Elements

To fold elements based on their weight or cost, use Sink.foldWeighted:

```ts
import { Stream, Sink, Chunk, Effect } from "effect"

const stream = Stream.make(3, 2, 4, 1, 5, 6, 2, 1, 3, 5, 6).pipe(
  Stream.transduce(
    Sink.foldWeighted({
      initial: Chunk.empty<number>(),
      maxCost: 3,
      cost: () => 1,
      body: (acc, el) => Chunk.append(acc, el)
    })
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [
    {
      _id: "Chunk",
      values: [ 3, 2, 4 ]
    }, {
      _id: "Chunk",
      values: [ 1, 5, 6 ]
    }, {
      _id: "Chunk",
      values: [ 2, 1, 3 ]
    }, {
      _id: "Chunk",
      values: [ 5, 6 ]
    }
  ]
}
*/
```

### Folding Until a Limit

To fold elements up to a specific limit, use Sink.foldUntil:

```ts
import { Stream, Sink, Effect } from "effect"

const effect = Stream.make(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  Stream.run(Sink.foldUntil(0, 3, (a, b) => a + b))
)

Effect.runPromise(effect).then(console.log)
/*
Output:
6
*/
```

# Sink Operations

Explore sink operations to transform or filter their behavior. Learn to adapt sinks for different input types using `Sink.mapInput`. Discover how `Sink.dimap` allows complete conversion between input and output types. Utilize `Sink.filterInput` to selectively process elements based on specific conditions.

## Changing the Input

`Sink.mapInput` modifies the input of a sink, allowing it to work with a different input type. For example, to adapt `Sink.sum` for a stream of strings:

```ts
import { Stream, Sink, Effect } from "effect"

const numericSum = Sink.sum

const stringSum = numericSum.pipe(
  Sink.mapInput((s: string) => Number.parseFloat(s))
)

Effect.runPromise(
  Stream.make("1", "2", "3", "4", "5").pipe(Stream.run(stringSum))
).then(console.log)
/*
Output:
15
*/
```

## Transforming Both Input and Output

`Sink.dimap` allows you to transform both the input and output of a sink. For instance, converting input strings to integers and outputting the result as a string:

```ts
import { Stream, Sink, Effect } from "effect"

const sumSink = Sink.sum.pipe(
  Sink.dimap({
    onInput: (s: string) => Number.parseFloat(s),
    onDone: (n) => String(n)
  })
)

Effect.runPromise(
  Stream.make("1", "2", "3", "4", "5").pipe(Stream.run(sumSink))
).then(console.log)
/*
Output:
15 <-- as string
*/
```

## Filtering Input

`Sink.filterInput` allows filtering of incoming elements based on specific conditions. For example, collecting elements in chunks of three while filtering out negative numbers:

```ts
import { Stream, Sink, Effect } from "effect"

const stream = Stream.make(1, -2, 0, 1, 3, -3, 4, 2, 0, 1, -3, 1, 1, 6).pipe(
  Stream.transduce(
    Sink.collectAllN<number>(3).pipe(Sink.filterInput((n) => n > 0))
  )
)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
  _id: "Chunk",
  values: [
    {
      _id: "Chunk",
      values: [ 1, 1, 3 ]
    }, {
      _id: "Chunk",
      values: [ 4, 2, 1 ]
    }, {
      _id: "Chunk",
      values: [ 1, 1, 6 ]
    }, {
      _id: "Chunk",
      values: []
    }
  ]
}
*/

# Parallel Operators

Explore parallel operations like `Sink.zip` for combining results and `Sink.race` for racing concurrent sinks. Learn how to run multiple sinks concurrently, combining or selecting the first to complete. Enhance task performance by executing operations simultaneously.

## Parallel Zipping: Combining Results

To run two sinks concurrently and combine their results, use `Sink.zip`. This operation runs both sinks concurrently and combines their outcomes into a tuple:

```ts
import { Sink, Console, Stream, Schedule, Effect } from "effect"

const s1 = Sink.forEach((s: string) => Console.log(`sink 1: ${s}`)).pipe(
  Sink.as(1)
)

const s2 = Sink.forEach((s: string) => Console.log(`sink 2: ${s}`)).pipe(
  Sink.as(2)
)

const sink = s1.pipe(Sink.zip(s2, { concurrent: true }))

Effect.runPromise(
  Stream.make("1", "2", "3", "4", "5").pipe(
    Stream.schedule(Schedule.spaced("10 millis")),
    Stream.run(sink)
  )
).then(console.log)
/*
Output:
sink 1: 1
sink 2: 1
sink 1: 2
sink 2: 2
sink 1: 3
sink 2: 3
sink 1: 4
sink 2: 4
sink 1: 5
sink 2: 5
[ 1, 2 ]
*/
```

## Racing: First One Wins

Use `Sink.race` to race multiple sinks concurrently. The sink that completes first will provide the result for your program:

```ts
import { Sink, Console, Stream, Schedule, Effect } from "effect"

const s1 = Sink.forEach((s: string) => Console.log(`sink 1: ${s}`)).pipe(
  Sink.as(1)
)

const s2 = Sink.forEach((s: string) => Console.log(`sink 2: ${s}`)).pipe(
  Sink.as(2)
)

const sink = s1.pipe(Sink.race(s2))

Effect.runPromise(
  Stream.make("1", "2", "3", "4", "5").pipe(
    Stream.schedule(Schedule.spaced("10 millis")),
    Stream.run(sink)
  )
).then(console.log)
/*
Output:
sink 1: 1
sink 2: 1
sink 1: 2
sink 2: 2
sink 1: 3
sink 2: 3
sink 1: 4
sink 2: 4
sink 1: 5
sink 2: 5
1
*/
```

# Leftovers

Explore handling unconsumed elements with sinks. Learn to collect or ignore leftovers using `Sink.collectLeftover` and `Sink.ignoreLeftover`. Efficiently manage and process remaining elements from upstream sources in data streams.

## Collecting Leftovers

When a sink consumes elements from an upstream source, it may not use all of them. These unconsumed elements are referred to as "leftovers." To collect these leftovers, we can use `Sink.collectLeftover`. It returns a tuple containing the result of the previous sink operation and any leftover elements:

```ts
import { Stream, Sink, Effect } from "effect"

const s1 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(Sink.take<number>(3).pipe(Sink.collectLeftover))
)

Effect.runPromise(s1).then(console.log)
/*
Output:
[
  {
    _id: "Chunk",
    values: [ 1, 2, 3 ]
  }, {
    _id: "Chunk",
    values: [ 4, 5 ]
  }
]
*/

const s2 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(Sink.head<number>().pipe(Sink.collectLeftover))
)

Effect.runPromise(s2).then(console.log)
/*
Output:
[
  {
    _id: "Option",
    _tag: "Some",
    value: 1
  }, {
    _id: "Chunk",
    values: [ 2, 3, 4, 5 ]
  }
]
*/
```

## Ignoring Leftovers

When leftover elements are not needed, they can be ignored using `Sink.ignoreLeftover`:

```ts
import { Stream, Sink, Effect } from "effect"

const s1 = Stream.make(1, 2, 3, 4, 5).pipe(
  Stream.run(
    Sink.take<number>(3).pipe(Sink.ignoreLeftover).pipe(Sink.collectLeftover)
  )
)

Effect.runPromise(s1).then(console.log)
/*
Output:
[
  {
    _id: "Chunk",
    values: [ 1, 2, 3 ]
  }, {
    _id: "Chunk",
    values: []
  }
]
*/
```

# Sinks

## Overview
Sinks are essential components in various applications, providing a means to collect, store, or dispose of fluids. They can be found in numerous contexts, including plumbing, industrial processes, and data management.

## Types of Sinks
1. **Plumbing Sinks**: Used in kitchens and bathrooms for washing and disposal.
2. **Industrial Sinks**: Designed for specific processes in manufacturing and laboratories.
3. **Data Sinks**: In computing, these refer to endpoints where data is sent or stored.

## Features
- **Material**: Common materials include stainless steel, ceramic, and plastic.
- **Design**: Varies based on application, including single or double basins.
- **Functionality**: May include features like drainage systems, faucets, and waste disposal units.

## Applications
- **Residential**: Used in homes for daily tasks.
- **Commercial**: Found in restaurants, hospitals, and offices.
- **Industrial**: Utilized in factories and laboratories for specific processes.

## Maintenance
Regular cleaning and inspection are necessary to ensure functionality and prevent clogs or leaks.

---
title: SubscriptionRef
excerpt: Explore the capabilities of `SubscriptionRef` in Effect, a specialized form of `SynchronizedRef`. Learn how it allows you to subscribe and receive updates on the current value and any changes made to that value. Understand the power of the `changes` stream, which facilitates observing the value and subsequent changes. Dive into practical examples demonstrating the use of `SubscriptionRef` in modeling shared state, especially in scenarios where multiple observers need to react to every change. Witness the seamless integration of `SubscriptionRef` with asynchronous tasks and discover how it enhances efficient state management in your programs.
---

A `SubscriptionRef<A>` is a specialized form of a SynchronizedRef. It allows us to subscribe and receive updates on the current value and any changes made to that value.

```ts
export interface SubscriptionRef<A> extends Synchronized.SynchronizedRef<A> {
  readonly changes: Stream<A>
}
```

You can perform all the usual operations on a `SubscriptionRef`, such as `get`, `set`, or `modify` to work with the current value.

The `changes` stream lets you observe the current value and all subsequent changes. Each time you run this stream, you'll get the current value and any changes that occurred afterward.

To create a `SubscriptionRef`, use the `make` constructor, specifying the initial value:

```ts
import { SubscriptionRef } from "effect"

const ref = SubscriptionRef.make(0)
```

A `SubscriptionRef` is invaluable when modeling shared state, especially when multiple observers need to react to every change. For example, in a functional reactive programming context, the `SubscriptionRef` value might represent a part of the application state, and each observer could update various user interface elements based on changes to that state.

Example of a "server" that updates a value observed by multiple "clients":

```ts
import { Ref, Effect } from "effect"

const server = (ref: Ref.Ref<number>) =>
  Ref.update(ref, (n) => n + 1).pipe(Effect.forever)
```

The `server` function operates on a regular `Ref` and updates a value.

```ts
import { Ref, Effect, Stream, Random } from "effect"

const client = (changes: Stream.Stream<number>) =>
  Effect.gen(function* () {
    const n = yield* Random.nextIntBetween(1, 10)
    const chunk = yield* Stream.runCollect(Stream.take(changes, n))
    return chunk
  })
```

The `client` function works with a `Stream` of values and does not concern itself with the source of these values.

To tie everything together, start the server, launch multiple client instances in parallel, and shut down the server when finished. Create the `SubscriptionRef` in this process.

```ts
import { Ref, Effect, Stream, Random, SubscriptionRef, Fiber } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SubscriptionRef.make(0)
  const serverFiber = yield* Effect.fork(server(ref))
  const clients = new Array(5).fill(null).map(() => client(ref.changes))
  const chunks = yield* Effect.all(clients, { concurrency: "unbounded" })
  yield* Fiber.interrupt(serverFiber)
  for (const chunk of chunks) {
    console.log(chunk)
  }
})

Effect.runPromise(program)
/*
Output:
{
  _id: "Chunk",
  values: [ 2, 3, 4 ]
}
{
  _id: "Chunk",
  values: [ 2 ]
}
{
  _id: "Chunk",
  values: [ 2, 3, 4, 5, 6, 7 ]
}
{
  _id: "Chunk",
  values: [ 2, 3, 4 ]
}
{
  _id: "Chunk",
  values: [ 2, 3, 4, 5, 6, 7, 8, 9 ]
}
*/
```

This setup ensures that each client observes the current value when it starts and receives all subsequent changes.

Since the changes are represented as streams, you can easily build more complex programs using familiar stream operators. You can transform, filter, or merge these streams with other streams to achieve more sophisticated behavior.

# Streaming

## Overview
Streaming refers to the continuous transmission of data, allowing users to access content in real-time without needing to download it first.

## Key Concepts
- **Real-time Access**: Users can view or listen to content as it is being delivered.
- **Data Transmission**: Involves sending data packets over the internet.
- **Buffering**: Temporary storage of data to ensure smooth playback.

## Types of Streaming
1. **Audio Streaming**: Delivery of audio content, such as music or podcasts.
2. **Video Streaming**: Delivery of video content, including movies and live broadcasts.
3. **Live Streaming**: Real-time broadcasting of events or activities.

## Technologies Used
- **Protocols**: Common protocols include HTTP Live Streaming (HLS) and Real-Time Messaging Protocol (RTMP).
- **Codecs**: Compression algorithms used to encode and decode audio and video data.

## Benefits
- Immediate access to content.
- Reduced storage requirements for users.
- Ability to reach a global audience.

## Challenges
- Dependence on internet speed and stability.
- Potential for latency and buffering issues.
- Content delivery network (CDN) requirements for scalability.

## Conclusion
Streaming is a vital technology in modern content delivery, enabling users to access a wide range of media instantly.

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

# Testing

## Overview
This document provides guidelines and best practices for testing software applications.

## Types of Testing
1. **Unit Testing**: Tests individual components for correct behavior.
2. **Integration Testing**: Ensures that different modules work together.
3. **Functional Testing**: Validates the software against functional requirements.
4. **Performance Testing**: Assesses the speed, scalability, and stability of the application.
5. **User Acceptance Testing (UAT)**: Confirms the software meets business needs.

## Best Practices
- Write clear and concise test cases.
- Automate repetitive tests.
- Maintain a consistent testing environment.
- Regularly review and update test cases.
- Involve stakeholders in UAT.

## Tools
- **JUnit**: For unit testing in Java.
- **Selenium**: For automated functional testing.
- **JMeter**: For performance testing.

## Conclusion
Effective testing is crucial for delivering high-quality software. Following best practices and utilizing appropriate tools can enhance the testing process.

# Introduction to Effect's Control Flow Operators

Effect is a powerful TypeScript library designed to help developers easily create complex, synchronous, and asynchronous programs.

Even though JavaScript provides built-in control flow structures, Effect offers additional control flow functions that are useful in Effect applications. This section introduces different ways to control the flow of execution.

## if Expression

When working with Effect values, we can use standard JavaScript if-then-else expressions:

```ts
import { Effect, Option } from "effect"

const validateWeightOption = (
  weight: number
): Effect.Effect<Option.Option<number>> => {
  if (weight >= 0) {
    return Effect.succeed(Option.some(weight))
  } else {
    return Effect.succeed(Option.none())
  }
}
```

Here we use the Option data type to represent the absence of a valid value.

We can also handle invalid inputs using the error channel:

```ts
import { Effect } from "effect"

const validateWeightOrFail = (
  weight: number
): Effect.Effect<number, string> => {
  if (weight >= 0) {
    return Effect.succeed(weight)
  } else {
    return Effect.fail(`negative input: ${weight}`)
  }
}
```

## Conditional Operators

### when

Instead of using `if (condition) expression`, we can use the `Effect.when` function:

```ts
import { Effect, Option } from "effect"

const validateWeightOption = (
  weight: number
): Effect.Effect<Option.Option<number>> =>
  Effect.succeed(weight).pipe(Effect.when(() => weight >= 0))
```

If the condition evaluates to `true`, the effect inside `Effect.when` will be executed and the result will be wrapped in a `Some`, otherwise it returns `None`:

```ts
import { Effect, Option } from "effect"

const validateWeightOption = (
  weight: number
): Effect.Effect<Option.Option<number>> =>
  Effect.succeed(weight).pipe(Effect.when(() => weight >= 0))

Effect.runPromise(validateWeightOption(100)).then(console.log)
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 100
}
*/

Effect.runPromise(validateWeightOption(-5)).then(console.log)
/*
Output:
{
  _id: "Option",
  _tag: "None"
}
*/
```

If the condition itself involves an effect, we can use `Effect.whenEffect`:

```ts
import { Effect, Random } from "effect"

const randomIntOption = Random.nextInt.pipe(
  Effect.whenEffect(Random.nextBoolean)
)
```

### unless

The `Effect.unless` and `Effect.unlessEffect` functions are similar to the `when*` functions, but they are equivalent to the `if (!condition) expression` construct.

### if

The `Effect.if` function allows you to provide an effectful predicate. If the predicate evaluates to `true`, the `onTrue` effect will be executed. Otherwise, the `onFalse` effect will be executed.

Example of a virtual coin flip function:

```ts
import { Effect, Random, Console } from "effect"

const flipTheCoin = Effect.if(Random.nextBoolean, {
  onTrue: () => Console.log("Head"),
  onFalse: () => Console.log("Tail")
})

Effect.runPromise(flipTheCoin)
```

## Zipping

### zip

The `Effect.zip` function combines two effects into a single effect, yielding a tuple containing the results of both input effects once they succeed:

```ts
import { Effect } from "effect"

const task1 = Effect.succeed(1).pipe(
  Effect.delay("200 millis"),
  Effect.tap(Effect.log("task1 done"))
)
const task2 = Effect.succeed("hello").pipe(
  Effect.delay("100 millis"),
  Effect.tap(Effect.log("task2 done"))
)

const task3 = Effect.zip(task1, task2)

Effect.runPromise(task3).then(console.log)
/*
Output:
timestamp=... level=INFO fiber=#0 message="task1 done"
timestamp=... level=INFO fiber=#0 message="task2 done"
[ 1, 'hello' ]
*/
```

`Effect.zip` processes effects sequentially: it first completes the effect on the left and then the effect on the right. To run effects concurrently, use the `concurrent` option:

```ts
import { Effect } from "effect"

const task3 = Effect.zip(task1, task2, { concurrent: true })

Effect.runPromise(task3).then(console.log)
/*
Output:
timestamp=... level=INFO fiber=#3 message="task2 done"
timestamp=... level=INFO fiber=#2 message="task1 done"
[ 1, 'hello' ]
*/
```

### zipWith

The `Effect.zipWith` function combines two effects and applies a function to the results, transforming them into a single value:

```ts
import { Effect } from "effect"

const task3 = Effect.zipWith(
  task1,
  task2,
  (number, string) => number + string.length
)

Effect.runPromise(task3).then(console.log)
/*
Output:
timestamp=... level=INFO fiber=#3 message="task1 done"
timestamp=... level=INFO fiber=#2 message="task2 done"
6
*/
```

## Loop Operators

### loop

The `Effect.loop` function allows you to repeatedly change the state based on a `step` function until a condition given by the `while` function evaluates to `true`:

```ts
Effect.loop(initial, options: { while, step, body })
```

It collects all intermediate states in an array and returns it as the final result.

Example:

```ts
import { Effect } from "effect"

const result = Effect.loop(
  1, // Initial state
  {
    while: (state) => state <= 5, // Condition to continue looping
    step: (state) => state + 1, // State update function
    body: (state) => Effect.succeed(state) // Effect to be performed on each iteration
  }
)

Effect.runPromise(result).then(console.log) // Output: [1, 2, 3, 4, 5]
```

You can use the `discard` option to ignore intermediate results:

```ts
import { Effect, Console } from "effect"

const result = Effect.loop(
  1, // Initial state
  {
    while: (state) => state <= 5,
    step: (state) => state + 1,
    body: (state) => Console.log(`Currently at state ${state}`),
    discard: true
  }
)

Effect.runPromise(result).then(console.log)
/*
Output:
Currently at state 1
Currently at state 2
Currently at state 3
Currently at state 4
Currently at state 5
undefined
*/
```

### iterate

The `Effect.iterate` function allows you to iterate with an effectful operation:

```ts
Effect.iterate(initial, options: { while, body })
```

Example:

```ts
import { Effect } from "effect"

const result = Effect.iterate(
  1, // Initial result
  {
    while: (result) => result <= 5,
    body: (result) => Effect.succeed(result + 1)
  }
)

Effect.runPromise(result).then(console.log) // Output: 6
```

### forEach

The `Effect.forEach` function iterates over an `Iterable` and performs an effectful operation for each element:

```ts
import { Effect } from "effect"

const combinedEffect = Effect.forEach(iterable, operation, options)
```

Example:

```ts
import { Effect, Console } from "effect"

const result = Effect.forEach([1, 2, 3, 4, 5], (n, index) =>
  Console.log(`Currently at index ${index}`).pipe(Effect.as(n * 2))
)

Effect.runPromise(result).then(console.log)
/*
Output:
Currently at index 0
Currently at index 1
Currently at index 2
Currently at index 3
Currently at index 4
[ 2, 4, 6, 8, 10 ]
*/
```

Using the `discard` option:

```ts
import { Effect, Console } from "effect"

const result = Effect.forEach(
  [1, 2, 3, 4, 5],
  (n, index) =>
    Console.log(`Currently at index ${index}`).pipe(Effect.as(n * 2)),
  { discard: true }
)

Effect.runPromise(result).then(console.log)
/*
Output:
Currently at index 0
Currently at index 1
Currently at index 2
Currently at index 3
Currently at index 4
undefined
*/
```

### all

The `Effect.all` function merges multiple effects into a single effect:

```ts
import { Effect } from "effect"

const combinedEffect = Effect.all(effects, options)
```

Example with tuples:

```ts
import { Effect, Console } from "effect"

const tuple = [
  Effect.succeed(42).pipe(Effect.tap(Console.log)),
  Effect.succeed("Hello").pipe(Effect.tap(Console.log))
] as const

const combinedEffect = Effect.all(tuple)

Effect.runPromise(combinedEffect).then(console.log)
/*
Output:
42
Hello
[ 42, 'Hello' ]
*/
```

Example with iterables:

```ts
import { Effect, Console } from "effect"

const iterable: Iterable<Effect.Effect<number>> = [1, 2, 3].map((n) =>
  Effect.succeed(n).pipe(Effect.tap(Console.log))
)

const combinedEffect = Effect.all(iterable)

Effect.runPromise(combinedEffect).then(console.log)
/*
Output:
1
2
3
[ 1, 2, 3 ]
*/
```

Example with structs:

```ts
import { Effect, Console } from "effect"

const struct = {
  a: Effect.succeed(42).pipe(Effect.tap(Console.log)),
  b: Effect.succeed("Hello").pipe(Effect.tap(Console.log))
}

const combinedEffect = Effect.all(struct)

Effect.runPromise(combinedEffect).then(console.log)
/*
Output:
42
Hello
{ a: 42, b: 'Hello' }
*/
```

Example with records:

```ts
import { Effect, Console } from "effect"

const record: Record<string, Effect.Effect<number>> = {
  key1: Effect.succeed(1).pipe(Effect.tap(Console.log)),
  key2: Effect.succeed(2).pipe(Effect.tap(Console.log))
}

const combinedEffect = Effect.all(record)

Effect.runPromise(combinedEffect).then(console.log)
/*
Output:
1
2
{ key1: 1, key2: 2 }
*/
```

#### The Role of Short-Circuiting

`Effect.all` short-circuits execution upon encountering the first error, skipping remaining computations.

Example:

```ts
import { Effect, Console } from "effect"

const effects = [
  Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
  Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
  Effect.succeed("Task3").pipe(Effect.tap(Console.log)) // this task won't be executed
]

const program = Effect.all(effects)

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Task1
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Task2: Oh no!' }
}
*/
```

#### The mode option

Using `{ mode: "either" }` with `Effect.all` allows all effects to execute, collecting both successes and failures:

```ts
import { Effect, Console } from "effect"

const effects = [
  Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
  Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
  Effect.succeed("Task3").pipe(Effect.tap(Console.log))
]

const program = Effect.all(effects, { mode: "either" })

Effect.runPromiseExit(program).then(console.log)
/*
Output:
Task1
Task3
{
  _id: 'Exit',
  _tag: 'Success',
  value: [
    { _id: 'Either', _tag: 'Right', right: 'Task1' },
    { _id: 'Either', _tag: 'Left', left: 'Task2: Oh no!' },
    { _id: 'Either', _tag: 'Right', right: 'Task3' }
  ]
}
*/
```

Using `{ mode: "validate" }` provides a similar approach but uses the `Option` type for success or failure representation:

```ts
import { Effect, Console } from "effect"

const effects = [
  Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
  Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
  Effect.succeed("Task3").pipe(Effect.tap(Console.log))
]

const program = Effect.all(effects, { mode: "validate" })

Effect.runPromiseExit(program).then((result) => console.log("%o", result))
/*
Output:
Task1
Task3
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Fail',
    failure: [
      { _id: 'Option', _tag: 'None' },
      { _id: 'Option', _tag: 'Some', value: 'Task2: Oh no!' },
      { _id: 'Option', _tag: 'None' }
    ]
  }
}
*/

# Dual APIs

Explore "data-last" and "data-first" variants of dual APIs in the Effect ecosystem, illustrated with the example of `Effect.map`. Learn how to choose between them based on your coding style and readability preferences.

When working with APIs in the Effect ecosystem, you may encounter two different ways to use the same API, known as "data-last" and "data-first" variants. When an API supports both variants, they are referred to as "dual" APIs.

## Example: Effect.map

The `Effect.map` function is defined with two TypeScript overloads. The terms "data-last" and "data-first" refer to the position of the `self` argument (the "data") in the signatures of the two overloads:

```ts
export declare const map: {
  // data-last
  <A, B>(f: (a: A) => B): <E, R>(self: Effect<A, E, R>) => Effect<B, E, R>
  // data-first
  <A, E, R, B>(self: Effect<A, E, R>, f: (a: A) => B): Effect<B, E, R>
}
```

### data-last

In the first overload, the `self` argument is in the **last position**:

```ts
<A, B>(f: (a: A) => B): <E, R>(self: Effect<A, E, R>) => Effect<B, E, R>
```

This variant is used with `pipe`. You pass the `Effect` as the first argument to the `pipe` function, followed by a call to `Effect.andThen`:

```ts
const mappedEffect = pipe(effect, Effect.andThen(func))
```

This variant is useful for chaining multiple computations in a long pipeline:

```ts
pipe(effect, Effect.andThen(func1), Effect.andThen(func2), ...)
```

### data-first

In the second overload, the `self` argument is in the **first position**:

```ts
<A, E, R, B>(self: Effect<A, E, R>, f: (a: A) => B): Effect<B, E, R>
```

This variant does not require the `pipe` function. You can directly pass the `Effect` as the first argument to the `Effect.andThen` function:

```ts
const mappedEffect = Effect.andThen(effect, func)
```

This variant is convenient for performing a single operation on the `Effect`.

### Choosing Between the Variants

Both overloads achieve the same result. They are two different ways of expressing the code. Choose the overload that best fits your coding style and enhances readability for you and your team.

# Branded Types

Explore the concept of branded types in TypeScript using the Brand module. Understand the "data-last" and "data-first" variants, and learn to create branded types with runtime validation (refined) and without checks (nominal). Discover how to use and combine branded types to enforce type safety in your code.

Branded types are TypeScript types with an added type tag that helps prevent accidental usage of a value in the wrong context. They allow us to create distinct types based on an existing underlying type, enabling type safety and better code organization.

## The Problem with TypeScript's Structural Typing

TypeScript's type system is structurally typed, meaning that two types are considered compatible if their members are compatible. This can lead to situations where values of the same underlying type are used interchangeably, even when they represent different concepts or have different meanings.

Example:

```ts
type UserId = number;
type ProductId = number;

const getUserById = (id: UserId) => {
  // Logic to retrieve user
};

const getProductById = (id: ProductId) => {
  // Logic to retrieve product
};

const id: UserId = 1;
getProductById(id); // No type error, but this is incorrect usage
```

## How Branded Types Help

Branded types allow you to create distinct types from the same underlying type by adding a unique type tag, enforcing proper usage at compile-time.

Branding is accomplished by adding a symbolic identifier that distinguishes one type from another at the type level.

Example:

```ts
const BrandTypeId: unique symbol = Symbol.for("effect/Brand");

type ProductId = number & {
  readonly [BrandTypeId]: {
    readonly ProductId: "ProductId"; // unique identifier for ProductId
  };
};
```

Attempting to use a `UserId` in place of a `ProductId` results in an error:

```ts
const getProductById = (id: ProductId) => {
  // Logic to retrieve product
};

type UserId = number;

const id: UserId = 1;
getProductById(id); // Error: number cannot be used in place of ProductId
```

## Generalizing Branded Types

To enhance the versatility and reusability of branded types, they can be generalized using a standardized approach:

```ts
const BrandTypeId: unique symbol = Symbol.for("effect/Brand");

interface Brand<in out ID extends string | symbol> {
  readonly [BrandTypeId]: {
    readonly [id in ID]: ID;
  };
}

type ProductId = number & Brand<"ProductId">;
type UserId = number & Brand<"UserId">;
```

Utilizing the `Brand` interface from the Brand module:

```ts
import { Brand } from "effect";

type ProductId = number & Brand.Brand<"ProductId">;
type UserId = number & Brand.Brand<"UserId">;
```

Creating instances of these types directly leads to an error:

```ts
const id: ProductId = 1; // Error: Type 'number' is not assignable to type 'ProductId'
```

## Constructing Branded Types

The Brand module offers two core functions for constructing branded types: `nominal` and `refined`.

### nominal

The `nominal` function defines branded types that do not require runtime validations. It adds a type tag to the underlying type.

Example:

```ts
import { Brand } from "effect";

type UserId = number & Brand.Brand<"UserId">;
const UserId = Brand.nominal<UserId>();

const getUserById = (id: UserId) => {
  // Logic to retrieve user
};

type ProductId = number & Brand.Brand<"ProductId">;
const ProductId = Brand.nominal<ProductId>();

const getProductById = (id: ProductId) => {
  // Logic to retrieve product
};

// Correct usage
getProductById(ProductId(1));

// Incorrect usage
getProductById(1); // Error
getProductById(UserId(1)); // Error
```

### refined

The `refined` function creates branded types that include data validation. It requires a refinement predicate to check the validity of input data.

Example:

```ts
import { Brand } from "effect";

type Int = number & Brand.Brand<"Int">;

const Int = Brand.refined<Int>(
  (n) => Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`)
);

// Correct usage
const x: Int = Int(3);
console.log(x); // Output: 3

// Incorrect usage
const y: Int = Int(3.14); // throws error
```

## Combining Branded Types

The Brand module provides the `all` API to combine multiple branded types together:

```ts
import { Brand } from "effect";

type Int = number & Brand.Brand<"Int">;

const Int = Brand.refined<Int>(
  (n) => Number.isInteger(n),
  (n) => Brand.error(`Expected ${n} to be an integer`)
);

type Positive = number & Brand.Brand<"Positive">;

const Positive = Brand.refined<Positive>(
  (n) => n > 0,
  (n) => Brand.error(`Expected ${n} to be positive`)
);

// Combine Int and Positive into PositiveInt
const PositiveInt = Brand.all(Int, Positive);
type PositiveInt = Brand.Brand.FromConstructor<typeof PositiveInt>;

// Valid positive integer
const good: PositiveInt = PositiveInt(10);

// Invalid cases
const bad1: PositiveInt = PositiveInt(-5); // throws error
const bad2: PositiveInt = PositiveInt(3.14); // throws error
```

# Pattern Matching

Pattern matching is a method that allows developers to handle intricate conditions within a single, concise expression. It simplifies code, making it more concise and easier to understand. Additionally, it includes a process called exhaustiveness checking, which helps to ensure that no possible case has been overlooked.

Originating from functional programming languages, pattern matching stands as a powerful technique for code branching. It often offers a more potent and less verbose solution compared to imperative alternatives such as if/else or switch statements, particularly when dealing with complex conditions.

Although not yet a native feature in JavaScript, there is an ongoing tc39 proposal to introduce pattern matching to JavaScript. However, this proposal is at stage 1 and might take several years to be implemented. Nonetheless, developers can implement pattern matching in their codebase. The `effect/Match` module provides a reliable, type-safe pattern matching implementation that is available for immediate use.

## Defining a Matcher

### type

Creating a `Matcher` involves using the `type` constructor function with a specified type. This sets the foundation for pattern matching against that particular type. Once the `Matcher` is established, developers can employ various combinators like `when`, `not`, and `tag` to define patterns that the `Matcher` will check against.

Example:

```ts
import { Match } from "effect"

const match = Match.type<{ a: number } | { b: string }>().pipe(
  Match.when({ a: Match.number }, (_) => _.a),
  Match.when({ b: Match.string }, (_) => _.b),
  Match.exhaustive
)

console.log(match({ a: 0 })) // Output: 0
console.log(match({ b: "hello" })) // Output: "hello"
```

### value

In addition to defining a `Matcher` based on a specific type, developers can also create a `Matcher` directly from a value utilizing the `value` constructor function. This method allows matching patterns against the provided value.

Example:

```ts
import { Match } from "effect"

const result = Match.value({ name: "John", age: 30 }).pipe(
  Match.when(
    { name: "John" },
    (user) => `${user.name} is ${user.age} years old`
  ),
  Match.orElse(() => "Oh, not John")
)

console.log(result) // Output: "John is 30 years old"
```

## Patterns

### Predicates

Predicates allow the testing of values against specific conditions. It helps in creating rules or conditions for the data being evaluated.

Example:

```ts
import { Match } from "effect"

const match = Match.type<{ age: number }>().pipe(
  Match.when({ age: (age) => age >= 5 }, (user) => `Age: ${user.age}`),
  Match.orElse((user) => `${user.age} is too young`)
)

console.log(match({ age: 5 })) // Output: "Age: 5"
console.log(match({ age: 4 })) // Output: "4 is too young"
```

### not

`not` allows for excluding a specific value while matching other conditions.

Example:

```ts
import { Match } from "effect"

const match = Match.type<string | number>().pipe(
  Match.not("hi", (_) => "a"),
  Match.orElse(() => "b")
)

console.log(match("hello")) // Output: "a"
console.log(match("hi")) // Output: "b"
```

### tag

The `tag` function enables pattern matching against the tag within a Discriminated Union.

Example:

```ts
import { Match, Either } from "effect"

const match = Match.type<Either.Either<number, string>>().pipe(
  Match.tag("Right", (_) => _.right),
  Match.tag("Left", (_) => _.left),
  Match.exhaustive
)

console.log(match(Either.right(123))) // Output: 123
console.log(match(Either.left("Oh no!"))) // Output: "Oh no!"
```

## Transforming a Matcher

### exhaustive

The `exhaustive` transformation serves as an endpoint within the matching process, ensuring all potential matches have been considered.

Example:

```ts
import { Match, Either } from "effect"

const result = Match.value(Either.right(0)).pipe(
  Match.when({ _tag: "Right" }, (_) => _.right),
  Match.exhaustive
)
```

### orElse

The `orElse` transformation signifies the conclusion of the matching process, offering a fallback value when no specific patterns match.

Example:

```ts
import { Match } from "effect"

const match = Match.type<string | number>().pipe(
  Match.when("hi", (_) => "hello"),
  Match.orElse(() => "I literally do not understand")
)

console.log(match("hi")) // Output: "hello"
console.log(match("hello")) // Output: "I literally do not understand"
```

### option

The `option` transformation returns the result encapsulated within an Option. When the match succeeds, it represents the result as `Some`, and when there's no match, it signifies the absence of a value with `None`.

Example:

```ts
import { Match, Either } from "effect"

const result = Match.value(Either.right(0)).pipe(
  Match.when({ _tag: "Right" }, (_) => _.right),
  Match.option
)

console.log(result) // Output: { _id: 'Option', _tag: 'Some', value: 0 }
```

### either

The `either` transformation might match a value, returning an Either following the format `Either<MatchResult, NoMatchResult>`.

Example:

```ts
import { Match } from "effect"

const match = Match.type<string>().pipe(
  Match.when("hi", (_) => _.length),
  Match.either
)

console.log(match("hi")) // Output: { _id: 'Either', _tag: 'Right', right: 2 }
console.log(match("shigidigi")) // Output: { _id: 'Either', _tag: 'Left', left: 'shigidigi' }
```

---
title: Simplifying Excessive Nesting
excerpt: Learn how to simplify code with the `elapsed` function using different approaches. The guide demonstrates using plain pipe, the "do simulation," and the concise `Effect.gen` constructor to calculate and log the elapsed time for an effect's execution. Choose the method that fits your coding style and enhances code readability.
bottomNavigation: pagination
---

Suppose you want to create a custom function `elapsed` that prints the elapsed time taken by an effect to execute.

## Using plain pipe

Initially, you may come up with code that uses the standard `pipe` method, but this approach can lead to excessive nesting and result in verbose and hard-to-read code:

```ts
import { Effect, Console } from "effect"

// Get the current timestamp
const now = Effect.sync(() => new Date().getTime())

// Prints the elapsed time occurred to `self` to execute
const elapsed = <R, E, A>(
  self: Effect.Effect<A, E, R>
): Effect.Effect<A, E, R> =>
  now.pipe(
    Effect.andThen((startMillis) =>
      self.pipe(
        Effect.andThen((result) =>
          now.pipe(
            Effect.andThen((endMillis) => {
              // Calculate the elapsed time in milliseconds
              const elapsed = endMillis - startMillis
              // Log the elapsed time
              return Console.log(`Elapsed: ${elapsed}`).pipe(
                Effect.map(() => result)
              )
            })
          )
        )
      )
    )
  )

// Simulates a successful computation with a delay of 200 milliseconds
const task = Effect.succeed("some task").pipe(Effect.delay("200 millis"))

const program = elapsed(task)

Effect.runPromise(program).then(console.log)
/*
Output:
Elapsed: 204
some task
*/
```

To address this issue and make the code more manageable, there is a solution: the "do simulation."

## Using the "do simulation"

The "do simulation" in Effect allows you to write code in a more declarative style, similar to the "do notation" in other programming languages. It provides a way to define variables and perform operations on them using functions like `Effect.bind` and `Effect.let`.

Here's how the do simulation works:

1. Start the do simulation using the `Effect.Do` value:

   ```ts
   const program = Effect.Do.pipe(/* ... rest of the code */)
   ```

2. Within the do simulation scope, you can use the `Effect.bind` function to define variables and bind them to `Effect` values:

   ```ts
   Effect.bind("variableName", (scope) => effectValue)
   ```

- `variableName` is the name you choose for the variable you want to define. It must be unique within the scope.
- `effectValue` is the `Effect` value that you want to bind to the variable.

3. You can accumulate multiple `Effect.bind` statements to define multiple variables within the scope:

   ```ts
   Effect.bind("variable1", () => effectValue1),
   Effect.bind("variable2", ({ variable1 }) => effectValue2),
   // ... additional bind statements
   ```

4. Inside the do simulation scope, you can also use the `Effect.let` function to define variables and bind them to simple values:

   ```ts
   Effect.let("variableName", (scope) => simpleValue)
   ```

- `variableName` is the name you give to the variable. Like before, it must be unique within the scope.
- `simpleValue` is the value you want to assign to the variable.

5. Regular Effect functions like `Effect.andThen`, `Effect.flatMap`, `Effect.tap`, and `Effect.map` can still be used within the do simulation. These functions will receive the accumulated variables as arguments within the scope:

   ```ts
   Effect.andThen(({ variable1, variable2 }) => {
     // Perform operations using variable1 and variable2
     // Return an `Effect` value as the result
   })
   ```

With the do simulation, you can rewrite the `elapsed` combinator like this:

```ts
import { Effect, Console } from "effect"

// Get the current timestamp
const now = Effect.sync(() => new Date().getTime())

const elapsed = <R, E, A>(
  self: Effect.Effect<A, E, R>
): Effect.Effect<A, E, R> =>
  Effect.Do.pipe(
    Effect.bind("startMillis", () => now),
    Effect.bind("result", () => self),
    Effect.bind("endMillis", () => now),
    Effect.let(
      "elapsed",
      ({ startMillis, endMillis }) => endMillis - startMillis // Calculate the elapsed time in milliseconds
    ),
    Effect.tap(({ elapsed }) => Console.log(`Elapsed: ${elapsed}`)), // Log the elapsed time
    Effect.map(({ result }) => result)
  )

// Simulates a successful computation with a delay of 200 milliseconds
const task = Effect.succeed("some task").pipe(Effect.delay("200 millis"))

const program = elapsed(task)

Effect.runPromise(program).then(console.log)
/*
Output:
Elapsed: 204
some task
*/
```

In this solution, we use the do simulation to simplify the code. The `elapsed` function now starts with `Effect.Do` to enter the simulation scope. Inside the scope, we use `Effect.bind` to define variables and bind them to the corresponding effects.

## Using `Effect.gen`

The most concise and convenient solution is to use the `Effect.gen` constructor, which allows you to work with generators when dealing with effects. This approach leverages the native scope provided by the generator syntax, avoiding excessive nesting and leading to more concise code.

```ts
import { Effect } from "effect"

// Get the current timestamp
const now = Effect.sync(() => new Date().getTime())

// Prints the elapsed time occurred to `self` to execute
const elapsed = <R, E, A>(
  self: Effect.Effect<A, E, R>
): Effect.Effect<A, E, R> =>
  Effect.gen(function* () {
    const startMillis = yield* now
    const result = yield* self
    const endMillis = yield* now
    // Calculate the elapsed time in milliseconds
    const elapsed = endMillis - startMillis
    // Log the elapsed time
    console.log(`Elapsed: ${elapsed}`)
    return result
  })

// Simulates a successful computation with a delay of 200 milliseconds
const task = Effect.succeed("some task").pipe(Effect.delay("200 millis"))

const program = elapsed(task)

Effect.runPromise(program).then(console.log)
/*
Output:
Elapsed: 204
some task
*/
```

In this solution, we switch to using generators to simplify the code. The `elapsed` function now uses a generator function (`Effect.gen`) to define the flow of execution. Within the generator, we use `yield*` to invoke effects and bind their results to variables. This eliminates the nesting and provides a more readable and sequential code structure.

The generator style in Effect uses a more linear and sequential flow of execution, resembling traditional imperative programming languages. This makes the code easier to read and understand, especially for developers who are more familiar with imperative programming paradigms.

On the other hand, the pipe style can lead to excessive nesting, especially when dealing with complex effectful computations. This can make the code harder to follow and debug.

---
title: Guidelines
---

## Using `runMain`

`runMain` serves as the primary entry point for running an Effect application on Node:

```ts
import { Effect, Console, Schedule, pipe } from "effect"
import { NodeRuntime } from "@effect/platform-node"

const program = pipe(
  Effect.addFinalizer(() => Console.log("Application is about to exit!")),
  Effect.andThen(Console.log("Application started!")),
  Effect.andThen(
    Effect.repeat(Console.log("still alive..."), {
      schedule: Schedule.spaced("1 second")
    })
  ),
  Effect.scoped
)

// Effect.runFork(program) // no graceful teardown with CTRL+C

NodeRuntime.runMain(program) // graceful teardown with CTRL+C
```

The `runMain` function finds all fibers and interrupts them, adding an observer for the fiber by listening to `sigint`. Teardown should be on the main effect; killing the fiber that runs the application/server will trigger teardown. This is the purpose of `runMain` from the `platform-node` package.

## Avoid Tacit Usage

Avoid tacit function calls like `map(f)` and using `flow`. It is recommended not to use functions point-free, meaning avoiding tacit usage.

While tacit functions can be used, they may cause issues. It is safer to use `(x) => fn(x)` instead. Tacit usage, especially with optional parameters, can be unsafe. If a function has overloads, using it tacitly might erase all generics, leading to bugs.

TypeScript inference can be compromised with tacit functions, resulting in unexpected errors. This is not just a stylistic choice; it is a protective measure to avoid mistakes. Stack traces may also be less clear with tacit usage, increasing risk without significant benefit.

It is advisable to avoid tacit usage, particularly with generic functions that have overloads, to prevent losing generics.

# Code Style

## General Guidelines
- Follow consistent naming conventions for variables, functions, and classes.
- Use meaningful names that convey the purpose of the code.
- Maintain a consistent indentation style (e.g., 2 or 4 spaces).
- Limit line length to 80-120 characters.

## Comments
- Write clear and concise comments to explain complex logic.
- Use comments to describe the purpose of functions and classes.
- Avoid redundant comments that restate the code.

## Formatting
- Use blank lines to separate logical sections of code.
- Group related functions and classes together.
- Ensure proper spacing around operators and after commas.

## Code Structure
- Organize code into modules and packages for better maintainability.
- Follow the single responsibility principle for functions and classes.
- Keep functions short and focused on a single task.

## Error Handling
- Use exceptions for error handling instead of return codes.
- Provide meaningful error messages to aid debugging.

## Testing
- Write unit tests for all new features and bug fixes.
- Ensure tests are easy to read and maintain.

## Version Control
- Commit code changes frequently with clear, descriptive messages.
- Use branches for new features and bug fixes.

# Introduction

Welcome to the documentation for `effect/Schema`, a module for defining and using schemas to validate and transform data in TypeScript.

`effect/Schema` allows you to define a `Schema<Type, Encoded, Context>` that provides a blueprint for describing the structure and data types of your data. Once defined, you can leverage this schema to perform a range of operations, including:

- **Decoding**: Transforming data from an input type `Encoded` to an output type `Type`.
- **Encoding**: Converting data from an output type `Type` back to an input type `Encoded`.
- **Asserting**: Verifying that a value adheres to the schema's output type `Type`.
- **Arbitraries**: Generate arbitraries for fast-check testing.
- **JSON Schemas**: Create JSON Schemas based on defined schemas.
- **Equivalence**: Create Equivalences based on defined schemas.
- **Pretty printing**: Support pretty printing for data structures.

## The Schema Type

The `Schema<Type, Encoded, Context>` type represents an immutable value that describes the structure of your data.

The `Schema` type has three type parameters:

- **Type**: Represents the type of value that a schema can succeed with during decoding.
- **Encoded**: Represents the type of value that a schema can succeed with during encoding. By default, it's equal to `Type` if not explicitly provided.
- **Context**: Represents the contextual data required by the schema to execute both decoding and encoding. If this type parameter is `never`, it means the schema has no requirements.

**Examples**:

- `Schema<string>` represents a schema that decodes to `string`, encodes to `string`, and has no requirements.
- `Schema<number, string>` represents a schema that decodes to `number` from `string`, encodes a `number` to a `string`, and has no requirements.

`Schema` values are immutable, and all `effect/Schema` functions produce new `Schema` values. They do not perform any actions themselves; they simply describe the structure of your data.

## Understanding Decoding and Encoding

Decoding and encoding are processes used to transform data between formats.

**Encoding**: Changing a `Date` into a `string`.

**Decoding**: Transforming a `string` back into a `Date`.

**Decoding From Unknown**:
1. **Checking**: Verify that the input data matches the expected structure (e.g., ensuring the input is a `string`).
2. **Decoding**: Convert the `string` into a `Date`.

**Encoding From Unknown**:
1. **Checking**: Verify that the input data matches the expected structure (e.g., ensuring the input is a `Date`).
2. **Encoding**: Convert the `Date` into a `string`.

Schemas should be defined such that encode + decode return the original value.

## The Rule of Schemas: Keeping Encode and Decode in Sync

Your schemas should be crafted so that encoding and decoding operations yield the original value. This ensures data consistency throughout the process.

## Requirements

- TypeScript **5.0** or newer
- The `strict` flag enabled in your `tsconfig.json`
- The `exactOptionalPropertyTypes` flag enabled in your `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Additionally, install the `effect` package, as it's a peer dependency.

## Understanding exactOptionalPropertyTypes

The `effect/Schema` module utilizes the `exactOptionalPropertyTypes` option in `tsconfig.json`, affecting how optional properties are typed.

**With exactOptionalPropertyTypes Enabled**:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true
  })
})
```

Here, the type of `name` is strict (`string`), catching invalid assignments.

**With exactOptionalPropertyTypes Disabled**:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true
  })
})
```

In this case, the type of `name` is widened to `string | undefined`, leading to potential runtime errors during decoding.

# Getting Started

You can import the necessary types and functions from the `effect/Schema` module:

**Example** (Namespace Import)

```ts
import * as Schema from "effect/Schema"
```

**Example** (Named Import)

```ts
import { Schema } from "effect"
```

## Defining a schema

Define a `Schema` using the `Struct` constructor from `effect/Schema`. Each property in the object is defined by its own `Schema`.

Example of a `Schema` for a person object:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})
```

Note: Most constructors return `readonly` types by default.

## Extracting Inferred Types

### Type

Extract the inferred type `A` from `Schema<A, I, R>` in two ways:

- Using `Schema.Schema.Type` utility.
- Using the `Type` field defined on your schema.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

type Person = Schema.Schema.Type<typeof Person>
type Person2 = typeof Person.Type
```

Alternatively, define the `Person` type using `interface`:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

interface Person extends Schema.Schema.Type<typeof Person> {}
```

### Encoded

Extract the inferred `I` type using `Schema.Encoded` utility:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

type PersonEncoded = Schema.Schema.Encoded<typeof Person>
type PersonEncoded2 = typeof Person.Encoded
```

### Context

Extract the inferred type `R` using `Schema.Context` utility:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

type PersonContext = Schema.Schema.Context<typeof Person>
```

### Advanced extracting Inferred Types

To create a schema with an opaque type:

```ts
import { Schema } from "effect"

const _Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

interface Person extends Schema.Schema.Type<typeof _Person> {}

const Person: Schema.Schema<Person> = _Person
```

For cases where `A` differs from `I`:

```ts
import { Schema } from "effect"

const _Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

interface Person extends Schema.Schema.Type<typeof _Person> {}
interface PersonEncoded extends Schema.Schema.Encoded<typeof _Person> {}

const Person: Schema.Schema<Person, PersonEncoded> = _Person
```

## Decoding From Unknown Values

Functions to decode unknown data types:

- `decodeUnknownSync`: Synchronously decodes a value.
- `decodeUnknownOption`: Returns an Option type.
- `decodeUnknownEither`: Returns an Either type.
- `decodeUnknownPromise`: Returns a Promise.
- `decodeUnknown`: Returns an Effect.

**Example** (Using `decodeUnknownSync`):

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const input: unknown = { name: "Alice", age: 30 }

console.log(Schema.decodeUnknownSync(Person)(input))
console.log(Schema.decodeUnknownSync(Person)(null))
```

**Example** (Using `decodeUnknownEither`):

```ts
import { Schema } from "effect"
import { Either } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person)

const input: unknown = { name: "Alice", age: 30 }
const result1 = decode(input)
if (Either.isRight(result1)) {
  console.log(result1.right)
}

const result2 = decode(null)
if (Either.isLeft(result2)) {
  console.log(result2.left)
}
```

For asynchronous transformations, use `decodeUnknown`:

```ts
import { Schema } from "effect"
import { Effect } from "effect"

const PersonId = Schema.Number

const Person = Schema.Struct({
  id: PersonId,
  name: Schema.String,
  age: Schema.Number
})

const asyncSchema = Schema.transformOrFail(PersonId, Person, {
  strict: true,
  decode: (id) =>
    Effect.succeed({ id, name: "name", age: 18 }).pipe(
      Effect.delay("10 millis")
    ),
  encode: (person) =>
    Effect.succeed(person.id).pipe(Effect.delay("10 millis"))
})

const asyncParsePersonId = Schema.decodeUnknown(asyncSchema)

Effect.runPromise(asyncParsePersonId(1)).then(console.log)
```

## Parse Options

### Excess properties

By default, excess properties are stripped out. Use `onExcessProperty` option to trigger a parsing error.

Example with `onExcessProperty` set to `"error"`:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(Person)({
  name: "Bob",
  age: 40,
  email: "bob@example.com"
}, { onExcessProperty: "error" })
```

To allow excess properties, set `onExcessProperty` to `"preserve"`:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

console.log(Schema.decodeUnknownSync(Person)({
  name: "Bob",
  age: 40,
  email: "bob@example.com"
}, { onExcessProperty: "preserve" }))
```

### All errors

Use the `errors` option to receive all parsing errors. Set it to `"all"` to get comprehensive error messages.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(Person)({
  name: "Bob",
  age: "abc",
  email: "bob@example.com"
}, { errors: "all", onExcessProperty: "error" })
```

### Managing Property Order

The `propertyOrder` option controls the order of object fields. Set it to `"original"` to preserve input order.

**Example** (Synchronous Decoding):

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  a: Schema.Number,
  b: Schema.Literal("b"),
  c: Schema.Number
})

console.log(Schema.decodeUnknownSync(schema)({ b: "b", c: 2, a: 1 }, { propertyOrder: "original" }))
```

**Example** (Asynchronous Decoding):

```ts
import { Effect, Schema } from "effect"

const schema = Schema.Struct({
  a: Schema.Number,
  b: Schema.Number,
  c: Schema.Number
}).annotations({ concurrency: 3 })

Schema.decode(schema)({ a: 1, b: 2, c: 3 }, { propertyOrder: "original" })
  .pipe(Effect.runPromise)
  .then(console.log)
```

### Customizing Parsing Behavior at the Schema Level

Use the `parseOptions` annotation to tailor parse options for each schema.

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  a: Schema.Struct({
    b: Schema.String,
    c: Schema.String
  }).annotations({
    title: "first error only",
    parseOptions: { errors: "first" }
  }),
  d: Schema.String
}).annotations({
  title: "all errors",
  parseOptions: { errors: "all" }
})

const result = Schema.decodeUnknownEither(schema)({ a: {} }, { errors: "first" })
```

## Managing Missing Properties

By default, missing properties are treated as `undefined`. Use the `exact` option to distinguish between missing and undefined properties.

```ts
import { Schema } from "effect"

const schema = Schema.Struct({ a: Schema.Unknown })
const input = {}

console.log(Schema.decodeUnknownSync(schema)(input, { exact: true }))
```

## Encoding

The `effect/Schema` module provides several `encode*` functions:

- `encodeSync`: Synchronously encodes data.
- `encodeOption`: Returns an Option type.
- `encodeEither`: Returns an Either type.
- `encodePromise`: Returns a Promise.
- `encode`: Returns an Effect.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number
})

console.log(Schema.encodeSync(Person)({ name: "Alice", age: 30 }))
```

### Handling Unsupported Encoding

Use the `Forbidden` error for unsupported encoding.

```ts
import { Either, ParseResult, Schema } from "effect"

export const SafeDecode = <A, I>(self: Schema.Schema<A, I, never>) => {
  const decodeUnknownEither = Schema.decodeUnknownEither(self)
  return Schema.transformOrFail(
    Schema.Unknown,
    Schema.EitherFromSelf({
      left: Schema.Unknown,
      right: Schema.typeSchema(self)
    }),
    {
      strict: true,
      decode: (input) =>
        ParseResult.succeed(
          Either.mapLeft(decodeUnknownEither(input), () => input)
        ),
      encode: (actual, _, ast) =>
        Either.match(actual, {
          onLeft: () =>
            ParseResult.fail(
              new ParseResult.Forbidden(ast, actual, "cannot encode a Left")
            ),
          onRight: ParseResult.succeed
        })
    }
  )
}
```

## Naming Conventions

Naming conventions in `effect/Schema` focus on compatibility with JSON serialization.

### Overview of Naming Strategies

**JSON-Compatible Types**: Named directly after their data types.

**Non-JSON-Compatible Types**: Incorporate additional details to indicate necessary transformations.

### Practical Application

Example demonstrating straightforward naming conventions:

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  sym: Schema.Symbol,
  optional: Schema.Option(Schema.Date),
  chunk: Schema.Chunk(Schema.BigInt),
  createdAt: Schema.Date,
  updatedAt: Schema.Date
})
```

## Type Guards

The `Schema.is` function verifies that a value conforms to a given schema.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const isPerson = Schema.is(Person)

console.log(isPerson({ name: "Alice", age: 30 })) // true
console.log(isPerson(null)) // false
```

## Assertions

The `Schema.asserts` function asserts that an input matches the schema type. If it does not match, it throws an error.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const assertsPerson = Schema.asserts(Person)

try {
  assertsPerson({ name: "Alice", age: "30" })
} catch (e) {
  console.error("The input does not match the schema:")
  console.error(e)
}

assertsPerson({ name: "Alice", age: 30 })
```

# Basic Usage

## Cheatsheet

| Typescript Type                                           | Description / Notes                      | Schema / Combinator / Example                                              |
| --------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `null`                                                    |                                          | `S.Null`                                                                   |
| `undefined`                                               |                                          | `S.Undefined`                                                              |
| `string`                                                  |                                          | `S.String`                                                                 |
| `number`                                                  |                                          | `S.Number`                                                                 |
| `boolean`                                                 |                                          | `S.Boolean`                                                                |
| `symbol`                                                  |                                          | `S.SymbolFromSelf` / `S.Symbol`                                            |
| `BigInt`                                                  |                                          | `S.BigIntFromSelf` / `S.BigInt`                                            |
| `unknown`                                                 |                                          | `S.Unknown`                                                                |
| `any`                                                     |                                          | `S.Any`                                                                    |
| `never`                                                   |                                          | `S.Never`                                                                  |
| `object`                                                  |                                          | `S.Object`                                                                 |
| `unique symbol`                                           |                                          | `S.UniqueSymbolFromSelf`                                                   |
| `"a"`, `1`, `true`                                        | type literals                            | `S.Literal("a")`, `S.Literal(1)`, `S.Literal(true)`                        |
| `a${string}`                                              | template literals                        | `S.TemplateLiteral("a", S.String)`                                         |
| `{ readonly a: string, readonly b?: number\| undefined }` | structs                                  | `S.Struct({ a: S.String, b: S.optional(S.Number) })`                       |
| `Record<A, B>`                                            | records                                  | `S.Record({ key: A, value: B })`                                           |
| `readonly [string, number]`                               | tuples                                   | `S.Tuple(S.String, S.Number)`                                              |
| `ReadonlyArray<string>`                                   | arrays                                   | `S.Array(S.String)`                                                        |
| `A \| B`                                                  | unions                                   | `S.Union(A, B)`                                                            |
| `A & B`                                                   | intersections of non-overlapping structs | `S.extend(A, B)`                                                           |
| `Record<A, B> & Record<C, D>`                             | intersections of non-overlapping records | `S.extend(S.Record({ key: A, value: B }), S.Record({ key: C, value: D }))` |
| `type A = { a: A \| null }`                               | recursive types                          | `S.Struct({ a: S.Union(S.Null, S.suspend(() => self)) })`                  |
| `keyof A`                                                 |                                          | `S.keyof(A)`                                                               |
| `Partial<A>`                                              |                                          | `S.partial(A)`                                                             |
| `Required<A>`                                             |                                          | `S.required(A)`                                                            |

## Primitives

These primitive schemas are building blocks for creating more complex schemas to describe your data structures.

```ts
import { Schema } from "effect"

Schema.String // Schema<string>
Schema.Number // Schema<number>
Schema.Boolean // Schema<boolean>
Schema.BigIntFromSelf // Schema<BigInt>
Schema.SymbolFromSelf // Schema<symbol>
Schema.Object // Schema<object>
Schema.Undefined // Schema<undefined>
Schema.Void // Schema<void>
Schema.Any // Schema<any>
Schema.Unknown // Schema<unknown>
Schema.Never // Schema<never>
```

## Literals

Literals represent specific values that are directly specified.

```ts
// @target: ES2020
import { Schema } from "effect"

Schema.Null // same as S.Literal(null)
Schema.Literal("a")
Schema.Literal("a", "b", "c") // union of literals
Schema.Literal(1)
Schema.Literal(2n) // BigInt literal
Schema.Literal(true)
```

**Exposed Values**

You can access the literals of a literal schema:

```ts
import { Schema } from "effect"

const schema = Schema.Literal("a", "b")

// Accesses the literals
const literals = schema.literals
```

**The pickLiteral Utility**

We can also use `Schema.pickLiteral` with a literal schema to narrow down the possible values:

```ts
import { Schema } from "effect"

Schema.Literal("a", "b", "c").pipe(Schema.pickLiteral("a", "b")) // same as S.Literal("a", "b")
```

Sometimes, we need to reuse a schema literal in other parts of our code. Let's see an example:

```ts
import { Schema } from "effect"

const FruitId = Schema.Number
const FruitCategory = Schema.Literal("sweet", "citrus", "tropical")

const Fruit = Schema.Struct({
  id: FruitId,
  category: FruitCategory
})

const SweetAndCitrusFruit = Schema.Struct({
  fruitId: FruitId,
  category: FruitCategory.pipe(Schema.pickLiteral("sweet", "citrus"))
})
```

## Template literals

In TypeScript, template literals allow you to embed expressions within string literals. The `Schema.TemplateLiteral` constructor allows you to create a schema for these template literal types.

```ts
import { Schema } from "effect"

Schema.TemplateLiteral("a", Schema.String)
Schema.TemplateLiteral("https://", Schema.String, ".", Schema.Literal("com", "net"))
```

## TemplateLiteralParser

The `TemplateLiteralParser` API validates the input format and automatically parses it into a more structured and type-safe output, specifically into a **tuple** format.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.TemplateLiteralParser(
  Schema.NumberFromString,
  "a",
  Schema.NonEmptyString
)

console.log(Schema.decodeEither(schema)("100afoo"))
console.log(Schema.encode(schema)([100, "a", "foo"]))
```

## Unique Symbols

```ts
import { Schema } from "effect"

const mySymbol = Symbol.for("mysymbol")

const mySymbolSchema = Schema.UniqueSymbolFromSelf(mySymbol)
```

## Filters

Using the `Schema.filter` function, developers can define custom validation logic that goes beyond basic type checks.

**Example: Simple Validation**

```ts
import { Schema } from "effect"

const LongString = Schema.String.pipe(
  Schema.filter(
    (s) => s.length >= 10 || "a string at least 10 characters long"
  )
)

console.log(Schema.decodeUnknownSync(LongString)("a"))
```

### Predicate Function Structure

The predicate for a filter is defined as follows:

```ts
type Predicate = (
  a: A,
  options: ParseOptions,
  self: AST.Refinement
) => FilterReturnType
```

### Annotations

It's beneficial to embed as much metadata as possible within the schema.

**Example**

```ts
import { Schema } from "effect"

const LongString = Schema.String.pipe(
  Schema.filter(
    (s) => s.length >= 10 ? undefined : "a string at least 10 characters long",
    {
      identifier: "LongString",
      jsonSchema: { minLength: 10 },
      description: "Lorem ipsum dolor sit amet"
    }
  )
)

console.log(Schema.decodeUnknownSync(LongString)("a"))
```

### Specifying Error Paths

It's possible to specify an error path along with the message.

**Example**

```ts
import { Either, Schema, ParseResult } from "effect"

const Password = Schema.Trim.pipe(Schema.minLength(1))

const MyForm = Schema.Struct({
  password: Password,
  confirm_password: Password
}).pipe(
  Schema.filter((input) => {
    if (input.password !== input.confirm_password) {
      return {
        path: ["confirm_password"],
        message: "Passwords do not match"
      }
    }
  })
)

console.log(
  JSON.stringify(
    Schema.decodeUnknownEither(MyForm)({
      password: "abc",
      confirm_password: "d"
    }).pipe(
      Either.mapLeft((error) =>
        ParseResult.ArrayFormatter.formatErrorSync(error)
      )
    ),
    null,
    2
  )
)
```

### Multiple Error Reporting

The `Schema.filter` API also supports reporting multiple issues at once.

**Example**

```ts
import { Either, Schema, ParseResult } from "effect"

const Password = Schema.Trim.pipe(Schema.minLength(1))
const OptionalString = Schema.optional(Schema.String)

const MyForm = Schema.Struct({
  password: Password,
  confirm_password: Password,
  name: OptionalString,
  surname: OptionalString
}).pipe(
  Schema.filter((input) => {
    const issues: Array<Schema.FilterIssue> = []
    if (input.password !== input.confirm_password) {
      issues.push({
        path: ["confirm_password"],
        message: "Passwords do not match"
      })
    }
    if (!input.name && !input.surname) {
      issues.push({
        path: ["surname"],
        message: "Surname must be present if name is not present"
      })
    }
    return issues
  })
)

console.log(
  JSON.stringify(
    Schema.decodeUnknownEither(MyForm)({
      password: "abc",
      confirm_password: "d"
    }).pipe(
      Either.mapLeft((error) =>
        ParseResult.ArrayFormatter.formatErrorSync(error)
      )
    ),
    null,
    2
  )
)
```

### Exposed Values

You can access the base schema for which the filter has been defined:

```ts
import { Schema } from "effect"

const LongString = Schema.String.pipe(Schema.filter((s) => s.length >= 10))

const From = LongString.from
```

### String Filters

```ts
import { Schema } from "effect"

Schema.String.pipe(Schema.maxLength(5))
Schema.String.pipe(Schema.minLength(5))
Schema.NonEmptyString
Schema.String.pipe(Schema.length(5))
Schema.String.pipe(Schema.length({ min: 2, max: 4 }))
Schema.String.pipe(Schema.pattern(/^[a-z]+$/))
Schema.String.pipe(Schema.startsWith("prefix"))
Schema.String.pipe(Schema.endsWith("suffix"))
Schema.String.pipe(Schema.includes("substring"))
Schema.String.pipe(Schema.trimmed())
Schema.String.pipe(Schema.lowercased())
```

### Number Filters

```ts
import { Schema } from "effect"

Schema.Number.pipe(Schema.greaterThan(5))
Schema.Number.pipe(Schema.greaterThanOrEqualTo(5))
Schema.Number.pipe(Schema.lessThan(5))
Schema.Number.pipe(Schema.lessThanOrEqualTo(5))
Schema.Number.pipe(Schema.between(-2, 2))
Schema.Number.pipe(Schema.int())
Schema.Number.pipe(Schema.nonNaN())
Schema.Number.pipe(Schema.finite())
Schema.Number.pipe(Schema.positive())
Schema.Number.pipe(Schema.nonNegative())
Schema.Number.pipe(Schema.negative())
Schema.Number.pipe(Schema.nonPositive())
Schema.Number.pipe(Schema.multipleOf(5))
```

### BigInt Filters

```ts
import { Schema } from "effect"

Schema.BigInt.pipe(Schema.greaterThanBigInt(5n))
Schema.BigInt.pipe(Schema.greaterThanOrEqualToBigInt(5n))
Schema.BigInt.pipe(Schema.lessThanBigInt(5n))
Schema.BigInt.pipe(Schema.lessThanOrEqualToBigInt(5n))
Schema.BigInt.pipe(Schema.betweenBigInt(-2n, 2n))
Schema.BigInt.pipe(Schema.positiveBigInt())
Schema.BigInt.pipe(Schema.nonNegativeBigInt())
Schema.BigInt.pipe(Schema.negativeBigInt())
Schema.BigInt.pipe(Schema.nonPositiveBigInt())
```

### BigDecimal Filters

```ts
import { Schema } from "effect"
import { BigDecimal } from "effect"

Schema.BigDecimal.pipe(Schema.greaterThanBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.greaterThanOrEqualToBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.lessThanBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.lessThanOrEqualToBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.betweenBigDecimal(BigDecimal.fromNumber(-2), BigDecimal.fromNumber(2)))
Schema.BigDecimal.pipe(Schema.positiveBigDecimal())
Schema.BigDecimal.pipe(Schema.nonNegativeBigDecimal())
Schema.BigDecimal.pipe(Schema.negativeBigDecimal())
Schema.BigDecimal.pipe(Schema.nonPositiveBigDecimal())
```

### Duration Filters

```ts
import { Schema } from "effect"

Schema.Duration.pipe(Schema.greaterThanDuration("5 seconds"))
Schema.Duration.pipe(Schema.greaterThanOrEqualToDuration("5 seconds"))
Schema.Duration.pipe(Schema.lessThanDuration("5 seconds"))
Schema.Duration.pipe(Schema.lessThanOrEqualToDuration("5 seconds"))
Schema.Duration.pipe(Schema.betweenDuration("5 seconds", "10 seconds"))
```

### Array Filters

```ts
import { Schema } from "effect"

Schema.Array(Schema.Number).pipe(Schema.maxItems(2))
Schema.Array(Schema.Number).pipe(Schema.minItems(2))
Schema.Array(Schema.Number).pipe(Schema.itemsCount(2))
```

## Branded types

TypeScript's type system is structural, which means that any two types that are structurally equivalent are considered the same. This can cause issues when types that are semantically different are treated as if they were the same.

```ts
type UserId = string
type Username = string

declare const getUser: (id: UserId) => object

const myUsername: Username = "gcanti"

getUser(myUsername) // This erroneously works
```

To avoid these kinds of issues, the Effect ecosystem provides a way to create custom types with a unique identifier attached to them. These are known as **branded types**.

```ts
import { Brand } from "effect"

type UserId = string & Brand.Brand<"UserId">
type Username = string

declare const getUser: (id: UserId) => object

const myUsername: Username = "gcanti"

getUser(myUsername) // This will now throw an error
```

### Defining a brand schema from scratch

To define a schema for a branded type from scratch, you can use the `Schema.brand` function.

```ts
import { Schema } from "effect"

const UserId = Schema.String.pipe(Schema.brand("UserId"))
```

### Reusing an existing branded constructor

If you have already defined a branded type using the `effect/Brand` module, you can reuse it to define a schema using the `fromBrand` combinator exported by the `effect/Schema` module.

```ts
import { Schema } from "effect"
import { Brand } from "effect"

type UserId = string & Brand.Brand<"UserId">

const UserId = Brand.nominal<UserId>()

const UserIdSchema = Schema.String.pipe(Schema.fromBrand(UserId))
```

### Utilizing Default Constructors

The `Schema.brand` function includes a default constructor to facilitate the creation of branded values.

```ts
import { Schema } from "effect"

const UserId = Schema.String.pipe(Schema.brand("UserId"))

const userId = UserId.make("123") // Creates a branded UserId
```

## Native enums

```ts
import { Schema } from "effect"

enum Fruits {
  Apple,
  Banana
}

const schema = Schema.Enums(Fruits)
```

### Accessing Enum Members

Enums are exposed under an `enums` property of the schema:

```ts
import { Schema } from "effect"

enum Fruits {
  Apple,
  Banana
}

const schema = Schema.Enums(Fruits)

// Access the enum members
schema.enums // Returns all enum members
schema.enums.Apple // Access the Apple member
schema.enums.Banana // Access the Banana member
```

## Unions

The Schema module includes a built-in `Union` constructor for composing "OR" types.

```ts
import { Schema } from "effect"

const schema = Schema.Union(Schema.String, Schema.Number)
```

### Union of Literals

While the following is perfectly acceptable:

```ts
import { Schema } from "effect"

const schema = Schema.Union(
  Schema.Literal("a"),
  Schema.Literal("b"),
  Schema.Literal("c")
)
```

It is possible to use `Literal` and pass multiple literals, which is less cumbersome:

```ts
import { Schema } from "effect"

const schema = Schema.Literal("a", "b", "c")
```

### Nullables

```ts
import { Schema } from "effect"

Schema.NullOr(Schema.String)
Schema.NullishOr(Schema.String)
Schema.UndefinedOr(Schema.String)
```

### Discriminated unions

Discriminated unions in TypeScript are a way of modeling complex data structures that may take on different forms based on a specific set of conditions or properties.

```ts
import { Schema } from "effect"

const Circle = Schema.Struct({
  kind: Schema.Literal("circle"),
  radius: Schema.Number
})

const Square = Schema.Struct({
  kind: Schema.Literal("square"),
  sideLength: Schema.Number
})

const Shape = Schema.Union(Circle, Square)
```

### How to transform a simple union into a discriminated union

If you're working on a TypeScript project and you've defined a simple union to represent a particular input, you may find yourself in a situation where you're not entirely happy with how it's set up.

```ts
import { Schema } from "effect"

const Circle = Schema.Struct({
  radius: Schema.Number
})

const Square = Schema.Struct({
  sideLength: Schema.Number
})

const Shape = Schema.Union(Circle, Square)
```

To make your code more manageable, you may want to transform the simple union into a discriminated union. This way, TypeScript will be able to automatically determine which member of the union you're working with based on the value of a specific property.

```ts
import { Schema } from "effect"

const Circle = Schema.Struct({
  radius: Schema.Number
})

const Square = Schema.Struct({
  sideLength: Schema.Number
})

const DiscriminatedShape = Schema.Union(
  Schema.transform(
    Circle,
    Schema.Struct({ ...Circle.fields, kind: Schema.Literal("circle") }),
    {
      strict: true,
      decode: (circle) => ({ ...circle, kind: "circle" as const }),
      encode: ({ kind: _kind, ...rest }) => rest
    }
  ),

  Schema.transform(
    Square,
    Schema.Struct({ ...Square.fields, kind: Schema.Literal("square") }),
    {
      strict: true,
      decode: (square) => ({ ...square, kind: "square" as const }),
      encode: ({ kind: _kind, ...rest }) => rest
    }
  )
)
```

### Exposed Values

You can access the individual members of a union schema represented as a tuple:

```ts
import { Schema } from "effect"

const schema = Schema.Union(Schema.String, Schema.Number)

// Accesses the members of the union
const members = schema.members
```

## Tuples

### Required Elements

To define a tuple with required elements, you specify the list of elements:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(Schema.String, Schema.Number)
```

### Append a Required Element

```ts
import { Schema } from "effect"

const tuple1 = Schema.Tuple(Schema.String, Schema.Number)

const tuple2 = Schema.Tuple(...tuple1.elements, Schema.Boolean)
```

### Optional Elements

To define an optional element, wrap the schema of the element with the `optionalElement` constructor:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(
  Schema.String, // required element
  Schema.optionalElement(Schema.Number) // optional element
)
```

### Rest Element

To define rest elements, follow the list of elements (required or optional) with an element for the rest:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(
  [Schema.String, Schema.optionalElement(Schema.Number)], // elements
  Schema.Boolean // rest
)
```

### Exposed Values

You can access the elements and rest elements of a tuple schema:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(
  [Schema.String, Schema.optionalElement(Schema.Number)], // elements
  Schema.Boolean // rest
)

// Accesses the elements of the tuple
const tupleElements = schema.elements

// Accesses the rest elements of the tuple
const restElements = schema.rest
```

## Arrays

```ts
import { Schema } from "effect"

const schema = Schema.Array(Schema.Number)
```

### Exposed Values

You can access the value of an array schema:

```ts
import { Schema } from "effect"

const schema = Schema.Array(Schema.String)

// Accesses the value
const value = schema.value // typeof Schema.String
```

### Mutable Arrays

By default, when you use `Schema.Array`, it generates a type marked as readonly. The `mutable` combinator is a useful function for creating a new schema with a mutable type in a **shallow** manner:

```ts
import { Schema } from "effect"

const schema = Schema.mutable(Schema.Array(Schema.Number))
```

## Non empty arrays

```ts
import { Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.Number)
```

### Exposed Values

You can access the value of a non-empty array schema:

```ts
import { Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.String)

// Accesses the value
const value = schema.value
```

## Records

### String Keyed Records

```ts
import { Schema } from "effect"

const opaque = Schema.Record({ key: Schema.String, value: Schema.Number })

const schema = Schema.asSchema(opaque)
```

### Union of Literals as Keys

```ts
import { Schema } from "effect"

const opaque = Schema.Record({
  key: Schema.Union(Schema.Literal("a"), Schema.Literal("b")),
  value: Schema.Number
})

const schema = Schema.asSchema(opaque)
```

### Applying Key Refinements

```ts
import { Schema } from "effect"

const schema = Schema.Record({
  key: Schema.String.pipe(Schema.minLength(2)),
  value: Schema.Number
})
```

### Symbol Keyed Records

```ts
import { Schema } from "effect"

const schema = Schema.Record({
  key: Schema.SymbolFromSelf,
  value: Schema.Number
})
```

### Employing Template Literal Keys

```ts
import { Schema } from "effect"

const opaque = Schema.Record({
  key: Schema.TemplateLiteral(Schema.Literal("a"), Schema.String),
  value: Schema.Number
})

const schema = Schema.asSchema(opaque)
```

### Creating Mutable Records

By default, when you use `Schema.Record`, it generates a type marked as readonly. The `mutable` combinator is a useful function for creating a new schema with a mutable type in a **shallow** manner:

```ts
import { Schema } from "effect"

const schema = Schema.mutable(
  Schema.Record({ key: Schema.String, value: Schema.Number })
)
```

### Exposed Values

You can access the key and the value of a record schema:

```ts
import { Schema } from "effect"

const schema = Schema.Record({ key: Schema.String, value: Schema.Number })

const key = schema.key
const value = schema.value
```

## Structs

Structs are used to define schemas for objects with specific properties.

```ts
import { Schema } from "effect"

const MyStruct = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})
```

### Index Signatures

The `Struct` constructor optionally accepts a list of key/value pairs representing index signatures:

```ts
(props, ...indexSignatures) => Struct<...>
```

### Exposed Values

You can access the fields and the records of a struct schema:

```ts
import { Schema } from "effect"

const schema = Schema.Struct(
  { a: Schema.Number },
  Schema.Record({ key: Schema.String, value: Schema.Number })
)

const fields = schema.fields
const records = schema.records
```

### Mutable Properties

By default, when you use `Schema.Struct`, it generates a type with properties that are marked as readonly. The `Schema.mutable` combinator is a useful function for creating a new schema with properties made mutable in a **shallow** manner:

```ts
import { Schema } from "effect"

const opaque = Schema.mutable(
  Schema.Struct({ a: Schema.String, b: Schema.Number })
)
```

## Property Signatures

### Basic Usage of Property Signatures

A `PropertySignature` generally represents a transformation from a "From" field to a "To" field:

```ts
{
  fromKey: fromType
}
```

### Optional Fields

**Basic Optional Property**

`Schema.optional(schema: Schema<A, I, R>)` defines a basic optional property that handles different inputs and outputs during decoding and encoding.

**Optional with Nullability**

`Schema.optionalWith(schema: Schema<A, I, R>, { nullable: true })` allows handling of `null` values as equivalent to missing values.

**Combining Nullability and Exactness**

`Schema.optionalWith(schema: Schema<A, I, R>, { exact: true, nullable: true })` combines handling for exact types and null values.

### Default Values

The `default` option in schemas allows you to set default values that are applied during both decoding and object construction phases.

### Renaming Properties

### Renaming a Property During Definition

To rename a property directly during schema creation, you can utilize the `Schema.fromKey` function.

### Renaming Properties of an Existing Schema

For existing schemas, the `rename` API offers a way to systematically change property names across a schema.

## Tagged Structs

### What is a Tag?

A tag is a literal value added to data structures, commonly used in structs, to distinguish between various object types or variants within tagged unions.

### Using the tag Constructor

The `tag` constructor is specifically designed to create a property signature that holds a specific literal value.

### Simplifying Tagged Structs with TaggedStruct

The `TaggedStruct` constructor streamlines the process of creating tagged structs by directly integrating the tag into the struct definition.

### Multiple Tags

While a primary tag is often sufficient, TypeScript allows you to define multiple tags for more complex data structuring needs.

## instanceOf

When you need to define a schema for your custom data type defined through a `class`, the most convenient and fast way is to use the `Schema.instanceOf` constructor.

## pick

The `pick` static function available in each struct schema can be used to create a new `Struct` by selecting particular properties from an existing `Struct`.

## omit

The `omit` static function available in each struct schema can be used to create a new `Struct` by excluding particular properties from an existing `Struct`.

## partial

The `Schema.partial` operation makes all properties within a schema optional.

## required

The `Schema.required` operation ensures that all properties in a schema are mandatory.

## Extending Schemas

### Spreading Struct fields

Structs expose their fields through a `fields` property. This feature can be utilized to extend an existing struct with additional fields or to merge fields from another struct.

### The extend combinator

The `Schema.extend` combinator offers a structured way to extend schemas, particularly useful when direct field spreading is insufficient.

## Composition

Combining and reusing schemas is a common requirement, the `Schema.compose` combinator allows you to do just that.

### Non-strict Option

If you need to be less restrictive when composing your schemas, you can make use of the `{ strict: false }` option.

## Declaring New Data Types

### Declaring Schemas for Primitive Data Types

A primitive data type represents simple values. To declare a schema for a primitive data type, like the `File` type in TypeScript, we use the `S.declare` constructor along with a type guard.

### Declaring Schemas for Type Constructors

Type constructors are generic types that take one or more types as arguments and return a new type. If you need to define a schema for a type constructor, you can use the `S.declare` constructor.

### Adding Annotations

When you define a new data type, some compilers may not know how to handle the newly defined data. In such cases, you need to provide annotations to ensure proper functionality.

## Recursive Schemas

The `Schema.suspend` function is useful when you need to define a schema that depends on itself, like in the case of recursive data structures.

### Mutually Recursive Schemas

Here's an example of two mutually recursive schemas, `Expression` and `Operation`, that represent a simple arithmetic expression tree.

### Recursive Types with Different Encoded and Type

Defining a recursive schema where the `Encoded` type differs from the `Type` type adds another layer of complexity. In such cases, we need to define two interfaces: one for the `Type` type, and another for the `Encoded` type.

---
title: Projections
excerpt: The `effect/Schema` module facilitates the extraction of `Type` or `Encoded` portions from schemas, streamlining the creation of new schemas based on old specifications.

Occasionally, you may need to derive a new schema from an existing one, specifically targeting either its `Type` or `Encoded` portion. The `effect/Schema` module provides several APIs to support this functionality.

## typeSchema

The `Schema.typeSchema` function allows you to extract the `Type` portion of a schema, creating a new schema that conforms to the properties defined in the original schema without considering the initial encoding or transformation processes.

**Function Signature**

```ts
declare const typeSchema: <A, I, R>(schema: Schema<A, I, R>) => Schema<A>
```

**Example**

```ts
import { Schema } from "effect"

const original = Schema.Struct({
  foo: Schema.NumberFromString.pipe(Schema.greaterThanOrEqualTo(2))
})

const resultingTypeSchema = Schema.typeSchema(original)
```

In this example:

- **Original Schema**: The schema for `foo` accepts a number from a string and enforces that it is greater than or equal to 2.
- **Resulting Type Schema**: The `Schema.typeSchema` function extracts only the type-related information from `foo`, simplifying it to just a number while maintaining the constraint.

## encodedSchema

The `Schema.encodedSchema` function allows you to extract the `Encoded` portion of a schema, creating a new schema that conforms to the properties defined in the original schema without retaining any refinements or transformations that were applied previously.

**Function Signature**

```ts
declare const encodedSchema: <A, I, R>(schema: Schema<A, I, R>) => Schema<I>
```

**Example**

```ts
import { Schema } from "effect"

const original = Schema.Struct({
  foo: Schema.String.pipe(Schema.minLength(3))
})

const resultingEncodedSchema = Schema.encodedSchema(original)
```

In this example:

- **Original Schema Definition**: The `foo` field is defined as a string with a minimum length of three characters.
- **Resulting Encoded Schema**: The `encodedSchema` function simplifies the `foo` field to just a string type, stripping away the `minLength` refinement.

## encodedBoundSchema

The `Schema.encodedBoundSchema` function is similar to `Schema.encodedSchema` but preserves the refinements up to the first transformation point in the original schema.

**Function Signature**

```ts
declare const encodedBoundSchema: <A, I, R>(
  schema: Schema<A, I, R>
) => Schema<I>
```

The term "bound" refers to the boundary up to which refinements are preserved when extracting the encoded form of a schema.

**Example**

```ts
import { Schema } from "effect"

const original = Schema.Struct({
  foo: Schema.String.pipe(Schema.minLength(3), Schema.compose(Schema.Trim))
})

const resultingEncodedBoundSchema = Schema.encodedBoundSchema(original)
```

In this example:

- **Initial Schema**: The schema for `foo` includes a refinement for a minimum length of three characters and a transformation to trim the string.
- **Resulting Schema**: `resultingEncodedBoundSchema` maintains the `Schema.minLength(3)` condition while excluding the trimming transformation, focusing solely on the length requirement.

---
title: Transformations
excerpt: Transformations
bottomNavigation: pagination
---

Transformations are essential for converting data types, such as parsing strings into numbers or converting date strings into `Date` objects.

## transform

The `Schema.transform` function links two schemas: one for the input type and one for the output type. It accepts five parameters:

- **from**: The source schema (`Schema<B, A, R1>`), where `A` is the input type and `B` is the intermediate type after validation.
- **to**: The target schema (`Schema<D, C, R2>`), where `C` is the transformed type from `B`, and `D` is the final output type.
- **decode**: A function converting an intermediate value of type `B` to type `C` (`(b: B, a: A) => C`).
- **encode**: A function reversing the transformation, converting type `C` back to type `B` (`(c: C, d: D) => B`).
- **strict**: Optional (recommended) boolean.

The result is a schema `Schema<D, A, R1 | R2>`.

**Example: Doubling a Number**

```ts
import { Schema } from "effect"

const transformedSchema = Schema.transform(
  Schema.Number,
  Schema.Number,
  {
    strict: true,
    decode: (n) => n * 2,
    encode: (n) => n / 2
  }
)
```

**Example: Converting an array to a ReadonlySet**

```ts
import { Schema } from "effect"

const ReadonlySetFromArray = <A, I, R>(
  itemSchema: Schema.Schema<A, I, R>
): Schema.Schema<ReadonlySet<A>, ReadonlyArray<I>, R> =>
  Schema.transform(
    Schema.Array(itemSchema),
    Schema.ReadonlySetFromSelf(Schema.typeSchema(itemSchema)),
    {
      strict: true,
      decode: (items) => new Set(items),
      encode: (set) => Array.from(set.values())
    }
  )
```

**Example: Trim Whitespace**

```ts
import { Schema } from "effect"

const transformedSchema = Schema.transform(
  Schema.String,
  Schema.String,
  {
    strict: true,
    decode: (s) => s.trim(),
    encode: (s) => s
  }
)
```

**Improving the Transformation with a Filter**

```ts
import { Schema } from "effect"

const transformedSchema = Schema.transform(
  Schema.String,
  Schema.String.pipe(Schema.filter((s) => s === s.trim())),
  {
    strict: true,
    decode: (s) => s.trim(),
    encode: (s) => s
  }
)
```

### Non-strict option

For cases where strict type checking is too limiting, `transform` allows `strict: false` for more flexible data manipulation.

**Example: Clamping Constructor**

```ts
import { Schema } from "effect"
import { Number } from "effect"

const clamp =
  (minimum: number, maximum: number) =>
  <A extends number, I, R>(self: Schema.Schema<A, I, R>) =>
    Schema.transform(
      self,
      self.pipe(
        Schema.typeSchema,
        Schema.filter((a) => a <= minimum || a >= maximum)
      ),
      {
        strict: true,
        decode: (a) => Number.clamp(a, { minimum, maximum }),
        encode: (a) => a
      }
    )
```

## transformOrFail

The `Schema.transformOrFail` function is for scenarios where transformations can fail during decoding or encoding. It uses the ParseResult module for error management:

- **ParseResult.succeed**: Indicates a successful transformation.
- **ParseResult.fail**: Signals a failed transformation.

**Example: Converting a String to a Number**

```ts
import { ParseResult, Schema } from "effect"

export const NumberFromString = Schema.transformOrFail(
  Schema.String,
  Schema.Number,
  {
    strict: true,
    decode: (input, options, ast) => {
      const parsed = parseFloat(input)
      if (isNaN(parsed)) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            input,
            "Failed to convert string to number"
          )
        )
      }
      return ParseResult.succeed(parsed)
    },
    encode: (input, options, ast) => ParseResult.succeed(input.toString())
  }
)
```

### Async Transformations

`Schema.transformOrFail` supports asynchronous transformations by allowing you to return an `Effect`.

**Example: Asynchronously Converting a String to a Number Using an API**

```ts
import { Effect, Schema, ParseResult } from "effect"

const api = (url: string): Effect.Effect<unknown, Error> =>
  Effect.tryPromise({
    try: () =>
      fetch(url).then((res) => {
        if (res.ok) {
          return res.json() as Promise<unknown>
        }
        throw new Error(String(res.status))
      }),
    catch: (e) => new Error(String(e))
  })

const PeopleId = Schema.String.pipe(Schema.brand("PeopleId"))

const PeopleIdFromString = Schema.transformOrFail(Schema.String, PeopleId, {
  strict: true,
  decode: (s, _, ast) =>
    Effect.mapBoth(api(`https://swapi.dev/api/people/${s}`), {
      onFailure: (e) => new ParseResult.Type(ast, s, e.message),
      onSuccess: () => s
    }),
  encode: ParseResult.succeed
})
```

## Effectful Filters

The `Schema.filterEffect` function allows for asynchronous or dynamic validation scenarios.

**Example: Validating Usernames Asynchronously**

```ts
import { Schema } from "effect"
import { Effect } from "effect"

async function validateUsername(username: string) {
  return Promise.resolve(username === "gcanti")
}

const ValidUsername = Schema.String.pipe(
  Schema.filterEffect((username) =>
    Effect.promise(() =>
      validateUsername(username).then((valid) => valid || "Invalid username")
    )
  )
).annotations({ identifier: "ValidUsername" })
```

## String Transformations

### split

Splits a string into an array of strings.

```ts
import { Schema } from "effect"

const schema = Schema.split(",")

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("")) // [""]
console.log(decode(",")) // ["", ""]
console.log(decode("a,")) // ["a", ""]
console.log(decode("a,b")) // ["a", "b"]
```

### Trim

Removes whitespaces from the beginning and end of a string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Trim)

console.log(decode("a")) // "a"
console.log(decode(" a")) // "a"
console.log(decode("a ")) // "a"
console.log(decode(" a ")) // "a"
```

### Lowercase

Converts a string to lowercase.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Lowercase)

console.log(decode("A")) // "a"
console.log(decode(" AB")) // " ab"
console.log(decode("Ab ")) // "ab "
console.log(decode(" ABc ")) // " abc "
```

### Uppercase

Converts a string to uppercase.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Uppercase)

console.log(decode("a")) // "A"
console.log(decode(" ab")) // " AB"
console.log(decode("aB ")) // "AB "
console.log(decode(" abC ")) // " ABC "
```

### Capitalize

Converts a string to capitalized one.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Capitalize)

console.log(decode("aa")) // "Aa"
console.log(decode(" ab")) // " ab"
console.log(decode("aB ")) // "AB "
console.log(decode(" abC ")) // " abC "
```

### Uncapitalize

Converts a string to uncapitalized one.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Uncapitalize)

console.log(decode("AA")) // "aA"
console.log(decode(" AB")) // " AB"
console.log(decode("Ab ")) // "ab "
console.log(decode(" AbC ")) // " AbC "
```

### parseJson

Converts JSON strings into the `unknown` type using `JSON.parse`.

```ts
import { Schema } from "effect"

const schema = Schema.parseJson()
const decode = Schema.decodeUnknownSync(schema)

console.log(decode("{}")) // Output: {}
console.log(decode(`{"a":"b"}`)) // Output: { a: "b" }

decode("")
/*
throws:
ParseError: (JsonString <-> unknown)
└─ Transformation process failure
   └─ Unexpected end of JSON input
*/
```

### StringFromBase64

Decodes a base64 encoded string into a UTF-8 string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.StringFromBase64)

console.log(decode("Zm9vYmFy")) // "foobar"
```

### StringFromBase64Url

Decodes a base64 (URL) encoded string into a UTF-8 string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.StringFromBase64Url)

console.log(decode("Zm9vYmFy")) // "foobar"
```

### StringFromHex

Decodes a hex encoded string into a UTF-8 string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.StringFromHex)

console.log(new TextEncoder().encode(decode("0001020304050607")))
/*
Output:
Uint8Array(8) [
  0, 1, 2, 3,
  4, 5, 6, 7
]
*/
```

## Number Transformations

### NumberFromString

Transforms a string into a number by parsing the string using `parseFloat`.

```ts
import { Schema } from "effect"

const schema = Schema.NumberFromString

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("1")) // 1
console.log(decode("-1")) // -1
console.log(decode("1.5")) // 1.5
console.log(decode("NaN")) // NaN
console.log(decode("Infinity")) // Infinity
console.log(decode("-Infinity")) // -Infinity

decode("a")
/*
throws:
ParseError: NumberFromString
└─ Transformation process failure
   └─ Expected NumberFromString, actual "a"
*/
```

### clamp

Clamps a number between a minimum and a maximum value.

```ts
import { Schema } from "effect"

const schema = Schema.Number.pipe(Schema.clamp(-1, 1))

const decode = Schema.decodeUnknownSync(schema)

console.log(decode(-3)) // -1
console.log(decode(0)) // 0
console.log(decode(3)) // 1
```

### parseNumber

Transforms a string into a number by parsing the string using the `parse` function of the `effect/Number` module.

```ts
import { Schema } from "effect"

const schema = Schema.String.pipe(Schema.parseNumber)

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("1")) // 1
console.log(decode("Infinity")) // Infinity
console.log(decode("NaN")) // NaN
console.log(decode("-"))
/*
throws
ParseError: (string <-> number)
└─ Transformation process failure
   └─ Expected (string <-> number), actual "-"
*/
```

## Boolean Transformations

### Not

Negates a boolean value.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Not)

console.log(decode(true)) // false
console.log(decode(false)) // true
```

## Symbol transformations

### Symbol

Transforms a string into a symbol by parsing the string using `Symbol.for`.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Symbol)

console.log(decode("a")) // Symbol(a)
```

## BigInt transformations

### BigInt

Transforms a string into a `BigInt` by parsing the string using the `BigInt` constructor.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigInt)

console.log(decode("1")) // 1n
console.log(decode("-1")) // -1n

decode("a")
/*
throws:
ParseError: bigint
└─ Transformation process failure
   └─ Expected bigint, actual "a"
*/
decode("1.5") // throws
decode("NaN") // throws
decode("Infinity") // throws
```

### BigIntFromNumber

Transforms a number into a `BigInt` by parsing the number using the `BigInt` constructor.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigIntFromNumber)

console.log(decode(1)) // 1n
console.log(decode(-1)) // -1n

decode(1.5)
/*
throws:
ParseError: BigintFromNumber
└─ Transformation process failure
   └─ Expected BigintFromNumber, actual 1.5
*/
```

### clamp

Clamps a `BigInt` between a minimum and a maximum value.

```ts
import { Schema } from "effect"

const schema = Schema.BigIntFromSelf.pipe(Schema.clampBigInt(-1n, 1n))

const decode = Schema.decodeUnknownSync(schema)

console.log(decode(-3n)) // -1n
console.log(decode(0n)) // 0n
console.log(decode(3n)) // 1n
```

## Date transformations

### Date

Transforms a string into a valid `Date`, rejecting invalid dates.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Date)

console.log(decode("1970-01-01T00:00:00.000Z")) // 1970-01-01T00:00:00.000Z

decode("a")
/*
throws:
ParseError: Date
└─ Predicate refinement failure
   └─ Expected Date, actual Invalid Date
*/
```

## BigDecimal Transformations

### BigDecimal

Transforms a string into a `BigDecimal`.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigDecimal)

console.log(decode(".124")) // { _id: 'BigDecimal', value: '124', scale: 3 }
```

### BigDecimalFromNumber

Transforms a number into a `BigDecimal`.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigDecimalFromNumber)

console.log(decode(0.111)) // { _id: 'BigDecimal', value: '111', scale: 3 }
```

### clampBigDecimal

Clamps a `BigDecimal` between a minimum and a maximum value.

```ts
import { Schema } from "effect"
import { BigDecimal } from "effect"

const schema = Schema.BigDecimal.pipe(
  Schema.clampBigDecimal(BigDecimal.fromNumber(-1), BigDecimal.fromNumber(1))
)

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("-2")) // { _id: 'BigDecimal', value: '-1', scale: 0 }
console.log(decode("0")) // { _id: 'BigDecimal', value: '0', scale: 0 }
console.log(decode("3")) // { _id: 'BigDecimal', value: '1', scale: 0 }
```

# Annotations

One of the fundamental requirements in the design of `effect/Schema` is that it is extensible and customizable. Customizations are achieved through "annotations". Each node contained in the AST of `effect/SchemaAST` contains an `annotations: Record<symbol, unknown>` field that can be used to attach additional information to the schema. You can manage these annotations using the `annotations` method or the `Schema.annotations` API.

## Example of Using Annotations

```ts
import { Schema } from "effect"

const Password =
  Schema.String
    .annotations({ message: () => "not a string" })
    .pipe(
      Schema.nonEmptyString({ message: () => "required" }),
      Schema.maxLength(10, { message: (s) => `${s.actual} is too long` })
    )
    .annotations({
      identifier: "Password",
      title: "password",
      description: "A password is a string of characters used to verify the identity of a user during the authentication process",
      examples: ["1Ki77y", "jelly22fi$h"],
      documentation: `jsDoc documentation...`
    })
```

This example demonstrates the use of built-in annotations to add metadata like error messages, identifiers, and descriptions to enhance the schema's functionality and documentation.

## Built-in Annotations

- **identifier**: Assigns a unique identifier to the schema, ideal for TypeScript identifiers and code generation purposes. Commonly used in tools like TreeFormatter to clarify output. Examples include `"Person"`, `"Product"`.
- **title**: Sets a short, descriptive title for the schema, similar to a JSON Schema title. Useful for documentation or UI headings. It is also used by TreeFormatter to enhance readability of error messages.
- **description**: Provides a detailed explanation about the schema's purpose, akin to a JSON Schema description. Used by TreeFormatter to provide more detailed error messages.
- **documentation**: Extends detailed documentation for the schema, beneficial for developers or automated documentation generation.
- **examples**: Lists examples of valid schema values, akin to the examples attribute in JSON Schema, useful for documentation and validation testing.
- **default**: Defines a default value for the schema, similar to the default attribute in JSON Schema, to ensure schemas are pre-populated where applicable.
- **message**: Customizes the error message for validation failures, improving clarity in outputs from tools like TreeFormatter and ArrayFormatter during decoding or validation errors.
- **jsonSchema**: Specifies annotations that affect the generation of JSON Schema documents, customizing how schemas are represented.
- **arbitrary**: Configures settings for generating Arbitrary test data.
- **pretty**: Configures settings for generating Pretty output.
- **equivalence**: Configures settings for evaluating data Equivalence.
- **concurrency**: Controls concurrency behavior, ensuring schemas perform optimally under concurrent operations.
- **batching**: Manages settings for batching operations to enhance performance when operations can be grouped.
- **parseIssueTitle**: Provides a custom title for parsing issues, enhancing error descriptions in outputs from TreeFormatter.
- **parseOptions**: Allows overriding of parsing options at the schema level, offering granular control over parsing behaviors.
- **decodingFallback**: Provides a way to define custom fallback behaviors that trigger when decoding operations fail.

## Concurrency Annotation

For complex schemas like `Struct`, `Array`, or `Union` that contain multiple nested schemas, the `concurrency` annotation provides a way to manage how validations are executed concurrently:

```ts
import { Schema } from "effect"
import type { Duration } from "effect"
import { Effect } from "effect"

const item = (id: number, duration: Duration.DurationInput) =>
  Schema.String.pipe(
    Schema.filterEffect(() =>
      Effect.gen(function* () {
        yield* Effect.sleep(duration)
        console.log(`Task ${id} done`)
        return true
      })
    )
  )
```

**Sequential Execution**

```ts
const Sequential = Schema.Tuple(
  item(1, "30 millis"),
  item(2, "10 millis"),
  item(3, "20 millis")
)

Effect.runPromise(Schema.decode(Sequential)(["a", "b", "c"]))
```

**Concurrent Execution**

```ts
const Concurrent = Schema.Tuple(
  item(1, "30 millis"),
  item(2, "10 millis"),
  item(3, "20 millis")
).annotations({ concurrency: "unbounded" })

Effect.runPromise(Schema.decode(Concurrent)(["a", "b", "c"]))
```

This configuration allows developers to specify whether validations within a schema should be processed sequentially or concurrently, offering flexibility based on the performance needs and the dependencies between validations.

## Handling Decoding Errors with Fallbacks

The `DecodingFallbackAnnotation` provides a way to handle decoding errors gracefully in your schemas.

```ts
type DecodingFallbackAnnotation<A> = (
  issue: ParseIssue
) => Effect<A, ParseIssue>
```

By using this annotation, you can define custom fallback behaviors that trigger when decoding operations fail.

**Example Usage**

```ts
import { Schema } from "effect"
import { Effect, Either } from "effect"

const schema = Schema.String.annotations({
  decodingFallback: () => Either.right("<fallback>")
})

console.log(Schema.decodeUnknownSync(schema)("valid input"))
console.log(Schema.decodeUnknownSync(schema)(null))
```

**Advanced Fallback with Logging**

```ts
const schemaWithLog = Schema.String.annotations({
  decodingFallback: (issue) =>
    Effect.gen(function* () {
      yield* Effect.log(issue._tag)
      yield* Effect.sleep(10)
      return yield* Effect.succeed("<fallback2>")
    })
})

Effect.runPromise(Schema.decodeUnknown(schemaWithLog)(null)).then(console.log)
```

## Custom Annotations

You can also define your own custom annotations for specific needs. Here's how you can create a `deprecated` annotation:

```ts
import { Schema } from "effect"

const DeprecatedId = Symbol.for(
  "some/unique/identifier/for/your/custom/annotation"
)

const schema = Schema.String.annotations({ [DeprecatedId]: true })

console.log(schema)
```

Annotations can be read using the `AST.getAnnotation` helper:

```ts
import { Option, Schema, SchemaAST } from "effect"

const DeprecatedId = Symbol.for(
  "some/unique/identifier/for/your/custom/annotation"
)

const schema = Schema.String.annotations({ [DeprecatedId]: true })

const isDeprecated = <A, I, R>(schema: Schema.Schema<A, I, R>): boolean =>
  SchemaAST.getAnnotation<boolean>(DeprecatedId)(schema.ast).pipe(
    Option.getOrElse(() => false)
  )

console.log(isDeprecated(Schema.String)) // Output: false
console.log(isDeprecated(schema)) // Output: true
```

# Error Messages

## Default Error Messages

When a parsing error occurs, the system generates an informative message based on the schema's structure and the nature of the error. For example, if a required property is missing or a data type does not match, the error message will state the expectation versus the actual input.

**Example: Type Mismatch**

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(schema)(null)
/*
ParseError: Date
└─ Predicate refinement failure
   └─ Expected Date, actual Invalid Date
*/
```

**Example: Missing Properties**

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(schema)({}, { errors: "all" })
/*
throws:
ParseError: { readonly name: string; readonly age: number }
├─ ["name"]
│  └─ is missing
└─ ["age"]
   └─ is missing
*/
```

**Example: Incorrect Property Type**

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(schema)(
  { name: null, age: "age" },
  { errors: "all" }
)
/*
throws:
ParseError: { readonly name: string; readonly age: number }
├─ ["name"]
│  └─ Expected string, actual null
└─ ["age"]
   └─ Expected number, actual "age"
*/
```

### Enhancing Clarity in Error Messages with Identifiers

To enhance clarity in error messages for schemas with multiple fields or nested structures, you can use annotations such as `identifier`, `title`, and `description`.

**Example**

```ts
import { Schema } from "effect"

const Name = Schema.String.annotations({ identifier: "Name" })

const Age = Schema.Number.annotations({ identifier: "Age" })

const Person = Schema.Struct({
  name: Name,
  age: Age
}).annotations({ identifier: "Person" })

Schema.decodeUnknownSync(Person)(null)
/*
throws:
ParseError: Expected Person, actual null
*/

Schema.decodeUnknownSync(Person)({}, { errors: "all" })
/*
throws:
ParseError: Person
├─ ["name"]
│  └─ is missing
└─ ["age"]
   └─ is missing
*/

Schema.decodeUnknownSync(Person)({ name: null, age: null }, { errors: "all" })
/*
throws:
ParseError: Person
├─ ["name"]
│  └─ Expected Name, actual null
└─ ["age"]
   └─ Expected Age, actual null
*/
```

### Refinements

When a refinement fails, the default error message indicates whether the failure occurred in the "from" part or within the predicate defining the refinement:

**Example**

```ts
import { Schema } from "effect"

const Name = Schema.NonEmptyString.annotations({ identifier: "Name" }) // refinement

const Age = Schema.Positive.pipe(Schema.int({ identifier: "Age" })) // refinement

const Person = Schema.Struct({
  name: Name,
  age: Age
}).annotations({ identifier: "Person" })

// From side failure
Schema.decodeUnknownSync(Person)({ name: null, age: 18 })
/*
throws:
ParseError: Person
└─ ["name"]
   └─ Name
      └─ From side refinement failure
         └─ Expected string, actual null
*/

// Predicate refinement failure
Schema.decodeUnknownSync(Person)({ name: "", age: 18 })
/*
throws:
ParseError: Person
└─ ["name"]
   └─ Name
      └─ Predicate refinement failure
         └─ Expected Name, actual ""
*/
```

### Transformations

Transformations between different types or formats can result in errors. The system provides structured error messages to specify where the error occurred:

- **Encoded Side Failure:** Indicates that the input to the transformation does not match the expected type or format.
- **Transformation Process Failure:** Arises when the transformation logic itself fails.
- **Type Side Failure:** Occurs when the output of a transformation does not meet the schema requirements.

**Example**

```ts
import { ParseResult, Schema } from "effect"

const schema = Schema.transformOrFail(
  Schema.String,
  Schema.String.pipe(Schema.minLength(2)),
  {
    strict: true,
    decode: (s, _, ast) =>
      s.length > 0
        ? ParseResult.succeed(s)
        : ParseResult.fail(new ParseResult.Type(ast, s)),
    encode: ParseResult.succeed
  }
)

// Encoded side failure
Schema.decodeUnknownSync(schema)(null)
/*
throws:
ParseError: (string <-> a string at least 2 character(s) long)
└─ Encoded side transformation failure
   └─ Expected string, actual null
*/

// transformation failure
Schema.decodeUnknownSync(schema)("")
/*
throws:
ParseError: (string <-> a string at least 2 character(s) long)
└─ Transformation process failure
   └─ Expected (string <-> a string at least 2 character(s) long), actual ""
*/

// Type side failure
Schema.decodeUnknownSync(schema)("a")
/*
throws:
ParseError: (string <-> a string at least 2 character(s) long)
└─ Type side transformation failure
   └─ a string at least 2 character(s) long
      └─ Predicate refinement failure
         └─ Expected a string at least 2 character(s) long, actual "a"
*/
```

## Custom Error Messages

You can define custom error messages for different parts of your schema using the `message` annotation. This allows for more context-specific feedback.

### MessageAnnotation Type

```ts
type MessageAnnotation = (issue: ParseIssue) =>
  | string
  | Effect<string>
  | {
      readonly message: string | Effect<string>
      readonly override: boolean
    }
```

| Return Type                            | Description                                                                                                                                                                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `string`                               | Provides a static message that describes the error.                                                                                                                                                                                                 |
| `Effect<string>`                       | Utilizes dynamic messages that can incorporate results from synchronous processes or rely on optional dependencies.                                                                                                                                  |
| Object (with `message` and `override`) | Allows you to define a specific error message along with a boolean flag (`override`). This flag determines if the custom message should supersede any default or nested custom messages. |

**Example**

```ts
import { Schema } from "effect"

const MyString = Schema.String.annotations({
  message: () => "my custom message"
})

Schema.decodeUnknownSync(MyString)(null)
/*
throws:
ParseError: my custom message
*/
```

### General Guidelines for Messages

1. If no custom messages are set, the default message related to the innermost schema where the operation failed is used.
2. If custom messages are set, the message corresponding to the first failed schema is used, starting from the innermost schema to the outermost. If the failing schema does not have a custom message, the default message is used.
3. You can override guideline 2 by setting the `overwrite` flag to `true`, allowing the custom message to take precedence.

### Scalar Schemas

```ts
import { Schema } from "effect"

const MyString = Schema.String.annotations({
  message: () => "my custom message"
})

const decode = Schema.decodeUnknownSync(MyString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message) // "my custom message"
}
```

### Refinements

```ts
import { Schema } from "effect"

const MyString = Schema.String.pipe(
  Schema.minLength(1),
  Schema.maxLength(2)
).annotations({
  message: () => "my custom message"
})

const decode = Schema.decodeUnknownSync(MyString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message)
  /*
  a string at most 2 character(s) long
  └─ From side refinement failure
    └─ a string at least 1 character(s) long
        └─ From side refinement failure
          └─ Expected string, actual null
  */
}

try {
  decode("")
} catch (e: any) {
  console.log(e.message)
  /*
  a string at most 2 character(s) long
  └─ From side refinement failure
    └─ a string at least 1 character(s) long
        └─ Predicate refinement failure
          └─ Expected a string at least 1 character(s) long, actual ""
  */
}

try {
  decode("abc")
} catch (e: any) {
  console.log(e.message)
  // "my custom message"
}
```

### Multiple Override Messages

```ts
import { Schema } from "effect"

const MyString = Schema.String
  .annotations({ message: () => "String custom message" })
  .pipe(
    Schema.minLength(1, { message: () => "minLength custom message" }),
    Schema.maxLength(2, { message: () => "maxLength custom message" })
  )

const decode = Schema.decodeUnknownSync(MyString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message) // String custom message
}

try {
  decode("") 
} catch (e: any) {
  console.log(e.message) // minLength custom message
}

try {
  decode("abc") 
} catch (e: any) {
  console.log(e.message) // maxLength custom message
}
```

### Transformations

```ts
import { ParseResult, Schema } from "effect"

const IntFromString = Schema.transformOrFail(
  Schema.String.annotations({ message: () => "please enter a string" }),
  Schema.Int.annotations({ message: () => "please enter an integer" }),
  {
    strict: true,
    decode: (s, _, ast) => {
      const n = Number(s)
      return Number.isNaN(n)
        ? ParseResult.fail(new ParseResult.Type(ast, s))
        : ParseResult.succeed(n)
    },
    encode: (n) => ParseResult.succeed(String(n))
  }
).annotations({ message: () => "please enter a parseable string" })

const decode = Schema.decodeUnknownSync(IntFromString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message) // please enter a string
}

try {
  decode("1.2")
} catch (e: any) {
  console.log(e.message) // please enter an integer
}

try {
  decode("not a number")
} catch (e: any) {
  console.log(e.message) // please enter a parseable string
}
```

### Compound Schemas

```ts
import { Schema } from "effect"
import { pipe } from "effect"

const schema = Schema.Struct({
  outcomes: pipe(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        text: pipe(
          Schema.String.annotations({
            message: () => "error_invalid_outcome_type"
          }),
          Schema.minLength(1, { message: () => "error_required_field" }),
          Schema.maxLength(50, { message: () => "error_max_length_field" })
        )
      })
    ),
    Schema.minItems(1, { message: () => "error_min_length_field" })
  )
})

Schema.decodeUnknownSync(schema, { errors: "all" })({
  outcomes: []
})
/*
throws
ParseError: { readonly outcomes: an array of at least 1 items }
└─ ["outcomes"]
   └─ error_min_length_field
*/
```

### Effectful Messages

```ts
import { Context, Effect, Either, Option, Schema, ParseResult } from "effect"

class Messages extends Context.Tag("Messages")<
  Messages,
  {
    NonEmpty: string
  }
>() {}

const Name = Schema.NonEmptyString.annotations({
  message: () =>
    Effect.gen(function* (_) {
      const service = yield* _(Effect.serviceOption(Messages))
      return Option.match(service, {
        onNone: () => "Invalid string",
        onSome: (messages) => messages.NonEmpty
      })
    })
})

Schema.decodeUnknownSync(Name)("")
/*
throws:
ParseError: Invalid string
*/
```

### Missing Messages

You can provide custom messages for missing fields or elements using the `missingMessage` annotation.

**Example: Missing Property**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.propertySignature(Schema.String).annotations({
    missingMessage: () => "Name is required"
  })
})

Schema.decodeUnknownSync(Person)({})
/*
throws:
ParseError: { readonly name: string }
└─ ["name"]
   └─ Name is required
*/
```

**Example: Missing Element**

```ts
import { Schema } from "effect"

const Point = Schema.Tuple(
  Schema.element(Schema.Number).annotations({
    missingMessage: () => "X coordinate is required"
  }),
  Schema.element(Schema.Number).annotations({
    missingMessage: () => "Y coordinate is required"
  })
)

Schema.decodeUnknownSync(Point)([], { errors: "all" })
/*
throws:
ParseError: readonly [number, number]
├─ [0]
│  └─ X coordinate is required
└─ [1]
   └─ Y coordinate is required
*/
```

---
title: Error Formatters
excerpt: Error Formatters
bottomNavigation: pagination
---

When working with Effect Schema and encountering errors during decoding or encoding functions, errors can be formatted using the `TreeFormatter` or the `ArrayFormatter`.

## TreeFormatter (default)

The `TreeFormatter` organizes errors in a tree structure, providing a clear hierarchy of issues.

Example:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person)

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.TreeFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
{ readonly name: string; readonly age: number }
└─ ["name"]
   └─ is missing
*/
```

### Customizing the Output

The default error message can be customized with annotations like `identifier`, `title`, or `description`.

Example:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
}).annotations({ title: "Person" })

const result = Schema.decodeUnknownEither(Person)({})
if (Either.isLeft(result)) {
  console.error(ParseResult.TreeFormatter.formatErrorSync(result.left))
}
/*
Person
└─ ["name"]
   └─ is missing
*/
```

### Handling Multiple Errors

To return all encountered errors, pass the `{ errors: "all" }` option:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person, { errors: "all" })

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.TreeFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
{ readonly name: string; readonly age: number }
├─ ["name"]
│  └─ is missing
└─ ["age"]
   └─ is missing
*/
```

### ParseIssueTitle Annotation

To provide additional details in error messages, use the `ParseIssueTitle` annotation.

Example:

```ts
import type { ParseResult } from "effect"
import { Schema } from "effect"

const getOrderItemId = ({ actual }: ParseResult.ParseIssue) => {
  if (Schema.is(Schema.Struct({ id: Schema.String }))(actual)) {
    return `OrderItem with id: ${actual.id}`
  }
}

const OrderItem = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  price: Schema.Number
}).annotations({
  identifier: "OrderItem",
  parseIssueTitle: getOrderItemId
})

const getOrderId = ({ actual }: ParseResult.ParseIssue) => {
  if (Schema.is(Schema.Struct({ id: Schema.Number }))(actual)) {
    return `Order with id: ${actual.id}`
  }
}

const Order = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  items: Schema.Array(OrderItem)
}).annotations({
  identifier: "Order",
  parseIssueTitle: getOrderId
})

const decode = Schema.decodeUnknownSync(Order, { errors: "all" })

decode({})
/*
throws
ParseError: Order
├─ ["id"]
│  └─ is missing
├─ ["name"]
│  └─ is missing
└─ ["items"]
   └─ is missing
*/

decode({ id: 1 })
/*
throws
ParseError: Order with id: 1
├─ ["name"]
│  └─ is missing
└─ ["items"]
   └─ is missing
*/

decode({ id: 1, items: [{ id: "22b", price: "100" }] })
/*
throws
ParseError: Order with id: 1
├─ ["name"]
│  └─ is missing
└─ ["items"]
   └─ ReadonlyArray<OrderItem>
      └─ [0]
         └─ OrderItem with id: 22b
            ├─ ["name"]
            │  └─ is missing
            └─ ["price"]
               └─ Expected a number, actual "100"
*/
```

## ArrayFormatter

The `ArrayFormatter` formats errors as an array of objects, each representing a distinct issue.

Example:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person)

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.ArrayFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
[ { _tag: 'Missing', path: [ 'name' ], message: 'is missing' } ]
*/
```

### Handling Multiple Errors

To return all encountered errors, pass the `{ errors: "all" }` option:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person, { errors: "all" })

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.ArrayFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
[
  { _tag: 'Missing', path: [ 'name' ], message: 'is missing' },
  { _tag: 'Missing', path: [ 'age' ], message: 'is missing' }
]
*/
```

## React Hook Form

For React form validation, `@hookform/resolvers` offers an adapter for `effect/Schema`, allowing integration with React Hook Form for enhanced validation processes. For detailed instructions, visit the official npm package page: React Hook Form Resolvers.

# Class APIs

When working with schemas, you can use the `Schema.Class` utility, which offers advantages for common use cases:

- **All-in-One Definition**: Define both a schema and an opaque type simultaneously.
- **Shared Functionality**: Incorporate shared functionality using class methods or getters.
- **Value Hashing and Equality**: Built-in capability for checking value equality and applying hashing.

## Definition

To define a `Class` with `effect/Schema`, provide:

- The type of the class.
- A unique identifier for the class.
- The desired fields.

**Example**

```ts
import { Schema } from "effect"

class Person extends Schema.Class<Person>("Person")({
  id: Schema.Number,
  name: Schema.NonEmptyString
}) {}
```

In this setup, `Person` is a class with `id` as a number and `name` as a non-empty string.

```ts
console.log(new Person({ id: 1, name: "John" }))
// Output: Person { id: 1, name: 'John' }

console.log(Person.make({ id: 1, name: "John" }))
// Output: Person { id: 1, name: 'John' }
```

### Classes Without Arguments

For schemas without fields, define a class with an empty object:

```ts
class NoArgs extends Schema.Class<NoArgs>("NoArgs")({}) {}

const noargs1 = new NoArgs();
const noargs2 = new NoArgs({});
```

## Class Constructor as a Validator

The constructor checks that provided properties adhere to the schema's rules:

```ts
class Person extends Schema.Class<Person>("Person")({
  id: Schema.Number,
  name: Schema.NonEmptyString
}) {}

// Valid instance
const john = new Person({ id: 1, name: "John" });
```

Invalid properties throw an error:

```ts
new Person({ id: 1, name: "" }); // Throws ParseError
```

To bypass validation:

```ts
const john = new Person({ id: 1, name: "" }, true);
```

## Hashing and Equality

Instances support the `Equal` trait for easy comparison:

```ts
const john1 = new Person({ id: 1, name: "John" });
const john2 = new Person({ id: 1, name: "John" });

console.log(Equal.equals(john1, john2)); // Output: true
```

For arrays, use `Schema.Data` with `Data.array` for deep equality:

```ts
const john1 = new Person({
  id: 1,
  name: "John",
  hobbies: Data.array(["reading", "coding"])
});
const john2 = new Person({
  id: 1,
  name: "John",
  hobbies: Data.array(["reading", "coding"])
});

console.log(Equal.equals(john1, john2)); // Output: true
```

## Custom Getters and Methods

Enhance schema classes with custom getters and methods:

```ts
class Person extends Schema.Class<Person>("Person")({
  id: Schema.Number,
  name: Schema.NonEmptyString
}) {
  get upperName() {
    return this.name.toUpperCase();
  }
}

const john = new Person({ id: 1, name: "John" });
console.log(john.upperName); // Output: "JOHN"
```

## Using Classes as Schemas

Classes can be used wherever a schema is expected:

```ts
const Persons = Schema.Array(Person);
```

### The fields Property

Access the `fields` static property for defined fields:

```ts
Person.fields;
```

## Annotations and Transformations

Classes implicitly form a schema transformation from a structured type to a class type.

### Adding Annotations

1. **To the Struct Schema**:

```ts
class Person extends Schema.Class<Person>("Person")(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.NonEmptyString
  }).annotations({ identifier: "From" })
) {}
```

2. **To the Class Schema**:

```ts
class Person extends Schema.Class<Person>("Person")(
  {
    id: Schema.Number,
    name: Schema.NonEmptyString
  },
  { identifier: "To" }
) {}
```

## Recursive Schemas

Use `Schema.suspend` for recursive data structures:

```ts
class Category extends Schema.Class<Category>("Category")({
  name: Schema.String,
  subcategories: Schema.Array(
    Schema.suspend((): Schema.Schema<Category> => Category)
  )
}) {}
```

### Mutually Recursive Schemas

Example of two mutually recursive schemas:

```ts
class Expression extends Schema.Class<Expression>("Expression")({
  type: Schema.Literal("expression"),
  value: Schema.Union(
    Schema.Number,
    Schema.suspend((): Schema.Schema<Operation> => Operation)
  )
}) {}

class Operation extends Schema.Class<Operation>("Operation")({
  type: Schema.Literal("operation"),
  operator: Schema.Literal("+", "-"),
  left: Expression,
  right: Expression
}) {}
```

### Recursive Types with Different Encoded and Type

Define an interface for the `Encoded` type:

```ts
interface CategoryEncoded {
  readonly id: string;
  readonly name: string;
  readonly subcategories: ReadonlyArray<CategoryEncoded>;
}

class Category extends Schema.Class<Category>("Category")({
  id: Schema.NumberFromString,
  name: Schema.String,
  subcategories: Schema.Array(
    Schema.suspend((): Schema.Schema<Category, CategoryEncoded> => Category)
  )
}) {}
```

## Tagged Class Variants

Create classes that extend `TaggedClass` and `TaggedError`:

```ts
class TaggedPerson extends Schema.TaggedClass<TaggedPerson>()(
  "TaggedPerson",
  {
    name: Schema.String
  }
) {}

class HttpError extends Schema.TaggedError<HttpError>()("HttpError", {
  status: Schema.Number
}) {}
```

## Extending Existing Classes

Use the `extend` utility to augment existing classes:

```ts
class PersonWithAge extends Person.extend<PersonWithAge>("PersonWithAge")({
  age: Schema.Number
}) {
  get isAdult() {
    return this.age >= 18;
  }
}
```

## Transformations

Enhance a class with transformations:

```ts
export class PersonWithTransform extends Person.transformOrFail<PersonWithTransform>(
  "PersonWithTransform"
)(
  {
    age: Schema.optionalWith(Schema.Number, { exact: true, as: "Option" })
  },
  {
    decode: (input) =>
      Effect.mapBoth(getAge(input.id), {
        onFailure: (e) =>
          new ParseResult.Type(Schema.String.ast, input.id, e.message),
        onSuccess: (age) => ({ ...input, age: Option.some(age) })
      }),
    encode: ParseResult.succeed
  }
) {}
```

Choose between `transformOrFail` and `transformOrFailFrom` based on when you want the transformation to occur.

# Default Constructors

When working with data structures, it's advantageous to construct values that align with a specific schema effortlessly. For this purpose, we offer **default constructors** for several types of schemas, including `Structs`, `Records`, `filters`, and `brands`.

**Warning**: Default constructors linked to a schema `Schema<A, I, R>` specifically relate to the `A` type rather than the `I` type.

## Structs

**Example**

```ts
import { Schema } from "effect"

const Struct = Schema.Struct({
  name: Schema.NonEmptyString
})

// Successful creation
Struct.make({ name: "a" })

// This will cause an error because the name is empty
Struct.make({ name: "" })
/*
throws
ParseError: { readonly name: NonEmptyString }
└─ ["name"]
   └─ NonEmptyString
      └─ Predicate refinement failure
         └─ Expected NonEmptyString, actual ""
*/
```

To bypass validation during instantiation:

```ts
import { Schema } from "effect"

const Struct = Schema.Struct({
  name: Schema.NonEmptyString
})

// Bypasses validation
Struct.make({ name: "" }, true)

// or more explicitly
Struct.make({ name: "" }, { disableValidation: true })
```

## Records

**Example**

```ts
import { Schema } from "effect"

const Record = Schema.Record({
  key: Schema.String,
  value: Schema.NonEmptyString
})

// Successful creation
Record.make({ a: "a", b: "b" })

// This will cause an error because 'b' is empty
Record.make({ a: "a", b: "" })
/*
throws
ParseError: { readonly [x: string]: NonEmptyString }
└─ ["b"]
   └─ NonEmptyString
      └─ Predicate refinement failure
         └─ Expected NonEmptyString, actual ""
*/

// Bypasses validation
Record.make({ a: "a", b: "" }, { disableValidation: true })
```

## Filters

**Example**

```ts
import { Schema } from "effect"

const MyNumber = Schema.Number.pipe(Schema.between(1, 10))

// Successful creation
const n = MyNumber.make(5)

// This will cause an error because the number is outside the valid range
MyNumber.make(20)
/*
throws
ParseError: a number between 1 and 10
└─ Predicate refinement failure
   └─ Expected a number between 1 and 10, actual 20
*/

// Bypasses validation
MyNumber.make(20, { disableValidation: true })
```

## Branded Types

**Example**

```ts
import { Schema } from "effect"

const BrandedNumberSchema = Schema.Number.pipe(
  Schema.between(1, 10),
  Schema.brand("MyNumber")
)

// Successful creation
const n = BrandedNumberSchema.make(5)

// This will cause an error because the number is outside the valid range
BrandedNumberSchema.make(20)
/*
throws
ParseError: a number between 1 and 10 & Brand<"MyNumber">
└─ Predicate refinement failure
   └─ Expected a number between 1 and 10 & Brand<"MyNumber">, actual 20
*/

// Bypasses validation
BrandedNumberSchema.make(20, { disableValidation: true })
```

When utilizing default constructors, it's important to grasp the type of value they generate. In the `BrandedNumberSchema` example, the return type of the constructor is `number & Brand<"MyNumber">`, indicating that the resulting value is a number with the added branding "MyNumber". This differs from the filter example where the return type is simply `number`.

Default constructors are "unsafe" in the sense that if the input does not conform to the schema, the constructor throws an error containing a description of what is wrong. To have a "safe" constructor, you can use `Schema.validateEither`:

```ts
import { Schema } from "effect"

const MyNumber = Schema.Number.pipe(Schema.between(1, 10))

const ctor = Schema.validateEither(MyNumber)

console.log(ctor(5))
/*
{ _id: 'Either', _tag: 'Right', right: 5 }
*/

console.log(ctor(20))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: 'a number between 1 and 10\n' +
      '└─ Predicate refinement failure\n' +
      '   └─ Expected a number between 1 and 10, actual 20'
  }
}
*/
```

## Setting Default Values

The `Schema.withConstructorDefault` function allows you to manage the optionality of a field in your default constructor.

**Example: Without Default**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number
})

// Both name and age are required
Person.make({ name: "John", age: 30 })
```

**Example: With Default**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  )
})

// The age field is optional and defaults to 0
console.log(Person.make({ name: "John" }))
/*
Output:
{ age: 0, name: 'John' }
*/
```

Defaults are **lazily evaluated**, meaning that a new instance of the default is generated every time the constructor is called:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  ),
  timestamp: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => new Date().getTime())
  )
})

console.log(Person.make({ name: "name1" }))
// { age: 0, timestamp: 1714232909221, name: 'name1' }

console.log(Person.make({ name: "name2" }))
// { age: 0, timestamp: 1714232909227, name: 'name2' }
```

Default values are also "portable", meaning that if you reuse the same property signature in another schema, the default is carried over:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  ),
  timestamp: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => new Date().getTime())
  )
})

const AnotherSchema = Schema.Struct({
  foo: Schema.String,
  age: Person.fields.age
})

console.log(AnotherSchema.make({ foo: "bar" })) // => { foo: 'bar', age: 0 }
```

Defaults can also be applied using the `Class` API:

```ts
import { Schema } from "effect"

class Person extends Schema.Class<Person>("Person")({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  ),
  timestamp: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => new Date().getTime())
  )
}) {}

console.log(new Person({ name: "name1" }))
// Person { age: 0, timestamp: 1714400867208, name: 'name1' }

console.log(new Person({ name: "name2" }))
// Person { age: 0, timestamp: 1714400867215, name: 'name2' }
```

# Effect Data Types

## Interop With Data

The Data module in the Effect ecosystem simplifies comparing values for equality without explicit implementations of the Equal and Hash traits. It provides APIs that automatically generate default implementations for equality checks.

```ts
import { Data, Equal } from "effect"

const person1 = Data.struct({ name: "Alice", age: 30 })
const person2 = Data.struct({ name: "Alice", age: 30 })

console.log(Equal.equals(person1, person2)) // true
```

Use the `Schema.Data(schema)` combinator to build a schema that decodes a value `A` to a value with Equal and Hash traits added:

```ts
import { Schema } from "effect"
import { Equal } from "effect"

const schema = Schema.Data(
  Schema.Struct({
    name: Schema.String,
    age: Schema.Number
  })
)

const decode = Schema.decode(schema)

const person1 = decode({ name: "Alice", age: 30 })
const person2 = decode({ name: "Alice", age: 30 })

console.log(Equal.equals(person1, person2)) // true
```

## Config

The `Schema.Config` function enhances configuration validation in applications, integrating structured schema validation with configuration settings.

Function definition:

```ts
Config: <A>(name: string, schema: Schema<A, string>) => Config<A>
```

Parameters:

- **name**: Identifier for the configuration setting.
- **schema**: Schema object describing the expected data type and structure.

Returns a Config object integrated with the application's configuration management system.

Steps:

1. **Fetching Configuration**: Retrieve the configuration value based on its name.
2. **Validation**: Validate the value against the schema. Returns detailed validation errors if discrepancies are found.
3. **Error Formatting**: Errors are formatted using `TreeFormatter.formatErrorSync`.

**Example**

```ts
import { Schema } from "effect"
import { Effect } from "effect"

const myconfig = Schema.Config("Foo", Schema.String.pipe(Schema.minLength(4)))

const program = Effect.gen(function* () {
  const foo = yield* myconfig
  console.log(`ok: ${foo}`)
})

Effect.runSync(program)
```

Test commands:

- **Test with Missing Configuration Data**:
  ```sh
  npx tsx config.ts
  # Output: [(Missing data at Foo: "Expected Foo to exist in the process context")]
  ```
- **Test with Invalid Data**:
  ```sh
  Foo=bar npx tsx config.ts
  # Output: [(Invalid data at Foo: "a string at least 4 character(s) long
  # └─ Predicate refinement failure
  #    └─ Expected a string at least 4 character(s) long, actual "bar"")]
  ```
- **Test with Valid Data**:
  ```sh
  Foo=foobar npx tsx config.ts
  # Output: ok: foobar
  ```

## Option

### Option

- **Decoding**
  - `{ _tag: "None" }` -> `Option.none()`
  - `{ _tag: "Some", value: i }` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> `{ _tag: "None" }`
  - `Option.some(a)` -> `{ _tag: "Some", value: i }`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.Option(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode({ _tag: "None" })) // { _id: 'Option', _tag: 'None' }
console.log(decode({ _tag: "Some", value: "1" })) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // { _tag: 'None' }
console.log(encode(Option.some(1))) // { _tag: 'Some', value: '1' }
```

### OptionFromSelf

- **Decoding**
  - `Option.none()` remains as `Option.none()`.
  - `Option.some(i)` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` remains as `Option.none()`.
  - `Option.some(a)` -> `Option.some(i)`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromSelf(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(Option.none())) // { _id: 'Option', _tag: 'None' }
console.log(decode(Option.some("1"))) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // { _id: 'Option', _tag: 'None' }
console.log(encode(Option.some(1))) // { _id: 'Option', _tag: 'Some', value: '1' }
```

### OptionFromUndefinedOr

- **Decoding**
  - `undefined` -> `Option.none()`.
  - `i` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> `undefined`.
  - `Option.some(a)` -> `i`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromUndefinedOr(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(undefined)) // { _id: 'Option', _tag: 'None' }
console.log(decode("1")) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // undefined
console.log(encode(Option.some(1))) // "1"
```

### OptionFromNullOr

- **Decoding**
  - `null` -> `Option.none()`.
  - `i` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> `null`.
  - `Option.some(a)` -> `i`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromNullOr(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(null)) // { _id: 'Option', _tag: 'None' }
console.log(decode("1")) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // null
console.log(encode(Option.some(1))) // "1"
```

### OptionFromNullishOr

- **Decoding**
  - `null` -> `Option.none()`.
  - `undefined` -> `Option.none()`.
  - `i` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> specified value (undefined or null).
  - `Option.some(a)` -> `i`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromNullishOr(Schema.NumberFromString, undefined)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(null)) // { _id: 'Option', _tag: 'None' }
console.log(decode(undefined)) // { _id: 'Option', _tag: 'None' }
console.log(decode("1")) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // undefined
console.log(encode(Option.some(1))) // "1"
```

### OptionFromNonEmptyTrimmedString

- **Decoding**
  - `s` -> `Option.some(s)`, if `s.trim().length > 0`.
  - `Option.none()` otherwise.
- **Encoding**
  - `Option.none()` -> `""`.
  - `Option.some(s)` -> `s`.

**Example**

```ts
import { Schema } from "effect"

console.log(Schema.decodeSync(Schema.OptionFromNonEmptyTrimmedString)("")) // Option.none()
console.log(Schema.decodeSync(Schema.OptionFromNonEmptyTrimmedString)(" a ")) // Option.some("a")
console.log(Schema.decodeSync(Schema.OptionFromNonEmptyTrimmedString)("a")) // Option.some("a")
```

## Either

### Either

- **Decoding**
  - `{ _tag: "Left", left: li }` -> `Either.left(la)`
  - `{ _tag: "Right", right: ri }` -> `Either.right(ra)`
- **Encoding**
  - `Either.left(la)` -> `{ _tag: "Left", left: li }`
  - `Either.right(ra)` -> `{ _tag: "Right", right: ri }`

**Example**

```ts
import { Schema } from "effect"
import { Either } from "effect"

const schema = Schema.Either({
  left: Schema.Trim,
  right: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode({ _tag: "Left", left: " a " })) // { _id: 'Either', _tag: 'Left', left: 'a' }
console.log(decode({ _tag: "Right", right: "1" })) // { _id: 'Either', _tag: 'Right', right: 1 }

console.log(encode(Either.left("a"))) // { _tag: 'Left', left: 'a' }
console.log(encode(Either.right(1))) // { _tag: 'Right', right: '1' }
```

### EitherFromSelf

- **Decoding**
  - `Either.left(li)` -> `Either.left(la)`
  - `Either.right(ri)` -> `Either.right(ra)`
- **Encoding**
  - `Either.left(la)` -> `Either.left(li)`
  - `Either.right(ra)` -> `Either.right(ri)`

**Example**

```ts
import { Schema } from "effect"
import { Either } from "effect"

const schema = Schema.EitherFromSelf({
  left: Schema.Trim,
  right: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(Either.left(" a "))) // { _id: 'Either', _tag: 'Left', left: 'a' }
console.log(decode(Either.right("1"))) // { _id: 'Either', _tag: 'Right', right: 1 }

console.log(encode(Either.left("a"))) // { _id: 'Either', _tag: 'Left', left: 'a' }
console.log(encode(Either.right(1))) // { _id: 'Either', _tag: 'Right', right: '1' }
```

### EitherFromUnion

- **Decoding**
  - `li` -> `Either.left(la)`
  - `ri` -> `Either.right(ra)`
- **Encoding**
  - `Either.left(la)` -> `li`
  - `Either.right(ra)` -> `ri`

**Example**

```ts
import { Schema } from "effect"
import { Either } from "effect"

const schema = Schema.EitherFromUnion({
  left: Schema.Boolean,
  right: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(true)) // { _id: 'Either', _tag: 'Left', left: true }
console.log(decode("1")) // { _id: 'Either', _tag: 'Right', right: 1 }

console.log(encode(Either.left(true))) // true
console.log(encode(Either.right(1))) // "1"
```

## ReadonlySet

### ReadonlySet

- **Decoding**
  - `ReadonlyArray<I>` -> `ReadonlySet<A>`
- **Encoding**
  - `ReadonlySet<A>` -> `ReadonlyArray<I>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlySet(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(["1", "2", "3"])) // Set(3) { 1, 2, 3 }
console.log(encode(new Set([1, 2, 3]))) // [ '1', '2', '3' ]
```

### ReadonlySetFromSelf

- **Decoding**
  - `ReadonlySet<I>` -> `ReadonlySet<A>`
- **Encoding**
  - `ReadonlySet<A>` -> `ReadonlySet<I>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlySetFromSelf(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(new Set(["1", "2", "3"]))) // Set(3) { 1, 2, 3 }
console.log(encode(new Set([1, 2, 3]))) // Set(3) { '1', '2', '3' }
```

## ReadonlyMap

### ReadonlyMap

- **Decoding**
  - `ReadonlyArray<readonly [KI, VI]>` -> `ReadonlyMap<KA, VA>`
- **Encoding**
  - `ReadonlyMap<KA, VA>` -> `ReadonlyArray<readonly [KI, VI]>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlyMap({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode([
    ["a", "2"],
    ["b", "2"],
    ["c", "3"]
  ])
) // Map(3) { 'a' => 2, 'b' => 2, 'c' => 3 }
console.log(
  encode(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // [ [ 'a', '1' ], [ 'b', '2' ], [ 'c', '3' ] ]
```

### ReadonlyMapFromSelf

- **Decoding**
  - `ReadonlyMap<KI, VI>` -> `ReadonlyMap<KA, VA>`
- **Encoding**
  - `ReadonlyMap<KA, VA>` -> `ReadonlyMap<KI, VI>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlyMapFromSelf({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode(
    new Map([
      ["a", "2"],
      ["b", "2"],
      ["c", "3"]
    ])
  )
) // Map(3) { 'a' => 2, 'b' => 2, 'c' => 3 }
console.log(
  encode(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // Map(3) { 'a' => '1', 'b' => '2', 'c' => '3' }
```

### ReadonlyMapFromRecord

- **Decoding**
  - `{ readonly [x: string]: VI }` -> `ReadonlyMap<KA, VA>`
- **Encoding**
  - `ReadonlyMap<KA, VA>` -> `{ readonly [x: string]: VI }`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlyMapFromRecord({
  key: Schema.NumberFromString,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode({
    "1": "4",
    "2": "5",
    "3": "6"
  })
) // Map(3) { 1 => 4, 2 => 5, 3 => 6 }
console.log(
  encode(
    new Map([
      [1, 4],
      [2, 5],
      [3, 6]
    ])
  )
) // { '1': '4', '2': '5', '3': '6' }
```

## HashSet

### HashSet

- **Decoding**
  - `ReadonlyArray<I>` -> `HashSet<A>`
- **Encoding**
  - `HashSet<A>` -> `ReadonlyArray<I>`

**Example**

```ts
import { Schema } from "effect"
import { HashSet } from "effect"

const schema = Schema.HashSet(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(["1", "2", "3"])) // { _id: 'HashSet', values: [ 1, 2, 3 ] }
console.log(encode(HashSet.fromIterable([1, 2, 3]))) // [ '1', '2', '3' ]
```

### HashSetFromSelf

- **Decoding**
  - `HashSet<I>` -> `HashSet<A>`
- **Encoding**
  - `HashSet<A>` -> `HashSet<I>`

**Example**

```ts
import { Schema } from "effect"
import { HashSet } from "effect"

const schema = Schema.HashSetFromSelf(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(HashSet.fromIterable(["1", "2", "3"]))) // { _id: 'HashSet', values: [ 1, 2, 3 ] }
console.log(encode(HashSet.fromIterable([1, 2, 3]))) // { _id: 'HashSet', values: [ '1', '3', '2' ] }
```

## HashMap

### HashMap

- **Decoding**
  - `ReadonlyArray<readonly [KI, VI]>` -> `HashMap<KA, VA>`
- **Encoding**
  - `HashMap<KA, VA>` -> `ReadonlyArray<readonly [KI, VI]>`

**Example**

```ts
import { Schema } from "effect"
import { HashMap } from "effect"

const schema = Schema.HashMap({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode([
    ["a", "2"],
    ["b", "2"],
    ["c", "3"]
  ])
) // { _id: 'HashMap', values: [ [ 'a', 2 ], [ 'c', 3 ], [ 'b', 2 ] ] }
console.log(
  encode(
    HashMap.fromIterable([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // [ [ 'a', '1' ], [ 'c', '3' ], [ 'b', '2' ] ]
```

### HashMapFromSelf

- **Decoding**
  - `HashMap<KI, VI>` -> `HashMap<KA, VA>`
- **Encoding**
  - `HashMap<KA, VA>` -> `HashMap<KI, VI>`

**Example**

```ts
import { Schema } from "effect"
import { HashMap } from "effect"

const schema = Schema.HashMapFromSelf({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode(
    HashMap.fromIterable([
      ["a", "2"],
      ["b", "2"],
      ["c", "3"]
    ])
  )
) // { _id: 'HashMap', values: [ [ 'a', 2 ], [ 'c', 3 ], [ 'b', 2 ] ] }
console.log(
  encode(
    HashMap.fromIterable([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // { _id: 'HashMap', values: [ [ 'a', '1' ], [ 'c', '3' ], [ 'b', '2' ] ] }
```

## SortedSet

### SortedSet

- **Decoding**
  - `ReadonlyArray<I>` -> `SortedSet<A>`
- **Encoding**
  - `SortedSet<A>` -> `ReadonlyArray<I>`

**Example**

```ts
import { Schema } from "effect"
import { Number, SortedSet } from "effect"

const schema = Schema.SortedSet(Schema.NumberFromString, Number.Order)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(["1", "2", "3"])) // { _id: 'SortedSet', values: [ 1, 2, 3 ] }
console.log(encode(SortedSet.fromIterable(Number.Order)([1, 2, 3]))) // [ '1', '2', '3' ]
```

### SortedSetFromSelf

- **Decoding**
  - `SortedSet<I>` -> `SortedSet<A>`
- **Encoding**
  - `SortedSet<A>` -> `SortedSet<I>`

**Example**

```ts
import { Schema } from "effect"
import { Number, SortedSet, String } from "effect"

const schema = Schema.SortedSetFromSelf(
  Schema.NumberFromString,
  Number.Order,
  String.Order
)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(SortedSet.fromIterable(String.Order)(["1", "2", "3"]))) // { _id: 'SortedSet', values: [ 1, 2, 3 ] }
console.log(encode(SortedSet.fromIterable(Number.Order)([1, 2, 3]))) // { _id: 'SortedSet', values: [ '1', '2', '3' ] }
```

## Duration

### Duration

Converts hrtime (i.e. `[seconds: number, nanos: number]`) into a `Duration`.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.Duration // Schema<Duration, number>
const decode = Schema.decodeUnknownSync(schema)

console.log(decode([0, 0])) // { _id: 'Duration', _tag: 'Millis', millis: 0 }
console.log(decode([5000, 0])) // { _id: 'Duration', _tag: 'Nanos', hrtime: [ 5000, 0 ] }
```

### DurationFromSelf

The `DurationFromSelf` schema validates that a given value conforms to the `Duration` type from the `effect` library.

**Example**

```ts
import { Schema } from "effect"
import { Duration } from "effect"

const schema = Schema.DurationFromSelf
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(Duration.seconds(2))) // { _id: 'Duration', _tag: 'Millis', millis: 2000 }
console.log(decode(null)) // throws ParseError: Expected DurationFromSelf, actual null
```

### DurationFromMillis

Converts a `number` into a `Duration` where the number represents milliseconds.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.DurationFromMillis // Schema<Duration, number>
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(0)) // { _id: 'Duration', _tag: 'Millis', millis: 0 }
console.log(decode(5000)) // { _id: 'Duration', _tag: 'Millis', millis: 5000 }
```

### DurationFromNanos

Converts a `BigInt` into a `Duration` where the number represents nanoseconds.

**Example**

```ts
// @target: ES2020
import { Schema } from "effect"

const schema = Schema.DurationFromNanos // Schema<Duration, BigInt>
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(0n)) // { _id: 'Duration', _tag: 'Millis', millis: 0 }
console.log(decode(5000000000n)) // { _id: 'Duration', _tag: 'Nanos', hrtime: [ 5, 0 ] }
```

### clampDuration

Clamps a `Duration` between a minimum and maximum value.

**Example**

```ts
import { Schema } from "effect"
import { Duration } from "effect"

const schema = Schema.DurationFromSelf.pipe(
  Schema.clampDuration("5 seconds", "10 seconds")
)

const decode = Schema.decodeUnknownSync(schema)

console.log(decode(Duration.decode("2 seconds"))) // { _id: 'Duration', _tag: 'Millis', millis: 5000 }
console.log(decode(Duration.decode("6 seconds"))) // { _id: 'Duration', _tag: 'Millis', millis: 6000 }
console.log(decode(Duration.decode("11 seconds"))) // { _id: 'Duration', _tag: 'Millis', millis: 10000 }
```

## Redacted

### Redacted

The `Schema.Redacted` function handles sensitive information by converting a `string` into a Redacted object, ensuring sensitive data is not exposed in the application's output.

**Example**

```ts
import { Schema } from "effect"

// Schema.Redacted<typeof Schema.String>
const schema = Schema.Redacted(Schema.String)
const decode = Schema.decodeUnknownSync(schema)

console.log(decode("keep it secret, keep it safe")) // {}
```

When successfully decoding a `Redacted`, the output is obscured (`{}`) to prevent revealing the actual secret.

<Warning>
  When composing the `Redacted` schema with other schemas, care must be taken as decoding or encoding errors could expose sensitive information.
</Warning>

**Example Showing Potential Data Exposure**

```ts
import { Schema } from "effect"
import { Redacted } from "effect"

const schema = Schema.Trimmed.pipe(
  Schema.compose(Schema.Redacted(Schema.String))
)

console.log(Schema.decodeUnknownEither(schema)(" SECRET"))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed (a string with no leading or trailing whitespace), actual " SECRET"'
  }
}
*/
console.log(Schema.encodeEither(schema)(Redacted.make(" SECRET")))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed (a string with no leading or trailing whitespace), actual " SECRET"'
  }
}
*/
```

To reduce the risk of sensitive information leakage in error messages, customize the error messages to obscure sensitive details:

```ts
import { Schema } from "effect"
import { Redacted } from "effect"

const schema = Schema.Trimmed.annotations({
  message: () => "Expected Trimmed, actual <redacted>"
}).pipe(Schema.compose(Schema.Redacted(Schema.String)))

console.log(Schema.decodeUnknownEither(schema)(" SECRET"))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed, actual <redacted>'
  }
}
*/
console.log(Schema.encodeEither(schema)(Redacted.make(" SECRET")))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed, actual <redacted>'
  }
}
*/
```

### RedactedFromSelf

The `Schema.RedactedFromSelf` schema validates that a given value conforms to the `Redacted` type from the `effect` library.

**Example**

```ts
import { Schema } from "effect"
import { Redacted } from "effect"

const schema = Schema.RedactedFromSelf(Schema.String)
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(Redacted.make("mysecret"))) // {}
console.log(decode(null)) // throws ParseError: Expected Redacted(<redacted>), actual null
```

When successfully decoding a `Redacted`, the output is obscured (`{}`) to prevent revealing the actual secret.

---
title: Arbitrary
excerpt: Arbitrary
bottomNavigation: pagination
---

## Generating Arbitraries

The `Arbitrary.make` function creates random values that align with a specific `Schema<A, I, R>`. It returns an `Arbitrary<A>` from the fast-check library, useful for generating random test data adhering to defined schema constraints.

**Example**

```ts
import { Arbitrary, FastCheck, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.NumberFromString.pipe(Schema.int(), Schema.between(0, 200))
})

const PersonArbitraryType = Arbitrary.make(Person)

console.log(FastCheck.sample(PersonArbitraryType, 2))
/*
Example Output:
[ { name: 'q r', age: 1 }, { name: '&|', age: 133 } ]
*/
```

The entirety of fast-check's API is accessible via the `FastCheck` export, allowing direct use of all its functionalities within your projects.

## Transformations and Arbitrary Generation

Understanding how transformations and filters are considered within a schema is crucial for generating arbitrary data:

**Warning**: Filters applied before the last transformation in the transformation chain are not considered during the generation of arbitrary data.

**Illustrative Example**

```ts
import { Arbitrary, FastCheck, Schema } from "effect"

const schema1 = Schema.compose(Schema.NonEmptyString, Schema.Trim).pipe(
  Schema.maxLength(500)
)

console.log(FastCheck.sample(Arbitrary.make(schema1), 2))
/*
Example Output:
[ '', '"Ry' ]
*/

const schema2 = Schema.Trim.pipe(
  Schema.nonEmptyString(),
  Schema.maxLength(500)
)

console.log(FastCheck.sample(Arbitrary.make(schema2), 2))
/*
Example Output:
[ ']H+MPXgZKz', 'SNS|waP~\\' ]
*/
```

- **Schema 1**: Ignores `Schema.NonEmptyString` due to its position before transformations.
- **Schema 2**: Adheres to all filters because they are sequenced correctly after transformations.

### Best Practices

For effective data generation, organize transformations and filters methodically:

1. Filters for the initial type (`I`).
2. Transformations.
3. Filters for the transformed type (`A`).

This setup ensures precise and well-defined data processing.

**Illustrative Example**

Avoid mixing transformations and filters:

```ts
import { Schema } from "effect"

const schema = Schema.compose(Schema.Lowercase, Schema.Trim)
```

Prefer a structured approach:

```ts
import { Schema } from "effect"

const schema = Schema.transform(
  Schema.String,
  Schema.String.pipe(Schema.trimmed(), Schema.lowercased()),
  {
    strict: true,
    decode: (s) => s.trim().toLowerCase(),
    encode: (s) => s
  }
)
```

## Customizing Arbitrary Data Generation

Define how arbitrary data is generated using the `arbitrary` annotation in your schema definitions.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.Number.annotations({
  arbitrary: (/**typeParameters**/) => (fc) => fc.nat()
})
```

The annotation allows access to type parameters via the first argument and the fast-check library export. This setup enables returning an `Arbitrary` that generates the desired data type.

**Warning**: Customizing a schema can disrupt previously applied filters. Filters set after customization will remain effective, while those applied before will be disregarded.

**Illustrative Example**

```ts
import { Arbitrary, FastCheck, Schema } from "effect"

const problematic = Schema.Number.pipe(Schema.positive()).annotations({
  arbitrary: () => (fc) => fc.integer()
})

console.log(FastCheck.sample(Arbitrary.make(problematic), 2))
/*
Example Output:
[ -1600163302, -6 ]
*/

const improved = Schema.Number.annotations({
  arbitrary: () => (fc) => fc.integer()
}).pipe(Schema.positive())

console.log(FastCheck.sample(Arbitrary.make(improved), 2))
/*
Example Output:
[ 7, 1518247613 ]
*/
```

# JSON Schema

## Generating JSON Schemas

The `JSONSchema.make` function generates a JSON Schema from a predefined schema.

**Example**

Define a schema for a "Person" with properties "name" (string) and "age" (number):

```ts
import { JSONSchema, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "additionalProperties": false
}
```

The `JSONSchema.make` function traverses the schema from the most nested component, incorporating each refinement, and stops at the first transformation encountered.

**Modification Example**

Modify the schema of the `age` field:

```ts
import { JSONSchema, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number.pipe(
    Schema.int(),
    Schema.clamp(1, 10)
  )
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "description": "an integer",
      "title": "integer"
    }
  },
  "additionalProperties": false
}
```

## Specific Outputs for Schema Types

### Literals

Literals are transformed into `enum` types within JSON Schema.

**Single literal**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Literal("a")

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "enum": [
    "a"
  ]
}
```

**Union of literals**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Literal("a", "b")

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "enum": [
    "a",
    "b"
  ]
}
```

### Void

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Void

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/void",
  "title": "void"
}
```

### Any

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Any

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/any",
  "title": "any"
}
```

### Unknown

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Unknown

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/unknown",
  "title": "unknown"
}
```

### Object

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Object

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/object",
  "anyOf": [
    {
      "type": "object"
    },
    {
      "type": "array"
    }
  ],
  "description": "an object in the TypeScript meaning, i.e. the `object` type",
  "title": "object"
}
```

### String

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.String

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string"
}
```

### Number

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Number

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "number"
}
```

### Boolean

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Boolean

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "boolean"
}
```

### Tuples

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Tuple(Schema.String, Schema.Number)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 2,
  "items": [
    {
      "type": "string"
    },
    {
      "type": "number"
    }
  ],
  "additionalItems": false
}
```

### Arrays

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Array(Schema.String)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

### Non Empty Arrays

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.String)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 1,
  "items": {
    "type": "string"
  }
}
```

### Structs

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "additionalProperties": false
}
```

### Records

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Record({
  key: Schema.String,
  value: Schema.Number
})

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [],
  "properties": {},
  "patternProperties": {
    "": {
      "type": "number"
    }
  }
}
```

### Mixed Structs with Records

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct(
  {
    name: Schema.String,
    age: Schema.Number
  },
  Schema.Record({
    key: Schema.String,
    value: Schema.Union(Schema.String, Schema.Number)
  })
)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "patternProperties": {
    "": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        }
      ]
    }
  }
}
```

### Enums

```ts
import { JSONSchema, Schema } from "effect"

enum Fruits {
  Apple,
  Banana
}

const schema = Schema.Enums(Fruits)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$comment": "/schemas/enums",
  "anyOf": [
    {
      "title": "Apple",
      "enum": [
        0
      ]
    },
    {
      "title": "Banana",
      "enum": [
        1
      ]
    }
  ]
}
```

### Template Literals

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.TemplateLiteral(Schema.Literal("a"), Schema.Number)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string",
  "description": "a template literal",
  "pattern": "^a[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$"
}
```

### Unions

Unions are expressed using `anyOf` or `enum`, depending on the types involved.

**Generic Union**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Union(Schema.String, Schema.Number)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "anyOf": [
    {
      "type": "string"
    },
    {
      "type": "number"
    }
  ]
}
```

**Union of literals**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Literal("a", "b")

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "enum": [
    "a",
    "b"
  ]
}
```

## Identifier Annotations

Augment schemas with `identifier` annotations for better structure and maintainability. Annotated schemas are included within a "$defs" object property.

```ts
import { JSONSchema, Schema } from "effect"

const Name = Schema.String.annotations({ identifier: "Name" })
const Age = Schema.Number.annotations({ identifier: "Age" })
const Person = Schema.Struct({
  name: Name,
  age: Age
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "$ref": "#/$defs/Name"
    },
    "age": {
      "$ref": "#/$defs/Age"
    }
  },
  "additionalProperties": false,
  "$defs": {
    "Name": {
      "type": "string",
      "description": "a string",
      "title": "string"
    },
    "Age": {
      "type": "number",
      "description": "a number",
      "title": "number"
    }
  }
}
```

## Standard JSON Schema Annotations

Standard annotations like `title`, `description`, `default`, and `examples` enrich schemas with metadata.

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.String.annotations({
  description: "my custom description",
  title: "my custom title",
  default: "",
  examples: ["a", "b"]
})

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string",
  "description": "my custom description",
  "title": "my custom title",
  "examples": [
    "a",
    "b"
  ],
  "default": ""
}
```

### Adding annotations to Struct properties

Add annotations directly to property signatures for clarity.

```ts
import { JSONSchema, Schema } from "effect"

const Person = Schema.Struct({
  firstName: Schema.propertySignature(Schema.String).annotations({
    title: "First name"
  }),
  lastName: Schema.propertySignature(Schema.String).annotations({
    title: "Last Name"
  })
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last Name"
    }
  },
  "additionalProperties": false
}
```

## Recursive and Mutually Recursive Schemas

Use identifier annotations for recursive schemas to ensure correct references.

```ts
import { JSONSchema, Schema } from "effect"

interface Category {
  readonly name: string
  readonly categories: ReadonlyArray<Category>
}

const Category = Schema.Struct({
  name: Schema.String,
  categories: Schema.Array(
    Schema.suspend((): Schema.Schema<Category> => Category)
  )
}).annotations({ identifier: "Category" })

const jsonSchema = JSONSchema.make(Category)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/$defs/Category",
  "$defs": {
    "Category": {
      "type": "object",
      "required": [
        "name",
        "categories"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "categories": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Category"
          }
        }
      },
      "additionalProperties": false
    }
  }
}
```

## Custom JSON Schema Annotations

Enhance schemas with custom annotations for unsupported data types.

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct({
  a_bigint_field: Schema.BigIntFromSelf
})

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

This will throw an error due to missing annotation.

To address this, add a custom annotation:

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct({
  a_bigint_field: Schema.BigIntFromSelf.annotations({
    jsonSchema: {
      type: "some custom way to represent a bigint in JSON Schema"
    }
  })
})

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "a_bigint_field"
  ],
  "properties": {
    "a_bigint_field": {
      "type": "some custom way to represent a bigint in JSON Schema"
    }
  },
  "additionalProperties": false
}
```

### Refinements

Attach a JSON Schema annotation to refinements.

```ts
import { JSONSchema, Schema } from "effect"

const Positive = Schema.Number.pipe(
  Schema.filter((n) => n > 0, {
    jsonSchema: { minimum: 0 }
  })
)

const schema = Positive.pipe(
  Schema.filter((n) => n <= 10, {
    jsonSchema: { maximum: 10 }
  })
)

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "number",
  "minimum": 0,
  "maximum": 10
}
```

## Specialized JSON Schema Generation with Schema.parseJson

Using `Schema.parseJson`, JSON Schema generation is specialized.

**Example**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.parseJson(
  Schema.Struct({
    a: Schema.parseJson(Schema.NumberFromString)
  })
)

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "a"
  ],
  "properties": {
    "a": {
      "type": "string"
    }
  },
  "additionalProperties": false
}
```

---
title: Equivalence
excerpt: Equivalence
bottomNavigation: pagination
---

## Generating Equivalences

The `Schema.equivalence` function allows you to generate an Equivalence based on a schema definition. This function is designed to compare data structures for equivalence according to the rules defined in the schema.

**Example**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const PersonEquivalence = Schema.equivalence(Person)

const john = { name: "John", age: 23 }
const alice = { name: "Alice", age: 30 }

console.log(PersonEquivalence(john, { name: "John", age: 23 })) // Output: true
console.log(PersonEquivalence(john, alice)) // Output: false
```

## Customizing Equivalence Generation

You can define how equivalence is generated by utilizing the `equivalence` annotation in your schema definitions.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.String.annotations({
  equivalence: (/**typeParameters**/) => (s1, s2) =>
    s1.charAt(0) === s2.charAt(0)
})

console.log(Schema.equivalence(schema)("aaa", "abb")) // Output: true
```

In this setup, the `equivalence` annotation takes any type parameters provided (`typeParameters`) and two values for comparison, returning a boolean based on the desired condition of equivalence.

---
title: Pretty
excerpt: Pretty
bottomNavigation: pagination
---

## Generating Pretty Printers

The `Pretty.make` function creates pretty printers that output a formatted string representation of values according to a given schema.

**Example**

```ts
import { Pretty, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const PersonPretty = Pretty.make(Person)

// returns a string representation of the object
console.log(PersonPretty({ name: "Alice", age: 30 }))
/*
Output:
'{ "name": "Alice", "age": 30 }'
*/
```

## Customizing Pretty Printer Generation

You can customize the output of the pretty printer using the `pretty` annotation within your schema definitions.

**Example**

```ts
import { Pretty, Schema } from "effect"

const schema = Schema.Number.annotations({
  pretty: (/**typeParameters**/) => (value) => `my format: ${value}`
})

console.log(Pretty.make(schema)(1)) // my format: 1
```

In this setup, the `pretty` annotation formats the value into a string.

# Schema to X

## Overview
Schema to X is a framework designed to facilitate the transformation of schema definitions into various formats. This document outlines the key components and usage of the framework.

## Key Components
- **Schema Definition**: The initial structure that outlines the data model.
- **Transformation Engine**: The core component responsible for converting schema definitions into the desired format.
- **Output Formats**: Supported formats include JSON, XML, and YAML.

## Usage
1. **Define Schema**: Create a schema definition using the supported syntax.
2. **Configure Transformation**: Set up the transformation parameters as needed.
3. **Execute Transformation**: Run the transformation engine to generate the output.

## Example
```json
{
  "schema": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "age": { "type": "integer" }
    }
  }
}
```

## Output
The output will be generated based on the specified format and schema definition.

## Conclusion
Schema to X provides a robust solution for schema transformation, enabling developers to easily convert data models into various formats for different applications.

# Schema

## Overview
Schema refers to the structured framework that defines the organization of data within a database or application. It outlines how data is stored, organized, and accessed.

## Components
- **Tables**: Collections of related data entries.
- **Fields**: Individual data points within a table.
- **Relationships**: Connections between tables that define how data interacts.

## Types of Schema
- **Physical Schema**: The actual storage of data on hardware.
- **Logical Schema**: The abstract representation of the data structure.
- **View Schema**: A specific presentation of data tailored for user access.

## Best Practices
- Ensure normalization to reduce redundancy.
- Use clear naming conventions for tables and fields.
- Document relationships and constraints for clarity.

## Tools
- Database Management Systems (DBMS) for schema creation and management.
- ERD (Entity-Relationship Diagram) tools for visual representation.

## Conclusion
A well-defined schema is crucial for efficient data management and retrieval, ensuring data integrity and accessibility.

# Introduction

Welcome to the documentation for `@effect/platform`, a library designed for creating platform-independent abstractions (Node.js, Bun, browsers).

With `@effect/platform`, you can incorporate abstract services like `Terminal`, `FileSystem`, or `Path` into your program. Later, during the assembly of the final application, you can provide specific layers for the target platform using the corresponding packages:

- `@effect/platform-node` for Node.js
- `@effect/platform-bun` for Bun
- `@effect/platform-browser` for browsers

## Installation

To install the **beta** version:

```
npm install @effect/platform
```

## Example: Platform-Agnostic Program

Below is a simple example using the `Path` module to create a file path. This program is compatible with multiple environments:

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})
```

## Running the Program in Node.js

First, install the Node.js-specific package:

```
npm install @effect/platform-node
```

Update the program to load the Node.js-specific context:

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"
import { NodeContext, NodeRuntime } from "@effect/platform-node"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```

Finally, run the program in Node.js using `tsx`:

```
npx tsx index.ts
# Output: tmp/file.txt
```

## Running the Program in Bun

To run the same program in Bun, first install the Bun-specific package:

```
npm install @effect/platform-bun
```

Update the program to use the Bun-specific context:

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"
import { BunContext, BunRuntime } from "@effect/platform-bun"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})

BunRuntime.runMain(program.pipe(Effect.provide(BunContext.layer)))
```

Run the program in Bun:

```
bun index.ts
# Output: tmp/file.txt
```

---
title: Command
excerpt: Creating and running a command with the specified process name and an optional list of arguments
bottomNavigation: pagination
---

The `@effect/platform/Command` module provides a way to create and run commands with the specified process name and an optional list of arguments.

## Creating Commands

The `Command.make` function generates a command object, which includes details such as the process name, arguments, and environment.

**Example**

```ts
import { Command } from "@effect/platform"

const command = Command.make("ls", "-al")
console.log(command)
/*
{
  _id: '@effect/platform/Command',
  _tag: 'StandardCommand',
  command: 'ls',
  args: [ '-al' ],
  env: {},
  cwd: { _id: 'Option', _tag: 'None' },
  shell: false,
  gid: { _id: 'Option', _tag: 'None' },
  uid: { _id: 'Option', _tag: 'None' }
}
*/
```

This command object does not execute until run by an executor.

## Running Commands

You need a `CommandExecutor` to run the command, which can capture output in various formats such as strings, lines, or streams.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("ls", "-al")

const program = Effect.gen(function* () {
  const output = yield* Command.string(command)
  console.log(output)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```

### Output Formats

- `string`: Runs the command returning the output as a string (with the specified encoding).
- `lines`: Runs the command returning the output as an array of lines (with the specified encoding).
- `stream`: Runs the command returning the output as a stream of `Uint8Array` chunks.
- `streamLines`: Runs the command returning the output as a stream of lines (with the specified encoding).

### exitCode

If all you need is the exit code of the command, you can use the `Command.exitCode` function.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("ls", "-al")

const program = Effect.gen(function* () {
  const exitCode = yield* Command.exitCode(command)
  console.log(exitCode)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
// Output: 0
```

## Custom Environment Variables

You can customize environment variables in a command by using `Command.env`.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("echo", "-n", "$MY_CUSTOM_VAR").pipe(
  Command.env({
    MY_CUSTOM_VAR: "Hello, this is a custom environment variable!"
  }),
  Command.runInShell(true)
)

const program = Effect.gen(function* () {
  const output = yield* Command.string(command)
  console.log(output)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
// Output: Hello, this is a custom environment variable!
```

## Standard Input

You can send input directly to a command's standard input using the `Command.feed` function.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("cat").pipe(Command.feed("Hello"))

const program = Effect.gen(function* () {
  console.log(yield* Command.string(command))
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
// Output: Hello
```

## Fetching Process Details

You can obtain details about a running process like `exitCode`, `stdout`, and `stderr`.

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect, Stream, String, pipe } from "effect"

const runString = <E, R>(
  stream: Stream.Stream<Uint8Array, E, R>
): Effect.Effect<string, E, R> =>
  stream.pipe(
    Stream.decodeText(),
    Stream.runFold(String.empty, String.concat)
  )

const program = Effect.gen(function* () {
  const command = Command.make("ls")

  const [exitCode, stdout, stderr] = yield* pipe(
    Command.start(command),
    Effect.flatMap((process) =>
      Effect.all(
        [
          process.exitCode,
          runString(process.stdout),
          runString(process.stderr)
        ],
        { concurrency: 3 }
      )
    )
  )
  console.log({ exitCode, stdout, stderr })
})

NodeRuntime.runMain(
  Effect.scoped(program).pipe(Effect.provide(NodeContext.layer))
)
```

## Streaming stdout to process.stdout

To run a command and stream its `stdout` directly to `process.stdout`:

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const program = Command.make("cat", "./some-file.txt").pipe(
  Command.stdout("inherit"),
  Command.exitCode
)

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```

# FileSystem

The `@effect/platform/FileSystem` module provides a set of operations for reading and writing from/to the file system.

## Basic Usage

The module provides a single `FileSystem` tag, which acts as the gateway for interacting with the filesystem.

```ts
import { FileSystem } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // use `fs` to operate on the file system
})
```

The `FileSystem` interface includes the following operations:

- **access**: Check if a file can be accessed. Optionally specify the level of access.
- **copy**: Copy a file or directory from `fromPath` to `toPath`. Equivalent to `cp -r`.
- **copyFile**: Copy a file from `fromPath` to `toPath`.
- **chmod**: Change the permissions of a file.
- **chown**: Change the owner and group of a file.
- **exists**: Check if a path exists.
- **link**: Create a hard link from `fromPath` to `toPath`.
- **makeDirectory**: Create a directory at `path`. Optionally specify the mode and whether to recursively create nested directories.
- **makeTempDirectory**: Create a temporary directory inside the system's default temporary directory.
- **makeTempDirectoryScoped**: Create a temporary directory inside a scope. Automatically deleted when the scope is closed.
- **makeTempFile**: Create a temporary file with a randomly generated name.
- **makeTempFileScoped**: Create a temporary file inside a scope. Automatically deleted when the scope is closed.
- **open**: Open a file at `path` with specified options. The file handle is automatically closed when the scope is closed.
- **readDirectory**: List the contents of a directory. Recursively list nested directories by setting the `recursive` option.
- **readFile**: Read the contents of a file.
- **readFileString**: Read the contents of a file as a string.
- **readLink**: Read the destination of a symbolic link.
- **realPath**: Resolve a path to its canonicalized absolute pathname.
- **remove**: Remove a file or directory. Set `recursive` to `true` to recursively remove nested directories.
- **rename**: Rename a file or directory.
- **sink**: Create a writable `Sink` for the specified `path`.
- **stat**: Get information about a file at `path`.
- **stream**: Create a readable `Stream` for the specified `path`.
- **symlink**: Create a symbolic link from `fromPath` to `toPath`.
- **truncate**: Truncate a file to a specified length. If not specified, truncate to length `0`.
- **utimes**: Change the file system timestamps of the file at `path`.
- **watch**: Watch a directory or file for changes.
- **writeFile**: Write data to a file at `path`.
- **writeFileString**: Write a string to a file at `path`.

## Example: using `readFileString`

```ts
import { FileSystem } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Reading the content of the same file where this code is written
  const content = yield* fs.readFileString("./index.ts", "utf8")
  console.log(content)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```

---
title: KeyValueStore
excerpt: Storing and retrieving key-value pairs
bottomNavigation: pagination
---

The `@effect/platform/KeyValueStore` module provides a robust and effectful interface for managing key-value pairs. It supports asynchronous operations, ensuring data integrity and consistency, and includes built-in implementations for in-memory, file system-based, and schema-validated stores.

## Basic Usage

The module provides a single `KeyValueStore` tag, which acts as the gateway for interacting with the store.

```ts
import { KeyValueStore } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const kv = yield* KeyValueStore

  // use `kv` to operate on the store
})
```

The `KeyValueStore` interface includes the following operations:

- **get**: Returns the value as `string` of the specified key if it exists.
- **getUint8Array**: Returns the value as `Uint8Array` of the specified key if it exists.
- **set**: Sets the value of the specified key.
- **remove**: Removes the specified key.
- **clear**: Removes all entries.
- **size**: Returns the number of entries.
- **modify**: Updates the value of the specified key if it exists.
- **modifyUint8Array**: Updates the value of the specified key if it exists.
- **has**: Check if a key exists.
- **isEmpty**: Check if the store is empty.
- **forSchema**: Create a SchemaStore for the specified schema.

**Example**

```ts
import { KeyValueStore, layerMemory } from "@effect/platform/KeyValueStore"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const kv = yield* KeyValueStore
  console.log(yield* kv.size)
  // Output: 0

  yield* kv.set("key", "value")
  console.log(yield* kv.size)
  // Output: 1

  const value = yield* kv.get("key")
  console.log(value)
  // Output: { _id: 'Option', _tag: 'Some', value: 'value' }

  yield* kv.remove("key")
  console.log(yield* kv.size)
  // Output: 0
})

Effect.runPromise(program.pipe(Effect.provide(layerMemory)))
```

## Built-in Implementations

The module provides several built-in implementations of the `KeyValueStore` interface, available as layers, to suit different needs:

- **In-Memory Store**: `layerMemory` provides a simple, in-memory key-value store, ideal for lightweight or testing scenarios.
- **File System Store**: `layerFileSystem` offers a file-based store for persistent storage needs.
- **Schema Store**: `layerSchema` enables schema-based validation for stored values, ensuring data integrity and type safety.

## SchemaStore

The `SchemaStore` interface allows you to validate and parse values according to a defined schema. This ensures that all data stored in the key-value store adheres to the specified structure, enhancing data integrity and type safety.

**Example**

```ts
import { KeyValueStore, layerMemory } from "@effect/platform/KeyValueStore"
import { Schema } from "effect"
import { Effect } from "effect"

// Define a schema for the values
const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const program = Effect.gen(function* () {
  const kv = (yield* KeyValueStore).forSchema(Person)

  // Create a value that adheres to the schema
  const value = { name: "Alice", age: 30 }
  yield* kv.set("user1", value)
  console.log(yield* kv.size)
  // Output: 1

  // Retrieve the value
  console.log(yield* kv.get("user1"))
  // Output: { _id: 'Option', _tag: 'Some', value: { name: 'Alice', age: 30 } }
})

Effect.runPromise(program.pipe(Effect.provide(layerMemory)))
```

---
title: Terminal
excerpt: Running commands in a terminal
---

The `@effect/platform/Terminal` module provides an abstraction for interacting with standard input and output, including reading user input and displaying messages on the terminal.

## Basic Usage

The module provides a single `Terminal` tag, which serves as the entry point to reading from and writing to standard input and standard output.

```ts
import { Terminal } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal

  // use `terminal` to interact with standard input and output
})
```

## Writing to standard output

```ts
import { Terminal } from "@effect/platform"
import { NodeRuntime, NodeTerminal } from "@effect/platform-node"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal
  yield* terminal.display("a message\n")
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeTerminal.layer)))
// Output: "a message"
```

## Reading from standard input

```ts
import { Terminal } from "@effect/platform"
import { NodeRuntime, NodeTerminal } from "@effect/platform-node"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal
  const input = yield* terminal.readLine
  console.log(`input: ${input}`)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeTerminal.layer)))
// Input: "hello"
// Output: "input: hello"
```

## Example: Number guessing game

This example demonstrates how to create a complete number-guessing game by reading input from the terminal and providing feedback to the user. The game continues until the user guesses the correct number.

```ts
import { Terminal } from "@effect/platform"
import type { PlatformError } from "@effect/platform/Error"
import { Effect, Option, Random } from "effect"
import { NodeRuntime, NodeTerminal } from "@effect/platform-node"

const secret = Random.nextIntBetween(1, 100)

const parseGuess = (input: string) => {
  const n = parseInt(input, 10)
  return isNaN(n) || n < 1 || n > 100 ? Option.none() : Option.some(n)
}

const display = (message: string) =>
  Effect.gen(function* () {
    const terminal = yield* Terminal.Terminal
    yield* terminal.display(`${message}\n`)
  })

const prompt = Effect.gen(function* () {
  const terminal = yield* Terminal.Terminal
  yield* terminal.display("Enter a guess: ")
  return yield* terminal.readLine
})

const answer: Effect.Effect<
  number,
  Terminal.QuitException | PlatformError,
  Terminal.Terminal
> = Effect.gen(function* () {
  const input = yield* prompt
  const guess = parseGuess(input)
  if (Option.isNone(guess)) {
    yield* display("You must enter an integer from 1 to 100")
    return yield* answer
  }
  return guess.value
})

const check = <A, E, R>(
  secret: number,
  guess: number,
  ok: Effect.Effect<A, E, R>,
  ko: Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    if (guess > secret) {
      yield* display("Too high")
      return yield* ko
    } else if (guess < secret) {
      yield* display("Too low")
      return yield* ko
    } else {
      return yield* ok
    }
  })

const end = display("You guessed it!")

const loop = (
  secret: number
): Effect.Effect<
  void,
  Terminal.QuitException | PlatformError,
  Terminal.Terminal
> =>
  Effect.gen(function* () {
    const guess = yield* answer
    return yield* check(
      secret,
      guess,
      end,
      Effect.suspend(() => loop(secret))
    )
  })

const game = Effect.gen(function* () {
  yield* display(
    `We have selected a random number between 1 and 100.
See if you can guess it in 10 turns or fewer.
We'll tell you if your guess was too high or too low.`
  )
  yield* loop(yield* secret)
})

NodeRuntime.runMain(game.pipe(Effect.provide(NodeTerminal.layer)))
```

---
title: Path
excerpt: Working with file paths
bottomNavigation: pagination
---

The `@effect/platform/Path` module provides a set of operations for working with file paths.

## Basic Usage

The module provides a single `Path` tag, which acts as the gateway for interacting with paths.

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  // use `path` to operate on paths
})
```

The `Path` interface includes the following operations:

- **basename**: Returns the last part of a path, optionally removing a given suffix.
- **dirname**: Returns the directory part of a path.
- **extname**: Returns the file extension from a path.
- **format**: Formats a path object into a path string.
- **fromFileUrl**: Converts a file URL to a path.
- **isAbsolute**: Checks if a path is absolute.
- **join**: Joins multiple path segments into one.
- **normalize**: Normalizes a path by resolving `.` and `..` segments.
- **parse**: Parses a path string into an object with its segments.
- **relative**: Computes the relative path from one path to another.
- **resolve**: Resolves a sequence of paths to an absolute path.
- **sep**: Returns the platform-specific path segment separator (e.g., `/` on POSIX).
- **toFileUrl**: Converts a path to a file URL.
- **toNamespacedPath**: Converts a path to a namespaced path (specific to Windows).

**Example: using `join`**

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"
import { NodeContext, NodeRuntime } from "@effect/platform-node"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```

# Unstable and Experimental Features

Some modules in `@effect/platform` are still in development or marked as experimental. These features are subject to change. For the most up-to-date documentation and details, please refer to the official README of the package.

# Platform

## Overview
The Platform serves as the foundational layer for application development, providing essential services and tools for developers.

## Features
- **Scalability**: Supports growth and increased demand.
- **Security**: Implements robust security measures to protect data.
- **Integration**: Easily integrates with various third-party services.

## Services
- **API Management**: Facilitates the creation and management of APIs.
- **Data Storage**: Offers reliable data storage solutions.
- **User Authentication**: Provides secure user authentication mechanisms.

## Tools
- **Development Kits**: Includes SDKs for various programming languages.
- **Monitoring Tools**: Enables performance tracking and issue detection.
- **Documentation**: Comprehensive guides and references for developers.

## Support
- **Community Forums**: Engage with other developers for support and collaboration.
- **Technical Support**: Access to dedicated support teams for troubleshooting.

## Conclusion
The Platform is designed to empower developers with the necessary tools and services to build, deploy, and manage applications effectively.

# Guides

Guides provide essential information and instructions for various tasks and processes. This documentation serves as a reference for users seeking assistance with specific topics. 

## Topics Covered

- Overview of key concepts
- Step-by-step instructions
- Best practices and tips
- Troubleshooting common issues

For detailed guidance, refer to the specific sections related to your area of interest.

---
title: Express Integration
navTitle: Express
excerpt: Explore integrating Effect with Express, a popular Node.js web framework. Learn to create a simple Express server with "Hello World!" response and understand basic routing with Effect and Express. Follow the guide to set up, run, and breakdown the provided examples.
bottomNavigation: pagination
---

In this guide, we'll explore how to integrate Effect with Express, a popular web framework for Node.js.

## Hello World Example

Let's start with a simple example that creates an Express server responding with "Hello World!" for requests to the root URL (/).

### Setup Steps

1. Create a new directory for your project and navigate to it using your terminal:

   ```bash
   mkdir express-effect-integration
   cd express-effect-integration
   ```

2. Initialize your project with npm. This will create a `package.json` file:

   ```bash
   npm init -y
   ```

3. Install the necessary dependencies:

   ```bash
   npm install effect express
   ```

   Install the necessary dev dependencies:

   ```bash
   npm install typescript @types/express --save-dev
   ```

   Now, initialize TypeScript:

   ```bash
   npx tsc --init
   ```

4. Create a new file, for example, `hello-world.ts`, and add the following code:

   ```ts
   import { Context, Layer, Effect, Runtime } from "effect"
   import express from "express"

   class Express extends Context.Tag("Express")<
     Express,
     ReturnType<typeof express>
   >() {}

   const IndexRouteLive = Layer.effectDiscard(
     Effect.gen(function* () {
       const app = yield* Express
       const runFork = Runtime.runFork(yield* Effect.runtime<never>())

       app.get("/", (_, res) => {
         runFork(Effect.sync(() => res.send("Hello World!")))
       })
     })
   )

   const ServerLive = Layer.scopedDiscard(
     Effect.gen(function* () {
       const port = 3001
       const app = yield* Express
       yield* Effect.acquireRelease(
         Effect.sync(() =>
           app.listen(port, () =>
             console.log(`Example app listening on port ${port}`)
           )
         ),
         (server) => Effect.sync(() => server.close())
       )
     })
   )

   const ExpressLive = Layer.sync(Express, () => express())

   const AppLive = ServerLive.pipe(
     Layer.provide(IndexRouteLive),
     Layer.provide(ExpressLive)
   )

   Effect.runFork(Layer.launch(AppLive))
   ```

5. Run your Express server:

   ```bash
   npx tsx hello-world.ts
   ```

   Visit http://localhost:3001 in your web browser, and you should see "Hello World!".

### Code Breakdown

- **Express Service**: We define an `Express` service to retrieve the Express app later on.

  ```ts
  class Express extends Context.Tag("Express")<
    Express,
    ReturnType<typeof express>
  >() {}
  ```

- **Main Route**: The main route, `IndexRouteLive`, is defined as a Layer.

  ```ts
  const IndexRouteLive = Layer.effectDiscard(
    Effect.gen(function* () {
      const app = yield* Express
      const runFork = Runtime.runFork(yield* Effect.runtime<never>())

      app.get("/", (_, res) => {
        runFork(Effect.sync(() => res.send("Hello World!")))
      })
    })
  )
  ```

- **Server Setup**: The server is created in a layer (`ServerLive`) and mounted at the end of our program.

  ```ts
  const ServerLive = Layer.scopedDiscard(
    Effect.gen(function* () {
      const port = 3001
      const app = yield* Express
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          app.listen(port, () =>
            console.log(`Example app listening on port ${port}`)
          )
        ),
        (server) => Effect.sync(() => server.close())
      )
    })
  )
  ```

- **Mounting**: Finally, we mount the server by adding our route.

  ```ts
  const AppLive = ServerLive.pipe(
    Layer.provide(IndexRouteLive),
    Layer.provide(ExpressLive)
  )
  ```

## Basic Routing

In this example, we'll explore the basics of routing with Effect and Express. The goal is to create a simple web server with two routes: one that returns all todos and another that returns a todo by its ID.

```ts
import { Context, Effect, FiberSet, Layer } from "effect"
import express from "express"

class Express extends Context.Tag("Express")<
  Express,
  ReturnType<typeof express>
>() {}

const get = <A, E, R>(
  path: string,
  body: (
    req: express.Request,
    res: express.Response
  ) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const app = yield* Express
    const run = yield* FiberSet.makeRuntime<R>()
    app.get(path, (req, res) => run(body(req, res)))
  })

const ServerLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const port = 3001
    const app = yield* Express
    yield* Effect.acquireRelease(
      Effect.sync(() =>
        app.listen(port, () =>
          console.log(`Example app listening on port ${port}`)
        )
      ),
      (server) => Effect.sync(() => server.close())
    )
  })
)

const ExpressLive = Layer.sync(Express, () => express())

interface Todo {
  readonly id: number
  readonly title: string
  readonly completed: boolean
}

class TodoRepository extends Context.Tag("TodoRepository")<
  TodoRepository,
  {
    readonly getTodos: Effect.Effect<Array<Todo>>
    readonly getTodo: (id: number) => Effect.Effect<Todo | null>
  }
>() {}

const IndexRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository

    yield* get("/", (_, res) =>
      Effect.gen(function* () {
        const todos = yield* repo.getTodos
        res.json(todos)
      })
    )
  })
)

const TodoByIdRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository

    yield* get("/todo/:id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.id
        const todo = yield* repo.getTodo(Number(id))
        res.json(todo)
      })
    )
  })
)

const RouterLive = Layer.mergeAll(IndexRouteLive, TodoByIdRouteLive)

const AppLive = ServerLive.pipe(
  Layer.provide(RouterLive),
  Layer.provide(ExpressLive)
)

const testData = [
  {
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    completed: false
  }
]

const TodoRepositoryTest = Layer.succeed(TodoRepository, {
  getTodos: Effect.succeed(testData),
  getTodo: (id) =>
    Effect.succeed(testData.find((todo) => todo.id === id) || null)
})

const Test = AppLive.pipe(Layer.provide(TodoRepositoryTest))

Effect.runFork(Layer.launch(Test))
```

# Integrations

## Overview
This document outlines the various integrations available for our platform, detailing how to connect and utilize them effectively.

## Available Integrations

1. **Payment Gateways**
   - Description: Integrate with popular payment processors to handle transactions.
   - Supported Providers: Stripe, PayPal, Square.

2. **CRM Systems**
   - Description: Connect with customer relationship management tools to manage customer data.
   - Supported Providers: Salesforce, HubSpot, Zoho.

3. **Email Marketing**
   - Description: Integrate with email marketing services to automate campaigns.
   - Supported Providers: Mailchimp, SendGrid, Constant Contact.

4. **Analytics Tools**
   - Description: Connect to analytics platforms for tracking and reporting.
   - Supported Providers: Google Analytics, Mixpanel, Amplitude.

## Integration Process
1. **Select Integration**: Choose the desired integration from the list.
2. **API Keys**: Obtain necessary API keys from the service provider.
3. **Configuration**: Follow the configuration steps specific to each integration.
4. **Testing**: Conduct tests to ensure the integration is functioning correctly.

## Support
For assistance with integrations, please refer to the support documentation or contact our support team.

---
title: Micro for Effect Users
excerpt: "Micro for Effect Users: Key Differences and Benefits"
---

The `Micro` module in Effect is a lightweight alternative to the standard `Effect` module, aimed at reducing bundle size. It is standalone and excludes complex functionalities like `Layer`, `Ref`, `Queue`, and `Deferred`, making it ideal for libraries that want to maintain a minimal footprint while providing `Promise`-based APIs.

Micro supports scenarios where a client application uses Micro while a server employs the full Effect features, ensuring compatibility across components. The initial bundle size is approximately **5kb gzipped**, which may vary based on used features.

**Warning:** Using major Effect modules beyond basic data modules like `Option`, `Either`, and `Array` will include the Effect runtime in your bundle, negating Micro's benefits.

## Importing Micro

Micro can be imported as follows:

```ts
import * as Micro from "effect/Micro"
```

## Main Types

### Micro

The `Micro` type uses three type parameters:

```ts
Micro<Success, Error, Requirements>
```

### MicroExit

The `MicroExit` type captures the outcome of a `Micro` computation using the `Either` data type:

```ts
type MicroExit<A, E = never> = Either<A, MicroCause<E>>
```

### MicroCause

The `MicroCause` type consists of three specific types:

```ts
type MicroCause<E> = Die | Fail<E> | Interrupt
```

| **Failure Type** | **Description**                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `Die`            | Indicates an unforeseen defect not planned for in the system's logic.                      |
| `Fail<E>`        | Covers anticipated errors typically handled within the application.                        |
| `Interrupt`      | Signifies an operation that has been purposefully stopped.                                 |

### MicroSchedule

The `MicroSchedule` type represents a function to calculate the delay between repeats:

```ts
type MicroSchedule = (attempt: number, elapsed: number) => Option<number>
```

## How to Use This Guide

The following comparisons outline the functionalities of `Effect` and `Micro`. Icons indicate:

- ⚠️: Available in `Micro` with differences from `Effect`.
- ❌: Not available in `Effect`.

## Creating Effects

| Effect                 | Micro                   |                                      |
| ---------------------- | ----------------------- | ------------------------------------ |
| `Effect.try`           | ⚠️ `Micro.try`          | requires a `try` block               |
| `Effect.tryPromise`    | ⚠️ `Micro.tryPromise`   | requires a `try` block               |
| `Effect.sleep`         | ⚠️ `Micro.sleep`        | only handles milliseconds            |
| `Effect.failCause`     | ⚠️ `Micro.failWith`     | uses `MicroCause` instead of `Cause` |
| `Effect.failCauseSync` | ⚠️ `Micro.failWithSync` | uses `MicroCause` instead of `Cause` |
| ❌                     | `Micro.make`            |                                      |
| ❌                     | `Micro.fromOption`      |                                      |
| ❌                     | `Micro.fromEither`      |                                      |

## Running Effects

| Effect                  | Micro                     |                                                |
| ----------------------- | ------------------------- | ---------------------------------------------- |
| `Effect.runSyncExit`    | ⚠️ `Micro.runSyncExit`    | returns a `MicroExit` instead of an `Exit`     |
| `Effect.runPromiseExit` | ⚠️ `Micro.runPromiseExit` | returns a `MicroExit` instead of an `Exit`     |
| `Effect.runFork`        | ⚠️ `Micro.runFork`        | returns a `Handle` instead of a `RuntimeFiber` |

### runSyncExit

```ts
import * as Micro from "effect/Micro"

const result1 = Micro.runSyncExit(Micro.succeed(1))
console.log(result1)

const result2 = Micro.runSyncExit(Micro.fail("my error"))
console.log(result2)
```

### runPromiseExit

```ts
import * as Micro from "effect/Micro"

Micro.runPromiseExit(Micro.succeed(1)).then(console.log)
Micro.runPromiseExit(Micro.fail("my error")).then(console.log)
```

### runFork

```ts
import * as Micro from "effect/Micro"

const handle = Micro.succeed(42).pipe(Micro.delay(1000), Micro.runFork)

handle.addObserver((result) => {
  console.log(result)
})
console.log("observing...")
```

## Building Pipelines

| Effect             | Micro                |                                                         |
| ------------------ | -------------------- | ------------------------------------------------------- |
| `Effect.andThen`   | ⚠️ `Micro.andThen`   | doesn't handle `Promise` or `() => Promise` as argument |
| `Effect.tap`       | ⚠️ `Micro.tap`       | doesn't handle `() => Promise` as argument              |
| `Effect.all`       | ⚠️ `Micro.all`       | no `batching` and `mode` options                        |
| `Effect.forEach`   | ⚠️ `Micro.forEach`   | no `batching` option                                    |
| `Effect.filter`    | ⚠️ `Micro.filter`    | no `batching` option                                    |
| `Effect.filterMap` | ⚠️ `Micro.filterMap` | effectful                                               |

## Expected Errors

| Effect        | Micro           |                                            |
| ------------- | --------------- | ------------------------------------------ |
| `Effect.exit` | ⚠️ `Micro.exit` | returns a `MicroExit` instead of an `Exit` |

## Unexpected Errors

| Effect | Micro                |     |
| ------ | -------------------- | --- |
| ❌     | `Micro.catchCauseIf` |     |

## Timing Out

| Effect | Micro                 |     |
| ------ | --------------------- | --- |
| ❌     | `Micro.timeoutOrElse` |     |

## Requirements Management

```ts
import * as Context from "effect/Context"
import * as Micro from "effect/Micro"

class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Micro.Micro<number> }
>() {}

const program = Micro.gen(function* () {
  const random = yield* Micro.service(Random)
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})

const runnable = Micro.provideService(program, Random, {
  next: Micro.sync(() => Math.random())
})

Micro.runPromise(runnable)
```

## Scope

| Effect       | Micro                |                                             |
| ------------ | -------------------- | ------------------------------------------- |
| `Scope`      | ⚠️ `MicroScope`      | returns a `MicroScope` instead of a `Scope` |
| `Scope.make` | ⚠️ `Micro.scopeMake` | returns a `MicroScope` instead of a `Scope` |

```ts
import * as Micro from "effect/Micro"

const consoleLog = (message: string) => Micro.sync(() => console.log(message))

const program =
  Micro.scopeMake.pipe(
    Micro.tap((scope) => scope.addFinalizer(() => consoleLog("finalizer 1"))),
    Micro.tap((scope) => scope.addFinalizer(() => consoleLog("finalizer 2"))),
    Micro.andThen((scope) =>
      scope.close(Micro.exitSucceed("scope closed successfully"))
    )
  )

Micro.runPromise(program)
```

## Retrying

| Effect         | Micro            |                     |
| -------------- | ---------------- | ------------------- |
| `Effect.retry` | ⚠️ `Micro.retry` | different `options` |

## Repetition

| Effect                               | Micro                 |                     |
| ------------------------------------ | --------------------- | ------------------- |
| `Effect.repeat`                      | ⚠️ `Micro.repeat`     | different `options` |
| ❌ (`Effect.exit` + `Effect.repeat`) | ⚠️ `Micro.repeatExit` |                     |

## Sandboxing

| Effect           | Micro              |                                       |
| ---------------- | ------------------ | ------------------------------------- |
| `Effect.sandbox` | ⚠️ `Micro.sandbox` | `MicroCause<E>` instead of `Cause<E>` |

## Error Channel Operations

| Effect                 | Micro                    |                                       |
| ---------------------- | ------------------------ | ------------------------------------- |
| ❌                     | `Micro.filterOrFailWith` |                                       |
| `Effect.tapErrorCause` | ⚠️ `Micro.tapErrorCause` | `MicroCause<E>` instead of `Cause<E>` |
| ❌                     | `Micro.tapCauseIf`       |                                       |
| `Effect.tapDefect`     | ⚠️ `Micro.tapDefect`     | `unknown` instead of `Cause<never>`   |

## Requirements Management

| Effect           | Micro                     |                        |
| ---------------- | ------------------------- | ---------------------- |
| `Effect.provide` | ⚠️ `Micro.provideContext` | only handles `Context` |
| ❌               | `Micro.provideScope`      |                        |
| ❌               | `Micro.service`           |                        |

## Scoping, Resources and Finalization

| Effect                     | Micro                        |                                          |
| -------------------------- | ---------------------------- | ---------------------------------------- |
| `Effect.addFinalizer`      | ⚠️ `Micro.addFinalizer`      | `MicroExit` instead of `Exit` and no `R` |
| `Effect.acquireRelease`    | ⚠️ `Micro.acquireRelease`    | `MicroExit` instead of `Exit`            |
| `Effect.acquireUseRelease` | ⚠️ `Micro.acquireUseRelease` | `MicroExit` instead of `Exit`            |
| `Effect.onExit`            | ⚠️ `Micro.onExit`            | `MicroExit` instead of `Exit`            |
| `Effect.onError`           | ⚠️ `Micro.onError`           | uses `MicroCause` instead of `Cause`     |

## Concurrency

| Effect              | Micro                 |                                    |
| ------------------- | --------------------- | ---------------------------------- |
| `Effect.fork`       | ⚠️ `Micro.fork`       | `Handle` instead of `RuntimeFiber` |
| `Effect.forkDaemon` | ⚠️ `Micro.forkDaemon` | `Handle` instead of `RuntimeFiber` |
| `Effect.forkIn`     | ⚠️ `Micro.forkIn`     | `Handle` instead of `RuntimeFiber` |
| `Effect.forkScoped` | ⚠️ `Micro.forkScoped` | `Handle` instead of `RuntimeFiber` |

---
title: Getting Started with Micro
excerpt: "Getting Started with Micro: A Primer for New Users"
---

## Importing Micro

Ensure you have the `effect` library installed in your project:

```bash
npm install effect
```

Import Micro in your TypeScript project:

```ts
import * as Micro from "effect/Micro"
```

## The Micro Type

The `Micro` type uses three type parameters:

```ts
Micro<Success, Error, Requirements>
```

- **Success**: Type of value on success. `void` means no useful information; `never` means it runs forever.
- **Error**: Expected errors during execution. `never` means it cannot fail.
- **Requirements**: Contextual data needed for execution, stored in `Context`. `never` means no requirements.

## The MicroExit Type

The `MicroExit` type captures the outcome of a `Micro` computation:

```ts
type MicroExit<A, E = never> = Either<A, MicroCause<E>>
```

## The MicroCause Type

The `MicroCause` type represents possible causes of failure:

```ts
type MicroCause<E> = Die | Fail<E> | Interrupt
```

| **Failure Type** | **Description**                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `Die`            | Unforeseen defect not planned for in logic.                                                |
| `Fail<E>`        | Anticipated errors recognized and typically handled.                                       |
| `Interrupt`      | Operation that has been purposefully stopped.                                             |

## Tutorial: Wrapping a Promise-based API with Micro

### Step 1: Create a Promise-based API Function

Define a simple Promise-based function to fetch weather data:

```ts
function fetchWeather(city: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city === "London") {
        resolve("Sunny")
      } else {
        reject(new Error("Weather data not found for this location"))
      }
    }, 1_000)
  })
}
```

### Step 2: Wrap the Promise with Micro

Wrap the `fetchWeather` function using Micro:

```ts
import * as Micro from "effect/Micro"

function getWeather(city: string) {
  return Micro.promise(() => fetchWeather(city))
}
```

### Step 3: Running the Micro Effect

Execute the Micro effect and handle results:

```ts
const weatherEffect = getWeather("London")

Micro.runPromise(weatherEffect)
  .then((result) => console.log(`The weather in London is: ${result}`))
  .catch((error) =>
    console.error(`Failed to fetch weather data: ${error.message}`)
  )
```

### Step 4: Adding Error Handling

Handle specific errors using `Micro.tryPromise`:

```ts
class WeatherError {
  readonly _tag = "WeatherError"
  constructor(readonly message: string) {}
}

function getWeather(city: string) {
  return Micro.tryPromise({
    try: () => fetchWeather(city),
    catch: (error) => new WeatherError(String(error))
  })
}
```

## Expected Errors

Expected errors are tracked at the type level by the `Micro` data type in the "Error" channel.

### either

Transform an `Micro<A, E, R>` into an effect encapsulating both potential failure and success:

```ts
const recovered = Micro.gen(function* () {
  const failureOrSuccess = yield* Micro.either(task)
  return Either.match(failureOrSuccess, {
    onLeft: (error) => `Recovering from ${error._tag}`,
    onRight: (value) => `Result is: ${value}`
  })
})
```

### catchAll

Catch any error and provide a fallback:

```ts
const recovered = task.pipe(
  Micro.catchAll((error) => Micro.succeed(`Recovering from ${error._tag}`))
)
```

### catchTag

Catch and handle specific errors using the `_tag` field:

```ts
const recovered = task.pipe(
  Micro.catchTag("ValidationError", (_error) =>
    Micro.succeed("Recovering from ValidationError")
  )
)
```

## Unexpected Errors

Unexpected errors are not tracked at the type level but can be managed using various methods.

### die

```ts
const divide = (a: number, b: number): Micro.Micro<number> =>
  b === 0
    ? Micro.die(new Error("Cannot divide by zero"))
    : Micro.succeed(a / b)
```

### orDie

```ts
const program = Micro.orDie(divide(1, 0))
```

### catchAllDefect

```ts
const program = Micro.catchAllDefect(
  Micro.die("Boom!"),
  (defect) => consoleLog(`Unknown defect caught: ${defect}`)
)
```

## Fallback

### orElseSucceed

Replace the original failure with a success value:

```ts
const program = Micro.orElseSucceed(validate(3), () => 0)
```

## Matching

### match

```ts
const program1 = Micro.match(success, {
  onFailure: (error) => `failure: ${error.message}`,
  onSuccess: (value) => `success: ${value}`
})
```

### matchEffect

```ts
const program1 = Micro.matchEffect(success, {
  onFailure: (error) =>
    Micro.succeed(`failure: ${error.message}`).pipe(Micro.tap(consoleLog)),
  onSuccess: (value) =>
    Micro.succeed(`success: ${value}`).pipe(Micro.tap(consoleLog))
})
```

### matchCause / matchCauseEffect

```ts
const program = Micro.matchCauseEffect(exceptionalEffect, {
  onFailure: (cause) => {
    switch (cause._tag) {
      case "Fail":
        return consoleLog(`Fail: ${cause.error.message}`)
      case "Die":
        return consoleLog(`Die: ${cause.defect}`)
      case "Interrupt":
        return consoleLog("interrupted!")
    }
  },
  onSuccess: (value) => consoleLog(`succeeded with ${value} value`)
})
```

## Retrying

### retry

```ts
const repeated = Micro.retry(effect, { schedule: policy })
```

## Sandboxing

### Micro.sandbox

Encapsulate all potential causes of an error in an effect:

```ts
const sandboxed = Micro.sandbox(effect)
```

## Inspecting Errors

### tapError

Inspect the failure of an effect without altering it:

```ts
const tapping = Micro.tapError(task, (error) =>
  consoleLog(`expected error: ${error}`)
)
```

### tapErrorCause

Inspect the underlying cause of an effect's failure:

```ts
const tapping1 = Micro.tapErrorCause(task1, (cause) =>
  consoleLog(`error cause: ${cause}`)
)
```

### tapDefect

Specifically inspect non-recoverable failures:

```ts
const tapping2 = Micro.tapDefect(task2, (cause) =>
  consoleLog(`defect: ${cause}`)
)
```

## Yieldable Errors

### Error

```ts
class MyError extends Micro.Error<{ message: string }> {}

export const program = Micro.gen(function* () {
  yield* new MyError({ message: "Oh no!" })
})
```

### TaggedError

```ts
class FooError extends Micro.TaggedError("Foo")<{ message: string }> {}
```

## Requirements Management

### Defining a Service

```ts
class Random extends Context.Tag("MyRandomService")<
  Random,
  { readonly next: Micro.Micro<number> }
>() {}
```

### Using a Service

```ts
const program = Micro.gen(function* () {
  const random = yield* Micro.service(Random)
  const randomNumber = yield* random.next
  console.log(`random number: ${randomNumber}`)
})
```

## Resource Management

### MicroScope

Manage the lifetime of resources:

```ts
const program = Micro.scopeMake.pipe(
  Micro.tap((scope) => scope.addFinalizer(() => consoleLog("finalizer 1"))),
  Micro.andThen((scope) =>
    scope.close(Micro.exitSucceed("scope closed successfully"))
  )
)
```

### Defining Resources

Define a resource using `Micro.acquireRelease(acquire, release)`:

```ts
const resource = Micro.acquireRelease(acquire, release)
```

### acquireUseRelease

Simplifies resource management:

```ts
const program = Micro.acquireUseRelease(acquire, use, release)
```

## Scheduling

### repeat

```ts
const program = Micro.repeat(action, { schedule: policy })
```

### scheduleSpaced

```ts
const policy = Micro.scheduleSpaced(10)
```

### scheduleExponential

```ts
const policy = Micro.scheduleExponential(10)
```

### scheduleUnion

```ts
const policy = Micro.scheduleUnion(
  Micro.scheduleExponential(10),
  Micro.scheduleSpaced(300)
)
```

### scheduleIntersect

```ts
const policy = Micro.scheduleIntersect(
  Micro.scheduleExponential(10),
  Micro.scheduleSpaced(300)
)
```

## Concurrency

### Forking Effects

```ts
const fib10Fiber = Micro.fork(fib(10))
```

### Joining Fibers

```ts
const program = Micro.gen(function* () {
  const fiber = yield* fib10Fiber
  const n = yield* fiber.join
  console.log(n)
})
```

### Awaiting Fibers

```ts
const program = Micro.gen(function* () {
  const exit = yield* fiber.await
  console.log(exit)
})
```

### Interrupting Fibers

```ts
const program = Micro.gen(function* () {
  const fiber = yield* Micro.fork(Micro.forever(Micro.succeed("Hi!")))
  const exit = yield* fiber.interrupt
  console.log(exit)
})
```

### Racing

```ts
const program = Micro.race(task1, task2)
```

### Timing out

**Interruptible Operation**:

```ts
const timedEffect = myEffect.pipe(Micro.timeout(1_000))
```

**Uninterruptible Operation**:

```ts
const timedEffect = myEffect.pipe(Micro.uninterruptible, Micro.timeout(1_000))
```

### Calling Effect.interrupt

```ts
const program = Micro.gen(function* () {
  yield* Micro.interrupt
})
```

### Interruption of Concurrent Effects

```ts
const program = Micro.forEach(
  [1, 2, 3],
  (n) =>
    Micro.gen(function* () {
      yield* Micro.interrupt
    }),
  { concurrency: "unbounded" }
)
```

# Micro

Micro is a lightweight framework designed for building microservices. It provides a simple and efficient way to create and manage services with minimal overhead.

## Features

- **Lightweight**: Minimal footprint for quick deployment.
- **Flexible**: Easily integrates with various technologies and platforms.
- **Scalable**: Designed to handle increasing loads seamlessly.
- **Modular**: Supports a modular architecture for better organization.

## Installation

To install Micro, use the following command:

```
npm install micro
```

## Usage

To create a simple microservice, use the following code snippet:

```javascript
const { send } = require('micro');
const micro = require('micro');

const server = micro((req, res) => {
  send(res, 200, 'Hello, Micro!');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

## API Reference

### send(res, statusCode, body)

- **res**: The response object.
- **statusCode**: HTTP status code to send.
- **body**: The response body.

### micro(handler)

- **handler**: A function that handles incoming requests.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

Micro is licensed under the MIT License.

# FAQ

## Effect

**Q: Is it possible to extract the types from an Effect?**

A: Yes, you can extract types using `Effect.Effect.Context`, `Effect.Effect.Error`, and `Effect.Effect.Success`. For example:

```ts
import { Effect, Context } from "effect"

class Random extends Context.Tag("Random")<
  Random,
  {
    readonly next: Effect.Effect<number>
  }
>() {}

declare const program: Effect.Effect<number, string, Random>

// type R = Random
type R = Effect.Effect.Context<typeof program>

// type E = string
type E = Effect.Effect.Error<typeof program>

// type A = number
type A = Effect.Effect.Success<typeof program>
```

**Q: Is there a way to determine whether an Effect is synchronous or asynchronous in advance?**

A: No, there is no straightforward method to statically determine if an Effect is synchronous or asynchronous. This was considered but rejected due to complexity and safety concerns. It is recommended to use `runPromise` or `runFork` for most executions, with `runSync` as a last resort.

**Q: I'm familiar with `flatMap` in JavaScript/TypeScript from its usage on the `Array` prototype. Why do I see it in modules provided by Effect?**

A: `flatMap` is a generic data transformation operation. It allows you to map data and flatten the result. For example, if you have a function returning `F<B>`, using `flatMap` avoids nesting:

```ts
flatMap: <A, B>(fa: F<A>, f: (a: A) => F<B>) => F<B>
```

This applies to `Array` as well:

```ts
flatMap: <A, B>(fa: Array<A>, f: (a: A) => Array<B>) => Array<B>
```

**Q: I can't seem to find any type aliases for Effect. Do any exist? I'm looking for something similar to ZIO's `UIO` / `URIO` / `RIO` / `Task` / `IO`. If not, have you considered adding them?**

A: Effect does not have predefined type aliases like `UIO`, `URIO`, `RIO`, `Task`, or `IO`. Type aliases can be lost upon composition, making them less useful. Instead, Effect uses the `never` type to indicate unused types, promoting clarity with explicit notation like `Effect<A>`.

## Comparison with fp-ts

**Q: What are the main differences between Effect and fp-ts?**

A: Key differences include:

- Effect has more flexible dependency management.
- Built-in services like `Clock`, `Random`, and `Tracer` are available in Effect.
- Dedicated testing tools like `TestClock` are included in Effect.
- Effect supports interruptions for canceling computations.
- Built-in tools for defect management are present in Effect.
- Fiber-based concurrency is utilized in Effect.
- Customizable retrying of computations is supported in Effect.
- Built-in logging, scheduling, and caching features are available in Effect.

**Q: I compared the bundle sizes of two simple programs using Effect and fp-ts. Why does Effect have a larger bundle size?**

A: Effect's larger bundle size is due to its fiber runtime, which is essential for its functionality. The overhead decreases as you use Effect.

**Q: Should I be concerned about the bundle size difference when choosing between Effect and fp-ts?**

A: Not necessarily. Focus on the specific requirements and benefits of each library for your project.

# Myths

## Effect heavily relies on generators and generators are slow!

Effect's internals are not built on generators; they are used to provide an API that mimics async-await. Both async-await and generators are equally performant. If async-await is not an issue, Effect's generators won't be either. For transforming collections of data, use plain arrays to avoid slowness.

## Effect will make your code 500x slower!

Effect may appear 500x slower when comparing:

```ts
const result = 1 + 1
```

to 

```ts
const result = Effect.runSync(Effect.zipWith(
  Effect.succeed(1),
  Effect.succeed(1),
  (a, b) => a + b
))
```

The first operation is optimized by the JIT compiler, while the second is not. Effect is designed for app-level concurrency and error handling, not for simple arithmetic.

## Effect has a huge performance overhead!

Performance bottlenecks in JavaScript often stem from poor concurrency management. Effect's structured concurrency and observability help identify and optimize these issues. Many frontend applications using Effect run at 120fps, indicating it is unlikely to be a performance problem. Memory usage is comparable to non-Effect code, with some additional allocations that typically balance out.

## The bundle size is HUGE!

Effect's minimum size is about 25k gzipped, which includes the Effect Runtime and essential functions for typical applications. It is tree-shaking friendly, so only the used parts are included. Using Effect can lead to shorter, more concise code, potentially reducing the final bundle size.

## Effect is impossible to learn, there are so many functions and modules!

The Effect ecosystem is large, but you only need to know 10-20 functions to start being productive. Commonly used functions include:

- Effect.succeed
- Effect.fail
- Effect.sync
- Effect.tryPromise
- Effect.gen
- Effect.runPromise
- Effect.catchTag
- Effect.catchAll
- Effect.acquireRelease
- Effect.acquireUseRelease
- Effect.provide
- Effect.provideService
- Effect.andThen
- Effect.map
- Effect.tap

Commonly used modules include:

- Effect
- Context
- Layer
- Option
- Either
- Array
- Match

## Effect is the same as RxJS and shares its problems

RxJS is a valuable project for working with Observables, while Effect focuses on making production-grade TypeScript easier. They have different objectives. The misconception that "everything is a stream" can lead to limitations in developer experience. Effect's basic type is single-shot and optimized for imperative programming, unlike RxJS, which is push-based and often requires a declarative style. Effect explicitly types errors and dependencies, offering control-flow in a type-safe manner.

## Effect should be a language or Use a different language

Effect does not solve the issue of writing production-grade software in TypeScript. TypeScript is a robust language for full-stack development, widely adopted in large-scale companies. Effect's compatibility with TypeScript's features, such as generators, makes it unique. Even functional languages like Scala have less optimal interoperability with effect systems compared to TypeScript.

# Glossary

Explore key concepts in Effect, such as context, dual APIs, distributed workflows, expected errors, fibers, interruption, local workflows, effect pipelines, schedules, services, tags, and unexpected errors. Understand their significance in managing dependencies, controlling concurrency, and handling errors within effectful computations.

## Context

In Effect, context refers to a container that holds important contextual data required for the execution of effects. It enables effects to access and utilize contextual data within their execution scope. Context is conceptualized as a Map<Tag, Impl> that associates Tags with their corresponding implementations. It plays a vital role in managing dependencies and facilitating the composition of effects in a modular manner.

## Dual (API)

"Dual" refers to a function that supports both "data-first" and "data-last" variants. An example is the `andThen` function of the Effect data type.

In the "data-first" variant:

```ts
import { Effect } from "effect"

Effect.andThen(Effect.succeed(1), (n) => n + 1)
```

In the "data-last" variant:

```ts
import { Effect, pipe } from "effect"

pipe(
  Effect.succeed(1),
  Effect.andThen((n) => n + 1)
)

// or

Effect.succeed(1).pipe(Effect.andThen((n) => n + 1))
```

## Distributed Workflow

Refers to tasks that may execute across multiple execution boundaries.

## Expected Errors

Also known as failures, typed errors, or recoverable errors. These are errors that developers anticipate as part of normal program execution, tracked at the type level by the Effect data type in the "Error" channel:

```ts
Effect<Value, Error, Context>
```

## Fiber

A fiber is a small unit of work or a lightweight thread of execution, representing a specific computation or effectful operation. Fibers manage concurrency and asynchronous tasks, allowing for efficient multitasking and responsiveness. An Effect is a higher-level concept describing an effectful computation, while a fiber represents the running execution of an Effect.

## Interruption

Interruption errors occur when the execution of a running fiber is deliberately interrupted.

## Local Workflow

Refers to tasks that execute within a single execution boundary.

## Pipeline (of Effects)

A pipeline refers to a series of sequential operations performed on Effect values to achieve a desired result. It typically consists of operations such as mapping, flat-mapping, filtering, and error handling.

## Schedule

A Schedule is an immutable value that defines a strategy for repeating or retrying an effectful operation. Schedules can be composed to create complex recurrence patterns.

## Service

A Service is an interface that defines a set of operations or functionality, encapsulating specific capabilities that can be utilized by effects. Services enhance the capabilities of effects and enable interaction with external systems or shared resources. Services are associated with Tags for locating implementations at runtime.

## Tag

In Effect, a Tag is a unique marker representing a specific value in a Context, used to identify something in a type-safe manner. Tags serve as keys that allow Effect to locate and use the corresponding service implementation at runtime.

## Unexpected Errors

Also known as defects, untyped errors, or unrecoverable errors. These are errors that occur unexpectedly and are not part of the intended program flow.

---
title: Cause
excerpt: Explore the `Cause` data type in the `Effect` type, which stores comprehensive information about failures, including unexpected errors, stack traces, and fiber interruption causes. Learn how `Cause` ensures no failure information is lost, providing a complete story for precise error analysis and handling in your codebase. Discover various causes such as Empty, Fail, Die, Interrupt, Sequential, and Parallel, each representing different error scenarios within the `Effect` workflow.
---

The `Effect<A, E, R>` type is polymorphic in values of type `E`, allowing the use of any error type. However, additional failure information is not captured by the `E` value alone.

To provide comprehensive failure information, Effect uses the `Cause<E>` data type, which stores:

- Unexpected errors or defects
- Stack and execution traces
- Causes of fiber interruptions

Effect captures and stores the complete story of failure in the `Cause` data type, ensuring no information is lost, allowing precise determination of what happened during execution.

Although direct interaction with `Cause` values is uncommon, it represents errors within an Effect workflow, providing access to all concurrent and sequential errors for comprehensive failure analysis and handling.

## Creating Causes

To create effects with specific causes, use the `Effect.failCause` constructor:

```ts
import { Effect, Cause } from "effect"

// Create an effect that intentionally fails with an empty cause
const effect = Effect.failCause(Cause.empty)
```

To uncover the underlying cause of an effect, use the `Effect.cause` function:

```ts
Effect.cause(effect).pipe(
  Effect.andThen((cause) => ...)
)
```

## Cause Variations

### Empty

Represents a lack of errors.

### Fail

Represents a `Cause` that failed with an expected error of type `E`.

### Die

Represents a `Cause` that failed due to an unexpected error.

### Interrupt

Represents failure due to `Fiber` interruption, containing the `FiberId` of the interrupted `Fiber`.

### Sequential

Represents the composition of two causes that occurred sequentially.

### Parallel

Represents the composition of two causes that occurred in parallel.

## Guards

To identify the type of a `Cause`, use specific guards from the `Cause` module:

- `Cause.isEmpty`
- `Cause.isFailType`
- `Cause.isDie`
- `Cause.isInterruptType`
- `Cause.isSequentialType`
- `Cause.isParallelType`

Example of using guards:

```ts
import { Cause } from "effect"

const cause = Cause.fail(new Error("my message"))

if (Cause.isFailType(cause)) {
  console.log(cause.error.message) // Output: my message
}
```

## Pattern Matching

Handle different cases of a `Cause` using the `Cause.match` function:

```ts
import { Cause } from "effect"

const cause = Cause.parallel(
  Cause.fail(new Error("my fail message")),
  Cause.die("my die message")
)

console.log(
  Cause.match(cause, {
    onEmpty: "(empty)",
    onFail: (error) => `(error: ${error.message})`,
    onDie: (defect) => `(defect: ${defect})`,
    onInterrupt: (fiberId) => `(fiberId: ${fiberId})`,
    onSequential: (left, right) =>
      `(onSequential (left: ${left}) (right: ${right}))`,
    onParallel: (left, right) =>
      `(onParallel (left: ${left}) (right: ${right})`
  })
)
/*
Output:
(onParallel (left: (error: my fail message)) (right: (defect: my die message))
*/
```

## Pretty Printing

Use the `Cause.pretty` function for clear and readable error messages:

```ts
import { Cause, FiberId } from "effect"

console.log(Cause.pretty(Cause.empty)) // All fibers interrupted without errors.
console.log(Cause.pretty(Cause.fail(new Error("my fail message")))) // Error: my fail message
console.log(Cause.pretty(Cause.die("my die message"))) // Error: my die message
console.log(Cause.pretty(Cause.interrupt(FiberId.make(1, 0)))) // All fibers interrupted without errors.
console.log(
  Cause.pretty(Cause.sequential(Cause.fail("fail1"), Cause.fail("fail2")))
)
/*
Output:
Error: fail1
Error: fail2
*/
```

## Retrieval of Failures and Defects

To obtain collections of failures or defects from a `Cause`, use `Cause.failures` and `Cause.defects` functions:

```ts
import { Cause } from "effect"

const cause = Cause.parallel(
  Cause.fail(new Error("my fail message 1")),
  Cause.sequential(
    Cause.die("my die message"),
    Cause.fail(new Error("my fail message 2"))
  )
)

console.log(Cause.failures(cause))
/*
Output:
{
  _id: 'Chunk',
  values: [
    Error: my fail message 1 ...,
    Error: my fail message 2 ...
  ]
}
*/

console.log(Cause.defects(cause))
/*
Output:
{ _id: 'Chunk', values: [ 'my die message' ] }
*/

---
title: Chunk
excerpt: Explore the benefits of using `Chunk`, an immutable and high-performance array-like data structure in JavaScript. Learn about its advantages, including immutability for concurrent programming and specialized operations for efficient array manipulations. Discover operations like creating, concatenating, dropping elements, comparing for equality, and converting to a `ReadonlyArray`.
bottomNavigation: pagination
---

A `Chunk<A>` represents a chunk of values of type `A`. Chunks are usually backed by arrays but expose a purely functional, safe interface to the underlying elements, becoming lazy on costly operations like repeated concatenation. Like lists and arrays, `Chunk` is an ordered collection.

**Warning**: `Chunk` is purpose-built to amortize the cost of repeated concatenation of arrays. Therefore, for use-cases that do not involve repeated concatenation, the overhead of `Chunk` will result in reduced performance.

## Why Chunk?

- **Immutability**: JavaScript lacks a built-in immutable data type for arrays. While `Array` is mutable, `Chunk` is an immutable array-like structure, ensuring data remains unchanged, which is beneficial for concurrent programming.

- **High Performance**: `Chunk` offers high performance with specialized operations for common array manipulations, such as appending a single element or concatenating two `Chunk`s, which are faster than operations on regular JavaScript arrays.

## Operations

### Creating

To create an empty `Chunk`:

```ts
import { Chunk } from "effect"

const emptyChunk = Chunk.empty()
```

To create a `Chunk` with specific values:

```ts
import { Chunk } from "effect"

const nonEmptyChunk = Chunk.make(1, 2, 3)
```

To create a `Chunk` from a collection of values:

- From a generic `Iterable`:

  ```ts
  import { Chunk, List } from "effect"

  const fromArray = Chunk.fromIterable([1, 2, 3])
  const fromList = Chunk.fromIterable(List.make(1, 2, 3))
  ```

- From an `Array`:

  ```ts
  import { Chunk } from "effect"

  const fromUnsafeArray = Chunk.unsafeFromArray([1, 2, 3])
  ```

`Chunk.fromIterable` clones the iterable, which can be expensive for large iterables. `unsafeFromArray` does not clone, offering performance benefits but potentially leading to unsafe behavior if the input array is mutated.

**Warning**: Using `unsafeFromArray` can lead to unsafe behavior if the input array is mutated after conversion. For safety, use `fromIterable`.

### Concatenating

To concatenate two Chunks:

```ts
import { Chunk } from "effect"

const concatenatedChunk = Chunk.appendAll(
  Chunk.make(1, 2),
  Chunk.make("a", "b")
)

console.log(concatenatedChunk)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, "a", "b" ]
}
*/
```

### Dropping

To drop elements from the beginning of a `Chunk`:

```ts
import { Chunk } from "effect"

const droppedChunk = Chunk.drop(Chunk.make(1, 2, 3, 4), 2)
```

### Comparing

To compare two `Chunk`s for equality:

```ts
import { Chunk, Equal } from "effect"

const chunk1 = Chunk.make(1, 2)
const chunk2 = Chunk.make(1, 2, 3)

const areEqual = Equal.equals(chunk1, chunk2)
```

### Converting

To convert a `Chunk` to a `ReadonlyArray`:

```ts
import { Chunk } from "effect"

const readonlyArray = Chunk.toReadonlyArray(Chunk.make(1, 2, 3))
```

# Data

Explore the Data module in Effect, offering functionalities for defining data types, ensuring value equality, and working with case classes. Learn about the advantages of using `Data.struct`, `Data.tuple`, and `Data.array` for efficient value comparisons. Dive into the concept of case classes, including `case`, `tagged`, `Class`, and `TaggedClass`, providing automated implementations for data types. Discover how to create unions of case classes using `TaggedEnum` for streamlined handling of disjoint unions.

The Data module offers a range of features that make it easier to create and manipulate data structures in your TypeScript applications. It includes functionalities for defining data types, ensuring equality between data objects, and hashing data for efficient comparison.

The module offers APIs tailored for comparing existing values of your data types. Alternatively, it provides mechanisms for defining constructors for your data types.

## Value Equality

If you need to compare existing values for equality without the need for explicit implementations, consider using the Data module. It provides convenient APIs that generate default implementations for Equal and Hash, making equality checks a breeze.

### struct

Use the `Data.struct` function to create structured data objects and check their equality using `Equal.equals`.

```ts
import { Data, Equal } from "effect"

const alice = Data.struct({ name: "Alice", age: 30 })
const bob = Data.struct({ name: "Bob", age: 40 })

console.log(Equal.equals(alice, alice)) // Output: true
console.log(Equal.equals(alice, Data.struct({ name: "Alice", age: 30 }))) // Output: true
console.log(Equal.equals(alice, { name: "Alice", age: 30 })) // Output: false
console.log(Equal.equals(alice, bob)) // Output: false
```

### tuple

Model your domain with tuples using the `Data.tuple` function:

```ts
import { Data, Equal } from "effect"

const alice = Data.tuple("Alice", 30)
const bob = Data.tuple("Bob", 40)

console.log(Equal.equals(alice, alice)) // Output: true
console.log(Equal.equals(alice, Data.tuple("Alice", 30))) // Output: true
console.log(Equal.equals(alice, ["Alice", 30])) // Output: false
console.log(Equal.equals(alice, bob)) // Output: false
```

### array

Use arrays to compare multiple values:

```ts
import { Data, Equal } from "effect"

const alice = Data.struct({ name: "Alice", age: 30 })
const bob = Data.struct({ name: "Bob", age: 40 })
const persons = Data.array([alice, bob])

console.log(
  Equal.equals(
    persons,
    Data.array([
      Data.struct({ name: "Alice", age: 30 }),
      Data.struct({ name: "Bob", age: 40 })
    ])
  )
) // Output: true
```

## Constructors

The module introduces a concept known as "Case classes," which automate various essential operations when defining data types, including generating constructors, handling equality checks, and managing hashing.

Case classes can be defined in two primary ways:

- as plain objects using `case` or `tagged`
- as TypeScript classes using `Class` or `TaggedClass`

### case

Automatically provides implementations for constructors, equality checks, and hashing for your data type.

```ts
import { Data, Equal } from "effect"

interface Person {
  readonly name: string
}

const Person = Data.case<Person>()

const mike1 = Person({ name: "Mike" })
const mike2 = Person({ name: "Mike" })
const john = Person({ name: "John" })

console.log(Equal.equals(mike1, mike2)) // Output: true
console.log(Equal.equals(mike1, john)) // Output: false
```

### tagged

Simplifies the process of defining a data type that includes a tag field.

```ts
import { Data } from "effect"

interface Person {
  readonly _tag: "Person"
  readonly name: string
}

const Person = Data.tagged<Person>("Person")

const mike = Person({ name: "Mike" })
const john = Person({ name: "John" })

console.log(mike) // Output: { name: 'Mike', _tag: 'Person' }
```

### Class

Use `Data.Class` for a class-oriented structure:

```ts
import { Data, Equal } from "effect"

class Person extends Data.Class<{ name: string }> {}

const mike1 = new Person({ name: "Mike" })
const mike2 = new Person({ name: "Mike" })
const john = new Person({ name: "John" })

console.log(Equal.equals(mike1, mike2)) // Output: true
console.log(Equal.equals(mike1, john)) // Output: false
```

### TaggedClass

Utilize `Data.TaggedClass` for class-based structures with tags.

```ts
import { Data, Equal } from "effect"

class Person extends Data.TaggedClass("Person")<{ name: string }> {}

const mike1 = new Person({ name: "Mike" })
const mike2 = new Person({ name: "Mike" })
const john = new Person({ name: "John" })

console.log(Equal.equals(mike1, mike2)) // Output: true
console.log(Equal.equals(mike1, john)) // Output: false
```

## Union of Tagged Structs

Create a disjoint union of tagged structs using `Data.TaggedEnum`.

### Definition

```ts
import { Data, Equal } from "effect"

type RemoteData = Data.TaggedEnum<{
  Loading: {}
  Success: { readonly data: string }
  Failure: { readonly reason: string }
}>

const { Loading, Success, Failure } = Data.taggedEnum<RemoteData>()

const state1 = Loading()
const state2 = Success({ data: "test" })
const state3 = Success({ data: "test" })
const state4 = Failure({ reason: "not found" })

console.log(Equal.equals(state2, state3)) // Output: true
console.log(Equal.equals(state2, state4)) // Output: false
```

### Adding Generics

Create tagged unions with generics using `TaggedEnum.WithGenerics`.

```ts
import { Data } from "effect"

type RemoteData<Success, Failure> = Data.TaggedEnum<{
  Loading: {}
  Success: { data: Success }
  Failure: { reason: Failure }
}>

interface RemoteDataDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: RemoteData<this["A"], this["B"]>
}

const { Loading, Failure, Success } = Data.taggedEnum<RemoteDataDefinition>()

const loading = Loading()
const failure = Failure({ reason: "not found" })
const success = Success({ data: 1 })
```

### $is and $match

Use `$is` and `$match` for type guards and pattern matching.

```ts
import { Data } from "effect"

type RemoteData = Data.TaggedEnum<{
  Loading: {}
  Success: { readonly data: string }
  Failure: { readonly reason: string }
}>

const { $is, $match, Loading, Success, Failure } = Data.taggedEnum<RemoteData>()

const isLoading = $is("Loading")

console.log(isLoading(Loading())) // true
console.log(isLoading(Success({ data: "test" }))) // false

const matcher = $match({
  Loading: () => "this is a Loading",
  Success: ({ data }) => `this is a Success: ${data}`,
  Failure: ({ reason }) => `this is a Failure: ${reason}`
})

console.log(matcher(Success({ data: "test" }))) // "this is a Success: test"
```

## Errors

In Effect, errors play a crucial role, and defining and constructing them is made easier with two specialized constructors:

- `Error`
- `TaggedError`

### Error

Create an `Error` with additional fields.

```ts
import { Data } from "effect"

class NotFound extends Data.Error<{ message: string; file: string }> {}

const err = new NotFound({
  message: "Cannot find this file",
  file: "foo.txt"
})

console.log(err instanceof Error) // Output: true
console.log(err.file) // Output: foo.txt
```

### TaggedError

Automatically adds a `_tag` field to custom errors.

```ts
import { Data, Effect, Console } from "effect"

class NotFound extends Data.TaggedError("NotFound")<{
  message: string
  file: string
}> {}

const program = Effect.gen(function* () {
  yield* new NotFound({
    message: "Cannot find this file",
    file: "foo.txt"
  })
}).pipe(
  Effect.catchTag("NotFound", (err) =>
    Console.error(`${err.message} (${err.file})`)
  )
)

Effect.runPromise(program)
// Output: Cannot find this file (foo.txt)
```

### Native Cause Support

Integrate with the native `cause` property of JavaScript's `Error`.

```ts
import { Data, Effect } from "effect"

class MyError extends Data.Error<{ cause: Error }> {}

const program = Effect.gen(function* () {
  yield* new MyError({
    cause: new Error("Something went wrong")
  })
})

Effect.runPromise(program)
```

---
title: Duration
excerpt: Explore the `Duration` data type in Effect for representing non-negative spans of time. Learn to create durations with different units, including milliseconds, seconds, and minutes. Discover options for creating infinite durations and decoding values. Retrieve duration values in milliseconds or nanoseconds. Compare durations and perform arithmetic operations like addition and multiplication. Master the capabilities of the `Duration` module for efficient time handling in your applications.
---

The `Duration` data type represents specific non-negative spans of time, commonly used for time intervals, timeouts, delays, or scheduling. It provides a convenient way to work with time units and perform calculations on durations.

## Creating Durations

The `Duration` module offers several constructors for creating durations in different units:

```ts
import { Duration } from "effect"

const duration1 = Duration.millis(100) // 100 milliseconds
const duration2 = Duration.seconds(2) // 2 seconds
const duration3 = Duration.minutes(5) // 5 minutes
```

You can create durations using nanoseconds, microseconds, milliseconds, seconds, minutes, hours, days, and weeks. For infinite durations, use `Duration.infinity`:

```ts
import { Duration } from "effect"

console.log(String(Duration.infinity))
/*
Output:
{
  "_id": "Duration",
  "_tag": "Infinity"
}
*/
```

To create durations using the `Duration.decode` helper:

- `number`s are treated as milliseconds
- `bigint`s are treated as nanoseconds
- strings must be formatted as `"${number} ${unit}"`

```ts
import { Duration } from "effect"

Duration.decode(10n) // Duration.nanos(10)
Duration.decode(100) // Duration.millis(100)
Duration.decode(Infinity) // Duration.infinity

Duration.decode("10 nanos") // Duration.nanos(10)
Duration.decode("20 micros") // Duration.micros(20)
Duration.decode("100 millis") // Duration.millis(100)
Duration.decode("2 seconds") // Duration.seconds(2)
Duration.decode("5 minutes") // Duration.minutes(5)
Duration.decode("7 hours") // Duration.hours(7)
Duration.decode("3 weeks") // Duration.weeks(3)
```

## Getting the Duration Value

Retrieve the value of a duration in milliseconds using `toMillis`:

```ts
import { Duration } from "effect"

console.log(Duration.toMillis(Duration.seconds(30))) // Output: 30000
```

Retrieve the value in nanoseconds using `toNanos`:

```ts
import { Duration } from "effect"

console.log(Duration.toNanos(Duration.millis(100)))
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 100000000n
}
*/
```

`toNanos` returns an `Option<bigint>` since the duration might be infinite. Use `unsafeToNanos` for a `bigint` return type, but it throws an error for infinite durations:

```ts
import { Duration } from "effect"

console.log(Duration.unsafeToNanos(Duration.millis(100))) // Output: 100000000n
console.log(Duration.unsafeToNanos(Duration.infinity)) // throws "Cannot convert infinite duration to nanos"
```

## Comparing Durations

Compare two durations using the following functions:

- `lessThan`: returns `true` if the first duration is less than the second
- `lessThanOrEqualTo`: returns `true` if the first duration is less than or equal to the second
- `greaterThan`: returns `true` if the first duration is greater than the second
- `greaterThanOrEqualTo`: returns `true` if the first duration is greater than or equal to the second

```ts
import { Duration } from "effect"

const duration1 = Duration.seconds(30)
const duration2 = Duration.minutes(1)

console.log(Duration.lessThan(duration1, duration2)) // Output: true
console.log(Duration.lessThanOrEqualTo(duration1, duration2)) // Output: true
console.log(Duration.greaterThan(duration1, duration2)) // Output: false
console.log(Duration.greaterThanOrEqualTo(duration1, duration2)) // Output: false
```

## Performing Arithmetic Operations

Perform arithmetic operations on durations, such as addition and multiplication:

```ts
import { Duration } from "effect"

const duration1 = Duration.seconds(30)
const duration2 = Duration.minutes(1)

console.log(String(Duration.sum(duration1, duration2)))
/*
Output:
{
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 90000
}
*/

console.log(String(Duration.times(duration1, 2))) // Output: Duration("60000 millis")
/*
Output:
{
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 60000
}
*/

# Either

The `Either` data type represents two exclusive possible values: an `Either<R, L>` can be either a `Right` value or a `Left` value, where `R` represents the type of the `Right` value and `L` represents the type of the `Left` value.

## Understanding Either and Exit

- `Either` is primarily used as a simple discriminated union and is not recommended as the main result type for operations requiring detailed error information.
- `Exit` is the preferred result type within Effect for capturing comprehensive details about failures. It encapsulates the outcomes of effectful computations, distinguishing between success and various failure modes, such as errors, defects, and interruptions.

## Creating Eithers

You can create an `Either` using the `Either.right` and `Either.left` constructors.

- The `Either.right` function takes a value of type `R` and constructs a `Either<R, never>`:

  ```ts
  import { Either } from "effect"

  const rightValue = Either.right(42)
  ```

- The `Either.left` function takes a value of type `L` and constructs a `Either<never, L>`:

  ```ts
  import { Either } from "effect"

  const leftValue = Either.left("not a number")
  ```

## Guards

You can determine whether an `Either` is a `Left` or a `Right` by using the `Either.isLeft` and `Either.isRight` guards:

```ts
import { Either } from "effect"

const foo = Either.right(42)

if (Either.isLeft(foo)) {
  console.log(`The left value is: ${foo.left}`)
} else {
  console.log(`The Right value is: ${foo.right}`)
}
// Output: "The Right value is: 42"
```

## Pattern Matching

The `Either.match` function allows you to handle different cases of an `Either` by providing separate callbacks for each case:

```ts
import { Either } from "effect"

const foo = Either.right(42)

const message = Either.match(foo, {
  onLeft: (left) => `The left value is: ${left}`,
  onRight: (right) => `The Right value is: ${right}`
})

console.log(message) // Output: "The Right value is: 42"
```

Using `match` instead of `isLeft` or `isRight` can be more expressive and provide a clear way to handle both cases of an `Either`.

## Working with Either

Once you have an `Either`, there are several operations you can perform on it.

### Mapping over the Right Value

You can use the `Either.map` function to transform the `Right` value of an `Either`. The `Either.map` function takes a transformation function that maps the `Right` value.

If the `Either` value is a `Left` value, the transformation function is ignored, and the `Left` value is returned unchanged.

**Example**

```ts
import { Either } from "effect"

Either.map(Either.right(1), (n) => n + 1) // right(2)

Either.map(Either.left("not a number"), (n) => n + 1) // left("not a number")
```

### Mapping over the Left Value

You can use the `Either.mapLeft` function to transform the `Left` value of an Either. The `mapLeft` function takes a transformation function that maps the `Left`.

If the `Either` value is a `Right` value, the transformation function is ignored, and the `Right` value is returned unchanged.

**Example**

```ts
import { Either } from "effect"

Either.mapLeft(Either.right(1), (s) => s + "!") // right(1)

Either.mapLeft(Either.left("not a number"), (s) => s + "!") // left("not a number!")
```

### Mapping over Both Values

You can use the `Either.mapBoth` function to transform both the `Left` and `Right` values of an `Either`. The `mapBoth` function takes two transformation functions: one for the `Left` value and one for the `Right` value.

**Example**

```ts
import { Either } from "effect"

Either.mapBoth(Either.right(1), {
  onLeft: (s) => s + "!",
  onRight: (n) => n + 1
}) // right(2)

Either.mapBoth(Either.left("not a number"), {
  onLeft: (s) => s + "!",
  onRight: (n) => n + 1
}) // left("not a number!")
```

## Interop with Effect

The `Either` type is a subtype of the `Effect` type, which means that it can be seamlessly used with functions from the `Effect` module. These functions are primarily designed to work with `Effect` values, but they can also handle `Either` values and process them correctly.

In the context of `Effect`, the two members of the `Either` type are treated as follows:

- `Left<L>` is equivalent to `Effect<never, L>`
- `Right<R>` is equivalent to `Effect<R>`

To illustrate this interoperability, consider the following example:

```ts
import { Effect, Either } from "effect"

const head = <A>(array: ReadonlyArray<A>): Either.Either<A, string> =>
  array.length > 0 ? Either.right(array[0]) : Either.left("empty array")

const foo = Effect.runSync(Effect.andThen(Effect.succeed([1, 2, 3]), head))
console.log(foo) // Output: 1

const bar = Effect.runSync(Effect.andThen(Effect.succeed([]), head)) // throws "empty array"
```

## Combining Two or More Eithers

The `Either.zipWith` function allows you to combine two `Either` values using a provided function. It creates a new `Either` that holds the combined value of both original `Either` values.

```ts
import { Either } from "effect"

const maybeName: Either.Either<string, Error> = Either.right("John")
const maybeAge: Either.Either<number, Error> = Either.right(25)

const person = Either.zipWith(maybeName, maybeAge, (name, age) => ({
  name: name.toUpperCase(),
  age
}))

console.log(person)
/*
Output:
{ _id: 'Either', _tag: 'Right', right: { name: 'JOHN', age: 25 } }
*/
```

The `Either.zipWith` function takes three arguments:

- The first `Either` you want to combine
- The second `Either` you want to combine
- A function that takes two arguments, which are the values held by the two `Either`, and returns the combined value

If either of the two `Either` values is `Left`, the resulting `Either` will also be `Left`, containing the value of the first encountered `Left`:

```ts
import { Either } from "effect"

const maybeName: Either.Either<string, Error> = Either.right("John")
const maybeAge: Either.Either<number, Error> = Either.left(
  new Error("Oh no!")
)

const person = Either.zipWith(maybeName, maybeAge, (name, age) => ({
  name: name.toUpperCase(),
  age
}))

console.log(person)
/*
Output:
{ _id: 'Either', _tag: 'Left', left: new Error("Oh no!") }
*/
```

If you need to combine two or more `Either`s without transforming the values they hold, you can use `Either.all`, which takes a collection of `Either`s and returns an `Either` with the same structure.

- If a tuple is provided, the returned `Either` will contain a tuple with the same length.
- If a struct is provided, the returned `Either` will contain a struct with the same keys.
- If an iterable is provided, the returned `Either` will contain an array.

```ts
import { Either } from "effect"

const maybeName: Either.Either<string, Error> = Either.right("John")
const maybeAge: Either.Either<number, Error> = Either.right(25)

const tuple = Either.all([maybeName, maybeAge])

const struct = Either.all({ name: maybeName, age: maybeAge })
```

Note that if one or more `Either` is a `Left`, then the first encountered `Left` will be returned:

```ts
import { Either } from "effect"

const maybeName: Either.Either<string, Error> = Either.left(
  new Error("name not found")
)
const maybeAge: Either.Either<number, Error> = Either.left(
  new Error("age not found")
)

const tuple = Either.all([maybeName, maybeAge])

console.log(tuple)
/*
Output:
{ _id: 'Either', _tag: 'Left', left: new Error("name not found") }
*/
```

## gen

There is also `Either.gen`, which provides a convenient syntax, akin to async/await, for writing code involving `Either` and using generators.

Using `Either.gen` instead of `Either.zipWith`:

```ts
import { Either } from "effect"

const maybeName: Either.Either<string, Error> = Either.right("John")
const maybeAge: Either.Either<number, Error> = Either.right(25)

const person = Either.gen(function* () {
  const name = (yield* maybeName).toUpperCase()
  const age = yield* maybeAge
  return { name, age }
})

console.log(person)
/*
Output:
{ _id: 'Either', _tag: 'Right', right: { name: 'JOHN', age: 25 } }
*/
```

If either of the two `Either` values is `Left`, the resulting `Either` will also be `Left`:

```ts
import { Either } from "effect"

const maybeName: Either.Either<string, Error> = Either.right("John")
const maybeAge: Either.Either<number, Error> = Either.left(
  new Error("Oh no!")
)

const person = Either.gen(function* () {
  const name = (yield* maybeName).toUpperCase()
  const age = yield* maybeAge
  return { name, age }
})

console.log(person)
/*
Output:
{ _id: 'Either', _tag: 'Left', left: new Error("Oh no!") }
*/

# Exit

An `Exit<A, E>` describes the result of executing an `Effect` workflow.

There are two possible values for an `Exit<A, E>`:

- `Exit.Success` contains a success value of type `A`.
- `Exit.Failure` contains a failure Cause of type `E`.

## Matching

To handle the different outcomes of an `Exit`, we can use the `Exit.match` function:

```ts
import { Effect, Exit } from "effect"

const simulatedSuccess = Effect.runSyncExit(Effect.succeed(1))

Exit.match(simulatedSuccess, {
  onFailure: (cause) =>
    console.error(`Exited with failure state: ${cause._tag}`),
  onSuccess: (value) => console.log(`Exited with success value: ${value}`)
})
// Output: "Exited with success value: 1"

const simulatedFailure = Effect.runSyncExit(Effect.fail("error"))

Exit.match(simulatedFailure, {
  onFailure: (cause) =>
    console.error(`Exited with failure state: ${cause._tag}`),
  onSuccess: (value) => console.log(`Exited with success value: ${value}`)
})
// Output: "Exited with failure state: Fail"
```

In this example, we first simulate a successful `Effect` execution using `Effect.runSyncExit` and `Effect.succeed`. We then handle the `Exit` using `Exit.match`, where the `onSuccess` callback prints the success value.

Next, we simulate a failure using `Effect.runSyncExit` and `Effect.fail`, and handle the `Exit` again using `Exit.match`, where the `onFailure` callback prints the failure state.

## Exit vs Either

An `Exit<A, E>` is conceptually an `Either<A, Cause<E>>`. However, it's important to note that Cause encompasses more states than just the expected error type `E`. It also includes other states such as interruption and defects (unexpected errors), as well as the possibility of combining multiple Cause values together.

## Exit vs Effect

The `Exit` data type is a subtype of the `Effect` type, which means that an `Exit` is itself an `Effect`. The reason for this is that a result can be considered as a constant computation. Technically, `Effect.succeed` is an alias for `Exit.succeed`, and `Effect.fail` is an alias for `Exit.fail` (avoiding conversions between `Exit` and `Effect` is important for performance, as boxing and unboxing have a cost).

# Referenced Data Types

Referenced data types are data types that store references to the actual data rather than the data itself. This allows for more efficient memory usage and can simplify data management in programming.

## Key Concepts

- **Reference vs. Value Types**: 
  - Value types store the actual data. 
  - Reference types store a reference (or pointer) to the data's location in memory.

- **Common Referenced Data Types**:
  - **Classes**: User-defined types that can contain data members and methods.
  - **Arrays**: Collections of items stored at contiguous memory locations.
  - **Strings**: Sequences of characters treated as a single data type.

## Advantages

- **Memory Efficiency**: Multiple references can point to the same data, reducing memory usage.
- **Flexibility**: Easier to manage and manipulate complex data structures.

## Disadvantages

- **Performance Overhead**: Dereferencing can introduce performance costs.
- **Null References**: Can lead to errors if a reference points to no data.

## Usage

Referenced data types are widely used in object-oriented programming, data structures, and when managing large datasets. Understanding how to effectively use these types is crucial for efficient programming and data management.

# Option

Master the versatile `Option` data type for handling optional values. Learn to create, model optional properties, and utilize guards. Discover powerful functions like `Option.map`, `Option.flatMap`, and explore seamless interop with nullable types and the Effect module. Also, delve into fallback strategies, working with nullable types, combining options, and much more.

The `Option` data type represents optional values. An `Option` can be either `Some`, which contains a value, or `None`, indicating the absence of a value.

## Creating Options

### some

The `Option.some` constructor takes a value of type `A` and returns an `Option<A>` that holds that value:

```ts
import { Option } from "effect"

const value = Option.some(1) // An Option holding the number 1
```

### none

The `Option.none` constructor returns an `Option<never>`, representing the absence of a value:

```ts
import { Option } from "effect"

const noValue = Option.none() // An Option holding no value
```

### liftPredicate

Create an `Option` based on a predicate:

```ts
import { Option } from "effect"

const isPositive = (n: number) => n > 0

const parsePositive = (n: number): Option.Option<number> =>
  isPositive(n) ? Option.some(n) : Option.none()
```

More concisely using `Option.liftPredicate`:

```ts
import { Option } from "effect"

const parsePositive = Option.liftPredicate(isPositive)
```

## Modeling Optional Properties

Example of a `User` model with an optional `"email"` property:

```ts
import { Option } from "effect"

interface User {
  readonly id: number
  readonly username: string
  readonly email: Option.Option<string>
}
```

Creating instances of `User`:

```ts
const withEmail: User = {
  id: 1,
  username: "john_doe",
  email: Option.some("john.doe@example.com")
}

const withoutEmail: User = {
  id: 2,
  username: "jane_doe",
  email: Option.none()
}
```

## Guards

Determine whether an `Option` is a `Some` or a `None` using `isSome` and `isNone`:

```ts
import { Option } from "effect"

const foo = Option.some(1)

console.log(Option.isSome(foo)) // Output: true

if (Option.isNone(foo)) {
  console.log("Option is empty")
} else {
  console.log(`Option has a value: ${foo.value}`)
}
```

## Matching

Handle different cases of an `Option` value using `Option.match`:

```ts
import { Option } from "effect"

const result = Option.match(foo, {
  onNone: () => "Option is empty",
  onSome: (value) => `Option has a value: ${value}`
})

console.log(result) // Output: "Option has a value: 1"
```

## Working with Option

### map

Transform the value inside an `Option`:

```ts
import { Option } from "effect"

const maybeIncremented = Option.map(Option.some(1), (n) => n + 1) // some(2)
```

Handling absence of a value:

```ts
const maybeIncremented = Option.map(Option.none(), (n) => n + 1) // none()
```

### flatMap

Sequence computations that depend on the presence of a value:

```ts
import { Option } from "effect"

const user: User = {
  id: 1,
  username: "john_doe",
  email: Option.some("john.doe@example.com"),
  address: Option.some({
    city: "New York",
    street: Option.some("123 Main St")
  })
}

const street = user.address.pipe(Option.flatMap((address) => address.street))
```

### filter

Filter an `Option` using a predicate:

```ts
import { Option } from "effect"

const removeEmptyString = (input: Option.Option<string>) =>
  Option.filter(input, (value) => value !== "")
```

## Getting the Value from an Option

Retrieve the value stored within an `Option`:

- `getOrThrow`: Retrieves the wrapped value or throws an error if `None`.

  ```ts
  Option.getOrThrow(Option.some(10)) // 10
  ```

- `getOrNull` and `getOrUndefined`: Retrieve the value as `null` or `undefined`.

  ```ts
  Option.getOrNull(Option.none()) // null
  ```

- `getOrElse`: Provide a default value if `None`.

  ```ts
  Option.getOrElse(Option.none(), () => 0) // 0
  ```

## Fallback

Use `Option.orElse` to chain computations:

```ts
const result = performComputation().pipe(
  Option.orElse(() => performAlternativeComputation())
)
```

Retrieve the first `Some` in an iterable:

```ts
const first = Option.firstSomeOf([
  Option.none(),
  Option.some(2),
  Option.none(),
  Option.some(3)
]) // some(2)
```

## Interop with Nullable Types

Create an `Option` from a nullable value:

```ts
Option.fromNullable(null) // none()
```

Convert `Option` to nullable:

```ts
Option.getOrNull(Option.none()) // null
```

## Interop with Effect

The `Option` type is a subtype of the `Effect` type:

```ts
const head = <A>(as: ReadonlyArray<A>): Option.Option<A> =>
  as.length > 0 ? Option.some(as[0]) : Option.none()
```

## Combining Two or More Options

Combine two `Option` values using `Option.zipWith`:

```ts
const person = Option.zipWith(maybeName, maybeAge, (name, age) => ({
  name: name.toUpperCase(),
  age
}))
```

Use `Option.all` to combine multiple `Option`s:

```ts
const tuple = Option.all([maybeName, maybeAge])
```

## gen

Use `Option.gen` for a convenient syntax:

```ts
const person = Option.gen(function* () {
  const name = (yield* maybeName).toUpperCase()
  const age = yield* maybeAge
  return { name, age }
})
```

## Comparing Option Values with Equivalence

Compare `Option` values using `Option.getEquivalence`:

```ts
const myEquivalence = Option.getEquivalence(Equivalence.number)

console.log(myEquivalence(Option.some(1), Option.some(1))) // true
```

## Sorting Option Values with Order

Sort a collection of `Option` values using `Option.getOrder`:

```ts
const myOrder = Option.getOrder(Order.number)

console.log(Array.sort(myOrder)(items))
```

Advanced example for sorting optional dates in reverse order:

```ts
const sorted = Array.sortWith(
  items,
  item => item.data,
  Order.reverse(Option.getOrder(Order.Date))
)
```

# Redacted Module Documentation

The Redacted module in "effect" provides tools to securely handle sensitive data within applications, preventing accidental exposure in logs or error messages. It offers functions to create, manage, and compare `Redacted` instances, ensuring sensitive information is protected and managed appropriately.

## make

Creates a `Redacted<A>` instance from a given value `A`, securely hiding its content.

```ts
import { Redacted } from "effect"

// Creating a redacted value
const API_KEY = Redacted.make("1234567890")

console.log(API_KEY) // Output: {}
console.log(String(API_KEY)) // Output: <redacted>
```

## value

Retrieves the original value from a `Redacted` instance. Use this function with caution, as it exposes the sensitive data.

```ts
import { Redacted } from "effect"

const API_KEY = Redacted.make("1234567890")

console.log(Redacted.value(API_KEY)) // Output: "1234567890"
```

## unsafeWipe

Erases the underlying value of a `Redacted` instance, rendering it unusable. This function ensures that sensitive data does not remain in memory longer than necessary.

```ts
import { Redacted } from "effect"

const API_KEY = Redacted.make("1234567890")

console.log(Redacted.value(API_KEY)) // Output: "1234567890"

Redacted.unsafeWipe(API_KEY)

console.log(Redacted.value(API_KEY)) // throws Error: Unable to get redacted value
```

## getEquivalence

Generates an equivalence relation for `Redacted<A>` values based on an equivalence relation for the underlying values `A`. This function is useful for comparing `Redacted` instances without exposing their contents.

```ts
import { Redacted, Equivalence } from "effect"

const API_KEY1 = Redacted.make("1234567890")
const API_KEY2 = Redacted.make("1-34567890")
const API_KEY3 = Redacted.make("1234567890")

const equivalence = Redacted.getEquivalence(Equivalence.string)

console.log(equivalence(API_KEY1, API_KEY2)) // Output: false
console.log(equivalence(API_KEY1, API_KEY3)) // Output: true
```

# Equal

The Equal module provides a solution for value-based equality checks, addressing issues with JavaScript's native reference-based equality operators. Developers can define custom equality checks, ensuring data integrity and promoting predictable behavior. To implement custom equality, developers can either implement the `Equal` interface or leverage the simpler solution offered by the Data module, which automatically generates default implementations for both `Equal` and `Hash`. This module also explores working with collections like `HashSet` and `HashMap` to handle value-based equality checks effectively.

## Overview

The Equal module allows developers to define and check for equality between two values in TypeScript.

### Key Features

1. **Value-Based Equality**: JavaScript's native equality operators (`===` and `==`) check for equality by reference. The Equal module allows developers to define custom equality checks based on the values of objects.

2. **Custom Equality**: Developers can implement custom equality checks for their data types and classes by implementing the `Equal` interface.

3. **Data Integrity**: Value-based equality checks help maintain data integrity by preventing identical data from being duplicated within collections.

4. **Predictable Behavior**: The module promotes predictable behavior when comparing objects by explicitly defining equality criteria.

## How to Perform Equality Checking

In Effect, it is advisable to stop using JavaScript's `===` and `==` operators and instead rely on the `Equal.equals` function. This function works with any data type that implements the `Equal` trait, such as Option, Either, HashSet, and HashMap.

When using `Equal.equals`, if the objects do not implement the `Equal` trait, it defaults to using the `===` operator for comparison:

```typescript
import { Equal } from "effect"

const a = { name: "Alice", age: 30 }
const b = { name: "Alice", age: 30 }

console.log(Equal.equals(a, b)) // Output: false
```

### Custom Equality Implementation

To create custom equality behavior, implement the `Equal` interface in your models. This interface extends the `Hash` interface from the Hash module.

Example of implementing the `Equal` interface for a `Person` class:

```typescript
import { Equal, Hash } from "effect"

export class Person implements Equal.Equal {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly age: number
  ) {}

  [Equal.symbol](that: Equal.Equal): boolean {
    if (that instanceof Person) {
      return (
        Equal.equals(this.id, that.id) &&
        Equal.equals(this.name, that.name) &&
        Equal.equals(this.age, that.age)
      )
    }
    return false
  }

  [Hash.symbol](): number {
    return Hash.hash(this.id)
  }
}
```

Once implemented, you can use `Equal.equals` to check for equality:

```typescript
import { Equal } from "effect"
import { Person } from "./Person"

const alice = new Person(1, "Alice", 30)
console.log(Equal.equals(alice, new Person(1, "Alice", 30))) // Output: true
const bob = new Person(2, "Bob", 40)
console.log(Equal.equals(alice, bob)) // Output: false
```

### Simplifying Equality with the Data Module

For straightforward value equality checks, the Data module provides a simpler solution by automatically generating default implementations for both `Equal` and `Hash`.

Example using the Data module:

```typescript
import { Equal, Data } from "effect"

const alice = Data.struct({ name: "Alice", age: 30 })
const bob = Data.struct({ name: "Bob", age: 40 })

console.log(Equal.equals(alice, alice)) // Output: true
console.log(Equal.equals(alice, Data.struct({ name: "Alice", age: 30 }))) // Output: true
console.log(Equal.equals(alice, bob)) // Output: false
```

## Working with Collections

JavaScript's built-in `Set` and `Map` check equality by reference, which can lead to unexpected results:

```typescript
const set = new Set()
set.add({ name: "Alice", age: 30 })
set.add({ name: "Alice", age: 30 })
console.log(set.size) // Output: 2
```

To perform value-based equality checks, use the `Hash*` collection types from the effect package, such as HashSet and HashMap.

Example using HashSet:

```typescript
import { HashSet, Data } from "effect"

const set = HashSet.empty().pipe(
  HashSet.add(Data.struct({ name: "Alice", age: 30 })),
  HashSet.add(Data.struct({ name: "Alice", age: 30 }))
)

console.log(HashSet.size(set)) // Output: 1
```

Example using HashMap:

```typescript
import { HashMap, Data } from "effect"

const map = HashMap.empty().pipe(
  HashMap.set(Data.struct({ name: "Alice", age: 30 }), 1),
  HashMap.set(Data.struct({ name: "Alice", age: 30 }), 2)
)

console.log(HashMap.size(map)) // Output: 1
console.log(HashMap.get(map, Data.struct({ name: "Alice", age: 30 })))
```

In these examples, HashSet and HashMap correctly handle value-based equality checks, allowing for efficient data management.

# Hash

The `Hash` trait in Effect is closely tied to the `Equal` trait and serves a supportive role in optimizing equality checks by providing a mechanism for hashing. Hashing is crucial for efficiently determining equality between two values, particularly in data structures like hash tables.

## Role of Hash in Equality Checking

The main function of the `Hash` trait is to provide a quick and efficient way to determine if two values are definitely not equal, complementing the `Equal` trait. When two values implement the `Equal` trait, their hash values (computed using the `Hash` trait) are compared first:

- **Different Hash Values**: If the hash values are different, the values themselves are guaranteed to be different. This quick check avoids potentially expensive equality checks.
- **Same Hash Values**: If the hash values are the same, it does not guarantee equality, only that they might be. A more thorough comparison using the `Equal` trait is then performed to determine actual equality.

This method dramatically speeds up the equality checking process, especially in collections where quick look-up and insertion times are crucial, such as in hash sets or hash maps.

## Practical Example and Explanation

Consider a scenario with a custom `Person` class, where you want to check if two instances are equal based on their properties. By implementing both the `Equal` and `Hash` traits, you can efficiently manage these checks:

```ts
import { Equal, Hash } from "effect"

class Person implements Equal.Equal {
  constructor(
    readonly id: number,  // Unique identifier for each person
    readonly name: string,
    readonly age: number
  ) {}

  // Defines equality based on id, name, and age
  [Equal.symbol](that: Equal.Equal): boolean {
    if (that instanceof Person) {
      return (
        Equal.equals(this.id, that.id) &&
        Equal.equals(this.name, that.name) &&
        Equal.equals(this.age, that.age)
      )
    }
    return false
  }

  // Generates a hash code based primarily on the unique id
  [Hash.symbol](): number {
    return Hash.hash(this.id)
  }
}

const alice = new Person(1, "Alice", 30)
console.log(Equal.equals(alice, new Person(1, "Alice", 30))) // Output: true

const bob = new Person(2, "Bob", 40)
console.log(Equal.equals(alice, bob)) // Output: false
```

In this code snippet:
- The `[Equal.symbol]` method determines equality by comparing the `id`, `name`, and `age` fields of `Person` instances, ensuring a comprehensive equality check.
- The `[Hash.symbol]` method computes a hash code using the `id` of the person, optimizing performance in hashing operations.
- The equality check returns `true` when comparing `alice` to a new `Person` object with identical property values and `false` when comparing `alice` to `bob` due to differing property values.

# Traits

Traits are characteristics or attributes that define the behavior and properties of an object or entity in a system. They can be used to enhance functionality, provide additional features, or modify existing behaviors.

## Types of Traits

1. **Behavioral Traits**: Define how an object behaves in different situations.
2. **Functional Traits**: Specify the capabilities or features of an object.
3. **Visual Traits**: Determine the appearance or style of an object.

## Implementing Traits

To implement traits, follow these steps:

1. **Define the Trait**: Create a trait with the desired properties and methods.
2. **Attach the Trait**: Associate the trait with the target object or class.
3. **Use the Trait**: Invoke the methods or properties defined in the trait as needed.

## Best Practices

- Keep traits focused on a single responsibility.
- Avoid deep inheritance hierarchies; prefer composition.
- Document traits clearly to ensure ease of use and understanding.

## Examples

- A `Colorable` trait that allows objects to change color.
- A `Loggable` trait that provides logging functionality to any object.

## Conclusion

Traits are a powerful way to enhance the modularity and reusability of code. By defining and implementing traits effectively, developers can create more flexible and maintainable systems.

# Equivalence

**Equivalence behaviour documentation**

This page is a stub. Help us expand it by contributing!

To contribute to the documentation, please join our Discord community at the Docs channel and let us know which part of the documentation you would like to contribute to. We appreciate your help in improving our library's documentation. Thank you!

# Higher-Kinded Types

Higher-Kinded Types (HKTs) are a valuable concept in programming that can simplify code and enhance flexibility. They allow the creation of generic structures that can work with various data types, promoting code reuse and maintainability.

## What Are Higher-Kinded Types?

A higher-kinded type abstracts over another type, enabling the creation of generic structures adaptable to different data types. This facilitates the implementation of similar functionality across various data structures, such as arrays, chunks, and options.

### The Need for HKTs

Consider the following functions that share similarities but operate on different data types:

```ts
import { Chunk, Option } from "effect"

declare const mapArray: <A, B>(self: Array<A>, f: (a: A) => B) => Array<B>
declare const mapChunk: <A, B>(self: Chunk.Chunk<A>, f: (a: A) => B) => Chunk.Chunk<B>
declare const mapOption: <A, B>(self: Option.Option<A>, f: (a: A) => B) => Option.Option<B>
```

These functions are nearly identical, differing only in the data type they operate on. A common interface could enhance code organization and maintainability.

### The Ideal Solution

An ideal interface could be defined as follows:

```ts
interface Mappable<F<~>> {
  readonly map: <A, B>(self: F<A>, f: (a: A) => B) => F<B>
}
```

This allows for the following declarations:

```ts
declare const mapArray: Mappable<Array>["map"]
declare const mapChunk: Mappable<Chunk>["map"]
declare const mapOption: Mappable<Option>["map"]
```

Instances of this interface can be defined for different data types:

```ts
declare const ArrayMappable: Mappable<Array>
declare const ChunkMappable: Mappable<Chunk>
declare const OptionMappable: Mappable<Option>
```

Generic functions like `stringify` can also be created:

```ts
const stringify =
  <F>(T: Mappable<F>) =>
  (self: F<number>): F<string> =>
    T.map(self, (n) => `number: ${n}`)
```

Usage example:

```ts
const stringifiedArray: Array<string> = stringify(ArrayMappable)([0, 1, 2])
```

### A Brief Terminology

- `F<~>`: Higher-kinded type.
- `Mappable<F<~>>`: Type class.
- `ArrayMappable`: Instance of the `Mappable` type class.

## Type Lambdas

Type Lambdas define type-level functions in TypeScript, allowing the expression of Higher-Kinded Types directly.

### Implementing a Type Lambda

Define a base interface:

```ts
export interface TypeLambda {
  readonly Target: unknown
}
```

### Creating a Type Lambda

For the `Array` data type:

```ts
export interface ArrayTypeLambda extends TypeLambda {
  readonly type: Array<this["Target"]>
}
```

### Applying the Type Lambda

The `Kind` operator applies a Type Lambda to a concrete type:

```ts
export type Kind<F extends TypeLambda, Target> = F extends {
  readonly type: unknown
}
  ? (F & { readonly Target: Target })["type"]
  : { readonly F: F; readonly Target: (_: Target) => Target }
```

Example usage:

```ts
type Test1 = Kind<ArrayTypeLambda, string>
type Test2 = Kind<ArrayTypeLambda, number>
```

Define Type Lambdas for `Chunk` and `Option`:

```ts
export interface ChunkTypeLambda extends TypeLambda {
  readonly type: Chunk.Chunk<this["Target"]>
}

export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option.Option<this["Target"]>
}
```

## Type Classes

Define the `Mappable` type class:

```ts
export interface Mappable<F extends TypeLambda> {
  readonly map: <A, B>(self: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}
```

## Instances

Create instances for specific data types:

```ts
export const MappableArray: Mappable<ArrayTypeLambda> = {
  map: (self, f) => self.map(f)
}

export const MappableChunk: Mappable<ChunkTypeLambda> = {
  map: Chunk.map
}

export const MappableOption: Mappable<OptionTypeLambda> = {
  map: Option.map
}
```

Define the `stringify` function:

```ts
export const stringify =
  <F extends TypeLambda>(TC: Mappable<F>) =>
  (self: Kind<F, number>): Kind<F, string> =>
    TC.map(self, (n) => `number: ${n}`)
```

## Enhancements

To accommodate data types with multiple parameters, such as `Either<A, E>` or `Effect<A, E, R>`, we define additional type parameters:

```ts
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
}
  ? (F & { readonly In: In; readonly Out2: Out2; readonly Out1: Out1; readonly Target: Target })["type"]
  : { readonly F: F; readonly In: (_: In) => void; readonly Out2: () => Out2; readonly Out1: () => Out1; readonly Target: (_: Target) => Target }
```

## Variance

The second branch of the conditional type in `Kind` enforces variance, ensuring type parameters align correctly. For example, defining a `Zippable` type class:

```ts
export interface Zippable<F extends TypeLambda> extends TypeClass<F> {
  readonly zip: <R1, O1, E1, A, R2, O2, E2, B>(
    first: Kind<F, R1, O1, E1, A>,
    second: Kind<F, R2, O2, E2, B>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>
}
```

Define an instance of `Zippable` for the `Either` type:

```ts
export const EitherZippable: Zippable<EitherTypeLambda> = {
  zip: (first, second) => {
    if (Either.isLeft(first)) {
      return Either.left(first.left)
    }
    if (Either.isLeft(second)) {
      return Either.left(second.left)
    }
    return Either.right([first.right, second.right])
  }
}
```

# Behaviours

Behaviours refer to the actions or reactions of an entity in response to external or internal stimuli. Understanding behaviours is crucial for developing effective systems and interactions.

## Types of Behaviours

1. **Reactive Behaviours**: These are responses to specific stimuli or events. They are often immediate and can be observed in real-time.
   
2. **Proactive Behaviours**: These involve anticipating future events and acting in advance to influence outcomes. Proactive behaviours are often strategic and planned.

3. **Adaptive Behaviours**: These are changes in behaviour based on past experiences or environmental changes. Adaptive behaviours allow entities to adjust to new conditions.

## Factors Influencing Behaviours

- **Environment**: The surrounding conditions can significantly impact behaviours. This includes physical, social, and cultural environments.
  
- **Internal States**: Emotions, thoughts, and physiological conditions can drive behaviours. Understanding these internal states is essential for predicting actions.

- **Learning and Experience**: Past experiences shape future behaviours. Learning mechanisms, such as reinforcement and punishment, play a critical role.

## Applications of Behaviour Understanding

- **AI Development**: In artificial intelligence, understanding behaviours can enhance user interaction and system responsiveness.
  
- **Psychology**: Behaviour analysis is fundamental in psychology for diagnosing and treating various conditions.

- **Marketing**: Understanding consumer behaviours can inform marketing strategies and improve customer engagement.

## Conclusion

Behaviours are complex and influenced by various factors. A comprehensive understanding of behaviours is essential for multiple fields, including AI, psychology, and marketing.

# Order

The Order module provides a way to compare values and determine their order. It defines an interface `Order<A>` which represents a function for comparing two values of type `A`. The function returns `-1`, `0`, or `1`, indicating whether the first value is less than, equal to, or greater than the second value.

## Basic Structure

```ts
interface Order<A> {
  (first: A, second: A): -1 | 0 | 1
}
```

## Using the Built-in Orders

The Order module includes built-in comparators for common data types:

- `string`: For comparing strings.
- `number`: For comparing numbers.
- `bigint`: For comparing big integers.
- `Date`: For comparing `Date`s.

### Example Usage

```ts
import { Order } from "effect"

console.log(Order.string("apple", "banana")) // Output: -1
console.log(Order.number(1, 1)) // Output: 0
console.log(Order.bigint(2n, 1n)) // Output: 1
```

## Sorting Arrays

You can sort arrays using the `Array.sort` function without modifying the original array.

### Example

```ts
import { Order, Array } from "effect"

const strings = ["b", "a", "d", "c"]
const result = Array.sort(strings, Order.string)

console.log(strings) // Output: [ 'b', 'a', 'd', 'c' ]
console.log(result) // Output: [ 'a', 'b', 'c', 'd' ]
```

You can also use an `Order` with JavaScript's native `Array.sort` method:

```ts
import { Order } from "effect"

const strings = ["b", "a", "d", "c"]
strings.sort(Order.string)

console.log(strings) // Output: [ 'a', 'b', 'c', 'd' ]
```

## Deriving Orders

You can create custom sorting rules using the `Order.mapInput` function.

### Example

```ts
import { Order, Array } from "effect"

interface Person {
  readonly name: string
  readonly age: number
}

const byName = Order.mapInput(Order.string, (person: Person) => person.name)

const persons: ReadonlyArray<Person> = [
  { name: "Charlie", age: 22 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
]

const sortedPersons = Array.sort(persons, byName)

console.log(sortedPersons) // Output: sorted by name
```

## Combining Orders

You can merge multiple `Order` instances using the `combine` function.

### Example

```ts
import { Order, Array } from "effect"

interface Person {
  readonly name: string
  readonly age: number
}

const byName = Order.mapInput(Order.string, (person: Person) => person.name)
const byAge = Order.mapInput(Order.number, (person: Person) => person.age)
const byNameAge = Order.combine(byName, byAge)

const result = Array.sort(
  [
    { name: "Bob", age: 20 },
    { name: "Alice", age: 18 },
    { name: "Bob", age: 18 }
  ],
  byNameAge
)

console.log(result) // Output: sorted by name, then by age
```

## Additional Useful Functions

### Reversing Order

```ts
import { Order } from "effect"

const ascendingOrder = Order.number
const descendingOrder = Order.reverse(ascendingOrder)

console.log(ascendingOrder(1, 3)) // Output: -1
console.log(descendingOrder(1, 3)) // Output: 1
```

### Comparing Values

```ts
import { Order } from "effect"

console.log(Order.lessThan(Order.number)(1, 2)) // Output: true
console.log(Order.greaterThan(Order.number)(5, 3)) // Output: true
console.log(Order.lessThanOrEqualTo(Order.number)(2, 2)) // Output: true
console.log(Order.greaterThanOrEqualTo(Order.number)(4, 4)) // Output: true
```

### Finding Minimum and Maximum

```ts
import { Order } from "effect"

console.log(Order.min(Order.number)(3, 1)) // Output: 1
console.log(Order.max(Order.number)(5, 8)) // Output: 8
```

### Clamping Values

```ts
import { Order } from "effect"

const clampedValue = Order.clamp(Order.number)(10, {
  minimum: 20,
  maximum: 30
})

console.log(clampedValue) // Output: 20
```

### Checking Value Range

```ts
import { Order } from "effect"

console.log(Order.between(Order.number)(15, { minimum: 10, maximum: 20 })) // Output: true
console.log(Order.between(Order.number)(5, { minimum: 10, maximum: 20 })) // Output: false
```

# API Reference

Explore the Effect library's API documentation, including core functionalities like effect, CLI, OpenTelemetry, platform, printer, and RPC. Delve into the schema package with getting started and API reference sections. Discover the typeclass module for comprehensive typeclass-related documentation.

- effect
- @effect/cli (Getting Started)
- @effect/opentelemetry
- @effect/platform (Getting Started)
- @effect/printer (Getting Started)
- @effect/rpc (Getting Started)
- @effect/typeclass (Getting Started)

# Coming From ZIO

If you are coming to Effect from ZIO, there are a few differences to be aware of.

## Environment

In Effect, the environment required to run an `Effect` workflow is represented as a union of services:

```ts
import { Effect } from "effect"

// `R` is a union of Console | Logger
type Http = Effect.Effect<Response, IOError | HttpError, Console | Logger>

type Response = Record<string, string>

interface IOError {
  readonly _tag: "IOError"
}

interface HttpError {
  readonly _tag: "HttpError"
}

interface Console {
  readonly log: (msg: string) => void
}

interface Logger {
  readonly log: (msg: string) => void
}
```

This differs from ZIO, where the environment is represented as an intersection of services:

```scala
type Http = ZIO[Console with Logger, IOError, Response]
```

## Rationale

The rationale for using a union to represent the environment in an `Effect` workflow is to eliminate `Has` as a wrapper for services in the environment, similar to ZIO 2.0.

To remove `Has` from Effect, we considered the structural nature of TypeScript. In TypeScript, a type `A & B` with structural conflicts reduces to `never`.

```ts
// @errors: 2322
export interface A {
  readonly prop: string
}

export interface B {
  readonly prop: number
}

const ab: A & B = {
  prop: ""
}
```

Previously, intersections were used for environments with multiple services, but conflicts in function and property names necessitated wrapping services in `Has`. In ZIO 2.0, the contravariant `R` type parameter became fully phantom, allowing for the removal of `Has`, improving type signature clarity.

To facilitate the removal of `Has` in Effect, we considered how types in the environment compose. Contravariant parameters composed as an intersection are equivalent to covariant parameters composed as a union for assignability. Thus, we made the `R` type parameter covariant, allowing for the representation of `R` as a union of services without reducing to `never`.

From our example:

```ts
export interface A {
  readonly prop: string
}

export interface B {
  readonly prop: number
}

const ab: A | B = {
  prop: ""
}
```

Representing `R` as a covariant type parameter containing the union of services allowed us to remove the requirement for `Has`.

## Type Aliases

In Effect, there are no predefined type aliases such as `UIO`, `URIO`, `RIO`, `Task`, or `IO` as in ZIO.

This decision stems from the fact that type aliases are lost upon composition, making them less useful unless multiple signatures are maintained for every function. Instead, Effect utilizes the `never` type to indicate unused types.

The perception that type aliases are quicker to understand is often misleading. In Effect, the explicit notation `Effect<A>` clearly indicates that only type `A` is being used, whereas a type alias like `RIO<R, A>` raises questions about the type `E`, complicating understanding.

# Effect vs fp-ts

A detailed comparison of key features between the Effect and fp-ts libraries, including typed services, built-in services, error handling, pipeable APIs, dual APIs, testability, resource management, interruptions, defects, fiber-based concurrency, retry policies, logging, scheduling, caching, batching, metrics, tracing, configuration, immutable data structures, and stream processing.

## Key Developments

- **Project Merger**: The fp-ts project is officially merging with the Effect-TS ecosystem. Giulio Canti, the author of fp-ts, is being welcomed into the Effect organization. For more details, see the announcement here.
- **Continuity and Evolution**: Effect can be seen as the successor to fp-ts v2 and is effectively fp-ts v3, marking a significant evolution in the library's capabilities.

## FAQ

### Bundle Size Comparison Between Effect and fp-ts

**Q: I compared the bundle sizes of two simple programs using Effect and fp-ts. Why does Effect have a larger bundle size?**

A: It's natural to observe different bundle sizes because Effect and fp-ts are distinct systems designed for different purposes. Effect's bundle size is larger due to its included fiber runtime, which is crucial for its functionality. While the initial bundle size may seem large, the overhead amortizes as you use Effect.

**Q: Should I be concerned about the bundle size difference when choosing between Effect and fp-ts?**

A: Not necessarily. Consider the specific requirements and benefits of each library for your project. The Micro module in Effect is designed as a lightweight alternative to the standard Effect module, specifically for scenarios where reducing bundle size is crucial. This module is self-contained and does not include more complex features like Layer, Ref, Queue, and Deferred. If any major Effect modules (beyond basic data modules like Option, Either, Array, etc.) are used, the effect runtime will be added to your bundle, negating the benefits of Micro. This makes Micro ideal for libraries that aim to implement Effect functionality with minimal impact on bundle size, especially for libraries that plan to expose Promise-based APIs. It also supports scenarios where a client might use Micro while a server uses the full suite of Effect features, maintaining compatibility and shared logic between different parts of an application.

## Comparison Table

| Feature                   | fp-ts | Effect |
| ------------------------- | ----- | ------ |
| Typed Services            | ❌    | ✅     |
| Built-in Services         | ❌    | ✅     |
| Typed errors              | ✅    | ✅     |
| Pipeable APIs             | ✅    | ✅     |
| Dual APIs                 | ❌    | ✅     |
| Testability               | ❌    | ✅     |
| Resource Management       | ❌    | ✅     |
| Interruptions             | ❌    | ✅     |
| Defects                   | ❌    | ✅     |
| Fiber-Based Concurrency   | ❌    | ✅     |
| Fiber Supervision         | ❌    | ✅     |
| Retry and Retry Policies  | ❌    | ✅     |
| Built-in Logging          | ❌    | ✅     |
| Built-in Scheduling       | ❌    | ✅     |
| Built-in Caching          | ❌    | ✅     |
| Built-in Batching         | ❌    | ✅     |
| Metrics                   | ❌    | ✅     |
| Tracing                   | ❌    | ✅     |
| Configuration             | ❌    | ✅     |
| Immutable Data Structures | ❌    | ✅     |
| Stream Processing         | ❌    | ✅     |

### Typed Services

Both libraries provide the ability to track requirements at the type level. In fp-ts, you can utilize the ReaderTaskEither<R, E, A> type, while in Effect, the Effect<A, E, R> type is available. In fp-ts, the R type parameter is contravariant, which means there is no guarantee of avoiding conflicts. Effect's R type parameter is covariant, allowing for merging dependencies at the type level when multiple effects are involved. Effect also provides tools like Tag, Context, and Layer for managing dependencies.

### Built-in Services

Effect has built-in services like Clock, Random, and Tracer, while fp-ts does not provide any default services.

### Typed Errors

Both libraries support typed errors, but Effect allows merging errors at the type level when combining multiple effects, providing utilities for managing these merged error types effectively.

### Pipeable APIs

Both libraries provide pipeable APIs, but Effect offers a .pipe() method on each data type for convenience.

### Dual APIs

Effect provides dual APIs, allowing the same API to be used in different ways (e.g., "data-last" and "data-first" variants).

### Testability

fp-ts promotes good testability but lacks dedicated testing tools. Effect offers utilities like TestClock and TestRandom for improved testability.

### Resource Management

Effect provides comprehensive resource management capabilities, while fp-ts has limited features mainly through bracket.

### Interruptions

Effect supports interruptions, allowing you to cancel ongoing computations. fp-ts does not have built-in support for interruptions.

### Defects

Effect provides mechanisms for handling defects and unexpected failures, while fp-ts lacks dedicated support for managing defects.

### Fiber-Based Concurrency

Effect leverages fiber-based concurrency for lightweight and efficient concurrent computations. fp-ts does not support fiber-based concurrency.

### Fiber Supervision

Effect provides supervision strategies for managing and monitoring fibers. fp-ts does not have built-in support for fiber supervision.

### Retry and Retry Policies

Effect includes built-in support for retrying computations with customizable policies. fp-ts does not offer built-in retry functionality.

### Built-in Logging

Effect comes with built-in logging capabilities, while fp-ts requires external libraries for logging.

### Built-in Scheduling

Effect provides built-in scheduling capabilities for managing the execution of computations over time. fp-ts lacks this feature.

### Built-in Caching

Effect offers built-in caching mechanisms for improved performance. This feature is not available in fp-ts.

### Built-in Batching

Effect provides built-in batching capabilities to combine multiple computations into a single batched computation. This feature is not available in fp-ts.

### Metrics

Effect includes built-in support for collecting and reporting metrics related to computations and system behavior. This feature is not available in fp-ts.

### Tracing

Effect has built-in tracing capabilities and offers an OpenTelemetry exporter for integration. fp-ts does not provide a similar tracing tool.

### Configuration

Effect supports managing and accessing configuration values within computations. This feature is not available in fp-ts.

### Immutable Data Structures

Effect provides built-in support for immutable data structures like Chunk, HashSet, and HashMap. fp-ts does not have built-in support for such data structures.

### Stream Processing

The Effect ecosystem provides built-in support for stream processing. fp-ts relies on external libraries like RxJS for stream processing.

# Effect vs Promise

Explore the differences between `Promise` and `Effect` in TypeScript, covering type safety, creation, chaining, and concurrency. Learn how `Effect` enhances type tracking for errors and dependencies and provides powerful features like fiber-based concurrency and built-in capabilities for logging, scheduling, caching, and more.

In this guide, we will explore the differences between `Promise` and `Effect`, two approaches to handling asynchronous operations in TypeScript. We'll discuss their type safety, creation, chaining, and concurrency, providing examples to help you understand their usage.

## Comparing Effects and Promises: Key Distinctions

- **Evaluation Strategy:** Promises are eagerly evaluated, whereas effects are lazily evaluated.
- **Execution Mode:** Promises are one-shot, executing once, while effects are multi-shot, repeatable.
- **Interruption Handling and Automatic Propagation:** Promises lack built-in interruption handling, posing challenges in managing interruptions, and don't automatically propagate interruptions, requiring manual abort controller management. In contrast, effects come with interruption handling capabilities and automatically compose interruption, simplifying management locally on smaller computations without the need for high-level orchestration.
- **Structured Concurrency:** Effects offer structured concurrency built-in, which is challenging to achieve with Promises.
- **Error Reporting (Type Safety):** Promises don't inherently provide detailed error reporting at the type level, whereas effects do, offering type-safe insight into error cases.
- **Runtime Behavior:** The Effect runtime aims to remain synchronous as long as possible, transitioning into asynchronous mode only when necessary due to computation requirements or main thread starvation.

## Type Safety

Let's start by comparing the types of `Promise` and `Effect`. The type parameter `A` represents the resolved value of the operation:

```
Promise<A>
```

```
Effect<A, Error, Context>
```

Here's what sets `Effect` apart:

- It allows you to track the types of errors statically through the type parameter `Error`.
- It allows you to track the types of required dependencies statically through the type parameter `Context`.

## Creating

### Success

Creating a successful operation using `Promise` and `Effect`:

```
export const success = Promise.resolve(2)
```

```
import { Effect } from "effect"

export const success = Effect.succeed(2)
```

### Failure

Handling failures with `Promise` and `Effect`:

```
export const failure = Promise.reject("Uh oh!")
```

```
import { Effect } from "effect"

export const failure = Effect.fail("Uh oh!")
```

### Constructor

Creating operations with custom logic:

```
export const task = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve(2) : reject("Uh oh!")
  }, 300)
})
```

```
import { Effect } from "effect"

export const task = Effect.gen(function* () {
  yield* Effect.sleep("300 millis")
  return Math.random() > 0.5 ? 2 : yield* Effect.fail("Uh oh!")
})
```

## Thenable

Mapping the result of an operation:

### map

```
export const mapped = Promise.resolve("Hello").then((s) => s.length)
```

```
import { Effect } from "effect"

export const mapped = Effect.succeed("Hello").pipe(
  Effect.map((s) => s.length)
)
```

### flatMap

Chaining multiple operations:

```
export const flatMapped = Promise.resolve("Hello").then((s) =>
  Promise.resolve(s.length)
)
```

```
import { Effect } from "effect"

export const flatMapped = Effect.succeed("Hello").pipe(
  Effect.flatMap((s) => Effect.succeed(s.length))
)
```

## Comparing Effect.gen with async/await

If you are familiar with `async`/`await`, you may notice that the flow of writing code is similar.

Let's compare the two approaches:

```
const increment = (x: number) => x + 1

const divide = (a: number, b: number): Promise<number> =>
  b === 0
    ? Promise.reject(new Error("Cannot divide by zero"))
    : Promise.resolve(a / b)

const task1 = Promise.resolve(10)

const task2 = Promise.resolve(2)

const program = async function () {
  const a = await task1
  const b = await task2
  const n1 = await divide(a, b)
  const n2 = increment(n1)
  return `Result is: ${n2}`
}

program().then(console.log) // Output: "Result is: 6"
```

```
import { Effect } from "effect"

const increment = (x: number) => x + 1

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b)

const task1 = Effect.promise(() => Promise.resolve(10))

const task2 = Effect.promise(() => Promise.resolve(2))

export const program = Effect.gen(function* () {
  const a = yield* task1
  const b = yield* task2
  const n1 = yield* divide(a, b)
  const n2 = increment(n1)
  return `Result is: ${n2}`
})

Effect.runPromise(program).then(console.log) // Output: "Result is: 6"
```

## Concurrency

### Promise.all()

```
const task1 = new Promise<number>((resolve, reject) => {
  console.log("Executing task1...")
  setTimeout(() => {
    console.log("task1 done")
    resolve(1)
  }, 100)
})

const task2 = new Promise<number>((resolve, reject) => {
  console.log("Executing task2...")
  setTimeout(() => {
    console.log("task2 done")
    reject("Uh oh!")
  }, 200)
})

const task3 = new Promise<number>((resolve, reject) => {
  console.log("Executing task3...")
  setTimeout(() => {
    console.log("task3 done")
    resolve(3)
  }, 300)
})

export const program = Promise.all([task1, task2, task3])

program.then(console.log, console.error)
```

```
import { Effect } from "effect"

const task1 = Effect.gen(function* () {
  console.log("Executing task1...")
  yield* Effect.sleep("100 millis")
  console.log("task1 done")
  return 1
})

const task2 = Effect.gen(function* () {
  console.log("Executing task2...")
  yield* Effect.sleep("200 millis")
  console.log("task2 done")
  return yield* Effect.fail("Uh oh!")
})

const task3 = Effect.gen(function* () {
  console.log("Executing task3...")
  yield* Effect.sleep("300 millis")
  console.log("task3 done")
  return 3
})

export const program = Effect.all([task1, task2, task3], {
  concurrency: "unbounded"
})

Effect.runPromise(program).then(console.log, console.error)
```

### Promise.allSettled()

```
const task1 = new Promise<number>((resolve, reject) => {
  console.log("Executing task1...")
  setTimeout(() => {
    console.log("task1 done")
    resolve(1)
  }, 100)
})

const task2 = new Promise<number>((resolve, reject) => {
  console.log("Executing task2...")
  setTimeout(() => {
    console.log("task2 done")
    reject("Uh oh!")
  }, 200)
})

const task3 = new Promise<number>((resolve, reject) => {
  console.log("Executing task3...")
  setTimeout(() => {
    console.log("task3 done")
    resolve(3)
  }, 300)
})

export const program = Promise.allSettled([task1, task2, task3])

program.then(console.log, console.error)
```

```
import { Effect } from "effect"

const task1 = Effect.gen(function* () {
  console.log("Executing task1...")
  yield* Effect.sleep("100 millis")
  console.log("task1 done")
  return 1
})

const task2 = Effect.gen(function* () {
  console.log("Executing task2...")
  yield* Effect.sleep("200 millis")
  console.log("task2 done")
  return yield* Effect.fail("Uh oh!")
})

const task3 = Effect.gen(function* () {
  console.log("Executing task3...")
  yield* Effect.sleep("300 millis")
  console.log("task3 done")
  return 3
})

export const program = Effect.forEach(
  [task1, task2, task3],
  (task) => Effect.either(task),
  {
    concurrency: "unbounded"
  }
)

Effect.runPromise(program).then(console.log, console.error)
```

### Promise.any()

```
const task1 = new Promise<number>((resolve, reject) => {
  console.log("Executing task1...")
  setTimeout(() => {
    console.log("task1 done")
    reject("Something went wrong!")
  }, 100)
})

const task2 = new Promise<number>((resolve, reject) => {
  console.log("Executing task2...")
  setTimeout(() => {
    console.log("task2 done")
    resolve(2)
  }, 200)
})

const task3 = new Promise<number>((resolve, reject) => {
  console.log("Executing task3...")
  setTimeout(() => {
    console.log("task3 done")
    reject("Uh oh!")
  }, 300)
})

export const program = Promise.any([task1, task2, task3])

program.then(console.log, console.error)
```

```
import { Effect } from "effect"

const task1 = Effect.gen(function* () {
  console.log("Executing task1...")
  yield* Effect.sleep("100 millis")
  console.log("task1 done")
  return yield* Effect.fail("Something went wrong!")
})

const task2 = Effect.gen(function* () {
  console.log("Executing task2...")
  yield* Effect.sleep("200 millis")
  console.log("task2 done")
  return 2
})

const task3 = Effect.gen(function* () {
  console.log("Executing task3...")
  yield* Effect.sleep("300 millis")
  console.log("task3 done")
  return yield* Effect.fail("Uh oh!")
})

export const program = Effect.raceAll([task1, task2, task3])

Effect.runPromise(program).then(console.log, console.error)
```

### Promise.race()

```
const task1 = new Promise<number>((resolve, reject) => {
  console.log("Executing task1...")
  setTimeout(() => {
    console.log("task1 done")
    reject("Something went wrong!")
  }, 100)
})

const task2 = new Promise<number>((resolve, reject) => {
  console.log("Executing task2...")
  setTimeout(() => {
    console.log("task2 done")
    reject("Uh oh!")
  }, 200)
})

const task3 = new Promise<number>((resolve, reject) => {
  console.log("Executing task3...")
  setTimeout(() => {
    console.log("task3 done")
    resolve(3)
  }, 300)
})

export const program = Promise.race([task1, task2, task3])

program.then(console.log, console.error)
```

```
import { Effect } from "effect"

const task1 = Effect.gen(function* () {
  console.log("Executing task1...")
  yield* Effect.sleep("100 millis")
  console.log("task1 done")
  return yield* Effect.fail("Something went wrong!")
})

const task2 = Effect.gen(function* () {
  console.log("Executing task2...")
  yield* Effect.sleep("200 millis")
  console.log("task2 done")
  return yield* Effect.fail("Uh oh!")
})

const task3 = Effect.gen(function* () {
  console.log("Executing task3...")
  yield* Effect.sleep("300 millis")
  console.log("task3 done")
  return 3
})

export const program = Effect.raceAll(
  [task1, task2, task3].map(Effect.either)
)

Effect.runPromise(program).then(console.log, console.error)
```

## FAQ

**Question:** What is the equivalent of starting a promise without immediately waiting for it in Effects?

```
const task = (delay: number, name: string) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`${name} done`)
      return resolve(name)
    }, delay)
  )

export async function program() {
  const r0 = task(2_000, "long running task")
  const r1 = await task(200, "task 2")
  const r2 = await task(100, "task 3")
  return {
    r1,
    r2,
    r0: await r0
  }
}

program().then(console.log)
```

**Answer:** You can achieve this by utilizing `Effect.fork` and `Fiber.join`.

```
import { Effect, Fiber } from "effect"

const task = (delay: number, name: string) =>
  Effect.gen(function* () {
    yield* Effect.sleep(delay)
    console.log(`${name} done`)
    return name
  })

const program = Effect.gen(function* () {
  const r0 = yield* Effect.fork(task(2_000, "long running task"))
  const r1 = yield* task(200, "task 2")
  const r2 = yield* task(100, "task 3")
  return {
    r1,
    r2,
    r0: yield* Fiber.join(r0)
  }
})

Effect.runPromise(program).then(console.log)
```

Other

This section contains miscellaneous information and resources that do not fit into the main categories. Please refer to the relevant sections for specific topics.