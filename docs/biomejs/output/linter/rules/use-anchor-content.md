# useAnchorContent

Enforce that anchors have content and that the content is accessible to screen readers.

**Diagnostic Category:** `lint/a11y/useAnchorContent`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `jsx-a11y/anchor-has-content`

Accessible means the content is not hidden using the `aria-hidden` attribute. Refer to the references to learn about why this is important.

## Examples

### Invalid

```jsx
<a />
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a />
   │ ^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

```jsx
<a></a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a></a>
   │ ^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

```jsx
<a>    </a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a>    </a>
   │ ^^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

```jsx
<a aria-hidden>content</a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a aria-hidden>content</a>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2

ℹ Unsafe fix: Remove the `aria-hidden` attribute to allow the anchor element and its content visible to assistive technologies.
```

```jsx
<a><span aria-hidden="true">content</span></a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a><span aria-hidden="true">content</span></a>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

### Valid

```jsx
<a>content</a>
```

```jsx
function html() {
    return { __html: "foo" }
}
<a dangerouslySetInnerHTML={html()} />
```

```jsx
<a><TextWrapper aria-hidden={true} />content</a>
```

```jsx
<a><div aria-hidden="true"></div>content</a>
```

## Accessibility guidelines

- WCAG 2.4.4
- WCAG 4.1.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options