# noConstantMathMinMaxClamp

Disallow the use of `Math.min` and `Math.max` to clamp a value where the result itself is constant.

## Diagnostic Category
lint/correctness/noConstantMathMinMaxClamp

## Since
v1.7.0

## Note
- This rule has an **unsafe** fix.

## Sources
- Same as: min_max

## Examples

### Invalid

```js
Math.min(0, Math.max(100, x));
```

```js
Math.max(100, Math.min(0, x));
```

### Valid

```js
Math.min(100, Math.max(0, x));
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options