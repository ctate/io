# Use Cache

Learn how to use the `use cache` directive to cache data in your Next.js application.

## Overview

The `use cache` directive designates a component, function, or file to be cached. It can be used at the top of a file to indicate that all functions in the file are cacheable, or inline at the top of a function to mark the function as cacheable. This is an experimental Next.js feature.

Enable support for the `use cache` directive with the `dynamicIO` flag in your `next.config.ts` file:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
```

Caching improves web application performance by storing results of computations or data fetches. In Next.js, caching optimizes rendering performance.

## `use cache` Directive

The `use cache` directive allows you to cache entire routes, components, and function return values. Mark an asynchronous function as cacheable by adding `use cache` at the top of the file or inside the function scope.

```tsx
// File level
'use cache'

export default async function Page() {
  // ...
}

// Component level
export async function MyComponent() {
  'use cache'
  return <></>
}

// Function level
export async function getData() {
  'use cache'
  const data = await fetch('/api/data')
  return data
}
```

**Note**: Functions using the `use cache` directive must not have side effects, such as modifying state or manipulating the DOM.

## Revalidating

By default, the `use cache` directive sets a revalidation period of fifteen minutes with a near-infinite expiration duration. For more granular caching control, use the `cacheLife` and `cacheTag` APIs.

### Basic Example

Using the `cacheLife` function at the function level to set a revalidation period of one day:

```tsx
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function MyComponent() {
  async function getData() {
    'use cache'
    cacheLife('days')
    const data = await fetch('/api/data')
    return data
  }

  return // Use the data here
}
```

### Cache Revalidation Process

1. **Cache HIT**: If a request is made within the 15-minute window, the cached data is served.
2. **Stale Data**: If the request happens after 15 minutes, the cached value is served but is considered stale. Next.js recomputes a new cache entry in the background.
3. **Cache MISS**: If the cache entry expires and a subsequent request is made, Next.js treats this as a cache MISS, and the data is recomputed and fetched again.

## Time-based Revalidation with `cacheLife`

The `cacheLife` function allows you to define time-based revalidation periods based on cache profiles. Cache profiles are objects with the following properties:

- `stale`: Duration the client should cache a value without checking the server.
- `revalidate`: Frequency at which the cache should refresh on the server.
- `expire`: Maximum duration for which a value can remain stale before switching to dynamic fetching.

### Default Cache Profiles

Next.js provides named cache profiles modeled on various timescales. If no cache profile is specified, the default profile is applied.

| Profile   | Stale      | Revalidate   | Expire         | Description                                                          |
|-----------|------------|--------------|----------------|----------------------------------------------------------------------|
| default   | undefined  | 15 minutes   | INFINITE_CACHE | Default profile for infrequently updated content                     |
| seconds   | undefined  | 1 second     | 1 minute       | For rapidly changing content requiring near real-time updates        |
| minutes   | 5 minutes  | 1 minute     | 1 hour         | For content that updates frequently within an hour                   |
| hours     | 5 minutes  | 1 hour       | 1 day          | For content that updates daily but can be slightly stale             |
| days      | 5 minutes  | 1 day        | 1 week         | For content that updates weekly but can be a day old                 |
| weeks     | 5 minutes  | 1 week       | 1 month        | For content that updates monthly but can be a week old               |
| max       | 5 minutes  | 1 month      | INFINITE_CACHE | For very stable content that rarely needs updating                   |

### Defining Reusable Cache Profiles

To create a reusable cache profile, choose a name and define it in your `next.config.ts` file:

```ts
const nextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      biweekly: {
        stale: 60 * 60 * 24 * 14, // 14 days
        revalidate: 60 * 60 * 24, // 1 day
        expire: 60 * 60 * 24 * 14, // 14 days
      },
    },
  },
}

module.exports = nextConfig
```

### Overriding Default Cache Profiles

You can override default named cache profiles by creating a new configuration with the same name:

```ts
const nextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      days: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },
}

module.exports = nextConfig
```

### Nested Usage of `use cache` and `cacheLife`

When defining multiple caching behaviors, the outer cache will respect the shortest cache duration among inner caches if the outer cache does not have its own explicit `cacheLife` profile defined.

## Revalidate On-Demand with `cacheTag`

A `cacheTag` is used with `revalidateTag` to purge cache data on-demand. The `cacheTag` function takes a single string value or a string array.

Example of using `cacheTag`:

```tsx
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from 'next/cache'

export async function getData() {
  'use cache'
  cacheLife('weeks')
  cacheTag('my-data')

  const data = await fetch('/api/data')
  return data
}
```

You can purge the cache on-demand using `revalidateTag` in another function:

```tsx
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('my-data')
}
```

## Examples

### Caching Entire Routes with `use cache`

To ensure your route remains static, avoid using `Suspense` boundaries. If you must use them, add the `use cache` directive to both the layout and page components.

```tsx
"use cache"
import { unstable_cacheLife as cacheLife} from 'next/cache'
cacheLife('minutes')

export default Layout({children}: {children: ReactNode}) {
  return <div>{children}</div>
}
```

### Caching Component Output with `use cache`

Use `use cache` at the component level to cache fetches or computations performed within that component.

```tsx
import { unstable_cacheLife as cacheLife } from 'next/cache'

interface BookingsProps {
  type: string
}

export async function Bookings({ type = 'massage' }: BookingsProps) {
  'use cache'
  cacheLife('minutes')

  async function getBookingsData() {
    const data = await fetch(`/api/bookings?type=${encodeURIComponent(type)}`)
    return data
  }
  return //...
}
```

### Caching Function Output with `use cache`

Add `use cache` to any asynchronous function to cache network requests or slow computations.

```tsx
import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getData() {
  'use cache'
  cacheLife('minutes')

  const data = await fetch('/api/data')
  return data
}
```