# noArguments
Disallow the use of `arguments`.

**Diagnostic Category: `lint/style/noArguments`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: prefer-rest-params

## Examples

### Invalid

```javascript
function f() {
   console.log(arguments);
}
```

code-block.js:2:16 lint/style/noArguments ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ Use the rest parameters instead of arguments.
 
  1 │ function f() {
 2 │   console.log(arguments);
  │               ^^^^^^^^^
 3 │ }
 
 ℹ arguments does not have Array.prototype methods and can be inconvenient to use.

### Valid

```javascript
function f() {
    let arguments = 1;
    console.log(arguments);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options