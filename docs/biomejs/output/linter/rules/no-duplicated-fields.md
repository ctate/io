# No Duplicated Fields

**Diagnostic Category: `lint/nursery/noDuplicatedFields`**

## GraphQL
**Since**: `v1.9.0`

This rule is part of the nursery group.

Sources: 
- Same as: graphql/no-duplicate-fields

No duplicated fields in GraphQL operations.

Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.

### Examples

#### Invalid
```graphql
query test($v: String, $t: String, $v: String) {
  id
}
```

#### Valid
```graphql
query {
  user {
    id
  }
}
```

### Related links
- Disable a rule
- Configure the rule fix
- Rule options