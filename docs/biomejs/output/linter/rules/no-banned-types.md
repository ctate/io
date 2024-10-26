# noBannedTypes

Disallow primitive type aliases and misleading types.

## Diagnostic Category: `lint/complexity/noBannedTypes`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/ban-types`

Disallow primitive type aliases and misleading types.

### Enforce consistent names for primitive types

Primitive types have aliases.
For example, `Number` is an alias of `number`.
The rule recommends the lowercase primitive type names.

### Disallow the `Function` type

The `Function` type is loosely typed and is thus considered dangerous or harmful.
`Function` is equivalent to the type `(...rest: any[]) => any` that uses the unsafe `any` type.

### Disallow the misleading non-nullable type `{}`

In TypeScript, the type `{}` doesn't represent an empty object.
It represents any value except `null` and `undefined`.
The following TypeScript example is perfectly valid:

```ts
const n: {} = 0
```

To represent an empty object, you should use `{ [k: string]: never }` or `Record<string, never>`.

To avoid any confusion, the rule forbids the use of the type `{}`, except in two situations:

1. In type constraints to restrict a generic type to non-nullable types:

```ts
function f<T extends {}>(x: T) {
    assert(x != null);
}
```

2. In a type intersection to narrow a type to its non-nullable equivalent type:

```ts
type NonNullableMyType = MyType & {};
```

In this last case, you can also use the `NonNullable` utility type:

```ts
type NonNullableMyType = NonNullable<MyType>;
```

## Examples

### Invalid

```ts
let foo: String = "bar";
```

```ts
let bool = true as Boolean;
```

```ts
let invalidTuple: [string, Boolean] = ["foo", false];
```

### Valid

```ts
let foo: string = "bar";
```

```ts
let tuple: [boolean, string] = [false, "foo"];
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options