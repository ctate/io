# noUselessUndefined

Disallow the use of useless `undefined`.

**Diagnostic Category:** `lint/nursery/noUselessUndefined`

**Since:** `vnext`

- This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `unicorn/no-useless-undefined`

`undefined` is the default value for new variables, parameters, return statements, etc., so specifying it doesn't make any difference.

## Examples

### Invalid

```js
let foo = undefined;
```
```
code-block.js:1:11 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ let foo = undefined;
   │          ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
const {foo = undefined} = bar;
```
```
code-block.js:1:14 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ const {foo = undefined} = bar;
   │             ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
const noop = () => undefined;
```
```
code-block.js:1:20 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ const noop = () => undefined;
   │                   ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function foo() {
   return undefined;
}
```
```
code-block.js:2:11 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function foo() {
2 │    return undefined;
   │          ^^^^^^^^^^
3 │ }
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function* foo() {
  yield undefined;
}
```
```
code-block.js:2:9 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function* foo() {
2 │   yield undefined;
   │         ^^^^^^^^^^
3 │ }
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function foo(bar = undefined) {}
```
```
code-block.js:1:20 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function foo(bar = undefined) {}
   │                   ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function foo({bar = undefined}) {}
```
```
code-block.js:1:21 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function foo({bar = undefined}) {}
   │                     ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

### Valid

```js
let foo;
const {foo} = bar;
function foo() {
  return;
}
function* foo() {
  yield;
}
function foo(bar) {}
function foo({bar}) {}
foo();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options