# noArrayIndexKey

## Diagnostic Category: `lint/suspicious/noArrayIndexKey`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Same as: react/no-array-index-key

Discourage the usage of Array index in keys.

We don’t recommend using indexes for keys if the order of items may change.
This can negatively impact performance and may cause issues with component state.
Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key: https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

Source: React documentation https://reactjs.org/docs/lists-and-keys.html#keys

## Examples

### Invalid

```jsx
something.forEach((Element, index) => {
    <Component key={index} >foo</Component>
});
```

```jsx
React.Children.map(this.props.children, (child, index) => (
    React.cloneElement(child, { key: index })
))
```

```jsx
something.forEach((Element, index) => {
    <Component key={`test-key-${index}`} >foo</Component>
});
```

```jsx
something.forEach((Element, index) => {
    <Component key={"test" + index} >foo</Component>
});
```

### Valid

```jsx
something.forEach((item) => {
    <Component key={item.id} >foo</Component>
});
```

```jsx
something.forEach((item) => {
    <Component key={item.baz.foo} >foo</Component>
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options