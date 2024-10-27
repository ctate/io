# noUnknownMediaFeatureName

**Diagnostic Category: `lint/correctness/noUnknownMediaFeatureName`**

**Since**: `v1.8.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources**: 
- Same as: stylelint/media-feature-name-no-unknown

Disallow unknown media feature names. This rule considers media feature names defined in the CSS Specifications, including Editor's Drafts, as known. It also checks vendor-prefixed media feature names.

**Data sources of known CSS media features**:
- MDN reference on CSS media feature
- W3C reference on Media Queries Level 3
- W3C reference on Media Queries Level 4
- W3C reference on Media Queries Level 5

## Examples

### Invalid

```css
@media screen and (unknown > 320px) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media screen and (unknown > 320px) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

```css
@media only screen and (min-width: 320px) and (max-width: 480px) and (unknown: 150dpi) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media only screen and (min-width: 320px) and (max-width: 480px) and (unknown: 150dpi) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

```css
@media (not(unknown < 320px)) and (max-width > 640px) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media (not(unknown < 320px)) and (max-width > 640px) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

```css
@media (400px <= unknown <= 700px) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media (400px <= unknown <= 700px) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

### Valid

```css
@media screen and (width > 320px) {}
```

```css
@media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {}
```

```css
@media (not(min-width < 320px)) and (max-width > 640px) {}
```

```css
@media (400px <= width <= 700px) {}
```

```css
@media screen and (-webkit-width > 320px) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options