# useRouter

The `useRouter` hook allows you to programmatically change routes inside Client Components.

**Recommendation:** Use the `<Link>` component for navigation unless you have a specific requirement for using `useRouter`.

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

```jsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## `useRouter()`

- `router.push(href: string, { scroll: boolean })`: Perform a client-side navigation to the provided route. Adds a new entry into the browser’s history stack.
- `router.replace(href: string, { scroll: boolean })`: Perform a client-side navigation to the provided route without adding a new entry into the browser’s history stack.
- `router.refresh()`: Refresh the current route, making a new request to the server, re-fetching data requests, and re-rendering Server Components. The client will merge the updated React Server Component payload without losing unaffected client-side React or browser state.
- `router.prefetch(href: string)`: Prefetch the provided route for faster client-side transitions.
- `router.back()`: Navigate back to the previous route in the browser’s history stack.
- `router.forward()`: Navigate forwards to the next page in the browser’s history stack.

**Good to know**:
- The `<Link>` component automatically prefetch routes as they become visible in the viewport.
- `refresh()` could reproduce the same result if fetch requests are cached. Other Dynamic APIs like cookies and headers could also change the response.

### Migrating from `next/router`

- Import `useRouter` from `next/navigation` when using the App Router.
- The `pathname` string has been removed and is replaced by `usePathname()`.
- The `query` object has been removed and is replaced by `useSearchParams()`.
- `router.events` has been replaced.

## Examples

### Router events

You can listen for page changes by composing other Client Component hooks like `usePathname` and `useSearchParams`.

```jsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
  }, [pathname, searchParams])

  return '...'
}
```

Which can be imported into a layout.

```jsx
import { Suspense } from 'react'
import { NavigationEvents } from './components/navigation-events'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  )
}
```

**Good to know**: `<NavigationEvents>` is wrapped in a `Suspense` boundary because `useSearchParams()` causes client-side rendering up to the closest `Suspense` boundary during static rendering.

### Disabling scroll to top

By default, Next.js will scroll to the top of the page when navigating to a new route. You can disable this behavior by passing `scroll: false` to `router.push()` or `router.replace()`.

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push('/dashboard', { scroll: false })}
    >
      Dashboard
    </button>
  )
}
```

```jsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push('/dashboard', { scroll: false })}
    >
      Dashboard
    </button>
  )
}
```

## Version History

| Version   | Changes                                        |
| --------- | ---------------------------------------------- |
| `v13.0.0` | `useRouter` from `next/navigation` introduced. |