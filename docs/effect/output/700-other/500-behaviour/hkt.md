# Higher-Kinded Types

Higher-Kinded Types (HKTs) are a valuable concept in programming that can simplify code and enhance flexibility. They allow the creation of generic structures that can work with various data types, promoting code reuse and maintainability.

## What Are Higher-Kinded Types?

A higher-kinded type abstracts over another type, enabling the creation of generic structures adaptable to different data types. This facilitates the implementation of similar functionality across various data structures, such as arrays, chunks, and options.

### The Need for HKTs

Consider the following functions that share similarities but operate on different data types:

```ts
import { Chunk, Option } from "effect"

declare const mapArray: <A, B>(self: Array<A>, f: (a: A) => B) => Array<B>
declare const mapChunk: <A, B>(self: Chunk.Chunk<A>, f: (a: A) => B) => Chunk.Chunk<B>
declare const mapOption: <A, B>(self: Option.Option<A>, f: (a: A) => B) => Option.Option<B>
```

These functions are nearly identical, differing only in the data type they operate on. A common interface could enhance code organization and maintainability.

### The Ideal Solution

An ideal interface could be defined as follows:

```ts
interface Mappable<F<~>> {
  readonly map: <A, B>(self: F<A>, f: (a: A) => B) => F<B>
}
```

This allows for the following declarations:

```ts
declare const mapArray: Mappable<Array>["map"]
declare const mapChunk: Mappable<Chunk>["map"]
declare const mapOption: Mappable<Option>["map"]
```

Instances of this interface can be defined for different data types:

```ts
declare const ArrayMappable: Mappable<Array>
declare const ChunkMappable: Mappable<Chunk>
declare const OptionMappable: Mappable<Option>
```

Generic functions like `stringify` can also be created:

```ts
const stringify =
  <F>(T: Mappable<F>) =>
  (self: F<number>): F<string> =>
    T.map(self, (n) => `number: ${n}`)
```

Usage example:

```ts
const stringifiedArray: Array<string> = stringify(ArrayMappable)([0, 1, 2])
```

### A Brief Terminology

- `F<~>`: Higher-kinded type.
- `Mappable<F<~>>`: Type class.
- `ArrayMappable`: Instance of the `Mappable` type class.

## Type Lambdas

Type Lambdas define type-level functions in TypeScript, allowing the expression of Higher-Kinded Types directly.

### Implementing a Type Lambda

Define a base interface:

```ts
export interface TypeLambda {
  readonly Target: unknown
}
```

### Creating a Type Lambda

For the `Array` data type:

```ts
export interface ArrayTypeLambda extends TypeLambda {
  readonly type: Array<this["Target"]>
}
```

### Applying the Type Lambda

The `Kind` operator applies a Type Lambda to a concrete type:

```ts
export type Kind<F extends TypeLambda, Target> = F extends {
  readonly type: unknown
}
  ? (F & { readonly Target: Target })["type"]
  : { readonly F: F; readonly Target: (_: Target) => Target }
```

Example usage:

```ts
type Test1 = Kind<ArrayTypeLambda, string>
type Test2 = Kind<ArrayTypeLambda, number>
```

Define Type Lambdas for `Chunk` and `Option`:

```ts
export interface ChunkTypeLambda extends TypeLambda {
  readonly type: Chunk.Chunk<this["Target"]>
}

export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option.Option<this["Target"]>
}
```

## Type Classes

Define the `Mappable` type class:

```ts
export interface Mappable<F extends TypeLambda> {
  readonly map: <A, B>(self: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}
```

## Instances

Create instances for specific data types:

```ts
export const MappableArray: Mappable<ArrayTypeLambda> = {
  map: (self, f) => self.map(f)
}

export const MappableChunk: Mappable<ChunkTypeLambda> = {
  map: Chunk.map
}

export const MappableOption: Mappable<OptionTypeLambda> = {
  map: Option.map
}
```

Define the `stringify` function:

```ts
export const stringify =
  <F extends TypeLambda>(TC: Mappable<F>) =>
  (self: Kind<F, number>): Kind<F, string> =>
    TC.map(self, (n) => `number: ${n}`)
```

## Enhancements

To accommodate data types with multiple parameters, such as `Either<A, E>` or `Effect<A, E, R>`, we define additional type parameters:

```ts
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
}
  ? (F & { readonly In: In; readonly Out2: Out2; readonly Out1: Out1; readonly Target: Target })["type"]
  : { readonly F: F; readonly In: (_: In) => void; readonly Out2: () => Out2; readonly Out1: () => Out1; readonly Target: (_: Target) => Target }
```

## Variance

The second branch of the conditional type in `Kind` enforces variance, ensuring type parameters align correctly. For example, defining a `Zippable` type class:

```ts
export interface Zippable<F extends TypeLambda> extends TypeClass<F> {
  readonly zip: <R1, O1, E1, A, R2, O2, E2, B>(
    first: Kind<F, R1, O1, E1, A>,
    second: Kind<F, R2, O2, E2, B>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>
}
```

Define an instance of `Zippable` for the `Either` type:

```ts
export const EitherZippable: Zippable<EitherTypeLambda> = {
  zip: (first, second) => {
    if (Either.isLeft(first)) {
      return Either.left(first.left)
    }
    if (Either.isLeft(second)) {
      return Either.left(second.left)
    }
    return Either.right([first.right, second.right])
  }
}
```