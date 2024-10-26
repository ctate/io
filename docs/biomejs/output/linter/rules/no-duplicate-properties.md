# noDuplicateProperties

Disallow duplicate properties within declaration blocks.

## Diagnostic Category
`lint/nursery/noDuplicateProperties`

## Since
`v1.9.4`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/declaration-block-no-duplicate-properties

## Examples

### Invalid

```css
a {
  color: pink;
  color: orange;
}
```

Duplicate properties can lead to unexpected behavior and may override previous declarations unintentionally.

1 │ a {
2 │   color: pink;
> 3 │   color: orange;
   │   ^^^^^^^^^^^^^^^
4 │ }
5 │

ℹ color is already defined here.

1 │ a {
> 2 │   color: pink;
   │   ^^^^^^^^^^^
3 │   color: orange;
4 │ }

ℹ Remove or rename the duplicate property to ensure consistent styling.

### Valid

```css
a {
  color: pink;
  background: orange;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options