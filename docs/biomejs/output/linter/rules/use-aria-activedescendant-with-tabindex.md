# useAriaActivedescendantWithTabindex

Enforce that `tabIndex` is assigned to non-interactive HTML elements with `aria-activedescendant`.

**Diagnostic Category: `lint/a11y/useAriaActivedescendantWithTabindex`**

**Since**: `v1.3.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `jsx-a11y/aria-activedescendant-has-tabindex`

`aria-activedescendant` is used to manage focus within a composite widget. The element with the attribute `aria-activedescendant` retains the active document focus. It indicates which of its child elements has a secondary focus by assigning the ID of that element to the value of `aria-activedescendant`. This pattern is used to build a widget like a search typeahead select list. The search input box retains document focus so that the user can type in the input. If the down arrow key is pressed and a search suggestion is highlighted, the ID of the suggestion element will be applied as the value of `aria-activedescendant` on the input element.

Because an element with `aria-activedescendant` must be tabbable, it must either have an inherent tabIndex of zero or declare a tabIndex attribute.

## Examples

### Invalid

```jsx
<div aria-activedescendant={someID} />
```

Diagnostic message:
```
code-block.jsx:1:1 lint/a11y/useAriaActivedescendantWithTabindex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce elements with aria-activedescendant are tabbable.

> 1 │ <div aria-activedescendant={someID} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ aria-activedescendant is used to manage focus within a composite widget.
The element with the attribute aria-activedescendant retains the active document focus.

ℹ Add the tabIndex attribute to the element with a value greater than or equal to -1.

ℹ Unsafe fix: Add the tabIndex attribute.

1 │ <div aria-activedescendant={someID} tabIndex="0" />
   │ ++++++++++++++++
```

### Valid

```jsx
<div aria-activedescendant={someID} tabIndex={0} />
```

```jsx
<input aria-activedescendant={someID} />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options