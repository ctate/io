---
title: Path
excerpt: Working with file paths
bottomNavigation: pagination
---

The `@effect/platform/Path` module provides a set of operations for working with file paths.

## Basic Usage

The module provides a single `Path` tag, which acts as the gateway for interacting with paths.

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  // use `path` to operate on paths
})
```

The `Path` interface includes the following operations:

- **basename**: Returns the last part of a path, optionally removing a given suffix.
- **dirname**: Returns the directory part of a path.
- **extname**: Returns the file extension from a path.
- **format**: Formats a path object into a path string.
- **fromFileUrl**: Converts a file URL to a path.
- **isAbsolute**: Checks if a path is absolute.
- **join**: Joins multiple path segments into one.
- **normalize**: Normalizes a path by resolving `.` and `..` segments.
- **parse**: Parses a path string into an object with its segments.
- **relative**: Computes the relative path from one path to another.
- **resolve**: Resolves a sequence of paths to an absolute path.
- **sep**: Returns the platform-specific path segment separator (e.g., `/` on POSIX).
- **toFileUrl**: Converts a path to a file URL.
- **toNamespacedPath**: Converts a path to a namespaced path (specific to Windows).

**Example: using `join`**

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"
import { NodeContext, NodeRuntime } from "@effect/platform-node"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```