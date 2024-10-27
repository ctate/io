# noShorthandPropertyOverrides

**Description:** Disallow shorthand properties that override related longhand properties.

**Diagnostic Category:** `lint/suspicious/noShorthandPropertyOverrides`

**Since:** `v1.8.2`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: stylelint/declaration-block-no-shorthand-property-overrides

Disallow shorthand properties that override related longhand properties. For details on shorthand properties, see the MDN web docs: developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties.

## Examples

### Invalid

```css
a { padding-left: 10px; padding: 20px; }
```

**Error Message:**
code-block.css:1:25 lint/suspicious/noShorthandPropertyOverrides ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Unexpected shorthand property **padding** after **padding-left**  
> 1 │ a { padding-left: 10px; padding: 20px; }  
>   │                        ^^^^^^^^  
> 2 │  

### Valid

```css
a { padding: 10px; padding-left: 20px; }
```

```css
a { transition-property: opacity; } a { transition: opacity 1s linear; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options