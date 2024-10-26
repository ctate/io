# noConfusingLabels

Disallow labeled statements that are not loops.

## Diagnostic Category
lint/suspicious/noConfusingLabels

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Inspired from: no-labels

Labeled statements in JavaScript are used in conjunction with `break` and `continue` to control flow around multiple loops. Their use for other statements is suspicious and unfamiliar.

The rule ignores reactive Svelte statements in Svelte components.

## Examples

### Invalid

```js
label: f();
```

```js
label: {
    f();
    break label;
}
```

```js
label: if (a) {
    f()
    break label;
}
```

```js
label: switch (a) {
    case 0:
        break label;
}
```

### Valid

```js
outer: while (a) {
    while(b) {
        break outer;
    }
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