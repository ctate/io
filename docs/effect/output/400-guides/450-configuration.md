# Configuration

Configuration is an essential aspect of any cloud-native application. Effect simplifies the process of managing configuration by offering a convenient interface for configuration providers.

The configuration front-end in Effect enables ecosystem libraries and applications to specify their configuration requirements in a declarative manner. It offloads the complex tasks to a `ConfigProvider`, which can be supplied by third-party libraries.

Effect comes bundled with a straightforward default `ConfigProvider` that retrieves configuration data from environment variables. This default provider can be used during development or as a starting point before transitioning to more advanced configuration providers.

To make our application configurable, we need to understand three essential elements:

- **Config Description**: We describe the configuration data using an instance of `Config<A>`. If the configuration data is simple, such as a `string`, `number`, or `boolean`, we can use the built-in functions provided by the `Config` module. For more complex data types like HostPort, we can combine primitive configs to create a custom configuration description.

- **Config Frontend**: We utilize the instance of `Config<A>` to load the configuration data described by the instance (a `Config` is, in itself, an effect). This process leverages the current `ConfigProvider` to retrieve the configuration.

- **Config Backend**: The `ConfigProvider` serves as the underlying engine that manages the configuration loading process. Effect comes with a default config provider as part of its default services. This default provider reads the configuration data from environment variables. If we want to use a custom config provider, we can utilize the `Layer.setConfigProvider` layer to configure the Effect runtime accordingly.

## Getting Started

Effect provides a set of primitives for the most common types like `string`, `number`, `boolean`, `integer`, etc.

Let's start with a simple example of how to read configuration from environment variables:

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const host = yield* Config.string("HOST")
  const port = yield* Config.number("PORT")
  console.log(`Application started: ${host}:${port}`)
})

Effect.runSync(program)
```

If we run this program we will get the following output:

```bash
npx tsx primitives.ts
(Missing data at HOST: "Expected HOST to exist in the process context")
```

This is because we have not provided any configuration. Let's try running it with the following environment variables:

```bash
HOST=localhost PORT=8080 npx tsx primitives.ts
Application started: localhost:8080
```

## Primitives

Effect offers these basic types out of the box:

- `string`: Constructs a config for a string value.
- `number`: Constructs a config for a float value.
- `boolean`: Constructs a config for a boolean value.
- `integer`: Constructs a config for an integer value.
- `date`: Constructs a config for a date value.
- `literal`: Constructs a config for a literal value.
- `logLevel`: Constructs a config for a LogLevel value.
- `duration`: Constructs a config for a duration value.
- `redacted`: Constructs a config for a secret value.

## Default Values

In some cases, you may encounter situations where an environment variable is not set, leading to a missing value in the configuration. To handle such scenarios, Effect provides the `Config.withDefault` function. This function allows you to specify a fallback or default value to use when an environment variable is not present.

Here's how you can use `Config.withDefault` to handle fallback values:

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const host = yield* Config.string("HOST")
  const port = yield* Config.number("PORT").pipe(Config.withDefault(8080))
  console.log(`Application started: ${host}:${port}`)
})

Effect.runSync(program)
```

When running the program with the command:

```bash
HOST=localhost npx tsx withDefault.ts
```

you will see the following output:

```bash
Application started: localhost:8080
```

## Constructors

Effect provides several built-in constructors. These are functions that take a `Config` as input and produce another `Config`.

- `array`: Constructs a config for an array of values.
- `chunk`: Constructs a config for a sequence of values.
- `option`: Returns an optional version of this config, which will be `None` if the data is missing from configuration, and `Some` otherwise.
- `repeat`: Returns a config that describes a sequence of values, each of which has the structure of this config.
- `hashSet`: Constructs a config for a sequence of values.
- `hashMap`: Constructs a config for a sequence of values.

**Example**

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const config = yield* Config.array(Config.string(), "MY_ARRAY")
  console.log(config)
})

Effect.runSync(program)
```

```bash
MY_ARRAY=a,b,c npx tsx array.ts

[ 'a', 'b', 'c' ]
```

## Operators

Effect comes with a set of built-in operators to help you manipulate and handle configurations.

### Transforming Operators

These operators allow you to transform a config into a new one:

- `validate`: Returns a config that describes the same structure as this one, but which performs validation during loading.
- `map`: Creates a new config with the same structure as the original but with values transformed using a given function.
- `mapAttempt`: Similar to `map`, but if the function throws an error, it's caught and turned into a validation error.
- `mapOrFail`: Like `map`, but allows for functions that might fail. If the function fails, it results in a validation error.

**Example**

```ts
import { Effect, Config } from "effect"

const program = Effect.gen(function* () {
  const config = yield* Config.string("NAME").pipe(
    Config.validate({
      message: "Expected a string at least 4 characters long",
      validation: (s) => s.length >= 4
    })
  )
  console.log(config)
})

Effect.runSync(program)
```

### Fallback Operators

These operators help you set up fallbacks in case of errors or missing data:

- `orElse`: Sets up a config that tries to use this config first. If there's an issue, it falls back to another specified config.
- `orElseIf`: This one also tries to use the main config first but switches to a fallback config if there's an error that matches a specific condition.

**Example**

```ts
import { Config, ConfigProvider, Effect, Layer } from "effect"

const program = Effect.gen(function* () {
  const A = yield* Config.string("A")
  const B = yield* Config.string("B")
  console.log(`A: ${A}`, `B: ${B}`)
})

const provider1 = ConfigProvider.fromMap(
  new Map([
    ["A", "A"]
  ])
)

const provider2 = ConfigProvider.fromMap(
  new Map([
    ["B", "B"]
  ])
)

const layer = Layer.setConfigProvider(
  provider1.pipe(ConfigProvider.orElse(() => provider2))
)

Effect.runSync(Effect.provide(program, layer))
```

```bash
npx tsx orElse.ts

A: A B: B
```

## Custom Configurations

In addition to primitive types, we can also define configurations for custom types. To achieve this, we use primitive configs and combine them using `Config` operators and constructors.

Let's consider the `HostPort` data type, which consists of two fields: `host` and `port`.

```ts
class HostPort {
  constructor(
    readonly host: string,
    readonly port: number
  ) {}
}
```

We can define a configuration for this data type by combining primitive configs for `string` and `number`:

```ts
import { Config } from "effect"

export class HostPort {
  constructor(
    readonly host: string,
    readonly port: number
  ) {}

  get url() {
    return `${this.host}:${this.port}`
  }
}

const both = Config.all([Config.string("HOST"), Config.number("PORT")])

export const config = Config.map(
  both,
  ([host, port]) => new HostPort(host, port)
)
```

## Top-level and Nested Configurations

We can also define nested configurations. Let's assume we have a `ServiceConfig` data type that consists of two fields: `hostPort` and `timeout`.

```ts
import * as HostPort from "./HostPort"
import { Config } from "effect"

class ServiceConfig {
  constructor(
    readonly hostPort: HostPort.HostPort,
    readonly timeout: number
  ) {}
}

const config = Config.map(
  Config.all([HostPort.config, Config.number("TIMEOUT")]),
  ([hostPort, timeout]) => new ServiceConfig(hostPort, timeout)
)
```

To read configurations from a nested namespace, we can use the `Config.nested` combinator:

```ts
const config = Config.map(
  Config.all([
    Config.nested(HostPort.config, "HOSTPORT"),
    Config.number("TIMEOUT")
  ]),
  ([hostPort, timeout]) => new ServiceConfig(hostPort, timeout)
)
```

## Testing Services

When testing services, we can use the `ConfigProvider.fromMap` constructor to mock the backend that reads the configuration data.

```ts
import { ConfigProvider, Layer, Effect } from "effect"
import * as App from "./App"

const mockConfigProvider = ConfigProvider.fromMap(
  new Map([
    ["HOST", "localhost"],
    ["PORT", "8080"]
  ])
)

const layer = Layer.setConfigProvider(mockConfigProvider)

Effect.runSync(Effect.provide(App.program, layer))
```

## Redacted

What sets `Config.redacted` apart from `Config.string` is its handling of sensitive information. It parses the config value and wraps it in a `Redacted<string>`, designed for holding secrets.

```ts
import { Effect, Config, Console, Redacted } from "effect"

const program = Config.redacted("API_KEY").pipe(
  Effect.tap((redacted) => Console.log(`Console output: ${redacted}`)),
  Effect.tap((redacted) =>
    Console.log(`Actual value: ${Redacted.value(redacted)}`)
  )
)

Effect.runSync(program)
```

## Secret

**Deprecated since version 3.3.0**: Please use `Config.redacted` for handling sensitive information going forward.

```ts
import { Effect, Config, Console, Secret } from "effect"

const program = Config.secret("API_KEY").pipe(
  Effect.tap((secret) => Console.log(`Console output: ${secret}`)),
  Effect.tap((secret) => Console.log(`Secret value: ${Secret.value(secret)}`))
)

Effect.runSync(program)
```