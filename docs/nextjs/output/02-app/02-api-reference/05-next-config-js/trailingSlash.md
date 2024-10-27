# trailingSlash

Configure Next.js pages to resolve with or without a trailing slash.

By default, Next.js redirects URLs with trailing slashes to their counterparts without a trailing slash. For example, `/about/` will redirect to `/about`. You can configure this behavior to redirect URLs without trailing slashes to their counterparts with trailing slashes.

Open `next.config.js` and add the `trailingSlash` config:

```js
module.exports = {
  trailingSlash: true,
}
```

With this option set, URLs like `/about` will redirect to `/about/`.

When used with output: "export" configuration, the `/about` page will output `/about/index.html` (instead of the default `/about.html`).

## Version History

| Version  | Changes                |
| -------- | ---------------------- |
| v9.5.0  | trailingSlash added.   |