# cacheLife

Learn how to set up cacheLife configurations in Next.js.

Version: experimental

The `cacheLife` option allows you to define custom configurations when using the `cacheLife` function with the `use cache` directive at the level of components, functions, or files, for more granular control over caching.

## Usage

To use `cacheLife`, enable the `dynamicIO` flag and define the configuration in your `next.config.js` file as follows:

```js
module.exports = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      blog: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },
}
```

You can now use this custom `blog` configuration in your component, function, or file as follows:

```tsx
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getCachedData() {
  'use cache'
  cacheLife('blog')
  const data = await fetch('/api/data')
  return data
}
```

## Configuration structure

The configuration object has key values with the following format:

- **Property**: `stale`
  - **Value**: `number`
  - **Description**: Duration the client should cache a value without checking the server.
  - **Requirement**: Optional

- **Property**: `revalidate`
  - **Value**: `number`
  - **Description**: Frequency at which the cache should refresh on the server; stale values may be served while revalidating.
  - **Requirement**: Optional

- **Property**: `expire`
  - **Value**: `number`
  - **Description**: Maximum duration for which a value can remain stale before switching to dynamic fetching; must be longer than `revalidate`.
  - **Requirement**: Optional - Must be longer than `revalidate`