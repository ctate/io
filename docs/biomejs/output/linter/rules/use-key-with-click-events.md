# useKeyWithClickEvents

**Description:** Enforce onClick is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`.

**Diagnostic Category:** `lint/a11y/useKeyWithClickEvents`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: `jsx-a11y/click-events-have-key-events`

Enforcing keyboard accessibility is crucial for users with physical disabilities, AT compatibility, and screenreader users. This rule does not apply to interactive or hidden elements.

## Examples

### Invalid

```jsx
<div onClick={() => {}} />
```

```
code-block.jsx:1:1 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

> 1 │ <div onClick={() => {}} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.
```

### Valid

```jsx
<div onClick={() => {}} onKeyDown={handleKeyDown} />
```

```jsx
<div onClick={() => {}} onKeyUp={handleKeyUp} />
```

```jsx
<div onClick={() => {}} onKeyPress={handleKeyPress} />
```

```jsx
// this rule doesn't apply to user created component
<MyComponent onClick={() => {}} />
```

```jsx
<div onClick={() => {}} {...spread}></div>
```

```jsx
<div {...spread} onClick={() => {}} ></div>
```

```jsx
<button onClick={() => console.log("test")}>Submit</button>
```

## Accessibility guidelines

- WCAG 2.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options