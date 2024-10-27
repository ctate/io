# Default Constructors

When working with data structures, it's advantageous to construct values that align with a specific schema effortlessly. For this purpose, we offer **default constructors** for several types of schemas, including `Structs`, `Records`, `filters`, and `brands`.

**Warning**: Default constructors linked to a schema `Schema<A, I, R>` specifically relate to the `A` type rather than the `I` type.

## Structs

**Example**

```ts
import { Schema } from "effect"

const Struct = Schema.Struct({
  name: Schema.NonEmptyString
})

// Successful creation
Struct.make({ name: "a" })

// This will cause an error because the name is empty
Struct.make({ name: "" })
/*
throws
ParseError: { readonly name: NonEmptyString }
└─ ["name"]
   └─ NonEmptyString
      └─ Predicate refinement failure
         └─ Expected NonEmptyString, actual ""
*/
```

To bypass validation during instantiation:

```ts
import { Schema } from "effect"

const Struct = Schema.Struct({
  name: Schema.NonEmptyString
})

// Bypasses validation
Struct.make({ name: "" }, true)

// or more explicitly
Struct.make({ name: "" }, { disableValidation: true })
```

## Records

**Example**

```ts
import { Schema } from "effect"

const Record = Schema.Record({
  key: Schema.String,
  value: Schema.NonEmptyString
})

// Successful creation
Record.make({ a: "a", b: "b" })

// This will cause an error because 'b' is empty
Record.make({ a: "a", b: "" })
/*
throws
ParseError: { readonly [x: string]: NonEmptyString }
└─ ["b"]
   └─ NonEmptyString
      └─ Predicate refinement failure
         └─ Expected NonEmptyString, actual ""
*/

// Bypasses validation
Record.make({ a: "a", b: "" }, { disableValidation: true })
```

## Filters

**Example**

```ts
import { Schema } from "effect"

const MyNumber = Schema.Number.pipe(Schema.between(1, 10))

// Successful creation
const n = MyNumber.make(5)

// This will cause an error because the number is outside the valid range
MyNumber.make(20)
/*
throws
ParseError: a number between 1 and 10
└─ Predicate refinement failure
   └─ Expected a number between 1 and 10, actual 20
*/

// Bypasses validation
MyNumber.make(20, { disableValidation: true })
```

## Branded Types

**Example**

```ts
import { Schema } from "effect"

const BrandedNumberSchema = Schema.Number.pipe(
  Schema.between(1, 10),
  Schema.brand("MyNumber")
)

// Successful creation
const n = BrandedNumberSchema.make(5)

// This will cause an error because the number is outside the valid range
BrandedNumberSchema.make(20)
/*
throws
ParseError: a number between 1 and 10 & Brand<"MyNumber">
└─ Predicate refinement failure
   └─ Expected a number between 1 and 10 & Brand<"MyNumber">, actual 20
*/

// Bypasses validation
BrandedNumberSchema.make(20, { disableValidation: true })
```

When utilizing default constructors, it's important to grasp the type of value they generate. In the `BrandedNumberSchema` example, the return type of the constructor is `number & Brand<"MyNumber">`, indicating that the resulting value is a number with the added branding "MyNumber". This differs from the filter example where the return type is simply `number`.

Default constructors are "unsafe" in the sense that if the input does not conform to the schema, the constructor throws an error containing a description of what is wrong. To have a "safe" constructor, you can use `Schema.validateEither`:

```ts
import { Schema } from "effect"

const MyNumber = Schema.Number.pipe(Schema.between(1, 10))

const ctor = Schema.validateEither(MyNumber)

console.log(ctor(5))
/*
{ _id: 'Either', _tag: 'Right', right: 5 }
*/

console.log(ctor(20))
/*
{
  _id: 'Either',
  _tag: 'Left',
  left: {
    _id: 'ParseError',
    message: 'a number between 1 and 10\n' +
      '└─ Predicate refinement failure\n' +
      '   └─ Expected a number between 1 and 10, actual 20'
  }
}
*/
```

## Setting Default Values

The `Schema.withConstructorDefault` function allows you to manage the optionality of a field in your default constructor.

**Example: Without Default**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number
})

// Both name and age are required
Person.make({ name: "John", age: 30 })
```

**Example: With Default**

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  )
})

// The age field is optional and defaults to 0
console.log(Person.make({ name: "John" }))
/*
Output:
{ age: 0, name: 'John' }
*/
```

Defaults are **lazily evaluated**, meaning that a new instance of the default is generated every time the constructor is called:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  ),
  timestamp: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => new Date().getTime())
  )
})

console.log(Person.make({ name: "name1" }))
// { age: 0, timestamp: 1714232909221, name: 'name1' }

console.log(Person.make({ name: "name2" }))
// { age: 0, timestamp: 1714232909227, name: 'name2' }
```

Default values are also "portable", meaning that if you reuse the same property signature in another schema, the default is carried over:

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  ),
  timestamp: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => new Date().getTime())
  )
})

const AnotherSchema = Schema.Struct({
  foo: Schema.String,
  age: Person.fields.age
})

console.log(AnotherSchema.make({ foo: "bar" })) // => { foo: 'bar', age: 0 }
```

Defaults can also be applied using the `Class` API:

```ts
import { Schema } from "effect"

class Person extends Schema.Class<Person>("Person")({
  name: Schema.NonEmptyString,
  age: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => 0)
  ),
  timestamp: Schema.Number.pipe(
    Schema.propertySignature,
    Schema.withConstructorDefault(() => new Date().getTime())
  )
}) {}

console.log(new Person({ name: "name1" }))
// Person { age: 0, timestamp: 1714400867208, name: 'name1' }

console.log(new Person({ name: "name2" }))
// Person { age: 0, timestamp: 1714400867215, name: 'name2' }
```