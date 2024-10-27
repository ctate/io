# Dual APIs

Explore "data-last" and "data-first" variants of dual APIs in the Effect ecosystem, illustrated with the example of `Effect.map`. Learn how to choose between them based on your coding style and readability preferences.

When working with APIs in the Effect ecosystem, you may encounter two different ways to use the same API, known as "data-last" and "data-first" variants. When an API supports both variants, they are referred to as "dual" APIs.

## Example: Effect.map

The `Effect.map` function is defined with two TypeScript overloads. The terms "data-last" and "data-first" refer to the position of the `self` argument (the "data") in the signatures of the two overloads:

```ts
export declare const map: {
  // data-last
  <A, B>(f: (a: A) => B): <E, R>(self: Effect<A, E, R>) => Effect<B, E, R>
  // data-first
  <A, E, R, B>(self: Effect<A, E, R>, f: (a: A) => B): Effect<B, E, R>
}
```

### data-last

In the first overload, the `self` argument is in the **last position**:

```ts
<A, B>(f: (a: A) => B): <E, R>(self: Effect<A, E, R>) => Effect<B, E, R>
```

This variant is used with `pipe`. You pass the `Effect` as the first argument to the `pipe` function, followed by a call to `Effect.andThen`:

```ts
const mappedEffect = pipe(effect, Effect.andThen(func))
```

This variant is useful for chaining multiple computations in a long pipeline:

```ts
pipe(effect, Effect.andThen(func1), Effect.andThen(func2), ...)
```

### data-first

In the second overload, the `self` argument is in the **first position**:

```ts
<A, E, R, B>(self: Effect<A, E, R>, f: (a: A) => B): Effect<B, E, R>
```

This variant does not require the `pipe` function. You can directly pass the `Effect` as the first argument to the `Effect.andThen` function:

```ts
const mappedEffect = Effect.andThen(effect, func)
```

This variant is convenient for performing a single operation on the `Effect`.

### Choosing Between the Variants

Both overloads achieve the same result. They are two different ways of expressing the code. Choose the overload that best fits your coding style and enhances readability for you and your team.