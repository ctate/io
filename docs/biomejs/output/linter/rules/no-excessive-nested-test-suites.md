# noExcessiveNestedTestSuites

**Diagnostic Category: `lint/complexity/noExcessiveNestedTestSuites`**

**Since**: `v1.6.0`

This rule enforces a maximum depth to nested `describe()` in test files.

To improve code clarity in your tests, the rule limits nested `describe` to 5.

## Examples

### Invalid

```js
describe('foo', () => {
  describe('bar', () => {
    describe('baz', () => {
      describe('qux', () => {
        describe('quxx', () => {
          describe('too many', () => {
            it('should get something', () => {
              expect(getSomething()).toBe('Something');
            });
          });
        });
      });
    });
  });
});
```

Excessive `describe()` nesting detected.

### Valid

```js
describe('foo', () => {
  describe('bar', () => {
    it('should get something', () => {
      expect(getSomething()).toBe('Something');
    });
  });
  describe('qux', () => {
    it('should get something', () => {
      expect(getSomething()).toBe('Something');
    });
  });
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options
- jest/max-nested-describe