# noNestedTernary
Disallow nested ternary expressions.

## Diagnostic Category
lint/nursery/noNestedTernary

## Since
v1.9.3

This rule is part of the nursery group.

## Sources
- Same as: no-nested-ternary

## Description
Nesting ternary expressions can make code more difficult to understand.

## Examples

### Invalid

```javascript
const thing = foo ? bar : baz === qux ? quxx : foobar;
```

```javascript
foo ? baz === qux ? quxx() : foobar() : bar();
```

### Valid

```javascript
const thing = foo ? bar : foobar;
```

```javascript
let thing;

if (foo) {
    thing = bar;
} else if (baz === qux) {
    thing = quxx;
} else {
    thing = foobar;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options