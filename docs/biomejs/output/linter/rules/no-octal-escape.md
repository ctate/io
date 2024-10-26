# noOctalEscape
Disallow octal escape sequences in string literals

**Diagnostic Category: `lint/nursery/noOctalEscape`**

**Since**: `v1.9.3`

This rule is part of the nursery group.

Sources: 
- Same as: no-octal-escape

Disallow octal escape sequences in string literals

As of the ECMAScript 5 specification, octal escape sequences in string literals are deprecated and should not be used.
Unicode escape sequences should be used instead.

### Examples

### Invalid

```js
var foo = "Copyright \251";
```

```text
code-block.js:1:11 lint/nursery/noOctalEscape ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
 ⚠ Don't use octal
 
 > 1 │ var foo = "Copyright \251";
   │          ^^^^^^^^^^^^^^^
 
 ℹ Don't use octal escape sequences: "Copyright \251"
 ℹ Use unicode or hexidecimal escape sequences instead.
```

### Valid

```js
var foo = "Copyright \u00A9";   // unicode

var foo = "Copyright \xA9";     // hexadecimal
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options