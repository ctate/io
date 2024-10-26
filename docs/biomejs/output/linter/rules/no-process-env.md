# noProcessEnv
Disallow the use of `process.env`.

## Diagnostic Category: `lint/nursery/noProcessEnv`

### Since: `v1.9.1`

This rule is part of the nursery group.

Sources: 
- Same as: n/no-process-env

Disallow the use of `process.env`.

The `process.env` object in Node.js stores configuration settings. Using it directly throughout a project can cause problems:

1. It's harder to maintain
2. It can lead to conflicts in team development
3. It complicates deployment across multiple servers

A better practice is to keep all settings in one configuration file and reference it throughout the project.

## Examples

### Invalid

```js
if (process.env.NODE_ENV === 'development') {
  // ...
}
```

### Error Message

Don't use `process.env`.
Use a centralized configuration file instead for better maintainability and deployment consistency.

### Valid

```js
const config = require('./config');
if (config.NODE_ENV === 'development') {
  // ...
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options