# Hash

The `Hash` trait in Effect is closely tied to the `Equal` trait and serves a supportive role in optimizing equality checks by providing a mechanism for hashing. Hashing is crucial for efficiently determining equality between two values, particularly in data structures like hash tables.

## Role of Hash in Equality Checking

The main function of the `Hash` trait is to provide a quick and efficient way to determine if two values are definitely not equal, complementing the `Equal` trait. When two values implement the `Equal` trait, their hash values (computed using the `Hash` trait) are compared first:

- **Different Hash Values**: If the hash values are different, the values themselves are guaranteed to be different. This quick check avoids potentially expensive equality checks.
- **Same Hash Values**: If the hash values are the same, it does not guarantee equality, only that they might be. A more thorough comparison using the `Equal` trait is then performed to determine actual equality.

This method dramatically speeds up the equality checking process, especially in collections where quick look-up and insertion times are crucial, such as in hash sets or hash maps.

## Practical Example and Explanation

Consider a scenario with a custom `Person` class, where you want to check if two instances are equal based on their properties. By implementing both the `Equal` and `Hash` traits, you can efficiently manage these checks:

```ts
import { Equal, Hash } from "effect"

class Person implements Equal.Equal {
  constructor(
    readonly id: number,  // Unique identifier for each person
    readonly name: string,
    readonly age: number
  ) {}

  // Defines equality based on id, name, and age
  [Equal.symbol](that: Equal.Equal): boolean {
    if (that instanceof Person) {
      return (
        Equal.equals(this.id, that.id) &&
        Equal.equals(this.name, that.name) &&
        Equal.equals(this.age, that.age)
      )
    }
    return false
  }

  // Generates a hash code based primarily on the unique id
  [Hash.symbol](): number {
    return Hash.hash(this.id)
  }
}

const alice = new Person(1, "Alice", 30)
console.log(Equal.equals(alice, new Person(1, "Alice", 30))) // Output: true

const bob = new Person(2, "Bob", 40)
console.log(Equal.equals(alice, bob)) // Output: false
```

In this code snippet:
- The `[Equal.symbol]` method determines equality by comparing the `id`, `name`, and `age` fields of `Person` instances, ensuring a comprehensive equality check.
- The `[Hash.symbol]` method computes a hash code using the `id` of the person, optimizing performance in hashing operations.
- The equality check returns `true` when comparing `alice` to a new `Person` object with identical property values and `false` when comparing `alice` to `bob` due to differing property values.