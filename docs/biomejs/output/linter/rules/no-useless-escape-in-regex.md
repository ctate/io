# noUselessEscapeInRegex

Disallow unnecessary escape sequence in regular expression literals.

**Diagnostic Category:** `lint/nursery/noUselessEscapeInRegex`

**Since:** `v1.9.0`

**Note:** This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: no-useless-escape

Escaping non-special characters in regular expression literals doesn't have any effect, which may confuse a reader.

## Examples

### Invalid

```js
/\a/;
```
code-block.js:1:2 lint/nursery/noUselessEscapeInRegex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The character doesn't need to be escaped.  
1 │ /\a/;  
  │ ^  
2 │  
ℹ Safe fix: Unescape the character.  
1 │ /a/;  
  │ -  

```js
/[\-]/;
```
code-block.js:1:3 lint/nursery/noUselessEscapeInRegex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The character doesn't need to be escaped.  
1 │ /[\-]/;  
  │ ^^  
2 │  
ℹ The character should only be escaped if it appears in the middle of the character class or under the v flag.  
ℹ Safe fix: Unescape the character.  
1 │ /[-]/;  
  │  

```js
/[\&]/v;
```
code-block.js:1:3 lint/nursery/noUselessEscapeInRegex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The character doesn't need to be escaped.  
1 │ /[\&]/v;  
  │ ^^  
2 │  
ℹ Safe fix: Unescape the character.  
1 │ /[&]/v;  
  │  

### Valid

```js
/\^\d\b/
```

```js
/[\b]/
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options