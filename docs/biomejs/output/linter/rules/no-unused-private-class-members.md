# noUnusedPrivateClassMembers

Disallow unused private class members.

**Diagnostic Category:** `lint/correctness/noUnusedPrivateClassMembers`

**Since:** `v1.3.3`

**Note:** This rule has an **unsafe** fix.

Sources: Same as: `no-unused-private-class-members` (https://eslint.org/docs/latest/rules/no-unused-private-class-members)

Private class members that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such class members take up space in the code and can lead to confusion by readers.

## Examples

### Invalid

```js
class OnlyWrite {
  #usedOnlyInWrite = 5;

  method() {
       this.#usedOnlyInWrite = 212;
  }
}
```

code-block.js:2:3 lint/correctness/noUnusedPrivateClassMembers FIXABLE 
⚠ This private class member is defined but never used.

1 │ class OnlyWrite {
2 │   #usedOnlyInWrite = 5;
   │  ^^^^^^^^^^^^^^^^^^
3 │ 
4 │   method() {
ℹ Unsafe fix: Remove unused declaration.

1 │ class OnlyWrite {
2 │   -
3 │ 
4 │   method() {
```

```ts
class TsBioo {
  private unusedProperty = 5;
}
```

code-block.ts:2:12 lint/correctness/noUnusedPrivateClassMembers FIXABLE 
⚠ This private class member is defined but never used.

1 │ class TsBioo {
2 │   private unusedProperty = 5;
   │            ^^^^^^^^^^^^^^^^
3 │ }
ℹ Unsafe fix: Remove unused declaration.

1 │ class TsBioo {
2 │   -
3 │ }
```

```ts
class TsBioo {
  private unusedMethod() {}
}
```

code-block.ts:2:12 lint/correctness/noUnusedPrivateClassMembers FIXABLE 
⚠ This private class member is defined but never used.

1 │ class TsBioo {
2 │   private unusedMethod() {}
   │            ^^^^^^^^^^^^^^^^
3 │ }
ℹ Unsafe fix: Remove unused declaration.

1 │ class TsBioo {
2 │   -
3 │ }
```

### Valid

```js
class UsedMember {
  #usedMember = 42;

  method() {
       return this.#usedMember;
  }
}
```

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)