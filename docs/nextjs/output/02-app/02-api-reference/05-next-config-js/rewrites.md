# Rewrites

Rewrites allow you to map an incoming request path to a different destination path.

Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. In contrast, redirects will reroute to a new page and show the URL changes.

To use rewrites, you can use the `rewrites` key in `next.config.js`:

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
}
```

Rewrites are applied to client-side routing; a `<Link href="/about">` will have the rewrite applied in the above example.

`rewrites` is an async function that expects to return either an array or an object of arrays holding objects with `source` and `destination` properties:

- `source`: String - the incoming request path pattern.
- `destination`: String - the path you want to route to.
- `basePath`: false or undefined - if false, the basePath won't be included when matching, can be used for external rewrites only.
- `locale`: false or undefined - whether the locale should not be included when matching.
- `has`: array of objects with `type`, `key`, and `value` properties.
- `missing`: array of objects with `type`, `key`, and `value` properties.

When the `rewrites` function returns an array, rewrites are applied after checking the filesystem (pages and `/public` files) and before dynamic routes. When the `rewrites` function returns an object of arrays, this behavior can be changed and more finely controlled:

```js
module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/some-page',
          destination: '/somewhere-else',
          has: [{ type: 'query', key: 'overrideMe' }],
        },
      ],
      afterFiles: [
        {
          source: '/non-existent',
          destination: '/somewhere-else',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: `https://my-old-site.com/:path*`,
        },
      ],
    }
  },
}
```

Good to know: rewrites in `beforeFiles` do not check the filesystem/dynamic routes immediately after matching a source; they continue until all `beforeFiles` have been checked.

The order Next.js routes are checked is:

1. headers are checked/applied
2. redirects are checked/applied
3. `beforeFiles` rewrites are checked/applied
4. static files from the public directory, `_next/static` files, and non-dynamic pages are checked/served
5. `afterFiles` rewrites are checked/applied
6. `fallback` rewrites are checked/applied

## Rewrite Parameters

When using parameters in a rewrite, the parameters will be passed in the query by default when none of the parameters are used in the `destination`.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/old-about/:path*',
        destination: '/about',
      },
    ]
  },
}
```

If a parameter is used in the destination, none of the parameters will be automatically passed in the query.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/:path*',
      },
    ]
  },
}
```

You can still pass the parameters manually in the query if one is already used in the destination.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:first/:second',
        destination: '/:first?second=:second',
      },
    ]
  },
}
```

Good to know: Static pages from Automatic Static Optimization or prerendering params from rewrites will be parsed on the client after hydration and provided in the query.

## Path Matching

Path matches are allowed, for example `/blog/:slug` will match `/blog/hello-world`:

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
      },
    ]
  },
}
```

### Wildcard Path Matching

To match a wildcard path, use `*` after a parameter:

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*',
      },
    ]
  },
}
```

### Regex Path Matching

To match a regex path, wrap the regex in parentheses after a parameter:

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/old-blog/:post(\\d{1,})',
        destination: '/blog/:post',
      },
    ]
  },
}
```

The following characters are used for regex path matching: `(`, `)`, `{`, `}`, `[`, `]`, `|`, `\`, `^`, `.`, `:`, `*`, `+`, `-`, `?`, `$`.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/english\\(default\\)/:slug',
        destination: '/en-us/:slug',
      },
    ]
  },
}
```

## Header, Cookie, and Query Matching

To match a rewrite when header, cookie, or query values also match, use the `has` field or `missing` field. Both the `source` and all `has` items must match, and all `missing` items must not match for the rewrite to be applied.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-rewrite-me',
          },
        ],
        destination: '/another-page',
      },
      {
        source: '/:path*',
        missing: [
          {
            type: 'header',
            key: 'x-rewrite-me',
          },
        ],
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
        destination: '/:path*/home',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: '(?<authorized>yes|true)',
          },
        ],
        destination: '/home?authorized=:authorized',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'example.com',
          },
        ],
        destination: '/another-page',
      },
    ]
  },
}
```

## Rewriting to an External URL

Rewrites allow you to rewrite to an external URL. This is especially useful for incrementally adopting Next.js.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'https://example.com/blog',
      },
      {
        source: '/blog/:slug',
        destination: 'https://example.com/blog/:slug',
      },
    ]
  },
}
```

If using `trailingSlash: true`, insert a trailing slash in the `source` parameter.

```js
module.exports = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/blog/',
        destination: 'https://example.com/blog/',
      },
      {
        source: '/blog/:path*/',
        destination: 'https://example.com/blog/:path*/',
      },
    ]
  },
}
```

### Incremental Adoption of Next.js

Next.js can fall back to proxying to an existing website after checking all Next.js routes.

```js
module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `https://custom-routes-proxying-endpoint.vercel.app/:path*`,
        },
      ],
    }
  },
}
```

### Rewrites with BasePath Support

When leveraging basePath support with rewrites, each `source` and `destination` is automatically prefixed with the `basePath`.

```js
module.exports = {
  basePath: '/docs',

  async rewrites() {
    return [
      {
        source: '/with-basePath',
        destination: '/another',
      },
      {
        source: '/without-basePath',
        destination: 'https://example.com',
        basePath: false,
      },
    ]
  },
}
```

### Rewrites with i18n Support

When leveraging i18n support with rewrites, each `source` and `destination` is automatically prefixed to handle the configured locales unless you add `locale: false` to the rewrite.

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async rewrites() {
    return [
      {
        source: '/with-locale',
        destination: '/another',
      },
      {
        source: '/nl/with-locale-manual',
        destination: '/nl/another',
        locale: false,
      },
      {
        source: '/:locale/api-alias/:path*',
        destination: '/api/:path*',
        locale: false,
      },
      {
        source: '/(.*)',
        destination: '/another',
      },
    ]
  },
}
```

## Version History

| Version   | Changes          |
| --------- | ---------------- |
| `v13.3.0` | `missing` added. |
| `v10.2.0` | `has` added.     |
| `v9.5.0`  | Headers added.   |