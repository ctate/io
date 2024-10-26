# noImplicitAnyLet

Disallow use of implicit `any` type on variable declarations.

## Diagnostic Category
lint/suspicious/noImplicitAnyLet

## Since
v1.4.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

TypeScript variable declaration without any type annotation and initialization have the `any` type. The any type in TypeScript is a dangerous “escape hatch” from the type system. Using any disables many type checking rules and is generally best used only as a last resort or when prototyping code. TypeScript’s `--noImplicitAny` compiler option doesn't report this case.

## Examples

### Invalid

```ts
var a;
a = 2;
```

```ts
let b;
b = 1
```

### Valid

```ts
var a = 1;
let a:number;
var b: number
var b =10;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options
- https://www.typescriptlang.org/tsconfig#noImplicitAny