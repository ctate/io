# noParameterAssign
Disallow reassigning `function` parameters.

## Diagnostic Category: `lint/style/noParameterAssign`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-param-reassign

Assignment to a `function` parameters can be misleading and confusing,
as modifying parameters will also mutate the `arguments` object.
It is often unintended and indicative of a programmer error.

In contrast to the _ESLint_ rule, this rule cannot be configured to report
assignments to a property of a parameter.

## Examples

### Invalid

```js
function f(param) {
    param = 13;
}
```

```js
function f(param) {
    param++;
}
```

```js
function f(param) {
    for (param of arr) {}
}
```

```ts
class C {
    constructor(readonly prop: number) {
        prop++
    }
}
```

### Valid

```js
function f(param) {
    let local = param;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options