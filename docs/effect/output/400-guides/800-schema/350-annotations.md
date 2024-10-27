# Annotations

One of the fundamental requirements in the design of `effect/Schema` is that it is extensible and customizable. Customizations are achieved through "annotations". Each node contained in the AST of `effect/SchemaAST` contains an `annotations: Record<symbol, unknown>` field that can be used to attach additional information to the schema. You can manage these annotations using the `annotations` method or the `Schema.annotations` API.

## Example of Using Annotations

```ts
import { Schema } from "effect"

const Password =
  Schema.String
    .annotations({ message: () => "not a string" })
    .pipe(
      Schema.nonEmptyString({ message: () => "required" }),
      Schema.maxLength(10, { message: (s) => `${s.actual} is too long` })
    )
    .annotations({
      identifier: "Password",
      title: "password",
      description: "A password is a string of characters used to verify the identity of a user during the authentication process",
      examples: ["1Ki77y", "jelly22fi$h"],
      documentation: `jsDoc documentation...`
    })
```

This example demonstrates the use of built-in annotations to add metadata like error messages, identifiers, and descriptions to enhance the schema's functionality and documentation.

## Built-in Annotations

- **identifier**: Assigns a unique identifier to the schema, ideal for TypeScript identifiers and code generation purposes. Commonly used in tools like TreeFormatter to clarify output. Examples include `"Person"`, `"Product"`.
- **title**: Sets a short, descriptive title for the schema, similar to a JSON Schema title. Useful for documentation or UI headings. It is also used by TreeFormatter to enhance readability of error messages.
- **description**: Provides a detailed explanation about the schema's purpose, akin to a JSON Schema description. Used by TreeFormatter to provide more detailed error messages.
- **documentation**: Extends detailed documentation for the schema, beneficial for developers or automated documentation generation.
- **examples**: Lists examples of valid schema values, akin to the examples attribute in JSON Schema, useful for documentation and validation testing.
- **default**: Defines a default value for the schema, similar to the default attribute in JSON Schema, to ensure schemas are pre-populated where applicable.
- **message**: Customizes the error message for validation failures, improving clarity in outputs from tools like TreeFormatter and ArrayFormatter during decoding or validation errors.
- **jsonSchema**: Specifies annotations that affect the generation of JSON Schema documents, customizing how schemas are represented.
- **arbitrary**: Configures settings for generating Arbitrary test data.
- **pretty**: Configures settings for generating Pretty output.
- **equivalence**: Configures settings for evaluating data Equivalence.
- **concurrency**: Controls concurrency behavior, ensuring schemas perform optimally under concurrent operations.
- **batching**: Manages settings for batching operations to enhance performance when operations can be grouped.
- **parseIssueTitle**: Provides a custom title for parsing issues, enhancing error descriptions in outputs from TreeFormatter.
- **parseOptions**: Allows overriding of parsing options at the schema level, offering granular control over parsing behaviors.
- **decodingFallback**: Provides a way to define custom fallback behaviors that trigger when decoding operations fail.

## Concurrency Annotation

For complex schemas like `Struct`, `Array`, or `Union` that contain multiple nested schemas, the `concurrency` annotation provides a way to manage how validations are executed concurrently:

```ts
import { Schema } from "effect"
import type { Duration } from "effect"
import { Effect } from "effect"

const item = (id: number, duration: Duration.DurationInput) =>
  Schema.String.pipe(
    Schema.filterEffect(() =>
      Effect.gen(function* () {
        yield* Effect.sleep(duration)
        console.log(`Task ${id} done`)
        return true
      })
    )
  )
```

**Sequential Execution**

```ts
const Sequential = Schema.Tuple(
  item(1, "30 millis"),
  item(2, "10 millis"),
  item(3, "20 millis")
)

Effect.runPromise(Schema.decode(Sequential)(["a", "b", "c"]))
```

**Concurrent Execution**

```ts
const Concurrent = Schema.Tuple(
  item(1, "30 millis"),
  item(2, "10 millis"),
  item(3, "20 millis")
).annotations({ concurrency: "unbounded" })

Effect.runPromise(Schema.decode(Concurrent)(["a", "b", "c"]))
```

This configuration allows developers to specify whether validations within a schema should be processed sequentially or concurrently, offering flexibility based on the performance needs and the dependencies between validations.

## Handling Decoding Errors with Fallbacks

The `DecodingFallbackAnnotation` provides a way to handle decoding errors gracefully in your schemas.

```ts
type DecodingFallbackAnnotation<A> = (
  issue: ParseIssue
) => Effect<A, ParseIssue>
```

By using this annotation, you can define custom fallback behaviors that trigger when decoding operations fail.

**Example Usage**

```ts
import { Schema } from "effect"
import { Effect, Either } from "effect"

const schema = Schema.String.annotations({
  decodingFallback: () => Either.right("<fallback>")
})

console.log(Schema.decodeUnknownSync(schema)("valid input"))
console.log(Schema.decodeUnknownSync(schema)(null))
```

**Advanced Fallback with Logging**

```ts
const schemaWithLog = Schema.String.annotations({
  decodingFallback: (issue) =>
    Effect.gen(function* () {
      yield* Effect.log(issue._tag)
      yield* Effect.sleep(10)
      return yield* Effect.succeed("<fallback2>")
    })
})

Effect.runPromise(Schema.decodeUnknown(schemaWithLog)(null)).then(console.log)
```

## Custom Annotations

You can also define your own custom annotations for specific needs. Here's how you can create a `deprecated` annotation:

```ts
import { Schema } from "effect"

const DeprecatedId = Symbol.for(
  "some/unique/identifier/for/your/custom/annotation"
)

const schema = Schema.String.annotations({ [DeprecatedId]: true })

console.log(schema)
```

Annotations can be read using the `AST.getAnnotation` helper:

```ts
import { Option, Schema, SchemaAST } from "effect"

const DeprecatedId = Symbol.for(
  "some/unique/identifier/for/your/custom/annotation"
)

const schema = Schema.String.annotations({ [DeprecatedId]: true })

const isDeprecated = <A, I, R>(schema: Schema.Schema<A, I, R>): boolean =>
  SchemaAST.getAnnotation<boolean>(DeprecatedId)(schema.ast).pipe(
    Option.getOrElse(() => false)
  )

console.log(isDeprecated(Schema.String)) // Output: false
console.log(isDeprecated(schema)) // Output: true
```