---
title: Pretty
excerpt: Pretty
bottomNavigation: pagination
---

## Generating Pretty Printers

The `Pretty.make` function creates pretty printers that output a formatted string representation of values according to a given schema.

**Example**

```ts
import { Pretty, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const PersonPretty = Pretty.make(Person)

// returns a string representation of the object
console.log(PersonPretty({ name: "Alice", age: 30 }))
/*
Output:
'{ "name": "Alice", "age": 30 }'
*/
```

## Customizing Pretty Printer Generation

You can customize the output of the pretty printer using the `pretty` annotation within your schema definitions.

**Example**

```ts
import { Pretty, Schema } from "effect"

const schema = Schema.Number.annotations({
  pretty: (/**typeParameters**/) => (value) => `my format: ${value}`
})

console.log(Pretty.make(schema)(1)) // my format: 1
```

In this setup, the `pretty` annotation formats the value into a string.