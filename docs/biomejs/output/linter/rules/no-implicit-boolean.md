# noImplicitBoolean

Disallow implicit `true` values on JSX boolean attributes

## Diagnostic Category: `lint/style/noImplicitBoolean`

### Since: `v1.0.0`

This rule has a **safe** fix.

Sources: 
- Inspired from: react/jsx-boolean-value

## Examples

### Invalid

```jsx
<input disabled />
```

### Valid

```jsx
<input disabled={false} />
```

```jsx
<input disabled={''} />
```

```jsx
<input disabled={0} />
```

```jsx
<input disabled={undefined} />
```

```jsx
<input disabled='false' />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options