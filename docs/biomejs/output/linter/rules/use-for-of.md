# useForOf

This rule recommends a `for-of` loop when in a `for` loop, the index used to extract an item from the iterated array.

**Diagnostic Category:** `lint/style/useForOf`

**Since:** `v1.5.0`

**Sources:**
- Same as: @typescript-eslint/prefer-for-of
- Same as: unicorn/no-for-loop

## Examples

### Invalid

```js
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

**Warning:**
Use `for-of` loop instead of a `for` loop.

### Valid

```js
for (let item of array) {
   console.log(item);
}
```

```js
for (let i = 0; i < array.length; i++) {
   console.log(i, array[i]);
}
```

```js
for (let i = 0, j = 0; i < array.length; i++) {
   console.log(i, array[i]);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options