# noEmptyPattern

Disallows empty destructuring patterns.

## Diagnostic Category
lint/correctness/noEmptyPattern

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-empty-pattern

## Examples

### Invalid

```js
var {} = foo;
```

```js
var {a: {}} = foo;
```

```js
function foo({}) {}
```

### Valid

The following cases are valid because they create new bindings.

```js
var {a = {}} = foo;
var {a, b = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
var [a] = foo;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options