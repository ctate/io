# CSS Chunking

Use the `cssChunking` option to control how CSS files are chunked in your Next.js application. CSS Chunking is a strategy to improve web application performance by splitting and re-ordering CSS files into chunks, allowing you to load only the necessary CSS for a specific route.

## Configuration

You can control CSS chunking using the `experimental.cssChunking` option in your `next.config.js` file:

```tsx
import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    cssChunking: 'loose', // default
  },
} satisfies NextConfig

export default nextConfig
```

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cssChunking: 'loose', // default
  },
}

module.exports = nextConfig
```

## Options

- **`'loose'` (default)**: Next.js merges CSS files whenever possible, determining dependencies from import order to reduce chunks and requests.
- **`'strict'`**: Next.js loads CSS files in the order they are imported, which may result in more chunks and requests.

Consider using `'strict'` if you encounter unexpected CSS behavior due to import order dependencies. For most applications, `'loose'` is recommended for fewer requests and better performance.