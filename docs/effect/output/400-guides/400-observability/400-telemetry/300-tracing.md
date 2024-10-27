# Introduction

Although logs and metrics are useful to understand the behavior of individual services, they are not enough to provide a complete overview of the lifetime of a request in a distributed system.

In a distributed system, a request can span multiple services, and each service can make multiple requests to other services to fulfill the request. We need a way to track the lifetime of a request across multiple services to diagnose bottlenecks and understand where the request spends most of its time.

## Spans

A span represents a unit of work or operation. It tracks specific operations that a request makes, painting a picture of what happened during the time in which that operation was executed.

A typical Span contains the following information:

- **Name:** Describes the operation being tracked.
- **Time-Related Data:** Timestamps to measure when the operation started and how long it took.
- **Structured Log Messages:** Records essential information during the operation.
- **Metadata (Attributes):** Additional data that provides context about the operation.

## Traces

A trace records the paths taken by requests as they propagate through multi-service architectures, like microservice and serverless applications. Without tracing, it is challenging to pinpoint the cause of performance problems in a distributed system.

A trace is made of one or more spans. The first span represents the root span. Each root span represents a request from start to finish. The spans underneath the parent provide a more in-depth context of what occurs during a request.

Many observability back-ends visualize traces as waterfall diagrams that show the parent-child relationship between a root span and its child spans.

## Creating Spans

You can instrument an effect with a Span using the `Effect.withSpan` API. Here's how you can do it:

```ts
import { Effect } from "effect"

const program = Effect.void.pipe(Effect.delay("100 millis"))

const instrumented = program.pipe(Effect.withSpan("myspan"))
```

Instrumenting an effect doesn't change its type. You start with an `Effect<void>`, and you still get an `Effect<void>`.

## Printing Spans

To print a Span to the console, you need specific tools, including:

- `@effect/opentelemetry`
- `@opentelemetry/sdk-metrics`
- `@opentelemetry/sdk-trace-base`
- `@opentelemetry/sdk-trace-node`
- `@opentelemetry/sdk-trace-web`

Here's a code snippet demonstrating how to set up the necessary environment and print the Span to the console:

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const program = Effect.void.pipe(Effect.delay("100 millis"))

const instrumented = program.pipe(Effect.withSpan("myspan"))

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(instrumented.pipe(Effect.provide(NodeSdkLive)))
```

### Output Breakdown

- `traceId`: Unique identifier for the entire trace.
- `parentId`: Identifies the parent span of the current span.
- `name`: Describes the name of the span.
- `id`: Unique identifier for the current span.
- `timestamp`: When the span started.
- `duration`: Time taken to complete the operation.
- `attributes`: Key-value pairs providing additional context.
- `status`: Information about the span's status.
- `events`: Records of specific moments during the span's lifecycle.
- `links`: Associations with other spans in different traces.

## Adding Annotations

You can provide extra information to a span using the `Effect.annotateCurrentSpan` function. This allows you to associate key-value pairs, offering more context about the execution of the span.

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const program = Effect.void.pipe(
  Effect.delay("100 millis"),
  Effect.tap(() => Effect.annotateCurrentSpan("key", "value")),
  Effect.withSpan("myspan")
)

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(program.pipe(Effect.provide(NodeSdkLive)))
```

## Logs as Events

Logs are transformed into "Span Events," providing structured information and a timeline of occurrences within your application.

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const program = Effect.log("Hello").pipe(
  Effect.delay("100 millis"),
  Effect.withSpan("myspan")
)

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(program.pipe(Effect.provide(NodeSdkLive)))
```

## Nesting Spans

Spans can be nested, creating a hierarchy of operations. This concept is illustrated in the following code:

```ts
import { Effect } from "effect"
import { NodeSdk } from "@effect/opentelemetry"
import {
  ConsoleSpanExporter,
  BatchSpanProcessor
} from "@opentelemetry/sdk-trace-base"

const child = Effect.void.pipe(
  Effect.delay("100 millis"),
  Effect.withSpan("child")
)

const parent = Effect.gen(function* () {
  yield* Effect.sleep("20 millis")
  yield* child
  yield* Effect.sleep("10 millis")
}).pipe(Effect.withSpan("parent"))

const NodeSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: "example" },
  spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter())
}))

Effect.runPromise(parent.pipe(Effect.provide(NodeSdkLive)))
```

## Tutorial: Visualizing Traces with Docker, Prometheus, Grafana, and Tempo

In this tutorial, we'll guide you through simulating and visualizing traces using a sample instrumented Node.js application. We will use Docker, Prometheus, Grafana, and Tempo to create, collect, and visualize traces.

### Tools Explained

- **Docker**: Runs applications in containers, providing a consistent environment.
- **Prometheus**: A monitoring and alerting toolkit that collects metrics and data.
- **Grafana**: A visualization platform for creating interactive dashboards.
- **Tempo**: A distributed tracing system for tracing requests through applications.

### Getting Docker

1. Visit the Docker website.
2. Download Docker Desktop for your operating system and install it.
3. Open Docker Desktop to run it in the background.

### Simulating Traces

1. **Download Docker Files**. Download the required Docker files.
2. **Set Up Docker**. Unzip the downloaded file, navigate to the `/docker/local` directory, and run:

   ```bash
   docker-compose up
   ```

3. **Simulate Traces**. Run the following example code in your Node.js environment. Install the required libraries:

   ```ts
   import { Effect } from "effect"
   import { NodeSdk } from "@effect/opentelemetry"
   import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
   import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

   const task = (
     name: string,
     delay: number,
     children: ReadonlyArray<Effect.Effect<void>> = []
   ) =>
     Effect.gen(function* () {
       yield* Effect.log(name)
       yield* Effect.sleep(`${delay} millis`)
       for (const child of children) {
         yield* child
       }
       yield* Effect.sleep(`${delay} millis`)
     }).pipe(Effect.withSpan(name))

   const poll = task("/poll", 1)

   const program = task("client", 2, [
     task("/api", 3, [
       task("/authN", 4, [task("/authZ", 5)]),
       task("/payment Gateway", 6, [task("DB", 7), task("Ext. Merchant", 8)]),
       task("/dispatch", 9, [
         task("/dispatch/search", 10),
         Effect.all([poll, poll, poll], { concurrency: "inherit" }),
         task("/pollDriver/{id}", 11)
       ])
     ])
   ])

   const NodeSdkLive = NodeSdk.layer(() => ({
     resource: { serviceName: "example" },
     spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter())
   }))

   Effect.runPromise(
     program.pipe(
       Effect.provide(NodeSdkLive),
       Effect.catchAllCause(Effect.logError)
     )
   )
   ```

4. **Visualize Traces**. Open your web browser and go to the local Grafana URL to see the generated Trace ID and its details.