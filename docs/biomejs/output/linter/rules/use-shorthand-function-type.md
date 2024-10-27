# useShorthandFunctionType

Enforce using function types instead of object type with call signatures.

**Diagnostic Category:** `lint/style/useShorthandFunctionType`

**Since:** `v1.5.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** 
- Same as: `@typescript-eslint/prefer-function-type`

TypeScript allows for two common ways to declare a type for a function:

- Function type: `() => string`
- Object type with a signature: `{ (): string }`

The function type form is generally preferred when possible for being more succinct. This rule suggests using a function type instead of an interface or object type literal with a single call signature.

## Examples

### Invalid

```ts
interface Example {
  (): string;
}
```
Diagnostic: 
- `lint/style/useShorthandFunctionType` FIXABLE 
- ✖ Use a function type instead of a call signature.

```ts
function foo(example: { (): number }): number {
  return example();
}
```
Diagnostic: 
- `lint/style/useShorthandFunctionType` FIXABLE 
- ✖ Use a function type instead of a call signature.

### Valid

```ts
type Example = () => string;
```

```ts
function foo(example: () => number): number {
  return bar();
}
```

```ts
type ReturnsSelf2 = (arg: string) => ReturnsSelf;
```

```ts
interface Foo {
  bar: string;
}
interface Bar extends Foo {
  (): void;
}
```

```ts
interface Overloaded {
  (data: string): number;
  (id: number): string;
}
type Intersection = ((data: string) => number) & ((id: number) => string);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options