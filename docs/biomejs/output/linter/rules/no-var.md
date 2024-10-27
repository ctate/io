# noVar

**Description:** Disallow the use of `var`

**Diagnostic Category:** `lint/style/noVar`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: no-var

Disallow the use of `var`

ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the let and const keywords. Block scope is common in many other programming languages and helps programmers avoid mistakes.

## Examples

### Invalid

```js
var foo = 1;
```

code-block.js:1:1 lint/style/noVar FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use let or const instead of var.

> 1 │ var foo = 1;
>   │ ^^^^^^^^^^^
> 2 │ 

ℹ A variable declared with var is accessible in the whole module. Thus, the variable can be accessed before its initialization and outside the block where it is declared.

ℹ See MDN web docs for more details.

ℹ Unsafe fix: Use 'const' instead.

### Valid

```js
const foo = 1;
let bar = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options