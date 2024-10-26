# noDefaultExport

Disallow default exports.

## Diagnostic Category: `lint/style/noDefaultExport`

### Since: `v1.4.0`

Sources: 
- Same as: import/no-default-export

Disallow default exports.

Default exports cannot be easily discovered inside an editor:
They cannot be suggested by the editor when the user tries to import a name.

Also, default exports don't encourage consistency over a code base:
the module that imports the default export must choose a name.
It is likely that different modules use different names.

Moreover, default exports encourage exporting an object that acts as a namespace.
This is a legacy pattern used to mimic CommonJS modules.

For all these reasons, a team may want to disallow default exports.

Note that this rule disallows only default exports in EcmaScript Module.
It ignores CommonJS default exports.

## Examples

### Invalid

```js
export default function f() {};
```

```js
export default class C {};
```

```js
export default {
    f() {},
    g() {},
};
```

```js
export { X as default };
```

### Valid

```js
export function f () {};
export class C {};
export { default as X } from "mod";
```

```cjs
module.exports = class {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options