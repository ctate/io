# noSparseArray

**Description:** Disallow sparse arrays

**Diagnostic Category:** `lint/suspicious/noSparseArray`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: no-sparse-arrays documentation

## Disallow sparse arrays

### Examples

#### Invalid

```js
[1,,2]
```

**Error Message:**
code-block.js:1:1 lint/suspicious/noSparseArray FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ This array contains an empty slot.

> 1 │ [1,,2]  
  │ ^^^^^  
  2 │  

ℹ Unsafe fix: Replace hole with undefined

> 1 │ [1, undefined,2]  
  │ ++++++++++  

## Related links

- Disable a rule
- Configure the rule fix
- Rule options