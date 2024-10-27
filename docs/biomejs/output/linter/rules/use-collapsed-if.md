# useCollapsedIf

Enforce using single `if` instead of nested `if` clauses.

**Diagnostic Category:** `lint/nursery/useCollapsedIf`

**Since:** `v1.9.4`

**Note:** This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:**
- Same as: `unicorn/no-lonely-if`
- Same as: `collapsible_if`

Enforce using single `if` instead of nested `if` clauses.

If an `if (b)` statement is the only statement in an `if (a)` block, it is often clearer to use an `if (a && b)` form.

## Examples

### Invalid

```js
if (condition) {
    if (anotherCondition) {
        // ...
    }
}
```

**Diagnostic Message:**
- This `if` statement can be collapsed into another `if` statement.
- Safe fix: Use collapsed `if` instead.

### Invalid

```js
if (condition) {
    // Comment
    if (anotherCondition) {
        // ...
    }
}
```

**Diagnostic Message:**
- This `if` statement can be collapsed into another `if` statement.

### Valid

```js
if (condition && anotherCondition) {
    // ...
}
```

```js
if (condition) {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

```js
if (condition) {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options