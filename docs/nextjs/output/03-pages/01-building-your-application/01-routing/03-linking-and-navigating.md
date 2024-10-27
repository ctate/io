# Linking and Navigating

Learn how navigation works in Next.js, and how to use the Link Component and `useRouter` hook.

The Next.js router allows client-side route transitions between pages, similar to a single-page application. A React component called `Link` is provided for this purpose.

```jsx
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}

export default Home
```

The example above uses multiple links. Each one maps a path (`href`) to a known page:

- `/` → `pages/index.js`
- `/about` → `pages/about.js`
- `/blog/hello-world` → `pages/blog/[slug].js`

Any `<Link />` in the viewport will be prefetched by default for pages using Static Generation. The corresponding data for server-rendered routes is fetched only when the `<Link />` is clicked.

## Linking to dynamic paths

You can use interpolation to create the path for dynamic route segments. For example, to show a list of posts passed to the component as a prop:

```jsx
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```

Alternatively, using a URL Object:

```jsx
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```

In this case, `pathname` is the name of the page in the `pages` directory, and `query` is an object with the dynamic segment.

## Injecting the router

To access the `router` object in a React component, you can use `useRouter` or `withRouter`. It is generally recommended to use `useRouter`.

## Imperative Routing

`next/link` covers most routing needs, but you can also perform client-side navigations without it. The following example shows basic page navigations with `useRouter`:

```jsx
import { useRouter } from 'next/router'

export default function ReadMore() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/about')}>
      Click here to read more
    </button>
  )
}
```

## Shallow Routing

Shallow routing allows you to change the URL without running data fetching methods again, including `getServerSideProps`, `getStaticProps`, and `getInitialProps`. You'll receive the updated `pathname` and `query` via the `router` object without losing state.

To enable shallow routing, set the `shallow` option to `true`. Consider the following example:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}

export default Page
```

The URL will update to `/?counter=10` without replacing the page, only changing the state of the route.

You can also watch for URL changes via `componentDidUpdate`:

```jsx
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  if (query.counter !== prevProps.router.query.counter) {
    // fetch data based on the new query
  }
}
```

### Caveats

Shallow routing only works for URL changes in the current page. For example, if you run:

```js
router.push('/?counter=10', '/about?counter=10', { shallow: true })
```

This will unload the current page and load the new one, waiting for data fetching despite the shallow routing request.

When shallow routing is used with middleware, it will not ensure the new page matches the current page, as middleware can rewrite dynamically and cannot be verified client-side without a data fetch. Thus, a shallow route change must always be treated as shallow.