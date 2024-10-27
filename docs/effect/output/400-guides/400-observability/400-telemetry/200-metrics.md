# Introduction

Effect Metrics provides a powerful solution for monitoring and analyzing various metrics, offering support for counters, gauges, histograms, summaries, and frequencies. Learn how these metrics enhance visibility into your application's performance and behavior.

In complex and highly concurrent applications, managing various interconnected components can be quite challenging. Ensuring that everything runs smoothly and avoiding application downtime becomes crucial in such setups.

Imagine a sophisticated infrastructure with numerous services, replicated and distributed across servers. However, we often lack insight into what's happening across these services, including error rates, response times, and service uptime. This lack of visibility can make it challenging to identify and address issues effectively. This is where Effect Metrics comes into play; it allows us to capture and analyze various metrics, providing valuable data for later investigation.

Effect Metrics offers support for five different types of metrics:

1. **Counter**: Tracks values that increase over time, such as request counts.
2. **Gauge**: Represents a single numerical value that can fluctuate over time, like memory usage.
3. **Histogram**: Tracks the distribution of observed values across different buckets, useful for metrics like request latencies.
4. **Summary**: Provides insight into a sliding window of a time series and offers metrics for specific percentiles.
5. **Frequency**: Counts occurrences of distinct string values, useful for tracking how often different events occur.

## Counter

A Counter is a metric that represents a single numerical value that can be incremented and decremented over time. It provides a running total of changes, reflecting the dynamic nature of certain metrics.

### How to Create a Counter

To create a counter, use the `Metric.counter` constructor:

```ts
import { Metric } from "effect"

const numberCounter = Metric.counter("request_count", {
  description: "A counter for tracking requests"
})

const bigintCounter = Metric.counter("error_count", {
  description: "A counter for tracking errors",
  bigint: true
})
```

For a counter that only increases, use the `incremental: true` option:

```ts
import { Metric } from "effect"

const incrementalCounter = Metric.counter("count", {
  description: "a counter that only increases its value",
  incremental: true
})
```

### When to Use Counters

Counters are useful for tracking cumulative values that can both increase and decrease over time, such as:

- Request Counts
- Completed Tasks
- Error Counts

### Example

```ts
import { Metric, Effect, Console } from "effect"

const taskCount = Metric.counter("task_count").pipe(
  Metric.withConstantInput(1)
)

const task1 = Effect.succeed(1).pipe(Effect.delay("100 millis"))
const task2 = Effect.succeed(2).pipe(Effect.delay("200 millis"))

const program = Effect.gen(function* () {
  const a = yield* taskCount(task1)
  const b = yield* taskCount(task2)
  return a + b
})

const showMetric = Metric.value(taskCount).pipe(Effect.andThen(Console.log))

Effect.runPromise(program.pipe(Effect.tap(() => showMetric))).then(
  console.log
)
```

## Gauge

A Gauge is a metric that represents a single numerical value that can be set or adjusted. It is used to monitor values that can both increase and decrease.

### How to Create a Gauge

To create a gauge, use the `Metric.gauge` constructor:

```ts
import { Metric } from "effect"

const numberGauge = Metric.gauge("memory_usage", {
  description: "A gauge for memory usage"
})

const bigintGauge = Metric.gauge("cpu_load", {
  description: "A gauge for CPU load",
  bigint: true
})
```

### When to Use Gauges

Gauges are best for monitoring values at a specific moment, such as:

- Memory Usage
- Queue Size
- In-Progress Request Counts

### Example

```ts
import { Metric, Effect, Random, Console } from "effect"

const temperature = Metric.gauge("temperature")

const getTemperature = Effect.gen(function* () {
  const n = yield* Random.nextIntBetween(-10, 10)
  console.log(`variation: ${n}`)
  return n
})

const program = Effect.gen(function* () {
  const series: Array<number> = []
  series.push(yield* temperature(getTemperature))
  series.push(yield* temperature(getTemperature))
  series.push(yield* temperature(getTemperature))
  return series
})

const showMetric = Metric.value(temperature).pipe(Effect.andThen(Console.log))

Effect.runPromise(program.pipe(Effect.tap(() => showMetric))).then(
  console.log
)
```

## Histogram

A Histogram helps understand how a collection of numerical values is distributed over time, organizing values into distinct intervals called buckets.

### Key Concepts

- Observes numerical values and counts how many observations fall into specific buckets.
- Keeps track of the total count of observed values and the sum of all observed values.

### When to Use Histograms

Histograms are useful for analyzing performance metrics such as response times and latencies. They help identify performance bottlenecks and variations.

### Examples

#### Histogram With Linear Buckets

```ts
import { Effect, Metric, MetricBoundaries, Random } from "effect"

const latencyHistogram = Metric.histogram(
  "request_latency",
  MetricBoundaries.linear({ start: 0, width: 10, count: 11 })
)

const program = latencyHistogram(Random.nextIntBetween(1, 120)).pipe(
  Effect.repeatN(99)
)

Effect.runPromise(
  program.pipe(Effect.andThen(Metric.value(latencyHistogram)))
).then((histogramState) => console.log("%o", histogramState))
```

#### Timer Metric

```ts
import { Metric, Array, Random, Effect } from "effect"

const timer = Metric.timerWithBoundaries("timer", Array.range(1, 10))

const program = Random.nextIntBetween(1, 10).pipe(
  Effect.andThen((n) => Effect.sleep(`${n} millis`)),
  Metric.trackDuration(timer),
  Effect.repeatN(99)
)

Effect.runPromise(program.pipe(Effect.andThen(Metric.value(timer)))).then(
  (histogramState) => console.log("%o", histogramState)
)
```

## Summary

A Summary provides insights into a time series by calculating specific percentiles, helping to understand the distribution of values.

### How Summaries Work

Summaries retain observed samples in their internal state and are configured with a maximum age and size to prevent uncontrolled growth.

### When to Use Summaries

Summaries are excellent for monitoring latencies when histograms are not suitable due to accuracy concerns.

### Example

```ts
import { Metric, Random, Effect } from "effect"

const responseTimeSummary = Metric.summary({
  name: "response_time_summary",
  maxAge: "1 day",
  maxSize: 100,
  error: 0.03,
  quantiles: [0.1, 0.5, 0.9]
})

const program = responseTimeSummary(Random.nextIntBetween(1, 120)).pipe(
  Effect.repeatN(99)
)

Effect.runPromise(
  program.pipe(Effect.andThen(Metric.value(responseTimeSummary)))
).then((summaryState) => console.log("%o", summaryState))
```

## Frequency

Frequencies count occurrences of specific values, automatically creating new counters for observed values.

### When to Use Frequencies

Frequencies are useful for counting occurrences of distinct string values, such as:

- Tracking service invocations
- Monitoring failure types

### Example

```ts
import { Metric, Random, Effect } from "effect"

const errorFrequency = Metric.frequency("error_frequency")

const program = errorFrequency(
  Random.nextIntBetween(1, 10).pipe(Effect.andThen((n) => `Error-${n}`))
).pipe(Effect.repeatN(99))

Effect.runPromise(
  program.pipe(Effect.andThen(Metric.value(errorFrequency)))
).then((frequencyState) => console.log("%o", frequencyState))
```

## Tagging Metrics

When creating metrics, you can add tags to provide additional context, helping in categorizing and filtering metrics.

### Tagging multiple Metrics

Use `Effect.tagMetrics` to apply tags to all metrics created in the same context.

```ts
import { Metric, Effect } from "effect"

const taskCount = Metric.counter("task_count")
const task1 = Effect.succeed(1).pipe(Effect.delay("100 millis"))

Effect.gen(function* () {
  yield* taskCount(task1)
}).pipe(
  Effect.tagMetrics("environment", "production")
)
```

### Tagging a specific Metric

For individual metrics, use `Metric.tagged` to apply tags to a specific metric.

```ts
import { Metric } from "effect"

const counter = Metric.counter('request_count').pipe(
  Metric.tagged('environment', 'production'),
);
```