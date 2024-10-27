# noUnsafeNegation

**Description:** Disallow using unsafe negation.

**Diagnostic Category:** `lint/suspicious/noUnsafeNegation`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `no-unsafe-negation` from eslint.org/docs/latest/rules/no-unsafe-negation

## Disallow using unsafe negation.

### Examples

#### Invalid

```js
!1 in [1,2];
```
```
code-block.js:1:1 lint/suspicious/noUnsafeNegation FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The negation operator is used unsafely on the left side of this binary expression.

> 1 │ !1 in [1,2];
  │ ^^^^^^^^^^^
  
ℹ Unsafe fix: Wrap the expression with a parenthesis

1 │ !(1 in [1,2]);
  │ ++
```

```js
/**test*/!/** test*/1 instanceof [1,2];
```
```
code-block.js:1:10 lint/suspicious/noUnsafeNegation FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The negation operator is used unsafely on the left side of this binary expression.

> 1 │ /**test*/!/** test*/1 instanceof [1,2];
  │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Unsafe fix: Wrap the expression with a parenthesis

1 │ /**test*/!/** test*/(1 instanceof [1,2]);
  │ ++
```

### Valid

```js
-1 in [1,2];
~1 in [1,2];
typeof 1 in [1,2];
void 1 in [1,2];
delete 1 in [1,2];
+1 instanceof [1,2];
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options