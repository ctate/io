# noWith

**Description:** Disallow `with` statements in non-strict contexts.

**Diagnostic Category:** `lint/complexity/noWith`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-with (https://eslint.org/docs/latest/rules/no-with)

Disallow `with` statements in non-strict contexts. The `with` statement is potentially problematic because it adds members of an object to the current scope, making it impossible to tell what a variable inside the block actually refers to.

## Examples

### Invalid

```cjs
function f() {
  with (point) {
    r = Math.sqrt(x * x + y * y); // is r a member of point?
  }
}
```

**Error Message:**
code-block.cjs:2:3 lint/complexity/noWith ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected use of with statement.

1 │ function f() {
2 │   with (point) {
3 │     r = Math.sqrt(x * x + y * y); // is r a member of point?
4 │   }
5 │ }

ℹ The with statement is potentially problematic because it adds members of an object to the current scope, making it impossible to tell what a variable inside the block actually refers to.

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)