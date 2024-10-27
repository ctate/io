# useHookAtTopLevel

Enforce that all React hooks are being called from the Top Level component functions.

**Diagnostic Category:** `lint/correctness/useHookAtTopLevel`  
**Since:** `v1.0.0`  
**Sources:** Same as: `react-hooks/rules-of-hooks`

_This rule should be used only in **React** projects._

To understand why this is required, see: reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level

## Examples

### Invalid

```js
function Component1({ a }) {
    if (a == 1) {
        useEffect();
    }
}
```

**Warning:** This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

```js
function Component1({ a }) {
    if (a != 1) {
        return;
    }

    useEffect();
}
```

**Warning:** This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

### Valid

```js
function Component1() {
    useEffect();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options