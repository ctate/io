# noStringCaseMismatch

**Description:** Disallow comparison of expressions modifying the string case with non-compliant value.

**Diagnostic Category:** `lint/correctness/noStringCaseMismatch`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: match_str_case_mismatch (https://rust-lang.github.io/rust-clippy/master/#/match_str_case_mismatch)

## Examples

### Invalid

```js
if (s.toUpperCase() === "Abc") {}
```
**Error:** This expression always returns false.

```js
while (s.toLowerCase() === "Abc") {}
```
**Error:** This expression always returns false.

### Valid

```js
if (s.toUpperCase() === "ABC") {}
while (s.toLowerCase() === "abc") {}
for (;s.toLocaleLowerCase() === "ABC";) {}
while (s.toLocaleUpperCase() === "abc") {}
for (let s = "abc"; s === "abc"; s = s.toUpperCase()) {}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)