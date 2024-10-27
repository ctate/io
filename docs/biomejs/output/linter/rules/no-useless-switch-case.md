# noUselessSwitchCase

Disallow useless `case` in `switch` statements.

**Diagnostic Category:** `lint/complexity/noUselessSwitchCase`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `unicorn/no-useless-switch-case`

A `switch` statement can optionally have a `default` clause. The `default` clause will be executed only if there is no match in the `case` clauses. An empty `case` clause that precedes the `default` clause is thus useless.

## Examples

### Invalid

```js
switch (foo) {
    case 0:
    default:
        break;
    case 1:
        break;
}
```

**Error:**
code-block.js:2:5 lint/complexity/noUselessSwitchCase FIXABLE 
✖ Useless case clause.

**Unsafe fix:** Remove the useless case.

```js
switch (foo) {
    default:
    case 0:
        break;
    case 1:
        break;
}
```

**Error:**
code-block.js:3:5 lint/complexity/noUselessSwitchCase FIXABLE 
✖ Useless case clause.

**Unsafe fix:** Remove the useless case.

### Valid

```js
switch (foo) {
    case 0:
        break;
    default:
        break;
}
```

```js
switch (foo) {
    case 0:
        break;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options