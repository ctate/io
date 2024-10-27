# error.js

## Description
API reference for the error.js special file.

## Overview
An **error** file allows you to handle unexpected runtime errors and display fallback UI.

## Example Code

### TypeScript Example
```tsx
'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### JavaScript Example
```jsx
'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## How `error.js` Works
`error.js` wraps a route segment and its nested children in a React Error Boundary. When an error occurs within the boundary, the `error` component serves as the fallback UI.

## Props

### `error`
An instance of an Error object forwarded to the `error.js` Client Component.

- **error.message**: 
  - Errors from Client Components show the original message.
  - Errors from Server Components show a generic message with an identifier to prevent leaking sensitive details.

- **error.digest**: 
  An automatically generated hash of the error, useful for matching server-side logs.

### `reset`
The `reset()` function allows users to attempt recovery from the error. Executing this function tries to re-render the error boundary's contents.

## Global Error Handling

### `global-error.js`
You can handle errors in the root layout or template using `app/global-error.js`. This file replaces the root layout when active and must define its own `<html>` and `<body>` tags.

#### TypeScript Example
```tsx
'use client' // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

#### JavaScript Example
```jsx
'use client' // Error boundaries must be Client Components

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

## Additional Information
- `global-error.js` is only enabled in production. In development, an error overlay will show instead.

## Not Found Handling
The `not-found` file shows UI when calling the `notFound()` function within a route segment.

## Version History
- **v13.1.0**: `global-error` introduced.
- **v13.0.0**: `error` introduced.