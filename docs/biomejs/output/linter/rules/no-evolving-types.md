# noEvolvingTypes

Disallow variables from evolving into `any` type through reassignments.

## Diagnostic Category: `lint/suspicious/noEvolvingTypes`

### Since: `v1.6.3`

Disallow variables from evolving into `any` type through reassignments.

In TypeScript, variables without explicit type annotations can evolve their types based on subsequent assignments.

When TypeScript's noImplicitAny is disabled, variables without explicit type annotations have implicitly the type `any`.
Just like the `any` type, evolved `any` types disable many type-checking rules and should be avoided to maintain strong type safety.
This rule prevents such cases by ensuring variables do not evolve into `any` type, encouraging explicit type annotations and controlled type evolutions.

If you enabled TypeScript's noImplicitAny and want to benefit of evolving types, then we recommend to disable this rule.

## Examples

### Invalid

```ts
let a;
```

The type of this variable may evolve implicitly to any type, including the `any` type.
Add an explicit type or initialization to avoid implicit type evolution.

```ts
const b = [];
```

The type of this variable may evolve implicitly to any type, including the `any` type.
Add an explicit type or initialization to avoid implicit type evolution.

```ts
let c = null;
```

The type of this variable may evolve implicitly to any type, including the `any` type.
Add an explicit type or initialization to avoid implicit type evolution.

### Valid

```ts
let a: number;
let b = 1;
var c : string;
var d = "abn";
const e: never[] = [];
const f = [null];
const g = ['1'];
const h = [1];
let workspace: Workspace | null = null;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options