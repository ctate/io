# Managing Layers

Learn how to use Layers to control the construction of service dependencies and manage the "dependency graph" of your program more effectively.

In the previous sections, you learned how to create effects which depend on some service to be provided in order to execute, as well as how to provide that service to an Effect.

However, what if we have a service within our effect program that has dependencies on other services in order to be built? We want to avoid leaking these implementation details into the service interface.

To represent the "dependency graph" of our program and manage these dependencies more effectively, we can utilize a powerful abstraction called **Layer**.

Layers act as **constructors** for creating services, allowing us to manage dependencies during construction rather than at the service level. This approach helps to keep our service interfaces clean and focused.

**Concepts:**

- **Service**: A reusable component providing specific functionality, used across different parts of an application.
- **Tag**: A unique identifier representing a **service**, allowing Effect to locate and use it.
- **Context**: A collection storing services, functioning like a map with **tags** as keys and **services** as values.
- **Layer**: An abstraction for constructing **services**, managing dependencies during construction rather than at the service level.

## Designing the Dependency Graph

Imagine building a web application where the dependency graph includes configuration, logging, and database access:

- The `Config` service provides application configuration.
- The `Logger` service depends on the `Config` service.
- The `Database` service depends on both the `Config` and `Logger` services.

Our goal is to build the `Database` service along with its direct and indirect dependencies, ensuring that the `Config` service is available for both `Logger` and `Database`.

## Creating Layers

We will use Layers to construct the `Database` service instead of providing a service implementation directly. Layers separate implementation details from the service itself.

A `Layer<RequirementsOut, Error, RequirementsIn>` represents a blueprint for constructing a `RequirementsOut`. It takes a value of type `RequirementsIn` as input and may potentially produce an error of type `Error` during the construction process.

In our case, the `RequirementsOut` type represents the service we want to construct, while `RequirementsIn` represents the dependencies required for construction.

For simplicity, let's assume that we won't encounter any errors during the value construction (meaning `Error = never`).

### Layer Requirements

| **Layer**      | **Dependencies**                                           | **Type**                                   |
| -------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `ConfigLive`   | The `Config` service does not depend on any other services | `Layer<Config>`                            |
| `LoggerLive`   | The `Logger` service depends on the `Config` service       | `Layer<Logger, never, Config>`             |
| `DatabaseLive` | The `Database` service depends on `Config` and `Logger`    | `Layer<Database, never, Config | Logger>` |

A common convention when naming the `Layer` for a particular service is to add a `Live` suffix for the "live" implementation and a `Test` suffix for the "test" implementation.

### Config

The `Config` service does not depend on any other services, so `ConfigLive` will be the simplest layer to implement. We must create a `Tag` for the service. Since the service has no dependencies, we can create the layer directly using `Layer.succeed`:

```ts
import { Effect, Context, Layer } from "effect"

// Create a tag for the Config service
class Config extends Context.Tag("Config")<
  Config,
  {
    readonly getConfig: Effect.Effect<{
      readonly logLevel: string
      readonly connection: string
    }>
  }
>() {}

const ConfigLive = Layer.succeed(
  Config,
  Config.of({
    getConfig: Effect.succeed({
      logLevel: "INFO",
      connection: "mysql://username:password@hostname:port/database_name"
    })
  })
)
```

### Logger

Now we can implement the `Logger` service, which depends on the `Config` service to retrieve some configuration. We can map over the `Config` tag to "extract" the service from the context.

```ts
import { Effect, Context, Layer } from "effect"

class Logger extends Context.Tag("Logger")<
  Logger,
  { readonly log: (message: string) => Effect.Effect<void> }
>() {}

const LoggerLive = Layer.effect(
  Logger,
  Effect.gen(function* () {
    const config = yield* Config
    return {
      log: (message) =>
        Effect.gen(function* () {
          const { logLevel } = yield* config.getConfig
          console.log(`[${logLevel}] ${message}`)
        })
    }
  })
)
```

### Database

Finally, we can use our `Config` and `Logger` services to implement the `Database` service.

```ts
import { Effect, Context, Layer } from "effect"

class Database extends Context.Tag("Database")<
  Database,
  { readonly query: (sql: string) => Effect.Effect<unknown> }
>() {}

const DatabaseLive = Layer.effect(
  Database,
  Effect.gen(function* () {
    const config = yield* Config
    const logger = yield* Logger
    return {
      query: (sql: string) =>
        Effect.gen(function* () {
          yield* logger.log(`Executing query: ${sql}`)
          const { connection } = yield* config.getConfig
          return { result: `Results from ${connection}` }
        })
    }
  })
)
```

## Combining Layers

Layers can be combined in two primary ways: merging and composing.

### Merging Layers

Layers can be combined through merging using the `Layer.merge` combinator:

```ts
Layer.merge(layer1, layer2)
```

When merging two layers, the resulting layer requires all the services that both of them require and produces all services that both of them produce.

### Composing Layers

Layers can be composed using the `Layer.provide` function:

```ts
const composition = inner.pipe(Layer.provide(outer))
```

Now we can compose the `AppConfigLive` layer with the `DatabaseLive` layer:

```ts
const MainLive = DatabaseLive.pipe(
  Layer.provide(AppConfigLive),
  Layer.provide(ConfigLive)
)
```

### Merging and Composing Layers

To return both the `Config` and `Database` services, we can use `Layer.provideMerge`:

```ts
const MainLive = DatabaseLive.pipe(
  Layer.provide(AppConfigLive),
  Layer.provideMerge(ConfigLive)
)
```

## Providing a Layer to an Effect

Now that we have assembled the fully resolved `MainLive` for our application, we can provide it to our program to satisfy the program's requirements using `Effect.provide`:

```ts
const program = Effect.gen(function* () {
  const database = yield* Database
  const result = yield* database.query("SELECT * FROM users")
  return yield* Effect.succeed(result)
})

const runnable = Effect.provide(program, MainLive)

Effect.runPromise(runnable).then(console.log)
```