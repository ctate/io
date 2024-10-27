---
title: Command
excerpt: Creating and running a command with the specified process name and an optional list of arguments
bottomNavigation: pagination
---

The `@effect/platform/Command` module provides a way to create and run commands with the specified process name and an optional list of arguments.

## Creating Commands

The `Command.make` function generates a command object, which includes details such as the process name, arguments, and environment.

**Example**

```ts
import { Command } from "@effect/platform"

const command = Command.make("ls", "-al")
console.log(command)
/*
{
  _id: '@effect/platform/Command',
  _tag: 'StandardCommand',
  command: 'ls',
  args: [ '-al' ],
  env: {},
  cwd: { _id: 'Option', _tag: 'None' },
  shell: false,
  gid: { _id: 'Option', _tag: 'None' },
  uid: { _id: 'Option', _tag: 'None' }
}
*/
```

This command object does not execute until run by an executor.

## Running Commands

You need a `CommandExecutor` to run the command, which can capture output in various formats such as strings, lines, or streams.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("ls", "-al")

const program = Effect.gen(function* () {
  const output = yield* Command.string(command)
  console.log(output)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```

### Output Formats

- `string`: Runs the command returning the output as a string (with the specified encoding).
- `lines`: Runs the command returning the output as an array of lines (with the specified encoding).
- `stream`: Runs the command returning the output as a stream of `Uint8Array` chunks.
- `streamLines`: Runs the command returning the output as a stream of lines (with the specified encoding).

### exitCode

If all you need is the exit code of the command, you can use the `Command.exitCode` function.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("ls", "-al")

const program = Effect.gen(function* () {
  const exitCode = yield* Command.exitCode(command)
  console.log(exitCode)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
// Output: 0
```

## Custom Environment Variables

You can customize environment variables in a command by using `Command.env`.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("echo", "-n", "$MY_CUSTOM_VAR").pipe(
  Command.env({
    MY_CUSTOM_VAR: "Hello, this is a custom environment variable!"
  }),
  Command.runInShell(true)
)

const program = Effect.gen(function* () {
  const output = yield* Command.string(command)
  console.log(output)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
// Output: Hello, this is a custom environment variable!
```

## Standard Input

You can send input directly to a command's standard input using the `Command.feed` function.

**Example**

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const command = Command.make("cat").pipe(Command.feed("Hello"))

const program = Effect.gen(function* () {
  console.log(yield* Command.string(command))
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
// Output: Hello
```

## Fetching Process Details

You can obtain details about a running process like `exitCode`, `stdout`, and `stderr`.

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect, Stream, String, pipe } from "effect"

const runString = <E, R>(
  stream: Stream.Stream<Uint8Array, E, R>
): Effect.Effect<string, E, R> =>
  stream.pipe(
    Stream.decodeText(),
    Stream.runFold(String.empty, String.concat)
  )

const program = Effect.gen(function* () {
  const command = Command.make("ls")

  const [exitCode, stdout, stderr] = yield* pipe(
    Command.start(command),
    Effect.flatMap((process) =>
      Effect.all(
        [
          process.exitCode,
          runString(process.stdout),
          runString(process.stderr)
        ],
        { concurrency: 3 }
      )
    )
  )
  console.log({ exitCode, stdout, stderr })
})

NodeRuntime.runMain(
  Effect.scoped(program).pipe(Effect.provide(NodeContext.layer))
)
```

## Streaming stdout to process.stdout

To run a command and stream its `stdout` directly to `process.stdout`:

```ts
import { Command } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const program = Command.make("cat", "./some-file.txt").pipe(
  Command.stdout("inherit"),
  Command.exitCode
)

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```