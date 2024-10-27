# useDeprecatedReason

Require specifying the reason argument when using `@deprecated` directive.

**Diagnostic Category:** `lint/nursery/useDeprecatedReason`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `graphql/require-deprecation-reason`

This rule checks the parameter of `@deprecated` directive for the use of reason argument, suggesting the user to add it in case the argument is missing.

## Examples

### Invalid

```graphql
query {
  member @deprecated
}
```

### Valid

```graphql
query {
  member @deprecated(reason: "Why?")
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options