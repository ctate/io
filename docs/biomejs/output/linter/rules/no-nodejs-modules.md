# noNodejsModules

Forbid the use of Node.js builtin modules.

## Diagnostic Category: `lint/correctness/noNodejsModules`

### Since: `v1.5.0`

Sources: 
- Same as: import/no-nodejs-modules

This can be useful for client-side web projects that don't have access to those modules.

The rule also isn't triggered if there are dependencies declared in the `package.json` that match
the name of a built-in Node.js module.

Type-only imports are ignored.

## Examples

### Invalid

```js
import fs from "fs";
```

```js
import path from "node:path";
```

### Valid

```js
import fs from "fs-custom";
```

```ts
import type path from "node:path";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options