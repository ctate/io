# noInteractiveElementToNoninteractiveRole

**Diagnostic Category: `lint/a11y/noInteractiveElementToNoninteractiveRole`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-interactive-element-to-noninteractive-role

Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.

Interactive HTML elements indicate controls in the user interface.
Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.
Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user interface.
Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.

WAI-ARIA roles should not be used to convert an interactive element to a non-interactive element.
Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

## Examples

### Invalid

```jsx
<input role="img" />;
```

### Valid

```jsx
<input role="button" />;
```

```jsx
<canvas role="img" />;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options