# noMissingVarFunction

Disallow missing var function for css variables.

**Diagnostic Category: `lint/nursery/noMissingVarFunction`**

**Since**: `v1.9.2`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/custom-property-no-missing-var-function

This rule has the following limitations:

- It only reports custom properties that are defined and accesible within the same source.
- It does not check properties that can contain author-defined identifiers.
- It ignores the following properties:
  - animation
  - animation-name
  - counter-increment
  - counter-reset
  - counter-set
  - grid-column
  - grid-column-end
  - grid-column-start
  - grid-row
  - grid-row-end
  - grid-row-start
  - list-style
  - list-style-type
  - transition
  - transition-property
  - view-transition-name
  - will-change

## Examples

### Invalid

```css
a {
  --foo: red;
  color: --foo;
}
```

CSS variables '--foo' is used without the 'var()' function

```css
.parent {
  --foo: red;
  .child {
    color: --foo;
  }
}
```

CSS variables '--foo' is used without the 'var()' function

```css
@property --bar {}

a {
  color: --bar;
}
```

CSS variables '--bar' is used without the 'var()' function

```css
:root {
  --baz: 0;
}

a {
  --foo: --baz;
}
```

CSS variables '--baz' is used without the 'var()' function

### Valid

```css
p {
  color: var(--foo);
}
```

```css
p {
  --foo: red;
  color: var(--foo);
}
```

```css
p {
  color: --foo;
}
```

```css
*:root {
--global: red;
}

a {
    color: var(--global);
}
```

```css
@property --global-value {}
a {
  color: var(--global-value);
}
```

```css
a {
  view-transition-name: --bbb;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options