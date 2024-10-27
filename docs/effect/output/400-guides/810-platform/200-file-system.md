# FileSystem

The `@effect/platform/FileSystem` module provides a set of operations for reading and writing from/to the file system.

## Basic Usage

The module provides a single `FileSystem` tag, which acts as the gateway for interacting with the filesystem.

```ts
import { FileSystem } from "@effect/platform"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // use `fs` to operate on the file system
})
```

The `FileSystem` interface includes the following operations:

- **access**: Check if a file can be accessed. Optionally specify the level of access.
- **copy**: Copy a file or directory from `fromPath` to `toPath`. Equivalent to `cp -r`.
- **copyFile**: Copy a file from `fromPath` to `toPath`.
- **chmod**: Change the permissions of a file.
- **chown**: Change the owner and group of a file.
- **exists**: Check if a path exists.
- **link**: Create a hard link from `fromPath` to `toPath`.
- **makeDirectory**: Create a directory at `path`. Optionally specify the mode and whether to recursively create nested directories.
- **makeTempDirectory**: Create a temporary directory inside the system's default temporary directory.
- **makeTempDirectoryScoped**: Create a temporary directory inside a scope. Automatically deleted when the scope is closed.
- **makeTempFile**: Create a temporary file with a randomly generated name.
- **makeTempFileScoped**: Create a temporary file inside a scope. Automatically deleted when the scope is closed.
- **open**: Open a file at `path` with specified options. The file handle is automatically closed when the scope is closed.
- **readDirectory**: List the contents of a directory. Recursively list nested directories by setting the `recursive` option.
- **readFile**: Read the contents of a file.
- **readFileString**: Read the contents of a file as a string.
- **readLink**: Read the destination of a symbolic link.
- **realPath**: Resolve a path to its canonicalized absolute pathname.
- **remove**: Remove a file or directory. Set `recursive` to `true` to recursively remove nested directories.
- **rename**: Rename a file or directory.
- **sink**: Create a writable `Sink` for the specified `path`.
- **stat**: Get information about a file at `path`.
- **stream**: Create a readable `Stream` for the specified `path`.
- **symlink**: Create a symbolic link from `fromPath` to `toPath`.
- **truncate**: Truncate a file to a specified length. If not specified, truncate to length `0`.
- **utimes**: Change the file system timestamps of the file at `path`.
- **watch**: Watch a directory or file for changes.
- **writeFile**: Write data to a file at `path`.
- **writeFileString**: Write a string to a file at `path`.

## Example: using `readFileString`

```ts
import { FileSystem } from "@effect/platform"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect } from "effect"

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem

  // Reading the content of the same file where this code is written
  const content = yield* fs.readFileString("./index.ts", "utf8")
  console.log(content)
})

NodeRuntime.runMain(program.pipe(Effect.provide(NodeContext.layer)))
```