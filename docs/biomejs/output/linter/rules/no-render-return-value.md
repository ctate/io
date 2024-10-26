# noRenderReturnValue

Diagnostic Category: `lint/correctness/noRenderReturnValue`

**Since**: `v1.0.0`

Prevent the usage of the return value of `React.render`.

`ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a callback ref to the root element.

Source: ReactDOM documentation https://facebook.github.io/react/docs/react-dom.html#render

## Examples

### Invalid

```jsx
const foo = ReactDOM.render(<div />, document.body);
```

### Error Message

Do not depend on the value returned by the function `ReactDOM.render()`. The returned value is legacy and future versions of React might return that value asynchronously. Check the React documentation for more information.

### Valid

```jsx
ReactDOM.render(<div />, document.body);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options