# useNodejsImportProtocol

Enforces using the `node:` protocol for Node.js builtin modules.

**Diagnostic Category:** `lint/style/useNodejsImportProtocol`

**Since:** `v1.5.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: `unicorn/prefer-node-protocol`

The rule marks traditional imports like `import fs from "fs";` as invalid, suggesting the format `import fs from "node:fs";` instead. The rule also isn't triggered if there are dependencies declared in the `package.json` that match the name of a built-in Node.js module.

**Caution:** The rule doesn't support dependencies installed inside a monorepo.

## Examples

### Invalid

```js
import fs from 'fs';
```

Diagnostic:
```
code-block.js:1:16 lint/style/useNodejsImportProtocol FIXABLE
✖ A Node.js builtin module should be imported with the node: protocol.
> 1 │ import fs from 'fs';
  │               ^^^^
2 │
ℹ Using the node: protocol is more explicit and signals that the imported module belongs to Node.js.
ℹ Unsafe fix: Add the node: protocol.
1 │ -import fs from 'fs';
  │ +import fs from 'node:fs';
2 │
```

```js
import os from 'os';
```

Diagnostic:
```
code-block.js:1:16 lint/style/useNodejsImportProtocol FIXABLE
✖ A Node.js builtin module should be imported with the node: protocol.
> 1 │ import os from 'os';
  │               ^^^^
2 │
ℹ Using the node: protocol is more explicit and signals that the imported module belongs to Node.js.
ℹ Unsafe fix: Add the node: protocol.
1 │ -import os from 'os';
  │ +import os from 'node:os';
2 │
```

```js
import path from 'path';
```

Diagnostic:
```
code-block.js:1:18 lint/style/useNodejsImportProtocol FIXABLE
✖ A Node.js builtin module should be imported with the node: protocol.
> 1 │ import path from 'path';
  │                 ^^^^^^
2 │
ℹ Using the node: protocol is more explicit and signals that the imported module belongs to Node.js.
ℹ Unsafe fix: Add the node: protocol.
1 │ -import path from 'path';
  │ +import path from 'node:path';
2 │
```

### Valid

```js
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options