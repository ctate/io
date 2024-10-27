# useNamespaceKeyword

Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces.

**Diagnostic Category: `lint/suspicious/useNamespaceKeyword`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: @typescript-eslint/prefer-namespace-keyword

Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces.

TypeScript historically allowed a code organization called _namespace_. _ECMAScript modules_ are preferred (import / export).

For projects still using _namespaces_, it's preferred to use the `namespace` keyword instead of the `module` keyword. The `module` keyword is deprecated to avoid any confusion with the _ECMAScript modules_ which are often called _modules_.

Note that TypeScript `module` declarations to describe external APIs (`declare module "foo" {}`) are still allowed.

See also: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html

## Examples

### Invalid

```ts
module Example {}
```

code-block.ts:1:1 lint/suspicious/useNamespaceKeyword FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use the **namespace** keyword instead of the outdated **module** keyword.

> 1 │ module Example {}
   │ ^^^^^^
   
ℹ The **module** keyword is deprecated to avoid any confusion with the **ECMAScript modules** which are often called **modules**.

ℹ Safe fix: Use **namespace** instead.

```ts
namespace Example {}
```

```ts
declare module "foo" {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options