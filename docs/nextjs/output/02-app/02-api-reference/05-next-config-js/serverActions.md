# serverActions

Configure Server Actions behavior in your Next.js application.

## allowedOrigins

A list of extra safe origin domains from which Server Actions can be invoked. Next.js compares the origin of a Server Action request with the host domain to prevent CSRF attacks. If not provided, only the same origin is allowed.

```js
/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    },
  },
}
```

## bodySizeLimit

The default maximum size of the request body sent to a Server Action is 1MB. This limit prevents excessive server resource consumption and potential DDoS attacks. You can configure this limit using the `serverActions.bodySizeLimit` option, which can take the number of bytes or a string format like `1000`, `'500kb'`, or `'3mb'`.

```js
/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}
```

## Enabling Server Actions (v13)

Server Actions became a stable feature in Next.js 14 and are enabled by default. For earlier versions, enable them by setting `experimental.serverActions` to `true`.

```js
/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true,
  },
}

module.exports = config
```