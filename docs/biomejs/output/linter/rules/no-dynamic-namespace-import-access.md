# noDynamicNamespaceImportAccess

Disallow accessing namespace imports dynamically.

Accessing namespace imports dynamically can prevent efficient tree shaking and increase bundle size.
This happens because the bundler cannot determine which parts of the namespace are used at compile time,
so it must include the entire namespace in the bundle.

Instead, consider using named imports or if that is not possible
access the namespaced import properties statically.

If you want to completely disallow namespace imports, consider using the noNamespaceImport rule.

## Examples

### Invalid

```javascript
import * as foo from "foo"
foo["bar"]
```

```javascript
import * as foo from "foo"
const key = "bar"
foo[key]
```

### Valid

```javascript
import * as foo from "foo"
foo.bar
```

```javascript
import { bar } from "foo"
bar
```

```javascript
import messages from "i18n"
const knownMessagesMap = {
  hello: messages.hello,
  goodbye: messages.goodbye
}

const dynamicKey = "hello"
knownMessagesMap[dynamicKey]
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options