# noUselessEmptyExport

Disallow empty exports that don't change anything in a module file.

**Diagnostic Category:** `lint/complexity/noUselessEmptyExport`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/no-useless-empty-export`

An empty `export {}` is sometimes useful to turn a file that would otherwise be a script into a module. According to the TypeScript Handbook Modules page:

> In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope.

However, an `export {}` statement does nothing if there are any other top-level import or export in the file.

## Examples

### Invalid

```js
import { A } from "module";
export {};
```

Diagnostic:
```
code-block.js:2:1 lint/complexity/noUselessEmptyExport FIXABLE
✖ This empty export is useless because there's another export or import.
1 │ import { A } from "module";
> 2 │ export {};
3 │
ℹ This import makes useless the empty export.
> 1 │ import { A } from "module";
   │ ^^^^^^^^^^
2 │ export {};
3 │
ℹ Safe fix: Remove this useless empty export.
1 │ import { A } from "module";
2 │ - export {};
3 │
```

```js
export const A = 0;
export {};
```

Diagnostic:
```
code-block.js:2:1 lint/complexity/noUselessEmptyExport FIXABLE
✖ This empty export is useless because there's another export or import.
1 │ export const A = 0;
> 2 │ export {};
3 │
ℹ This export makes useless the empty export.
> 1 │ export const A = 0;
   │ ^^^^^^^^^^
2 │ export {};
3 │
ℹ Safe fix: Remove this useless empty export.
1 │ export const A = 0;
2 │ - export {};
3 │
```

### Valid

```js
export {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options