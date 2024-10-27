# noUnusedTemplateLiteral

Disallow template literals if interpolation and special-character handling are not needed.

**Diagnostic Category:** `lint/style/noUnusedTemplateLiteral`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

## Examples

### Invalid

```js
const foo = `bar`
```
code-block.js:1:13 lint/style/noUnusedTemplateLiteral FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Do not use template literals if interpolation and special-character handling are not needed.  
> 1 │ const foo = `bar`  
  │ ^^^^^  
ℹ Unsafe fix: Replace with string literal  
1 │ const foo = "bar"  

```js
const foo = `bar `
```
code-block.js:1:13 lint/style/noUnusedTemplateLiteral FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Do not use template literals if interpolation and special-character handling are not needed.  
> 1 │ const foo = `bar `  
  │ ^^^^^^  
ℹ Unsafe fix: Replace with string literal  
1 │ const foo = "bar "  

### Valid

```js
const foo = `bar
has newline`;
```

```js
const foo = `"bar"`
```

```js
const foo = `'bar'`
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options