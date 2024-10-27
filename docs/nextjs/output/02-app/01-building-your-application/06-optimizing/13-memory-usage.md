# Memory Usage

Optimize memory used by your application in development and production.

As applications grow and become more feature-rich, they can demand more resources when developing locally or creating production builds. Here are strategies and techniques to optimize memory and address common memory issues in Next.js.

## Reduce Number of Dependencies

Applications with a large number of dependencies will use more memory. The Bundle Analyzer can help you investigate large dependencies in your application that may be removable to improve performance and memory usage.

## Try `experimental.webpackMemoryOptimizations`

Starting in v15.0.0, add `experimental.webpackMemoryOptimizations: true` to your `next.config.js` file to reduce max memory usage, though it may slightly increase compilation times. This feature is currently experimental but considered low-risk.

## Run `next build` with `--experimental-debug-memory-usage`

Starting in v14.2.0, run `next build --experimental-debug-memory-usage` to print information about memory usage continuously throughout the build, including heap usage and garbage collection statistics. Heap snapshots will be taken automatically when memory usage approaches the configured limit. This feature is not compatible with the Webpack build worker option.

## Record a Heap Profile

To identify memory issues, record a heap profile from Node.js and load it in Chrome DevTools. Use the following command:

```sh
node --heap-prof node_modules/next/dist/bin/next build
```

A `.heapprofile` file will be created at the end of the build. Open the Memory tab in Chrome DevTools and click "Load Profile" to visualize the file.

## Analyze a Snapshot of the Heap

To analyze memory usage, run `next build` or `next dev` with `NODE_OPTIONS=--inspect` to expose the inspector agent. Use `--inspect-brk` to break before any user code starts. Connect to the debugging port with Chrome DevTools to record and analyze a heap snapshot. In v14.2.0 and later, you can also run `next build` with `--experimental-debug-memory-usage` to facilitate heap snapshots.

## Webpack Build Worker

The Webpack build worker allows Webpack compilations to run inside a separate Node.js worker, decreasing memory usage during builds. This option is enabled by default if there is no custom Webpack configuration starting in v14.1.0. For older versions or custom configurations, enable it by setting `experimental.webpackBuildWorker: true` in `next.config.js`. This feature may not be compatible with all custom Webpack plugins.

## Disable Webpack Cache

The Webpack cache saves generated modules in memory and/or to disk, improving build speed but increasing memory usage. Disable this by adding a custom Webpack configuration:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      });
    }
    return config;
  },
}

export default nextConfig
```

## Disable Static Analysis

Typechecking and linting can require significant memory, especially in large projects. If builds encounter out-of-memory issues during linting and type checking, disable these tasks:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

This may lead to faulty deployments due to type errors or linting issues. It is recommended to promote builds to production only after static analysis has completed.

## Disable Source Maps

Generating source maps consumes extra memory during the build process. Disable source map generation by adding `productionBrowserSourceMaps: false` and `experimental.serverSourceMaps: false` to your Next.js configuration. Some plugins may require custom configuration to disable source maps.

## Edge Memory Issues

Next.js v14.1.3 fixed a memory issue when using the Edge runtime. Update to this version or later to see if it resolves your issue.