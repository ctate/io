---
title: Projections
excerpt: The `effect/Schema` module facilitates the extraction of `Type` or `Encoded` portions from schemas, streamlining the creation of new schemas based on old specifications.

Occasionally, you may need to derive a new schema from an existing one, specifically targeting either its `Type` or `Encoded` portion. The `effect/Schema` module provides several APIs to support this functionality.

## typeSchema

The `Schema.typeSchema` function allows you to extract the `Type` portion of a schema, creating a new schema that conforms to the properties defined in the original schema without considering the initial encoding or transformation processes.

**Function Signature**

```ts
declare const typeSchema: <A, I, R>(schema: Schema<A, I, R>) => Schema<A>
```

**Example**

```ts
import { Schema } from "effect"

const original = Schema.Struct({
  foo: Schema.NumberFromString.pipe(Schema.greaterThanOrEqualTo(2))
})

const resultingTypeSchema = Schema.typeSchema(original)
```

In this example:

- **Original Schema**: The schema for `foo` accepts a number from a string and enforces that it is greater than or equal to 2.
- **Resulting Type Schema**: The `Schema.typeSchema` function extracts only the type-related information from `foo`, simplifying it to just a number while maintaining the constraint.

## encodedSchema

The `Schema.encodedSchema` function allows you to extract the `Encoded` portion of a schema, creating a new schema that conforms to the properties defined in the original schema without retaining any refinements or transformations that were applied previously.

**Function Signature**

```ts
declare const encodedSchema: <A, I, R>(schema: Schema<A, I, R>) => Schema<I>
```

**Example**

```ts
import { Schema } from "effect"

const original = Schema.Struct({
  foo: Schema.String.pipe(Schema.minLength(3))
})

const resultingEncodedSchema = Schema.encodedSchema(original)
```

In this example:

- **Original Schema Definition**: The `foo` field is defined as a string with a minimum length of three characters.
- **Resulting Encoded Schema**: The `encodedSchema` function simplifies the `foo` field to just a string type, stripping away the `minLength` refinement.

## encodedBoundSchema

The `Schema.encodedBoundSchema` function is similar to `Schema.encodedSchema` but preserves the refinements up to the first transformation point in the original schema.

**Function Signature**

```ts
declare const encodedBoundSchema: <A, I, R>(
  schema: Schema<A, I, R>
) => Schema<I>
```

The term "bound" refers to the boundary up to which refinements are preserved when extracting the encoded form of a schema.

**Example**

```ts
import { Schema } from "effect"

const original = Schema.Struct({
  foo: Schema.String.pipe(Schema.minLength(3), Schema.compose(Schema.Trim))
})

const resultingEncodedBoundSchema = Schema.encodedBoundSchema(original)
```

In this example:

- **Initial Schema**: The schema for `foo` includes a refinement for a minimum length of three characters and a transformation to trim the string.
- **Resulting Schema**: `resultingEncodedBoundSchema` maintains the `Schema.minLength(3)` condition while excluding the trimming transformation, focusing solely on the length requirement.