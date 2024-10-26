# noNoninteractiveElementToInteractiveRole

**Diagnostic Category: `lint/a11y/noNoninteractiveElementToInteractiveRole`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-noninteractive-element-to-interactive-role

Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements.

Non-interactive HTML elements indicate _content_ and _containers_ in the user interface.
Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.

Interactive HTML elements indicate _controls_ in the user interface.
Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.

[WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert a non-interactive element to an interactive element.
Interactive ARIA roles include `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` and `textbox`.

## Examples

### Invalid

```jsx
<h1 role="button">Some text</h1>
```

### Valid

```jsx
<span role="button">Some text</span>
```

## Accessibility guidelines

- WCAG 4.1.2

### Resources

- WAI-ARIA roles
- WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets
- Fundamental Keyboard Navigation Conventions
- Mozilla Developer Network - ARIA Techniques

## Related links

- Disable a rule
- Configure the rule fix
- Rule options