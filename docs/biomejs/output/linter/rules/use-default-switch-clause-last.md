# useDefaultSwitchClauseLast

**Description:** Enforce default clauses in switch statements to be last.

**Diagnostic Category:** `lint/suspicious/useDefaultSwitchClauseLast`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: default-case-last

A switch statement can optionally have a default clause. If present, it’s usually the last clause, but it doesn’t need to be. It is allowed to put the default clause before all case clauses, or anywhere between. The behavior is mostly the same as if it was the last clause.

The default block will be executed only if there is no match in the case clauses (including those defined after the default), but there is also the ability to “fall through” from the default clause to the following clause in the list. However, such flow is uncommon and can be confusing to readers.

Even without "fall through" logic, it’s unexpected to see the default clause before or between the case clauses. By convention, it is expected to be the last clause.

## Examples

### Invalid

```js
switch (foo) {
    default:
        break;
    case 0:
        break;
}
```

Diagnostic: The default clause should be the last switch clause.

```js
switch (foo) {
    default:
        f();
    case 0:
        break;
}
```

Diagnostic: The default clause should be the last switch clause.

```js
switch (foo) {
    case 0:
        break;
    default:
    case 1:
        break;
}
```

Diagnostic: The default clause should be the last switch clause.

### Valid

```js
switch (foo) {
    case 0:
        break;
    case 1:
    default:
        break;
}
```

```js
switch (foo) {
    case 0:
        break;
    default:
        break;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options