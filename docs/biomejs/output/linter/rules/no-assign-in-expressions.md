# noAssignInExpressions

## Diagnostic Category: `lint/suspicious/noAssignInExpressions`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Inspired from: no-cond-assign

Disallow assignments in expressions.

In expressions, it is common to mistype a comparison operator (such as `==`) as an assignment operator (such as `=`).
Moreover, the use of assignments in expressions is confusing.
Indeed, expressions are often considered as side-effect free.

## Examples

### Invalid

```ts
let a, b;
a = (b = 1) + 1;
```

```text
code-block.ts:2:6 lint/suspicious/noAssignInExpressions 
 The assignment should not be in an expression.
  1 │ let a, b;
> 2 │ a = (b = 1) + 1;
  │     ^^^^
 3 │ 
 The use of assignments in expressions is confusing.
Expressions are often considered as side-effect free.
```

```ts
let a;
if (a = 1) {
}
```

```text
code-block.ts:2:5 lint/suspicious/noAssignInExpressions 
 The assignment should not be in an expression.
  1 │ let a;
> 2 │ if (a = 1) {
  │     ^^^
 3 │ }
 4 │ 
 The use of assignments in expressions is confusing.
Expressions are often considered as side-effect free.
```

```ts
function f(a) {
    return a = 1;
}
```

```text
code-block.ts:2:12 lint/suspicious/noAssignInExpressions 
 The assignment should not be in an expression.
  1 │ function f(a) {
> 2 │     return a = 1;
  │           ^^^
 3 │ }
 4 │ 
 The use of assignments in expressions is confusing.
Expressions are often considered as side-effect free.
```

### Valid

```ts
let a;
a = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options