# noReExportAll

**Diagnostic Category: `lint/performance/noReExportAll`**

**Since**: `v1.6.0`
Sources: 
- Same as: barrel-files/avoid-re-export-all

Avoid re-export all.

Deeply nested import chains in modular projects, where a barrel file imports another barrel file, can lead to increased load times and complexity.
This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.
Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.

## Examples

### Invalid

```js
export * from "foo";
```

Do not use export all ( `export * from ...` ). 
Use named export instead.

```js
export * as foo from "foo";
```

Do not use export all ( `export * from ...` ). 
Use named export instead.

### Valid

```js
export { foo } from "foo";
```

```ts
export type * from "foo";
export type * as bar from "bar";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options