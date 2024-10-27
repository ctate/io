# useDefaultSwitchClause

Require the default clause in switch statements.

**Diagnostic Category:** `lint/style/useDefaultSwitchClause`

**Since:** `v1.7.2`  
**Sources:** Same as: default-case

Some code conventions require that all switch statements have a default clause. The thinking is that it’s better to always explicitly state what the default behavior should be so that it’s clear whether or not the developer forgot to include the default behavior by mistake.

## Examples

### Invalid

```js
switch (a) {
    case 1:
        /* code */
        break;
}
```

code-block.js:1:1 lint/style/useDefaultSwitchClause ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Expected a default switch clause.

> 1 │ switch (a) {  
> 2 │     case 1:  
> 3 │         /* code */  
> 4 │         break;  
> 5 │ }  
> 6 │  

ℹ The lack of a default clause can be a possible omission.  
ℹ Consider adding a default clause.  

### Valid

```js
switch (a) {
    case 1:
        /* code */
        break;
    default:
        /* code */
        break;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options