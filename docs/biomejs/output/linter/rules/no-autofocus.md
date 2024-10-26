# noAutofocus

**Diagnostic Category: `lint/a11y/noAutofocus`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-autofocus

Enforce that autoFocus prop is not used on elements.

Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.

## Examples

### Invalid

```jsx
<input autoFocus />
```

```jsx
<input autoFocus="true" />
```

```jsx
<input autoFocus={"false"} />
```

```jsx
<input autoFocus={undefined} />
```

### Valid

```jsx
<input />
```

```jsx
<div />
```

```jsx
<button />
```

```jsx
// `autoFocus` prop in user created component is valid
<MyComponent autoFocus={true} />
```

## Resources

- WHATWG HTML Standard, The autofocus attribute
- The accessibility of HTML 5 autofocus

## Related links

- Disable a rule
- Configure the rule fix
- Rule options