# noForEach

**Diagnostic Category: `lint/complexity/noForEach`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: unicorn/no-array-for-each
- Same as: needless_for_each

Prefer `for...of` statement instead of `Array.forEach`.

Here's a summary of why `forEach` may be disallowed, and why `for...of` is preferred for almost any use-case of `forEach`:

- Performance: Using `forEach` can lead to performance issues, especially when working with large arrays.
When more requirements are added on, `forEach` typically gets chained with other methods like `filter` or `map`, causing multiple iterations over the same Array.
Encouraging for loops discourages chaining and encourages single-iteration logic (e.g. using a continue instead of `filter`).


- Readability: While `forEach` is a simple and concise way to iterate over an array, it can make the code less readable, especially when the callback function is complex.
In contrast, using a for loop or a `for...of` loop can make the code more explicit and easier to read.


- Debugging: `forEach` can make debugging more difficult, because it hides the iteration process.



## Caveat

We consider all objects with a method named `forEach` to be iterable.
This way, this rule applies to all objects with a method called `forEach`, not just `Array` instances.

## Exception for Index Usage

When the index is explicitly used in the `forEach` callback, it is acceptable to use `forEach`. This is because:

- The index is directly available as the second argument in `forEach`, making it convenient for scenarios where the index is necessary.
- In sparse arrays, `forEach` will skip undefined entries, which differs from the behavior of `for...of` with `Object.entries` that includes these entries.
This can be important for certain array operations, particularly in TypeScript environments with strict type checking.

## Examples

### Invalid

```javascript
els.forEach((el) => {
  f(el);
})
```

```javascript
els["forEach"](el => {
  f(el);
})
```

### Valid

```javascript
els.forEach((el, i) => {
  f(el, i)
})
```

```javascript
for (const el of els) {
  f(el);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options