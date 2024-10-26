# noNamespaceImport

Disallow the use of namespace imports.

## Diagnostic Category: `lint/style/noNamespaceImport`

### Since: `v1.6.0`

Sources: 
- Same as: barrel-files/avoid-namespace-import

Namespace imports might impact the efficiency of tree shaking, a process that removes unused code from bundles.
The effectiveness of tree shaking largely depends on the bundler (e.g., Webpack, Rollup) and its configuration.
Modern bundlers are generally capable of handling namespace imports effectively, but using named imports is recommended for optimal tree shaking and minimizing bundle size.

## Examples

### Invalid

```js
import * as foo from "foo";
```

### Error Message

Avoid namespace imports, it can prevent efficient tree shaking and increase bundle size.

### Valid

```ts
import { foo } from "foo"
import type { bar } from "bar"
import type * as baz from "baz"
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options