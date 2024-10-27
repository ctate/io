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