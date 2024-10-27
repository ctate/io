# useImportRestrictions

Disallows package private imports.

**Diagnostic Category:** `lint/nursery/useImportRestrictions`

**Since:** `v1.0.0`

:::caution
This rule is part of the nursery group.
:::

Sources: 
- Inspired from: import-access/eslint-plugin-import-access

This rule enforces the following restrictions:

## Package private visibility

All exported symbols, such as types, functions, or other things that may be exported, are considered to be "package private". This means that modules that reside in the same directory, as well as submodules of those "sibling" modules, are allowed to import them, while any other modules that are further away in the file system are restricted from importing them. A symbol's visibility may be extended by re-exporting from an index file.

Notes:

- This rule only applies to relative imports. External dependencies are exempted.
- This rule only applies to imports for JavaScript and TypeScript files. Imports for resources such as images or CSS files are exempted.

## Examples

### Invalid

```js
// Attempt to import from `foo.js` from outside its `sub` module.
import { fooPackageVariable } from "./sub/foo.js";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // Attempt to import from `foo.js` from outside its `sub` module.
2 │ import { fooPackageVariable } from "./sub/foo.js";
3 │ 

ℹ Please import from ./sub instead (you may need to re-export the symbol(s) from ./sub/foo.js).

```js
// Attempt to import from `bar.ts` from outside its `aunt` module.
import { barPackageVariable } from "../aunt/bar.ts";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // Attempt to import from `bar.ts` from outside its `aunt` module.
2 │ import { barPackageVariable } from "../aunt/bar.ts";
3 │ 

ℹ Please import from ../aunt instead (you may need to re-export the symbol(s) from ../aunt/bar.ts).

```js
// Assumed to resolve to a JS/TS file.
import { fooPackageVariable } from "./sub/foo";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // Assumed to resolve to a JS/TS file.
2 │ import { fooPackageVariable } from "./sub/foo";
3 │ 

ℹ Please import from ./sub instead (you may need to re-export the symbol(s) from ./sub/foo).

```js
// If the `sub/foo` module is inaccessible, so is its index file.
import { fooPackageVariable } from "./sub/foo/index.js";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // If the `sub/foo` module is inaccessible, so is its index file.
2 │ import { fooPackageVariable } from "./sub/foo/index.js";
3 │ 

ℹ Please import from ./sub/index.js instead (you may need to re-export the symbol(s) from ./sub/foo/index.js).

### Valid

```js
// Imports within the same module are always allowed.
import { fooPackageVariable } from "./foo.js";

// Resources (anything other than JS/TS files) are exempt.
import { barResource } from "../aunt/bar.png";

// A parent index file is accessible like other modules.
import { internal } from "../../index.js";

// If the `sub` module is accessible, so is its index file.
import { subPackageVariable } from "./sub/index.js";

// Library imports are exempt.
import useAsync from "react-use/lib/useAsync";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options