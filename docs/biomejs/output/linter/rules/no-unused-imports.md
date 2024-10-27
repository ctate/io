# noUnusedImports

Disallow unused imports.

**Diagnostic Category:** `lint/correctness/noUnusedImports`

**Since:** `v1.3.0`

- This rule has a **safe** fix.

Sources: 
- Same as: unused-imports/no-unused-imports

Unused imports might be the result of an incomplete refactoring. The code fix can remove comments associated with an `import`. Note that the leading trivia, e.g., comments or newlines preceding the unused imports will also be removed. So that comment directives like `@ts-expect-error` won't be transferred to a wrong place.

## Options

This rule respects the `jsxRuntime` setting and will make an exception for React globals if it is set to `"reactClassic"`.

## Examples

### Invalid

```js
import A from 'mod';
```

code-block.js:1:8 lint/correctness/noUnusedImports FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ This import is unused.

1 │ import A from 'mod';
   │       ^

2 │ 

ℹ Unused imports might be the result of an incomplete refactoring.

ℹ Safe fix: Remove the unused import.

```js
import * as A from 'mod';
```

code-block.js:1:13 lint/correctness/noUnusedImports FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ This import is unused.

1 │ import * as A from 'mod';
   │            ^

2 │ 

ℹ Unused imports might be the result of an incomplete refactoring.

ℹ Safe fix: Remove the unused import.

```ts
import { type A, B } from 'mod';

export { B }
```

code-block.ts:1:15 lint/correctness/noUnusedImports FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ This import is unused.

1 │ import { type A, B } from 'mod';
   │              ^

2 │ 
3 │ export { B }

ℹ Unused imports might be the result of an incomplete refactoring.

ℹ Safe fix: Remove the unused import.

```js
// Header comment
import /*inner comment */ A from 'mod'; // Associated comment

// Another header comment
import {
    // A's header comment
    type A, // A's comment
    // B's header comment
    B,
} from 'mod';

export { B }
```

code-block.js:7:5 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ 'import { type x ident }' are a TypeScript only feature. Convert your file to a TypeScript file or remove the syntax.

5 │ import {
6 │     // A's header comment
7 │     type A, // A's comment
   │     ^^^^^^
8 │     // B's header comment
9 │     B,

ℹ TypeScript only syntax

### Valid

```ts
import { A, type B } from 'mod';

function f(arg: B): A {
    return new A(arg);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options