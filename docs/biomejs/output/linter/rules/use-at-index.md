# useAtIndex

Use `at()` instead of integer index access.

**Diagnostic Category:** `lint/nursery/useAtIndex`

**Since:** `v1.9.4`

**Note:** This rule has an **unsafe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Inspired from: `unicorn/prefer-at`

Use `at()` instead of integer index access.

Accessing an element at the end of an array or a string is inconvenient because you have to subtract the length of the array or the string from the backward 1-based index of the element to access. For example, to access the last element of an array or a string, you would have to write `array[array.length - 1]`. A more convenient way to achieve the same thing is to use the `at()` method with a negative index. To access the last element of an array or a string just write `array.at(-1)`.

This rule enforces the usage of `at()` over index access, `charAt()`, and `slice()[0]` when `at()` is more convenient.

## Examples

### Invalid

```js
const foo = array[array.length - 1];
```

**Warning:** Prefer `X.at(-Y)` over `X[X.length - Y]`.

```js
const foo = array[array.length - 5];
```

**Warning:** Prefer `X.at(-Y)` over `X[X.length - Y]`.

```js
const foo = array.slice(-1)[0];
```

**Warning:** Prefer `X.at(Y)` over `X.slice(Y)[0]`.

```js
const foo = array.slice(-1).pop();
```

**Warning:** Prefer `X.at(-1)` over `X.slice(-a).pop()`.

```js
const foo = array.slice(-5).shift();
```

**Warning:** Prefer `X.at(Y)` over `X.slice(Y).shift()`.

```js
const foo = string.charAt(string.length - 5);
```

**Warning:** Prefer `X.at(-Y)` over `X.charAt(X.length - Y)`.

### Valid

```js
const foo = array.at(-1);
```

```js
const foo = array.at(-5);
```

```js
const foo = array[100];
```

```js
const foo = array.at(array.length - 1);
```

```js
array[array.length - 1] = foo;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options