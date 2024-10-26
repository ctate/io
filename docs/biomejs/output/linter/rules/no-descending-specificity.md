# noDescendingSpecificity

Disallow a lower specificity selector from coming after a higher specificity selector.

## Diagnostic Category: `lint/nursery/noDescendingSpecificity`

### Since: `v1.9.3`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/no-descending-specificity

Disallow a lower specificity selector from coming after a higher specificity selector.

This rule prohibits placing selectors with lower specificity after selectors with higher specificity.
By maintaining the order of the source and specificity as consistently as possible, it enhances readability.

## Examples

### Invalid

```css
b a { color: red; }
a { color: red; }
```

```css
a {
  & > b { color: red; }
}
b { color: red; }
```

```css
:root input {
    color: red;
}
html input {
    color: red;
}
```

### Valid

```css
a { color: red; }
b a { color: red; }
```

```css
b { color: red; }
a {
  & > b { color: red; }
}
```

```css
a:hover { color: red; }
a { color: red; }
```

```css
a b {
    color: red;
}
/* This selector is overwritten by the one above it, but this is not an error because the rule only evaluates it as a compound selector */
:where(a) :is(b) {
    color: blue;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options