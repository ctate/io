# noDoneCallback

Disallow using a callback in asynchronous tests and hooks.

## Diagnostic Category: `lint/style/noDoneCallback`

### Since: `v1.6.1`

Sources: 
- Same as: jest/no-done-callback

Disallow using a callback in asynchronous tests and hooks.

This rule checks the function parameter of hooks and tests for use of the `done` argument, suggesting you return a promise instead.

## Examples

### Invalid

```js
beforeEach((done) => {
    // ...
});
```

```text
code-block.js:1:13 lint/style/noDoneCallback ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ⚠ Disallow using a callback in asynchronous tests and hooks.
 
 1 │ beforeEach((done) => { 
 │            ^^^^
 2 │     // ...
 3 │ });
 
 ℹ Return a Promise instead of relying on callback parameter.
```

```js
test('tets-name', (done) => {
    // ...
});
```

```text
code-block.js:1:20 lint/style/noDoneCallback ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ⚠ Disallow using a callback in asynchronous tests and hooks.
 
 1 │ test('tets-name', (done) => { 
 │                   ^^^^
 2 │     // ...
 3 │ });
 
 ℹ Return a Promise instead of relying on callback parameter.
```

### Valid

```js
beforeEach(async () => {
    // ...
});
```

```js
test('test-name', () => {
    expect(myFunction()).toBeTruthy();
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options