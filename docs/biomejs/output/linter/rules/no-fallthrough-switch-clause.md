# noFallthroughSwitchClause

Disallow fallthrough of `switch` clauses.

## Diagnostic Category
lint/suspicious/noFallthroughSwitchClause

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-fallthrough

Switch clauses in `switch` statements fall through by default. This can lead to unexpected behavior when forgotten.

The rule doesn't take `process.exit()` in consideration.

## Examples

### Invalid

```js
switch (bar) {
	case 0:
		a();
	case 1:
		b();
}
```

### Error Message
This case is falling through to the next case. Add a `break` or `return` statement to the end of this case to prevent fallthrough.

### Valid

```js
switch (foo) {
	case 1:
    case 2:
		doSomething();
		break;
    case 3: {
        if (cond) {
            break;
        } else {
            break;
        }
    }
	case 4:
		doSomething();
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options