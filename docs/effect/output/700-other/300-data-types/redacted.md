# Redacted Module Documentation

The Redacted module in "effect" provides tools to securely handle sensitive data within applications, preventing accidental exposure in logs or error messages. It offers functions to create, manage, and compare `Redacted` instances, ensuring sensitive information is protected and managed appropriately.

## make

Creates a `Redacted<A>` instance from a given value `A`, securely hiding its content.

```ts
import { Redacted } from "effect"

// Creating a redacted value
const API_KEY = Redacted.make("1234567890")

console.log(API_KEY) // Output: {}
console.log(String(API_KEY)) // Output: <redacted>
```

## value

Retrieves the original value from a `Redacted` instance. Use this function with caution, as it exposes the sensitive data.

```ts
import { Redacted } from "effect"

const API_KEY = Redacted.make("1234567890")

console.log(Redacted.value(API_KEY)) // Output: "1234567890"
```

## unsafeWipe

Erases the underlying value of a `Redacted` instance, rendering it unusable. This function ensures that sensitive data does not remain in memory longer than necessary.

```ts
import { Redacted } from "effect"

const API_KEY = Redacted.make("1234567890")

console.log(Redacted.value(API_KEY)) // Output: "1234567890"

Redacted.unsafeWipe(API_KEY)

console.log(Redacted.value(API_KEY)) // throws Error: Unable to get redacted value
```

## getEquivalence

Generates an equivalence relation for `Redacted<A>` values based on an equivalence relation for the underlying values `A`. This function is useful for comparing `Redacted` instances without exposing their contents.

```ts
import { Redacted, Equivalence } from "effect"

const API_KEY1 = Redacted.make("1234567890")
const API_KEY2 = Redacted.make("1-34567890")
const API_KEY3 = Redacted.make("1234567890")

const equivalence = Redacted.getEquivalence(Equivalence.string)

console.log(equivalence(API_KEY1, API_KEY2)) // Output: false
console.log(equivalence(API_KEY1, API_KEY3)) // Output: true
```