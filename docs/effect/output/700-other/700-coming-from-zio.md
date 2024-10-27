# Coming From ZIO

If you are coming to Effect from ZIO, there are a few differences to be aware of.

## Environment

In Effect, the environment required to run an `Effect` workflow is represented as a union of services:

```ts
import { Effect } from "effect"

// `R` is a union of Console | Logger
type Http = Effect.Effect<Response, IOError | HttpError, Console | Logger>

type Response = Record<string, string>

interface IOError {
  readonly _tag: "IOError"
}

interface HttpError {
  readonly _tag: "HttpError"
}

interface Console {
  readonly log: (msg: string) => void
}

interface Logger {
  readonly log: (msg: string) => void
}
```

This differs from ZIO, where the environment is represented as an intersection of services:

```scala
type Http = ZIO[Console with Logger, IOError, Response]
```

## Rationale

The rationale for using a union to represent the environment in an `Effect` workflow is to eliminate `Has` as a wrapper for services in the environment, similar to ZIO 2.0.

To remove `Has` from Effect, we considered the structural nature of TypeScript. In TypeScript, a type `A & B` with structural conflicts reduces to `never`.

```ts
// @errors: 2322
export interface A {
  readonly prop: string
}

export interface B {
  readonly prop: number
}

const ab: A & B = {
  prop: ""
}
```

Previously, intersections were used for environments with multiple services, but conflicts in function and property names necessitated wrapping services in `Has`. In ZIO 2.0, the contravariant `R` type parameter became fully phantom, allowing for the removal of `Has`, improving type signature clarity.

To facilitate the removal of `Has` in Effect, we considered how types in the environment compose. Contravariant parameters composed as an intersection are equivalent to covariant parameters composed as a union for assignability. Thus, we made the `R` type parameter covariant, allowing for the representation of `R` as a union of services without reducing to `never`.

From our example:

```ts
export interface A {
  readonly prop: string
}

export interface B {
  readonly prop: number
}

const ab: A | B = {
  prop: ""
}
```

Representing `R` as a covariant type parameter containing the union of services allowed us to remove the requirement for `Has`.

## Type Aliases

In Effect, there are no predefined type aliases such as `UIO`, `URIO`, `RIO`, `Task`, or `IO` as in ZIO.

This decision stems from the fact that type aliases are lost upon composition, making them less useful unless multiple signatures are maintained for every function. Instead, Effect utilizes the `never` type to indicate unused types.

The perception that type aliases are quicker to understand is often misleading. In Effect, the explicit notation `Effect<A>` clearly indicates that only type `A` is being used, whereas a type alias like `RIO<R, A>` raises questions about the type `E`, complicating understanding.