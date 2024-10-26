# noNamespace

Disallow the use of TypeScript's `namespace`s.

Namespaces are an old way to organize your code in TypeScript.
They are not recommended anymore and should be replaced by ES6 modules
(the `import`/`export` syntax).

## Diagnostic Category: `lint/style/noNamespace`

### Since: `v1.0.0`

Sources: 
- Same as: `@typescript-eslint/no-namespace`

## Examples

### Invalid

```ts
module foo {}
```

```text
code-block.ts:1:1 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ module foo {}
   │ ^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

```ts
declare module foo {}
```

```text
code-block.ts:1:9 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ declare module foo {}
   │         ^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

```ts
namespace foo {}
```

```text
code-block.ts:1:1 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ namespace foo {}
   │ ^^^^^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

```ts
declare namespace foo {}
```

```text
code-block.ts:1:9 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ declare namespace foo {}
   │         ^^^^^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

### Valid

```ts
import foo from 'foo';
export { bar };
```

```ts
declare global {}
```

```ts
declare module 'foo' {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options