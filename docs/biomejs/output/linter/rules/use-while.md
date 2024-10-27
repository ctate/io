# useWhile

Enforce the use of `while` loops instead of `for` loops when the initializer and update expressions are not needed.

**Diagnostic Category:** `lint/style/useWhile`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: sonarjs/prefer-while

## Examples

### Invalid

```js
for (; x.running;) {
    x.step();
}
```

code-block.js:1:1 lint/style/useWhile FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use a while loop instead of a for loop.

> 1 │ for (; x.running;) {
> 2 │     x.step();
> 3 │ }

ℹ Prefer a while loop over a for loop without initialization and update.

ℹ Safe fix: Use a while loop.

```js
while (x.running) {
    x.step();
}
```

### Valid

```js
for(let x = 0; x < 10; i++) {}
```

```js
let x = 0
for(; x < 10; i++) {}
```

```js
for(let x = 0; x < 10;) {
    i++
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options