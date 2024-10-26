# noInvalidUseBeforeDeclaration

Disallow the use of variables and function parameters before their declaration

## Diagnostic Category: `lint/correctness/noInvalidUseBeforeDeclaration`

### Since: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-use-before-define
- Same as: @typescript-eslint/no-use-before-define

Disallow the use of variables and function parameters before their declaration

JavaScript doesn't allow the use of block-scoped variables (`let`, `const`) and function parameters before their declaration.
A `ReferenceError` will be thrown with any attempt to access the variable or the parameter before its declaration.

The rule also reports the use of variables declared with `var` before their declarations.

## Examples

### Invalid

```js
function f() {
    console.log(x);
    const x;
}
```

```js
function f() {
    console.log(x);
    var x = 0;
}
```

```js
function f(a = b, b = 0) {}
```

### Valid

```js
f();
function f() {}

new C();
class C {}
```

```js
// An export can reference a variable before its declaration.
export { CONSTANT };
const CONSTANT = 0;
```

```js
function f() { return CONSTANT; }
const CONSTANT = 0;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options