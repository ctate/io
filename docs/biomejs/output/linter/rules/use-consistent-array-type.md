# useConsistentArrayType

Require consistently using either `T[]` or `Array<T>`

**Diagnostic Category:** `lint/style/useConsistentArrayType`  
**Since:** `v1.5.0`  
**Note:** This rule has an **unsafe** fix.

Sources: Same as: `@typescript-eslint/array-type`

_TypeScript_ provides two equivalent ways to define an array type: `T[]` and `Array<T>`. The two styles are functionally equivalent. Using the same style consistently across your codebase makes it easier for developers to read and understand array types.

## Example

### Invalid

```ts
let invalid: Array<foo>;
```

code-block.ts:1:14 lint/style/useConsistentArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  

```ts
let invalid: Promise<Array<string>>;
```

code-block.ts:1:22 lint/style/useConsistentArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  

```ts
let invalid3: Array<Foo<Bar>>;
```

code-block.ts:1:15 lint/style/useConsistentArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  

### Valid

```ts
const valid: Array<string | number> = ['a', 'b'];
const valid: Array<{ prop: string }> = [{ prop: 'a' }];
const valid: Array<() => void> = [() => {}];
const valid: MyType[] = ['a', 'b'];
const valid: string[] = ['a', 'b'];
const valid: readonly string[] = ['a', 'b'];
```

## Options

Use the options to specify the syntax of array declarations to use.

```json
{
    "//": "...",
    "options": {
        "syntax": "shorthand"
    }
}
```

### syntax

The syntax to use:

- `generic`: array declarations will be converted to `Array<T>` or `ReadonlyArray<T>`
- `shorthand`: array declarations will be converted to `T[]` or `readonly T[]`

Default: `shorthand`

## Related links

- Disable a rule
- Configure the rule fix
- Rule options