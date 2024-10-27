# typedRoutes

Enable experimental support for statically typed links. This feature requires using the App Router as well as TypeScript in your project.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
```