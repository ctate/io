# noGlobalIsNan

## Diagnostic Category: `lint/suspicious/noGlobalIsNan`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Use `Number.isNaN` instead of global `isNaN`.

`Number.isNaN()` and `isNaN()` do not have the same behavior.
When the argument to `isNaN()` is not a number, the value is first coerced to a number.
`Number.isNaN()` does not perform this coercion.
Therefore, it is a more reliable way to test whether a value is `NaN`.

## Examples

### Invalid

```js
isNaN({}); // true
```

### Error Message

code-block.js:1:1 lint/suspicious/noGlobalIsNan  FIXABLE 
✖ isNaN is unsafe. It attempts a type coercion. Use Number.isNaN instead.
> 1 │ isNaN({}); // true
│   ^^^^
ℹ See the MDN documentation for more details.
ℹ Unsafe fix: Use Number.isNaN instead.
- isNaN({}); // true
+ Number.isNaN({}); // true

### Valid

```js
Number.isNaN({}); // false
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options