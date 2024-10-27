# getServerSideProps

API reference for `getServerSideProps`. Learn how to fetch data on each request with Next.js.

When exporting a function called `getServerSideProps` (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by `getServerSideProps`. This is useful for fetching frequently changing data and updating the page to show the most current information.

```tsx
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Repo = {
  name: string
  stargazers_count: number
}

export const getServerSideProps = (async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo: Repo = await res.json()
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}
```

```jsx
export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}

export default function Page({ repo }) {
  return (
    <main>
      <p>{repo.stargazers_count}</p>
    </main>
  )
}
```

You can import modules in top-level scope for use in `getServerSideProps`. Imports used will not be bundled for the client-side, allowing you to write server-side code directly in `getServerSideProps`, including fetching data from your database.

## Context parameter

The `context` parameter is an object containing the following keys:

- `params`: Contains route parameters for dynamic routes.
- `req`: The HTTP IncomingMessage object, with an additional `cookies` prop.
- `res`: The HTTP response object.
- `query`: An object representing the query string, including dynamic route parameters.
- `preview`: (Deprecated for `draftMode`) Indicates if the page is in Preview Mode.
- `previewData`: (Deprecated for `draftMode`) The preview data set by `setPreviewData`.
- `draftMode`: Indicates if the page is in Draft Mode.
- `resolvedUrl`: A normalized version of the request URL.
- `locale`: Contains the active locale (if enabled).
- `locales`: Contains all supported locales (if enabled).
- `defaultLocale`: Contains the configured default locale (if enabled).

## getServerSideProps return values

The `getServerSideProps` function should return an object with any one of the following properties:

### `props`

The `props` object is a key-value pair, where each value is received by the page component. It should be a serializable object.

```jsx
export async function getServerSideProps(context) {
  return {
    props: { message: `Next.js is awesome` },
  }
}
```

### `notFound`

The `notFound` boolean allows the page to return a 404 status. With `notFound: true`, the page will return a 404 even if there was a successfully generated page before.

```js
export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}
```

### `redirect`

The `redirect` object allows redirecting to internal and external resources. It should match the shape of `{ destination: string, permanent: boolean }`.

```js
export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
```

## Version History

- `v13.4.0`: App Router is now stable with simplified data fetching.
- `v10.0.0`: `locale`, `locales`, `defaultLocale`, and `notFound` options added.
- `v9.3.0`: `getServerSideProps` introduced.