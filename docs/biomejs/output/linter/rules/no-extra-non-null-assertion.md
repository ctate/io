# noExtraNonNullAssertion

Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files.

**Diagnostic Category: `lint/suspicious/noExtraNonNullAssertion`**

**Since**: `v1.0.0`

* This rule is recommended by Biome. A diagnostic error will appear when linting your code.
* This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/no-extra-non-null-assertion`

Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files.

The `!` non-null assertion operator in TypeScript is used to assert that a value's type does not include `null` or `undefined`. Using the operator any more than once on a single value does nothing.

## Examples

### Invalid

```ts
const bar = foo!!.bar;
```

```ts
function fn(bar?: { n: number }) {
  return bar!?.n;
}
```

```ts
function fn(bar?: { n: number }) {
  return ((bar!))?.();
}
```

### Valid

```ts
const bar = foo!.bar;

obj?.string!.trim();

function fn(key: string | null) {
  const obj = {};
  return obj?.[key!];
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options