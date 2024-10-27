# useValidAriaProps

Ensures that ARIA properties `aria-*` are all valid.

**Diagnostic Category: `lint/a11y/useValidAriaProps`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `jsx-a11y/aria-props`

## Examples

### Invalid

```jsx
<input className="" aria-labell="" />
```

code-block.jsx:1:1 lint/a11y/useValidAriaProps FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The element contains invalid ARIA attribute(s)

1 │ <input className="" aria-labell="" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ aria-labell is not a valid ARIA attribute.

1 │ <input className="" aria-labell="" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the invalid aria-* attribute. Check the list of all valid aria-* attributes.

```jsx
<div aria-lorem="foobar" />;
```

code-block.jsx:1:1 lint/a11y/useValidAriaProps FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The element contains invalid ARIA attribute(s)

1 │ <div aria-lorem="foobar" />;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ aria-lorem is not a valid ARIA attribute.

1 │ <div aria-lorem="foobar" />;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the invalid aria-* attribute. Check the list of all valid aria-* attributes.

## Accessibility guidelines

- WCAG 4.1.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options