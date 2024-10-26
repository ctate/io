# noCommaOperator

Disallow comma operator.

## Diagnostic Category: `lint/style/noCommaOperator`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-sequences

The comma operator includes multiple expressions where only one is expected.
It evaluates every operand from left to right and returns the value of the last operand.
It frequently obscures side effects, and its use is often an accident.

The use of the comma operator in the initialization and update parts of a `for` is still allowed.

## Examples

### Invalid

```js
const foo = (doSomething(), 0);
```

```js
for (; doSomething(), !!test; ) {}
```

```js
// Use a semicolon instead.
let a, b;
a = 1, b = 2;
```

### Valid

```js
for(a = 0, b = 0; (a + b) < 10; a++, b += 2) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options