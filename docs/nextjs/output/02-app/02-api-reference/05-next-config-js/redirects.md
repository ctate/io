# Redirects

Redirects allow you to redirect an incoming request path to a different destination path.

To use redirects, add the `redirects` key in `next.config.js`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
```

`redirects` is an async function that returns an array of objects with `source`, `destination`, and `permanent` properties:

- `source`: Incoming request path pattern.
- `destination`: Path to route to.
- `permanent`: `true` uses 308 status code (cache forever), `false` uses 307 status code (temporary, not cached).

**Why does Next.js use 307 and 308?** Many browsers changed the request method of the redirect to `GET` for 302 and 301 status codes. Next.js uses 307 and 308 to preserve the original request method.

Additional properties:
- `basePath`: `false` or `undefined` - if false, `basePath` won't be included (for external redirects).
- `locale`: `false` or `undefined` - whether to include the locale when matching.
- `has`: Array of objects with `type`, `key`, and `value` properties for matching.
- `missing`: Array of objects with `type`, `key`, and `value` properties for non-matching.

Redirects are checked before the filesystem, including pages and `/public` files. In the Pages Router, redirects do not apply to client-side routing unless Middleware matches the path.

Query values in the request will be passed to the redirect destination. For example:

```js
{
  source: '/old-blog/:path*',
  destination: '/blog/:path*',
  permanent: false
}
```

Requesting `/old-blog/post-1?hello=world` redirects to `/blog/post-1?hello=world`.

## Path Matching

Path matches are allowed, e.g., `/old-blog/:slug` matches `/old-blog/hello-world`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
}
```

### Wildcard Path Matching

Use `*` after a parameter for wildcard matching, e.g., `/blog/:slug*` matches `/blog/a/b/c/d/hello-world`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
    ]
  },
}
```

### Regex Path Matching

Wrap regex in parentheses after a parameter, e.g., `/post/:slug(\\d{1,})` matches `/post/123` but not `/post/abc`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/post/:slug(\\d{1,})',
        destination: '/news/:slug',
        permanent: false,
      },
    ]
  },
}
```

Escape special regex characters in the `source`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/english\\(default\\)/:slug',
        destination: '/en-us/:slug',
        permanent: false,
      },
    ]
  },
}
```

## Header, Cookie, and Query Matching

Use `has` and `missing` fields to match based on header, cookie, or query values. Both `source` and all `has` items must match, and all `missing` items must not match for the redirect to apply.

Example:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path((?!another-page$).*)',
        has: [
          {
            type: 'header',
            key: 'x-redirect-me',
          },
        ],
        permanent: false,
        destination: '/another-page',
      },
      {
        source: '/specific/:path*',
        has: [
          {
            type: 'query',
            key: 'page',
            value: 'home',
          },
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/another/:path*',
      },
    ]
  },
}
```

### Redirects with basePath Support

When using `basePath`, each `source` and `destination` is prefixed with the `basePath` unless `basePath: false` is set:

```js
module.exports = {
  basePath: '/docs',

  async redirects() {
    return [
      {
        source: '/with-basePath',
        destination: '/another',
        permanent: false,
      },
      {
        source: '/without-basePath',
        destination: 'https://example.com',
        basePath: false,
        permanent: false,
      },
    ]
  },
}
```

### Redirects with i18n Support

When using `i18n`, each `source` and `destination` is prefixed to handle configured locales unless `locale: false` is set:

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async redirects() {
    return [
      {
        source: '/with-locale',
        destination: '/another',
        permanent: false,
      },
      {
        source: '/nl/with-locale-manual',
        destination: '/nl/another',
        locale: false,
        permanent: false,
      },
    ]
  },
}
```

For older HTTP clients, use the `statusCode` property instead of `permanent` to assign a custom status code.

## Other Redirects

- Inside API Routes and Route Handlers, you can redirect based on the incoming request.
- Inside `getStaticProps` and `getServerSideProps`, you can redirect specific pages at request-time.

## Version History

| Version   | Changes            |
| --------- | ------------------ |
| `v13.3.0` | `missing` added.   |
| `v10.2.0` | `has` added.       |
| `v9.5.0`  | `redirects` added. |