# noRedundantUseStrict

**Diagnostic Category: `lint/suspicious/noRedundantUseStrict`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Prevents from having redundant `"use strict"`.

The directive `"use strict"` **isn't** needed in `.mjs` files, or in `.js` files inside projects where the `package.json` defines library as module:

```json
{
   "type": "module"
}
```

Instead, `.cjs` files are considered "scripts" and the directive `"use strict"` is accepted and advised.

Note that the leading trivia, e.g., comments or newlines preceding
the redundant `"use strict"` will also be removed. So that comment
directives won't be transferred to a wrong place.

## Examples

### Invalid

```cjs
"use strict";
function foo() {
 	"use strict";
}
```

```cjs
"use strict";
"use strict";

function foo() {

}
```

```cjs
function foo() {
"use strict";
"use strict";
}
```

```cjs
class C1 {
	test() {
		"use strict";
	}
};
```

```cjs
const C2 = class {
	test() {
		"use strict";
	}
};
```

### Valid

```cjs
function foo() {

}
```

```cjs
 function foo() {
    "use strict";
}
function bar() {
    "use strict";
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options