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