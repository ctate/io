# noUnknownUnit

**Description:** Disallow unknown CSS units.

**Diagnostic Category:** `lint/correctness/noUnknownUnit`

**Since:** `v1.8.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: stylelint/unit-no-unknown

Disallow unknown CSS units. For details on known CSS units, see the MDN web docs.

## Examples

### Invalid

```css
a {
  width: 10pixels;
}
```

```
code-block.css:2:12 lint/correctness/noUnknownUnit ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected unknown unit: pixels

  1 │ a {
  2 │   width: 10pixels;
   │           ^^^^^^
  3 │ }
  4 │

ℹ See MDN web docs for more details.

ℹ Use a known unit instead, such as:

- px
- em
- rem
- etc.
```

```css
a {
  width: calc(10px + 10pixels);
}
```

```
code-block.css:2:24 lint/correctness/noUnknownUnit ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected unknown unit: pixels

  1 │ a {
  2 │   width: calc(10px + 10pixels);
   │                       ^^^^^^
  3 │ }
  4 │

ℹ See MDN web docs for more details.

ℹ Use a known unit instead, such as:

- px
- em
- rem
- etc.
```

### Valid

```css
a {
  width: 10px;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: calc(10px + 10px);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options