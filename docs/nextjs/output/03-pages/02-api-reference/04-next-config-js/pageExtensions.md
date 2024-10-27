# pageExtensions

Extend the default page extensions used by Next.js when resolving pages in the Pages Router.

## Overview

The `pageExtensions` configuration allows you to specify custom file extensions for your pages in a Next.js application. By default, Next.js recognizes `.js`, `.jsx`, `.ts`, and `.tsx` as valid page extensions. You can modify this behavior by providing an array of strings representing the extensions you want to use.

## Usage

To configure custom page extensions, add the `pageExtensions` property to your `next.config.js` file:

```javascript
// next.config.js
module.exports = {
  pageExtensions: ['mdx', 'jsx', 'js'],
}
```

In this example, Next.js will recognize `.mdx`, `.jsx`, and `.js` files as valid pages.

## Notes

- Ensure that the specified extensions do not conflict with existing ones.
- Custom extensions can be useful for integrating with other frameworks or file types.

For more information, refer to the official Next.js documentation.