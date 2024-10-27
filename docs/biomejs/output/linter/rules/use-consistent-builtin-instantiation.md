# useConsistentBuiltinInstantiation

Enforce the use of `new` for all builtins, except `String`, `Number`, and `Boolean`.

**Diagnostic Category:** `lint/style/useConsistentBuiltinInstantiation`

**Since:** `v1.7.2`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `no-new-wrappers`

This rule enforces the use of `new` for the following builtins:

- AggregateError
- Array
- Date
- Error
- EvalError
- Object
- Promise
- RangeError
- ReferenceError
- RegExp
- SyntaxError
- TypeError
- URIError

Disallows the use of `new` for the following builtins:

- Boolean
- Number
- String

These should not use `new` as that would create object wrappers for the primitive values, which is not desired. However, without `new`, they can be useful for coercing a value to that type.

Note that builtins that require `new` to be instantiated and builtins that require no `new` to be instantiated (e.g., `Symbol` and `BigInt`) are covered by the `noInvalidBuiltinInstantiation` rule.

## Examples

### Invalid

```js
const text = new String(10);
```

**Error:** Use `String()` instead of `new String()`.

```js
const now = Date();
```

**Error:** Use `new Date()` instead of `Date()`.

### Valid

```js
const text = String(10);
```

```js
const now = new Date();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options