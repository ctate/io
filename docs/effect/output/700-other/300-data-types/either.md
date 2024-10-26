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