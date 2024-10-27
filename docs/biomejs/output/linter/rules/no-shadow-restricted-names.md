# noShadowRestrictedNames

**Disallow identifiers from shadowing restricted names.**

**Diagnostic Category:** `lint/suspicious/noShadowRestrictedNames`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-shadow-restricted-names (https://eslint.org/docs/latest/rules/no-shadow-restricted-names)

## Examples

### Invalid

```js
function NaN() {}
```
```
code-block.js:1:10 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "NaN" property.
1 │ function NaN() {}
  │         ^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
let Set;
```
```
code-block.js:1:5 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "Set" property.
1 │ let Set;
  │     ^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
try {} catch(Object) {}
```
```
code-block.js:1:15 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "Object" property.
1 │ try {} catch(Object) {}
  │            ^^^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
function Array() {}
```
```
code-block.js:1:10 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "Array" property.
1 │ function Array() {}
  │         ^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
function test(JSON) {console.log(JSON)}
```
```
code-block.js:1:15 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "JSON" property.
1 │ function test(JSON) {console.log(JSON)}
  │              ^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)