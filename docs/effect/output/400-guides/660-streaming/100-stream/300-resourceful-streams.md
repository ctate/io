---
title: Resourceful Streams
excerpt: Discover how to manage resources effectively in Effect's `Stream` module. Explore constructors tailored for lifting scoped resources, ensuring safe acquisition and release within streams. Dive into examples illustrating the use of `Stream.acquireRelease` for file operations, finalization for cleanup tasks, and `ensuring` for post-finalization actions. Master the art of resource management in streaming applications with Effect.
---

In the Stream module, most constructors offer a special variant for lifting a scoped resource into a `Stream`. These constructors create streams that are safe regarding resource management, handling resource acquisition before stream creation and ensuring proper closure after usage.

Stream provides `Stream.acquireRelease` and `Stream.finalizer` constructors similar to `Effect.acquireRelease` and `Effect.addFinalizer`, allowing for cleanup or finalization tasks before the stream concludes.

## Acquire Release

Example demonstrating `Stream.acquireRelease` for file operations:

```ts
import { Stream, Console, Effect } from "effect"

const open = (filename: string) =>
  Effect.gen(function* () {
    yield* Console.log(`Opening ${filename}`)
    return {
      getLines: Effect.succeed(["Line 1", "Line 2", "Line 3"]),
      close: Console.log(`Closing ${filename}`)
    }
  })

const stream = Stream.acquireRelease(
  open("file.txt"),
  (file) => file.close
).pipe(Stream.flatMap((file) => file.getLines))

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
```

In this code, the `open` function simulates file operations. `Stream.acquireRelease` ensures the file is opened and closed correctly while processing the lines.

## Finalization

Finalization allows executing a specific action before a stream ends, useful for cleanup tasks. Example using `Stream.finalizer` to clean up a temporary directory:

```ts
import { Stream, Console, Effect } from "effect"

const application = Stream.fromEffect(Console.log("Application Logic."))

const deleteDir = (dir: string) => Console.log(`Deleting dir: ${dir}`)

const program = application.pipe(
  Stream.concat(
    Stream.finalizer(
      deleteDir("tmp").pipe(
        Effect.andThen(Console.log("Temporary directory was deleted."))
      )
    )
  )
)

Effect.runPromise(Stream.runCollect(program)).then(console.log)
```

This example shows the application logic and uses `Stream.finalizer` to delete a temporary directory and log a message upon completion.

## Ensuring

`Stream.ensuring` allows performing actions after the finalization of a stream. Example:

```ts
import { Stream, Console, Effect } from "effect"

const program = Stream.fromEffect(Console.log("Application Logic.")).pipe(
  Stream.concat(Stream.finalizer(Console.log("Finalizing the stream"))),
  Stream.ensuring(
    Console.log("Doing some other works after stream's finalization")
  )
)

Effect.runPromise(Stream.runCollect(program)).then(console.log)
```

In this code, the application logic is followed by a finalization step and additional tasks using `Stream.ensuring`, ensuring post-finalization actions are executed.