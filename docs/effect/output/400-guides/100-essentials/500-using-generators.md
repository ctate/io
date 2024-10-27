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