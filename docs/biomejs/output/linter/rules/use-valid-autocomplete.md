# useValidAutocomplete

Use valid values for the `autocomplete` attribute on `input` elements.

**Diagnostic Category:** `lint/nursery/useValidAutocomplete`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `jsx-a11y/autocomplete-valid`

The HTML autocomplete attribute only accepts specific predefined values. This allows for more detailed purpose definitions compared to the `type` attribute. Using these predefined values, user agents and assistive technologies can present input purposes to users in different ways.

## Examples

### Invalid

```jsx
<input type="text" autocomplete="incorrect" />
```

**Error Message:**
code-block.jsx:1:20 lint/nursery/useValidAutocomplete ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use valid values for the autocomplete attribute.  
> 1 │ <input type="text" autocomplete="incorrect" />  
> 2 │  
ℹ The autocomplete attribute only accepts a certain number of specific fixed values.  
ℹ Follow the links for more information,  
WCAG 1.3.5  
HTML Living Standard autofill  
HTML attribute: autocomplete - HTML: HyperText Markup Language | MDN  

### Valid

```jsx
<>
  <input type="text" autocomplete="name" />
  <MyInput autocomplete="incorrect" />
</>
```

## Options

```json
{
    "//": "...",
    "options": {
        "inputComponents": ["MyInput"]
    }
}
```

## Accessibility guidelines

- WCAG 1.3.5

### Resources

- HTML Living Standard autofill
- HTML attribute: autocomplete - HTML: HyperText Markup Language | MDN

## Related links

- Disable a rule
- Configure the rule fix
- Rule options