---
title: Error Formatters
excerpt: Error Formatters
bottomNavigation: pagination
---

When working with Effect Schema and encountering errors during decoding or encoding functions, errors can be formatted using the `TreeFormatter` or the `ArrayFormatter`.

## TreeFormatter (default)

The `TreeFormatter` organizes errors in a tree structure, providing a clear hierarchy of issues.

Example:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person)

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.TreeFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
{ readonly name: string; readonly age: number }
└─ ["name"]
   └─ is missing
*/
```

### Customizing the Output

The default error message can be customized with annotations like `identifier`, `title`, or `description`.

Example:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
}).annotations({ title: "Person" })

const result = Schema.decodeUnknownEither(Person)({})
if (Either.isLeft(result)) {
  console.error(ParseResult.TreeFormatter.formatErrorSync(result.left))
}
/*
Person
└─ ["name"]
   └─ is missing
*/
```

### Handling Multiple Errors

To return all encountered errors, pass the `{ errors: "all" }` option:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person, { errors: "all" })

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.TreeFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
{ readonly name: string; readonly age: number }
├─ ["name"]
│  └─ is missing
└─ ["age"]
   └─ is missing
*/
```

### ParseIssueTitle Annotation

To provide additional details in error messages, use the `ParseIssueTitle` annotation.

Example:

```ts
import type { ParseResult } from "effect"
import { Schema } from "effect"

const getOrderItemId = ({ actual }: ParseResult.ParseIssue) => {
  if (Schema.is(Schema.Struct({ id: Schema.String }))(actual)) {
    return `OrderItem with id: ${actual.id}`
  }
}

const OrderItem = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  price: Schema.Number
}).annotations({
  identifier: "OrderItem",
  parseIssueTitle: getOrderItemId
})

const getOrderId = ({ actual }: ParseResult.ParseIssue) => {
  if (Schema.is(Schema.Struct({ id: Schema.Number }))(actual)) {
    return `Order with id: ${actual.id}`
  }
}

const Order = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  items: Schema.Array(OrderItem)
}).annotations({
  identifier: "Order",
  parseIssueTitle: getOrderId
})

const decode = Schema.decodeUnknownSync(Order, { errors: "all" })

decode({})
/*
throws
ParseError: Order
├─ ["id"]
│  └─ is missing
├─ ["name"]
│  └─ is missing
└─ ["items"]
   └─ is missing
*/

decode({ id: 1 })
/*
throws
ParseError: Order with id: 1
├─ ["name"]
│  └─ is missing
└─ ["items"]
   └─ is missing
*/

decode({ id: 1, items: [{ id: "22b", price: "100" }] })
/*
throws
ParseError: Order with id: 1
├─ ["name"]
│  └─ is missing
└─ ["items"]
   └─ ReadonlyArray<OrderItem>
      └─ [0]
         └─ OrderItem with id: 22b
            ├─ ["name"]
            │  └─ is missing
            └─ ["price"]
               └─ Expected a number, actual "100"
*/
```

## ArrayFormatter

The `ArrayFormatter` formats errors as an array of objects, each representing a distinct issue.

Example:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person)

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.ArrayFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
[ { _tag: 'Missing', path: [ 'name' ], message: 'is missing' } ]
*/
```

### Handling Multiple Errors

To return all encountered errors, pass the `{ errors: "all" }` option:

```ts
import { Either, Schema, ParseResult } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const decode = Schema.decodeUnknownEither(Person, { errors: "all" })

const result = decode({})
if (Either.isLeft(result)) {
  console.error("Decoding failed:")
  console.error(ParseResult.ArrayFormatter.formatErrorSync(result.left))
}
/*
Decoding failed:
[
  { _tag: 'Missing', path: [ 'name' ], message: 'is missing' },
  { _tag: 'Missing', path: [ 'age' ], message: 'is missing' }
]
*/
```

## React Hook Form

For React form validation, `@hookform/resolvers` offers an adapter for `effect/Schema`, allowing integration with React Hook Form for enhanced validation processes. For detailed instructions, visit the official npm package page: React Hook Form Resolvers.