# bundlePagesRouterDependencies

Enable automatic server-side dependency bundling for Pages Router applications. Matches the automatic dependency bundling in App Router.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  bundlePagesRouterDependencies: true,
}

module.exports = nextConfig
```

Explicitly opt-out certain packages from being bundled using the `serverExternalPackages` option.

## Version History

- **Version v15.0.0**: Moved from experimental to stable. Renamed from `bundlePagesExternals` to `bundlePagesRouterDependencies`.