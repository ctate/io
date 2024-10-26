# noPositiveTabindex

**Diagnostic Category: `lint/a11y/noPositiveTabindex`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/tabindex-no-positive

Prevent the usage of positive integers on `tabIndex` property

Avoid positive `tabIndex` property values to synchronize the flow of the page with keyboard tab order.

## Accessibility guidelines

WCAG 2.4.3

## Examples

### Invalid

```jsx
<div tabIndex={1}>foo</div>
```

```jsx
<div tabIndex={"1"} />
```

```js
React.createElement("div", { tabIndex: 1 })
```

### Valid

```jsx
<div tabIndex="0" />
```

```js
React.createElement("div", { tabIndex: -1 })
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options