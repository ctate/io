# noConstructorReturn

Disallow returning a value from a `constructor`.

## Diagnostic Category: `lint/correctness/noConstructorReturn`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-constructor-return

Returning a value from a `constructor` of a class is a possible error.
Forbidding this pattern prevents errors resulting from unfamiliarity with JavaScript or a copy-paste error.

Only returning without a value is allowed, as it’s a control flow statement.

## Examples

### Invalid

```js
class A {
    constructor() {
        return 0;
    }
}
```

### Valid

```js
class A {
    constructor() {}
}
```

```js
class B {
    constructor(x) {
        return;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options