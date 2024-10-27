# noUselessStringRaw

Disallow unnecessary `String.raw` function in template string literals without any escape sequence.

**Diagnostic Category:** `lint/nursery/noUselessStringRaw`  
**Since:** `v1.9.4`  
**Caution:** This rule is part of the nursery group.

`String.raw` is useless when it contains a raw string without any escape-like sequence.

## Examples

### Invalid

```js
String.raw`a`;
```
code-block.js:1:1 lint/nursery/noUselessStringRaw ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ String.raw is useless when the raw string doesn't contain any escape sequence.  
> 1 │ String.raw`a`;  
> 2 │  
ℹ Remove the String.raw call because it's useless here, String.raw can deal with strings that contain escape sequences like \n, \t, \r, \\, \", \'.

```js
String.raw`a ${v}`;
```
code-block.js:1:1 lint/nursery/noUselessStringRaw ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ String.raw is useless when the raw string doesn't contain any escape sequence.  
> 1 │ String.raw`a ${v}`;  
> 2 │  
ℹ Remove the String.raw call because it's useless here, String.raw can deal with strings that contain escape sequences like \n, \t, \r, \\, \", \'.

### Valid

```js
String.raw`\n ${a}`;
```

```js
String.raw`\n`;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options