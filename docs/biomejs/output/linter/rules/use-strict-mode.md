# useStrictMode

Enforce the use of the directive `"use strict"` in script files.

**Diagnostic Category:** `lint/nursery/useStrictMode`

**Since:** `v1.8.0`

- This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

Enforce the use of the directive `"use strict"` in script files.

The JavaScript strict mode prohibits some obsolete JavaScript syntaxes and makes some slight semantic changes to allow more optimizations by JavaScript engines. EcmaScript modules are always in strict mode, while JavaScript scripts are by default in non-strict mode, also known as _sloppy mode_. A developer can add the `"use strict"` directive at the start of a script file to enable strict mode in that file.

Biome considers a CommonJS (`.cjs`) file as a script file. By default, Biome recognizes a JavaScript file (`.js`) as a module file, except if `"type": "commonjs"` is specified in `package.json`.

## Examples

### Invalid

```cjs
var a = 1;
```

code-block.cjs:1:1 lint/nursery/useStrictMode FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected absence of the directive "use strict".

> 1 │ var a = 1;
   │ ^^^^^^^^^^^
  
ℹ Strict mode allows to opt-in some optimizations of the runtime engines, and it eliminates some JavaScript silent errors by changing them to throw errors.

ℹ Check the documentation for more information regarding strict mode.

ℹ Safe fix: Insert a top level "use strict".

```cjs
"use strict";

var a = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options