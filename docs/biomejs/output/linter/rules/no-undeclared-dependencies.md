# noUndeclaredDependencies

**Diagnostic Category: `lint/correctness/noUndeclaredDependencies`**

**Since**: `v1.6.0`  
Disallow the use of dependencies that aren't specified in the `package.json`. Indirect dependencies will trigger the rule if they aren't declared in the `package.json`. For example, if `@org/foo` depends on `lodash` and you use `import "lodash"`, the rule will trigger a diagnostic.

The rule ignores imports that are not valid package names, including internal imports starting with `#` or `@/`, and imports with protocols like `node:`, `bun:`, `jsr:`, or `https:`.

To ensure Visual Studio Code uses relative imports automatically, set `javascript.preferences.importModuleSpecifier` and `typescript.preferences.importModuleSpecifier` to `relative`.

## Examples

### Invalid

```js
import "vite";
```

### Valid

```js
import { A } from "./local.js";
```

```js
import assert from "node:assert";
```

## Related links

- Disable a rule: plain text
- Configure the rule fix: plain text
- Rule options: plain text