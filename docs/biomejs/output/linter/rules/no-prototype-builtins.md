# noPrototypeBuiltins

Disallow direct use of `Object.prototype` builtins.

## Diagnostic Category: `lint/suspicious/noPrototypeBuiltins`

### Since: `v1.1.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: no-prototype-builtins
- Same as: prefer-object-has-own

Disallow direct use of `Object.prototype` builtins.

ECMAScript 5.1 added `Object.create` which allows the creation of an object with a custom prototype.
This pattern is often used for objects used as Maps. However, this pattern can lead to errors
if something else relies on prototype properties/methods.
Moreover, the methods could be shadowed, this can lead to random bugs and denial of service
vulnerabilities. For example, calling `hasOwnProperty` directly on parsed JSON like `{"hasOwnProperty": 1}` could lead to vulnerabilities.
To avoid subtle bugs like this, you should call these methods from `Object.prototype`.
For example, `foo.isPrototypeOf(bar)` should be replaced with `Object.prototype.isPrototypeOf.call(foo, "bar")`
As for the `hasOwn` method, `foo.hasOwn("bar")` should be replaced with `Object.hasOwn(foo, "bar")`.

## Examples

### Invalid

```js
var invalid = foo.hasOwnProperty("bar");
```

```js
var invalid = foo.isPrototypeOf(bar);
```

```js
var invalid = foo.propertyIsEnumerable("bar");
```

```js
Object.hasOwnProperty.call(foo, "bar");
```

### Valid

```js
var valid = Object.hasOwn(foo, "bar");
var valid = Object.prototype.isPrototypeOf.call(foo, bar);
var valid = {}.propertyIsEnumerable.call(foo, "bar");
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options