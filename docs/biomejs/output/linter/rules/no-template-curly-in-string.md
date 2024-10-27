# noTemplateCurlyInString

**Description:** Disallow template literal placeholder syntax in regular strings.

**Diagnostic Category:** `lint/nursery/noTemplateCurlyInString`

**Since:** `v1.9.3`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: no-template-curly-in-string (https://eslint.org/docs/latest/rules/no-template-curly-in-string)

## Overview

ECMAScript 6 allows the creation of strings containing variables or expressions using template literals. Incorrect usage of quotes can lead to unintended literal values instead of evaluated expressions.

## Examples

### Invalid

```js
const a = "Hello ${name}!";
```
```
code-block.js:1:18 lint/nursery/noTemplateCurlyInString ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexpected template string placeholder.
> 1 │ const a = "Hello ${name}!";
   │                 ^^^^^^^^
ℹ Turn the string into a template string.
```

```js
const a = 'Hello ${name}!';
```
```
code-block.js:1:18 lint/nursery/noTemplateCurlyInString ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexpected template string placeholder.
> 1 │ const a = 'Hello ${name}!';
   │                 ^^^^^^^^
ℹ Turn the string into a template string.
```

```js
const a = "Time: ${12 * 60 * 60 * 1000}";
```
```
code-block.js:1:18 lint/nursery/noTemplateCurlyInString ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexpected template string placeholder.
> 1 │ const a = "Time: ${12 * 60 * 60 * 1000}";
   │                 ^^^^^^^^^^^^^^^^^^^
ℹ Turn the string into a template string.
```

### Valid

```js
const a = `Hello ${name}!`;
const a = `Time: ${12 * 60 * 60 * 1000}`;
const a = templateFunction`Hello ${name}`;
```

## Related Links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)