# useGuardForIn

Require `for-in` loops to include an `if` statement.

**Diagnostic Category:** `lint/nursery/useGuardForIn`

**Since:** `v1.9.4`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `guard-for-in` (https://eslint.org/docs/latest/rules/guard-for-in)

Looping over objects with a `for-in` loop will include properties inherited through the prototype chain. This behavior can lead to unexpected items in your for loop.

For codebases that do not support ES2022, `Object.prototype.hasOwnProperty.call(foo, key)` can be used as a check that the property is not inherited.

For codebases that do support ES2022, `Object.hasOwn(foo, key)` can be used as a shorter and more reliable alternative.

## Examples

### Invalid

```js
for (key in foo) {
  doSomething(key);
}
```

**Diagnostic Message:**
code-block.js:1:1 lint/nursery/useGuardForIn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ The body of a for-in should be wrapped in an `if` statement.  

1 │ for (key in foo) {  
2 │   doSomething(key);  
3 │ }  

ℹ Looping over the object with for-in loop will include properties that are inherited through the prototype chain, the behavior can lead to some unexpected items in your loop.  
ℹ To resolve this issue, add an if statement like `if (Object.hasOwn(foo, key)) {...}` to filter out the extraneous properties.  

### Valid

```js
for (key in foo) {
  if (Object.hasOwn(foo, key)) {
    doSomething(key);
  }
}
```

```js
for (key in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

```js
for (key in foo) {
  if ({}.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)