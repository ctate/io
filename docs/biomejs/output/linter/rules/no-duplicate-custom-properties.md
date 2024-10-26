# noDuplicateCustomProperties

Disallow duplicate custom properties within declaration blocks.

## Diagnostic Category
lint/nursery/noDuplicateCustomProperties

## Since
v1.9.0

This rule is part of the nursery group.

## Sources
- Same as: stylelint/declaration-block-no-duplicate-custom-properties

## Description
Disallow duplicate custom properties within declaration blocks.

This rule checks the declaration blocks for duplicate custom properties.

## Examples

### Invalid

```css
a { --custom-property: pink; --custom-property: orange;  }
```

```css
a { --custom-property: pink; background: orange; --custom-property: orange }
```

### Valid

```css
a { --custom-property: pink; }
```

```css
a { --custom-property: pink; --cUstOm-prOpErtY: orange; }
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options