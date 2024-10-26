# noNonoctalDecimalEscape

**Diagnostic Category: `lint/correctness/noNonoctalDecimalEscape`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: no-nonoctal-decimal-escape

Disallow `\8` and `\9` escape sequences in string literals.

Since ECMAScript 2021, the escape sequences \8 and \9 have been defined as non-octal decimal escape sequences.
However, most JavaScript engines consider them to be "useless" escapes. For example:

```js
"\8" === "8"; // true
"\9" === "9"; // true
```

Although this syntax is deprecated, it is still supported for compatibility reasons.
If the ECMAScript host is not a web browser, this syntax is optional.
However, web browsers are still required to support it, but only in non-strict mode.
Regardless of your targeted environment, it is recommended to avoid using these escape sequences in new code.

## Examples

### Invalid

```js
const x = "\8";
```

```js
const x = "Don't use \8 escape.";
```

```js
const x = "Don't use \9 escape.";
```

### Valid

```js
const x = "8";
```

```js
const x = "Don't use \\8 and \\9 escapes.";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options