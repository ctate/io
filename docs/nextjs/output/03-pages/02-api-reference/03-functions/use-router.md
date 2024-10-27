# useRouter

Learn more about the API of the Next.js Router, and access the router instance in your page with the useRouter hook.

To access the `router` object inside any function component in your app, use the `useRouter` hook. Here’s an example:

```jsx
import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink
```

`useRouter` is a React Hook, meaning it cannot be used with classes. You can either use `withRouter` or wrap your class in a function component.

## `router` object

The `router` object returned by both `useRouter` and `withRouter` includes:

- `pathname`: `String` - The path for the current route file after `/pages`.
- `query`: `Object` - The query string parsed to an object, including dynamic route parameters. Defaults to `{}`.
- `asPath`: `String` - The path shown in the browser including search params.
- `isFallback`: `boolean` - Indicates if the current page is in fallback mode.
- `basePath`: `String` - The active basePath (if enabled).
- `locale`: `String` - The active locale (if enabled).
- `locales`: `String[]` - All supported locales (if enabled).
- `defaultLocale`: `String` - The current default locale (if enabled).
- `domainLocales`: `Array<{domain, defaultLocale, locales}>` - Configured domain locales.
- `isReady`: `boolean` - Indicates if the router fields are updated client-side and ready for use.
- `isPreview`: `boolean` - Indicates if the application is in preview mode.

Using the `asPath` field may lead to a mismatch between client and server if the page is rendered using server-side rendering or automatic static optimization. Avoid using `asPath` until `isReady` is `true`.

### Methods in `router`

#### router.push

Handles client-side transitions. Useful when `next/link` is not enough.

```js
router.push(url, as, options)
```

- `url`: `UrlObject | String` - The URL to navigate to.
- `as`: `UrlObject | String` - Optional decorator for the path shown in the browser URL bar.
- `options`: Optional object with:
  - `scroll`: Optional boolean, controls scrolling to the top after navigation. Defaults to `true`.
  - `shallow`: Update the path without rerunning `getStaticProps`, `getServerSideProps`, or `getInitialProps`. Defaults to `false`.
  - `locale`: Optional string, indicates locale of the new page.

Example for navigating to `pages/about.js`:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/about')}>
      Click me
    </button>
  )
}
```

Example for navigating to a dynamic route `pages/post/[pid].js`:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/post/abc')}>
      Click me
    </button>
  )
}
```

Example for redirecting to `pages/login.js`:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }
  }, [user, loading])

  return <p>Redirecting...</p>
}
```

#### Resetting state after navigation

When navigating to the same page, the page's state will not reset by default. To reset state, use `useEffect` or a React `key` to remount the component.

Example using `useEffect`:

```jsx
useEffect(() => {
  setCount(0)
}, [router.query.slug])
```

Example using a React `key`:

```jsx
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return <Component key={router.asPath} {...pageProps} />
}
```

#### With URL object

You can use a URL object for `url` and `as` parameters:

```jsx
import { useRouter } from 'next/router'

export default function ReadMore({ post }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        router.push({
          pathname: '/post/[pid]',
          query: { pid: post.id },
        })
      }}
    >
      Click here to read more
    </button>
  )
}
```

### router.replace

Similar to `replace` in `next/link`, `router.replace` prevents adding a new URL entry into the history stack.

```js
router.replace(url, as, options)
```

Example:

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.replace('/home')}>
      Click me
    </button>
  )
}
```

### router.prefetch

Prefetch pages for faster client-side transitions. This method is useful for navigations without `next/link`.

```js
router.prefetch(url, as, options)
```

Example for prefetching a dashboard page after login:

```jsx
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      if (res.ok) router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    router.prefetch('/dashboard')
  }, [router])

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  )
}
```

### router.beforePopState

Listen to popstate events and perform actions before the router acts on it.

```js
router.beforePopState(cb)
```

Example:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      if (as !== '/' && as !== '/other') {
        window.location.href = as
        return false
      }
      return true
    })
  }, [router])

  return <p>Welcome to the page</p>
}
```

### router.back

Navigate back in history.

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
  )
}
```

### router.reload

Reload the current URL.

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.reload()}>
      Click here to reload
    </button>
  )
}
```

### router.events

Listen to different events in the Next.js Router:

- `routeChangeStart(url, { shallow })`
- `routeChangeComplete(url, { shallow })`
- `routeChangeError(err, url, { shallow })`
- `beforeHistoryChange(url, { shallow })`
- `hashChangeStart(url, { shallow })`
- `hashChangeComplete(url, { shallow })`

Example for listening to `routeChangeStart`:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return <Component {...pageProps} />
}
```

### The `next/compat/router` export

This is the same `useRouter` hook but can be used in both `app` and `pages` directories. It does not throw an error when the pages router is not mounted, returning `NextRouter | null`.

Example:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/compat/router'
import { useSearchParams } from 'next/navigation'

const MyComponent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (router && !router.isReady) {
      return
    }
    const search = searchParams.get('search')
    // ...
  }, [router, searchParams])
}
```

### Using `useRouter` outside of Next.js context in pages

Use the compat router to avoid errors when rendering components outside of a Next.js application context.

Example:

```jsx
import { renderToString } from 'react-dom/server'
import { useRouter } from 'next/compat/router'

const MyComponent = () => {
  const router = useRouter()
  // ...
}

export async function getServerSideProps() {
  const renderedComponent = renderToString(<MyComponent />)
  return {
    props: {
      renderedComponent,
    },
  }
}
```

### Potential ESLint errors

Certain methods return a Promise. If you have the ESLint rule `no-floating-promises` enabled, consider disabling it or handling the promise properly.

Affected methods:

- `router.push`
- `router.replace`
- `router.prefetch`

Example solutions:

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    // eslint-disable-next-line no-floating-promises
    router.push('/login')

    if (!(user || loading)) {
      void router.push('/login')
    }
    async function handleRouteChange() {
      if (!(user || loading)) {
        await router.push('/login')
      }
    }
    void handleRouteChange()
  }, [user, loading])

  return <p>Redirecting...</p>
}
```

### withRouter

If `useRouter` is not suitable, `withRouter` can add the same `router` object to any component.

Example:

```jsx
import { withRouter } from 'next/router'

function Page({ router }) {
  return <p>{router.pathname}</p>
}

export default withRouter(Page)
```

### TypeScript

For class components with `withRouter`, the component needs to accept a router prop:

```tsx
import React from 'react'
import { withRouter, NextRouter } from 'next/router'

interface WithRouterProps {
  router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <p>{this.props.router.pathname}</p>
  }
}

export default withRouter(MyComponent)
```