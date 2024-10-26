# noHeaderScope

**Diagnostic Category: `lint/a11y/noHeaderScope`**

**Since**: `v1.0.0`

:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.
:::

Sources: 
- Same as: jsx-a11y/scope

The scope prop should be used only on `<th>` elements.

## Examples

### Invalid

```jsx
<div scope={scope} />
```

```jsx
<div scope="col" />
```

### Valid

```jsx
<th scope={scope}></th>
```

```jsx
<th scope="col"></th>
```

## Accessibility guidelines

- WCAG 1.3.1
- WCAG 4.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options