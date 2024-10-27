# Introduction

Welcome to the documentation for `effect/Schema`, a module for defining and using schemas to validate and transform data in TypeScript.

`effect/Schema` allows you to define a `Schema<Type, Encoded, Context>` that provides a blueprint for describing the structure and data types of your data. Once defined, you can leverage this schema to perform a range of operations, including:

- **Decoding**: Transforming data from an input type `Encoded` to an output type `Type`.
- **Encoding**: Converting data from an output type `Type` back to an input type `Encoded`.
- **Asserting**: Verifying that a value adheres to the schema's output type `Type`.
- **Arbitraries**: Generate arbitraries for fast-check testing.
- **JSON Schemas**: Create JSON Schemas based on defined schemas.
- **Equivalence**: Create Equivalences based on defined schemas.
- **Pretty printing**: Support pretty printing for data structures.

## The Schema Type

The `Schema<Type, Encoded, Context>` type represents an immutable value that describes the structure of your data.

The `Schema` type has three type parameters:

- **Type**: Represents the type of value that a schema can succeed with during decoding.
- **Encoded**: Represents the type of value that a schema can succeed with during encoding. By default, it's equal to `Type` if not explicitly provided.
- **Context**: Represents the contextual data required by the schema to execute both decoding and encoding. If this type parameter is `never`, it means the schema has no requirements.

**Examples**:

- `Schema<string>` represents a schema that decodes to `string`, encodes to `string`, and has no requirements.
- `Schema<number, string>` represents a schema that decodes to `number` from `string`, encodes a `number` to a `string`, and has no requirements.

`Schema` values are immutable, and all `effect/Schema` functions produce new `Schema` values. They do not perform any actions themselves; they simply describe the structure of your data.

## Understanding Decoding and Encoding

Decoding and encoding are processes used to transform data between formats.

**Encoding**: Changing a `Date` into a `string`.

**Decoding**: Transforming a `string` back into a `Date`.

**Decoding From Unknown**:
1. **Checking**: Verify that the input data matches the expected structure (e.g., ensuring the input is a `string`).
2. **Decoding**: Convert the `string` into a `Date`.

**Encoding From Unknown**:
1. **Checking**: Verify that the input data matches the expected structure (e.g., ensuring the input is a `Date`).
2. **Encoding**: Convert the `Date` into a `string`.

Schemas should be defined such that encode + decode return the original value.

## The Rule of Schemas: Keeping Encode and Decode in Sync

Your schemas should be crafted so that encoding and decoding operations yield the original value. This ensures data consistency throughout the process.

## Requirements

- TypeScript **5.0** or newer
- The `strict` flag enabled in your `tsconfig.json`
- The `exactOptionalPropertyTypes` flag enabled in your `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Additionally, install the `effect` package, as it's a peer dependency.

## Understanding exactOptionalPropertyTypes

The `effect/Schema` module utilizes the `exactOptionalPropertyTypes` option in `tsconfig.json`, affecting how optional properties are typed.

**With exactOptionalPropertyTypes Enabled**:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true
  })
})
```

Here, the type of `name` is strict (`string`), catching invalid assignments.

**With exactOptionalPropertyTypes Disabled**:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.optionalWith(Schema.String.pipe(Schema.nonEmptyString()), {
    exact: true
  })
})
```

In this case, the type of `name` is widened to `string | undefined`, leading to potential runtime errors during decoding.