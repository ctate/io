# useTopLevelRegex

Require regex literals to be declared at the top level.

**Diagnostic Category:** `lint/performance/useTopLevelRegex`

**Since:** `v1.8.0`

Require regex literals to be declared at the top level. This rule is useful to avoid performance issues when using regex literals inside functions called many times (hot paths). Regex literals create a new RegExp object when they are evaluated. By declaring them at the top level, this overhead can be avoided.

It's important to note that this rule is not recommended for all cases. Placing regex literals at the top level can hurt startup times. In browser contexts, this can result in longer page loads.

Additionally, this rule ignores regular expressions with the `g` and/or `y` flags, as they maintain internal state and can cause side effects when calling `test` and `exec` with them.

## Examples

### Invalid

```js
function foo(someString) {
    return /[a-Z]*/.test(someString)
}
```

code-block.js:2:12 lint/performance/useTopLevelRegex ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This regex literal is not defined in the top level scope. This can lead to performance issues if this function is called frequently.  

1 │ function foo(someString) {  
2 │ return /[a-Z]*/.test(someString)  
   │ ^  
3 │ }  
4 │  

ℹ Move the regex literal outside of this scope, and place it at the top level of this module as a constant.

### Valid

```js
const REGEX = /[a-Z]*/;

function foo(someString) {
    return REGEX.test(someString)
}
```

```js
function foo(str) {
    return /[a-Z]*/g.exec(str)
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options