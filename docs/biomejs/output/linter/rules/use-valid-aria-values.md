# useValidAriaValues

Enforce that ARIA state and property values are valid.

**Diagnostic Category:** `lint/a11y/useValidAriaValues`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/aria-proptypes`

## Examples

### Invalid

```jsx
<span role="checkbox" aria-checked="test">some text</span>
```
```
code-block.jsx:1:23 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-checked is not correct.
1 │ <span role="checkbox" aria-checked="test">some text</span>
   │                      ^^^^^^^^^^^^
ℹ The only supported value for the aria-checked property is one of the following:
- true
- false
- mixed
```

```jsx
<span aria-labelledby="">some text</span>
```
```
code-block.jsx:1:7 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-labelledby is not correct.
1 │ <span aria-labelledby="">some text</span>
   │      ^^^^^^^^
ℹ The only supported value is a space-separated list of HTML identifiers.
```

```jsx
<span aria-valuemax="hey">some text</span>
```
```
code-block.jsx:1:7 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-valuemax is not correct.
1 │ <span aria-valuemax="hey">some text</span>
   │      ^^^^^^
ℹ The only supported value is number.
```

```jsx
<span aria-orientation="hey">some text</span>
```
```
code-block.jsx:1:7 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-orientation is not correct.
1 │ <span aria-orientation="hey">some text</span>
   │      ^^^^^^^^^^^
ℹ The only supported value for the aria-orientation property is one of the following:
- vertical
- undefined
- horizontal
```

### Valid

```jsx
<>
    <span role="checkbox" aria-checked={checked}>some text</span>
    <span aria-labelledby="fooId barId">some text</span>
</>
```

## Accessibility guidelines

- WCAG 4.1.2

### Resources

- ARIA Spec, States and Properties
- Chrome Audit Rules, AX_ARIA_04

## Related links

- Disable a rule
- Configure the rule fix
- Rule options