# useKeyWithMouseEvents

Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`.

**Diagnostic Category:** `lint/a11y/useKeyWithMouseEvents`

**Since:** `v1.0.0`

**Note:** 
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: `jsx-a11y/mouse-events-have-key-events`

Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`.

Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Examples

### Invalid

```jsx
<div onMouseOver={() => {}} />
```

```
code-block.jsx:1:1 lint/a11y/useKeyWithMouseEvents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ onMouseOver must be accompanied by onFocus for accessibility.

> 1 │ <div onMouseOver={() => {}} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Actions triggered using mouse events should have corresponding events to account for keyboard-only navigation.
```

```jsx
<div onMouseOut={() => {}} />
```

```
code-block.jsx:1:1 lint/a11y/useKeyWithMouseEvents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ onMouseOut must be accompanied by onBlur for accessibility.

> 1 │ <div onMouseOut={() => {}} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Actions triggered using mouse events should have corresponding events to account for keyboard-only navigation.
```

### Valid

```jsx
<>
  <div onMouseOver={() => {}} onFocus={() => {}} />
  <div onMouseOut={() => {}} onBlur={() => {}} />
  <div onMouseOver={() => {}} {...otherProps} />
  <div onMouseOut={() => {}} {...otherProps} />
  <div onMouseOver={() => {}} onFocus={() => {}} {...otherProps} />
  <div onMouseOut={() => {}} onBlur={() => {}} {...otherProps} />
</>
```

## Accessibility guidelines

- WCAG 2.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options