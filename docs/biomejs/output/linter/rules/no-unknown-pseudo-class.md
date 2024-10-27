# noUnknownPseudoClass

This rule disallows unknown pseudo-class selectors in CSS.

**Diagnostic Category:** `lint/nursery/noUnknownPseudoClass`

**Since:** v1.8.0

**Note:** This rule is part of the nursery group.

**Sources:** `stylelint/selector-pseudo-class-no-unknown`

**Description:**

Disallows unknown pseudo-class selectors.  Refer to the MDN web docs for a list of valid pseudo-classes.

This rule ignores vendor-prefixed pseudo-class selectors.


## Examples

### Invalid

```css
a:unknown {}
```

```css
a:UNKNOWN {}
```

```css
a:hoverr {}
```

### Valid

```css
a:hover {}
```

```css
a:focus {}
```

```css
:not(p) {}
```

```css
input:-moz-placeholder {}
```

## Related Links

- Disable a rule
- Configure the rule fix
- Rule options
