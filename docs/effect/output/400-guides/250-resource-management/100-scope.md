# Introduction

In the context of developing long-lived applications, resource management plays a critical role. Effective resource management is indispensable when building large-scale applications. It's imperative that our application is resource-efficient and does not result in resource leaks.

Resource leaks, such as unclosed socket connections, database connections, or file descriptors, are unacceptable in web applications. Effect offers robust constructs to address this concern effectively.

To create an application that manages resources safely, we must ensure that every time we open a resource, we have a mechanism in place to close it. This applies whether we fully utilize the resource or encounter exceptions during its use.

In the following sections, we'll delve deeper into how Effect simplifies resource management and ensures resource safety in your applications.

## Scope

The `Scope` data type is fundamental for managing resources safely and in a composable manner in Effect.

In simple terms, a scope represents the lifetime of one or more resources. When a scope is closed, the resources associated with it are guaranteed to be released.

With the `Scope` data type, you can:

- **Add finalizers**, which represent the release of a resource.
- **Close** the scope, releasing all acquired resources and executing any added finalizers.

To grasp the concept better, let's delve into an example that demonstrates how it works. It's worth noting that in typical Effect usage, you won't often find yourself working with these low-level APIs for managing scopes.

```ts
import { Scope, Effect, Console, Exit } from "effect"

const program =
  Scope.make().pipe(
    Effect.tap((scope) =>
      Scope.addFinalizer(scope, Console.log("finalizer 1"))
    ),
    Effect.tap((scope) =>
      Scope.addFinalizer(scope, Console.log("finalizer 2"))
    ),
    Effect.andThen((scope) =>
      Scope.close(scope, Exit.succeed("scope closed successfully"))
    )
  )

Effect.runPromise(program)
/*
Output:
finalizer 2 <-- finalizers are closed in reverse order
finalizer 1
*/
```

By default, when a `Scope` is closed, all finalizers added to that `Scope` are executed in the reverse order in which they were added. This approach makes sense because releasing resources in the reverse order of acquisition ensures that resources are properly closed.

For instance, if you open a network connection and then access a file on a remote server, you must close the file before closing the network connection. This sequence is critical to maintaining the ability to interact with the remote server.

## addFinalizer

Now, let's dive into the `Effect.addFinalizer` function, which provides a higher-level API for adding finalizers to the scope of an `Effect` value. These finalizers are guaranteed to execute when the associated scope is closed, and their behavior may depend on the `Exit` value with which the scope is closed.

Let's explore some examples to understand this better.

Let's observe how things behave in the event of success:

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.addFinalizer((exit) =>
    Console.log(`finalizer after ${exit._tag}`)
  )
  return 1
})

const runnable = Effect.scoped(program)

Effect.runPromise(runnable).then(console.log, console.error)
/*
Output:
finalizer after Success
1
*/
```

```ts
import { Effect, Console } from "effect"

const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.andThen(Effect.succeed(1)))

const runnable = Effect.scoped(program)

Effect.runPromise(runnable).then(console.log, console.error)
/*
Output:
finalizer after Success
1
*/
```

Here, the `Effect.addFinalizer` operator adds a `Scope` to the context required by the workflow. This signifies that the workflow needs a `Scope` to execute. You can provide this `Scope` using the `Effect.scoped` operator. It creates a new `Scope`, supplies it to the workflow, and closes the `Scope` once the workflow is complete.

The `Effect.scoped` operator removes the `Scope` from the context, indicating that the workflow no longer requires any resources associated with a scope.

Next, let's explore how things behave in the event of a failure:

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.addFinalizer((exit) =>
    Console.log(`finalizer after ${exit._tag}`)
  )
  return yield* Effect.fail("Uh oh!")
})

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' }
}
*/
```

```ts
import { Effect, Console } from "effect"

const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.andThen(Effect.fail("Uh oh!")))

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  id: 'Exit',
  _tag: 'Failure',
  cause: { _id: 'Cause', _tag: 'Fail', failure: 'Uh oh!' }
}
*/
```

Finally, let's explore the behavior in the event of an interruption:

```ts
import { Effect, Console } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.addFinalizer((exit) =>
    Console.log(`finalizer after ${exit._tag}`)
  )
  return yield* Effect.interrupt
})

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Interrupt',
    fiberId: {
      _id: 'FiberId',
      _tag: 'Runtime',
      id: 0,
      startTimeMillis: ...
    }
  }
}
*/
```

```ts
import { Effect, Console } from "effect"

const program = Effect.addFinalizer((exit) =>
  Console.log(`finalizer after ${exit._tag}`)
).pipe(Effect.andThen(Effect.interrupt))

const runnable = Effect.scoped(program)

Effect.runPromiseExit(runnable).then(console.log)
/*
Output:
finalizer after Failure
{
  _id: 'Exit',
  _tag: 'Failure',
  cause: {
    _id: 'Cause',
    _tag: 'Interrupt',
    fiberId: {
      _id: 'FiberId',
      _tag: 'Runtime',
      id: 0,
      startTimeMillis: ...
    }
  }
}
*/
```

## Manually Create and Close Scopes

When you're working with multiple scoped resources within a single operation, it's important to understand how their scopes interact. By default, these scopes are merged into one, but you can have more fine-grained control over when each scope is closed by manually creating and closing them.

Let's start by looking at how scopes are merged by default. Take a look at this code example:

```ts
import { Effect, Console } from "effect"

const task1 = Effect.gen(function* () {
  console.log("task 1")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 1"))
})

const task2 = Effect.gen(function* () {
  console.log("task 2")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 2"))
})

const program = Effect.gen(function* () {
  yield* task1
  yield* task2
})

Effect.runPromise(program.pipe(Effect.scoped))
/*
Output:
task 1
task 2
finalizer after task 2
finalizer after task 1
*/
```

```ts
import { Effect, Console } from "effect"

const task1 = Console.log("task 1").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 1"))
  )
)

const task2 = Console.log("task 2").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 2"))
  )
)

const program =
  Effect.all([task1, task2], { discard: true })

Effect.runPromise(program.pipe(Effect.scoped))
/*
Output:
task 1
task 2
finalizer after task 2
finalizer after task 1
*/
```

In this case, the scopes of `task1` and `task2` are merged into a single scope, and when the program is run, it outputs the tasks and their finalizers in a specific order.

If you want more control over when each scope is closed, you can manually create and close them, as shown in this example:

```ts
import { Console, Effect, Exit, Scope } from "effect"

const task1 = Effect.gen(function* () {
  console.log("task 1")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 1"))
})

const task2 = Effect.gen(function* () {
  console.log("task 2")
  yield* Effect.addFinalizer(() => Console.log("finalizer after task 2"))
})

const program = Effect.gen(function* () {
  const scope1 = yield* Scope.make()
  const scope2 = yield* Scope.make()

  yield* task1.pipe(Scope.extend(scope1))
  yield* task2.pipe(Scope.extend(scope2))

  yield* Scope.close(scope1, Exit.void)
  yield* Console.log("doing something else")
  yield* Scope.close(scope2, Exit.void)
})

Effect.runPromise(program)
/*
Output:
task 1
task 2
finalizer after task 1
doing something else
finalizer after task 2
*/
```

```ts
import { Console, Effect, Exit, Scope } from "effect"

const task1 = Console.log("task 1").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 1"))
  )
)

const task2 = Console.log("task 2").pipe(
  Effect.tap(() =>
    Effect.addFinalizer(() => Console.log("finalizer after task 2"))
  )
)

const program = Effect.all([Scope.make(), Scope.make()]).pipe(
  Effect.andThen(([scope1, scope2]) =>
    Scope.extend(task1, scope1).pipe(
      Effect.andThen(Scope.extend(task2, scope2)),
      Effect.andThen(Scope.close(scope1, Exit.void)),
      Effect.andThen(Console.log("doing something else")),
      Effect.andThen(Scope.close(scope2, Exit.void))
    )
  )
)

Effect.runPromise(program)
/*
Output:
task 1
task 2
finalizer after task 1
doing something else
finalizer after task 2
*/
```

In this example, we create two separate scopes, `scope1` and `scope2`, and extend the scope of each task into its respective scope. When you run the program, it outputs the tasks and their finalizers in a different order.

The `Scope.extend` function allows you to extend the scope of an `Effect` workflow that requires a scope into another scope without closing the scope when the workflow finishes executing. This allows you to extend a scoped value into a larger scope.

You might wonder what happens when a scope is closed, but a task within that scope hasn't completed yet. The key point to note is that the scope closing doesn't force the task to be interrupted. It will continue running, and the finalizer will execute immediately when registered. The call to `close` will only wait for the finalizers that have already been registered.

So, finalizers run when the scope is closed, not necessarily when the effect finishes running. When you're using `Effect.scoped`, the scope is managed automatically, and finalizers are executed accordingly. However, when you manage the scope manually, you have control over when finalizers are executed.

## Defining Resources

We can define a resource using operators like `Effect.acquireRelease(acquire, release)`, which allows us to create a scoped value from an `acquire` and `release` workflow.

Every acquire release requires three actions:

- **Acquiring Resource**. An effect describing the acquisition of resource. For example, opening a file.
- **Using Resource**. An effect describing the actual process to produce a result. For example, counting the number of lines in a file.
- **Releasing Resource**. An effect describing the final step of releasing or cleaning up the resource. For example, closing a file.

The `Effect.acquireRelease` operator performs the `acquire` workflow **uninterruptibly**. This is important because if we allowed interruption during resource acquisition we could be interrupted when the resource was partially acquired.

The guarantee of the `Effect.acquireRelease` operator is that if the `acquire` workflow successfully completes execution then the `release` workflow is guaranteed to be run when the `Scope` is closed.

For example, let's define a simple resource:

```ts
import { Effect } from "effect"

// Define the interface for the resource
export interface MyResource {
  readonly contents: string
  readonly close: () => Promise<void>
}

// Simulate getting the resource
const getMyResource = (): Promise<MyResource> =>
  Promise.resolve({
    contents: "lorem ipsum",
    close: () =>
      new Promise((resolve) => {
        console.log("Resource released")
        resolve()
      })
  })

// Define the acquisition of the resource with error handling
export const acquire = Effect.tryPromise({
  try: () =>
    getMyResource().then((res) => {
      console.log("Resource acquired")
      return res
    }),
  catch: () => new Error("getMyResourceError")
})

// Define the release of the resource
export const release = (res: MyResource) => Effect.promise(() => res.close())

export const resource = Effect.acquireRelease(acquire, release)
```

Notice that the `Effect.acquireRelease` operator added a `Scope` to the context required by the workflow:

```ts
Effect<MyResource, Error, Scope>
```

This indicates that the workflow needs a `Scope` to run and adds a finalizer that will close the resource when the scope is closed.

We can continue working with the resource for as long as we want by using `Effect.andThen` or other Effect operators. For example, here's how we can read the contents:

```ts
import { Effect } from "effect"
import { resource } from "./resource"

const program = Effect.gen(function* () {
  const res = yield* resource
  console.log(`content is ${res.contents}`)
})
```

```ts
import { Effect, Console } from "effect"
import { resource } from "./resource"

const program = resource.pipe(
  Effect.andThen((res) => Console.log(`content is ${res.contents}`))
)
```

Once we are done working with the resource, we can close the scope using the `Effect.scoped` operator. It creates a new `Scope`, provides it to the workflow, and closes the `Scope` when the workflow is finished.

```ts
import { Effect } from "effect"
import { resource } from "./resource"

const program = Effect.scoped(
  Effect.gen(function* () {
    const res = yield* resource
    console.log(`content is ${res.contents}`)
  })
)
```

```ts
import { Effect, Console } from "effect"
import { resource } from "./resource"

const program = Effect.scoped(
  resource.pipe(
    Effect.andThen((res) => Console.log(`content is ${res.contents}`))
  )
)
```

The `Effect.scoped` operator removes the `Scope` from the context, indicating that there are no longer any resources used by this workflow which require a scope.

We now have a workflow that is ready to run:

```ts
Effect.runPromise(program)
/*
Resource acquired
content is lorem ipsum
Resource released
*/
```

## acquireUseRelease

The `Effect.acquireUseRelease(acquire, use, release)` function is a specialized version of the `Effect.acquireRelease` function that simplifies resource management by automatically handling the scoping of resources.

The main difference is that `acquireUseRelease` eliminates the need to manually call `Effect.scoped` to manage the resource's scope. It has additional knowledge about when you are done using the resource created with the `acquire` step. This is achieved by providing a `use` argument, which represents the function that operates on the acquired resource. As a result, `acquireUseRelease` can automatically determine when it should execute the release step.

Here's an example that demonstrates the usage of `acquireUseRelease`:

```ts
import { Effect, Console } from "effect"
import { MyResource, acquire, release } from "./resource"

const use = (res: MyResource) => Console.log(`content is ${res.contents}`)

const program = Effect.acquireUseRelease(acquire, use, release)

Effect.runPromise(program)
/*
Output:
Resource acquired
content is lorem ipsum
Resource released
*/
```