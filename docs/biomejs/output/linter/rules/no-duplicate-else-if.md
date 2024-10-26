# noDuplicateElseIf
Disallow duplicate conditions in if-else-if chains

**Diagnostic Category: lint/nursery/noDuplicateElseIf**

**Since:** v1.6.2

This rule is part of the nursery group.

Sources: 
- Same as: no-dupe-else-if

Disallow duplicate conditions in if-else-if chains

if-else-if chains are commonly used when there is a need to execute only one branch (or at most one branch) out of several possible branches, based on certain conditions.

Two identical test conditions in the same chain are almost always a mistake in the code. Unless there are side effects in the expressions, a duplicate will evaluate to the same true or false value as the identical expression earlier in the chain, meaning that its branch can never execute.

Please note that this rule does not compare conditions from the chain with conditions inside statements.

## Examples

### Invalid

```javascript
if (a) {
    foo();
} else if (b) {
    bar();
} else if (b) {
    baz();
}
```

This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain.

### Valid

```javascript
if (a) {
    foo();
} else if (b) {
    bar();
} else if (c) {
    baz();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options