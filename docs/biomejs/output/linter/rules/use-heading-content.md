# useHeadingContent

Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.

**Diagnostic Category:** `lint/a11y/useHeadingContent`  
**Since:** `v1.0.0`  
**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: Same as: `jsx-a11y/heading-has-content`

## Examples

### Invalid

```jsx
<h1 />
```
Diagnostic: Provide screen reader accessible content when using heading elements.

```jsx
<h1><div aria-hidden /></h1>
```
Diagnostic: Provide screen reader accessible content when using heading elements.

```jsx
<h1 aria-label="Screen reader content" aria-hidden>invisible content</h1>
```
Diagnostic: Provide screen reader accessible content when using heading elements.

```jsx
<h1></h1>
```
Diagnostic: Provide screen reader accessible content when using heading elements.

### Valid

```jsx
<h1>heading</h1>
```

```jsx
<h1><div aria-hidden="true"></div>visible content</h1>
```

```jsx
<h1 aria-label="Screen reader content"><div aria-hidden="true">invisible content</div></h1>
```

```jsx
<h1 dangerouslySetInnerHTML={{ __html: "heading" }} />
```

```jsx
<h1><div aria-hidden />visible content</h1>
```

## Accessibility guidelines

- WCAG 2.4.6

## Related links

- Disable a rule
- Configure the rule fix
- Rule options