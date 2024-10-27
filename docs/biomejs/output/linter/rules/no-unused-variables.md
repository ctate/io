# noUnusedVariables

**Description:** Disallow unused variables.

**Diagnostic Category:** `lint/correctness/noUnusedVariables`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

**Sources:**
- Same as: `no-unused-vars` (ESLint)
- Same as: `@typescript-eslint/no-unused-vars` (TypeScript ESLint)
- Same as: `unused-imports/no-unused-vars` (sweepline ESLint plugin)

Disallow unused variables. There is an exception for variables that start with an underscore (e.g., `let _something;`). This pattern is common among programmers, and Biome follows it.

This rule won't report unused imports. To report unused imports, enable `noUnusedImports`.

From `v1.9.0`, the rule won't check unused function parameters. To report unused function parameters, enable `noUnusedFunctionParameters`.

## Examples

### Invalid

```js
let a = 4;
a++;
```
**Warning:** This variable is unused.

```js
function foo() {}
```
**Warning:** This function is unused.

```js
export function foo(myVar) {
    console.log('foo');
}
```
**Warning:** This parameter is unused.

```js
function foo() {
    foo();
}
```
**Warning:** This function is unused.

```js
const foo = () => {
    foo();
};
```
**Warning:** This variable is unused.

```ts
export function f<T>() {}
```
**Warning:** This type parameter is unused.

### Valid

```js
function foo(b) {
    console.log(b);
}
foo();
```

```js
export function foo(_unused) {}
```

```ts
function used_overloaded(): number;
function used_overloaded(s: string): string;
function used_overloaded(s?: string) {
    return s;
}
used_overloaded();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options