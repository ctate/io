# useTrimStartEnd

Enforce the use of `String.trimStart()` and `String.trimEnd()` over `String.trimLeft()` and `String.trimRight()`.

**Diagnostic Category:** `lint/nursery/useTrimStartEnd`

**Since:** `v1.9.0`

- This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `unicorn/prefer-string-trim-start-end`

`String.trimLeft()` and `String.trimRight()` are aliases for `String.trimStart()` and `String.trimEnd()`. Using the latter ensures consistency and is preferable for their direction-independent wording. Note that `String.trimStart()` and `String.trimEnd()` methods do not take any parameters. Any arguments passed to these methods will be ignored.

**Examples**

### Invalid

```js
const foo = bar.trimLeft();
```

**Fixable:** Use `trimStart` instead of `trimLeft`.

```js
const foo = bar.trimRight();
```

**Fixable:** Use `trimEnd` instead of `trimRight`.

### Valid

```js
const foo = bar.trimStart();
```

```js
const foo = bar.trimEnd();
```

**Related links**

- Disable a rule
- Configure the rule fix
- Rule options