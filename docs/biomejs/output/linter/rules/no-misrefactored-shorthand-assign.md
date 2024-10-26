# noMisrefactoredShorthandAssign

**Diagnostic Category: `lint/suspicious/noMisrefactoredShorthandAssign`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: misrefactored_assign_op

Disallow shorthand assign when variable appears on both sides.

This rule helps to avoid potential bugs related to incorrect assignments or unintended side effects that may occur during refactoring.

## Examples

### Invalid

```js
a += a + b
```

```js
a -= a - b
```

```js
a *= a * b
```

### Valid

```js
a += b
```

```js
a = a + b
```

```js
a = a - b
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options