# noNewSymbol

Disallow `new` operators with the `Symbol` object.

## Diagnostic Category
lint/correctness/noNewSymbol

### Note
- This rule has an **unsafe** fix.

### Since
v1.0.0

### Sources
- Same as: no-new-symbol

## Description
`Symbol` cannot be instantiated. This results in throwing a `TypeError`.

## Examples

### Invalid
```javascript
var foo = new Symbol('foo');
```

### Valid
```javascript
var bar = Symbol('bar');
function baz() {
    function Symbol() { }
    new Symbol();
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options