# noNonNullAssertion

Disallow non-null assertions using the `!` postfix operator.

## Diagnostic Category: `lint/style/noNonNullAssertion`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: `@typescript-eslint/no-non-null-assertion`

TypeScript's `!` non-null assertion operator asserts to the type system that an expression is non-nullable, as
in not `null` or `undefined`. Using assertions to tell the type system new information is often a sign that
code is not fully type-safe. It's generally better to structure program logic so that TypeScript understands
when values may be nullable.

## Examples

### Invalid

```ts
interface Example {
  property?: string;
}
declare const foo: Example;
const includesBaz = foo.property!.includes('baz');
```

```ts
(b!! as number) = "test";
```

### Valid

```ts
interface Example {
  property?: string;
}

declare const foo: Example;
const includesBaz = foo.property?.includes('baz') ?? false;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options