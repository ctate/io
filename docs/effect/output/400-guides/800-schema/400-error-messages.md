# Error Messages

## Default Error Messages

When a parsing error occurs, the system generates an informative message based on the schema's structure and the nature of the error. For example, if a required property is missing or a data type does not match, the error message will state the expectation versus the actual input.

**Example: Type Mismatch**

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(schema)(null)
/*
ParseError: Date
└─ Predicate refinement failure
   └─ Expected Date, actual Invalid Date
*/
```

**Example: Missing Properties**

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(schema)({}, { errors: "all" })
/*
throws:
ParseError: { readonly name: string; readonly age: number }
├─ ["name"]
│  └─ is missing
└─ ["age"]
   └─ is missing
*/
```

**Example: Incorrect Property Type**

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

Schema.decodeUnknownSync(schema)(
  { name: null, age: "age" },
  { errors: "all" }
)
/*
throws:
ParseError: { readonly name: string; readonly age: number }
├─ ["name"]
│  └─ Expected string, actual null
└─ ["age"]
   └─ Expected number, actual "age"
*/
```

### Enhancing Clarity in Error Messages with Identifiers

To enhance clarity in error messages for schemas with multiple fields or nested structures, you can use annotations such as `identifier`, `title`, and `description`.

**Example**

```ts
import { Schema } from "effect"

const Name = Schema.String.annotations({ identifier: "Name" })

const Age = Schema.Number.annotations({ identifier: "Age" })

const Person = Schema.Struct({
  name: Name,
  age: Age
}).annotations({ identifier: "Person" })

Schema.decodeUnknownSync(Person)(null)
/*
throws:
ParseError: Expected Person, actual null
*/

Schema.decodeUnknownSync(Person)({}, { errors: "all" })
/*
throws:
ParseError: Person
├─ ["name"]
│  └─ is missing
└─ ["age"]
   └─ is missing
*/

Schema.decodeUnknownSync(Person)({ name: null, age: null }, { errors: "all" })
/*
throws:
ParseError: Person
├─ ["name"]
│  └─ Expected Name, actual null
└─ ["age"]
   └─ Expected Age, actual null
*/
```

### Refinements

When a refinement fails, the default error message indicates whether the failure occurred in the "from" part or within the predicate defining the refinement:

**Example**

```ts
import { Schema } from "effect"

const Name = Schema.NonEmptyString.annotations({ identifier: "Name" }) // refinement

const Age = Schema.Positive.pipe(Schema.int({ identifier: "Age" })) // refinement

const Person = Schema.Struct({
  name: Name,
  age: Age
}).annotations({ identifier: "Person" })

// From side failure
Schema.decodeUnknownSync(Person)({ name: null, age: 18 })
/*
throws:
ParseError: Person
└─ ["name"]
   └─ Name
      └─ From side refinement failure
         └─ Expected string, actual null
*/

// Predicate refinement failure
Schema.decodeUnknownSync(Person)({ name: "", age: 18 })
/*
throws:
ParseError: Person
└─ ["name"]
   └─ Name
      └─ Predicate refinement failure
         └─ Expected Name, actual ""
*/
```

### Transformations

Transformations between different types or formats can result in errors. The system provides structured error messages to specify where the error occurred:

- **Encoded Side Failure:** Indicates that the input to the transformation does not match the expected type or format.
- **Transformation Process Failure:** Arises when the transformation logic itself fails.
- **Type Side Failure:** Occurs when the output of a transformation does not meet the schema requirements.

**Example**

```ts
import { ParseResult, Schema } from "effect"

const schema = Schema.transformOrFail(
  Schema.String,
  Schema.String.pipe(Schema.minLength(2)),
  {
    strict: true,
    decode: (s, _, ast) =>
      s.length > 0
        ? ParseResult.succeed(s)
        : ParseResult.fail(new ParseResult.Type(ast, s)),
    encode: ParseResult.succeed
  }
)

// Encoded side failure
Schema.decodeUnknownSync(schema)(null)
/*
throws:
ParseError: (string <-> a string at least 2 character(s) long)
└─ Encoded side transformation failure
   └─ Expected string, actual null
*/

// transformation failure
Schema.decodeUnknownSync(schema)("")
/*
throws:
ParseError: (string <-> a string at least 2 character(s) long)
└─ Transformation process failure
   └─ Expected (string <-> a string at least 2 character(s) long), actual ""
*/

// Type side failure
Schema.decodeUnknownSync(schema)("a")
/*
throws:
ParseError: (string <-> a string at least 2 character(s) long)
└─ Type side transformation failure
   └─ a string at least 2 character(s) long
      └─ Predicate refinement failure
         └─ Expected a string at least 2 character(s) long, actual "a"
*/
```

## Custom Error Messages

You can define custom error messages for different parts of your schema using the `message` annotation. This allows for more context-specific feedback.

### MessageAnnotation Type

```ts
type MessageAnnotation = (issue: ParseIssue) =>
  | string
  | Effect<string>
  | {
      readonly message: string | Effect<string>
      readonly override: boolean
    }
```

| Return Type                            | Description                                                                                                                                                                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `string`                               | Provides a static message that describes the error.                                                                                                                                                                                                 |
| `Effect<string>`                       | Utilizes dynamic messages that can incorporate results from synchronous processes or rely on optional dependencies.                                                                                                                                  |
| Object (with `message` and `override`) | Allows you to define a specific error message along with a boolean flag (`override`). This flag determines if the custom message should supersede any default or nested custom messages. |

**Example**

```ts
import { Schema } from "effect"

const MyString = Schema.String.annotations({
  message: () => "my custom message"
})

Schema.decodeUnknownSync(MyString)(null)
/*
throws:
ParseError: my custom message
*/
```

### General Guidelines for Messages

1. If no custom messages are set, the default message related to the innermost schema where the operation failed is used.
2. If custom messages are set, the message corresponding to the first failed schema is used, starting from the innermost schema to the outermost. If the failing schema does not have a custom message, the default message is used.
3. You can override guideline 2 by setting the `overwrite` flag to `true`, allowing the custom message to take precedence.

### Scalar Schemas

```ts
import { Schema } from "effect"

const MyString = Schema.String.annotations({
  message: () => "my custom message"
})

const decode = Schema.decodeUnknownSync(MyString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message) // "my custom message"
}
```

### Refinements

```ts
import { Schema } from "effect"

const MyString = Schema.String.pipe(
  Schema.minLength(1),
  Schema.maxLength(2)
).annotations({
  message: () => "my custom message"
})

const decode = Schema.decodeUnknownSync(MyString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message)
  /*
  a string at most 2 character(s) long
  └─ From side refinement failure
    └─ a string at least 1 character(s) long
        └─ From side refinement failure
          └─ Expected string, actual null
  */
}

try {
  decode("")
} catch (e: any) {
  console.log(e.message)
  /*
  a string at most 2 character(s) long
  └─ From side refinement failure
    └─ a string at least 1 character(s) long
        └─ Predicate refinement failure
          └─ Expected a string at least 1 character(s) long, actual ""
  */
}

try {
  decode("abc")
} catch (e: any) {
  console.log(e.message)
  // "my custom message"
}
```

### Multiple Override Messages

```ts
import { Schema } from "effect"

const MyString = Schema.String
  .annotations({ message: () => "String custom message" })
  .pipe(
    Schema.minLength(1, { message: () => "minLength custom message" }),
    Schema.maxLength(2, { message: () => "maxLength custom message" })
  )

const decode = Schema.decodeUnknownSync(MyString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message) // String custom message
}

try {
  decode("") 
} catch (e: any) {
  console.log(e.message) // minLength custom message
}

try {
  decode("abc") 
} catch (e: any) {
  console.log(e.message) // maxLength custom message
}
```

### Transformations

```ts
import { ParseResult, Schema } from "effect"

const IntFromString = Schema.transformOrFail(
  Schema.String.annotations({ message: () => "please enter a string" }),
  Schema.Int.annotations({ message: () => "please enter an integer" }),
  {
    strict: true,
    decode: (s, _, ast) => {
      const n = Number(s)
      return Number.isNaN(n)
        ? ParseResult.fail(new ParseResult.Type(ast, s))
        : ParseResult.succeed(n)
    },
    encode: (n) => ParseResult.succeed(String(n))
  }
).annotations({ message: () => "please enter a parseable string" })

const decode = Schema.decodeUnknownSync(IntFromString)

try {
  decode(null)
} catch (e: any) {
  console.log(e.message) // please enter a string
}

try {
  decode("1.2")
} catch (e: any) {
  console.log(e.message) // please enter an integer
}

try {
  decode("not a number")
} catch (e: any) {
  console.log(e.message) // please enter a parseable string
}
```

### Compound Schemas

```ts
import { Schema } from "effect"
import { pipe } from "effect"

const schema = Schema.Struct({
  outcomes: pipe(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        text: pipe(
          Schema.String.annotations({
            message: () => "error_invalid_outcome_type"
          }),
          Schema.minLength(1, { message: () => "error_required_field" }),
          Schema.maxLength(50, { message: () => "error_max_length_field" })
        )
      })
    ),
    Schema.minItems(1, { message: () => "error_min_length_field" })
  )
})

Schema.decodeUnknownSync(schema, { errors: "all" })({
  outcomes: []
})
/*
throws
ParseError: { readonly outcomes: an array of at least 1 items }
└─ ["outcomes"]
   └─ error_min_length_field
*/
```

### Effectful Messages

```ts
import { Context, Effect, Either, Option, Schema, ParseResult } from "effect"

class Messages extends Context.Tag("Messages")<
  Messages,
  {
    NonEmpty: string
  }
>() {}

const Name = Schema.NonEmptyString.annotations({
  message: () =>
    Effect.gen(function* (_) {
      const service = yield* _(Effect.serviceOption(Messages))
      return Option.match(service, {
        onNone: () => "Invalid string",
        onSome: (messages) => messages.NonEmpty
      })
    })
})

Schema.decodeUnknownSync(Name)("")
/*
throws:
ParseError: Invalid string
*/
```

### Missing Messages

You can provide custom messages for missing fields or elements using the `missingMessage` annotation.

**Example: Missing Property**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.propertySignature(Schema.String).annotations({
    missingMessage: () => "Name is required"
  })
})

Schema.decodeUnknownSync(Person)({})
/*
throws:
ParseError: { readonly name: string }
└─ ["name"]
   └─ Name is required
*/
```

**Example: Missing Element**

```ts
import { Schema } from "effect"

const Point = Schema.Tuple(
  Schema.element(Schema.Number).annotations({
    missingMessage: () => "X coordinate is required"
  }),
  Schema.element(Schema.Number).annotations({
    missingMessage: () => "Y coordinate is required"
  })
)

Schema.decodeUnknownSync(Point)([], { errors: "all" })
/*
throws:
ParseError: readonly [number, number]
├─ [0]
│  └─ X coordinate is required
└─ [1]
   └─ Y coordinate is required
*/
```