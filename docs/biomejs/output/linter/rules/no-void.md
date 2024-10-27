# noVoid

Disallow the use of `void` operators, which is not a familiar operator.

**Diagnostic Category: `lint/complexity/noVoid`**

**Since**: `v1.0.0`  
Sources: Same as: no-void (see ESLint documentation)

The `void` operator is often used merely to obtain the undefined primitive value, usually using `void(0)` (which is equivalent to `void 0`). In these cases, the global variable `undefined` can be used.

## Examples

### Invalid

```js
void 0;
```

code-block.js:1:1 lint/complexity/noVoid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ The use of void is not allowed.  
> 1 │ void 0;  
>   │ ^^^^^^  
> 2 │  

ℹ If you use void to alter the return type of a function or return `undefined`, use the global `undefined` instead.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options