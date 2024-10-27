# useRegexLiterals

Enforce the use of the regular expression literals instead of the RegExp constructor if possible.

**Diagnostic Category:** `lint/complexity/useRegexLiterals`

**Since:** `v1.3.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** 
- Same as: prefer-regex-literals

There are two ways to create a regular expression:
- Regular expression literals, e.g., `/abc/u`.
- The RegExp constructor function, e.g., `new RegExp("abc", "u")`.

The constructor function is particularly useful when you want to dynamically generate the pattern, because it takes string arguments. Using regular expression literals avoids some escaping required in a string literal and are easier to analyze statically.

## Examples

### Invalid

```js
new RegExp("abc", "u");
```

**Diagnostic Message:**
code-block.js:1:1 lint/complexity/useRegexLiterals FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use a regular expression literal instead of the RegExp constructor.

> 1 │ new RegExp("abc", "u");
> 2 │ 

ℹ Regular expression literals avoid some escaping required in a string literal, and are easier to analyze statically.

ℹ Safe fix: Use a literal notation instead.

```js
// Fix
/abc/u;
```

### Valid

```js
/abc/u;

new RegExp("abc", flags);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options