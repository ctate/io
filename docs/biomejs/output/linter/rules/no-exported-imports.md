# noExportedImports

Disallow exporting an imported variable.

## Diagnostic Category: `lint/nursery/noExportedImports`

### Since: `v1.9.0`

This rule is part of the nursery group.

Disallow exporting an imported variable.

In JavaScript, you can re-export a variable either by using `export from` or by first importing the variable and then exporting it with a regular `export`.

You may prefer to use the first approach, as it clearly communicates the intention to re-export an import, and can make static analysis easier.

## Examples

### Invalid

```js
import { A } from "mod";
export { A };
```

An import should not be exported. Use `export from` instead.

```js
import * as ns from "mod";
export { ns };
```

An import should not be exported. Use `export from` instead.

```js
import D from "mod";
export { D };
```

An import should not be exported. Use `export from` instead.

### Valid

```js
export { A } from "mod";
export * as ns from "mod";
export { default as D } from "mod";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options