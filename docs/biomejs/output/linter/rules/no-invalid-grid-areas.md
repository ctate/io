# noInvalidGridAreas

## Diagnostic Category: `lint/correctness/noInvalidGridAreas`

**Since**: `v1.9.9`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/named-grid-areas-no-invalid

Disallows invalid named grid areas in CSS Grid Layouts.

For a named grid area to be valid, all strings must define:

- the same number of cell tokens
- at least one cell token

And all named grid areas that spans multiple grid cells must form a single filled-in rectangle.

## Examples

### Invalid

```css
a { grid-template-areas: "a a"
                         "b b b"; }
```

```text
code-block.css:1:26 lint/correctness/noInvalidGridAreas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ Inconsistent cell count in grid areas are not allowed.

  > 1 │ a { grid-template-areas: "a a"
  │                         ^
  > 2 │                         "b b b"; }
  ℹ Consider adding the same number of cell tokens in each string.
```

```css
a { grid-template-areas: "b b b"
                         ""; }
```

```text
code-block.css:1:33 lint/correctness/noInvalidGridAreas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ Empty grid areas are not allowed.

  > 1 │ a { grid-template-areas: "b b b"
  │
  > 2 │                         ""; }
  │                         ^
  ℹ Consider adding the cell token within string.
```

```css
a { grid-template-areas: "a a a"
                         "b b a"; }
```

```text
code-block.css:1:33 lint/correctness/noInvalidGridAreas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ Duplicate filled in rectangle are not allowed.

  > 1 │ a { grid-template-areas: "a a a"
  │
  > 2 │                         "b b a"; }
  │                         ^^^^^^^
  ℹ Consider removing the duplicated filled-in rectangle: a
```

### Valid

```css
a { grid-template-areas: "a a a"
                         "b b b"; }
```

```css
a { grid-template-areas: "a a a"
                         "a a a"; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options