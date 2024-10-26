# noAriaHiddenOnFocusable

**Diagnostic Category: `lint/a11y/noAriaHiddenOnFocusable`**

**Since**: `v1.4.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-aria-hidden-on-focusable

Enforce that aria-hidden="true" is not set on focusable elements.

`aria-hidden="true"` can be used to hide purely decorative content from screen reader users.
A focusable element with `aria-hidden="true"` can be reached by keyboard.
This can lead to confusion or unexpected behavior for screen reader users.

## Example

### Invalid

```jsx
<div aria-hidden="true" tabIndex="0" />
```

```jsx
<a href="/" aria-hidden="true" />
```

### Valid

```jsx
<button aria-hidden="true" tabIndex="-1" />
```

```jsx
<button aria-hidden="true" tabIndex={-1} />
```

```jsx
<div aria-hidden="true"><a href="#"></a></div>
```

## Resources

- aria-hidden elements do not contain focusable elements
- Element with aria-hidden has no content in sequential focus navigation
- MDN aria-hidden

## Related links

- Disable a rule
- Configure the rule fix
- Rule options