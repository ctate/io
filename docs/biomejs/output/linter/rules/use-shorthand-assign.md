# useShorthandAssign

Require assignment operator shorthand where possible.

**Diagnostic Category:** `lint/style/useShorthandAssign`

**Since:** `v1.3.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `operator-assignment` (https://eslint.org/docs/latest/rules/operator-assignment)

JavaScript provides shorthand operators combining a variable assignment and simple mathematical operation.

## Examples

### Invalid

```js
a = a + 1;
```
code-block.js:1:1 lint/style/useShorthandAssign FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Assignment (=) can be replaced with operator assignment +=.  
> 1 │ a = a + 1;  
  │ ^^^^^^^^^^  
ℹ Unsafe fix: Use += instead.

```js
a = a - 1;
```
code-block.js:1:1 lint/style/useShorthandAssign FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Assignment (=) can be replaced with operator assignment -=.  
> 1 │ a = a - 1;  
  │ ^^^^^^^^^^  
ℹ Unsafe fix: Use -= instead.

```js
a = a * 1;
```
code-block.js:1:1 lint/style/useShorthandAssign FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Assignment (=) can be replaced with operator assignment *=.  
> 1 │ a = a * 1;  
  │ ^^^^^^^^^^  
ℹ Unsafe fix: Use *= instead.

### Valid

```js
a += 1;
```

```js
a -= 1;
```

```js
a *= 1;
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)