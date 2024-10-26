# noCatchAssign
Disallow reassigning exceptions in catch clauses.

## Diagnostic Category
lint/suspicious/noCatchAssign

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-ex-assign

Assignment to a `catch` parameter can be misleading and confusing. It is often unintended and indicative of a programmer error.

## Examples

### Invalid

```javascript
try {
} catch (e) {
  e;
  e = 10;
}
```

### Error Message
lint/suspicious/noCatchAssign
Reassigning a catch parameter is confusing.
The catch parameter is declared here:
Use a local variable instead.

### Valid

```javascript
try {
} catch (e) {
  let e = 10;
  e = 100;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options