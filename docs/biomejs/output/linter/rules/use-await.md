# useAwait

**Description:** Ensure `async` functions utilize `await`.

**Diagnostic Category:** `lint/suspicious/useAwait`

**Since:** `v1.4.0`

**Sources:**
- Same as: require-await documentation
- Same as: @typescript-eslint/require-await documentation

This rule reports `async` functions that lack an `await` expression. As `async` functions return a promise, the use of `await` is often necessary to capture the resolved value and handle the asynchronous operation appropriately. Without `await`, the function operates synchronously and might not leverage the advantages of async functions.

## Examples

### Invalid

```js
async function fetchData() {
  // Missing `await` for the promise returned by `fetch`
  return fetch('/data');
}
```

**Warning:**
This async function lacks an await expression.

**Suggestion:**
Remove this async modifier, or add an await expression in the function.

### Valid

```js
async function fetchData() {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
}

// This rule does not warn about non-async functions
function processData() {
  return compute(data);
}

// Nor does it warn about empty async functions
async function noop() { }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options