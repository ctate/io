# noSkippedTests

**Diagnostic Category: `lint/suspicious/noSkippedTests`**

**Since**: `v1.6.0`

:::note
- This rule has an **unsafe** fix.
:::

Sources: 
- Inspired from: jest/no-disabled-tests documentation

Disallow disabled tests. Disabled tests are useful for development and debugging but should not be committed in production.

## Examples

### Invalid

```js
describe.skip("test", () => {});
```
```
code-block.js:1:10 lint/suspicious/noSkippedTests FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Don't disable tests.

> 1 │ describe.skip("test", () => {});
   │         ^^^^
2 │ 

ℹ Disabling tests is useful when debugging or creating placeholders while working.

ℹ If this is intentional, and you want to commit a disabled test, add a suppression comment.

ℹ Unsafe fix: Enable the test.

1 │ describe("test", () => {});
   │        -----
```

```js
test.skip("test", () => {});
```
```
code-block.js:1:6 lint/suspicious/noSkippedTests FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Don't disable tests.

> 1 │ test.skip("test", () => {});
   │     ^^^^
2 │ 

ℹ Disabling tests is useful when debugging or creating placeholders while working.

ℹ If this is intentional, and you want to commit a disabled test, add a suppression comment.

ℹ Unsafe fix: Enable the test.

1 │ test("test", () => {});
   │    -----
```

## Valid

```js
test.only("test", () => {});
test("test", () => {});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options