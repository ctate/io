# Order

The Order module provides a way to compare values and determine their order. It defines an interface `Order<A>` which represents a function for comparing two values of type `A`. The function returns `-1`, `0`, or `1`, indicating whether the first value is less than, equal to, or greater than the second value.

## Basic Structure

```ts
interface Order<A> {
  (first: A, second: A): -1 | 0 | 1
}
```

## Using the Built-in Orders

The Order module includes built-in comparators for common data types:

- `string`: For comparing strings.
- `number`: For comparing numbers.
- `bigint`: For comparing big integers.
- `Date`: For comparing `Date`s.

### Example Usage

```ts
import { Order } from "effect"

console.log(Order.string("apple", "banana")) // Output: -1
console.log(Order.number(1, 1)) // Output: 0
console.log(Order.bigint(2n, 1n)) // Output: 1
```

## Sorting Arrays

You can sort arrays using the `Array.sort` function without modifying the original array.

### Example

```ts
import { Order, Array } from "effect"

const strings = ["b", "a", "d", "c"]
const result = Array.sort(strings, Order.string)

console.log(strings) // Output: [ 'b', 'a', 'd', 'c' ]
console.log(result) // Output: [ 'a', 'b', 'c', 'd' ]
```

You can also use an `Order` with JavaScript's native `Array.sort` method:

```ts
import { Order } from "effect"

const strings = ["b", "a", "d", "c"]
strings.sort(Order.string)

console.log(strings) // Output: [ 'a', 'b', 'c', 'd' ]
```

## Deriving Orders

You can create custom sorting rules using the `Order.mapInput` function.

### Example

```ts
import { Order, Array } from "effect"

interface Person {
  readonly name: string
  readonly age: number
}

const byName = Order.mapInput(Order.string, (person: Person) => person.name)

const persons: ReadonlyArray<Person> = [
  { name: "Charlie", age: 22 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
]

const sortedPersons = Array.sort(persons, byName)

console.log(sortedPersons) // Output: sorted by name
```

## Combining Orders

You can merge multiple `Order` instances using the `combine` function.

### Example

```ts
import { Order, Array } from "effect"

interface Person {
  readonly name: string
  readonly age: number
}

const byName = Order.mapInput(Order.string, (person: Person) => person.name)
const byAge = Order.mapInput(Order.number, (person: Person) => person.age)
const byNameAge = Order.combine(byName, byAge)

const result = Array.sort(
  [
    { name: "Bob", age: 20 },
    { name: "Alice", age: 18 },
    { name: "Bob", age: 18 }
  ],
  byNameAge
)

console.log(result) // Output: sorted by name, then by age
```

## Additional Useful Functions

### Reversing Order

```ts
import { Order } from "effect"

const ascendingOrder = Order.number
const descendingOrder = Order.reverse(ascendingOrder)

console.log(ascendingOrder(1, 3)) // Output: -1
console.log(descendingOrder(1, 3)) // Output: 1
```

### Comparing Values

```ts
import { Order } from "effect"

console.log(Order.lessThan(Order.number)(1, 2)) // Output: true
console.log(Order.greaterThan(Order.number)(5, 3)) // Output: true
console.log(Order.lessThanOrEqualTo(Order.number)(2, 2)) // Output: true
console.log(Order.greaterThanOrEqualTo(Order.number)(4, 4)) // Output: true
```

### Finding Minimum and Maximum

```ts
import { Order } from "effect"

console.log(Order.min(Order.number)(3, 1)) // Output: 1
console.log(Order.max(Order.number)(5, 8)) // Output: 8
```

### Clamping Values

```ts
import { Order } from "effect"

const clampedValue = Order.clamp(Order.number)(10, {
  minimum: 20,
  maximum: 30
})

console.log(clampedValue) // Output: 20
```

### Checking Value Range

```ts
import { Order } from "effect"

console.log(Order.between(Order.number)(15, { minimum: 10, maximum: 20 })) // Output: true
console.log(Order.between(Order.number)(5, { minimum: 10, maximum: 20 })) // Output: false
```