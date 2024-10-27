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