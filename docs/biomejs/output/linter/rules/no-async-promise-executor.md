# noAsyncPromiseExecutor

Disallows using an async function as a Promise executor.

**Diagnostic Category: `lint/suspicious/noAsyncPromiseExecutor`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-async-promise-executor`

The executor function can also be an async function. However, this is usually a mistake, for a few reasons:

1. If an async executor function throws an error, the error will be lost and won't cause the newly-constructed `Promise` to reject. This could make it difficult to debug and handle some errors.
2. If a Promise executor function is using `await`, this is usually a sign that it is not actually necessary to use the `new Promise` constructor, or the scope of the `new Promise` constructor can be reduced.

## Examples

### Invalid

```javascript
new Promise(async function foo(resolve, reject) {})
```

```javascript
new Promise(async (resolve, reject) => {})
```

```javascript
new Promise(((((async () => {})))))
```

### Valid

```javascript
new Promise((resolve, reject) => {})
new Promise((resolve, reject) => {}, async function unrelated() {})
new Foo(async (resolve, reject) => {})
new Foo((( (resolve, reject) => {} )))
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options