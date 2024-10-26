# noRedundantAlt

**Diagnostic Category: `lint/a11y/noRedundantAlt`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/img-redundant-alt

Enforce `img` alt prop does not contain the word "image", "picture", or "photo".

The rule will first check if `aria-hidden` is truthy to determine whether to enforce the rule. If the image is hidden, then the rule will always succeed.

## Examples

### Invalid

```jsx
<img src="src" alt="photo content" />;
```

```jsx
<img alt={`picture doing ${things}`} {...this.props} />;
```

```jsx
<img alt="picture of cool person" aria-hidden={false} />;
```

### Valid

```jsx
<>
	<img src="src" alt="alt" />
	<img src="src" alt={photo} />
	<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" />
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options