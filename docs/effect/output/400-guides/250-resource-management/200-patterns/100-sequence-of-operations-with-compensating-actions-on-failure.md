# Sequence of Operations with Compensating Actions on Failure

In certain scenarios, you might need to perform a sequence of chained operations where the success of each operation depends on the previous one. However, if any of the operations fail, you would want to reverse the effects of all previous successful operations. This pattern is valuable when you need to ensure that either all operations succeed, or none of them have any effect at all.

Effect offers a way to achieve this pattern using the Effect.acquireRelease function in combination with the Exit type. The Effect.acquireRelease function allows you to acquire a resource, perform operations with it, and release the resource when you're done. The Exit type represents the outcome of an effectful computation, indicating whether it succeeded or failed.

Let's go through an example of implementing this pattern. Suppose we want to create a "Workspace" in our application, which involves creating an S3 bucket, an ElasticSearch index, and a Database entry that relies on the previous two.

To begin, we define the domain model for the required services: S3, ElasticSearch, and Database.

```typescript
import { Effect, Context } from "effect"

export class S3Error {
  readonly _tag = "S3Error"
}

export interface Bucket {
  readonly name: string
}

export class S3 extends Context.Tag("S3")<
  S3,
  {
    readonly createBucket: Effect.Effect<Bucket, S3Error>
    readonly deleteBucket: (bucket: Bucket) => Effect.Effect<void>
  }
>() {}

export class ElasticSearchError {
  readonly _tag = "ElasticSearchError"
}

export interface Index {
  readonly id: string
}

export class ElasticSearch extends Context.Tag("ElasticSearch")<
  ElasticSearch,
  {
    readonly createIndex: Effect.Effect<Index, ElasticSearchError>
    readonly deleteIndex: (index: Index) => Effect.Effect<void>
  }
>() {}

export class DatabaseError {
  readonly _tag = "DatabaseError"
}

export interface Entry {
  readonly id: string
}

export class Database extends Context.Tag("Database")<
  Database,
  {
    readonly createEntry: (
      bucket: Bucket,
      index: Index
    ) => Effect.Effect<Entry, DatabaseError>
    readonly deleteEntry: (entry: Entry) => Effect.Effect<void>
  }
>() {}
```

Next, we define the three create actions and the overall transaction (`make`) for the Workspace.

```typescript
import { Effect, Exit } from "effect"
import * as Services from "./Services"

// Create a bucket, and define the release function that deletes the bucket if the operation fails.
const createBucket = Effect.gen(function* () {
  const { createBucket, deleteBucket } = yield* Services.S3
  return yield* Effect.acquireRelease(createBucket, (bucket, exit) =>
    Exit.isFailure(exit) ? deleteBucket(bucket) : Effect.void
  )
})

// Create an index, and define the release function that deletes the index if the operation fails.
const createIndex = Effect.gen(function* () {
  const { createIndex, deleteIndex } = yield* Services.ElasticSearch
  return yield* Effect.acquireRelease(createIndex, (index, exit) =>
    Exit.isFailure(exit) ? deleteIndex(index) : Effect.void
  )
})

// Create an entry in the database, and define the release function that deletes the entry if the operation fails.
const createEntry = (bucket: Services.Bucket, index: Services.Index) =>
  Effect.gen(function* () {
    const { createEntry, deleteEntry } = yield* Services.Database
    return yield* Effect.acquireRelease(
      createEntry(bucket, index),
      (entry, exit) =>
        Exit.isFailure(exit) ? deleteEntry(entry) : Effect.void
    )
  })

export const make = Effect.scoped(
  Effect.gen(function* () {
    const bucket = yield* createBucket
    const index = yield* createIndex
    return yield* createEntry(bucket, index)
  })
)
```

We then create simple service implementations to test the behavior of our Workspace code. To achieve this, we will utilize layers to construct test services. These layers will be able to handle various scenarios, including errors, which we can control using the `FailureCase` type.

```typescript
import { Effect, Context, Layer, Console } from "effect"
import * as Services from "./Services"
import * as Workspace from "./Workspace"

type FailureCaseLiterals = "S3" | "ElasticSearch" | "Database" | undefined

class FailureCase extends Context.Tag("FailureCase")<
  FailureCase,
  FailureCaseLiterals
>() {}

const S3Test = Layer.effect(
  Services.S3,
  Effect.gen(function* () {
    const failureCase = yield* FailureCase
    return {
      createBucket: Effect.gen(function* () {
        console.log("[S3] creating bucket")
        if (failureCase === "S3") {
          return yield* Effect.fail(new Services.S3Error())
        } else {
          return { name: "<bucket.name>" }
        }
      }),
      deleteBucket: (bucket) =>
        Console.log(`[S3] delete bucket ${bucket.name}`)
    }
  })
)

const ElasticSearchTest = Layer.effect(
  Services.ElasticSearch,
  Effect.gen(function* () {
    const failureCase = yield* FailureCase
    return {
      createIndex: Effect.gen(function* () {
        console.log("[ElasticSearch] creating index")
        if (failureCase === "ElasticSearch") {
          return yield* Effect.fail(new Services.ElasticSearchError())
        } else {
          return { id: "<index.id>" }
        }
      }),
      deleteIndex: (index) =>
        Console.log(`[ElasticSearch] delete index ${index.id}`)
    }
  })
)

const DatabaseTest = Layer.effect(
  Services.Database,
  Effect.gen(function* () {
    const failureCase = yield* FailureCase
    return {
      createEntry: (bucket, index) =>
        Effect.gen(function* () {
          console.log(
            `[Database] creating entry for bucket ${bucket.name} and index ${index.id}`
          )
          if (failureCase === "Database") {
            return yield* Effect.fail(new Services.DatabaseError())
          } else {
            return { id: "<entry.id>" }
          }
        }),
      deleteEntry: (entry) =>
        Console.log(`[Database] delete entry ${entry.id}`)
    }
  })
)

const layer = Layer.mergeAll(S3Test, ElasticSearchTest, DatabaseTest)

const runnable = Workspace.make.pipe(
  Effect.provide(layer),
  Effect.provideService(FailureCase, undefined)
)

Effect.runPromise(Effect.either(runnable)).then(console.log)
```

In this case, all operations succeed, and we see a successful result with `right({ id: '<entry.id>' })`.

Now, let's simulate a failure in the `Database`:

```typescript
const runnable = Workspace.make.pipe(
  Effect.provide(layer),
  Effect.provideService(FailureCase, "Database")
)
```

The console output will show the rollback actions taken due to the failure.

You can observe that once the `Database` error occurs, there is a complete rollback that deletes the `ElasticSearch` index first and then the associated `S3` bucket. The result is a failure with `left(new DatabaseError())`.

Let's now make the index creation fail instead:

```typescript
const runnable = Workspace.make.pipe(
  Effect.provide(layer),
  Effect.provideService(FailureCase, "ElasticSearch")
)
```

In this case, the console output will show the rollback actions taken due to the failure.

As expected, once the `ElasticSearch` index creation fails, there is a rollback that deletes the `S3` bucket. The result is a failure with `left(new ElasticSearchError())`.