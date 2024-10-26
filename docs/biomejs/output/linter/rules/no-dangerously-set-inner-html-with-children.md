# noDangerouslySetInnerHtmlWithChildren

**Diagnostic Category: `lint/security/noDangerouslySetInnerHtmlWithChildren`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/no-danger-with-children

Report when a DOM element or a component uses both `children` and `dangerouslySetInnerHTML` prop.

## Examples

### Invalid

```jsx
function createMarkup() {
    return { __html: 'child' }
}
<Component dangerouslySetInnerHTML={createMarkup()}>"child1"</Component>
```

```jsx
function createMarkup() {
    return { __html: 'child' }
}
<Component dangerouslySetInnerHTML={createMarkup()} children="child1" />
```

```js
React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } }, 'children')
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options