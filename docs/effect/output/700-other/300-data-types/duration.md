---
title: Duration
excerpt: Explore the `Duration` data type in Effect for representing non-negative spans of time. Learn to create durations with different units, including milliseconds, seconds, and minutes. Discover options for creating infinite durations and decoding values. Retrieve duration values in milliseconds or nanoseconds. Compare durations and perform arithmetic operations like addition and multiplication. Master the capabilities of the `Duration` module for efficient time handling in your applications.
---

The `Duration` data type represents specific non-negative spans of time, commonly used for time intervals, timeouts, delays, or scheduling. It provides a convenient way to work with time units and perform calculations on durations.

## Creating Durations

The `Duration` module offers several constructors for creating durations in different units:

```ts
import { Duration } from "effect"

const duration1 = Duration.millis(100) // 100 milliseconds
const duration2 = Duration.seconds(2) // 2 seconds
const duration3 = Duration.minutes(5) // 5 minutes
```

You can create durations using nanoseconds, microseconds, milliseconds, seconds, minutes, hours, days, and weeks. For infinite durations, use `Duration.infinity`:

```ts
import { Duration } from "effect"

console.log(String(Duration.infinity))
/*
Output:
{
  "_id": "Duration",
  "_tag": "Infinity"
}
*/
```

To create durations using the `Duration.decode` helper:

- `number`s are treated as milliseconds
- `bigint`s are treated as nanoseconds
- strings must be formatted as `"${number} ${unit}"`

```ts
import { Duration } from "effect"

Duration.decode(10n) // Duration.nanos(10)
Duration.decode(100) // Duration.millis(100)
Duration.decode(Infinity) // Duration.infinity

Duration.decode("10 nanos") // Duration.nanos(10)
Duration.decode("20 micros") // Duration.micros(20)
Duration.decode("100 millis") // Duration.millis(100)
Duration.decode("2 seconds") // Duration.seconds(2)
Duration.decode("5 minutes") // Duration.minutes(5)
Duration.decode("7 hours") // Duration.hours(7)
Duration.decode("3 weeks") // Duration.weeks(3)
```

## Getting the Duration Value

Retrieve the value of a duration in milliseconds using `toMillis`:

```ts
import { Duration } from "effect"

console.log(Duration.toMillis(Duration.seconds(30))) // Output: 30000
```

Retrieve the value in nanoseconds using `toNanos`:

```ts
import { Duration } from "effect"

console.log(Duration.toNanos(Duration.millis(100)))
/*
Output:
{
  _id: "Option",
  _tag: "Some",
  value: 100000000n
}
*/
```

`toNanos` returns an `Option<bigint>` since the duration might be infinite. Use `unsafeToNanos` for a `bigint` return type, but it throws an error for infinite durations:

```ts
import { Duration } from "effect"

console.log(Duration.unsafeToNanos(Duration.millis(100))) // Output: 100000000n
console.log(Duration.unsafeToNanos(Duration.infinity)) // throws "Cannot convert infinite duration to nanos"
```

## Comparing Durations

Compare two durations using the following functions:

- `lessThan`: returns `true` if the first duration is less than the second
- `lessThanOrEqualTo`: returns `true` if the first duration is less than or equal to the second
- `greaterThan`: returns `true` if the first duration is greater than the second
- `greaterThanOrEqualTo`: returns `true` if the first duration is greater than or equal to the second

```ts
import { Duration } from "effect"

const duration1 = Duration.seconds(30)
const duration2 = Duration.minutes(1)

console.log(Duration.lessThan(duration1, duration2)) // Output: true
console.log(Duration.lessThanOrEqualTo(duration1, duration2)) // Output: true
console.log(Duration.greaterThan(duration1, duration2)) // Output: false
console.log(Duration.greaterThanOrEqualTo(duration1, duration2)) // Output: false
```

## Performing Arithmetic Operations

Perform arithmetic operations on durations, such as addition and multiplication:

```ts
import { Duration } from "effect"

const duration1 = Duration.seconds(30)
const duration2 = Duration.minutes(1)

console.log(String(Duration.sum(duration1, duration2)))
/*
Output:
{
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 90000
}
*/

console.log(String(Duration.times(duration1, 2))) // Output: Duration("60000 millis")
/*
Output:
{
  "_id": "Duration",
  "_tag": "Millis",
  "millis": 60000
}
*/