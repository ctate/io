# Introduction

The Cache module optimizes application performance by caching values, preventing redundant work in scenarios with overlapping tasks.

## Key Features of Cache

- **Compositionality**: Supports overlapping work while adhering to compositional programming principles.
- **Unification of Synchronous and Asynchronous Caches**: A unified lookup function allows for both synchronous and asynchronous value computation.
- **Deep Effect Integration**: Works natively with the Effect library, supporting concurrent lookups, failure handling, and interruption.
- **Caching Policy**: Determines when values are removed from the cache, consisting of:
  - **Priority (Optional Removal)**: Order of potential value removal when space is low.
  - **Evict (Mandatory Removal)**: Specifies when values must be removed due to invalidity.
- **Composition Caching Policy**: Enables complex caching policies using simpler ones.
- **Cache/Entry Statistics**: Tracks metrics like entries, hits, and misses for performance assessment.

## How to Define a Cache

A cache is defined by a lookup function that computes the value associated with a key if not already cached.

```ts
export type Lookup<Key, Value, Error = never, Environment = never> = (
  key: Key
) => Effect.Effect<Value, Error, Environment>
```

The lookup function returns an `Effect` that can fail or succeed, describing both synchronous and asynchronous workflows.

To construct a cache, use a lookup function, maximum size, and time to live:

```ts
export declare const make: <
  Key,
  Value,
  Error = never,
  Environment = never
>(options: {
  readonly capacity: number
  readonly timeToLive: Duration.DurationInput
  readonly lookup: Lookup<Key, Value, Error, Environment>
}) => Effect.Effect<Cache<Key, Value, Error>, never, Environment>
```

The `get` operator retrieves the current value or computes a new one, ensuring that concurrent requests for the same value are handled efficiently.

### Example

```ts twoslash
import { Effect, Cache, Duration } from "effect"

const timeConsumingEffect = (key: string) =>
  Effect.sleep("2 seconds").pipe(Effect.as(key.length))

const program = Effect.gen(function* () {
  const cache = yield* Cache.make({
    capacity: 100,
    timeToLive: Duration.infinity,
    lookup: timeConsumingEffect
  })
  const result = yield* cache
    .get("key1")
    .pipe(
      Effect.zip(cache.get("key1"), { concurrent: true }),
      Effect.zip(cache.get("key1"), { concurrent: true })
    )
  console.log(
    `Result of parallel execution of three effects with the same key: ${result}`
  )

  const hits = yield* cache.cacheStats.pipe(Effect.map((_) => _.hits))
  const misses = yield* cache.cacheStats.pipe(Effect.map((_) => _.misses))
  console.log(`Number of cache hits: ${hits}`)
  console.log(`Number of cache misses: ${misses}`)
})

Effect.runPromise(program)
/*
Output:
Result of parallel execution of three effects with the same key: 4,4,4
Number of cache hits: 2
Number of cache misses: 1
*/
```

## Concurrent Access

The cache supports safe and efficient concurrent access. If multiple processes request the same value, it is computed once and shared. Errors during lookup are propagated to all waiting processes, and failed values are cached to avoid repeated computation.

## Capacity

A cache has a specified capacity, removing the least recently accessed values when full. The size may slightly exceed the specified capacity between operations.

## Time To Live (TTL)

Values older than the TTL are not returned, with age calculated from when the value was cached.

## Operators

Cache provides several operators:

- **refresh**: Triggers re-computation of a value without invalidating it.
- **size**: Returns the current size of the cache (approximate under concurrent access).
- **contains**: Checks if a value exists for a specified key (valid at check time).
- **invalidate**: Evicts the value for a specified key.
- **invalidateAll**: Evicts all values in the cache.