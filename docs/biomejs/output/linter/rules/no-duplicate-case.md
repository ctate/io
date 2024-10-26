# noDuplicateCase

Disallow duplicate case labels.

If a switch statement has duplicate test expressions in case clauses, it is likely that a programmer copied a case clause but forgot to change the test expression.

## Diagnostic Category
lint/suspicious/noDuplicateCase

## Since
v1.0.0

## Sources
- Same as: no-duplicate-case

## Examples

### Invalid

```javascript
switch (a) {
    case 1:
        break;
    case 1:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case one:
        break;
    case one:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case "1":
        break;
    case "1":
        break;
    default:
        break;
}
```

### Valid

```javascript
switch (a) {
    case 1:
        break;
    case 2:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case one:
        break;
    case two:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case "1":
        break;
    case "2":
        break;
    default:
        break;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options