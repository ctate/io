# noDistractingElements

## Diagnostic Category: `lint/a11y/noDistractingElements`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-distracting-elements

Enforces that no distracting elements are used.

Elements that can be visually distracting can cause accessibility issues with visually impaired users.
Such elements are most likely deprecated, and should be avoided.
By default, the following elements are visually distracting: `<marquee>` and `<blink>`.

## Examples

### Invalid

```jsx
<marquee />
```

```jsx
<blink />
```

### Valid

```jsx
<div />
```

## Accessibility guidelines

- WCAG 2.2.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options