# noSelfCompare

**Description:** Disallow comparisons where both sides are exactly the same.

**Diagnostic Category:** `lint/suspicious/noSelfCompare`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**
- Same as: no-self-compare (https://eslint.org/docs/latest/rules/no-self-compare)
- Same as: eq_op (https://rust-lang.github.io/rust-clippy/master/#/eq_op)

Disallow comparisons where both sides are exactly the same. Comparing a variable against itself is usually an error, either a typo or refactoring error. It is confusing to the reader and may potentially introduce a runtime error.

The only time you would compare a variable against itself is when testing for `NaN`. However, it is more appropriate to use `typeof x === 'number' && Number.isNaN(x)` for that use case.

## Examples

### Invalid

```js
if (x === x) {}
```
code-block.js:1:5 lint/suspicious/noSelfCompare ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Comparing to itself is potentially pointless.  
> 1 │ if (x === x) {}  
> 2 │  

```js
if (a.b.c() !== a.b.c()) {}
```
code-block.js:1:5 lint/suspicious/noSelfCompare ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Comparing to itself is potentially pointless.  
> 1 │ if (a.b.c() !== a.b.c()) {}  
> 2 │  

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)