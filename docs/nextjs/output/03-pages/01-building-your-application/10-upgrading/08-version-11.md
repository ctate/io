# Version 11

Upgrade your Next.js Application from Version 10 to Version 11.

To upgrade to version 11, run the following command:

```bash
npm i next@11 react@17 react-dom@17
```

```bash
yarn add next@11 react@17 react-dom@17
```

```bash
pnpm up next@11 react@17 react-dom@17
```

```bash
bun add next@11 react@17 react-dom@17
```

**Good to know:** If you are using TypeScript, ensure you also upgrade `@types/react` and `@types/react-dom` to their corresponding versions.

## Webpack 5

Webpack 5 is now the default for all Next.js applications. If you did not have a custom webpack configuration, your application is already using webpack 5. If you do have a custom webpack configuration, refer to the Next.js webpack 5 documentation for upgrade guidance.

## Cleaning the `distDir` is now a default

The build output directory (defaults to `.next`) is now cleared by default except for the Next.js caches. Refer to the cleaning `distDir` RFC for more information.

If your application relied on this behavior previously, you can disable the new default behavior by adding the `cleanDistDir: false` flag in `next.config.js`.

## `PORT` is now supported for `next dev` and `next start`

Next.js 11 supports the `PORT` environment variable to set the port the application runs on. Using `-p`/`--port` is still recommended, but if you were prohibited from using `-p`, you can now use `PORT` as an alternative:

Example:

```
PORT=4000 next start
```

## `next.config.js` customization to import images

Next.js 11 supports static image imports with `next/image`. If you previously added the `next-images` or `next-optimized-images` packages, you can either move to the new built-in support using `next/image` or disable the feature:

```js
module.exports = {
  images: {
    disableStaticImages: true,
  },
}
```

## Remove `super.componentDidCatch()` from `pages/_app.js`

The `next/app` component's `componentDidCatch` was deprecated in Next.js 9 and has since been a no-op. In Next.js 11, it was removed. If your `pages/_app.js` has a custom `componentDidCatch` method, you can remove `super.componentDidCatch`.

## Remove `Container` from `pages/_app.js`

This export was deprecated in Next.js 9 and has since been a no-op with a warning during development. In Next.js 11, it was removed. If your `pages/_app.js` imports `Container` from `next/app`, you can remove it.

## Remove `props.url` usage from page components

This property was deprecated in Next.js 4 and has since shown a warning during development. With the introduction of `getStaticProps` / `getServerSideProps`, these methods already disallowed the usage of `props.url`. In Next.js 11, it was removed.

## Remove `unsized` property on `next/image`

The `unsized` property on `next/image` was deprecated in Next.js 10.0.1. You can use `layout="fill"` instead. In Next.js 11, `unsized` was removed.

## Remove `modules` property on `next/dynamic`

The `modules` and `render` options for `next/dynamic` were deprecated in Next.js 9.5. In Next.js 11, these options were removed. If your application uses `modules` and `render`, refer to the documentation.

## Remove `Head.rewind`

`Head.rewind` has been a no-op since Next.js 9.5. In Next.js 11, it was removed. You can safely remove your usage of `Head.rewind`.

## Moment.js locales excluded by default

Next.js now automatically excludes Moment.js locales by default to optimize bundle size. To load a specific locale, use this snippet:

```js
import moment from 'moment'
import 'moment/locale/ja'

moment.locale('ja')
```

You can opt-out of this new default by adding `excludeDefaultMomentLocales: false` to `next.config.js`, but it is highly recommended to not disable this optimization.

## Update usage of `router.events`

In Next.js 11, `router.events` is no longer provided during pre-rendering. Ensure you're accessing `router.events` in `useEffect`:

```js
useEffect(() => {
  const handleRouteChange = (url, { shallow }) => {
    console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`)
  }

  router.events.on('routeChangeStart', handleRouteChange)

  return () => {
    router.events.off('routeChangeStart', handleRouteChange)
  }
}, [router])
```

If your application uses `router.router.events`, please make sure to use `router.events`.

## React 16 to 17

React 17 introduced a new JSX Transform that allows not having to `import React from 'react'` when using JSX. When using React 17, Next.js will automatically use the new transform. A codemod is available to automatically fix cases where you accidentally used `React` without importing it.

Most applications already use the latest version of React. With Next.js 11, the minimum React version has been updated to 17.0.2.

To upgrade, run the following command:

```
npm install react@latest react-dom@latest
```

Or using `yarn`:

```
yarn add react@latest react-dom@latest
```