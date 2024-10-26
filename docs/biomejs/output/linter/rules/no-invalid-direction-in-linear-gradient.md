# noInvalidDirectionInLinearGradient

Disallow non-standard direction values for linear gradient functions.

## Diagnostic Category
lint/correctness/noInvalidDirectionInLinearGradient

## Since
v1.9.9

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/function-linear-gradient-no-nonstandard-direction

## Description
Disallow non-standard direction values for linear gradient functions.

A valid and standard direction value is one of the following:

- an angle
- to plus a side-or-corner (to top, to bottom, to left, to right; to top right, to right top, to bottom left, etc.)

A common mistake (matching outdated non-standard syntax) is to use just a side-or-corner without the preceding to.

## Examples

### Invalid

```css
.foo { background: linear-gradient(top, #fff, #000); }
```

```css
.foo { background: linear-gradient(45, #fff, #000); }
```

### Valid

```css
.foo { background: linear-gradient(to top, #fff, #000); }
```

```css
.foo { background: linear-gradient(45deg, #fff, #000); }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options