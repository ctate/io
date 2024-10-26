# noControlCharactersInRegex

**Diagnostic Category: `lint/suspicious/noControlCharactersInRegex`**

**Since**: `v1.0.0`

:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: no-control-regex

Prevents from having control characters and some escape sequences that match control characters in regular expressions.

Control characters are hidden special characters that are numbered from 0 to 31 in the ASCII system.
They're not commonly used in JavaScript text. So, if you see them in a pattern (called a regular expression), it's probably a mistake.

The following elements of regular expression patterns are considered possible errors in typing and are therefore disallowed by this rule:

- Hexadecimal character escapes from `\x00` to `\x1F`
- Unicode character escapes from `\u0000` to `\u001F`
- Unicode code point escapes from `\u{0}` to `\u{1F}`
- Unescaped raw characters from U+0000 to U+001F

Control escapes such as `\t` and `\n` are allowed by this rule.

## Examples

### Invalid

```js
var pattern1 = /\x00/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern1 = /\x00/;
   │                 ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern2 = /\x0C/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern2 = /\x0C/;
   │                 ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern3 = /\x1F/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern3 = /\x1F/;
   │                 ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern4 = /\u000C/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern4 = /\u000C/;
   │                 ^^^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern5 = /\u{C}/u;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern5 = /\u{C}/u;
   │                 ^^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern7 = new RegExp("\x0C");
```

```text
code-block.js:1:29 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern7 = new RegExp("\x0C");
   │                            ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern7 = new RegExp("\\x0C");
```

```text
code-block.js:1:29 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern7 = new RegExp("\\x0C");
   │                            ^^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

### Valid

```js
var pattern1 = /\x20/;
var pattern2 = /\u0020/;
var pattern3 = /\u{20}/u;
var pattern4 = /\t/;
var pattern5 = /\n/;
var pattern6 = new RegExp("\x20");
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options