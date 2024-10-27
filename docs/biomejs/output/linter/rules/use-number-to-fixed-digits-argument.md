# useNumberToFixedDigitsArgument

Enforce using the digits argument with `Number#toFixed()`.

**Diagnostic Category:** `lint/suspicious/useNumberToFixedDigitsArgument`  
**Since:** `v1.8.0`  
**Note:** This rule has an **unsafe** fix.

Sources: Same as: `unicorn/require-number-to-fixed-digits-argument`

When using `Number#toFixed()`, explicitly specify the number of digits you want to appear after the decimal point to avoid unexpected results, rather than relying on its default value of 0.

## Examples

### Invalid

```js
const string = number.toFixed();
```

Diagnostic message:  
code-block.js:1:30 lint/suspicious/useNumberToFixedDigitsArgument FIXABLE  
⚠ Specify the number of digits you want to appear after the decimal point.  
1 │ const string = number.toFixed();  
   │                             ^^  
2 │  

Unsafe fix: Add explicit digits argument to `toFixed` method.  
1 │ const string = number.toFixed(0);  

### Valid

```js
const string = foo.toFixed(0);
```

```js
const string = foo.toFixed(2);
```

## Caveats

This rule always assumes that `toFixed` is called on a number. It does not check the type of the callee.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options