# noDuplicateTestHooks

A `describe` block should not contain duplicate hooks.

## Diagnostic Category: `lint/suspicious/noDuplicateTestHooks`

### Since: `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Inspired from: jest/no-duplicate-hooks

## Examples

### Invalid

```javascript
describe('foo', () => {
  beforeEach(() => {
    // some setup
  });
  beforeEach(() => {
    // some setup
  });
  test('foo_test', () => {
   // some test
  });
});
```

```javascript
describe('foo', () => {
  beforeEach(() => {
    // some setup
  });
  test('foo_test', () => {
    afterAll(() => {
      // some teardown
    });
   afterAll(() => {
     // some teardown
   });
  });
});
```

### Valid

```javascript
describe('foo', () => {
  beforeEach(() => {
    // some setup
  });
  test('foo_test', () => {
    // some test
  });
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options