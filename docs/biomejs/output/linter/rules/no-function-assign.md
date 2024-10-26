# noFunctionAssign

Disallow reassigning function declarations.

## Diagnostic Category: `lint/suspicious/noFunctionAssign`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Same as: no-func-assign

## Examples

### Invalid

```js
function foo() { };
foo = bar;
```

```js
function foo() {
    foo = bar;
 }
```

```js
foo = bar;
function foo() { };
```

```js
[foo] = bar;
function foo() { };
```

```js
({ x: foo = 0 } = bar);
function foo() { };
```

```js
function foo() {
    [foo] = bar;
 }
```

```js
(function () {
    ({ x: foo = 0 } = bar);
    function foo() { };
 })();
```

### Valid

```js
function foo() {
    var foo = bar;
 }
```

```js
function foo(foo) {
    foo = bar;
 }
```

```js
function foo() {
    var foo;
    foo = bar;
 }
```

```js
var foo = () => {};
foo = bar;
```

```js
var foo = function() {};
foo = bar;
```

```js
var foo = function() {
    foo = bar;
 };
```

```js
import bar from 'bar';
function foo() {
    var foo = bar;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options