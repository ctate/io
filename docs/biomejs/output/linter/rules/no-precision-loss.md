# noPrecisionLoss
Disallow literal numbers that lose precision

**Diagnostic Category: `lint/correctness/noPrecisionLoss`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-loss-of-precision
- Same as: @typescript-eslint/no-loss-of-precision
- Same as: lossy_float_literal

## Examples

### Invalid

```js
const x = 9007199254740993
```

This number literal will lose precision at runtime.
The value at runtime will be 9007199254740992

```js
const x = 5.123000000000000000000000000001
```

This number literal will lose precision at runtime.
The value at runtime will be 5.123

```js
const x = 0x20000000000001
```

This number literal will lose precision at runtime.
The value at runtime will be 9007199254740992

```js
const x = 0x2_000000000_0001;
```

This number literal will lose precision at runtime.
The value at runtime will be 9007199254740992

### Valid

```js
const x = 12345
const x = 123.456
const x = 123e34
const x = 12300000000000000000000000
const x = 0x1FFFFFFFFFFFFF
const x = 9007199254740991
const x = 9007_1992547409_91
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options