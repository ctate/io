# useGenericFontNames

Disallow a missing generic family keyword within font families.

**Diagnostic Category:** `lint/a11y/useGenericFontNames`

**Since:** `v1.8.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/font-family-no-missing-generic-family-keyword

Disallow a missing generic family keyword within font families.

The generic font family can be:

- Placed anywhere in the font family list
- Omitted if a keyword related to property inheritance or a system font is used

This rule checks the font and font-family properties. The following special situations are ignored:

- Property with a keyword value such as `inherit`, `initial`.
- The last value being a CSS variable.
- `font-family` property in an `@font-face` rule.

## Examples

### Invalid

```css
a { font-family: Arial; }
```

code-block.css:1:18 lint/a11y/useGenericFontNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Generic font family missing.

> 1 │ a { font-family: Arial; }
>   │                 ^^^^^^^^^
> 2 │ 

ℹ Consider adding a generic font family as a fallback.

ℹ For examples and more information, see the MDN Web Docs

- serif
- sans-serif
- monospace
- etc.

```css
a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }
```

code-block.css:1:43 lint/a11y/useGenericFontNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Generic font family missing.

> 1 │ a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }
>   │                                          ^^^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Consider adding a generic font family as a fallback.

ℹ For examples and more information, see the MDN Web Docs

- serif
- sans-serif
- monospace
- etc.

### Valid

```css
a { font-family: "Lucida Grande", "Arial", sans-serif; }
```

```css
a { font-family: inherit; }
```

```css
a { font-family: sans-serif; }
```

```css
a { font-family: var(--font); }
```

```css
@font-face { font-family: Gentium; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options