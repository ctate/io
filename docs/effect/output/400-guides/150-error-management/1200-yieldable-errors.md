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