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