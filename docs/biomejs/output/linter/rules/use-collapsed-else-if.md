# useCollapsedElseIf

Enforce using `else if` instead of nested `if` in `else` clauses.

**Diagnostic Category:** `lint/style/useCollapsedElseIf`

**Since:** `v1.1.0`

**Note:** This rule has a **safe** fix.

**Sources:**
- Same as: `no-lonely-if` (https://eslint.org/docs/latest/rules/no-lonely-if)
- Same as: `collapsible_else_if` (https://rust-lang.github.io/rust-clippy/master/#/collapsible_else_if)

If an `if` statement is the only statement in the `else` block, it is often clearer to use an `else if` form.

## Examples

### Invalid

```js
if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
}
```

**Warning:** This `if` statement can be collapsed into an `else if` statement.

```js
if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

**Warning:** This `if` statement can be collapsed into an `else if` statement.

```js
if (condition) {
    // ...
} else {
    // Comment
    if (anotherCondition) {
        // ...
    }
}
```

### Valid

```js
if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
}
```

```js
if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
} else {
    // ...
}
```

```js
if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)