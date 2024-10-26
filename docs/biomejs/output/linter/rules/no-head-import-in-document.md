# noHeadImportInDocument

**Diagnostic Category: `lint/nursery/noHeadImportInDocument`**

## Overview

Prevent using the `next/head` module in `pages/_document.js` on Next.js projects.

## Description

Importing `next/head` within the custom `pages/_document.js` file can cause unexpected behavior in your application. The `next/head` component is designed to be used at the page level, and when used in the custom document it can interfere with the global document structure, which leads to issues with rendering and SEO.

To modify `<head>` elements across all pages, you should use the `<Head />` component from the `next/document` module.

## Since
v1.9.4

## Sources
- Same as: `@next/no-head-import-in-document`

## Examples

### Valid

```jsx
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //...
  }

  render() {
    return (
      <Html>
        <Head></Head>
      </Html>
    );
  }
}

export default MyDocument;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options