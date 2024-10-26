# noChildrenProp

Prevent passing of children as props.

## Diagnostic Category: `lint/correctness/noChildrenProp`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/no-children-prop

Prevent passing of **children** as props.

When using JSX, the children should be nested between the opening and closing tags.
When not using JSX, the children should be passed as additional arguments to `React.createElement`.

## Examples

### Invalid

```jsx
<FirstComponent children={'foo'} />
```

```text
code-block.jsx:1:17 lint/correctness/noChildrenProp ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Avoid passing children using a prop
  1 │ <FirstComponent children={'foo'} />
    │                ^^^^^^^^^^^^^^^
  ℹ The canonical way to pass children in React is to use JSX elements
```

```js
React.createElement('div', { children: 'foo' });
```

```text
code-block.js:1:30 lint/correctness/noChildrenProp ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Avoid passing children using a prop
  1 │ React.createElement('div', { children: 'foo' });
    │                             ^^^^^^^^^^^^^^^
  ℹ The canonical way to pass children in React is to use additional arguments to React.createElement
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options