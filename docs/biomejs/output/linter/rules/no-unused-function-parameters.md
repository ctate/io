# noUnusedFunctionParameters

Disallow unused function parameters.

**Diagnostic Category:** `lint/correctness/noUnusedFunctionParameters`  
**Since:** `v1.8.0`  
**Note:** This rule has an **unsafe** fix.

There is an exception to this rule: parameters that start with an underscore, e.g. `function foo(_a, _b) {}`.

## Examples

### Invalid

```js
function foo(myVar) {
    console.log('foo');
}
```

code-block.js:1:14 lint/correctness/noUnusedFunctionParameters FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This parameter is unused.  
ℹ Unused parameters might be the result of an incomplete refactoring.  
ℹ Unsafe fix: If this is intentional, prepend myVar with an underscore.

```js
new Promise((accept, reject) => {
    window.setTimeout(accept, 1000);
});
```

code-block.js:1:22 lint/correctness/noUnusedFunctionParameters FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This parameter is unused.  
ℹ Unused parameters might be the result of an incomplete refactoring.  
ℹ Unsafe fix: If this is intentional, prepend reject with an underscore.

```js
const squares = [[1, 1], [2, 4], [3, 9], [4, 16]];
squares.filter(([k, v]) => v > 5);
```

code-block.js:2:18 lint/correctness/noUnusedFunctionParameters FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This parameter is unused.  
ℹ Unused parameters might be the result of an incomplete refactoring.  
ℹ Unsafe fix: If this is intentional, prepend k with an underscore.

### Valid

```js
function foo(myVar) {
    console.log(myVar);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options