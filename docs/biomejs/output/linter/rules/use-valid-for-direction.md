# useValidForDirection

Enforce "for" loop update clause moving the counter in the right direction.

**Diagnostic Category:** `lint/correctness/useValidForDirection`

**Since:** `v1.0.0`

**Note:** 
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: for-direction (https://eslint.org/docs/latest/rules/for-direction)

A for loop with a stop condition that can never be reached, such as one with a counter that moves in the wrong direction, will run infinitely. While there are occasions when an infinite loop is intended, the convention is to construct such loops as while loops. More typically, an infinite for loop is a bug.

## Examples

### Invalid

```js
for (var i = 0; i < 10; i--) {
}
```
code-block.js:1:5 lint/correctness/useValidForDirection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The update clause in this loop moves the variable in the wrong direction.  
> 1 │ for (var i = 0; i < 10; i--) {  
> 2 │ }  

```js
for (var i = 10; i >= 0; i++) {
}
```
code-block.js:1:5 lint/correctness/useValidForDirection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The update clause in this loop moves the variable in the wrong direction.  
> 1 │ for (var i = 10; i >= 0; i++) {  
> 2 │ }  

```js
for (var i = 0; i > 10; i++) {
}
```
code-block.js:1:5 lint/correctness/useValidForDirection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The update clause in this loop moves the variable in the wrong direction.  
> 1 │ for (var i = 0; i > 10; i++) {  
> 2 │ }  

### Valid

```js
for (var i = 0; i < 10; i++) {
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)