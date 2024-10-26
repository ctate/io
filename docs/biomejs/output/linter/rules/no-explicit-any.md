# noExplicitAny

Disallow the `any` type usage.

## Diagnostic Category: `lint/suspicious/noExplicitAny`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/no-explicit-any`

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.

TypeScript's `--noImplicitAny` compiler option prevents an implied `any`,
but doesn't prevent `any` from being explicitly used the way this rule does.

Sometimes you can use the type `unknown` instead of the type `any`.
It also accepts any value, however it requires to check that a property exists before calling it.

## Examples

### Invalid

```ts
let variable: any = 1;
```

```text
code-block.ts:1:15 lint/suspicious/noExplicitAny 
 Unexpected any. Specify a different type.
> 1 │ let variable: any = 1;
   │              ^^^
 2 │ 
 ℹ any disables many type checking rules. Its use should be avoided.
```

```ts
class SomeClass {
   message: Array<Array<any>>;
}
```

```text
code-block.ts:2:25 lint/suspicious/noExplicitAny 
 Unexpected any. Specify a different type.
  1 │ class SomeClass {
> 2 │   message: Array<Array<any>>;
   │                        ^^^
  3 │ }
 4 │ 
 ℹ any disables many type checking rules. Its use should be avoided.
```

```ts
function fn(param: Array<any>): void {}
```

```text
code-block.ts:1:26 lint/suspicious/noExplicitAny 
 Unexpected any. Specify a different type.
> 1 │ function fn(param: Array<any>): void {}
   │                         ^^^
 2 │ 
 ℹ any disables many type checking rules. Its use should be avoided.
```

### Valid

```ts
let variable: number = 1;
let variable2 = 1;
```

```ts
class SomeClass<T extends any> {
   message: Array<Array<unknown>>;
}
```

```ts
function fn(param: Array<Array<unknown>>): Array<unknown> {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options