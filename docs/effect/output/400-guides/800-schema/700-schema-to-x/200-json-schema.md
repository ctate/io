# JSON Schema

## Generating JSON Schemas

The `JSONSchema.make` function generates a JSON Schema from a predefined schema.

**Example**

Define a schema for a "Person" with properties "name" (string) and "age" (number):

```ts
import { JSONSchema, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "additionalProperties": false
}
```

The `JSONSchema.make` function traverses the schema from the most nested component, incorporating each refinement, and stops at the first transformation encountered.

**Modification Example**

Modify the schema of the `age` field:

```ts
import { JSONSchema, Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number.pipe(
    Schema.int(),
    Schema.clamp(1, 10)
  )
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "description": "an integer",
      "title": "integer"
    }
  },
  "additionalProperties": false
}
```

## Specific Outputs for Schema Types

### Literals

Literals are transformed into `enum` types within JSON Schema.

**Single literal**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Literal("a")

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "enum": [
    "a"
  ]
}
```

**Union of literals**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Literal("a", "b")

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "enum": [
    "a",
    "b"
  ]
}
```

### Void

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Void

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/void",
  "title": "void"
}
```

### Any

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Any

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/any",
  "title": "any"
}
```

### Unknown

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Unknown

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/unknown",
  "title": "unknown"
}
```

### Object

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Object

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "/schemas/object",
  "anyOf": [
    {
      "type": "object"
    },
    {
      "type": "array"
    }
  ],
  "description": "an object in the TypeScript meaning, i.e. the `object` type",
  "title": "object"
}
```

### String

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.String

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string"
}
```

### Number

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Number

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "number"
}
```

### Boolean

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Boolean

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "boolean"
}
```

### Tuples

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Tuple(Schema.String, Schema.Number)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 2,
  "items": [
    {
      "type": "string"
    },
    {
      "type": "number"
    }
  ],
  "additionalItems": false
}
```

### Arrays

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Array(Schema.String)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

### Non Empty Arrays

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.String)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "array",
  "minItems": 1,
  "items": {
    "type": "string"
  }
}
```

### Structs

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "additionalProperties": false
}
```

### Records

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Record({
  key: Schema.String,
  value: Schema.Number
})

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [],
  "properties": {},
  "patternProperties": {
    "": {
      "type": "number"
    }
  }
}
```

### Mixed Structs with Records

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct(
  {
    name: Schema.String,
    age: Schema.Number
  },
  Schema.Record({
    key: Schema.String,
    value: Schema.Union(Schema.String, Schema.Number)
  })
)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "patternProperties": {
    "": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        }
      ]
    }
  }
}
```

### Enums

```ts
import { JSONSchema, Schema } from "effect"

enum Fruits {
  Apple,
  Banana
}

const schema = Schema.Enums(Fruits)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$comment": "/schemas/enums",
  "anyOf": [
    {
      "title": "Apple",
      "enum": [
        0
      ]
    },
    {
      "title": "Banana",
      "enum": [
        1
      ]
    }
  ]
}
```

### Template Literals

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.TemplateLiteral(Schema.Literal("a"), Schema.Number)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string",
  "description": "a template literal",
  "pattern": "^a[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$"
}
```

### Unions

Unions are expressed using `anyOf` or `enum`, depending on the types involved.

**Generic Union**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Union(Schema.String, Schema.Number)

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "anyOf": [
    {
      "type": "string"
    },
    {
      "type": "number"
    }
  ]
}
```

**Union of literals**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Literal("a", "b")

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "enum": [
    "a",
    "b"
  ]
}
```

## Identifier Annotations

Augment schemas with `identifier` annotations for better structure and maintainability. Annotated schemas are included within a "$defs" object property.

```ts
import { JSONSchema, Schema } from "effect"

const Name = Schema.String.annotations({ identifier: "Name" })
const Age = Schema.Number.annotations({ identifier: "Age" })
const Person = Schema.Struct({
  name: Name,
  age: Age
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "name",
    "age"
  ],
  "properties": {
    "name": {
      "$ref": "#/$defs/Name"
    },
    "age": {
      "$ref": "#/$defs/Age"
    }
  },
  "additionalProperties": false,
  "$defs": {
    "Name": {
      "type": "string",
      "description": "a string",
      "title": "string"
    },
    "Age": {
      "type": "number",
      "description": "a number",
      "title": "number"
    }
  }
}
```

## Standard JSON Schema Annotations

Standard annotations like `title`, `description`, `default`, and `examples` enrich schemas with metadata.

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.String.annotations({
  description: "my custom description",
  title: "my custom title",
  default: "",
  examples: ["a", "b"]
})

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string",
  "description": "my custom description",
  "title": "my custom title",
  "examples": [
    "a",
    "b"
  ],
  "default": ""
}
```

### Adding annotations to Struct properties

Add annotations directly to property signatures for clarity.

```ts
import { JSONSchema, Schema } from "effect"

const Person = Schema.Struct({
  firstName: Schema.propertySignature(Schema.String).annotations({
    title: "First name"
  }),
  lastName: Schema.propertySignature(Schema.String).annotations({
    title: "Last Name"
  })
})

const jsonSchema = JSONSchema.make(Person)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last Name"
    }
  },
  "additionalProperties": false
}
```

## Recursive and Mutually Recursive Schemas

Use identifier annotations for recursive schemas to ensure correct references.

```ts
import { JSONSchema, Schema } from "effect"

interface Category {
  readonly name: string
  readonly categories: ReadonlyArray<Category>
}

const Category = Schema.Struct({
  name: Schema.String,
  categories: Schema.Array(
    Schema.suspend((): Schema.Schema<Category> => Category)
  )
}).annotations({ identifier: "Category" })

const jsonSchema = JSONSchema.make(Category)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/$defs/Category",
  "$defs": {
    "Category": {
      "type": "object",
      "required": [
        "name",
        "categories"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "categories": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Category"
          }
        }
      },
      "additionalProperties": false
    }
  }
}
```

## Custom JSON Schema Annotations

Enhance schemas with custom annotations for unsupported data types.

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct({
  a_bigint_field: Schema.BigIntFromSelf
})

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

This will throw an error due to missing annotation.

To address this, add a custom annotation:

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.Struct({
  a_bigint_field: Schema.BigIntFromSelf.annotations({
    jsonSchema: {
      type: "some custom way to represent a bigint in JSON Schema"
    }
  })
})

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "a_bigint_field"
  ],
  "properties": {
    "a_bigint_field": {
      "type": "some custom way to represent a bigint in JSON Schema"
    }
  },
  "additionalProperties": false
}
```

### Refinements

Attach a JSON Schema annotation to refinements.

```ts
import { JSONSchema, Schema } from "effect"

const Positive = Schema.Number.pipe(
  Schema.filter((n) => n > 0, {
    jsonSchema: { minimum: 0 }
  })
)

const schema = Positive.pipe(
  Schema.filter((n) => n <= 10, {
    jsonSchema: { maximum: 10 }
  })
)

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "number",
  "minimum": 0,
  "maximum": 10
}
```

## Specialized JSON Schema Generation with Schema.parseJson

Using `Schema.parseJson`, JSON Schema generation is specialized.

**Example**

```ts
import { JSONSchema, Schema } from "effect"

const schema = Schema.parseJson(
  Schema.Struct({
    a: Schema.parseJson(Schema.NumberFromString)
  })
)

const jsonSchema = JSONSchema.make(schema)

console.log(JSON.stringify(jsonSchema, null, 2))
```

Output:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "a"
  ],
  "properties": {
    "a": {
      "type": "string"
    }
  },
  "additionalProperties": false
}
```