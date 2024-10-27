# useSingleCaseStatement

Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block.

**Diagnostic Category:** `lint/style/useSingleCaseStatement`

**Caution:** This rule is deprecated and will be removed in the next major release.  
**Reason:** Use the rule noSwitchDeclarations instead.  
**Since:** `v1.0.0`  
**Note:** This rule has an **unsafe** fix.

## Examples

### Invalid

```js
switch (foo) {
    case true:
    case false:
        let foo = '';
        foo;
}
```

code-block.js:4:9 lint/style/useSingleCaseStatement FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ A switch clause should only have a single statement.  

```plaintext
  2 │      case true:
  3 │      case false:
> 4 │          let foo = '';
  5 │          foo;
  6 │      }
```

**Unsafe fix:** Wrap the statements in a block.

```js
switch (foo) {
    case true:
    case false: {
        let foo = '';
        foo;
    }
}
```

### Valid

```js
switch (foo) {
    case true:
    case false: {
        let foo = '';
        foo;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options