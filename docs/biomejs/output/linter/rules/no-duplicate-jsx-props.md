# noDuplicateJsxProps

Prevents JSX properties to be assigned multiple times.

**Diagnostic Category: `lint/suspicious/noDuplicateJsxProps`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/jsx-no-duplicate-props

## Examples

### Invalid

```jsx
<Hello name="John" name="John" />
```

```jsx
<label xml:lang="en-US" xml:lang="en-US"></label>
```

### Valid

```jsx
<Hello firstname="John" lastname="Doe" />
```

```jsx
<label xml:lang="en-US" lang="en-US"></label>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options