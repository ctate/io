# noDangerouslySetInnerHtml

**Diagnostic Category: `lint/security/noDangerouslySetInnerHtml`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/no-danger

Prevent the usage of dangerous JSX props

## Examples

### Invalid

```jsx
function createMarkup() {
    return { __html: 'child' }
}
<div dangerouslySetInnerHTML={createMarkup()}></div>
```

```js
React.createElement('div', {
    dangerouslySetInnerHTML: { __html: 'child' }
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options