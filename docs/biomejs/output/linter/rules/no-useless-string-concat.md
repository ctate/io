# noUselessStringConcat

Disallow unnecessary concatenation of string or template literals.

**Diagnostic Category:** `lint/complexity/noUselessStringConcat`

**Since:** `v1.8.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: no-useless-concat

This rule aims to flag the concatenation of 2 literals when they could be combined into a single literal. Literals can be strings or template literals. Concatenation of multiple strings is allowed when the strings are spread over multiple lines to prevent exceeding the maximum line width.

## Examples

### Invalid

```js
const a = "a" + "b";
```

code-block.js:1:11 lint/complexity/noUselessStringConcat FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Useless string concatenation.

> 1 │ const a = "a" + "b";
>   │          ^^^^^^^^^^
> 2 │ 

ℹ Consider turning the expression into a single string to improve readability and runtime performance.

ℹ Unsafe fix: Remove the useless concatenation

```js
const a = "a" + "b" + "c";
```

code-block.js:1:11 lint/complexity/noUselessStringConcat FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Useless string concatenation.

> 1 │ const a = "a" + "b" + "c";
>   │          ^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Consider turning the expression into a single string to improve readability and runtime performance.

ℹ Unsafe fix: Remove the useless concatenation

```js
const a = (foo + "a") + ("b" + "c");
```

code-block.js:1:26 lint/complexity/noUselessStringConcat FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Useless string concatenation.

> 1 │ const a = (foo + "a") + ("b" + "c");
>   │                         ^^^^^^^^^^^^
> 2 │ 

ℹ Consider turning the expression into a single string to improve readability and runtime performance.

ℹ Unsafe fix: Remove the useless concatenation

### Valid

```js
const a = 1 + 1;
```

```js
const a = 1 * '2';
```

```js
const a = 1 - 2;
```

```js
const a = foo + bar;
```

```js
const a = 'foo' + bar;
```

```js
const a = 'foo' +
          'bar';
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options