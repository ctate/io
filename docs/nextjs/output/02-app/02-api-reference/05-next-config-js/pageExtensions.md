# pageExtensions

Extend the default page extensions used by Next.js when resolving pages in the Pages Router.

By default, Next.js accepts files with the following extensions: `.tsx`, `.ts`, `.jsx`, `.js`. This can be modified to allow other extensions like markdown (`.md`, `.mdx`).

```js
// next.config.js
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)
```

You can extend the default page extensions used by Next.js. Inside `next.config.js`, add the `pageExtensions` config:

```js
// next.config.js
module.exports = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
}
```

Changing these values affects all Next.js pages, including:

- middleware.js
- instrumentation.js
- pages/_document.js
- pages/_app.js
- pages/api/

For example, if you reconfigure `.ts` page extensions to `.page.ts`, you would need to rename pages like `middleware.page.ts`, `instrumentation.page.ts`, `_app.page.ts`.

## Including non-page files in the `pages` directory

You can colocate test files or other files used by components in the `pages` directory. Inside `next.config.js`, add the `pageExtensions` config:

```js
// next.config.js
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}
```

Then, rename your pages to have a file extension that includes `.page` (e.g., rename `MyPage.tsx` to `MyPage.page.tsx`). Ensure you rename all Next.js pages, including the files mentioned above.