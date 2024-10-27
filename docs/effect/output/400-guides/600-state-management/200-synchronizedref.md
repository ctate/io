# Introduction

`SynchronizedRef<A>` serves as a mutable reference to a value of type `A`. With it, we can store immutable data and perform updates atomically and effectfully.

Most of the operations for `SynchronizedRef` are similar to those of `Ref`. If you're not already familiar with `Ref`, it's recommended to read about the Ref concept first.

The distinctive function in `SynchronizedRef` is `updateEffect`. This function takes an effectful operation and executes it to modify the shared state. This is the key feature setting `SynchronizedRef` apart from `Ref`.

```ts
import { Effect, SynchronizedRef } from "effect"

const program = Effect.gen(function* () {
  const ref = yield* SynchronizedRef.make("current")
  const updateEffect = Effect.succeed("update")
  yield* SynchronizedRef.updateEffect(ref, () => updateEffect)
  const value = yield* SynchronizedRef.get(ref)
  return value
})

Effect.runPromise(program).then(console.log)
/*
Output:
update
*/
```

In real-world applications, there are scenarios where we need to execute an effect (e.g., querying a database) and then update the shared state accordingly. This is where `SynchronizedRef` shines, allowing us to update shared state in an actor-model fashion. We have a shared mutable state, but for each distinct command or message, we want to execute our effect and update the state.

We can pass an effectful program into every single update. All of these updates will be performed in parallel, but the results will be sequenced in such a way that they only affect the state at different times, resulting in a consistent state at the end.

In the following example, we send a `getAge` request for each user, updating the state accordingly:

```ts
import { Effect, SynchronizedRef } from "effect"

// Simulate API
const getAge = (userId: number) =>
  Effect.succeed({ userId, age: userId * 10 })

const users = [1, 2, 3, 4]

const meanAge = Effect.gen(function* () {
  const ref = yield* SynchronizedRef.make(0)

  const log = <R, E, A>(label: string, effect: Effect.Effect<A, E, R>) =>
    Effect.gen(function* () {
      const value = yield* SynchronizedRef.get(ref)
      yield* Effect.log(`${label} get: ${value}`)
      return yield* effect
    })

  const task = (id: number) =>
    log(
      `task ${id}`,
      SynchronizedRef.updateEffect(ref, (sumOfAges) =>
        Effect.gen(function* () {
          const user = yield* getAge(id)
          return sumOfAges + user.age
        })
      )
    )

  yield* task(1).pipe(
    Effect.zip(task(2), { concurrent: true }),
    Effect.zip(task(3), { concurrent: true }),
    Effect.zip(task(4), { concurrent: true })
  )

  const value = yield* SynchronizedRef.get(ref)
  return value / users.length
})

Effect.runPromise(meanAge).then(console.log)
/*
Output:
... fiber=#1 message="task 4 get: 0"
... fiber=#2 message="task 3 get: 40"
... fiber=#3 message="task 1 get: 70"
... fiber=#4 message="task 2 get: 80"
25
*/
```