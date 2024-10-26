# noEmptyBlockStatements
Disallow empty block statements and static blocks.

**Diagnostic Category: `lint/suspicious/noEmptyBlockStatements`**

**Since**: `v1.3.0`

Sources: 
- Same as: `no-empty`
- Same as: `no-empty-static-block`
- Same as: `no-empty-function`
- Same as: `@typescript-eslint/no-empty-function`

Disallow empty block statements and static blocks.

Empty static blocks and block statements, while not technically errors, usually occur due to refactoring that wasn’t completed. They can cause confusion when reading code.

This rule disallows empty block statements and static blocks.
This rule ignores block statements or static blocks which contain a comment (for example, in an empty catch or finally block of a try statement to indicate that execution should continue regardless of errors).

## Examples

### Invalid

```js
function emptyFunctionBody () {}
```

```js
try {
    doSomething();
} catch(ex) {

}
```

```js
class Foo {
  static {}
}
```

### Valid

```js
function foo () {
    doSomething();
}
```

```js
try {
  doSomething();
} catch (ex) {
  // continue regardless of error
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options