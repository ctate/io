# useAltText

Enforce that all elements that require alternative text have meaningful information to relay back to the end user.

**Diagnostic Category:** `lint/a11y/useAltText`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/alt-text`

This is a critical component of accessibility for screen reader users in order for them to understand the content's purpose on the page. By default, this rule checks for alternative text on the following elements: `<img>`, `<area>`, `<input type="image">`, and `<object>`.

## Examples

### Invalid

```jsx
<img src="image.png" />
```

```
code-block.jsx:1:1 lint/a11y/useAltText ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a text alternative through the alt, aria-label or aria-labelledby attribute

> 1 │ <img src="image.png" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Meaningful alternative text on elements helps users relying on screen readers to understand content's purpose within a page.

ℹ If the content is decorative, redundant, or obscured, consider hiding it from assistive technologies with the aria-hidden attribute.
```

```jsx
<input type="image" src="image.png" />
```

```
code-block.jsx:1:1 lint/a11y/useAltText ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a text alternative through the alt, aria-label or aria-labelledby attribute

> 1 │ <input type="image" src="image.png" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Meaningful alternative text on elements helps users relying on screen readers to understand content's purpose within a page.

ℹ If the content is decorative, redundant, or obscured, consider hiding it from assistive technologies with the aria-hidden attribute.
```

### Valid

```jsx
<img src="image.png" alt="image alt" />
```

```jsx
<input type="image" src="image.png" alt="alt text" />
```

```jsx
<input type="image" src="image.png" aria-label="alt text" />
```

```jsx
<input type="image" src="image.png" aria-labelledby="someId" />
```

## Accessibility guidelines

- WCAG 1.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options