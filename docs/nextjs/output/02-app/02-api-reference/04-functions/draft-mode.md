# draftMode

## Description
API Reference for the draftMode function.

## Related
Next Steps: Learn how to use Draft Mode with this step-by-step guide. Links: app/building-your-application/configuring/draft-mode

## Overview
`draftMode` is an **async** function that allows you to enable and disable Draft Mode, as well as check if Draft Mode is enabled in a Server Component.

### Example Usage

```tsx
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

```jsx
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
}
```

## Reference

### Methods and Properties

- `isEnabled`: A boolean value that indicates if Draft Mode is enabled.
- `enable()`: Enables Draft Mode in a Route Handler by setting a cookie (`__prerender_bypass`).
- `disable()`: Disables Draft Mode in a Route Handler by deleting a cookie.

## Good to Know

- `draftMode` is an **asynchronous** function that returns a promise. Use `async/await` or React's `use` function.
- In version 14 and earlier, `draftMode` was synchronous. It can still be accessed synchronously in Next.js 15, but this will be deprecated.
- A new bypass cookie value is generated each time you run `next build` to prevent guessing.
- To test Draft Mode locally over HTTP, ensure your browser allows third-party cookies and local storage access.

## Examples

### Enabling Draft Mode

To enable Draft Mode, create a new Route Handler and call the `enable()` method:

```tsx
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft().enable()
  return new Response('Draft mode is enabled')
}
```

```js
import { draftMode } from 'next/headers'

export async function GET(request) {
  const draft = await draftMode()
  draft().enable()
  return new Response('Draft mode is enabled')
}
```

### Disabling Draft Mode

By default, the Draft Mode session ends when the browser is closed. To disable Draft Mode manually, call the `disable()` method in your Route Handler:

```tsx
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft().disable()
  return new Response('Draft mode is disabled')
}
```

```js
import { draftMode } from 'next/headers'

export async function GET(request) {
  const draft = await draftMode()
  draft().disable()
  return new Response('Draft mode is disabled')
}
```

Send a request to invoke the Route Handler. If using the `<Link>` component, pass `prefetch={false}` to prevent accidentally deleting the cookie on prefetch.

### Checking if Draft Mode is Enabled

You can check if Draft Mode is enabled in a Server Component with the `isEnabled` property:

```tsx
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  return (
    <main>
      <h1>My Blog Post</h1>
      <p>Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}</p>
    </main>
  )
}
```

```jsx
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  return (
    <main>
      <h1>My Blog Post</h1>
      <p>Draft Mode is currently {isEnabled ? 'Enabled' : 'Disabled'}</p>
    </main>
  )
}
```

## Version History

- `v15.0.0-RC`: `draftMode` is now an async function. A codemod is available.
- `v13.4.0`: `draftMode` introduced.