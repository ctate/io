# useFragmentSyntax

**Description:** This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`.

**Diagnostic Category:** `lint/style/useFragmentSyntax`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `react/jsx-fragments`

This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`. The shorthand fragment syntax saves keystrokes and is only inapplicable when keys are required.

## Examples

### Invalid

```jsx
<Fragment>child</Fragment>
```

**Diagnostic Message:**
- FIXABLE
- ⚠ Use shorthand syntax for Fragment elements instead of standard syntax.

**Suggested Fix:**
Replace `<Fragment>` with the fragment syntax.

### Invalid

```jsx
<React.Fragment>child</React.Fragment>
```

**Diagnostic Message:**
- FIXABLE
- ⚠ Use shorthand syntax for Fragment elements instead of standard syntax.

**Suggested Fix:**
Replace `<React.Fragment>` with the fragment syntax.

## Related Links

- Disable a rule
- Configure the rule fix
- Rule options