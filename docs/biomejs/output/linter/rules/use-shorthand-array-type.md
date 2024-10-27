# useShorthandArrayType

When expressing array types, this rule promotes the usage of `T[]` shorthand instead of `Array<T>`.

**Diagnostic Category:** `lint/style/useShorthandArrayType`

**Caution:** This rule is deprecated and will be removed in the next major release.  
**Reason:** Use `useConsistentArrayType` instead.  
**Since:** `v1.0.0`  
**Note:** This rule has an **unsafe** fix.

## Examples

### Invalid

```ts
let invalid: Array<foo>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Array<foo>;  
   │ ^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Array<foo>;  
   │ +let invalid: foo[];  

```ts
let invalid: Promise<Array<string>>;
```
code-block.ts:1:22 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Promise<Array<string>>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Promise<Array<string>>;  
   │ +let invalid: Promise<string[]>;  

```ts
let invalid: Array<Foo<Bar>>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Array<Foo<Bar>>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Array<Foo<Bar>>;  
   │ +let invalid: Foo<Bar>[];  

```ts
let invalid: Array<[number, number]>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Array<[number, number]>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Array<[number, number]>;  
   │ +let invalid: [number, number][];  

```ts
let invalid: ReadonlyArray<string>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand readonly T[] syntax instead of ReadonlyArray<T> syntax.  
1 │ let invalid: ReadonlyArray<string>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand readonly T[] syntax to replace  
1 │ -let invalid: ReadonlyArray<string>;  
   │ +let invalid: readonly string[];  

### Valid

```ts
let valid: Array<Foo | Bar>;
let valid: Array<keyof Bar>;
let valid: Array<foo | bar>;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options