# noUselessTernary

Disallow ternary operators when simpler alternatives exist.

**Diagnostic Category:** `lint/complexity/noUselessTernary`

**Since:** `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `no-unneeded-ternary`

Disallow ternary operators when simpler alternatives exist.

It’s a common mistake in JavaScript to use a conditional expression to select between two boolean values instead of using the logical NOT (`!`) or double NOT (`!!`) to convert the test to a boolean.

## Examples

### Invalid

```js
var a = x ? true : true;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = x ? true : true;
   │        ^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = x;
```

```js
var a = foo === 1 ? false : true;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = foo === 1 ? false : true;
   │        ^^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = foo !== 1;
```

```js
var a = foo + 1 ? false : true;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = foo + 1 ? false : true;
   │        ^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = !(foo + 1);
```

```js
var a = foo + 1 ? true : false;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = foo + 1 ? true : false;
   │        ^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = !!(foo + 1);
```

### Valid

```js
var a = x === 2 ? 'Yes' : 'No';
```

```js
var a = x === 2 ? 'Yes' : false;
```

## Resources

Logical NOT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT

## Related links

- Disable a rule
- Configure the rule fix
- Rule options