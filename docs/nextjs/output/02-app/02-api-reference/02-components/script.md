# Optimize Third-Party Scripts in Next.js

Optimize third-party scripts in your Next.js application using the built-in `next/script` Component.

This API reference will help you understand how to use props available for the Script Component. For features and usage, please see the Optimizing Scripts page.

```tsx
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

```jsx
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

## Props

Here's a summary of the props available for the Script Component:

| Prop                    | Example                           | Type     | Required                              |
| ----------------------- | --------------------------------- | -------- | ------------------------------------- |
| src                     | `src="http://example.com/script"` | String   | Required unless inline script is used |
| strategy                | `strategy="lazyOnload"`           | String   | -                                     |
| onLoad                  | `onLoad={onLoadFunc}`             | Function | -                                     |
| onReady                 | `onReady={onReadyFunc}`           | Function | -                                     |
| onError                 | `onError={onErrorFunc}`           | Function | -                                     |

## Required Props

### `src`

A path string specifying the URL of an external script. This can be either an absolute external URL or an internal path. The `src` property is required unless an inline script is used.

## Optional Props

### `strategy`

The loading strategy of the script. There are four different strategies that can be used:

- `beforeInteractive`: Load before any Next.js code and before any page hydration occurs.
- `afterInteractive`: (default) Load early but after some hydration on the page occurs.
- `lazyOnload`: Load during browser idle time.
- `worker`: (experimental) Load in a web worker.

### `beforeInteractive`

Scripts that load with the `beforeInteractive` strategy are injected into the initial HTML from the server, downloaded before any Next.js module, and executed in the order they are placed before any hydration occurs on the page.

**This strategy should only be used for critical scripts that need to be fetched before any part of the page becomes interactive.**

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://example.com/script.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
```

### `afterInteractive`

Scripts that use the `afterInteractive` strategy are injected into the HTML client-side and will load after some (or all) hydration occurs on the page. This is the default strategy of the Script component.

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="afterInteractive" />
    </>
  )
}
```

### `lazyOnload`

Scripts that use the `lazyOnload` strategy are injected into the HTML client-side during browser idle time and will load after all resources on the page have been fetched.

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="lazyOnload" />
    </>
  )
}
```

### `worker`

Scripts that use the `worker` strategy are off-loaded to a web worker. This strategy can be used for any script but is an advanced use case.

To use `worker` as a strategy, the `nextScriptWorkers` flag must be enabled in `next.config.js`:

```js
module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
}
```

### `onLoad`

`onLoad` can be used to execute code after a script has finished loading.

```tsx
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
        onLoad={() => {
          console.log(_.sample([1, 2, 3, 4]))
        }}
      />
    </>
  )
}
```

### `onReady`

`onReady` can be used to execute code after the script has finished loading and every time the component is mounted.

```tsx
'use client'

import { useRef } from 'react'
import Script from 'next/script'

export default function Page() {
  const mapRef = useRef()

  return (
    <>
      <div ref={mapRef}></div>
      <Script
        id="google-maps"
        src="https://maps.googleapis.com/maps/api/js"
        onReady={() => {
          new google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          })
        }}
      />
    </>
  )
}
```

### `onError`

`onError` can be used to catch when a script fails to load.

```tsx
'use client'

import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onError={(e) => {
          console.error('Script failed to load', e)
        }}
      />
    </>
  )
}
```

## Version History

| Version   | Changes                                                                   |
| --------- | ------------------------------------------------------------------------- |
| v13.0.0  | `beforeInteractive` and `afterInteractive` modified to support `app`.    |
| v12.2.4  | `onReady` prop added.                                                     |
| v12.2.2  | Allow `next/script` with `beforeInteractive` in `_document`.             |
| v11.0.0  | `next/script` introduced.                                                 |