# noCommonJs
Disallow use of CommonJs module system in favor of ESM style imports.

**Diagnostic Category: `lint/nursery/noCommonJs`**

**Since**: `v1.9.0`

This rule is part of the nursery group.

Sources: 
- Same as: @typescript-eslint/no-require-imports
- Same as: import/no-commonjs

Disallow use of CommonJs module system in favor of ESM style imports.

ESM-style `import`s are modern alternative to CommonJS `require` imports. Supported by all modern browsers and Node.js versions.
Tooling can more easily statically analyze and tree-shake ESM `import`s compared to CommonJs.

## Examples

### Invalid

```js
require('node:fs');
```

```js
module.exports = { a: 'b' }
```

```js
exports.a = 'b';
```

### Valid

```js
import fs from 'node:fs';
```

```js
import('node:fs')
```

```js
export const a = 'b';
```

```js
export default { a: 'b' };
```

## Caveats

Rule is automatically disabled inside `.cjs` and `.cts` files, because they are explicitly CommonJs files.

This rule could be helpful if you are migrating from CommonJs to ESM,
but if you wish to continue using CommonJs, you can safely disable it.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options