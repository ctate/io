# noConstAssign

**Diagnostic Category: `lint/correctness/noConstAssign`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: no-const-assign

Prevents from having `const` variables being re-assigned.

Trying to assign a value to a `const` will cause an `TypeError` when the code is executed.

## Examples

### Invalid

```js
const a = 1;
a = 4;
```

```js
const a = 2;
a += 1;
```

```js
const a = 1;
++a;
```

```js
const a = 1, b = 2;

a = 2;
```

### Valid

```js
const a = 10;
let b = 10;
b = 20;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options