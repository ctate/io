# useYield

Require generator functions to contain `yield`.

**Diagnostic Category:** `lint/correctness/useYield`

**Since:** `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: require-yield

Require generator functions to contain `yield`. This rule generates warnings for generator functions that do not have the `yield` keyword.

## Examples

### Invalid

```js
function* foo() {
  return 10;
}
```

code-block.js:1:1 lint/correctness/useYield ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ This generator function doesn't contain yield.

> 1 │ function* foo() {  
>   │ ^^^^^^^^^^^^^^^^^  
> 2 │   return 10;  
> 3 │ }  
>   │ ^  

### Valid

```js
function* foo() {
  yield 5;
  return 10;
}

function foo() {
  return 10;
}

// This rule does not warn on empty generator functions.
function* foo() { }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options