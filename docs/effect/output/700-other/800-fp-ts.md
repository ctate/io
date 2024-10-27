# Effect vs fp-ts

A detailed comparison of key features between the Effect and fp-ts libraries, including typed services, built-in services, error handling, pipeable APIs, dual APIs, testability, resource management, interruptions, defects, fiber-based concurrency, retry policies, logging, scheduling, caching, batching, metrics, tracing, configuration, immutable data structures, and stream processing.

## Key Developments

- **Project Merger**: The fp-ts project is officially merging with the Effect-TS ecosystem. Giulio Canti, the author of fp-ts, is being welcomed into the Effect organization. For more details, see the announcement here.
- **Continuity and Evolution**: Effect can be seen as the successor to fp-ts v2 and is effectively fp-ts v3, marking a significant evolution in the library's capabilities.

## FAQ

### Bundle Size Comparison Between Effect and fp-ts

**Q: I compared the bundle sizes of two simple programs using Effect and fp-ts. Why does Effect have a larger bundle size?**

A: It's natural to observe different bundle sizes because Effect and fp-ts are distinct systems designed for different purposes. Effect's bundle size is larger due to its included fiber runtime, which is crucial for its functionality. While the initial bundle size may seem large, the overhead amortizes as you use Effect.

**Q: Should I be concerned about the bundle size difference when choosing between Effect and fp-ts?**

A: Not necessarily. Consider the specific requirements and benefits of each library for your project. The Micro module in Effect is designed as a lightweight alternative to the standard Effect module, specifically for scenarios where reducing bundle size is crucial. This module is self-contained and does not include more complex features like Layer, Ref, Queue, and Deferred. If any major Effect modules (beyond basic data modules like Option, Either, Array, etc.) are used, the effect runtime will be added to your bundle, negating the benefits of Micro. This makes Micro ideal for libraries that aim to implement Effect functionality with minimal impact on bundle size, especially for libraries that plan to expose Promise-based APIs. It also supports scenarios where a client might use Micro while a server uses the full suite of Effect features, maintaining compatibility and shared logic between different parts of an application.

## Comparison Table

| Feature                   | fp-ts | Effect |
| ------------------------- | ----- | ------ |
| Typed Services            | ❌    | ✅     |
| Built-in Services         | ❌    | ✅     |
| Typed errors              | ✅    | ✅     |
| Pipeable APIs             | ✅    | ✅     |
| Dual APIs                 | ❌    | ✅     |
| Testability               | ❌    | ✅     |
| Resource Management       | ❌    | ✅     |
| Interruptions             | ❌    | ✅     |
| Defects                   | ❌    | ✅     |
| Fiber-Based Concurrency   | ❌    | ✅     |
| Fiber Supervision         | ❌    | ✅     |
| Retry and Retry Policies  | ❌    | ✅     |
| Built-in Logging          | ❌    | ✅     |
| Built-in Scheduling       | ❌    | ✅     |
| Built-in Caching          | ❌    | ✅     |
| Built-in Batching         | ❌    | ✅     |
| Metrics                   | ❌    | ✅     |
| Tracing                   | ❌    | ✅     |
| Configuration             | ❌    | ✅     |
| Immutable Data Structures | ❌    | ✅     |
| Stream Processing         | ❌    | ✅     |

### Typed Services

Both libraries provide the ability to track requirements at the type level. In fp-ts, you can utilize the ReaderTaskEither<R, E, A> type, while in Effect, the Effect<A, E, R> type is available. In fp-ts, the R type parameter is contravariant, which means there is no guarantee of avoiding conflicts. Effect's R type parameter is covariant, allowing for merging dependencies at the type level when multiple effects are involved. Effect also provides tools like Tag, Context, and Layer for managing dependencies.

### Built-in Services

Effect has built-in services like Clock, Random, and Tracer, while fp-ts does not provide any default services.

### Typed Errors

Both libraries support typed errors, but Effect allows merging errors at the type level when combining multiple effects, providing utilities for managing these merged error types effectively.

### Pipeable APIs

Both libraries provide pipeable APIs, but Effect offers a .pipe() method on each data type for convenience.

### Dual APIs

Effect provides dual APIs, allowing the same API to be used in different ways (e.g., "data-last" and "data-first" variants).

### Testability

fp-ts promotes good testability but lacks dedicated testing tools. Effect offers utilities like TestClock and TestRandom for improved testability.

### Resource Management

Effect provides comprehensive resource management capabilities, while fp-ts has limited features mainly through bracket.

### Interruptions

Effect supports interruptions, allowing you to cancel ongoing computations. fp-ts does not have built-in support for interruptions.

### Defects

Effect provides mechanisms for handling defects and unexpected failures, while fp-ts lacks dedicated support for managing defects.

### Fiber-Based Concurrency

Effect leverages fiber-based concurrency for lightweight and efficient concurrent computations. fp-ts does not support fiber-based concurrency.

### Fiber Supervision

Effect provides supervision strategies for managing and monitoring fibers. fp-ts does not have built-in support for fiber supervision.

### Retry and Retry Policies

Effect includes built-in support for retrying computations with customizable policies. fp-ts does not offer built-in retry functionality.

### Built-in Logging

Effect comes with built-in logging capabilities, while fp-ts requires external libraries for logging.

### Built-in Scheduling

Effect provides built-in scheduling capabilities for managing the execution of computations over time. fp-ts lacks this feature.

### Built-in Caching

Effect offers built-in caching mechanisms for improved performance. This feature is not available in fp-ts.

### Built-in Batching

Effect provides built-in batching capabilities to combine multiple computations into a single batched computation. This feature is not available in fp-ts.

### Metrics

Effect includes built-in support for collecting and reporting metrics related to computations and system behavior. This feature is not available in fp-ts.

### Tracing

Effect has built-in tracing capabilities and offers an OpenTelemetry exporter for integration. fp-ts does not provide a similar tracing tool.

### Configuration

Effect supports managing and accessing configuration values within computations. This feature is not available in fp-ts.

### Immutable Data Structures

Effect provides built-in support for immutable data structures like Chunk, HashSet, and HashMap. fp-ts does not have built-in support for such data structures.

### Stream Processing

The Effect ecosystem provides built-in support for stream processing. fp-ts relies on external libraries like RxJS for stream processing.