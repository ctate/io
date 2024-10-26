# noConsole

Disallow the use of `console`.

## Diagnostic Category
lint/suspicious/noConsole

## Since
v1.6.0

### Note
- This rule has an **unsafe** fix.

## Sources
- Same as: no-console

## Description
In a browser environment, it’s considered a best practice to log messages using `console`.
Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client.
In general, calls using `console` should be stripped before being pushed to production.

## Examples

### Invalid
```js
console.error('hello world')
```

## Error Message
```
code-block.js:1:1 lint/suspicious/noConsole  FIXABLE 
 Don't use console.
 
 1 │ console.error('hello world')
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
 
 The use of console is often reserved for debugging.
 
 Unsafe fix: Remove console.
 
  1 │ console.error('hello world')
   │ -console.error('hello world')
```

## Options
Use the options to specify the allowed `console` methods.

```json
{
  "options": {
    "allow": ["assert", "error", "info", "warn"]
  }
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options