# noSuspiciousSemicolonInJsx

**Diagnostic Category: `lint/suspicious/noSuspiciousSemicolonInJsx`**

**Since**: `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code. It detects possible "wrong" semicolons inside JSX elements. Semicolons that appear after a self-closing element or a closing element are usually the result of a typo or a refactor gone wrong.

## Examples

### Invalid

```jsx
const Component = () => {
  return (
    <div>
      <div />;
    </div>
 );
}
```

**Error Message:**
code-block.jsx:4:14 lint/suspicious/noSuspiciousSemicolonInJsx ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ There is a suspicious semicolon in the JSX element.  
2 │ return (  
3 │ <div>  
4 │ <div />;  
   │ ^  
5 │ </div>  
6 │ );  
7 │ }  

ℹ This is usually the result of a typo or some refactor gone wrong.  
ℹ Remove the semicolon, or move it inside a JSX element.  

### Valid

```jsx
const Component = () => {
  return (
    <div>
      <div />
      ;
    </div>
  );
}
const Component2 = () => {
  return (
    <div>
      <span>;</span>
    </div>
  );
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options