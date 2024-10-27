# Equal

The Equal module provides a solution for value-based equality checks, addressing issues with JavaScript's native reference-based equality operators. Developers can define custom equality checks, ensuring data integrity and promoting predictable behavior. To implement custom equality, developers can either implement the `Equal` interface or leverage the simpler solution offered by the Data module, which automatically generates default implementations for both `Equal` and `Hash`. This module also explores working with collections like `HashSet` and `HashMap` to handle value-based equality checks effectively.

## Overview

The Equal module allows developers to define and check for equality between two values in TypeScript.

### Key Features

1. **Value-Based Equality**: JavaScript's native equality operators (`===` and `==`) check for equality by reference. The Equal module allows developers to define custom equality checks based on the values of objects.

2. **Custom Equality**: Developers can implement custom equality checks for their data types and classes by implementing the `Equal` interface.

3. **Data Integrity**: Value-based equality checks help maintain data integrity by preventing identical data from being duplicated within collections.

4. **Predictable Behavior**: The module promotes predictable behavior when comparing objects by explicitly defining equality criteria.

## How to Perform Equality Checking

In Effect, it is advisable to stop using JavaScript's `===` and `==` operators and instead rely on the `Equal.equals` function. This function works with any data type that implements the `Equal` trait, such as Option, Either, HashSet, and HashMap.

When using `Equal.equals`, if the objects do not implement the `Equal` trait, it defaults to using the `===` operator for comparison:

```typescript
import { Equal } from "effect"

const a = { name: "Alice", age: 30 }
const b = { name: "Alice", age: 30 }

console.log(Equal.equals(a, b)) // Output: false
```

### Custom Equality Implementation

To create custom equality behavior, implement the `Equal` interface in your models. This interface extends the `Hash` interface from the Hash module.

Example of implementing the `Equal` interface for a `Person` class:

```typescript
import { Equal, Hash } from "effect"

export class Person implements Equal.Equal {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly age: number
  ) {}

  [Equal.symbol](that: Equal.Equal): boolean {
    if (that instanceof Person) {
      return (
        Equal.equals(this.id, that.id) &&
        Equal.equals(this.name, that.name) &&
        Equal.equals(this.age, that.age)
      )
    }
    return false
  }

  [Hash.symbol](): number {
    return Hash.hash(this.id)
  }
}
```

Once implemented, you can use `Equal.equals` to check for equality:

```typescript
import { Equal } from "effect"
import { Person } from "./Person"

const alice = new Person(1, "Alice", 30)
console.log(Equal.equals(alice, new Person(1, "Alice", 30))) // Output: true
const bob = new Person(2, "Bob", 40)
console.log(Equal.equals(alice, bob)) // Output: false
```

### Simplifying Equality with the Data Module

For straightforward value equality checks, the Data module provides a simpler solution by automatically generating default implementations for both `Equal` and `Hash`.

Example using the Data module:

```typescript
import { Equal, Data } from "effect"

const alice = Data.struct({ name: "Alice", age: 30 })
const bob = Data.struct({ name: "Bob", age: 40 })

console.log(Equal.equals(alice, alice)) // Output: true
console.log(Equal.equals(alice, Data.struct({ name: "Alice", age: 30 }))) // Output: true
console.log(Equal.equals(alice, bob)) // Output: false
```

## Working with Collections

JavaScript's built-in `Set` and `Map` check equality by reference, which can lead to unexpected results:

```typescript
const set = new Set()
set.add({ name: "Alice", age: 30 })
set.add({ name: "Alice", age: 30 })
console.log(set.size) // Output: 2
```

To perform value-based equality checks, use the `Hash*` collection types from the effect package, such as HashSet and HashMap.

Example using HashSet:

```typescript
import { HashSet, Data } from "effect"

const set = HashSet.empty().pipe(
  HashSet.add(Data.struct({ name: "Alice", age: 30 })),
  HashSet.add(Data.struct({ name: "Alice", age: 30 }))
)

console.log(HashSet.size(set)) // Output: 1
```

Example using HashMap:

```typescript
import { HashMap, Data } from "effect"

const map = HashMap.empty().pipe(
  HashMap.set(Data.struct({ name: "Alice", age: 30 }), 1),
  HashMap.set(Data.struct({ name: "Alice", age: 30 }), 2)
)

console.log(HashMap.size(map)) // Output: 1
console.log(HashMap.get(map, Data.struct({ name: "Alice", age: 30 })))
```

In these examples, HashSet and HashMap correctly handle value-based equality checks, allowing for efficient data management.