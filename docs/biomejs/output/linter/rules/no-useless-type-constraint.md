# noUselessTypeConstraint

Disallow using `any` or `unknown` as type constraint.

**Diagnostic Category:** `lint/complexity/noUselessTypeConstraint`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: @typescript-eslint/no-unnecessary-type-constraint

Generic type parameters (`<T>`) in TypeScript may be **constrained** with `extends`. A supplied type must then be a subtype of the supplied constraint. All types are subtypes of `any` and `unknown`. It is thus useless to extend from `any` or `unknown`.

## Examples

### Invalid

```ts
interface FooAny<T extends any> {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
type BarAny<T extends any> = {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
class BazAny<T extends any> {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
class BazAny {
  quxAny<U extends any>() {}
}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
const QuuxAny = <T extends any>() => {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
function QuuzAny<T extends any>() {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
interface FooUnknown<T extends unknown> {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
type BarUnknown<T extends unknown> = {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
class BazUnknown<T extends unknown> {}
```
```ts
class BazUnknown {
  quxUnknown<U extends unknown>() {}
}
```
Diagnostic: unterminated template literal.

```ts
const QuuxUnknown = <T extends unknown>() => {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
function QuuzUnknown<T extends unknown>() {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

### Valid

```ts
interface Foo<T> {}

type Bar<T> = {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options