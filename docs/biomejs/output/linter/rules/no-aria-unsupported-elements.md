# noAriaUnsupportedElements

**Diagnostic Category: `lint/a11y/noAriaUnsupportedElements`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/aria-unsupported-elements

Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.

## Examples

### Invalid

```jsx
<meta charset="UTF-8" role="meta" />
```

```jsx
<html aria-required="true" />
```

### Valid

```jsx
<meta charset="UTF-8" />
```

```jsx
<html></html>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options