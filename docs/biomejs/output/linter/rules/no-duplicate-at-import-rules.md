# noDuplicateAtImportRules

Disallow duplicate `@import` rules.

## Diagnostic Category
lint/suspicious/noDuplicateAtImportRules

## Since
v1.8.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/no-duplicate-at-import-rules

This rule checks if the file urls of the @import rules are duplicates.

This rule also checks the imported media queries and alerts of duplicates.

## Examples

### Invalid

```css
@import 'a.css';
@import 'a.css';
```

```css
@import "a.css";
@import 'a.css';
```

```css
@import url('a.css');
@import url('a.css');
```

### Valid

```css
@import 'a.css';
@import 'b.css';
```

```css
@import url('a.css') tv;
@import url('a.css') projection;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options