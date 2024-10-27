# noThenProperty

**Description:** Disallow `then` property.

**Diagnostic Category:** `lint/suspicious/noThenProperty`

**Since:** `v1.5.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: unicorn/no-thenable (https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md)

## Disallow `then` property

When combining objects with a `then` method (thenable objects) with await expressions or dynamic imports, caution is necessary. These syntaxes interpret the object's then method as intended for the resolution or rejection of a promise, which can lead to unexpected behavior or errors.

## Examples

### Invalid

```js
export {then};
```
```
code-block.js:1:9 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not export then.
1 │ export {then};
```

```js
const foo = {
    then() {}
};
```
```
code-block.js:2:5 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to an object.
1 │ const foo = {
2 │     then() {}
```

```js
const foo = {
    get then() {}
};
```
```
code-block.js:2:9 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to an object.
1 │ const foo = {
2 │     get then() {}
```

```js
foo.then = function () {}
```
```
code-block.js:1:1 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to an object.
1 │ foo.then = function () {}
```

```js
class Foo {
    then() {}
}
```
```
code-block.js:2:5 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to a class.
1 │ class Foo {
2 │     then() {}
```

```js
class Foo {
    static then() {}
}
```
```
code-block.js:2:12 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to a class.
1 │ class Foo {
2 │     static then() {}
```

### Valid

```js
export {then as success};
```

```js
const foo = {
    success() {}
};
```

```js
class Foo {
    success() {}
}
```

```js
const foo = bar.then;
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)