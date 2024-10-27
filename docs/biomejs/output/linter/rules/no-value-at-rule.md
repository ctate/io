# noValueAtRule

Disallow use of `@value` rule in CSS modules.

**Diagnostic Category:** `lint/nursery/noValueAtRule`  
**Since:** `v1.8.0`  
**Caution:** This rule is part of the nursery group.

Use of CSS variables is recommended instead of `@value` rule.

## Examples

### Invalid

```css
@value red: #FF0000;
```

code-block.css:1:2 parse  
✖ @value at-rule is not a standard CSS feature.  
> 1 │ @value red: #FF0000;  
  │ ^^^^^  
2 │  

ℹ You can enable @value at-rule parsing by setting the `css.parser.cssModules` option to `true` in your configuration file.

### Valid

```css
:root {
  --red: #FF0000;
}

p {
  background-color: var(--red);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options