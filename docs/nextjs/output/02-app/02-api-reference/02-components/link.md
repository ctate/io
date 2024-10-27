# Enable fast client-side navigation with the built-in `next/link` component

`<Link>` is a React component that extends the HTML `<a>` element to provide prefetching and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.

## Basic usage

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

```jsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## Reference

The following props can be passed to the `<Link>` component:

| Prop                                | Example                 | Type              | Required |
| ----------------------------------- | ----------------------- | ----------------- | -------- |
| `href`                              | `href="/dashboard"`     | String or Object  | Yes      |
| `replace`                           | `replace={false}`       | Boolean           | -        |
| `scroll`                            | `scroll={false}`        | Boolean           | -        |
| `prefetch`                          | `prefetch={false}`      | Boolean           | -        |
| `legacyBehavior`                    | `legacyBehavior={true}` | Boolean           | -        |
| `passHref`                          | `passHref={true}`       | Boolean           | -        |
| `shallow`                           | `shallow={false}`       | Boolean           | -        |
| `locale`                            | `locale="fr"`           | String or Boolean | -        |

> **Good to know**: `<a>` tag attributes such as `className` or `target="_blank"` can be added to `<Link>` as props and will be passed to the underlying `<a>` element.

### `href` (required)

The path or URL to navigate to.

```tsx
import Link from 'next/link'

// Navigate to /about?name=test
export default function Page() {
  return (
    <Link
      href={{
        pathname: '/about',
        query: { name: 'test' },
      }}
    >
      About
    </Link>
  )
}
```

### `replace`

**Defaults to `false`.** When `true`, `next/link` will replace the current history state instead of adding a new URL into the browser's history stack.

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/dashboard" replace>
      Dashboard
    </Link>
  )
}
```

### `scroll`

**Defaults to `true`.** The default scrolling behavior of `<Link>` in Next.js is to maintain scroll position. When `scroll = {false}`, Next.js will not attempt to scroll to the first Page element.

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/dashboard" scroll={false}>
      Dashboard
    </Link>
  )
}
```

### `prefetch`

Prefetching happens when a `<Link />` component enters the user's viewport. Prefetching is only enabled in production.

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/dashboard" prefetch={false}>
      Dashboard
    </Link>
  )
}
```

### `legacyBehavior`

An `<a>` element is no longer required as a child of `<Link>`. Add the `legacyBehavior` prop to use the legacy behavior.

### `passHref`

Forces `Link` to send the `href` property to its child. Defaults to `false`.

### `shallow`

Update the path of the current page without rerunning `getStaticProps`, `getServerSideProps`, or `getInitialProps`. Defaults to `false`.

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <Link href="/dashboard" shallow={false}>
      Dashboard
    </Link>
  )
}
```

### `locale`

The active locale is automatically prepended. `locale` allows for providing a different locale.

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href="/dashboard">Dashboard (with locale)</Link>
      <Link href="/dashboard" locale={false}>
        Dashboard (without locale)
      </Link>
      <Link href="/dashboard" locale="fr">
        Dashboard (French)
      </Link>
    </>
  )
}
```

## Examples

### Linking to dynamic segments

```tsx
import Link from 'next/link'

interface Post {
  id: number
  title: string
  slug: string
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### Checking active links

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Links() {
  const pathname = usePathname()

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>
      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href="/about"
      >
        About
      </Link>
    </nav>
  )
}
```

### Scrolling to an `id`

```jsx
<Link href="/dashboard#settings">Settings</Link>
```

### If the child is a custom component that wraps an `<a>` tag

```tsx
import Link from 'next/link'
import styled from 'styled-components'

const RedLink = styled.a`
  color: red;
`

function NavLink({ href, name }) {
  return (
    <Link href={href} passHref legacyBehavior>
      <RedLink>{name}</RedLink>
    </Link>
  )
}

export default NavLink
```

### Nesting a functional component

```tsx
import Link from 'next/link'
import React from 'react'

const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Click Me
    </a>
  )
})

MyButton.displayName = 'MyButton'

export default function Page() {
  return (
    <Link href="/about" passHref legacyBehavior>
      <MyButton />
    </Link>
  )
}
```

### Passing a URL Object

```tsx
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link
          href={{
            pathname: '/about',
            query: { name: 'test' },
          }}
        >
          About us
        </Link>
      </li>
      <li>
        <Link
          href={{
            pathname: '/blog/[slug]',
            query: { slug: 'my-post' },
          }}
        >
          Blog Post
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

### Replace the URL instead of push

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/about" replace>
      About us
    </Link>
  )
}
```

### Disable scrolling to the top of the page

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/#hashid" scroll={false}>
      Disables scrolling to the top
    </Link>
  )
}
```

### Prefetching links in Middleware

```ts
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const nextUrl = request.nextUrl
  if (nextUrl.pathname === '/dashboard') {
    if (request.cookies.authToken) {
      return NextResponse.rewrite(new URL('/auth/dashboard', request.url))
    } else {
      return NextResponse.rewrite(new URL('/public/dashboard', request.url))
    }
  }
}
```

```tsx
'use client'

import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed'

export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/public/dashboard'
  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  )
}
```

## Version history

| Version   | Changes                                                                                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v13.0.0` | No longer requires a child `<a>` tag. A codemod is provided to automatically update your codebase.                                                                                           |
| `v10.0.0` | `href` props pointing to a dynamic route are automatically resolved and no longer require an `as` prop.                                                                                         |
| `v8.0.0`  | Improved prefetching performance.                                                                                                                                                               |
| `v1.0.0`  | `next/link` introduced.                                                                                                                                                                         |