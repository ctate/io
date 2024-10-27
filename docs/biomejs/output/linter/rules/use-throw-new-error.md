# useThrowNewError

Require `new` when throwing an error.

**Diagnostic Category:** `lint/style/useThrowNewError`

**Since:** `v1.8.0`

:::note
- This rule has an **unsafe** fix.
:::

**Sources:** 
- Same as: `unicorn/throw-new-error`

Require `new` when throwing an error. While it's possible to instantiate `Error` without using the `new` keyword, it's better to be consistent: modern builtins require `new` to be instantiated. Rule matches errors when their name ends with the word "Error" and the first character is uppercase.

## Examples

### Invalid

```js
throw Error();
```
**Diagnostic:** 
- FIXABLE 
- ⚠ Use `new Error()` instead of `Error()` when throwing an error.
- ℹ Instantiate `Error` with `new` keyword for consistency with modern builtins.
- Unsafe fix: Add `new` keyword.

```js
throw TypeError('biome');
```
**Diagnostic:** 
- FIXABLE 
- ⚠ Use `new TypeError()` instead of `TypeError()` when throwing an error.
- ℹ Instantiate `Error` with `new` keyword for consistency with modern builtins.
- Unsafe fix: Add `new` keyword.

```js
throw lib.TypeError();
```
**Diagnostic:** 
- FIXABLE 
- ⚠ Use `new TypeError()` instead of `TypeError()` when throwing an error.
- ℹ Instantiate `Error` with `new` keyword for consistency with modern builtins.
- Unsafe fix: Add `new` keyword.

### Valid

```js
throw new Error();
```

```js
throw new TypeError('biome');
```

```js
throw new lib.TypeError();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options