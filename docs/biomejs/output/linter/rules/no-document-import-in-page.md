# noDocumentImportInPage

**Diagnostic Category: lint/nursery/noDocumentImportInPage**

## Overview

Prevents importing `next/document` outside of `pages/_document.jsx` in Next.js projects.

## Details

The `next/document` module is intended for customizing the document structure globally in Next.js. Importing it outside of `pages/_document.js` can cause unexpected behavior and break certain features of the framework.

## Sources

- Same as: @next/no-document-import-in-page

## Examples

### Valid

```jsx
import { Document, Html } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/* */}
      </Html>
    )
  }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options