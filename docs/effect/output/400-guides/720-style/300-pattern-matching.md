# Pattern Matching

Pattern matching is a method that allows developers to handle intricate conditions within a single, concise expression. It simplifies code, making it more concise and easier to understand. Additionally, it includes a process called exhaustiveness checking, which helps to ensure that no possible case has been overlooked.

Originating from functional programming languages, pattern matching stands as a powerful technique for code branching. It often offers a more potent and less verbose solution compared to imperative alternatives such as if/else or switch statements, particularly when dealing with complex conditions.

Although not yet a native feature in JavaScript, there is an ongoing tc39 proposal to introduce pattern matching to JavaScript. However, this proposal is at stage 1 and might take several years to be implemented. Nonetheless, developers can implement pattern matching in their codebase. The `effect/Match` module provides a reliable, type-safe pattern matching implementation that is available for immediate use.

## Defining a Matcher

### type

Creating a `Matcher` involves using the `type` constructor function with a specified type. This sets the foundation for pattern matching against that particular type. Once the `Matcher` is established, developers can employ various combinators like `when`, `not`, and `tag` to define patterns that the `Matcher` will check against.

Example:

```ts
import { Match } from "effect"

const match = Match.type<{ a: number } | { b: string }>().pipe(
  Match.when({ a: Match.number }, (_) => _.a),
  Match.when({ b: Match.string }, (_) => _.b),
  Match.exhaustive
)

console.log(match({ a: 0 })) // Output: 0
console.log(match({ b: "hello" })) // Output: "hello"
```

### value

In addition to defining a `Matcher` based on a specific type, developers can also create a `Matcher` directly from a value utilizing the `value` constructor function. This method allows matching patterns against the provided value.

Example:

```ts
import { Match } from "effect"

const result = Match.value({ name: "John", age: 30 }).pipe(
  Match.when(
    { name: "John" },
    (user) => `${user.name} is ${user.age} years old`
  ),
  Match.orElse(() => "Oh, not John")
)

console.log(result) // Output: "John is 30 years old"
```

## Patterns

### Predicates

Predicates allow the testing of values against specific conditions. It helps in creating rules or conditions for the data being evaluated.

Example:

```ts
import { Match } from "effect"

const match = Match.type<{ age: number }>().pipe(
  Match.when({ age: (age) => age >= 5 }, (user) => `Age: ${user.age}`),
  Match.orElse((user) => `${user.age} is too young`)
)

console.log(match({ age: 5 })) // Output: "Age: 5"
console.log(match({ age: 4 })) // Output: "4 is too young"
```

### not

`not` allows for excluding a specific value while matching other conditions.

Example:

```ts
import { Match } from "effect"

const match = Match.type<string | number>().pipe(
  Match.not("hi", (_) => "a"),
  Match.orElse(() => "b")
)

console.log(match("hello")) // Output: "a"
console.log(match("hi")) // Output: "b"
```

### tag

The `tag` function enables pattern matching against the tag within a Discriminated Union.

Example:

```ts
import { Match, Either } from "effect"

const match = Match.type<Either.Either<number, string>>().pipe(
  Match.tag("Right", (_) => _.right),
  Match.tag("Left", (_) => _.left),
  Match.exhaustive
)

console.log(match(Either.right(123))) // Output: 123
console.log(match(Either.left("Oh no!"))) // Output: "Oh no!"
```

## Transforming a Matcher

### exhaustive

The `exhaustive` transformation serves as an endpoint within the matching process, ensuring all potential matches have been considered.

Example:

```ts
import { Match, Either } from "effect"

const result = Match.value(Either.right(0)).pipe(
  Match.when({ _tag: "Right" }, (_) => _.right),
  Match.exhaustive
)
```

### orElse

The `orElse` transformation signifies the conclusion of the matching process, offering a fallback value when no specific patterns match.

Example:

```ts
import { Match } from "effect"

const match = Match.type<string | number>().pipe(
  Match.when("hi", (_) => "hello"),
  Match.orElse(() => "I literally do not understand")
)

console.log(match("hi")) // Output: "hello"
console.log(match("hello")) // Output: "I literally do not understand"
```

### option

The `option` transformation returns the result encapsulated within an Option. When the match succeeds, it represents the result as `Some`, and when there's no match, it signifies the absence of a value with `None`.

Example:

```ts
import { Match, Either } from "effect"

const result = Match.value(Either.right(0)).pipe(
  Match.when({ _tag: "Right" }, (_) => _.right),
  Match.option
)

console.log(result) // Output: { _id: 'Option', _tag: 'Some', value: 0 }
```

### either

The `either` transformation might match a value, returning an Either following the format `Either<MatchResult, NoMatchResult>`.

Example:

```ts
import { Match } from "effect"

const match = Match.type<string>().pipe(
  Match.when("hi", (_) => _.length),
  Match.either
)

console.log(match("hi")) // Output: { _id: 'Either', _tag: 'Right', right: 2 }
console.log(match("shigidigi")) // Output: { _id: 'Either', _tag: 'Left', left: 'shigidigi' }
```