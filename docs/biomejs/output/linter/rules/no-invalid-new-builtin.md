# noInvalidNewBuiltin

Disallow `new` operators with global non-constructor functions.

**Diagnostic Category: `lint/correctness/noInvalidNewBuiltin`**

This rule is deprecated and will be removed in the next major release.
**Reason**: Use the rule noInvalidBuiltinInstantiation instead.
**Since**: `v1.3.0`

This rule has an **unsafe** fix.

Disallow `new` operators with global non-constructor functions.

Some global functions cannot be called using the new operator and will throw a `TypeError` if you attempt to do so. These functions are:

- `Symbol` https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol
- `BigInt` https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt

## Examples

### Invalid

```js
let foo = new Symbol('foo');
```

```js
let bar = new BigInt(9007199254740991);
```

### Valid

```js
let foo = Symbol('foo');

function baz(Symbol) {
    const qux = new Symbol("baz");
}
```

```js
let bar = BigInt(9007199254740991);

function quux(BigInt) {
    const corge = new BigInt(9007199254740991);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options