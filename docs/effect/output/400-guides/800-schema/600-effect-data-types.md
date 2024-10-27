# Effect Data Types

## Interop With Data

The Data module in the Effect ecosystem simplifies comparing values for equality without explicit implementations of the Equal and Hash traits. It provides APIs that automatically generate default implementations for equality checks.

```ts
import { Data, Equal } from "effect"

const person1 = Data.struct({ name: "Alice", age: 30 })
const person2 = Data.struct({ name: "Alice", age: 30 })

console.log(Equal.equals(person1, person2)) // true
```

Use the `Schema.Data(schema)` combinator to build a schema that decodes a value `A` to a value with Equal and Hash traits added:

```ts
import { Schema } from "effect"
import { Equal } from "effect"

const schema = Schema.Data(
  Schema.Struct({
    name: Schema.String,
    age: Schema.Number
  })
)

const decode = Schema.decode(schema)

const person1 = decode({ name: "Alice", age: 30 })
const person2 = decode({ name: "Alice", age: 30 })

console.log(Equal.equals(person1, person2)) // true
```

## Config

The `Schema.Config` function enhances configuration validation in applications, integrating structured schema validation with configuration settings.

Function definition:

```ts
Config: <A>(name: string, schema: Schema<A, string>) => Config<A>
```

Parameters:

- **name**: Identifier for the configuration setting.
- **schema**: Schema object describing the expected data type and structure.

Returns a Config object integrated with the application's configuration management system.

Steps:

1. **Fetching Configuration**: Retrieve the configuration value based on its name.
2. **Validation**: Validate the value against the schema. Returns detailed validation errors if discrepancies are found.
3. **Error Formatting**: Errors are formatted using `TreeFormatter.formatErrorSync`.

**Example**

```ts
import { Schema } from "effect"
import { Effect } from "effect"

const myconfig = Schema.Config("Foo", Schema.String.pipe(Schema.minLength(4)))

const program = Effect.gen(function* () {
  const foo = yield* myconfig
  console.log(`ok: ${foo}`)
})

Effect.runSync(program)
```

Test commands:

- **Test with Missing Configuration Data**:
  ```sh
  npx tsx config.ts
  # Output: [(Missing data at Foo: "Expected Foo to exist in the process context")]
  ```
- **Test with Invalid Data**:
  ```sh
  Foo=bar npx tsx config.ts
  # Output: [(Invalid data at Foo: "a string at least 4 character(s) long
  # └─ Predicate refinement failure
  #    └─ Expected a string at least 4 character(s) long, actual "bar"")]
  ```
- **Test with Valid Data**:
  ```sh
  Foo=foobar npx tsx config.ts
  # Output: ok: foobar
  ```

## Option

### Option

- **Decoding**
  - `{ _tag: "None" }` -> `Option.none()`
  - `{ _tag: "Some", value: i }` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> `{ _tag: "None" }`
  - `Option.some(a)` -> `{ _tag: "Some", value: i }`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.Option(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode({ _tag: "None" })) // { _id: 'Option', _tag: 'None' }
console.log(decode({ _tag: "Some", value: "1" })) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // { _tag: 'None' }
console.log(encode(Option.some(1))) // { _tag: 'Some', value: '1' }
```

### OptionFromSelf

- **Decoding**
  - `Option.none()` remains as `Option.none()`.
  - `Option.some(i)` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` remains as `Option.none()`.
  - `Option.some(a)` -> `Option.some(i)`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromSelf(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(Option.none())) // { _id: 'Option', _tag: 'None' }
console.log(decode(Option.some("1"))) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // { _id: 'Option', _tag: 'None' }
console.log(encode(Option.some(1))) // { _id: 'Option', _tag: 'Some', value: '1' }
```

### OptionFromUndefinedOr

- **Decoding**
  - `undefined` -> `Option.none()`.
  - `i` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> `undefined`.
  - `Option.some(a)` -> `i`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromUndefinedOr(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(undefined)) // { _id: 'Option', _tag: 'None' }
console.log(decode("1")) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // undefined
console.log(encode(Option.some(1))) // "1"
```

### OptionFromNullOr

- **Decoding**
  - `null` -> `Option.none()`.
  - `i` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> `null`.
  - `Option.some(a)` -> `i`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromNullOr(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(null)) // { _id: 'Option', _tag: 'None' }
console.log(decode("1")) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // null
console.log(encode(Option.some(1))) // "1"
```

### OptionFromNullishOr

- **Decoding**
  - `null` -> `Option.none()`.
  - `undefined` -> `Option.none()`.
  - `i` -> `Option.some(a)`, where `i` is decoded into `a`.
- **Encoding**
  - `Option.none()` -> specified value (undefined or null).
  - `Option.some(a)` -> `i`, where `a` is encoded into `i`.

**Example**

```ts
import { Schema } from "effect"
import { Option } from "effect"

const schema = Schema.OptionFromNullishOr(Schema.NumberFromString, undefined)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(null)) // { _id: 'Option', _tag: 'None' }
console.log(decode(undefined)) // { _id: 'Option', _tag: 'None' }
console.log(decode("1")) // { _id: 'Option', _tag: 'Some', value: 1 }

console.log(encode(Option.none())) // undefined
console.log(encode(Option.some(1))) // "1"
```

### OptionFromNonEmptyTrimmedString

- **Decoding**
  - `s` -> `Option.some(s)`, if `s.trim().length > 0`.
  - `Option.none()` otherwise.
- **Encoding**
  - `Option.none()` -> `""`.
  - `Option.some(s)` -> `s`.

**Example**

```ts
import { Schema } from "effect"

console.log(Schema.decodeSync(Schema.OptionFromNonEmptyTrimmedString)("")) // Option.none()
console.log(Schema.decodeSync(Schema.OptionFromNonEmptyTrimmedString)(" a ")) // Option.some("a")
console.log(Schema.decodeSync(Schema.OptionFromNonEmptyTrimmedString)("a")) // Option.some("a")
```

## Either

### Either

- **Decoding**
  - `{ _tag: "Left", left: li }` -> `Either.left(la)`
  - `{ _tag: "Right", right: ri }` -> `Either.right(ra)`
- **Encoding**
  - `Either.left(la)` -> `{ _tag: "Left", left: li }`
  - `Either.right(ra)` -> `{ _tag: "Right", right: ri }`

**Example**

```ts
import { Schema } from "effect"
import { Either } from "effect"

const schema = Schema.Either({
  left: Schema.Trim,
  right: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode({ _tag: "Left", left: " a " })) // { _id: 'Either', _tag: 'Left', left: 'a' }
console.log(decode({ _tag: "Right", right: "1" })) // { _id: 'Either', _tag: 'Right', right: 1 }

console.log(encode(Either.left("a"))) // { _tag: 'Left', left: 'a' }
console.log(encode(Either.right(1))) // { _tag: 'Right', right: '1' }
```

### EitherFromSelf

- **Decoding**
  - `Either.left(li)` -> `Either.left(la)`
  - `Either.right(ri)` -> `Either.right(ra)`
- **Encoding**
  - `Either.left(la)` -> `Either.left(li)`
  - `Either.right(ra)` -> `Either.right(ri)`

**Example**

```ts
import { Schema } from "effect"
import { Either } from "effect"

const schema = Schema.EitherFromSelf({
  left: Schema.Trim,
  right: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(Either.left(" a "))) // { _id: 'Either', _tag: 'Left', left: 'a' }
console.log(decode(Either.right("1"))) // { _id: 'Either', _tag: 'Right', right: 1 }

console.log(encode(Either.left("a"))) // { _id: 'Either', _tag: 'Left', left: 'a' }
console.log(encode(Either.right(1))) // { _id: 'Either', _tag: 'Right', right: '1' }
```

### EitherFromUnion

- **Decoding**
  - `li` -> `Either.left(la)`
  - `ri` -> `Either.right(ra)`
- **Encoding**
  - `Either.left(la)` -> `li`
  - `Either.right(ra)` -> `ri`

**Example**

```ts
import { Schema } from "effect"
import { Either } from "effect"

const schema = Schema.EitherFromUnion({
  left: Schema.Boolean,
  right: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(true)) // { _id: 'Either', _tag: 'Left', left: true }
console.log(decode("1")) // { _id: 'Either', _tag: 'Right', right: 1 }

console.log(encode(Either.left(true))) // true
console.log(encode(Either.right(1))) // "1"
```

## ReadonlySet

### ReadonlySet

- **Decoding**
  - `ReadonlyArray<I>` -> `ReadonlySet<A>`
- **Encoding**
  - `ReadonlySet<A>` -> `ReadonlyArray<I>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlySet(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(["1", "2", "3"])) // Set(3) { 1, 2, 3 }
console.log(encode(new Set([1, 2, 3]))) // [ '1', '2', '3' ]
```

### ReadonlySetFromSelf

- **Decoding**
  - `ReadonlySet<I>` -> `ReadonlySet<A>`
- **Encoding**
  - `ReadonlySet<A>` -> `ReadonlySet<I>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlySetFromSelf(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(new Set(["1", "2", "3"]))) // Set(3) { 1, 2, 3 }
console.log(encode(new Set([1, 2, 3]))) // Set(3) { '1', '2', '3' }
```

## ReadonlyMap

### ReadonlyMap

- **Decoding**
  - `ReadonlyArray<readonly [KI, VI]>` -> `ReadonlyMap<KA, VA>`
- **Encoding**
  - `ReadonlyMap<KA, VA>` -> `ReadonlyArray<readonly [KI, VI]>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlyMap({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode([
    ["a", "2"],
    ["b", "2"],
    ["c", "3"]
  ])
) // Map(3) { 'a' => 2, 'b' => 2, 'c' => 3 }
console.log(
  encode(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // [ [ 'a', '1' ], [ 'b', '2' ], [ 'c', '3' ] ]
```

### ReadonlyMapFromSelf

- **Decoding**
  - `ReadonlyMap<KI, VI>` -> `ReadonlyMap<KA, VA>`
- **Encoding**
  - `ReadonlyMap<KA, VA>` -> `ReadonlyMap<KI, VI>`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlyMapFromSelf({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode(
    new Map([
      ["a", "2"],
      ["b", "2"],
      ["c", "3"]
    ])
  )
) // Map(3) { 'a' => 2, 'b' => 2, 'c' => 3 }
console.log(
  encode(
    new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // Map(3) { 'a' => '1', 'b' => '2', 'c' => '3' }
```

### ReadonlyMapFromRecord

- **Decoding**
  - `{ readonly [x: string]: VI }` -> `ReadonlyMap<KA, VA>`
- **Encoding**
  - `ReadonlyMap<KA, VA>` -> `{ readonly [x: string]: VI }`

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.ReadonlyMapFromRecord({
  key: Schema.NumberFromString,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode({
    "1": "4",
    "2": "5",
    "3": "6"
  })
) // Map(3) { 1 => 4, 2 => 5, 3 => 6 }
console.log(
  encode(
    new Map([
      [1, 4],
      [2, 5],
      [3, 6]
    ])
  )
) // { '1': '4', '2': '5', '3': '6' }
```

## HashSet

### HashSet

- **Decoding**
  - `ReadonlyArray<I>` -> `HashSet<A>`
- **Encoding**
  - `HashSet<A>` -> `ReadonlyArray<I>`

**Example**

```ts
import { Schema } from "effect"
import { HashSet } from "effect"

const schema = Schema.HashSet(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(["1", "2", "3"])) // { _id: 'HashSet', values: [ 1, 2, 3 ] }
console.log(encode(HashSet.fromIterable([1, 2, 3]))) // [ '1', '2', '3' ]
```

### HashSetFromSelf

- **Decoding**
  - `HashSet<I>` -> `HashSet<A>`
- **Encoding**
  - `HashSet<A>` -> `HashSet<I>`

**Example**

```ts
import { Schema } from "effect"
import { HashSet } from "effect"

const schema = Schema.HashSetFromSelf(Schema.NumberFromString)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(HashSet.fromIterable(["1", "2", "3"]))) // { _id: 'HashSet', values: [ 1, 2, 3 ] }
console.log(encode(HashSet.fromIterable([1, 2, 3]))) // { _id: 'HashSet', values: [ '1', '3', '2' ] }
```

## HashMap

### HashMap

- **Decoding**
  - `ReadonlyArray<readonly [KI, VI]>` -> `HashMap<KA, VA>`
- **Encoding**
  - `HashMap<KA, VA>` -> `ReadonlyArray<readonly [KI, VI]>`

**Example**

```ts
import { Schema } from "effect"
import { HashMap } from "effect"

const schema = Schema.HashMap({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode([
    ["a", "2"],
    ["b", "2"],
    ["c", "3"]
  ])
) // { _id: 'HashMap', values: [ [ 'a', 2 ], [ 'c', 3 ], [ 'b', 2 ] ] }
console.log(
  encode(
    HashMap.fromIterable([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // [ [ 'a', '1' ], [ 'c', '3' ], [ 'b', '2' ] ]
```

### HashMapFromSelf

- **Decoding**
  - `HashMap<KI, VI>` -> `HashMap<KA, VA>`
- **Encoding**
  - `HashMap<KA, VA>` -> `HashMap<KI, VI>`

**Example**

```ts
import { Schema } from "effect"
import { HashMap } from "effect"

const schema = Schema.HashMapFromSelf({
  key: Schema.String,
  value: Schema.NumberFromString
})

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(
  decode(
    HashMap.fromIterable([
      ["a", "2"],
      ["b", "2"],
      ["c", "3"]
    ])
  )
) // { _id: 'HashMap', values: [ [ 'a', 2 ], [ 'c', 3 ], [ 'b', 2 ] ] }
console.log(
  encode(
    HashMap.fromIterable([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  )
) // { _id: 'HashMap', values: [ [ 'a', '1' ], [ 'c', '3' ], [ 'b', '2' ] ] }
```

## SortedSet

### SortedSet

- **Decoding**
  - `ReadonlyArray<I>` -> `SortedSet<A>`
- **Encoding**
  - `SortedSet<A>` -> `ReadonlyArray<I>`

**Example**

```ts
import { Schema } from "effect"
import { Number, SortedSet } from "effect"

const schema = Schema.SortedSet(Schema.NumberFromString, Number.Order)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(["1", "2", "3"])) // { _id: 'SortedSet', values: [ 1, 2, 3 ] }
console.log(encode(SortedSet.fromIterable(Number.Order)([1, 2, 3]))) // [ '1', '2', '3' ]
```

### SortedSetFromSelf

- **Decoding**
  - `SortedSet<I>` -> `SortedSet<A>`
- **Encoding**
  - `SortedSet<A>` -> `SortedSet<I>`

**Example**

```ts
import { Schema } from "effect"
import { Number, SortedSet, String } from "effect"

const schema = Schema.SortedSetFromSelf(
  Schema.NumberFromString,
  Number.Order,
  String.Order
)

const decode = Schema.decodeUnknownSync(schema)
const encode = Schema.encodeSync(schema)

console.log(decode(SortedSet.fromIterable(String.Order)(["1", "2", "3"]))) // { _id: 'SortedSet', values: [ 1, 2, 3 ] }
console.log(encode(SortedSet.fromIterable(Number.Order)([1, 2, 3]))) // { _id: 'SortedSet', values: [ '1', '2', '3' ] }
```

## Duration

### Duration

Converts hrtime (i.e. `[seconds: number, nanos: number]`) into a `Duration`.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.Duration // Schema<Duration, number>
const decode = Schema.decodeUnknownSync(schema)

console.log(decode([0, 0])) // { _id: 'Duration', _tag: 'Millis', millis: 0 }
console.log(decode([5000, 0])) // { _id: 'Duration', _tag: 'Nanos', hrtime: [ 5000, 0 ] }
```

### DurationFromSelf

The `DurationFromSelf` schema validates that a given value conforms to the `Duration` type from the `effect` library.

**Example**

```ts
import { Schema } from "effect"
import { Duration } from "effect"

const schema = Schema.DurationFromSelf
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(Duration.seconds(2))) // { _id: 'Duration', _tag: 'Millis', millis: 2000 }
console.log(decode(null)) // throws ParseError: Expected DurationFromSelf, actual null
```

### DurationFromMillis

Converts a `number` into a `Duration` where the number represents milliseconds.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.DurationFromMillis // Schema<Duration, number>
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(0)) // { _id: 'Duration', _tag: 'Millis', millis: 0 }
console.log(decode(5000)) // { _id: 'Duration', _tag: 'Millis', millis: 5000 }
```

### DurationFromNanos

Converts a `BigInt` into a `Duration` where the number represents nanoseconds.

**Example**

```ts
// @target: ES2020
import { Schema } from "effect"

const schema = Schema.DurationFromNanos // Schema<Duration, BigInt>
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(0n)) // { _id: 'Duration', _tag: 'Millis', millis: 0 }
console.log(decode(5000000000n)) // { _id: 'Duration', _tag: 'Nanos', hrtime: [ 5, 0 ] }
```

### clampDuration

Clamps a `Duration` between a minimum and maximum value.

**Example**

```ts
import { Schema } from "effect"
import { Duration } from "effect"

const schema = Schema.DurationFromSelf.pipe(
  Schema.clampDuration("5 seconds", "10 seconds")
)

const decode = Schema.decodeUnknownSync(schema)

console.log(decode(Duration.decode("2 seconds"))) // { _id: 'Duration', _tag: 'Millis', millis: 5000 }
console.log(decode(Duration.decode("6 seconds"))) // { _id: 'Duration', _tag: 'Millis', millis: 6000 }
console.log(decode(Duration.decode("11 seconds"))) // { _id: 'Duration', _tag: 'Millis', millis: 10000 }
```

## Redacted

### Redacted

The `Schema.Redacted` function handles sensitive information by converting a `string` into a Redacted object, ensuring sensitive data is not exposed in the application's output.

**Example**

```ts
import { Schema } from "effect"

// Schema.Redacted<typeof Schema.String>
const schema = Schema.Redacted(Schema.String)
const decode = Schema.decodeUnknownSync(schema)

console.log(decode("keep it secret, keep it safe")) // {}
```

When successfully decoding a `Redacted`, the output is obscured (`{}`) to prevent revealing the actual secret.

<Warning>
  When composing the `Redacted` schema with other schemas, care must be taken as decoding or encoding errors could expose sensitive information.
</Warning>

**Example Showing Potential Data Exposure**

```ts
import { Schema } from "effect"
import { Redacted } from "effect"

const schema = Schema.Trimmed.pipe(
  Schema.compose(Schema.Redacted(Schema.String))
)

console.log(Schema.decodeUnknownEither(schema)(" SECRET"))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed (a string with no leading or trailing whitespace), actual " SECRET"'
  }
}
*/
console.log(Schema.encodeEither(schema)(Redacted.make(" SECRET")))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed (a string with no leading or trailing whitespace), actual " SECRET"'
  }
}
*/
```

To reduce the risk of sensitive information leakage in error messages, customize the error messages to obscure sensitive details:

```ts
import { Schema } from "effect"
import { Redacted } from "effect"

const schema = Schema.Trimmed.annotations({
  message: () => "Expected Trimmed, actual <redacted>"
}).pipe(Schema.compose(Schema.Redacted(Schema.String)))

console.log(Schema.decodeUnknownEither(schema)(" SECRET"))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed, actual <redacted>'
  }
}
*/
console.log(Schema.encodeEither(schema)(Redacted.make(" SECRET")))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: '(Trimmed <-> (string <-> Redacted(<redacted>)))\n' +
      '└─ Encoded side transformation failure\n' +
      '   └─ Trimmed\n' +
      '      └─ Predicate refinement failure\n' +
      '         └─ Expected Trimmed, actual <redacted>'
  }
}
*/
```

### RedactedFromSelf

The `Schema.RedactedFromSelf` schema validates that a given value conforms to the `Redacted` type from the `effect` library.

**Example**

```ts
import { Schema } from "effect"
import { Redacted } from "effect"

const schema = Schema.RedactedFromSelf(Schema.String)
const decode = Schema.decodeUnknownSync(schema)

console.log(decode(Redacted.make("mysecret"))) // {}
console.log(decode(null)) // throws ParseError: Expected Redacted(<redacted>), actual null
```

When successfully decoding a `Redacted`, the output is obscured (`{}`) to prevent revealing the actual secret.