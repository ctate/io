# useExponentiationOperator

Disallow the use of `Math.pow` in favor of the `**` operator.

**Diagnostic Category:** `lint/style/useExponentiationOperator`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `prefer-exponentiation-operator` (see ESLint documentation)

Introduced in ES2016, the infix exponentiation operator `**` is an alternative for the standard `Math.pow` function. Infix notation is considered to be more readable and thus more preferable than the function notation.

## Examples

### Invalid

```js
const foo = Math.pow(2, 8);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

```js
const bar = Math.pow(a, b);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

```js
let baz = Math.pow(a + b, c + d);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

```js
let quux = Math.pow(-1, n);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

### Valid

```js
const foo = 2 ** 8;

const bar = a ** b;

let baz = (a + b) ** (c + d);

let quux = (-1) ** n;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options