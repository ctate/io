# noSetterReturn

**Description:** Disallow returning a value from a setter.

**Diagnostic Category:** `lint/correctness/noSetterReturn`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-setter-return (https://eslint.org/docs/latest/rules/no-setter-return)

Returning a value from a setter is unnecessary or a possible error, as the returned value is ignored. Only returning without a value is allowed.

## Examples

### Invalid

```js
class A {
    set foo(x) {
        return x;
    }
}
```
**Error:** The setter should not return a value.

```js
const b = {
    set foo(x) {
        return x;
    },
};
```
**Error:** The setter should not return a value.

```js
const c = {
    set foo(x) {
        if (x) {
            return x;
        }
    },
};
```
**Error:** The setter should not return a value.

### Valid

```js
// early-return
class A {
    set foo(x) {
        if (x) {
            return;
        }
    }
}
```

```js
// not a setter
class B {
  set(x) {
    return x;
  }
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)