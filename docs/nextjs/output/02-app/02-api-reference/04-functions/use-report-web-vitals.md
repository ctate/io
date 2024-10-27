# useReportWebVitals

## Description
API Reference for the useReportWebVitals function.

The `useReportWebVitals` hook allows you to report Core Web Vitals and can be used in combination with your analytics service.

## Example Usage

### Pages Router

```jsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return <Component {...pageProps} />
}
```

### App Router

```jsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
}
```

```jsx
import { WebVitals } from './_components/web-vitals'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  )
}
```

> Note: The `useReportWebVitals` hook requires the `"use client"` directive. Create a separate component for optimal performance.

## Metric Object Properties

- `id`: Unique identifier for the metric in the context of the current page load.
- `name`: The name of the performance metric (e.g., TTFB, FCP, LCP, FID, CLS).
- `delta`: The difference between the current and previous value of the metric, typically in milliseconds.
- `entries`: An array of Performance Entries associated with the metric.
- `navigationType`: Indicates the type of navigation that triggered the metric collection (e.g., "navigate", "reload").
- `rating`: A qualitative rating of the metric value (e.g., "good", "needs-improvement", "poor").
- `value`: The actual value or duration of the performance entry, typically in milliseconds.

## Web Vitals

Web Vitals are a set of metrics that capture the user experience of a web page:

- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Interaction to Next Paint (INP)

You can handle results using the `name` property.

### Example Handling of Web Vitals

```jsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'FCP':
        // handle FCP results
      case 'LCP':
        // handle LCP results
      // ...
    }
  })

  return <Component {...pageProps} />
}
```

## Custom Metrics

Additional custom metrics for measuring hydration and rendering times:

- `Next.js-hydration`: Time taken for the page to hydrate (in ms).
- `Next.js-route-change-to-render`: Time taken for a page to start rendering after a route change (in ms).
- `Next.js-render`: Time taken for a page to finish rendering after a route change (in ms).

### Example Handling of Custom Metrics

```jsx
import { useReportWebVitals } from 'next/web-vitals'

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'Next.js-hydration':
        // handle hydration results
        break
      case 'Next.js-route-change-to-render':
        // handle route-change to render results
        break
      case 'Next.js-render':
        // handle render results
        break
      default:
        break
    }
  })

  return <Component {...pageProps} />
}
```

## Usage on Vercel

Vercel Speed Insights does not use `useReportWebVitals`, but rather the `@vercel/speed-insights` package. The `useReportWebVitals` hook is useful for local development or when using a different service for collecting Web Vitals.

## Sending Results to External Systems

You can send results to any endpoint to measure and track real user performance. Example:

```js
useReportWebVitals((metric) => {
  const body = JSON.stringify(metric)
  const url = 'https://example.com/analytics'

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
})
```

### Google Analytics Integration

```js
useReportWebVitals(metric => {
  window.gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
})
```

Read more about sending results to Google Analytics.