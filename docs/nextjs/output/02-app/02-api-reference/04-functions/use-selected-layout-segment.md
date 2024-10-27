# useSelectedLayoutSegment

**Description**: API Reference for the useSelectedLayoutSegment hook.

`useSelectedLayoutSegment` is a **Client Component** hook that lets you read the active route segment **one level below** the Layout it is called from. It is useful for navigation UI, such as tabs inside a parent layout that change style depending on the active child segment.

## Example Usage

```tsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()

  return <p>Active segment: {segment}</p>
}
```

```jsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment()

  return <p>Active segment: {segment}</p>
}
```

**Good to know**:
- Since `useSelectedLayoutSegment` is a Client Component hook, and Layouts are Server Components by default, `useSelectedLayoutSegment` is usually called via a Client Component that is imported into a Layout.
- `useSelectedLayoutSegment` only returns the segment one level down. To return all active segments, see `useSelectedLayoutSegments`.

## Parameters

```tsx
const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)
```

`useSelectedLayoutSegment` _optionally_ accepts a `parallelRoutesKey`, which allows you to read the active route segment within that slot.

## Returns

`useSelectedLayoutSegment` returns a string of the active segment or `null` if one doesn't exist.

**Example Layouts and URLs**:

| Layout                    | Visited URL                    | Returned Segment |
| ------------------------- | ------------------------------ | ---------------- |
| `app/layout.js`           | `/`                            | `null`           |
| `app/layout.js`           | `/dashboard`                   | `'dashboard'`    |
| `app/dashboard/layout.js` | `/dashboard`                   | `null`           |
| `app/dashboard/layout.js` | `/dashboard/settings`          | `'settings'`     |
| `app/dashboard/layout.js` | `/dashboard/analytics`         | `'analytics'`    |
| `app/dashboard/layout.js` | `/dashboard/analytics/monthly` | `'analytics'`    |

## Examples

### Creating an Active Link Component

You can use `useSelectedLayoutSegment` to create an active link component that changes style depending on the active segment.

```tsx
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function BlogNavLink({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/blog/${slug}`}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  )
}
```

```jsx
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function BlogNavLink({ slug, children }) {
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/blog/${slug}`}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      {children}
    </Link>
  )
}
```

```tsx
// Import the Client Component into a parent Layout (Server Component)
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

```jsx
// Import the Client Component into a parent Layout (Server Component)
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({ children }) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

## Version History

| Version   | Changes                                |
| --------- | -------------------------------------- |
| `v13.0.0` | `useSelectedLayoutSegment` introduced. |