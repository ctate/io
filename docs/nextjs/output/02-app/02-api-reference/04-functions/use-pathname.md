# usePathname

`usePathname` is a **Client Component** hook that allows reading the current URL's **pathname**.

```tsx
'use client'

import { usePathname } from 'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

```jsx
'use client'

import { usePathname } from 'next/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()
  return <p>Current pathname: {pathname}</p>
}
```

`usePathname` requires the use of a Client Component. Client Components are essential to the Server Components architecture.

A Client Component with `usePathname` is rendered into HTML on the initial page load. When navigating to a new route, the component does not need to be re-fetched; it is downloaded once and re-renders based on the current state.

**Good to know**:
- Reading the current URL from a Server Component is not supported to preserve layout state across page navigations.
- Compatibility mode:
  - `usePathname` may return `null` when a fallback route is being rendered or when a pages directory page has been automatically statically optimized by Next.js and the router is not ready.
  - When using `usePathname` with rewrites in next.config or Middleware, use `useState` and `useEffect` to avoid hydration mismatch errors.
  - Next.js will automatically update types if both an app and pages directory are detected in your project.

## Parameters

```tsx
const pathname = usePathname()
```

`usePathname` does not take any parameters.

## Returns

`usePathname` returns a string of the current URL's pathname. For example:

| URL                 | Returned value        |
| ------------------- | --------------------- |
| `/`                 | `'/'`                 |
| `/dashboard`        | `'/dashboard'`        |
| `/dashboard?v=2`    | `'/dashboard'`        |
| `/blog/hello-world` | `'/blog/hello-world'` |

## Examples

### Do something in response to a route change

```tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // Do something here...
  }, [pathname, searchParams])
}
```

```jsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'

function ExampleClientComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // Do something here...
  }, [pathname, searchParams])
}
```

| Version   | Changes                   |
| --------- | ------------------------- |
| `v13.0.0` | `usePathname` introduced. |