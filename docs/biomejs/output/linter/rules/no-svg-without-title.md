# Introduction

**Diagnostic Category: `lint/a11y/noSvgWithoutTitle`**

**Since**: `v1.0.0`

This rule enforces the usage of the `title` element for the `svg` element. A diagnostic error will appear when linting your code.

To make SVG accessible, you can:

- Provide the `title` element as the first child of `svg`.
- Use `role="img"` and `aria-label` or `aria-labelledby` on `svg`.

## Examples

### Invalid

```jsx
<svg>foo</svg>
```
Error: Alternative text title element cannot be empty.

```jsx
<svg>
    <title></title>
    <circle />
</svg>
```
Error: Alternative text title element cannot be empty.

```jsx
<svg role="img" aria-label="">
    <span id="">Pass</span>
</svg>
```

```jsx
<svg role="presentation">foo</svg>
```

### Valid

```jsx
<svg>
    <rect />
    <rect />
    <g>
        <circle />
        <circle />
        <g>
            <title>Pass</title>
            <circle />
            <circle />
        </g>
    </g>
</svg>
```

```jsx
<svg>
    <title>Pass</title>
    <circle />
</svg>
```

```jsx
<svg role="img" aria-labelledby="title">
    <span id="title">Pass</span>
</svg>
```

```jsx
<svg role="img" aria-label="title">
    <span id="title">Pass</span>
</svg>
```

```jsx
<svg role="graphics-symbol"><rect /></svg>
```

```jsx
<svg role="graphics-symbol img"><rect /></svg>
```

```jsx
<svg aria-hidden="true"><rect /></svg>
```

## Accessibility guidelines

- Document Structure – SVG 1.1 (Second Edition) https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements
- ARIA: img role - Accessibility | MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role
- Accessible SVGs | CSS-Tricks https://css-tricks.com/accessible-svgs/
- Contextually Marking up accessible images and SVGs | scottohara.me https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html
- Accessible SVGs https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs

## Related links

- Disable a rule https://biomejs.dev/linter/#disable-a-lint-rule
- Configure the rule fix https://biomejs.dev/linter#configure-the-rule-fix
- Rule options https://biomejs.dev/linter/#rule-options