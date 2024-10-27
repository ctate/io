# noUselessCatch

Disallow unnecessary `catch` clauses.

**Diagnostic Category:** `lint/complexity/noUselessCatch`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: no-useless-catch

A `catch` clause that only rethrows the original error is redundant and has no effect on the runtime behavior of the program. These redundant clauses can be a source of confusion and code bloat, so it’s better to disallow these unnecessary `catch` clauses.

## Examples

### Invalid

```js
try {
    doSomething();
} catch(e) {
    throw e;
}
```

code-block.js:4:5 lint/complexity/noUselessCatch ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The catch clause that only rethrows the original error is useless.  
2 │ doSomething();  
3 │ } catch(e) {  
4 │ throw e;  
5 │ }  

ℹ An unnecessary catch clause can be confusing.

```js
try {
    doSomething();
} catch(e) {
    throw e;
} finally {
    doCleanUp();
}
```

code-block.js:4:5 lint/complexity/noUselessCatch FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The catch clause that only rethrows the original error is useless.  
2 │ doSomething();  
3 │ } catch(e) {  
4 │ throw e;  
5 │ } finally {  
6 │ doCleanUp();  

ℹ An unnecessary catch clause can be confusing.  
ℹ Unsafe fix: Remove the catch clause.  

1 │ try {  
2 │ doSomething();  
3 │ }  
4 │ - catch(e) {  
5 │ - throw e;  
6 │ finally {  
7 │ doCleanUp();  
}

### Valid

```js
try {
    doSomething();
} catch(e) {
    doSomethingWhenCatch();
    throw e;
}
```

```js
try {
    doSomething();
} catch(e) {
    handleError(e);
}
```

```js
try {
    doSomething();
} finally {
    doCleanUp();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options