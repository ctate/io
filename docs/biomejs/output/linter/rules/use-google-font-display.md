# useGoogleFontDisplay

**Description:** Enforces the use of a recommended `display` strategy with Google Fonts.

**Diagnostic Category:** `lint/nursery/useGoogleFontDisplay`

**Since:** `v1.9.4`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `@next/google-font-display`

The `display` property controls how a font is displayed while it is loading. When using Google Fonts, it's important to specify an appropriate value for this property to ensure good user experience and prevent layout shifts.

This rule flags the absence of the `display` parameter, or the usage of less optimal values such as `auto`, `block`, or `fallback`. Using `&display=optional` is generally recommended as it minimizes the risk of invisible text or layout shifts. In cases where swapping to the custom font after it has loaded is important, consider using `&display=swap`.

## Examples

### Invalid

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One" />
```
**Warning:** The Google Font link is missing the `display` parameter.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=auto" />
```
**Warning:** The Google Font link has a non-recommended `display` value.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=block" />
```
**Warning:** The Google Font link has a non-recommended `display` value.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=fallback" />
```
**Warning:** The Google Font link has a non-recommended `display` value.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

### Valid

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional" rel="stylesheet" />
```

```jsx
<link href="https://fonts.googleapis.com/css2?display=unknown" rel="stylesheet" />
```

```jsx
<link rel="stylesheet" />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options