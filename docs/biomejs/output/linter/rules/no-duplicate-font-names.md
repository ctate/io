# noDuplicateFontNames

Disallow duplicate names within font families.

## Diagnostic Category: `lint/suspicious/noDuplicateFontNames`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/font-family-no-duplicate-names

This rule checks the `font` and `font-family` properties for duplicate font names.

This rule ignores var(--custom-property) variable syntaxes now.

## Examples

### Invalid

```css
a { font-family: "Lucida Grande", 'Arial', sans-serif, sans-serif; }
```

```css
a { font-family: 'Arial', "Lucida Grande", Arial, sans-serif; }
```

```css
a { FONT: italic 300 16px/30px Arial, " Arial", serif; }
```

### Valid

```css
a { font-family: "Lucida Grande", "Arial", sans-serif; }
```

```css
b { font: normal 14px/32px -apple-system, BlinkMacSystemFont, sans-serif; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options