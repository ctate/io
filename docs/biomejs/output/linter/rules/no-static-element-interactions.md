# noStaticElementInteractions

**Diagnostic Category: `lint/nursery/noStaticElementInteractions`**

**Since**: `v1.9.0`

:::caution
This rule is part of the nursery group.
:::

Sources: 
- Same as: jsx-a11y/no-static-element-interactions

Enforce that static, visible elements (such as `<div>`) with click handlers use a valid role attribute. Static HTML elements lack semantic meaning, evident in `<div>` and `<span>`, and also in elements like `<a>` without an href attribute, `<meta>`, `<script>`, `<picture>`, `<section>`, and `<colgroup>`. 

The WAI-ARIA role attribute provides semantic mapping to an element, which can be conveyed to users via assistive technology. To add interactivity to a static element, it must have a role value.

## Examples

### Invalid

```jsx
<div onClick={() => {}}></div>;
```
```
code-block.jsx:1:1 lint/nursery/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Static Elements should not be interactive.

> 1 │ <div onClick={() => {}}></div>;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.
```

```jsx
<span onClick={() => {}}></span>;
```
```
code-block.jsx:1:1 lint/nursery/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Static Elements should not be interactive.

> 1 │ <span onClick={() => {}}></span>;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.
```

When `<a>` lacks the "href" attribute, it is non-interactive.

```jsx
<a onClick={() => {}}></a>
```
```
code-block.jsx:1:1 lint/nursery/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Static Elements should not be interactive.

> 1 │ <a onClick={() => {}}></a>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.
```

### Valid

```jsx
<>
    <div role="button" onClick={() => {}}></div>
    <span role="scrollbar" onClick={() => {}}></span>
    <a href="http://example.com" onClick={() => {}}></a>
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options