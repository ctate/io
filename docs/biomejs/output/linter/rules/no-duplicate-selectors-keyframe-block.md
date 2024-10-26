# noDuplicateSelectorsKeyframeBlock

Disallow duplicate selectors within keyframe blocks.

## Diagnostic Category
lint/suspicious/noDuplicateSelectorsKeyframeBlock

## Since
v1.8.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/keyframe-block-no-duplicate-selectors

## Examples

### Invalid

```css
@keyframes foo { from {} from {} }
```

```css
@keyframes foo { from {} FROM {} }
```

```css
@keyframes foo { 0% {} 0% {} }
```

### Valid

```css
@keyframes foo { 0% {} 100% {} }
```

```css
@keyframes foo { from {} to {} }
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options