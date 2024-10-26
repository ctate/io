# noGlobalAssign

Disallow assignments to native objects and read-only global variables.

**Diagnostic Category: `lint/suspicious/noGlobalAssign`**

**Since**: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-global-assign`

JavaScript's environments contain numerous built-in global variables, such as `window` in browsers and `process` in Node.js.
Assigning values to these global variables can be problematic as it can override essential functionality.

## Examples

### Invalid

```js
Object = null;
```

```js
window = {};
```

```js
undefined = true;
```

### Valid

```js
a = 0;
```

```js
let window;
window = {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options