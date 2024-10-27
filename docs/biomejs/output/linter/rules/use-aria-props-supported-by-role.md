# useAriaPropsSupportedByRole

Enforce that ARIA properties are valid for the roles that are supported by the element.

**Diagnostic Category:** `lint/nursery/useAriaPropsSupportedByRole`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `jsx-a11y/role-supports-aria-props`

Invalid ARIA properties can make it difficult for users of assistive technologies to understand the purpose of the element.

## Examples

### Invalid

```jsx
<a href="#" aria-checked />
```
```
code-block.jsx:1:1 lint/nursery/useAriaPropsSupportedByRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The ARIA attribute 'aria-checked' is not supported by this element.

1 │ <a href="#" aria-checked />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Ensure that ARIA attributes are valid for the role of the element.
```

```jsx
<img alt="foobar" aria-checked />
```
```
code-block.jsx:1:1 lint/nursery/useAriaPropsSupportedByRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The ARIA attribute 'aria-checked' is not supported by this element.

1 │ <img alt="foobar" aria-checked />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Ensure that ARIA attributes are valid for the role of the element.
```

### Valid

```js
<>
    <a href="#" aria-expanded />
    <img alt="foobar" aria-hidden />
    <div role="heading" aria-level="1" />
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options