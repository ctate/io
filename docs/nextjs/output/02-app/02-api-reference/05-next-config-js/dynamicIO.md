# dynamicIO

## Description
Learn how to enable the dynamicIO flag in Next.js.

The `dynamicIO` flag is an experimental feature in Next.js that excludes data fetching operations in the App Router from pre-renders unless explicitly cached. This is useful for optimizing dynamic data fetching in server components, allowing for fresh data during runtime instead of serving from a pre-rendered cache.

It is expected to be used with the `use cache` directive so that data fetching occurs at runtime by default, unless specific parts of the application are defined to be cached with `use cache` at the page, function, or component level.

## Usage
To enable the `dynamicIO` flag, set it to `true` in the `experimental` section of your `next.config.ts` file:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

When `dynamicIO` is enabled, you can use the following cache functions and configurations:

- The `use cache` directive
- The `cacheLife` function with `use cache`
- The `cacheTag` function

## Notes
- While `dynamicIO` can optimize performance by ensuring fresh data fetching during runtime, it may introduce additional latency compared to serving pre-rendered content.