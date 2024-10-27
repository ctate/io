# getStaticPaths

## Overview

When exporting a function called `getStaticPaths` from a page that uses Dynamic Routes, Next.js will statically pre-render all the paths specified by `getStaticPaths`.

### Example in TypeScript

```tsx
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

type Repo = {
  name: string
  stargazers_count: number
}

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          name: 'next.js',
        },
      },
    ],
    fallback: true,
  }
}) satisfies GetStaticPaths

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

### Example in JavaScript

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          name: 'next.js',
        },
      },
    ],
    fallback: true,
  }
}

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}

export default function Page({ repo }) {
  return repo.stargazers_count
}
```

## getStaticPaths Return Values

The `getStaticPaths` function should return an object with the following required properties:

### `paths`

The `paths` key determines which paths will be pre-rendered. For example, if you have a page named `pages/posts/[id].js`, and you return the following for `paths`:

```js
return {
  paths: [
    { params: { id: '1' }},
    {
      params: { id: '2' },
      locale: "en",
    },
  ],
  fallback: ...
}
```

Next.js will statically generate `/posts/1` and `/posts/2` during `next build`.

The value for each `params` object must match the parameters used in the page name. The `params` strings are case-sensitive.

### `fallback: false`

If `fallback` is `false`, any paths not returned by `getStaticPaths` will result in a 404 page. This option is useful for a small number of paths.

### `fallback: true`

If `fallback` is `true`, the behavior of `getStaticProps` changes:

- Paths returned from `getStaticPaths` will be rendered to HTML at build time.
- Paths not generated at build time will not result in a 404 page. Instead, Next.js will serve a fallback version of the page on the first request.
- In the background, Next.js will statically generate the requested path HTML and JSON.

### `fallback: 'blocking'`

If `fallback` is `'blocking'`, new paths not returned by `getStaticPaths` will wait for the HTML to be generated. The behavior is similar to SSR.

### Fallback Pages

In the fallback version of a page:

- The page’s props will be empty.
- You can detect if the fallback is being rendered using `router.isFallback`.

### Example of Fallback Usage

```jsx
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  return {
    props: { post },
    revalidate: 1,
  }
}

export default Post
```

## Version History

| Version   | Changes                                                                                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v13.4.0` | App Router is now stable with simplified data fetching, including `generateStaticParams()`.                                                                                                               |
| `v12.2.0` | On-Demand Incremental Static Regeneration is stable.                                                                                                                                                       |
| `v12.1.0` | On-Demand Incremental Static Regeneration added (beta).                                                                                                                                                    |
| `v9.5.0`  | Stable Incremental Static Regeneration.                                                                                                                                                                    |
| `v9.3.0`  | `getStaticPaths` introduced.                                                                                                                                                                              |