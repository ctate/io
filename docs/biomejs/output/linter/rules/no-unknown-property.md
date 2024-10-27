# noUnknownProperty

**Diagnostic Category: `lint/correctness/noUnknownProperty`**

**Since**: `v1.8.0`

**Note**: This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources**: Same as: stylelint/property-no-unknown

Disallow unknown properties. This rule considers properties defined in the CSS Specifications and browser-specific properties to be known. For more information, visit known-css-properties#source.

**This rule ignores**:
- Custom variables (e.g., `--custom-property`)
- Vendor-prefixed properties (e.g., `-moz-align-self`, `-webkit-align-self`)

## Examples

### Invalid

```css
a {
  colr: blue;
}
```
```
code-block.css:2:3 lint/correctness/noUnknownProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown property is not allowed.

1 │ a {
2 │   colr: blue;
   │  ^^^^^^^^^^
3 │ }
4 │

ℹ See CSS Specifications and browser specific properties for more details.
ℹ To resolve this issue, replace the unknown property with a valid CSS property.
```

```css
a {
  my-property: 1;
}
```
```
code-block.css:2:3 lint/correctness/noUnknownProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown property is not allowed.

1 │ a {
2 │   my-property: 1;
   │  ^^^^^^^^^^^^^^
3 │ }
4 │

ℹ See CSS Specifications and browser specific properties for more details.
ℹ To resolve this issue, replace the unknown property with a valid CSS property.
```

### Valid

```css
a {
  color: green;
}
```

```css
a {
  fill: black;
}
```

```css
a {
  -moz-align-self: center;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options