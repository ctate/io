# useDateNow

Use `Date.now()` to get the number of milliseconds since the Unix Epoch.

**Diagnostic Category:** `lint/complexity/useDateNow`

**Since:** `v1.8.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `unicorn/prefer-date-now`

`Date.now()` is more readable than `new Date().getTime()` and its variants, and it also avoids unnecessary instantiation of the `Date` object.

## Examples

### Invalid

```js
const foo = new Date().getTime();
```
Warning: Use `Date.now()` instead of `new Date().getTime()`.

```js
const foo = new Date().valueOf();
```
Warning: Use `Date.now()` instead of `new Date().valueOf()`.

```js
const foo = +new Date();
```
Warning: Use `Date.now()` instead of `new Date()`.

```js
const foo = Number(new Date());
```
Warning: Use `Date.now()` instead of `Number(new Date())`.

```js
const foo = new Date() * 2;
```
Warning: Use `Date.now()` instead of `new Date()`.

### Valid

```js
const foo = Date.now();
```

```js
const foo = Date.now() * 2;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options