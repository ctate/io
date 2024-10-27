# TypeScript in Next.js

Next.js reports TypeScript errors by default. If you want to opt-out of this behavior, follow the instructions below.

Next.js fails your **production build** (`next build`) when TypeScript errors are present in your project. To allow production code to be generated even with errors, you can disable the built-in type checking step. 

**Warning:** If you disable this feature, ensure that you are running type checks as part of your build or deploy process, as this can be very dangerous.

To disable type checking, open `next.config.js` and enable the `ignoreBuildErrors` option in the `typescript` config:

```js
module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
```