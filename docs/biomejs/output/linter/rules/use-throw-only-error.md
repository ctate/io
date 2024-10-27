# useThrowOnlyError

**Description:** Disallow throwing non-`Error` values.

**Diagnostic Category:** `lint/style/useThrowOnlyError`

**Since:** `v1.8.0`

**Sources:**
- Inspired from: no-throw-literal (https://eslint.org/docs/latest/rules/no-throw-literal)
- Inspired from: @typescript-eslint/only-throw-error (https://typescript-eslint.io/rules/only-throw-error)

It is considered good practice only to throw the `Error` object itself or an object using the `Error` object as base objects for user-defined exceptions. The fundamental benefit of `Error` objects is that they automatically keep track of where they were built and originated.

## Examples

### Invalid

```js
throw undefined;
```
Diagnostic: Throwing non-`Error` values is not allowed.

```js
throw false;
```
Diagnostic: Throwing non-`Error` values is not allowed.

```js
throw "a" + "b";
```
Diagnostic: Throwing non-`Error` values is not allowed.

### Valid

```js
throw new Error();
```

```js
throw new TypeError('biome');
```

```js
class CustomError extends Error {}

throw new CustomError();
```

## Caveats

This rule only covers cases where throwing the value can be known statically. Complex cases such as object and function access aren't checked. This will be improved in the future once Biome supports type inference.

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)