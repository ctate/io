# useValidAriaRole

Elements with ARIA roles must use a valid, non-abstract ARIA role.

**Diagnostic Category:** `lint/a11y/useValidAriaRole`

**Since:** `v1.4.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: `jsx-a11y/aria-role`

## Examples

### Invalid

```jsx
<div role="datepicker"></div>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <div role="datepicker"></div>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

```jsx
<div role="range"></div>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <div role="range"></div>
   │ ^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

```jsx
<div role=""></div>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <div role=""></div>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

```jsx
<Foo role="foo"></Foo>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <Foo role="foo"></Foo>
   │ ^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

### Valid

```jsx
<>
  <div role="button"></div>
  <div role={role}></div>
  <div></div>
</>
```

## Options

```json
{
    "//": "...",
    "options": {
        "allowInvalidRoles": ["invalid-role", "text"],
        "ignoreNonDom": true
    }
}
```

## Accessibility guidelines

- WCAG 4.1.2

## Resources

- Chrome Audit Rules, AX_ARIA_01
- DPUB-ARIA roles
- MDN: Using ARIA: Roles, states, and properties

## Related links

- Disable a rule
- Configure the rule fix
- Rule options