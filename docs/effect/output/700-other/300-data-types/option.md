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