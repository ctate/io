# Getting Started

You can import the necessary types and functions from the `effect/Schema` module:

**Example** (Namespace Import)

```ts
import * as Schema from "effect/Schema"
```

**Example** (Named Import)

```ts
import { Schema } from "effect"
```

## Defining a schema

Define a `Schema` using the `Struct` constructor from `effect/Schema`. Each property in the object is defined by its own `Schema`.

Example of a `Schema` for a person object:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})
```

Note: Most constructors return `readonly` types by default.

## Extracting Inferred Types

### Type

Extract the inferred type `A` from `Schema<A, I, R>` in two ways:

- Using `Schema.Schema.Type` utility.
- Using the `Type` field defined on your schema.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

type Person = Schema.Schema.Type<typeof Person>
type Person2 = typeof Person.Type
```

Alternatively, define the `Person` type using `interface`:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

interface Person extends Schema.Schema.Type<typeof Person> {}
```

### Encoded

Extract the inferred `I` type using `Schema.Encoded` utility:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

type PersonEncoded = Schema.Schema.Encoded<typeof Person>
type PersonEncoded2 = typeof Person.Encoded
```

### Context

Extract the inferred type `R` using `Schema.Context` utility:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

type PersonContext = Schema.Schema.Context<typeof Person>
```

### Advanced extracting Inferred Types

To create a schema with an opaque type:

```ts
import { Schema } from "effect"

const _Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

interface Person extends Schema.Schema.Type<typeof _Person> {}

const Person: Schema.Schema<Person> = _Person
```

For cases where `A` differs from `I`:

```ts
import { Schema } from "effect"

const _Person = Schema.Struct({
  name: Schema.String,
  age: Schema.NumberFromString
})

interface Person extends Schema.Schema.Type<typeof _Person> {}
interface PersonEncoded extends Schema.Schema.Encoded<typeof _Person> {}

const Person: Schema.Schema<Person, PersonEncoded> = _Person
```

## Decoding From Unknown Values

Functions to decode unknown data types:

- `decodeUnknownSync`: Synchronously decodes a value.
- `decodeUnknownOption`: Returns an Option type.
- `decodeUnknownEither`: Returns an Either type.
- `decodeUnknownPromise`: Returns a Promise.
- `decodeUnknown`: Returns an Effect.

**Example** (Using `decodeUnknownSync`):

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const input: unknown = { name: "Alice", age: 30 }

console.log(Schema.decodeUnknownSync(Person)(input))
console.log(Schema.decodeUnknownSync(Person)(null))
```

**Example** (Using `decodeUnknownEither`):

```ts
import { Schema } from "effect"
import { Either } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person)

const input: unknown = { name: "Alice", age: 30 }
const result1 = decode(input)
if (Either.isRight(result1)) {
  console.log(result1.right)
}

const result2 = decode(null)
if (Either.isLeft(result2)) {
  console.log(result2.left)
}
```

For asynchronous transformations, use `decodeUnknown`:

```ts
import { Schema } from "effect"
import { Effect } from "effect"

const PersonId = Schema.Number

const Person = Schema.Struct({
  id: PersonId,
  name: Schema.String,
  age: Schema.Number
})

const asyncSchema = Schema.transformOrFail(PersonId, Person, {
  strict: true,
  decode: (id) =>
    Effect.succeed({ id, name: "name", age: 18 }).pipe(
      Effect.delay("10 millis")
    ),
  encode: (person) =>
    Effect.succeed(person.id).pipe(Effect.delay("10 millis"))
})

const asyncParsePersonId = Schema.decodeUnknown(asyncSchema)

Effect.runPromise(asyncParsePersonId(1)).then(console.log)
```

## Parse Options

### Excess properties

By default, excess properties are stripped out. Use `onExcessProperty` option to trigger a parsing error.

Example with `onExcessProperty` set to `"error"`:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(Person)({
  name: "Bob",
  age: 40,
  email: "bob@example.com"
}, { onExcessProperty: "error" })
```

To allow excess properties, set `onExcessProperty` to `"preserve"`:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

console.log(Schema.decodeUnknownSync(Person)({
  name: "Bob",
  age: 40,
  email: "bob@example.com"
}, { onExcessProperty: "preserve" }))
```

### All errors

Use the `errors` option to receive all parsing errors. Set it to `"all"` to get comprehensive error messages.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(Person)({
  name: "Bob",
  age: "abc",
  email: "bob@example.com"
}, { errors: "all", onExcessProperty: "error" })
```

### Managing Property Order

The `propertyOrder` option controls the order of object fields. Set it to `"original"` to preserve input order.

**Example** (Synchronous Decoding):

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  a: Schema.Number,
  b: Schema.Literal("b"),
  c: Schema.Number
})

console.log(Schema.decodeUnknownSync(schema)({ b: "b", c: 2, a: 1 }, { propertyOrder: "original" }))
```

**Example** (Asynchronous Decoding):

```ts
import { Effect, Schema } from "effect"

const schema = Schema.Struct({
  a: Schema.Number,
  b: Schema.Number,
  c: Schema.Number
}).annotations({ concurrency: 3 })

Schema.decode(schema)({ a: 1, b: 2, c: 3 }, { propertyOrder: "original" })
  .pipe(Effect.runPromise)
  .then(console.log)
```

### Customizing Parsing Behavior at the Schema Level

Use the `parseOptions` annotation to tailor parse options for each schema.

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  a: Schema.Struct({
    b: Schema.String,
    c: Schema.String
  }).annotations({
    title: "first error only",
    parseOptions: { errors: "first" }
  }),
  d: Schema.String
}).annotations({
  title: "all errors",
  parseOptions: { errors: "all" }
})

const result = Schema.decodeUnknownEither(schema)({ a: {} }, { errors: "first" })
```

## Managing Missing Properties

By default, missing properties are treated as `undefined`. Use the `exact` option to distinguish between missing and undefined properties.

```ts
import { Schema } from "effect"

const schema = Schema.Struct({ a: Schema.Unknown })
const input = {}

console.log(Schema.decodeUnknownSync(schema)(input, { exact: true }))
```

## Encoding

The `effect/Schema` module provides several `encode*` functions:

- `encodeSync`: Synchronously encodes data.
- `encodeOption`: Returns an Option type.
- `encodeEither`: Returns an Either type.
- `encodePromise`: Returns a Promise.
- `encode`: Returns an Effect.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number
})

console.log(Schema.encodeSync(Person)({ name: "Alice", age: 30 }))
```

### Handling Unsupported Encoding

Use the `Forbidden` error for unsupported encoding.

```ts
import { Either, ParseResult, Schema } from "effect"

export const SafeDecode = <A, I>(self: Schema.Schema<A, I, never>) => {
  const decodeUnknownEither = Schema.decodeUnknownEither(self)
  return Schema.transformOrFail(
    Schema.Unknown,
    Schema.EitherFromSelf({
      left: Schema.Unknown,
      right: Schema.typeSchema(self)
    }),
    {
      strict: true,
      decode: (input) =>
        ParseResult.succeed(
          Either.mapLeft(decodeUnknownEither(input), () => input)
        ),
      encode: (actual, _, ast) =>
        Either.match(actual, {
          onLeft: () =>
            ParseResult.fail(
              new ParseResult.Forbidden(ast, actual, "cannot encode a Left")
            ),
          onRight: ParseResult.succeed
        })
    }
  )
}
```

## Naming Conventions

Naming conventions in `effect/Schema` focus on compatibility with JSON serialization.

### Overview of Naming Strategies

**JSON-Compatible Types**: Named directly after their data types.

**Non-JSON-Compatible Types**: Incorporate additional details to indicate necessary transformations.

### Practical Application

Example demonstrating straightforward naming conventions:

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  sym: Schema.Symbol,
  optional: Schema.Option(Schema.Date),
  chunk: Schema.Chunk(Schema.BigInt),
  createdAt: Schema.Date,
  updatedAt: Schema.Date
})
```

## Type Guards

The `Schema.is` function verifies that a value conforms to a given schema.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const isPerson = Schema.is(Person)

console.log(isPerson({ name: "Alice", age: 30 })) // true
console.log(isPerson(null)) // false
```

## Assertions

The `Schema.asserts` function asserts that an input matches the schema type. If it does not match, it throws an error.

Example:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const assertsPerson = Schema.asserts(Person)

try {
  assertsPerson({ name: "Alice", age: "30" })
} catch (e) {
  console.error("The input does not match the schema:")
  console.error(e)
}

assertsPerson({ name: "Alice", age: 30 })
```