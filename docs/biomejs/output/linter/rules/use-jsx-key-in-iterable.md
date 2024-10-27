# useJsxKeyInIterable

Disallow missing key props in iterators/collection literals.

**Diagnostic Category:** `lint/correctness/useJsxKeyInIterable`

**Since:** `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `react/jsx-key`

Disallow missing key props in iterators/collection literals.

Warn if an element that likely requires a key prop—namely, one present in an array literal or an arrow function expression. Check out React documentation for explanation on why React needs keys.

## Examples

### Invalid

```jsx
[<Hello />];
```

code-block.jsx:1:2 lint/correctness/useJsxKeyInIterable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Missing key property for this element in iterable.

1 │ [<Hello />];
   │ ^^^^^^^^^^
2 │ 

ℹ The order of the items may change, and having a key can help React identify which item was moved.

```jsx
data.map((x) => <Hello>{x}</Hello>);
```

code-block.jsx:1:17 lint/correctness/useJsxKeyInIterable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Missing key property for this element in iterable.

1 │ data.map((x) => <Hello>{x}</Hello>);
   │ ^^^^^^^^
2 │ 

ℹ The order of the items may change, and having a key can help React identify which item was moved.

### Valid

```jsx
[<Hello key="first" />, <Hello key="second" />, <Hello key="third" />];
data.map((x) => <Hello key={x.id}>{x}</Hello>);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options