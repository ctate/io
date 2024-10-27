---
title: Arbitrary
excerpt: Arbitrary
bottomNavigation: pagination
---

## Generating Arbitraries

The `Arbitrary.make` function creates random values that align with a specific `Schema<A, I, R>`. It returns an `Arbitrary<A>` from the fast-check library, useful for generating random test data adhering to defined schema constraints.

**Example**

```ts
import { Arbitrary, FastCheck, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.NumberFromString.pipe(Schema.int(), Schema.between(0, 200))
})

const PersonArbitraryType = Arbitrary.make(Person)

console.log(FastCheck.sample(PersonArbitraryType, 2))
/*
Example Output:
[ { name: 'q r', age: 1 }, { name: '&|', age: 133 } ]
*/
```

The entirety of fast-check's API is accessible via the `FastCheck` export, allowing direct use of all its functionalities within your projects.

## Transformations and Arbitrary Generation

Understanding how transformations and filters are considered within a schema is crucial for generating arbitrary data:

**Warning**: Filters applied before the last transformation in the transformation chain are not considered during the generation of arbitrary data.

**Illustrative Example**

```ts
import { Arbitrary, FastCheck, Schema } from "effect"

const schema1 = Schema.compose(Schema.NonEmptyString, Schema.Trim).pipe(
  Schema.maxLength(500)
)

console.log(FastCheck.sample(Arbitrary.make(schema1), 2))
/*
Example Output:
[ '', '"Ry' ]
*/

const schema2 = Schema.Trim.pipe(
  Schema.nonEmptyString(),
  Schema.maxLength(500)
)

console.log(FastCheck.sample(Arbitrary.make(schema2), 2))
/*
Example Output:
[ ']H+MPXgZKz', 'SNS|waP~\\' ]
*/
```

- **Schema 1**: Ignores `Schema.NonEmptyString` due to its position before transformations.
- **Schema 2**: Adheres to all filters because they are sequenced correctly after transformations.

### Best Practices

For effective data generation, organize transformations and filters methodically:

1. Filters for the initial type (`I`).
2. Transformations.
3. Filters for the transformed type (`A`).

This setup ensures precise and well-defined data processing.

**Illustrative Example**

Avoid mixing transformations and filters:

```ts
import { Schema } from "effect"

const schema = Schema.compose(Schema.Lowercase, Schema.Trim)
```

Prefer a structured approach:

```ts
import { Schema } from "effect"

const schema = Schema.transform(
  Schema.String,
  Schema.String.pipe(Schema.trimmed(), Schema.lowercased()),
  {
    strict: true,
    decode: (s) => s.trim().toLowerCase(),
    encode: (s) => s
  }
)
```

## Customizing Arbitrary Data Generation

Define how arbitrary data is generated using the `arbitrary` annotation in your schema definitions.

**Example**

```ts
import { Schema } from "effect"

const schema = Schema.Number.annotations({
  arbitrary: (/**typeParameters**/) => (fc) => fc.nat()
})
```

The annotation allows access to type parameters via the first argument and the fast-check library export. This setup enables returning an `Arbitrary` that generates the desired data type.

**Warning**: Customizing a schema can disrupt previously applied filters. Filters set after customization will remain effective, while those applied before will be disregarded.

**Illustrative Example**

```ts
import { Arbitrary, FastCheck, Schema } from "effect"

const problematic = Schema.Number.pipe(Schema.positive()).annotations({
  arbitrary: () => (fc) => fc.integer()
})

console.log(FastCheck.sample(Arbitrary.make(problematic), 2))
/*
Example Output:
[ -1600163302, -6 ]
*/

const improved = Schema.Number.annotations({
  arbitrary: () => (fc) => fc.integer()
}).pipe(Schema.positive())

console.log(FastCheck.sample(Arbitrary.make(improved), 2))
/*
Example Output:
[ 7, 1518247613 ]
*/
```