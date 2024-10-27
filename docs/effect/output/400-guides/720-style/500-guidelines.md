---
title: Guidelines
---

## Using `runMain`

`runMain` serves as the primary entry point for running an Effect application on Node:

```ts
import { Effect, Console, Schedule, pipe } from "effect"
import { NodeRuntime } from "@effect/platform-node"

const program = pipe(
  Effect.addFinalizer(() => Console.log("Application is about to exit!")),
  Effect.andThen(Console.log("Application started!")),
  Effect.andThen(
    Effect.repeat(Console.log("still alive..."), {
      schedule: Schedule.spaced("1 second")
    })
  ),
  Effect.scoped
)

// Effect.runFork(program) // no graceful teardown with CTRL+C

NodeRuntime.runMain(program) // graceful teardown with CTRL+C
```

The `runMain` function finds all fibers and interrupts them, adding an observer for the fiber by listening to `sigint`. Teardown should be on the main effect; killing the fiber that runs the application/server will trigger teardown. This is the purpose of `runMain` from the `platform-node` package.

## Avoid Tacit Usage

Avoid tacit function calls like `map(f)` and using `flow`. It is recommended not to use functions point-free, meaning avoiding tacit usage.

While tacit functions can be used, they may cause issues. It is safer to use `(x) => fn(x)` instead. Tacit usage, especially with optional parameters, can be unsafe. If a function has overloads, using it tacitly might erase all generics, leading to bugs.

TypeScript inference can be compromised with tacit functions, resulting in unexpected errors. This is not just a stylistic choice; it is a protective measure to avoid mistakes. Stack traces may also be less clear with tacit usage, increasing risk without significant benefit.

It is advisable to avoid tacit usage, particularly with generic functions that have overloads, to prevent losing generics.