# noInnerDeclarations

Disallow `function` and `var` declarations that are accessible outside their block.

## Diagnostic Category: `lint/correctness/noInnerDeclarations`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-inner-declarations

Disallow `function` and `var` declarations that are accessible outside their block.

A `var` is accessible in the whole body of the nearest root (function, module, script, static block).
To avoid confusion, they should be declared to the nearest root.

Prior to ES2015, `function` declarations were only allowed in the nearest root,
though parsers sometimes erroneously accept them elsewhere.
In ES2015, inside an _ES module_, a `function` declaration is always block-scoped.

Note that `const` and `let` declarations are block-scoped,
and therefore they are not affected by this rule.
Moreover, `function` declarations in nested blocks are allowed inside _ES modules_.

## Examples

### Invalid

```cjs
if (test) {
    function f() {}
}
```

```js
if (test) {
    var x = 1;
}
```

```cjs
function f() {
    if (test) {
        function g() {}
    }
}
```

```js
function f() {
    if (test) {
        var x = 1;
    }
}
```

### Valid

```js
// inside a module, function declarations are block-scoped and thus allowed.
if (test) {
    function f() {}
}
export {}
```

```js
function f() { }
```

```js
function f() {
    function g() {}
}
```

```js
function f() {
    var x = 1;
}
```

```js
function f() {
    if (test) {
        const g = function() {};
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options