# useIframeTitle

**Description:** Enforces the usage of the attribute `title` for the element `iframe`.

**Diagnostic Category:** `lint/a11y/useIframeTitle`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: `jsx-a11y/iframe-has-title`

Enforces the usage of the attribute `title` for the element `iframe`.

## Examples

### Invalid

```jsx
<iframe />
```

```
code-block.jsx:1:2 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe></iframe>
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe></iframe>
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title="" />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title="" />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={""} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={""} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={undefined} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={undefined} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={false} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={false} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={true} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={true} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={42} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={42} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

### Valid

```jsx
<>
  <iframe title="This is a unique title" />
  <iframe title={uniqueTitle} />
  <iframe {...props} />
</>
```

## Accessibility guidelines

- WCAG 2.4.1
- WCAG 4.1.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options