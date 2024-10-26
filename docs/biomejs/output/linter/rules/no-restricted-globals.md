# noRestrictedGlobals

This rule allows you to specify global variable names that you don’t want to use in your application.

## Diagnostic Category
lint/style/noRestrictedGlobals

## Since
v1.0.0

## Sources
- Same as: no-restricted-globals

This rule allows you to specify global variable names that you don’t want to use in your application.

Disallowing usage of specific global variables can be useful if you want to allow a set of global variables by enabling an environment, but still want to disallow some of those.

## Examples

### Invalid
```js
console.log(event)
```

### Diagnostic
Do not use the global variable event.
Use a local variable instead.

### Valid
```js
function f(event) {
    console.log(event)
}
```

## Options
Use the options to specify additional globals that you want to restrict in your source code.

```json
{
    "options": {
        "deniedGlobals": ["$", "MooTools"]
    }
}
```

In the example above, the rule will emit a diagnostics if tried to use `$` or `MooTools` without creating a local variable.

## Related links
- Disable a rule
- Configure the rule fix
- Rule options