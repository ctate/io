# devIndicators

Optimized pages include an indicator to let you know if it's being statically optimized. You can opt-out of it here.

`devIndicators` allows you to configure the on-screen indicators that give context about the current route you're viewing during development.

```ts
devIndicators: {
  appIsrStatus?: boolean, // defaults to true
  buildActivity?: boolean, // defaults to true
  buildActivityPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left', // defaults to 'bottom-right'
},
```

## appIsrStatus (Static Indicator)

Next.js displays a static indicator in the bottom corner of the screen that signals if a route will be prerendered at build time. This helps identify if a route is static or dynamic.

You can temporarily hide the indicator by clicking the close indicator, which will remember your preference in `localStorage` for 1 hour. To permanently disable it, use the config option in `next.config.js`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
}

export default nextConfig
```

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
}

module.exports = nextConfig
```

## buildActivity (Compilation Indicator)

When you edit your code, and Next.js is compiling the application, a compilation indicator appears in the bottom right corner of the page.

This indicator is only present in development mode and will not appear in production mode.

To change its position, set the `buildActivityPosition` in `next.config.js`:

```js
module.exports = {
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
}
```

To remove it, disable the `buildActivity` config in `devIndicators`:

```js
module.exports = {
  devIndicators: {
    buildActivity: false,
  },
}
```

## Troubleshooting

### Static route not showing the indicator

If a route is expected to be static and the indicator is enabled but not showing, it may have opted out of static rendering.

Confirm if a route is static or dynamic by building your application using `next build --debug`, and checking the output in your terminal. Static routes will display a `○` symbol, while dynamic routes will display a `ƒ` symbol.

There are two reasons a route might opt out of static rendering:

- The presence of Dynamic APIs which rely on runtime information.
- An uncached data request, like a call to an ORM or database driver.

Check your route for these conditions. If you cannot statically render the route, consider using `loading.js` or `<Suspense />` to leverage streaming.

## Pages Only

This indicator was removed in Next.js version 10.0.1. We recommend upgrading to the latest version of Next.js.

When a page qualifies for Automatic Static Optimization, an indicator is shown to inform you. This is helpful since automatic static optimization can be very beneficial.

To remove it, disable the `autoPrerender` config in `devIndicators`:

```js
module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
}
```