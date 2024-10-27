# getStaticProps

API reference for `getStaticProps`. Learn how to use `getStaticProps` to generate static pages with Next.js.

Exporting a function called `getStaticProps` will pre-render a page at build time using the props returned from the function:

```tsx
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticProps = (async (context) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>

export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count
}
```

```jsx
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}

export default function Page({ repo }) {
  return repo.stargazers_count
}
```

You can import modules in top-level scope for use in `getStaticProps`. Imports used will not be bundled for the client-side. This means you can write server-side code directly in `getStaticProps`, including fetching data from your database.

## Context parameter

The `context` parameter is an object containing the following keys:

- `params`: Contains the route parameters for pages using dynamic routes. For example, if the page name is `[id].js`, then `params` will look like `{ id: ... }`. Use this with `getStaticPaths`.
- `preview`: (Deprecated for `draftMode`) `preview` is `true` if the page is in Preview Mode and `false` otherwise.
- `previewData`: (Deprecated for `draftMode`) The preview data set by `setPreviewData`.
- `draftMode`: `draftMode` is `true` if the page is in Draft Mode and `false` otherwise.
- `locale`: Contains the active locale (if enabled).
- `locales`: Contains all supported locales (if enabled).
- `defaultLocale`: Contains the configured default locale (if enabled).
- `revalidateReason`: Provides a reason for why the function was called. Possible values are "build", "stale", or "on-demand".

## getStaticProps return values

The `getStaticProps` function should return an object containing either `props`, `redirect`, or `notFound` followed by an optional `revalidate` property.

### `props`

The `props` object is a key-value pair, where each value is received by the page component. It should be a serializable object.

```jsx
export async function getStaticProps(context) {
  return {
    props: { message: `Next.js is awesome` },
  }
}
```

### `revalidate`

The `revalidate` property is the amount in seconds after which a page re-generation can occur (defaults to `false`).

```js
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}
```

The cache status of a page leveraging ISR can be determined by reading the value of the `x-nextjs-cache` response header. Possible values are:

- `MISS`: the path is not in the cache.
- `STALE`: the path is in the cache but exceeded the revalidate time.
- `HIT`: the path is in the cache and has not exceeded the revalidate time.

### `notFound`

The `notFound` boolean allows the page to return a `404` status. With `notFound: true`, the page will return a `404` even if there was a successfully generated page before.

```js
export async function getStaticProps(context) {
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

The `redirect` object allows redirecting to internal or external resources. It should match the shape of `{ destination: string, permanent: boolean }`.

```js
export async function getStaticProps(context) {
  const res = await fetch(`https://...`)
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
    props: { data },
  }
}
```

If the redirects are known at build-time, they should be added in next.config.js instead.

## Reading files: Use `process.cwd()`

Files can be read directly from the filesystem in `getStaticProps`. Use `process.cwd()` to get the directory where Next.js is being executed.

```jsx
import { promises as fs } from 'fs'
import path from 'path'

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>
          <h3>{post.filename}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = await fs.readFile(filePath, 'utf8')

    return {
      filename,
      content: fileContents,
    }
  })

  return {
    props: {
      posts: await Promise.all(posts),
    },
  }
}

export default Blog
```

## Version History

- `v13.4.0`: App Router is now stable with simplified data fetching.
- `v12.2.0`: On-Demand Incremental Static Regeneration is stable.
- `v12.1.0`: On-Demand Incremental Static Regeneration added (beta).
- `v10.0.0`: `locale`, `locales`, `defaultLocale`, and `notFound` options added.
- `v10.0.0`: `fallback: 'blocking'` return option added.
- `v9.5.0`: Stable Incremental Static Regeneration.
- `v9.3.0`: `getStaticProps` introduced.