# useLightningcss

Enable experimental support for Lightning CSS.

Version: experimental

Experimental support for using Lightning CSS, a fast CSS bundler and minifier, written in Rust.

TypeScript Configuration:
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useLightningcss: true,
  },
}

export default nextConfig
```

JavaScript Configuration:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useLightningcss: true,
  },
}

module.exports = nextConfig
```