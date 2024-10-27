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