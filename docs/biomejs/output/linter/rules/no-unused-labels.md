# noUnusedLabels

**Description:** Disallow unused labels.

**Diagnostic Category:** `lint/correctness/noUnusedLabels`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** Same as: no-unused-labels

Disallow unused labels. Labels that are declared and never used are most likely an error due to incomplete refactoring. The rule ignores reactive Svelte statements in Svelte components.

## Examples

### Invalid

```js
LOOP: for (const x of xs) {
    if (x > 0) {
        break;
    }
    f(x);
}
```

```
code-block.js:1:1 lint/correctness/noUnusedLabels FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unused label.

> 1 │ LOOP: for (const x of xs) {
   │ ^^^^
  2 │     if (x > 0) {
  3 │         break;

ℹ The label is not used by any break statement and continue statement.

ℹ Safe fix: Remove the unused label.
```

### Valid

```js
LOOP: for (const x of xs) {
    if (x > 0) {
        break LOOP;
    }
    f(x);
}
```

```js
function nonNegative(n) {
    DEV: assert(n >= 0);
    return n;
}
```

```svelte
<script>
$: { /* reactive block */ }
</script>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options