# noImportAssign

Disallow assigning to imported bindings

## Diagnostic Category: `lint/suspicious/noImportAssign`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-import-assign

Disallow assigning to imported bindings

## Examples

### Invalid

```js
import x from "y";
x = 1;
```

```js
import y from "y";
[y] = 1;
```

```js
import z from "y";
({ z } = 1);
```

```js
import a from "y";
[...a] = 1;
```

```js
import b from "y";
({ ...b } = 1);
```

```js
import c from "y";
for (c in y) {};
```

```js
import d from "y";
d += 1;
```

```js
import * as e from "y";
e = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options