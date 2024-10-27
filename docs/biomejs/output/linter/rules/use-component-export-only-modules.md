# useComponentExportOnlyModules

Enforce declaring components only within modules that export React Components exclusively.

**Diagnostic Category:** `lint/nursery/useComponentExportOnlyModules`

**Since:** `v1.9.2`

:::caution
This rule is part of the nursery group.
:::

**Sources:** 
- Inspired from: react-refresh/only-export-components

This rule is necessary to enable the React Fast Refresh feature, which improves development efficiency. The determination of whether something is a component depends on naming conventions. Components should be written in PascalCase and regular functions in camelCase. If the framework already has established conventions, consider optionally specifying exceptions.

## Examples

### Invalid

```jsx
export const foo = () => {};
export const Bar = () => <></>;
```

```
code-block.jsx:1:14 lint/nursery/useComponentExportOnlyModules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Exporting a non-component with components is not allowed.
1 │ export const foo = () => {};
   │             ^^^
2 │ export const Bar = () => <></>;

ℹ Fast Refresh only works when a file only exports components.
ℹ Consider separating non-component exports into a new file.
ℹ If it is a component, it may not be following the variable naming conventions.
```

```jsx
const Tab = () => {};
export const tabs = [<Tab />, <Tab />];
```

```
code-block.jsx:1:7 lint/nursery/useComponentExportOnlyModules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Components should be exported.
1 │ const Tab = () => {};
   │      ^^^
2 │ export const tabs = [<Tab />, <Tab />];

ℹ Fast Refresh only works when a file only exports components.
ℹ Consider separating component exports into a new file.
ℹ If it is not a component, it may not be following the variable naming conventions.
```

```jsx
const App = () => {}
createRoot(document.getElementById("root")).render(<App />);
```

```
code-block.jsx:1:7 lint/nursery/useComponentExportOnlyModules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexported components are not allowed.
1 │ const App = () => {}
   │      ^^^
2 │ createRoot(document.getElementById("root")).render(<App />);

ℹ Fast Refresh only works when a file only exports components.
ℹ Consider separating component exports into a new file.
ℹ If it is not a component, it may not be following the variable naming conventions.
```

### Valid

```jsx
export default function Foo() {
    return <></>;
}
```

```jsx
const foo = () => {};
export const Bar = () => <></>;
```

```jsx
import { App } from "./App";
createRoot(document.getElementById("root")).render(<App />);
```

Functions that return standard React components are also permitted.

```jsx
import { memo } from 'react';
const Component = () => <></>
export default memo(Component);
```

## Options

### `allowConstantExport`

Some tools, such as Vite, allow exporting constants along with components. By enabling the following, the rule will support the pattern.

```json
{
    "//": "...",
    "options":{
        "allowConstantExport" : true
    }
}
```

### `allowExportNames`

If you use a framework that handles Hot Module Replacement (HMR) of some specific exports, you can use this option to avoid warning for them.

Example for Remix:

```json
{
    "//": "...",
    "options":{
        "allowExportNames": ["json", "loader", "headers", "meta", "links", "scripts"]
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options