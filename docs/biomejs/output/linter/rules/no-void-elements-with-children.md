# noVoidElementsWithChildren

This rule prevents void elements (AKA self-closing elements) from having children.

**Diagnostic Category:** `lint/correctness/noVoidElementsWithChildren`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: `react/void-dom-elements-no-children`

## Examples

### Invalid

```jsx
<br>invalid child</br>
```

```
code-block.jsx:1:1 lint/correctness/noVoidElementsWithChildren FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ br is a void element tag and must not have children.
> 1 │ <br>invalid child</br>
   │ ^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the children.
1 │ <br> 
```

```jsx
<img alt="some text" children={"some child"} />
```

```
code-block.jsx:1:1 lint/correctness/noVoidElementsWithChildren FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ img is a void element tag and must not have children.
> 1 │ <img alt="some text" children={"some child"} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the children.
1 │ <img alt="some text" />
```

```js
React.createElement('img', {}, 'child')
```

```
code-block.js:1:1 lint/correctness/noVoidElementsWithChildren FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ img is a void element tag and must not have children.
> 1 │ React.createElement('img', {}, 'child')
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the children.
1 │ React.createElement('img', {});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options