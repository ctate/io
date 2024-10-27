# noUselessLabel

Disallow unnecessary labels.

**Diagnostic Category: `lint/complexity/noUselessLabel`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: no-extra-label

Disallow unnecessary labels. If a loop contains no nested loops or switches, labeling the loop is unnecessary.

## Examples

### Invalid

```js
loop: while(a) {
    break loop;
}
```

code-block.js:2:11 lint/complexity/noUselessLabel FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary label.

1 │ loop: while(a) {
2 │     break loop;
   │          ^^^^
3 │ }
4 │ 

ℹ Safe fix: Remove the unnecessary label. You can achieve the same result without the label.

2 │ break loop;

### Valid

```js
outer: while(a) {
    while(b) {
        break outer;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options