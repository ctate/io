# Introduction

Welcome to the documentation for `@effect/platform`, a library designed for creating platform-independent abstractions (Node.js, Bun, browsers).

With `@effect/platform`, you can incorporate abstract services like `Terminal`, `FileSystem`, or `Path` into your program. Later, during the assembly of the final application, you can provide specific layers for the target platform using the corresponding packages:

- `@effect/platform-node` for Node.js
- `@effect/platform-bun` for Bun
- `@effect/platform-browser` for browsers

## Installation

To install the **beta** version:

```
npm install @effect/platform
```

## Example: Platform-Agnostic Program

Below is a simple example using the `Path` module to create a file path. This program is compatible with multiple environments:

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})
```

## Running the Program in Node.js

First, install the Node.js-specific package:

```
npm install @effect/platform-node
```

Update the program to load the Node.js-specific context:

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

Finally, run the program in Node.js using `tsx`:

```
npx tsx index.ts
# Output: tmp/file.txt
```

## Running the Program in Bun

To run the same program in Bun, first install the Bun-specific package:

```
npm install @effect/platform-bun
```

Update the program to use the Bun-specific context:

```ts
import { Path } from "@effect/platform"
import { Effect } from "effect"
import { BunContext, BunRuntime } from "@effect/platform-bun"

const program = Effect.gen(function* () {
  const path = yield* Path.Path

  const mypath = path.join("tmp", "file.txt")
  console.log(mypath)
})

BunRuntime.runMain(program.pipe(Effect.provide(BunContext.layer)))
```

Run the program in Bun:

```
bun index.ts
# Output: tmp/file.txt
```