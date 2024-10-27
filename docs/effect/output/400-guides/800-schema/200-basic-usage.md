# Basic Usage

## Cheatsheet

| Typescript Type                                           | Description / Notes                      | Schema / Combinator / Example                                              |
| --------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `null`                                                    |                                          | `S.Null`                                                                   |
| `undefined`                                               |                                          | `S.Undefined`                                                              |
| `string`                                                  |                                          | `S.String`                                                                 |
| `number`                                                  |                                          | `S.Number`                                                                 |
| `boolean`                                                 |                                          | `S.Boolean`                                                                |
| `symbol`                                                  |                                          | `S.SymbolFromSelf` / `S.Symbol`                                            |
| `BigInt`                                                  |                                          | `S.BigIntFromSelf` / `S.BigInt`                                            |
| `unknown`                                                 |                                          | `S.Unknown`                                                                |
| `any`                                                     |                                          | `S.Any`                                                                    |
| `never`                                                   |                                          | `S.Never`                                                                  |
| `object`                                                  |                                          | `S.Object`                                                                 |
| `unique symbol`                                           |                                          | `S.UniqueSymbolFromSelf`                                                   |
| `"a"`, `1`, `true`                                        | type literals                            | `S.Literal("a")`, `S.Literal(1)`, `S.Literal(true)`                        |
| `a${string}`                                              | template literals                        | `S.TemplateLiteral("a", S.String)`                                         |
| `{ readonly a: string, readonly b?: number\| undefined }` | structs                                  | `S.Struct({ a: S.String, b: S.optional(S.Number) })`                       |
| `Record<A, B>`                                            | records                                  | `S.Record({ key: A, value: B })`                                           |
| `readonly [string, number]`                               | tuples                                   | `S.Tuple(S.String, S.Number)`                                              |
| `ReadonlyArray<string>`                                   | arrays                                   | `S.Array(S.String)`                                                        |
| `A \| B`                                                  | unions                                   | `S.Union(A, B)`                                                            |
| `A & B`                                                   | intersections of non-overlapping structs | `S.extend(A, B)`                                                           |
| `Record<A, B> & Record<C, D>`                             | intersections of non-overlapping records | `S.extend(S.Record({ key: A, value: B }), S.Record({ key: C, value: D }))` |
| `type A = { a: A \| null }`                               | recursive types                          | `S.Struct({ a: S.Union(S.Null, S.suspend(() => self)) })`                  |
| `keyof A`                                                 |                                          | `S.keyof(A)`                                                               |
| `Partial<A>`                                              |                                          | `S.partial(A)`                                                             |
| `Required<A>`                                             |                                          | `S.required(A)`                                                            |

## Primitives

These primitive schemas are building blocks for creating more complex schemas to describe your data structures.

```ts
import { Schema } from "effect"

Schema.String // Schema<string>
Schema.Number // Schema<number>
Schema.Boolean // Schema<boolean>
Schema.BigIntFromSelf // Schema<BigInt>
Schema.SymbolFromSelf // Schema<symbol>
Schema.Object // Schema<object>
Schema.Undefined // Schema<undefined>
Schema.Void // Schema<void>
Schema.Any // Schema<any>
Schema.Unknown // Schema<unknown>
Schema.Never // Schema<never>
```

## Literals

Literals represent specific values that are directly specified.

```ts
// @target: ES2020
import { Schema } from "effect"

Schema.Null // same as S.Literal(null)
Schema.Literal("a")
Schema.Literal("a", "b", "c") // union of literals
Schema.Literal(1)
Schema.Literal(2n) // BigInt literal
Schema.Literal(true)
```

**Exposed Values**

You can access the literals of a literal schema:

```ts
import { Schema } from "effect"

const schema = Schema.Literal("a", "b")

// Accesses the literals
const literals = schema.literals
```

**The pickLiteral Utility**

We can also use `Schema.pickLiteral` with a literal schema to narrow down the possible values:

```ts
import { Schema } from "effect"

Schema.Literal("a", "b", "c").pipe(Schema.pickLiteral("a", "b")) // same as S.Literal("a", "b")
```

Sometimes, we need to reuse a schema literal in other parts of our code. Let's see an example:

```ts
import { Schema } from "effect"

const FruitId = Schema.Number
const FruitCategory = Schema.Literal("sweet", "citrus", "tropical")

const Fruit = Schema.Struct({
  id: FruitId,
  category: FruitCategory
})

const SweetAndCitrusFruit = Schema.Struct({
  fruitId: FruitId,
  category: FruitCategory.pipe(Schema.pickLiteral("sweet", "citrus"))
})
```

## Template literals

In TypeScript, template literals allow you to embed expressions within string literals. The `Schema.TemplateLiteral` constructor allows you to create a schema for these template literal types.

```ts
import { Schema } from "effect"

Schema.TemplateLiteral("a", Schema.String)
Schema.TemplateLiteral("https://", Schema.String, ".", Schema.Literal("com", "net"))
```

## TemplateLiteralParser

The `TemplateLiteralParser` API validates the input format and automatically parses it into a more structured and type-safe output, specifically into a **tuple** format.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.TemplateLiteralParser(
  Schema.NumberFromString,
  "a",
  Schema.NonEmptyString
)

console.log(Schema.decodeEither(schema)("100afoo"))
console.log(Schema.encode(schema)([100, "a", "foo"]))
```

## Unique Symbols

```ts
import { Schema } from "effect"

const mySymbol = Symbol.for("mysymbol")

const mySymbolSchema = Schema.UniqueSymbolFromSelf(mySymbol)
```

## Filters

Using the `Schema.filter` function, developers can define custom validation logic that goes beyond basic type checks.

**Example: Simple Validation**

```ts
import { Schema } from "effect"

const LongString = Schema.String.pipe(
  Schema.filter(
    (s) => s.length >= 10 || "a string at least 10 characters long"
  )
)

console.log(Schema.decodeUnknownSync(LongString)("a"))
```

### Predicate Function Structure

The predicate for a filter is defined as follows:

```ts
type Predicate = (
  a: A,
  options: ParseOptions,
  self: AST.Refinement
) => FilterReturnType
```

### Annotations

It's beneficial to embed as much metadata as possible within the schema.

**Example**

```ts
import { Schema } from "effect"

const LongString = Schema.String.pipe(
  Schema.filter(
    (s) => s.length >= 10 ? undefined : "a string at least 10 characters long",
    {
      identifier: "LongString",
      jsonSchema: { minLength: 10 },
      description: "Lorem ipsum dolor sit amet"
    }
  )
)

console.log(Schema.decodeUnknownSync(LongString)("a"))
```

### Specifying Error Paths

It's possible to specify an error path along with the message.

**Example**

```ts
import { Either, Schema, ParseResult } from "effect"

const Password = Schema.Trim.pipe(Schema.minLength(1))

const MyForm = Schema.Struct({
  password: Password,
  confirm_password: Password
}).pipe(
  Schema.filter((input) => {
    if (input.password !== input.confirm_password) {
      return {
        path: ["confirm_password"],
        message: "Passwords do not match"
      }
    }
  })
)

console.log(
  JSON.stringify(
    Schema.decodeUnknownEither(MyForm)({
      password: "abc",
      confirm_password: "d"
    }).pipe(
      Either.mapLeft((error) =>
        ParseResult.ArrayFormatter.formatErrorSync(error)
      )
    ),
    null,
    2
  )
)
```

### Multiple Error Reporting

The `Schema.filter` API also supports reporting multiple issues at once.

**Example**

```ts
import { Either, Schema, ParseResult } from "effect"

const Password = Schema.Trim.pipe(Schema.minLength(1))
const OptionalString = Schema.optional(Schema.String)

const MyForm = Schema.Struct({
  password: Password,
  confirm_password: Password,
  name: OptionalString,
  surname: OptionalString
}).pipe(
  Schema.filter((input) => {
    const issues: Array<Schema.FilterIssue> = []
    if (input.password !== input.confirm_password) {
      issues.push({
        path: ["confirm_password"],
        message: "Passwords do not match"
      })
    }
    if (!input.name && !input.surname) {
      issues.push({
        path: ["surname"],
        message: "Surname must be present if name is not present"
      })
    }
    return issues
  })
)

console.log(
  JSON.stringify(
    Schema.decodeUnknownEither(MyForm)({
      password: "abc",
      confirm_password: "d"
    }).pipe(
      Either.mapLeft((error) =>
        ParseResult.ArrayFormatter.formatErrorSync(error)
      )
    ),
    null,
    2
  )
)
```

### Exposed Values

You can access the base schema for which the filter has been defined:

```ts
import { Schema } from "effect"

const LongString = Schema.String.pipe(Schema.filter((s) => s.length >= 10))

const From = LongString.from
```

### String Filters

```ts
import { Schema } from "effect"

Schema.String.pipe(Schema.maxLength(5))
Schema.String.pipe(Schema.minLength(5))
Schema.NonEmptyString
Schema.String.pipe(Schema.length(5))
Schema.String.pipe(Schema.length({ min: 2, max: 4 }))
Schema.String.pipe(Schema.pattern(/^[a-z]+$/))
Schema.String.pipe(Schema.startsWith("prefix"))
Schema.String.pipe(Schema.endsWith("suffix"))
Schema.String.pipe(Schema.includes("substring"))
Schema.String.pipe(Schema.trimmed())
Schema.String.pipe(Schema.lowercased())
```

### Number Filters

```ts
import { Schema } from "effect"

Schema.Number.pipe(Schema.greaterThan(5))
Schema.Number.pipe(Schema.greaterThanOrEqualTo(5))
Schema.Number.pipe(Schema.lessThan(5))
Schema.Number.pipe(Schema.lessThanOrEqualTo(5))
Schema.Number.pipe(Schema.between(-2, 2))
Schema.Number.pipe(Schema.int())
Schema.Number.pipe(Schema.nonNaN())
Schema.Number.pipe(Schema.finite())
Schema.Number.pipe(Schema.positive())
Schema.Number.pipe(Schema.nonNegative())
Schema.Number.pipe(Schema.negative())
Schema.Number.pipe(Schema.nonPositive())
Schema.Number.pipe(Schema.multipleOf(5))
```

### BigInt Filters

```ts
import { Schema } from "effect"

Schema.BigInt.pipe(Schema.greaterThanBigInt(5n))
Schema.BigInt.pipe(Schema.greaterThanOrEqualToBigInt(5n))
Schema.BigInt.pipe(Schema.lessThanBigInt(5n))
Schema.BigInt.pipe(Schema.lessThanOrEqualToBigInt(5n))
Schema.BigInt.pipe(Schema.betweenBigInt(-2n, 2n))
Schema.BigInt.pipe(Schema.positiveBigInt())
Schema.BigInt.pipe(Schema.nonNegativeBigInt())
Schema.BigInt.pipe(Schema.negativeBigInt())
Schema.BigInt.pipe(Schema.nonPositiveBigInt())
```

### BigDecimal Filters

```ts
import { Schema } from "effect"
import { BigDecimal } from "effect"

Schema.BigDecimal.pipe(Schema.greaterThanBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.greaterThanOrEqualToBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.lessThanBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.lessThanOrEqualToBigDecimal(BigDecimal.fromNumber(5)))
Schema.BigDecimal.pipe(Schema.betweenBigDecimal(BigDecimal.fromNumber(-2), BigDecimal.fromNumber(2)))
Schema.BigDecimal.pipe(Schema.positiveBigDecimal())
Schema.BigDecimal.pipe(Schema.nonNegativeBigDecimal())
Schema.BigDecimal.pipe(Schema.negativeBigDecimal())
Schema.BigDecimal.pipe(Schema.nonPositiveBigDecimal())
```

### Duration Filters

```ts
import { Schema } from "effect"

Schema.Duration.pipe(Schema.greaterThanDuration("5 seconds"))
Schema.Duration.pipe(Schema.greaterThanOrEqualToDuration("5 seconds"))
Schema.Duration.pipe(Schema.lessThanDuration("5 seconds"))
Schema.Duration.pipe(Schema.lessThanOrEqualToDuration("5 seconds"))
Schema.Duration.pipe(Schema.betweenDuration("5 seconds", "10 seconds"))
```

### Array Filters

```ts
import { Schema } from "effect"

Schema.Array(Schema.Number).pipe(Schema.maxItems(2))
Schema.Array(Schema.Number).pipe(Schema.minItems(2))
Schema.Array(Schema.Number).pipe(Schema.itemsCount(2))
```

## Branded types

TypeScript's type system is structural, which means that any two types that are structurally equivalent are considered the same. This can cause issues when types that are semantically different are treated as if they were the same.

```ts
type UserId = string
type Username = string

declare const getUser: (id: UserId) => object

const myUsername: Username = "gcanti"

getUser(myUsername) // This erroneously works
```

To avoid these kinds of issues, the Effect ecosystem provides a way to create custom types with a unique identifier attached to them. These are known as **branded types**.

```ts
import { Brand } from "effect"

type UserId = string & Brand.Brand<"UserId">
type Username = string

declare const getUser: (id: UserId) => object

const myUsername: Username = "gcanti"

getUser(myUsername) // This will now throw an error
```

### Defining a brand schema from scratch

To define a schema for a branded type from scratch, you can use the `Schema.brand` function.

```ts
import { Schema } from "effect"

const UserId = Schema.String.pipe(Schema.brand("UserId"))
```

### Reusing an existing branded constructor

If you have already defined a branded type using the `effect/Brand` module, you can reuse it to define a schema using the `fromBrand` combinator exported by the `effect/Schema` module.

```ts
import { Schema } from "effect"
import { Brand } from "effect"

type UserId = string & Brand.Brand<"UserId">

const UserId = Brand.nominal<UserId>()

const UserIdSchema = Schema.String.pipe(Schema.fromBrand(UserId))
```

### Utilizing Default Constructors

The `Schema.brand` function includes a default constructor to facilitate the creation of branded values.

```ts
import { Schema } from "effect"

const UserId = Schema.String.pipe(Schema.brand("UserId"))

const userId = UserId.make("123") // Creates a branded UserId
```

## Native enums

```ts
import { Schema } from "effect"

enum Fruits {
  Apple,
  Banana
}

const schema = Schema.Enums(Fruits)
```

### Accessing Enum Members

Enums are exposed under an `enums` property of the schema:

```ts
import { Schema } from "effect"

enum Fruits {
  Apple,
  Banana
}

const schema = Schema.Enums(Fruits)

// Access the enum members
schema.enums // Returns all enum members
schema.enums.Apple // Access the Apple member
schema.enums.Banana // Access the Banana member
```

## Unions

The Schema module includes a built-in `Union` constructor for composing "OR" types.

```ts
import { Schema } from "effect"

const schema = Schema.Union(Schema.String, Schema.Number)
```

### Union of Literals

While the following is perfectly acceptable:

```ts
import { Schema } from "effect"

const schema = Schema.Union(
  Schema.Literal("a"),
  Schema.Literal("b"),
  Schema.Literal("c")
)
```

It is possible to use `Literal` and pass multiple literals, which is less cumbersome:

```ts
import { Schema } from "effect"

const schema = Schema.Literal("a", "b", "c")
```

### Nullables

```ts
import { Schema } from "effect"

Schema.NullOr(Schema.String)
Schema.NullishOr(Schema.String)
Schema.UndefinedOr(Schema.String)
```

### Discriminated unions

Discriminated unions in TypeScript are a way of modeling complex data structures that may take on different forms based on a specific set of conditions or properties.

```ts
import { Schema } from "effect"

const Circle = Schema.Struct({
  kind: Schema.Literal("circle"),
  radius: Schema.Number
})

const Square = Schema.Struct({
  kind: Schema.Literal("square"),
  sideLength: Schema.Number
})

const Shape = Schema.Union(Circle, Square)
```

### How to transform a simple union into a discriminated union

If you're working on a TypeScript project and you've defined a simple union to represent a particular input, you may find yourself in a situation where you're not entirely happy with how it's set up.

```ts
import { Schema } from "effect"

const Circle = Schema.Struct({
  radius: Schema.Number
})

const Square = Schema.Struct({
  sideLength: Schema.Number
})

const Shape = Schema.Union(Circle, Square)
```

To make your code more manageable, you may want to transform the simple union into a discriminated union. This way, TypeScript will be able to automatically determine which member of the union you're working with based on the value of a specific property.

```ts
import { Schema } from "effect"

const Circle = Schema.Struct({
  radius: Schema.Number
})

const Square = Schema.Struct({
  sideLength: Schema.Number
})

const DiscriminatedShape = Schema.Union(
  Schema.transform(
    Circle,
    Schema.Struct({ ...Circle.fields, kind: Schema.Literal("circle") }),
    {
      strict: true,
      decode: (circle) => ({ ...circle, kind: "circle" as const }),
      encode: ({ kind: _kind, ...rest }) => rest
    }
  ),

  Schema.transform(
    Square,
    Schema.Struct({ ...Square.fields, kind: Schema.Literal("square") }),
    {
      strict: true,
      decode: (square) => ({ ...square, kind: "square" as const }),
      encode: ({ kind: _kind, ...rest }) => rest
    }
  )
)
```

### Exposed Values

You can access the individual members of a union schema represented as a tuple:

```ts
import { Schema } from "effect"

const schema = Schema.Union(Schema.String, Schema.Number)

// Accesses the members of the union
const members = schema.members
```

## Tuples

### Required Elements

To define a tuple with required elements, you specify the list of elements:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(Schema.String, Schema.Number)
```

### Append a Required Element

```ts
import { Schema } from "effect"

const tuple1 = Schema.Tuple(Schema.String, Schema.Number)

const tuple2 = Schema.Tuple(...tuple1.elements, Schema.Boolean)
```

### Optional Elements

To define an optional element, wrap the schema of the element with the `optionalElement` constructor:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(
  Schema.String, // required element
  Schema.optionalElement(Schema.Number) // optional element
)
```

### Rest Element

To define rest elements, follow the list of elements (required or optional) with an element for the rest:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(
  [Schema.String, Schema.optionalElement(Schema.Number)], // elements
  Schema.Boolean // rest
)
```

### Exposed Values

You can access the elements and rest elements of a tuple schema:

```ts
import { Schema } from "effect"

const schema = Schema.Tuple(
  [Schema.String, Schema.optionalElement(Schema.Number)], // elements
  Schema.Boolean // rest
)

// Accesses the elements of the tuple
const tupleElements = schema.elements

// Accesses the rest elements of the tuple
const restElements = schema.rest
```

## Arrays

```ts
import { Schema } from "effect"

const schema = Schema.Array(Schema.Number)
```

### Exposed Values

You can access the value of an array schema:

```ts
import { Schema } from "effect"

const schema = Schema.Array(Schema.String)

// Accesses the value
const value = schema.value // typeof Schema.String
```

### Mutable Arrays

By default, when you use `Schema.Array`, it generates a type marked as readonly. The `mutable` combinator is a useful function for creating a new schema with a mutable type in a **shallow** manner:

```ts
import { Schema } from "effect"

const schema = Schema.mutable(Schema.Array(Schema.Number))
```

## Non empty arrays

```ts
import { Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.Number)
```

### Exposed Values

You can access the value of a non-empty array schema:

```ts
import { Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.String)

// Accesses the value
const value = schema.value
```

## Records

### String Keyed Records

```ts
import { Schema } from "effect"

const opaque = Schema.Record({ key: Schema.String, value: Schema.Number })

const schema = Schema.asSchema(opaque)
```

### Union of Literals as Keys

```ts
import { Schema } from "effect"

const opaque = Schema.Record({
  key: Schema.Union(Schema.Literal("a"), Schema.Literal("b")),
  value: Schema.Number
})

const schema = Schema.asSchema(opaque)
```

### Applying Key Refinements

```ts
import { Schema } from "effect"

const schema = Schema.Record({
  key: Schema.String.pipe(Schema.minLength(2)),
  value: Schema.Number
})
```

### Symbol Keyed Records

```ts
import { Schema } from "effect"

const schema = Schema.Record({
  key: Schema.SymbolFromSelf,
  value: Schema.Number
})
```

### Employing Template Literal Keys

```ts
import { Schema } from "effect"

const opaque = Schema.Record({
  key: Schema.TemplateLiteral(Schema.Literal("a"), Schema.String),
  value: Schema.Number
})

const schema = Schema.asSchema(opaque)
```

### Creating Mutable Records

By default, when you use `Schema.Record`, it generates a type marked as readonly. The `mutable` combinator is a useful function for creating a new schema with a mutable type in a **shallow** manner:

```ts
import { Schema } from "effect"

const schema = Schema.mutable(
  Schema.Record({ key: Schema.String, value: Schema.Number })
)
```

### Exposed Values

You can access the key and the value of a record schema:

```ts
import { Schema } from "effect"

const schema = Schema.Record({ key: Schema.String, value: Schema.Number })

const key = schema.key
const value = schema.value
```

## Structs

Structs are used to define schemas for objects with specific properties.

```ts
import { Schema } from "effect"

const MyStruct = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})
```

### Index Signatures

The `Struct` constructor optionally accepts a list of key/value pairs representing index signatures:

```ts
(props, ...indexSignatures) => Struct<...>
```

### Exposed Values

You can access the fields and the records of a struct schema:

```ts
import { Schema } from "effect"

const schema = Schema.Struct(
  { a: Schema.Number },
  Schema.Record({ key: Schema.String, value: Schema.Number })
)

const fields = schema.fields
const records = schema.records
```

### Mutable Properties

By default, when you use `Schema.Struct`, it generates a type with properties that are marked as readonly. The `Schema.mutable` combinator is a useful function for creating a new schema with properties made mutable in a **shallow** manner:

```ts
import { Schema } from "effect"

const opaque = Schema.mutable(
  Schema.Struct({ a: Schema.String, b: Schema.Number })
)
```

## Property Signatures

### Basic Usage of Property Signatures

A `PropertySignature` generally represents a transformation from a "From" field to a "To" field:

```ts
{
  fromKey: fromType
}
```

### Optional Fields

**Basic Optional Property**

`Schema.optional(schema: Schema<A, I, R>)` defines a basic optional property that handles different inputs and outputs during decoding and encoding.

**Optional with Nullability**

`Schema.optionalWith(schema: Schema<A, I, R>, { nullable: true })` allows handling of `null` values as equivalent to missing values.

**Combining Nullability and Exactness**

`Schema.optionalWith(schema: Schema<A, I, R>, { exact: true, nullable: true })` combines handling for exact types and null values.

### Default Values

The `default` option in schemas allows you to set default values that are applied during both decoding and object construction phases.

### Renaming Properties

### Renaming a Property During Definition

To rename a property directly during schema creation, you can utilize the `Schema.fromKey` function.

### Renaming Properties of an Existing Schema

For existing schemas, the `rename` API offers a way to systematically change property names across a schema.

## Tagged Structs

### What is a Tag?

A tag is a literal value added to data structures, commonly used in structs, to distinguish between various object types or variants within tagged unions.

### Using the tag Constructor

The `tag` constructor is specifically designed to create a property signature that holds a specific literal value.

### Simplifying Tagged Structs with TaggedStruct

The `TaggedStruct` constructor streamlines the process of creating tagged structs by directly integrating the tag into the struct definition.

### Multiple Tags

While a primary tag is often sufficient, TypeScript allows you to define multiple tags for more complex data structuring needs.

## instanceOf

When you need to define a schema for your custom data type defined through a `class`, the most convenient and fast way is to use the `Schema.instanceOf` constructor.

## pick

The `pick` static function available in each struct schema can be used to create a new `Struct` by selecting particular properties from an existing `Struct`.

## omit

The `omit` static function available in each struct schema can be used to create a new `Struct` by excluding particular properties from an existing `Struct`.

## partial

The `Schema.partial` operation makes all properties within a schema optional.

## required

The `Schema.required` operation ensures that all properties in a schema are mandatory.

## Extending Schemas

### Spreading Struct fields

Structs expose their fields through a `fields` property. This feature can be utilized to extend an existing struct with additional fields or to merge fields from another struct.

### The extend combinator

The `Schema.extend` combinator offers a structured way to extend schemas, particularly useful when direct field spreading is insufficient.

## Composition

Combining and reusing schemas is a common requirement, the `Schema.compose` combinator allows you to do just that.

### Non-strict Option

If you need to be less restrictive when composing your schemas, you can make use of the `{ strict: false }` option.

## Declaring New Data Types

### Declaring Schemas for Primitive Data Types

A primitive data type represents simple values. To declare a schema for a primitive data type, like the `File` type in TypeScript, we use the `S.declare` constructor along with a type guard.

### Declaring Schemas for Type Constructors

Type constructors are generic types that take one or more types as arguments and return a new type. If you need to define a schema for a type constructor, you can use the `S.declare` constructor.

### Adding Annotations

When you define a new data type, some compilers may not know how to handle the newly defined data. In such cases, you need to provide annotations to ensure proper functionality.

## Recursive Schemas

The `Schema.suspend` function is useful when you need to define a schema that depends on itself, like in the case of recursive data structures.

### Mutually Recursive Schemas

Here's an example of two mutually recursive schemas, `Expression` and `Operation`, that represent a simple arithmetic expression tree.

### Recursive Types with Different Encoded and Type

Defining a recursive schema where the `Encoded` type differs from the `Type` type adds another layer of complexity. In such cases, we need to define two interfaces: one for the `Type` type, and another for the `Encoded` type.