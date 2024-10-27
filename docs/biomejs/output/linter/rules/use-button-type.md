# useButtonType

Enforces the usage of the attribute `type` for the element `button`.

**Diagnostic Category:** `lint/a11y/useButtonType`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/button-has-type

## Examples

### Invalid

```jsx
<button>Do something</button>
```

```
code-block.jsx:1:1 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide an explicit type prop for the button element.

> 1 │ <button>Do something</button>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   
ℹ The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

ℹ Allowed button types are: submit, button or reset
```

```jsx
<button type="incorrectType">Do something</button>
```

```
code-block.jsx:1:14 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid type prop for the button element.

> 1 │ <button type="incorrectType">Do something</button>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   
ℹ The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

ℹ Allowed button types are: submit, button or reset
```

```js
React.createElement('button');
```

```
code-block.js:1:21 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide an explicit type prop for the button element.

> 1 │ React.createElement('button');
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   
ℹ The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

ℹ Allowed button types are: submit, button or reset
```

### Valid

```jsx
<>
    <button type="button">Do something</button>
    <button type={buttonType}>Do something</button>
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options