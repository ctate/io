# useAdjacentOverloadSignatures

**Description**: Disallow the use of overload signatures that are not next to each other.

**Diagnostic Category**: `lint/nursery/useAdjacentOverloadSignatures`

**Since**: `v1.9.0`

**Caution**: This rule is part of the nursery group.

**Sources**: Same as: `@typescript-eslint/adjacent-overload-signatures`

Overload signatures must be adjacent. If a key is defined multiple times, only the last definition takes effect. Previous definitions are ignored. This rule is useful for preventing accidental overloads that are not adjacent. It is recommended to keep the overload signatures adjacent to make the code easier to read and maintain.

## Examples

### Invalid

```ts
type Foo = {
  foo_type(s: string): void;
  foo_type(n: number): void;
  bar_type(): void;
  foo_type(sn: string | number): void;
};
```
Diagnostic: 
code-block.ts:5:3 lint/nursery/useAdjacentOverloadSignatures ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ All foo_type signatures must be adjacent.  
3 │  foo_type(n: number): void;  
4 │  bar_type(): void;  
5 │  foo_type(sn: string | number): void;  
6 │ };

```ts
interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  bar_interface(): void;
  foo_interface(sn: string | number): void;
}
```
Diagnostic: 
code-block.ts:5:3 lint/nursery/useAdjacentOverloadSignatures ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ All foo_interface signatures must be adjacent.  
3 │  foo_interface(n: number): void;  
4 │  bar_interface(): void;  
5 │  foo_interface(sn: string | number): void;  
6 │ };

```ts
class A {
  fooA(s: string): void;
  fooA(n: number): void;
  barA(): void {};
  fooA(sn: string | number): void {};
}
```

### Valid

```ts
declare namespace Foo {
  export function foo_declare(s: string): void;
  export function foo_declare(n: number): void;
  export function foo_declare(sn: string | number): void;
  export function bar_declare(): void;
}
```

```ts
type Foo = {
  foo_type(s: string): void;
  foo_type(n: number): void;
  foo_type(sn: string | number): void;
  bar_type(): void;
};
```

```ts
interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  foo_interface(sn: string | number): void;
  bar_interface(): void;
}
```

```ts
class A {
  fooA(s: string): void;
  fooA(n: number): void;
  fooA(sn: string | number): void {}
  barA(): void {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options