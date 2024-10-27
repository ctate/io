# useFocusableInteractive

**Description:**  
Elements with an interactive role and interaction handlers must be focusable.

**Diagnostic Category:** `lint/a11y/useFocusableInteractive`  
**Since:** `v1.8.0`  
**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**  
Same as: `jsx-a11y/interactive-supports-focus`

Elements with an interactive role and interaction handlers must be focusable. HTML elements with interactive roles must have `tabIndex` defined to ensure they are focusable. Without `tabIndex`, assistive technologies may not recognize these elements as interactive. Consider switching from an interactive role to its semantic HTML element instead.

## Examples

### Invalid

```jsx
<div role="button" />
```
Diagnostic:  
The HTML element with the interactive role "button" is not focusable.  
Add a `tabIndex` attribute to make this element focusable.

```jsx
<div role="tab" />
```
Diagnostic:  
The HTML element with the interactive role "tab" is not focusable.  
Add a `tabIndex` attribute to make this element focusable.

### Valid

```jsx
<div role="button" tabIndex={0} />
```

```jsx
<div />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options