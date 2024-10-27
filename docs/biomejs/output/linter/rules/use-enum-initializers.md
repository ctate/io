# useEnumInitializers

Require that each enum member value be explicitly initialized.

**Diagnostic Category:** `lint/style/useEnumInitializers`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/prefer-enum-initializers`

_TypeScript_ enums are a practical way to organize semantically related constant values. Members of enums that don't have explicit values are by default given sequentially increasing numbers. When the value of enum members is important, allowing implicit values for enum members can cause bugs if enum declarations are modified over time.

## Examples

### Invalid

```ts
enum Version {
    V1,
}
```

Diagnostic:
```
code-block.ts:1:6 lint/style/useEnumInitializers FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This enum declaration contains members that are implicitly initialized.
1 │ enum Version {
   │     ^^^^^^
2 │     V1,
3 │ }
ℹ This enum member should be explicitly initialized.
1 │ enum Version {
2 │     V1,
   │     ^^^^^^
3 │ }
ℹ Allowing implicit initializations for enum members can cause bugs if enum declarations are modified over time.
ℹ Safe fix: Initialize all enum members.
```

```ts
enum Status {
    Open = 1,
    Close,
}
```

Diagnostic:
```
code-block.ts:1:6 lint/style/useEnumInitializers FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This enum declaration contains members that are implicitly initialized.
1 │ enum Status {
   │     ^^^^^^
2 │     Open = 1,
3 │     Close,
ℹ This enum member should be explicitly initialized.
1 │ enum Status {
2 │     Open = 1,
3 │     Close,
   │     ^^^^^^
4 │ }
ℹ Allowing implicit initializations for enum members can cause bugs if enum declarations are modified over time.
ℹ Safe fix: Initialize all enum members.
```

```ts
enum Color {
    Red = "Red",
    Green = "Green",
    Blue,
}
```

Diagnostic:
```
code-block.ts:1:6 lint/style/useEnumInitializers FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This enum declaration contains members that are implicitly initialized.
1 │ enum Color {
   │     ^^^^^^
2 │     Red = "Red",
3 │     Green = "Green",
4 │     Blue,
ℹ This enum member should be explicitly initialized.
2 │     Red = "Red",
3 │     Green = "Green",
4 │     Blue,
   │     ^^^^^^
5 │ }
ℹ Allowing implicit initializations for enum members can cause bugs if enum declarations are modified over time.
ℹ Safe fix: Initialize all enum members.
```

### Valid

```ts
enum Status {
    Open = 1,
    Close = 2,
}
```

```ts
enum Color {
    Red = "Red",
    Green = "Green",
    Blue = "Blue",
}
```

```ts
declare enum Weather {
    Rainy,
    Sunny,
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options