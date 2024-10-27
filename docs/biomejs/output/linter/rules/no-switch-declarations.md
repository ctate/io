# noSwitchDeclarations

**Description:** Disallow lexical declarations in `switch` clauses.

**Diagnostic Category:** `lint/correctness/noSwitchDeclarations`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: no-case-declarations (https://eslint.org/docs/latest/rules/no-case-declarations)

Lexical declarations in `switch` clauses are accessible in the entire `switch`. However, they are only initialized when assigned, which occurs only if the `switch` clause where they are defined is reached. To ensure that lexical declarations apply only to the current `switch` clause, wrap your declarations in a block.

## Examples

### Invalid

```js
switch (foo) {
    case 0:
        const x = 1;
        break;
    case 2:
        x; // `x` can be used while it is not initialized
        break;
}
```

**Error:**
Other switch clauses can erroneously access this declaration. Wrap the declaration in a block to restrict its access to the switch clause.

### Invalid

```js
switch (foo) {
    case 0:
        function f() {}
        break;
    case 2:
        f(); // `f` can be called here
        break;
}
```

**Error:**
Other switch clauses can erroneously access this declaration. Wrap the declaration in a block to restrict its access to the switch clause.

### Invalid

```js
switch (foo) {
    case 0:
        class A {}
        break;
    default:
        new A(); // `A` can be instantiated here
        break;
}
```

**Error:**
Other switch clauses can erroneously access this declaration. Wrap the declaration in a block to restrict its access to the switch clause.

### Valid

```js
switch (foo) {
    case 0: {
        const x = 1;
        break;
    }
    case 1:
        // `x` is not visible here
        break;
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)