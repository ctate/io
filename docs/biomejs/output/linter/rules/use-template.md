# useTemplate

Prefer template literals over string concatenation.

**Diagnostic Category:** `lint/style/useTemplate`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: prefer-template

## Examples

### Invalid

```js
const s = foo + "baz";
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = foo + "baz";
>   │          ^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

```js
const s = 1 + 2 + "foo" + 3;
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = 1 + 2 + "foo" + 3;
>   │          ^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

```js
const s = 1 * 2 + "foo";
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = 1 * 2 + "foo";
>   │          ^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

```js
const s = 1 + "foo" + 2 + "bar" + "baz" + 3;
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = 1 + "foo" + 2 + "bar" + "baz" + 3;
>   │          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

### Valid

```js
let s = "foo" + "bar" + `baz`;
```

```js
let s = `value: ${1}`;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options