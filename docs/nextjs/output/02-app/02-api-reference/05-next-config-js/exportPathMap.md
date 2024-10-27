# exportPathMap (Deprecated)

Customize the pages that will be exported as HTML files when using `next export`.

This feature is exclusive to `next export` and currently **deprecated** in favor of `getStaticPaths` with `pages` or `generateStaticParams` with `app`.

## Examples

- Static Export: GitHub repository for examples with static export.

`exportPathMap` allows you to specify a mapping of request paths to page destinations, to be used during export. Paths defined in `exportPathMap` will also be available when using `next dev`.

### Example Configuration

To create a custom `exportPathMap` for an app with the following pages:

- `pages/index.js`
- `pages/about.js`
- `pages/post.js`

Open `next.config.js` and add the following `exportPathMap` config:

```js
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
}
```

**Note**: The `query` field in `exportPathMap` cannot be used with automatically statically optimized pages or `getStaticProps` pages as they are rendered to HTML files at build-time and additional query information cannot be provided during `next export`.

The pages will then be exported as HTML files, for example, `/about` will become `/about.html`.

### Function Arguments

`exportPathMap` is an `async` function that receives two arguments:

- `defaultPathMap`: The default map used by Next.js.
- An object with:
  - `dev`: `true` when `exportPathMap` is called in development; `false` when running `next export`.
  - `dir`: Absolute path to the project directory.
  - `outDir`: Absolute path to the `out/` directory. When `dev` is `true`, this will be `null`.
  - `distDir`: Absolute path to the `.next/` directory.
  - `buildId`: The generated build id.

The returned object is a map of pages where the `key` is the `pathname` and the `value` is an object that accepts the following fields:

- `page`: `String` - the page inside the `pages` directory to render.
- `query`: `Object` - the `query` object passed to `getInitialProps` when prerendering. Defaults to `{}`.

**Note**: The exported `pathname` can also be a filename (e.g., `/readme.md`), but you may need to set the `Content-Type` header to `text/html` when serving its content if it differs from `.html`.

## Adding a Trailing Slash

To configure Next.js to export pages as `index.html` files and require trailing slashes, open `next.config.js` and enable the `trailingSlash` config:

```js
module.exports = {
  trailingSlash: true,
}
```

## Customizing the Output Directory

`next export` will use `out` as the default output directory. You can customize this using the `-o` argument:

```bash
next export -o outdir
```

**Warning**: Using `exportPathMap` is deprecated and is overridden by `getStaticPaths` inside `pages`. It is not recommended to use them together.