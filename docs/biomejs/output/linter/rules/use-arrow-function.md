# useArrowFunction

Use arrow functions over function expressions.

**Diagnostic Category:** `lint/complexity/useArrowFunction`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:**
- Inspired from: prefer-arrow-callback

Use arrow functions over function expressions. An arrow function expression is a compact alternative to a regular function expression, with an important distinction: `this` is not bound to the arrow function. It inherits `this` from its parent scope.

This rule proposes turning all function expressions that are not generators (`function*`) and don't use `this` into arrow functions.

## Examples

### Invalid

```js
const z = function() {
    return 0;
}
```

Diagnostic:
- This function expression can be turned into an arrow function.

```js
const delegatedFetch = async function(url) {
    return await fetch(url);
}
```

Diagnostic:
- This function expression can be turned into an arrow function.

### Valid

```js
const f = function() {
    return this.prop;
}
```

Named function expressions are ignored:

```js
const z = function z() {
    return 0;
}
```

Function expressions that declare the type of `this` are also ignored:

```ts
const z = function(this: A): number {
    return 0;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options