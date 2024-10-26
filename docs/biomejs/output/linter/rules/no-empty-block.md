# noEmptyBlock

Disallow CSS empty blocks.

## Diagnostic Category: `lint/suspicious/noEmptyBlock`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/block-no-empty

## Examples

### Invalid

```css
p {}
```

```css
.b {}
```

```css
@media print { a {} }
```

### Valid

```css
p {
  color: red;
}
```

```css
p { /* foo */ }
```

```css
@media print { a { color: pink; } }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options