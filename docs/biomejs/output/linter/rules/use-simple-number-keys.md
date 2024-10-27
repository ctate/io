# useSimpleNumberKeys

**Description:** Disallow number literal object member names which are not base10 or use underscore as a separator.

**Diagnostic Category:** `lint/complexity/useSimpleNumberKeys`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

## Examples

### Invalid

```js
({ 0x1: 1 });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Hexadecimal number literal is not allowed here.

> 1 │ ({ 0x1: 1 });
  │   ^^^
2 │

ℹ Safe fix: Replace 0x1 with 1
```

```js
({ 11_1.11: "ee" });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Number literal with underscore is not allowed here.

> 1 │ ({ 11_1.11: "ee" });
  │   ^^^^^^^
2 │

ℹ Safe fix: Replace 11_1.11 with 111.11
```

```js
({ 0o1: 1 });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Octal number literal is not allowed here.

> 1 │ ({ 0o1: 1 });
  │   ^^^
2 │

ℹ Safe fix: Replace 0o1 with 1
```

```js
({ 1n: 1 });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Bigint is not allowed here.

> 1 │ ({ 1n: 1 });
  │   ^^
2 │

ℹ Safe fix: Replace 1n with 1
```

### Valid

```js
({ 0: "zero" });
({ 122: "integer" });
({ 1.22: "floating point" });
({ 3.1e12: "floating point with e" });
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options