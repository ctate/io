# noConsoleLog

Disallow the use of `console.log`

**Diagnostic Category: `lint/suspicious/noConsoleLog`**

This rule is deprecated and will be removed in the next major release.
**Reason**: Use the rule noConsole instead.
**Since**: `v1.0.0`

This rule has an **unsafe** fix.

Disallow the use of `console.log`

## Examples

### Invalid

```js
console.log()
```

code-block.js:1:1 lint/suspicious/noConsoleLog  FIXABLE 
 Don't use console.log 
 1 │ console.log()
   │ ^^^^^^^^^^^
 console.log is usually a tool for debugging and you don't want to have that in production.
 If it is not for debugging purpose then using console.info might be more appropriate.
 Unsafe fix: Remove console.log
 1 │ console.log()

### Valid

```js
console.info("info");
console.warn("warn");
console.error("error");
console.assert(true);
console.table(["foo", "bar"]);
const console = { log() {} };
console.log();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options