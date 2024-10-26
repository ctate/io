# noEmptyInterface

Disallow the declaration of empty interfaces.

## Diagnostic Category: `lint/suspicious/noEmptyInterface`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Inspired from: `@typescript-eslint/no-empty-interface`

Disallow the declaration of empty interfaces.

An empty interface in TypeScript does very little: any non-nullable value is assignable to `{}`.
Using an empty interface is often a sign of programmer error, such as misunderstanding the concept of `{}` or forgetting to fill in fields.

The rule ignores empty interfaces that `extends` one or multiple types.

## Examples

### Invalid

```ts
interface A {}
```

```text
code-block.ts:1:1 lint/suspicious/noEmptyInterface  FIXABLE 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ An empty interface is equivalent to {}.
 
 > 1 │ interface A {}
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
 2 │ 
 ℹ Safe fix: Use a type alias instead.
 
 1 │ - interface A {}
 1 │ + type A = {}
 2 │ 
```

### Valid

```ts
interface A {
  prop: string;
}

// Allow empty interfaces that extend a type.
interface B extends A {}

// Allow empty interfaces in ambient modules
declare module "mod" {
  interface C {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options