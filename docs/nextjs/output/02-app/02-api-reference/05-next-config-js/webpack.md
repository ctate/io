# Custom Webpack Config

Learn how to customize the webpack config used by Next.js.

> **Good to know**: changes to webpack config are not covered by semver so proceed at your own risk.

Before adding custom webpack configuration, ensure Next.js doesn't already support your use case:

**App Only:**
- CSS imports
- CSS modules
- Sass/SCSS imports
- Sass/SCSS modules

**Pages Only:**
- CSS imports
- CSS modules
- Sass/SCSS imports
- Sass/SCSS modules
- Customizing babel configuration

Some commonly requested features are available as plugins:
- @next/mdx
- @next/bundle-analyzer

To extend webpack usage, define a function in `next.config.js`:

```js
module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
}
```

The `webpack` function is executed three times: twice for the server (nodejs / edge runtime) and once for the client. Use the `isServer` property to distinguish between client and server configuration.

The second argument to the `webpack` function includes:
- `buildId`: String - Unique identifier between builds
- `dev`: Boolean - Indicates if the compilation is in development
- `isServer`: Boolean - `true` for server-side compilation, `false` for client-side
- `nextRuntime`: String | undefined - Target runtime for server-side compilation; either "edge" or "nodejs", `undefined` for client-side
- `defaultLoaders`: Object - Default loaders used by Next.js:
  - `babel`: Object - Default `babel-loader` configuration

Example usage of `defaultLoaders.babel`:

```js
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    });

    return config;
  },
}
```

### `nextRuntime`

`isServer` is `true` when `nextRuntime` is "edge" or "nodejs". The "edge" runtime is currently for middleware and Server Components in edge runtime only.