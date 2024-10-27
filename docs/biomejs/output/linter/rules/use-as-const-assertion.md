# useAsConstAssertion

Enforce the use of `as const` over literal type and type annotation.

**Diagnostic Category:** `lint/style/useAsConstAssertion`

**Since:** `v1.3.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** Same as: `@typescript-eslint/prefer-as-const`

In TypeScript, there are three common ways to specify that a value is of a specific type such as `2` and not a general type such as `number`:

1. `as const`: telling TypeScript to infer the literal type automatically
2. `as <literal>`: explicitly telling the literal type to TypeScript
3. type annotation: explicitly telling the literal type to TypeScript when declaring variables

The rule suggests using `as const` when you're using `as` with a literal type or type annotation, since `as const` is simpler and doesn't require retyping the value.

## Examples

### Invalid

```ts
let bar: 2 = 2;
```
Diagnostic: 
```
code-block.ts:1:10 lint/style/useAsConstAssertion FIXABLE 
✖ Use as const instead of type annotation.
> 1 │ let bar: 2 = 2;
  │         ^
2 │ 
ℹ as const doesn't require any update when the value is changed.
ℹ Safe fix: Replace with as const.
```

```ts
let foo = { bar: 'baz' as 'baz' };
```
Diagnostic: 
```
code-block.ts:1:27 lint/style/useAsConstAssertion FIXABLE 
✖ Use as const instead of as with a literal type.
> 1 │ let foo = { bar: 'baz' as 'baz' };
  │                          ^^^^^
2 │ 
ℹ as const doesn't require any update when the asserted value is changed.
ℹ Safe fix: Replace with as const.
```

### Valid

```ts
let foo = 'bar';
let foo = 'bar' as const;
let foo: 'bar' = 'bar' as const;
let bar = 'bar' as string;
let foo = { bar: 'baz' };
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options