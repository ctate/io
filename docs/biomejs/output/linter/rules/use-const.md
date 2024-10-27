# useConst

Require `const` declarations for variables that are only assigned once.

**Diagnostic Category: `lint/style/useConst`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: prefer-const

Require `const` declarations for variables that are only assigned once.

Variables that are initialized and never reassigned and variables that are only assigned once can be declared as `const`.

## Examples

### Invalid

```js
let a = 3;
console.log(a);
```

Diagnostic:
```
code-block.js:1:1 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ let a = 3;
   │ ^^^
2 │ console.log(a);
3 │
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

```js
// `a` is redefined (not reassigned) on each loop step.
for (let a of [1, 2, 3]) {
    console.log(a);
}
```

Diagnostic:
```
code-block.js:2:6 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ // `a` is redefined (not reassigned) on each loop step.
2 │ for (let a of [1, 2, 3]) {
   │ ^^^
3 │     console.log(a);
4 │ }
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

```js
// `a` is redefined (not reassigned) on each loop step.
for (let a in [1, 2, 3]) {
    console.log(a);
}
```

Diagnostic:
```
code-block.js:2:6 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ // `a` is redefined (not reassigned) on each loop step.
2 │ for (let a in [1, 2, 3]) {
   │ ^^^
3 │     console.log(a);
4 │ }
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

```js
let a;
a = 0;
```

Diagnostic:
```
code-block.js:1:1 lint/style/useConst ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ let a;
   │ ^^^
2 │ a = 0;
3 │
ℹ 'a' is only assigned here.
```

```js
let a = 3;
{
    let a = 4;
    a = 2;
}
```

Diagnostic:
```
code-block.js:1:1 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ let a = 3;
   │ ^^^
2 │ {
3 │     let a = 4;
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

### Valid

```js
let a = 2;
a = 3;
console.log(a);
```

```js
let a = 1, b = 2;
b = 3;
```

```js
let a;
a; // the variable is read before its assignment
a = 0;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options