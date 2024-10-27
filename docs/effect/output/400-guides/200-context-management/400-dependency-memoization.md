# Layer Memoization

Layer memoization allows a layer to be created once and used multiple times in the dependency graph. If the same layer is used twice, for example:

```
Layer.merge(Layer.provide(b, a), Layer.provide(c, a))
```

then the `a` layer will be allocated only once.

**Warning:** Layers are memoized using **reference equality**. Therefore, if you have a layer that is created by calling a function like `f()`, you should _only_ call that `f` once and re-use the resulting layer to ensure you are always using the same instance.

## Memoization When Providing Globally

In an Effect application, layers are shared by default. This means that if the same layer is used twice and provided globally, it will only be allocated a single time. For every layer in the dependency graph, there is only one instance shared between all layers that depend on it.

For example, consider the services `A`, `B`, and `C`, where both `B` and `C` depend on `A`:

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

class B extends Context.Tag("B")<B, { readonly b: string }>() {}

class C extends Context.Tag("C")<C, { readonly c: boolean }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const b = Layer.effect(
  B,
  Effect.gen(function* () {
    const { a } = yield* A
    return { b: String(a) }
  })
)

const c = Layer.effect(
  C,
  Effect.gen(function* () {
    const { a } = yield* A
    return { c: a > 0 }
  })
)

const program = Effect.gen(function* () {
  yield* B
  yield* C
})

const runnable = Effect.provide(
  program,
  Layer.merge(Layer.provide(b, a), Layer.provide(c, a))
)

Effect.runPromise(runnable)
/*
Output:
timestamp=... level=INFO fiber=#2 message=initialized
*/
```

Although both `b` and `c` layers require the `a` layer, the `a` layer is instantiated only once and shared with both `b` and `c`.

## Acquiring a Fresh Version

To create a fresh, non-shared version of a module, use `Layer.fresh`.

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

class B extends Context.Tag("B")<B, { readonly b: string }>() {}

class C extends Context.Tag("C")<C, { readonly c: boolean }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const b = Layer.effect(
  B,
  Effect.gen(function* () {
    const { a } = yield* A
    return { b: String(a) }
  })
)

const c = Layer.effect(
  C,
  Effect.gen(function* () {
    const { a } = yield* A
    return { c: a > 0 }
  })
)

const program = Effect.gen(function* () {
  yield* B
  yield* C
})

// ---cut---
const runnable = Effect.provide(
  program,
  Layer.merge(
    Layer.provide(b, Layer.fresh(a)),
    Layer.provide(c, Layer.fresh(a))
  )
)

Effect.runPromise(runnable)
/*
Output:
timestamp=... level=INFO fiber=#2 message=initialized
timestamp=... level=INFO fiber=#3 message=initialized
*/
```

## No Memoization When Providing Locally

When providing a layer locally, it does not support memoization by default. In the following example, the `a` layer is provided twice locally, resulting in two initializations:

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const program = Effect.gen(function* () {
  yield* Effect.provide(A, a)
  yield* Effect.provide(A, a)
})

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=initialized
timestamp=... level=INFO fiber=#0 message=initialized
*/
```

## Manual Memoization

You can manually memoize the `a` layer using the `Layer.memoize` operator, which returns a scoped effect that, when evaluated, returns the lazily computed result of this layer:

```ts
import { Effect, Context, Layer } from "effect"

class A extends Context.Tag("A")<A, { readonly a: number }>() {}

const a = Layer.effect(
  A,
  Effect.succeed({ a: 5 }).pipe(Effect.tap(() => Effect.log("initialized")))
)

const program = Effect.scoped(
  Layer.memoize(a).pipe(
    Effect.andThen((memoized) =>
      Effect.gen(function* () {
        yield* Effect.provide(A, memoized)
        yield* Effect.provide(A, memoized)
      })
    )
  )
)

Effect.runPromise(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=initialized
*/