# not-found.js

## Description
The **not-found** file is used to render UI when the `notFound` function is thrown within a route segment. It serves a custom UI, returning a `200` HTTP status code for streamed responses and `404` for non-streamed responses.

## Example Implementations

### TypeScript Example
```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

### JavaScript Example
```jsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

## Important Note
The root `app/not-found.js` file handles unmatched URLs for the entire application, displaying the UI exported by this file for any unhandled URLs.

## Props
`not-found.js` components do not accept any props.

## Data Fetching
By default, `not-found` is a Server Component. It can be marked as `async` to fetch and display data:

### TypeScript Async Example
```tsx
import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
  const headersList = await headers()
  const domain = headersList.get('host')
  const data = await getSiteData(domain)
  return (
    <div>
      <h2>Not Found: {data.name}</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  )
}
```

### JavaScript Async Example
```jsx
import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
  const headersList = await headers()
  const domain = headersList.get('host')
  const data = await getSiteData(domain)
  return (
    <div>
      <h2>Not Found: {data.name}</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  )
}
```

If Client Component hooks like `usePathname` are needed, data must be fetched on the client-side.

## Version History
- **v13.3.0**: Root `app/not-found` handles global unmatched URLs.
- **v13.0.0**: `not-found` introduced.