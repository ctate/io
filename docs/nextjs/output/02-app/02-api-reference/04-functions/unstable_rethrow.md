# unstable_rethrow

## Description
API Reference for the unstable_rethrow function.

## Overview
`unstable_rethrow` is used to avoid catching internal errors thrown by Next.js when handling errors in application code.

## Example Usage
When calling the `notFound` function, it throws an internal Next.js error and renders the not-found.js component. If used inside a `try/catch` block, the error will be caught, preventing the rendering of not-found.js:

```tsx
import { notFound } from 'next/navigation'

export default async function Page() {
  try {
    const post = await fetch('https://.../posts/1').then((res) => {
      if (res.status === 404) notFound()
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
  } catch (err) {
    console.error(err)
  }
}
```

To re-throw the internal error and maintain expected behavior, use the `unstable_rethrow` API:

```tsx
import { notFound, unstable_rethrow } from 'next/navigation'

export default async function Page() {
  try {
    const post = await fetch('https://.../posts/1').then((res) => {
      if (res.status === 404) notFound()
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
  } catch (err) {
    unstable_rethrow(err)
    console.error(err)
  }
}
```

## Related Next.js APIs
The following APIs rely on throwing an error that should be rethrown and handled by Next.js:

- notFound()
- redirect()
- permanentRedirect()

If a route segment is marked to throw an error unless static, a Dynamic API call will also throw an error that should not be caught by the developer. Note that Partial Prerendering (PPR) affects this behavior. These APIs include:

- cookies
- headers
- searchParams
- fetch(..., { cache: 'no-store' })
- fetch(..., { next: { revalidate: 0 } })

## Important Notes
- Call this method at the top of the catch block, passing the error object as its only argument. It can also be used within a `.catch` handler of a promise.
- If API calls that throw are not wrapped in a try/catch, `unstable_rethrow` is not needed.
- Resource cleanup (like clearing intervals, timers, etc.) must occur before calling `unstable_rethrow` or within a `finally` block.