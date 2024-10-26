---
title: KeyValueStore
excerpt: Storing and retrieving key-value pairs
bottomNavigation: pagination
---

The `@effect/platform/KeyValueStore` module provides a robust and effectful interface for managing key-value pairs. It supports asynchronous operations, ensuring data integrity and consistency, and includes built-in implementations for in-memory, file system-based, and schema-validated stores.

## Basic Usage

The module provides a single `KeyValueStore` tag, which acts as the gateway for interacting with the store.

```ts
import { KeyValueStore } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const kv = yield* KeyValueStore

  // use `kv` to operate on the store
})
```

The `KeyValueStore` interface includes the following operations:

- **get**: Returns the value as `string` of the specified key if it exists.
- **getUint8Array**: Returns the value as `Uint8Array` of the specified key if it exists.
- **set**: Sets the value of the specified key.
- **remove**: Removes the specified key.
- **clear**: Removes all entries.
- **size**: Returns the number of entries.
- **modify**: Updates the value of the specified key if it exists.
- **modifyUint8Array**: Updates the value of the specified key if it exists.
- **has**: Check if a key exists.
- **isEmpty**: Check if the store is empty.
- **forSchema**: Create a SchemaStore for the specified schema.

**Example**

```ts
import { KeyValueStore, layerMemory } from "@effect/platform/KeyValueStore"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const kv = yield* KeyValueStore
  console.log(yield* kv.size)
  // Output: 0

  yield* kv.set("key", "value")
  console.log(yield* kv.size)
  // Output: 1

  const value = yield* kv.get("key")
  console.log(value)
  // Output: { _id: 'Option', _tag: 'Some', value: 'value' }

  yield* kv.remove("key")
  console.log(yield* kv.size)
  // Output: 0
})

Effect.runPromise(program.pipe(Effect.provide(layerMemory)))
```

## Built-in Implementations

The module provides several built-in implementations of the `KeyValueStore` interface, available as layers, to suit different needs:

- **In-Memory Store**: `layerMemory` provides a simple, in-memory key-value store, ideal for lightweight or testing scenarios.
- **File System Store**: `layerFileSystem` offers a file-based store for persistent storage needs.
- **Schema Store**: `layerSchema` enables schema-based validation for stored values, ensuring data integrity and type safety.

## SchemaStore

The `SchemaStore` interface allows you to validate and parse values according to a defined schema. This ensures that all data stored in the key-value store adheres to the specified structure, enhancing data integrity and type safety.

**Example**

```ts
import { KeyValueStore, layerMemory } from "@effect/platform/KeyValueStore"
import { Schema } from "effect"
import { Effect } from "effect"

// Define a schema for the values
const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number
})

const program = Effect.gen(function* () {
  const kv = (yield* KeyValueStore).forSchema(Person)

  // Create a value that adheres to the schema
  const value = { name: "Alice", age: 30 }
  yield* kv.set("user1", value)
  console.log(yield* kv.size)
  // Output: 1

  // Retrieve the value
  console.log(yield* kv.get("user1"))
  // Output: { _id: 'Option', _tag: 'Some', value: { name: 'Alice', age: 30 } }
})

Effect.runPromise(program.pipe(Effect.provide(layerMemory)))
```