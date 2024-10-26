# noBarrelFile

## Diagnostic Category: `lint/performance/noBarrelFile`

**Since**: `v1.6.0`

Sources: 
- Inspired from: barrel-files/avoid-barrel-files

Disallow the use of barrel file.

A barrel file is a file that re-exports all of the exports from other files in a directory.
This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.
Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.
This rule ignores .d.ts files and type-only exports.

For a more detailed explanation, check out https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/

## Examples

### Invalid

```js
export * from "foo";
export * from "bar";
```

```js
export { foo } from "foo";
export { bar } from "bar";
```

```js
export { default as module1 } from "./module1";
```

### Valid

```ts
export type * from "foo";
export type { foo } from "foo";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options