# useLiteralEnumMembers

Require all enum members to be literal values.

**Diagnostic Category:** `lint/style/useLiteralEnumMembers`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/prefer-literal-enum-member`

Require all enum members to be literal values. Usually, an enum member is initialized with a literal number or a literal string. However, TypeScript allows the value of an enum member to be many different kinds of expressions. Using a computed enum member is often error-prone and confusing. This rule requires the initialization of enum members with constant expressions. It allows numeric and bitwise expressions for supporting enum flags. It also allows referencing previous enum members.

## Examples

### Invalid

```ts
const x = 2;
enum Computed {
    A,
    B = x,
}
```

code-block.ts:4:9 lint/style/useLiteralEnumMembers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The enum member should be initialized with a literal value such as a number or a string.  
2 │ enum Computed {  
3 │ A,  
4 │ B = x,  
   │ ^  
5 │ }  

### Valid

```ts
enum Direction {
    Left,
    Right,
}
```

```ts
enum Order {
    Less = -1,
    Equal = 0,
    Greater = 1,
}
```

```ts
enum State {
    Open = "Open",
    Close = "Close",
}
```

```ts
enum FileAccess {
    None = 0,
    Read = 1,
    Write = 1 << 1,
    All = Read | Write
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options