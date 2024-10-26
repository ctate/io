# noRedundantRoles

**Diagnostic Category: `lint/a11y/noRedundantRoles`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-redundant-roles

Enforce explicit `role` property is not the same as implicit/default role property on an element.

## Examples

### Invalid

```jsx
<article role='article'></article>
```

```jsx
<button role='button'></button>
```

```jsx
<h1 role='heading' aria-level='1'>title</h1>
```

### Valid

```jsx
<article role='presentation'></article>
```

```jsx
<Button role='button'></Button>
```

```jsx
<span></span>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options