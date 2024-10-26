# noFocusedTests
Disallow focused tests.

**Diagnostic Category: `lint/suspicious/noFocusedTests`**

**Since**: `v1.6.0`

* This rule is recommended by Biome. A diagnostic error will appear when linting your code.
* This rule has an **unsafe** fix.

Sources: 
- Inspired from: jest/no-focused-tests

Disallow focused tests.

Disabled test are useful when developing and debugging, because it forces the test suite to run only certain tests.

However, in pull/merge request, you usually want to run all the test suite.

## Examples

### Invalid

```js
describe.only("foo", () => {});
```

```js
test.only("foo", () => {});
```

### Valid

```js
test("foo", () => {});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options