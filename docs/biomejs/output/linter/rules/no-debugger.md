# noDebugger

Disallow the use of `debugger`

## Diagnostic Category: `lint/suspicious/noDebugger`

### JavaScript (and super languages)

**Since**: `v1.0.0`

* This rule is recommended by Biome. A diagnostic error will appear when linting your code.
* This rule has an **unsafe** fix.

Sources: 
- Same as: `no-debugger` eslint.org/docs/latest/rules/no-debugger

## Examples

### Invalid

```js
debugger;
```

```
code-block.js:1:1 lint/suspicious/noDebugger  FIXABLE 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ This is an unexpected use of the debugger statement.
 
> 1 │ debugger;
 │ ^^^^^^^^^
 
 ℹ Unsafe fix: Remove debugger statement
 1 │ debugger;
 │ - - - - - - - - - - -
```

### Valid

```js
const test = { debugger: 1 };
test.debugger;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options