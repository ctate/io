# noApproximativeNumericConstant

**Diagnostic Category: `lint/suspicious/noApproximativeNumericConstant`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: `approx_constant`

Use standard constants instead of approximated literals.

Usually, the definition in the standard library is more precise than
what people come up with or the used constant exceeds the maximum precision of the number type.

## Examples

### Invalid

```javascript
let x = 3.141;
```

```javascript
let x = 2.302;
```

### Valid

```javascript
let x = Math.PI;
let y = 3.14;
```

```javascript
let x = Math.LN10;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options