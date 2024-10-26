# noEnum

Disallow TypeScript enum.

## Diagnostic Category: `lint/nursery/noEnum`

### Since: `v1.9.0`

This rule is part of the nursery group.

TypeScript enums are not a type-level extension to JavaScript like type annotations or definitions. Users may wish to disable non-type-level extensions to use bundlers or compilers that only strip types.

Const enums are not covered by this rule since `noConstEnum` already handles them. Enums within the ambient context, including declaration files, are ignored as well.

## Examples

### Invalid

```ts
enum Foo {
    BAR = 'bar',
    BAZ = 'baz',
}
```

### Valid

```ts
const Foo = {
    BAR: 'bar',
    BAZ: 'baz',
} as const
```

```ts
type Foo = 'bar' | 'baz'
```

```ts
const enum Foo {
    BAR = 'bar',
    BAZ = 'baz',
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options