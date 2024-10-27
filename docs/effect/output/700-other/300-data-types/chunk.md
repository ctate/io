---
title: Chunk
excerpt: Explore the benefits of using `Chunk`, an immutable and high-performance array-like data structure in JavaScript. Learn about its advantages, including immutability for concurrent programming and specialized operations for efficient array manipulations. Discover operations like creating, concatenating, dropping elements, comparing for equality, and converting to a `ReadonlyArray`.
bottomNavigation: pagination
---

A `Chunk<A>` represents a chunk of values of type `A`. Chunks are usually backed by arrays but expose a purely functional, safe interface to the underlying elements, becoming lazy on costly operations like repeated concatenation. Like lists and arrays, `Chunk` is an ordered collection.

**Warning**: `Chunk` is purpose-built to amortize the cost of repeated concatenation of arrays. Therefore, for use-cases that do not involve repeated concatenation, the overhead of `Chunk` will result in reduced performance.

## Why Chunk?

- **Immutability**: JavaScript lacks a built-in immutable data type for arrays. While `Array` is mutable, `Chunk` is an immutable array-like structure, ensuring data remains unchanged, which is beneficial for concurrent programming.

- **High Performance**: `Chunk` offers high performance with specialized operations for common array manipulations, such as appending a single element or concatenating two `Chunk`s, which are faster than operations on regular JavaScript arrays.

## Operations

### Creating

To create an empty `Chunk`:

```ts
import { Chunk } from "effect"

const emptyChunk = Chunk.empty()
```

To create a `Chunk` with specific values:

```ts
import { Chunk } from "effect"

const nonEmptyChunk = Chunk.make(1, 2, 3)
```

To create a `Chunk` from a collection of values:

- From a generic `Iterable`:

  ```ts
  import { Chunk, List } from "effect"

  const fromArray = Chunk.fromIterable([1, 2, 3])
  const fromList = Chunk.fromIterable(List.make(1, 2, 3))
  ```

- From an `Array`:

  ```ts
  import { Chunk } from "effect"

  const fromUnsafeArray = Chunk.unsafeFromArray([1, 2, 3])
  ```

`Chunk.fromIterable` clones the iterable, which can be expensive for large iterables. `unsafeFromArray` does not clone, offering performance benefits but potentially leading to unsafe behavior if the input array is mutated.

**Warning**: Using `unsafeFromArray` can lead to unsafe behavior if the input array is mutated after conversion. For safety, use `fromIterable`.

### Concatenating

To concatenate two Chunks:

```ts
import { Chunk } from "effect"

const concatenatedChunk = Chunk.appendAll(
  Chunk.make(1, 2),
  Chunk.make("a", "b")
)

console.log(concatenatedChunk)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, "a", "b" ]
}
*/
```

### Dropping

To drop elements from the beginning of a `Chunk`:

```ts
import { Chunk } from "effect"

const droppedChunk = Chunk.drop(Chunk.make(1, 2, 3, 4), 2)
```

### Comparing

To compare two `Chunk`s for equality:

```ts
import { Chunk, Equal } from "effect"

const chunk1 = Chunk.make(1, 2)
const chunk2 = Chunk.make(1, 2, 3)

const areEqual = Equal.equals(chunk1, chunk2)
```

### Converting

To convert a `Chunk` to a `ReadonlyArray`:

```ts
import { Chunk } from "effect"

const readonlyArray = Chunk.toReadonlyArray(Chunk.make(1, 2, 3))
```