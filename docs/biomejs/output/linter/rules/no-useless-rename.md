# noUselessRename

Disallow renaming import, export, and destructured assignments to the same name.

**Diagnostic Category:** `lint/complexity/noUselessRename`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** 
- Same as: `no-useless-rename` (see ESLint documentation)

ES2015 allows for the renaming of references in import and export statements as well as destructuring assignments. This gives programmers a concise syntax for performing these operations while renaming these references:

```js
import { foo as bar } from "baz";
export { foo as bar };
let { foo: bar } = baz;
```

With this syntax, it is possible to rename a reference to the same name. This is a completely redundant operation, as this is the same as not renaming at all.

## Examples

### Invalid

```js
import { foo as foo } from "bar";
```

```
code-block.js:1:10 lint/complexity/noUselessRename FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Useless rename.
> 1 │ import { foo as foo } from "bar";
   │         ^^^^^^^^^^^
2 │ 
ℹ Safe fix: Remove the renaming.
1 │ import { foo } from "bar";
   │             ---------
```

```js
export { foo as foo };
```

```
code-block.js:1:10 lint/complexity/noUselessRename FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Useless rename.
> 1 │ export { foo as foo };
   │         ^^^^^^^^^^^
2 │ 
ℹ Safe fix: Remove the renaming.
1 │ export { foo };
   │             ----
```

```js
let { foo: foo } = bar;
```

```
code-block.js:1:7 lint/complexity/noUselessRename FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Useless rename.
> 1 │ let { foo: foo } = bar;
   │       ^^^^^^^^^
2 │ 
ℹ Safe fix: Remove the renaming.
1 │ let { foo } = bar;
   │         ---------
```

### Valid

```js
import { foo as bar } from "baz";
```

```js
export { foo as bar };
```

```js
let { foo: bar } = baz;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options