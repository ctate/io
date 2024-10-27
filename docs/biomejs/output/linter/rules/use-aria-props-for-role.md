# useAriaPropsForRole

Enforce that elements with ARIA roles must have all required ARIA attributes for that role.

**Diagnostic Category:** `lint/a11y/useAriaPropsForRole`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/role-has-required-aria-props`

## Examples

### Invalid

```jsx
<span role="checkbox"></span>
```

code-block.jsx:1:7 lint/a11y/useAriaPropsForRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The element with the checkbox ARIA role does not have the required ARIA attributes.  
> 1 │ <span role="checkbox"></span>  
   │      ^^^^^^^^^^^^^^^^^^^^^  
2 │  

ℹ Missing ARIA prop(s):  
- aria-checked  

```jsx
<span role="heading"></span>
```

code-block.jsx:1:7 lint/a11y/useAriaPropsForRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The element with the heading ARIA role does not have the required ARIA attributes.  
> 1 │ <span role="heading"></span>  
   │      ^^^^^^^^^^^^^^^^^^^^^  
2 │  

ℹ Missing ARIA prop(s):  
- aria-level  

### Valid

```jsx
<span role="checkbox" aria-checked="true"></span>
```

```jsx
<span role="heading" aria-level="1"></span>
```

## Accessibility guidelines

- WCAG 4.1.2

### Resources

- ARIA Spec, Roles
- Chrome Audit Rules, AX_ARIA_03

## Related links

- Disable a rule
- Configure the rule fix
- Rule options