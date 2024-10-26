# noCompareNegZero
Disallow comparing against `-0`

## Diagnostic Category
`lint/suspicious/noCompareNegZero`

## Since
`v1.0.0`

### Note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

### Sources
- Same as: `no-compare-neg-zero`

## Examples

### Invalid
```js
(1 >= -0)
```

### Error Message
Do not use the >= operator to compare against -0.

### Safe Fix
Replace -0 with 0

### Valid
```js
(1 >= 0)
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options