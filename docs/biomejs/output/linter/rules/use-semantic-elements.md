# useSemanticElements

**Description:**  
It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead.

**Diagnostic Category:** `lint/a11y/useSemanticElements`  
**Since:** `v1.8.0`  
**Note:**  
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**  
- Same as: `jsx-a11y/prefer-tag-over-role`

The `role` attribute is used to define the purpose of an element, but it should be used as a last resort. Using semantic elements like `<button>`, `<nav>`, and others are more accessible and provide better semantics.

## Examples

### Invalid

```jsx
<div role="checkbox"></div>
```
```
code-block.jsx:1:6 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The elements with the following roles can be changed to the following elements:
  <input type="checkbox">

1 │ <div role="checkbox"></div>
   │     ^^^^^^^^^^
2 │ 

ℹ For examples and more information, see WAI-ARIA Roles
```

```jsx
<div role="separator"></div>
```
```
code-block.jsx:1:6 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The elements with the following roles can be changed to the following elements:
  <hr>

1 │ <div role="separator"></div>
   │     ^^^^^^^^^^
2 │ 

ℹ For examples and more information, see WAI-ARIA Roles
```

### Valid

```jsx
<>
  <input type="checkbox">label</input>
  <hr/>
</>;
```

All elements with `role="img"` are ignored:

```jsx
<div role="img" aria-label="That cat is so cute">
  <p>&#x1F408; &#x1F602;</p>
</div>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options