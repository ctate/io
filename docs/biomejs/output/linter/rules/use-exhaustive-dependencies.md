# useExhaustiveDependencies

Enforce all dependencies are correctly specified in a React hook.

**Diagnostic Category:** `lint/correctness/useExhaustiveDependencies`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `react-hooks/exhaustive-deps`

This rule is a port of the rule `react-hooks/exhaustive-deps`, and it's meant to target projects that use React. If your project does not use React (or Preact), you shouldn't use this rule.

The rule will inspect the following known hooks:

- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect`
- `useCallback`
- `useMemo`
- `useImperativeHandle`
- `useState`
- `useReducer`
- `useRef`
- `useDebugValue`
- `useDeferredValue`
- `useTransition`

If you want to add more hooks to the rule, check the options.

## Examples

### Invalid

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    useEffect(() => {
        console.log(a);
    }, []);
}
```

Diagnostic: This hook does not specify all of its dependencies: a

### Invalid

```js
import { useEffect } from "react";

function component() {
    let b = 1;
    useEffect(() => {
    }, [b]);
}
```

Diagnostic: This hook specifies more dependencies than necessary: b

### Invalid

```js
import { useEffect, useState } from "react";

function component() {
    const [name, setName] = useState();
    useEffect(() => {
        console.log(name);
        setName("");
    }, [name, setName]);
}
```

Diagnostic: This hook specifies more dependencies than necessary: setName

### Invalid

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    const b = a + 1;
    useEffect(() => {
        console.log(b);
    }, []);
}
```

Diagnostic: This hook does not specify all of its dependencies: b

### Valid

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    useEffect(() => {
        console.log(a);
    }, [a]);
}
```

### Ignoring a specific dependency

To ignore a diagnostic about a specific dependency without disabling all linting for that hook, specify the name of the dependency in parentheses:

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    // biome-ignore lint/correctness/useExhaustiveDependencies(a): <explanation>
    useEffect(() => {
        console.log(a);
    }, []);
}
```

## Options

Allows specifying custom hooks for which dependencies should be checked and/or which are known to have stable return values.

### Validating dependencies

For every hook for which you want the dependencies to be validated, specify the index of the closure and the index of the dependencies array to validate against.

#### Example

```json
{
    "options": {
        "hooks": [
            { "name": "useLocation", "closureIndex": 0, "dependenciesIndex": 1},
            { "name": "useQuery", "closureIndex": 1, "dependenciesIndex": 0}
        ]
    }
}
```

### Stable results

When a hook is known to have a stable return value, that value doesn't need to be specified in dependency arrays. You can configure custom hooks that return stable results in one of three ways:

- `"stableResult": true` 
- `"stableResult": [1]` 
- `"stableResult": 1` 

#### Example

```json
{
    "options": {
        "hooks": [
            { "name": "useDispatch", "stableResult": true }
        ]
    }
}
```

## Preact support

This rule recognizes rules imported from `preact/compat` and `preact/hooks` and applies the same rules as for React hooks.