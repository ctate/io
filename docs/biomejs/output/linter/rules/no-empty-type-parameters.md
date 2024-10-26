# noEmptyTypeParameters

Disallow empty type parameters in type aliases and interfaces.

## Diagnostic Category
lint/complexity/noEmptyTypeParameters

## Since
v1.5.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

TypeScript permits the use of empty type parameter lists in type alias and interface declarations; however, this practice is generally discouraged.
Allowing empty type parameter lists can lead to unclear or ambiguous code, where the intention of the generic type is not self-evident.
This rule disallows empty type parameter lists in type alias and interface declarations.

## Examples

### Invalid

```ts
interface Foo<> {}
```

```text
code-block.ts:1:14 lint/complexity/noEmptyTypeParameters 
  ✖ Using an empty type parameter list is confusing.
  1 │ interface Foo<> {}
    │             ^^
  ℹ Remove the empty type parameter list or add a type parameter.
```

```ts
type Bar<> = {};
```

```text
code-block.ts:1:9 lint/complexity/noEmptyTypeParameters 
  ✖ Using an empty type parameter list is confusing.
  1 │ type Bar<> = {};
    │        ^^
  ℹ Remove the empty type parameter list or add a type parameter.
```

### Valid

```ts
interface Foo {}
```

```ts
type Foo<T> = {
 bar: T;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options