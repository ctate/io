# Class APIs

When working with schemas, you can use the `Schema.Class` utility, which offers advantages for common use cases:

- **All-in-One Definition**: Define both a schema and an opaque type simultaneously.
- **Shared Functionality**: Incorporate shared functionality using class methods or getters.
- **Value Hashing and Equality**: Built-in capability for checking value equality and applying hashing.

## Definition

To define a `Class` with `effect/Schema`, provide:

- The type of the class.
- A unique identifier for the class.
- The desired fields.

**Example**

```ts
import { Schema } from "effect"

class Person extends Schema.Class<Person>("Person")({
  id: Schema.Number,
  name: Schema.NonEmptyString
}) {}
```

In this setup, `Person` is a class with `id` as a number and `name` as a non-empty string.

```ts
console.log(new Person({ id: 1, name: "John" }))
// Output: Person { id: 1, name: 'John' }

console.log(Person.make({ id: 1, name: "John" }))
// Output: Person { id: 1, name: 'John' }
```

### Classes Without Arguments

For schemas without fields, define a class with an empty object:

```ts
class NoArgs extends Schema.Class<NoArgs>("NoArgs")({}) {}

const noargs1 = new NoArgs();
const noargs2 = new NoArgs({});
```

## Class Constructor as a Validator

The constructor checks that provided properties adhere to the schema's rules:

```ts
class Person extends Schema.Class<Person>("Person")({
  id: Schema.Number,
  name: Schema.NonEmptyString
}) {}

// Valid instance
const john = new Person({ id: 1, name: "John" });
```

Invalid properties throw an error:

```ts
new Person({ id: 1, name: "" }); // Throws ParseError
```

To bypass validation:

```ts
const john = new Person({ id: 1, name: "" }, true);
```

## Hashing and Equality

Instances support the `Equal` trait for easy comparison:

```ts
const john1 = new Person({ id: 1, name: "John" });
const john2 = new Person({ id: 1, name: "John" });

console.log(Equal.equals(john1, john2)); // Output: true
```

For arrays, use `Schema.Data` with `Data.array` for deep equality:

```ts
const john1 = new Person({
  id: 1,
  name: "John",
  hobbies: Data.array(["reading", "coding"])
});
const john2 = new Person({
  id: 1,
  name: "John",
  hobbies: Data.array(["reading", "coding"])
});

console.log(Equal.equals(john1, john2)); // Output: true
```

## Custom Getters and Methods

Enhance schema classes with custom getters and methods:

```ts
class Person extends Schema.Class<Person>("Person")({
  id: Schema.Number,
  name: Schema.NonEmptyString
}) {
  get upperName() {
    return this.name.toUpperCase();
  }
}

const john = new Person({ id: 1, name: "John" });
console.log(john.upperName); // Output: "JOHN"
```

## Using Classes as Schemas

Classes can be used wherever a schema is expected:

```ts
const Persons = Schema.Array(Person);
```

### The fields Property

Access the `fields` static property for defined fields:

```ts
Person.fields;
```

## Annotations and Transformations

Classes implicitly form a schema transformation from a structured type to a class type.

### Adding Annotations

1. **To the Struct Schema**:

```ts
class Person extends Schema.Class<Person>("Person")(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.NonEmptyString
  }).annotations({ identifier: "From" })
) {}
```

2. **To the Class Schema**:

```ts
class Person extends Schema.Class<Person>("Person")(
  {
    id: Schema.Number,
    name: Schema.NonEmptyString
  },
  { identifier: "To" }
) {}
```

## Recursive Schemas

Use `Schema.suspend` for recursive data structures:

```ts
class Category extends Schema.Class<Category>("Category")({
  name: Schema.String,
  subcategories: Schema.Array(
    Schema.suspend((): Schema.Schema<Category> => Category)
  )
}) {}
```

### Mutually Recursive Schemas

Example of two mutually recursive schemas:

```ts
class Expression extends Schema.Class<Expression>("Expression")({
  type: Schema.Literal("expression"),
  value: Schema.Union(
    Schema.Number,
    Schema.suspend((): Schema.Schema<Operation> => Operation)
  )
}) {}

class Operation extends Schema.Class<Operation>("Operation")({
  type: Schema.Literal("operation"),
  operator: Schema.Literal("+", "-"),
  left: Expression,
  right: Expression
}) {}
```

### Recursive Types with Different Encoded and Type

Define an interface for the `Encoded` type:

```ts
interface CategoryEncoded {
  readonly id: string;
  readonly name: string;
  readonly subcategories: ReadonlyArray<CategoryEncoded>;
}

class Category extends Schema.Class<Category>("Category")({
  id: Schema.NumberFromString,
  name: Schema.String,
  subcategories: Schema.Array(
    Schema.suspend((): Schema.Schema<Category, CategoryEncoded> => Category)
  )
}) {}
```

## Tagged Class Variants

Create classes that extend `TaggedClass` and `TaggedError`:

```ts
class TaggedPerson extends Schema.TaggedClass<TaggedPerson>()(
  "TaggedPerson",
  {
    name: Schema.String
  }
) {}

class HttpError extends Schema.TaggedError<HttpError>()("HttpError", {
  status: Schema.Number
}) {}
```

## Extending Existing Classes

Use the `extend` utility to augment existing classes:

```ts
class PersonWithAge extends Person.extend<PersonWithAge>("PersonWithAge")({
  age: Schema.Number
}) {
  get isAdult() {
    return this.age >= 18;
  }
}
```

## Transformations

Enhance a class with transformations:

```ts
export class PersonWithTransform extends Person.transformOrFail<PersonWithTransform>(
  "PersonWithTransform"
)(
  {
    age: Schema.optionalWith(Schema.Number, { exact: true, as: "Option" })
  },
  {
    decode: (input) =>
      Effect.mapBoth(getAge(input.id), {
        onFailure: (e) =>
          new ParseResult.Type(Schema.String.ast, input.id, e.message),
        onSuccess: (age) => ({ ...input, age: Option.some(age) })
      }),
    encode: ParseResult.succeed
  }
) {}
```

Choose between `transformOrFail` and `transformOrFailFrom` based on when you want the transformation to occur.