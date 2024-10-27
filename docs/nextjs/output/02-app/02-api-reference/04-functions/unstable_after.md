# unstable_after

`unstable_after` allows you to schedule work to be executed after a response (or prerender) is finished. This is useful for tasks and other side effects that should not block the response, such as logging and analytics.

It can be used in Server Components, `generateMetadata`, Server Actions, Route Handlers, and Middleware.

The function accepts a callback that will be executed after the response (or prerender) is finished:

```tsx
import { unstable_after as after } from 'next/server'
// Custom logging function
import { log } from '@/app/utils'

export default function Layout({ children }) {
  after(() => {
    // Execute after the layout is rendered and sent to the user
    log()
  })
  return <>{children}</>
}
```

```jsx
import { unstable_after as after } from 'next/server'
// Custom logging function
import { log } from '@/app/utils'

export default function Layout({ children }) {
  after(() => {
    // Execute after the layout is rendered and sent to the user
    log()
  })
  return <>{children}</>
}
```

**Good to know:** `unstable_after` is not a Dynamic API and calling it does not cause a route to become dynamic. If used within a static page, the callback will execute at build time or whenever a page is revalidated.

## Reference

### Parameters

- A callback function which will be executed after the response (or prerender) is finished.

### Serverless function duration

`unstable_after` will run for the platform's default or configured max duration of a serverless function. If your platform supports it, you can configure the timeout limit using the `maxDuration` route segment config.

## Good to know

- `unstable_after` will be executed even if the response didn't complete successfully, including when an error is thrown or when `notFound` or `redirect` is called.
- You can use React `cache` to deduplicate functions called inside `unstable_after`.
- `cookies` cannot be set inside `unstable_after` since the response has already been sent.
- Dynamic APIs cannot be called within `unstable_after`. Call them outside of `unstable_after` and use the object they returned.
- `unstable_after` can be nested inside other `unstable_after` calls, allowing for utility functions that wrap `unstable_after` calls to add additional functionality.

## Alternatives

The use case for `unstable_after` is to process secondary tasks without blocking the primary response. It's similar to using the platform's `waitUntil()` or removing `await` from a promise, but with the following differences:

- **`waitUntil()`**: accepts a promise and enqueues a task to be executed during the lifecycle of the request, whereas `unstable_after` accepts a callback that will be executed after the response is finished.
- **Removing `await`**: starts executing during the response, which uses resources. It's also not reliable in serverless environments as the function stops computation immediately after the response is sent, potentially interrupting the task.

We recommend using `unstable_after` as it has been designed to consider other Next.js APIs and contexts.

Version History:
- `v15.0.0-rc`: `unstable_after` introduced.