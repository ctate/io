# noInvalidPositionAtImportRule

Disallow the use of `@import` at-rules in invalid positions.

## Diagnostic Category
lint/correctness/noInvalidPositionAtImportRule

## Since
v1.8.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/no-invalid-position-at-import-rule

## Description
Any `@import` rules must precede all other valid at-rules and style rules in a stylesheet (ignoring `@charset` and `@layer`), or else the `@import` rule is invalid.

## Examples

### Invalid
```css
a {}
@import 'foo.css';
```

### Error Message
```
code-block.css:2:2 lint/correctness/noInvalidPositionAtImportRule 
This @import is in the wrong position.
 
 1 │ a {}
> 2 │ @import 'foo.css';
 │   ^^^^^^^^^^^^^^^^^^^
 
ℹ Any @import rules must precede all other valid at-rules and style rules in a stylesheet (ignoring @charset and @layer), or else the @import rule is invalid.
 
ℹ Consider moving import position.
```

### Valid
```css
@import 'foo.css';
a {}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options