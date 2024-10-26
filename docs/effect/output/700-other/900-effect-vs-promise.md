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