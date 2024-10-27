# useNodeAssertStrict

**Description**: Promotes the usage of `node:assert/strict` over `node:assert`.

**Diagnostic Category**: `lint/style/useNodeAssertStrict`

**Since**: `v1.6.0`

**Note**: This rule has a **safe** fix.

Promotes the usage of `node:assert/strict` over `node:assert`. If you prefer stricter assertions when using the Node.js assertion module, the package `node:assert/strict` exposes a set of alias for stricter assertions.

## Examples

### Invalid

```js
import * as assert from "node:assert"
```

**Error**: 
code-block.js:1:25 lint/style/useNodeAssertStrict FIXABLE 
⚠ Use **node:assert/strict** instead.

1 │ import * as assert from "node:assert"
   │                        ^^^^^^^^^^^^^^^
2 │ 

ℹ The use of stricter assertion is preferred.
ℹ Safe fix: Replace with **node:assert/strict**.

1 │ import * as assert from "node:assert/strict"

### Valid

```js
import * as assert from "node:assert/strict"
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options