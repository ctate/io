# noDuplicateParameters

Disallow duplicate function parameter name.

## Diagnostic Category: `lint/suspicious/noDuplicateParameters`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-dupe-args

Disallow duplicate function parameter name.

If more than one parameter has the same name in a function definition,
the last occurrence overrides the preceding occurrences.
A duplicated name might be a typing error.

## Examples

### Invalid

```js
var f = function(a, b, b) {}
```

```js
function b(a, b, b) {}
```

### Valid

```js
function i(i, b, c) {}
var j = function (j, b, c) {};
function k({ k, b }, { c, d }) {}
function l([, l]) {}
function foo([[a, b], [c, d]]) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options