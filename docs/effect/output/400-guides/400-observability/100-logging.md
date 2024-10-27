# Logging

Explore the power of logging in Effect for enhanced debugging and monitoring. Learn about dynamic log level control, custom logging output, fine-grained logging, environment-based logging, and additional features. Dive into specific logging utilities such as log, logDebug, logInfo, logWarning, logError, logFatal, and spans. Discover how to disable default logging and load log levels from configuration. Finally, explore the creation of custom loggers to tailor logging to your needs.

Logging is a crucial aspect of software development, especially when it comes to debugging and monitoring the behavior of your applications. In this section, we'll delve into Effect's logging utilities and explore their advantages over traditional methods like `console.log`.

## Advantages Over Traditional Logging

Effect's logging utilities offer several advantages over traditional logging methods like `console.log`:

1. **Dynamic Log Level Control**: Change the log level dynamically to control which log messages get displayed based on their severity.

2. **Custom Logging Output**: Direct log messages to various destinations using a custom logger, ensuring logs are stored and processed according to your application's requirements.

3. **Fine-Grained Logging**: Set different log levels for different parts of your application, allowing for tailored detail in logs.

4. **Environment-Based Logging**: Combine logging utilities with deployment environments for granular logging strategies.

5. **Additional Features**: Measure time spans, alter log levels on a per-effect basis, and integrate spans for performance monitoring.

## Logging Utilities

### log

The `Effect.log` function outputs a log message at the default `INFO` level.

```ts
import { Effect } from "effect"

const program = Effect.log("Application started")

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="Application started"
*/
```

Log entries include:

- `timestamp`: When the log message was generated.
- `level`: The log level.
- `fiber`: The identifier of the fiber executing the program.
- `message`: The log content.
- `span`: (Optional) The duration of the span in milliseconds.

You can log multiple messages simultaneously:

```ts
import { Effect } from "effect"

const program = Effect.log("message1", "message2", "message3")

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 message=message2 message=message3
*/
```

Include one or more Cause instances in your logs for detailed error information:

```ts
import { Effect, Cause } from "effect"

const program = Effect.log(
  "message1",
  "message2",
  Cause.die("Oh no!"),
  Cause.die("Oh uh!")
)

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 message=message2 cause="Error: Oh no! Error: Oh uh!"
*/
```

### Log Levels

#### logDebug

By default, `DEBUG` messages are not printed. Enable them using `Logger.withMinimumLogLevel`.

Example:

```ts
import { Effect, Logger, LogLevel } from "effect"

const task1 = Effect.gen(function* () {
  yield* Effect.sleep("2 seconds")
  yield* Effect.logDebug("task1 done")
}).pipe(Logger.withMinimumLogLevel(LogLevel.Debug))

const program = Effect.gen(function* () {
  yield* Effect.log("start")
  yield* task1
  yield* Effect.log("done")
})

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO message=start
timestamp=... level=DEBUG message="task1 done" <-- 2 seconds later
timestamp=... level=INFO message=done
*/
```

#### logInfo

By default, `INFO` messages are printed.

Example:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.logInfo("start")
  yield* Effect.sleep("2 seconds")
  yield* Effect.logInfo("done")
})

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO message=start
timestamp=... level=INFO message=done
*/
```

#### logWarning

By default, `WARN` messages are printed.

Example:

```ts
import { Effect, Either } from "effect"

const task = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(task)
  if (Either.isLeft(failureOrSuccess)) {
    yield* Effect.logWarning(failureOrSuccess.left)
    return 0
  } else {
    return failureOrSuccess.right
  }
})

Effect.runFork(program)
/*
Output:
timestamp=... level=WARN fiber=#0 message="Oh uh!"
*/
```

#### logError

By default, `ERROR` messages are printed.

Example:

```ts
import { Effect, Either } from "effect"

const task = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(task)
  if (Either.isLeft(failureOrSuccess)) {
    yield* Effect.logError(failureOrSuccess.left)
    return 0
  } else {
    return failureOrSuccess.right
  }
})

Effect.runFork(program)
/*
Output:
timestamp=... level=ERROR fiber=#0 message="Oh uh!"
*/
```

#### logFatal

By default, `FATAL` messages are printed.

Example:

```ts
import { Effect, Either } from "effect"

const task = Effect.fail("Oh uh!").pipe(Effect.as(2))

const program = Effect.gen(function* () {
  const failureOrSuccess = yield* Effect.either(task)
  if (Either.isLeft(failureOrSuccess)) {
    yield* Effect.logFatal(failureOrSuccess.left)
    return 0
  } else {
    return failureOrSuccess.right
  }
})

Effect.runFork(program)
/*
Output:
timestamp=... level=FATAL fiber=#0 message="Oh uh!"
*/
```

## Custom Annotations

Enhance log outputs by incorporating custom annotations with the `Effect.annotateLogs` function.

Example of a single annotation:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("message1")
  yield* Effect.log("message2")
}).pipe(Effect.annotateLogs("key", "value"))

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 key=value
timestamp=... level=INFO fiber=#0 message=message2 key=value
*/
```

To apply multiple annotations:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("message1")
  yield* Effect.log("message2")
}).pipe(Effect.annotateLogs({ key1: "value1", key2: "value2" }))

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message=message1 key2=value2 key1=value1
timestamp=... level=INFO fiber=#0 message=message2 key2=value2 key1=value1
*/
```

## Log Spans

Effect provides support for log spans, allowing you to measure the duration of specific operations.

Example:

```ts
import { Effect } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.sleep("1 second")
  yield* Effect.log("The job is finished!")
}).pipe(Effect.withLogSpan("myspan"))

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="The job is finished!" myspan=1011ms
*/
```

## Disabling Default Logging

To turn off default logging, you can use various methods:

**Using withMinimumLogLevel**

```ts
import { Effect, Logger, LogLevel } from "effect"

const program = Effect.gen(function* () {
  yield* Effect.log("Executing task...")
  yield* Effect.sleep("100 millis")
  console.log("task done")
})

Effect.runFork(program)
/*
Output:
timestamp=... level=INFO fiber=#0 message="Executing task..."
task done
*/

Effect.runFork(program.pipe(Logger.withMinimumLogLevel(LogLevel.None)))
/*
Output:
task done
*/
```

**Using a Layer**

```ts
import { Effect, Logger, LogLevel } from "effect"

const layer = Logger.minimumLogLevel(LogLevel.None)

Effect.runFork(program.pipe(Effect.provide(layer)))
/*
Output:
task done
*/
```

**Using a Custom Runtime**

```ts
import { Effect, Logger, LogLevel, ManagedRuntime } from "effect"

const customRuntime = ManagedRuntime.make(
  Logger.minimumLogLevel(LogLevel.None)
)

customRuntime.runPromise(program)
/*
Output:
task done
*/
```

## Loading the Log Level from Configuration

To retrieve the log level from a configuration, utilize the layer produced by `Logger.minimumLogLevel`:

```ts
import {
  Effect,
  Config,
  Logger,
  Layer,
  ConfigProvider,
  LogLevel
} from "effect"

const program = Effect.gen(function* () {
  yield* Effect.logError("ERROR!")
  yield* Effect.logWarning("WARNING!")
  yield* Effect.logInfo("INFO!")
  yield* Effect.logDebug("DEBUG!")
})

const LogLevelLive = Config.logLevel("LOG_LEVEL").pipe(
  Effect.andThen((level) => Logger.minimumLogLevel(level)),
  Layer.unwrapEffect
)

const configured = Effect.provide(program, LogLevelLive)

const test = Effect.provide(
  configured,
  Layer.setConfigProvider(
    ConfigProvider.fromMap(new Map([["LOG_LEVEL", LogLevel.Warning.label]]))
  )
)

Effect.runFork(test)
/*
Output:
... level=ERROR fiber=#0 message=ERROR!
... level=WARN fiber=#0 message=WARNING!
*/
```

## Custom Loggers

Define a custom logger using `Logger.make`:

```ts
import { Logger } from "effect"

export const logger = Logger.make(({ logLevel, message }) => {
  globalThis.console.log(`[${logLevel.label}] ${message}`)
})
```

To replace the default logger, create a layer using `Logger.replace` and provide it to your program:

```ts
import { Effect, Logger, LogLevel } from "effect"
import * as CustomLogger from "./CustomLogger"
import { program } from "./program"

const layer = Logger.replace(Logger.defaultLogger, CustomLogger.logger)

Effect.runFork(
  program.pipe(
    Logger.withMinimumLogLevel(LogLevel.Debug),
    Effect.provide(layer)
  )
)
```

## Built-in Loggers

### json

Formats log entries as JSON objects.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.json)))
```

### logFmt

Outputs logs in a human-readable format.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.logFmt)))
```

### structured

Provides detailed log outputs, structured for comprehensive traceability.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.structured)))
```

### pretty

Generates visually engaging and color-enhanced log outputs.

```ts
import { Effect, Logger } from "effect"

const program = Effect.log("message1", "message2").pipe(
  Effect.annotateLogs({ key1: "value1", key2: "value2" }),
  Effect.withLogSpan("myspan")
)

Effect.runFork(program.pipe(Effect.provide(Logger.pretty)))
```

Log levels are colored as follows:

| Log Level | Color        |
| --------- | ------------ |
| Trace     | Gray         |
| Debug     | Blue         |
| Info      | Green        |
| Warning   | Yellow       |
| Error     | Red          |
| Fatal     | White on Red |