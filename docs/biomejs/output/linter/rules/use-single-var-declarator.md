# useSingleVarDeclarator

Disallow multiple variable declarations in the same variable statement.

**Diagnostic Category:** `lint/style/useSingleVarDeclarator`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: `one-var` from ESLint documentation.

In JavaScript, multiple variables can be declared within a single `var`, `const`, or `let` declaration. It is often considered a best practice to declare every variable separately. This rule enforces that practice.

## Examples

### Invalid

```js
let foo = 0, bar, baz;
```

Diagnostic output:
```
code-block.js:1:1 lint/style/useSingleVarDeclarator FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Declare variables separately

> 1 │ let foo = 0, bar, baz;
  │ ^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Break out into multiple declarations

1 │ let foo = 0, bar, baz;
2 │ let bar;
3 │ let baz;
```

### Valid

```js
const foo = 0;
let bar;
let baz;
```

```js
for (let i = 0, x = 1; i < arr.length; i++) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options