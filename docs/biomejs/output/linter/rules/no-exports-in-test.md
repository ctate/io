# noExportsInTest

Disallow using `export` or `module.exports` in files containing tests

## Diagnostic Category: `lint/suspicious/noExportsInTest`

### Since: `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Inspired from: jest/no-export

Disallow using `export` or `module.exports` in files containing tests

This rule aims to eliminate duplicate runs of tests by exporting things from test files.
If you import from a test file, then all the tests in that file will be run in each imported instance,
so bottom line, don't export from a test, but instead move helper functions into a separate file when they need to be shared across tests.

## Examples

### Invalid

```js
export function myHelper() {}
describe('a test', () => {
    expect(1).toBe(1);
});
```

```text
code-block.js:1:1 lint/suspicious/noExportsInTest 
  ✖ Do not export from a test file.
  > 1 │ export function myHelper() {}
    │   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

### Valid

```js
function myHelper() {}
describe('a test', () => {
    expect(1).toBe(1);
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options