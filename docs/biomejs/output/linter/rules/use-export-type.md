# useExportType

Promotes the use of `export type` for types.

**Diagnostic Category: `lint/style/useExportType`**

**Since**: `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Inspired from: @typescript-eslint/consistent-type-exports

Promotes the use of `export type` for types.

_TypeScript_ allows adding the `type` keyword on an `export` to indicate that the `export` doesn't exist at runtime. This allows compilers to safely drop exports of types without looking for their definition.

The rule ensures that types are exported using a type-only `export`. It also groups inline type exports into a grouped `export type`.

## Examples

### Invalid

```ts
interface I {}
export { I };
```

code-block.ts:2:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ interface I {}
2 │ export { I };
3 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

2 │ export type { I };

```ts
type T = number;
export { T };
```

code-block.ts:2:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ type T = number;
2 │ export { T };
3 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

2 │ export type { T };

```ts
import type { T } from "./mod.js";
export { T };
```

code-block.ts:2:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ import type { T } from "./mod.js";
2 │ export { T };
3 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

2 │ export type { T };

```ts
export { type X, type Y };
```

code-block.ts:1:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ export { type X, type Y };
2 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

1 │ export type { X, Y };

### Valid

```js
class C {}
function f() {}
export { C, f };
```

This rule checks only the identifiers that are defined in a file. It doesn't warn against a type exported as a value in a re-export clause such as:

```ts
export { TypeA } from "./mod.ts"
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options