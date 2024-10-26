# noNoninteractiveTabindex

## Diagnostic Category: `lint/a11y/noNoninteractiveTabindex`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-noninteractive-tabindex

Enforce that `tabIndex` is not assigned to non-interactive HTML elements.

When using the tab key to navigate a webpage, limit it to interactive elements.
You don't need to add tabindex to items in an unordered list as assistive technology can navigate through the HTML.
Keep the tab ring small, which is the order of elements when tabbing, for a more efficient and accessible browsing experience.

## Examples

### Invalid

```jsx
<div tabIndex="0" />
```

```jsx
<div role="article" tabIndex="0" />
```

```jsx
<article tabIndex="0" />
```

### Valid

```jsx
<div />
```

```jsx
<MyButton tabIndex={0} />
```

```jsx
<article tabIndex="-1" />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options