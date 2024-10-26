# noGlobalIsFinite

## Diagnostic Category: `lint/suspicious/noGlobalIsFinite`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Use `Number.isFinite` instead of global `isFinite`.

`Number.isFinite()` and `isFinite()` do not have the same behavior. 
When the argument to `isFinite()` is not a number, the value is first coerced to a number.
`Number.isFinite()` does not perform this coercion.
Therefore, it is a more reliable way to test whether a number is finite.

### Examples

#### Invalid

```js
isFinite(false); // true
```

#### Valid

```js
Number.isFinite(false); // false
```

### Related links

- Disable a rule
- Configure the rule fix
- Rule options