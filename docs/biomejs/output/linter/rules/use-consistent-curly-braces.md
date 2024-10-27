# useConsistentCurlyBraces

This rule enforces consistent use of curly braces inside JSX attributes and JSX children.

**Diagnostic Category:** `lint/nursery/useConsistentCurlyBraces`

**Since:** `v1.8.2`

**Note:** This rule has an **unsafe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:**
- Inspired from: react/jsx-curly-brace-presence

This rule checks for and warns about unnecessary curly braces in both JSX props and children. For situations where JSX expressions are unnecessary, refer to the React documentation and the page about JSX gotchas.

## Examples

### Invalid

```jsx
<Foo>{'Hello world'}</Foo>
```
Diagnostic: 
- Should not have curly braces around expression.
- JSX child does not need to be wrapped in curly braces.
- Unsafe fix: Remove curly braces around the expression.

```jsx
<Foo foo={'bar'} />
```
Diagnostic: 
- Should not have curly braces around expression.
- JSX attribute value does not need to be wrapped in curly braces.
- Unsafe fix: Remove curly braces around the expression.

```jsx
<Foo foo=<Bar /> />
```
Diagnostic: 
- Should have curly braces around expression.
- JSX attribute value should be wrapped in curly braces for readability.
- Unsafe fix: Add curly braces around the expression.

### Valid

```jsx
<>
    <Foo>Hello world</Foo>
    <Foo foo="bar" />
    <Foo foo={5} />
    <Foo foo={<Bar />} />
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options