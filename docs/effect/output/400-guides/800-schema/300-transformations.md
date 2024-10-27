---
title: Transformations
excerpt: Transformations
bottomNavigation: pagination
---

Transformations are essential for converting data types, such as parsing strings into numbers or converting date strings into `Date` objects.

## transform

The `Schema.transform` function links two schemas: one for the input type and one for the output type. It accepts five parameters:

- **from**: The source schema (`Schema<B, A, R1>`), where `A` is the input type and `B` is the intermediate type after validation.
- **to**: The target schema (`Schema<D, C, R2>`), where `C` is the transformed type from `B`, and `D` is the final output type.
- **decode**: A function converting an intermediate value of type `B` to type `C` (`(b: B, a: A) => C`).
- **encode**: A function reversing the transformation, converting type `C` back to type `B` (`(c: C, d: D) => B`).
- **strict**: Optional (recommended) boolean.

The result is a schema `Schema<D, A, R1 | R2>`.

**Example: Doubling a Number**

```ts
import { Schema } from "effect"

const transformedSchema = Schema.transform(
  Schema.Number,
  Schema.Number,
  {
    strict: true,
    decode: (n) => n * 2,
    encode: (n) => n / 2
  }
)
```

**Example: Converting an array to a ReadonlySet**

```ts
import { Schema } from "effect"

const ReadonlySetFromArray = <A, I, R>(
  itemSchema: Schema.Schema<A, I, R>
): Schema.Schema<ReadonlySet<A>, ReadonlyArray<I>, R> =>
  Schema.transform(
    Schema.Array(itemSchema),
    Schema.ReadonlySetFromSelf(Schema.typeSchema(itemSchema)),
    {
      strict: true,
      decode: (items) => new Set(items),
      encode: (set) => Array.from(set.values())
    }
  )
```

**Example: Trim Whitespace**

```ts
import { Schema } from "effect"

const transformedSchema = Schema.transform(
  Schema.String,
  Schema.String,
  {
    strict: true,
    decode: (s) => s.trim(),
    encode: (s) => s
  }
)
```

**Improving the Transformation with a Filter**

```ts
import { Schema } from "effect"

const transformedSchema = Schema.transform(
  Schema.String,
  Schema.String.pipe(Schema.filter((s) => s === s.trim())),
  {
    strict: true,
    decode: (s) => s.trim(),
    encode: (s) => s
  }
)
```

### Non-strict option

For cases where strict type checking is too limiting, `transform` allows `strict: false` for more flexible data manipulation.

**Example: Clamping Constructor**

```ts
import { Schema } from "effect"
import { Number } from "effect"

const clamp =
  (minimum: number, maximum: number) =>
  <A extends number, I, R>(self: Schema.Schema<A, I, R>) =>
    Schema.transform(
      self,
      self.pipe(
        Schema.typeSchema,
        Schema.filter((a) => a <= minimum || a >= maximum)
      ),
      {
        strict: true,
        decode: (a) => Number.clamp(a, { minimum, maximum }),
        encode: (a) => a
      }
    )
```

## transformOrFail

The `Schema.transformOrFail` function is for scenarios where transformations can fail during decoding or encoding. It uses the ParseResult module for error management:

- **ParseResult.succeed**: Indicates a successful transformation.
- **ParseResult.fail**: Signals a failed transformation.

**Example: Converting a String to a Number**

```ts
import { ParseResult, Schema } from "effect"

export const NumberFromString = Schema.transformOrFail(
  Schema.String,
  Schema.Number,
  {
    strict: true,
    decode: (input, options, ast) => {
      const parsed = parseFloat(input)
      if (isNaN(parsed)) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            input,
            "Failed to convert string to number"
          )
        )
      }
      return ParseResult.succeed(parsed)
    },
    encode: (input, options, ast) => ParseResult.succeed(input.toString())
  }
)
```

### Async Transformations

`Schema.transformOrFail` supports asynchronous transformations by allowing you to return an `Effect`.

**Example: Asynchronously Converting a String to a Number Using an API**

```ts
import { Effect, Schema, ParseResult } from "effect"

const api = (url: string): Effect.Effect<unknown, Error> =>
  Effect.tryPromise({
    try: () =>
      fetch(url).then((res) => {
        if (res.ok) {
          return res.json() as Promise<unknown>
        }
        throw new Error(String(res.status))
      }),
    catch: (e) => new Error(String(e))
  })

const PeopleId = Schema.String.pipe(Schema.brand("PeopleId"))

const PeopleIdFromString = Schema.transformOrFail(Schema.String, PeopleId, {
  strict: true,
  decode: (s, _, ast) =>
    Effect.mapBoth(api(`https://swapi.dev/api/people/${s}`), {
      onFailure: (e) => new ParseResult.Type(ast, s, e.message),
      onSuccess: () => s
    }),
  encode: ParseResult.succeed
})
```

## Effectful Filters

The `Schema.filterEffect` function allows for asynchronous or dynamic validation scenarios.

**Example: Validating Usernames Asynchronously**

```ts
import { Schema } from "effect"
import { Effect } from "effect"

async function validateUsername(username: string) {
  return Promise.resolve(username === "gcanti")
}

const ValidUsername = Schema.String.pipe(
  Schema.filterEffect((username) =>
    Effect.promise(() =>
      validateUsername(username).then((valid) => valid || "Invalid username")
    )
  )
).annotations({ identifier: "ValidUsername" })
```

## String Transformations

### split

Splits a string into an array of strings.

```ts
import { Schema } from "effect"

const schema = Schema.split(",")

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("")) // [""]
console.log(decode(",")) // ["", ""]
console.log(decode("a,")) // ["a", ""]
console.log(decode("a,b")) // ["a", "b"]
```

### Trim

Removes whitespaces from the beginning and end of a string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Trim)

console.log(decode("a")) // "a"
console.log(decode(" a")) // "a"
console.log(decode("a ")) // "a"
console.log(decode(" a ")) // "a"
```

### Lowercase

Converts a string to lowercase.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Lowercase)

console.log(decode("A")) // "a"
console.log(decode(" AB")) // " ab"
console.log(decode("Ab ")) // "ab "
console.log(decode(" ABc ")) // " abc "
```

### Uppercase

Converts a string to uppercase.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Uppercase)

console.log(decode("a")) // "A"
console.log(decode(" ab")) // " AB"
console.log(decode("aB ")) // "AB "
console.log(decode(" abC ")) // " ABC "
```

### Capitalize

Converts a string to capitalized one.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Capitalize)

console.log(decode("aa")) // "Aa"
console.log(decode(" ab")) // " ab"
console.log(decode("aB ")) // "AB "
console.log(decode(" abC ")) // " abC "
```

### Uncapitalize

Converts a string to uncapitalized one.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Uncapitalize)

console.log(decode("AA")) // "aA"
console.log(decode(" AB")) // " AB"
console.log(decode("Ab ")) // "ab "
console.log(decode(" AbC ")) // " AbC "
```

### parseJson

Converts JSON strings into the `unknown` type using `JSON.parse`.

```ts
import { Schema } from "effect"

const schema = Schema.parseJson()
const decode = Schema.decodeUnknownSync(schema)

console.log(decode("{}")) // Output: {}
console.log(decode(`{"a":"b"}`)) // Output: { a: "b" }

decode("")
/*
throws:
ParseError: (JsonString <-> unknown)
└─ Transformation process failure
   └─ Unexpected end of JSON input
*/
```

### StringFromBase64

Decodes a base64 encoded string into a UTF-8 string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.StringFromBase64)

console.log(decode("Zm9vYmFy")) // "foobar"
```

### StringFromBase64Url

Decodes a base64 (URL) encoded string into a UTF-8 string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.StringFromBase64Url)

console.log(decode("Zm9vYmFy")) // "foobar"
```

### StringFromHex

Decodes a hex encoded string into a UTF-8 string.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.StringFromHex)

console.log(new TextEncoder().encode(decode("0001020304050607")))
/*
Output:
Uint8Array(8) [
  0, 1, 2, 3,
  4, 5, 6, 7
]
*/
```

## Number Transformations

### NumberFromString

Transforms a string into a number by parsing the string using `parseFloat`.

```ts
import { Schema } from "effect"

const schema = Schema.NumberFromString

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("1")) // 1
console.log(decode("-1")) // -1
console.log(decode("1.5")) // 1.5
console.log(decode("NaN")) // NaN
console.log(decode("Infinity")) // Infinity
console.log(decode("-Infinity")) // -Infinity

decode("a")
/*
throws:
ParseError: NumberFromString
└─ Transformation process failure
   └─ Expected NumberFromString, actual "a"
*/
```

### clamp

Clamps a number between a minimum and a maximum value.

```ts
import { Schema } from "effect"

const schema = Schema.Number.pipe(Schema.clamp(-1, 1))

const decode = Schema.decodeUnknownSync(schema)

console.log(decode(-3)) // -1
console.log(decode(0)) // 0
console.log(decode(3)) // 1
```

### parseNumber

Transforms a string into a number by parsing the string using the `parse` function of the `effect/Number` module.

```ts
import { Schema } from "effect"

const schema = Schema.String.pipe(Schema.parseNumber)

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("1")) // 1
console.log(decode("Infinity")) // Infinity
console.log(decode("NaN")) // NaN
console.log(decode("-"))
/*
throws
ParseError: (string <-> number)
└─ Transformation process failure
   └─ Expected (string <-> number), actual "-"
*/
```

## Boolean Transformations

### Not

Negates a boolean value.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Not)

console.log(decode(true)) // false
console.log(decode(false)) // true
```

## Symbol transformations

### Symbol

Transforms a string into a symbol by parsing the string using `Symbol.for`.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Symbol)

console.log(decode("a")) // Symbol(a)
```

## BigInt transformations

### BigInt

Transforms a string into a `BigInt` by parsing the string using the `BigInt` constructor.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigInt)

console.log(decode("1")) // 1n
console.log(decode("-1")) // -1n

decode("a")
/*
throws:
ParseError: bigint
└─ Transformation process failure
   └─ Expected bigint, actual "a"
*/
decode("1.5") // throws
decode("NaN") // throws
decode("Infinity") // throws
```

### BigIntFromNumber

Transforms a number into a `BigInt` by parsing the number using the `BigInt` constructor.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigIntFromNumber)

console.log(decode(1)) // 1n
console.log(decode(-1)) // -1n

decode(1.5)
/*
throws:
ParseError: BigintFromNumber
└─ Transformation process failure
   └─ Expected BigintFromNumber, actual 1.5
*/
```

### clamp

Clamps a `BigInt` between a minimum and a maximum value.

```ts
import { Schema } from "effect"

const schema = Schema.BigIntFromSelf.pipe(Schema.clampBigInt(-1n, 1n))

const decode = Schema.decodeUnknownSync(schema)

console.log(decode(-3n)) // -1n
console.log(decode(0n)) // 0n
console.log(decode(3n)) // 1n
```

## Date transformations

### Date

Transforms a string into a valid `Date`, rejecting invalid dates.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.Date)

console.log(decode("1970-01-01T00:00:00.000Z")) // 1970-01-01T00:00:00.000Z

decode("a")
/*
throws:
ParseError: Date
└─ Predicate refinement failure
   └─ Expected Date, actual Invalid Date
*/
```

## BigDecimal Transformations

### BigDecimal

Transforms a string into a `BigDecimal`.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigDecimal)

console.log(decode(".124")) // { _id: 'BigDecimal', value: '124', scale: 3 }
```

### BigDecimalFromNumber

Transforms a number into a `BigDecimal`.

```ts
import { Schema } from "effect"

const decode = Schema.decodeUnknownSync(Schema.BigDecimalFromNumber)

console.log(decode(0.111)) // { _id: 'BigDecimal', value: '111', scale: 3 }
```

### clampBigDecimal

Clamps a `BigDecimal` between a minimum and a maximum value.

```ts
import { Schema } from "effect"
import { BigDecimal } from "effect"

const schema = Schema.BigDecimal.pipe(
  Schema.clampBigDecimal(BigDecimal.fromNumber(-1), BigDecimal.fromNumber(1))
)

const decode = Schema.decodeUnknownSync(schema)

console.log(decode("-2")) // { _id: 'BigDecimal', value: '-1', scale: 0 }
console.log(decode("0")) // { _id: 'BigDecimal', value: '0', scale: 0 }
console.log(decode("3")) // { _id: 'BigDecimal', value: '1', scale: 0 }
```