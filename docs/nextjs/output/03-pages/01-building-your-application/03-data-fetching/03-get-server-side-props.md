# getServerSideProps

`getServerSideProps` is a Next.js function used to fetch data and render the contents of a page at request time.

## Example

You can use `getServerSideProps` by exporting it from a Page Component. The example below shows how to fetch data from a 3rd party API in `getServerSideProps` and pass the data to the page as props:

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

## When to Use `getServerSideProps`

Use `getServerSideProps` if you need to render a page that relies on personalized user data or information known only at request time, such as authorization headers or geolocation. If you do not need to fetch data at request time or prefer to cache data and pre-rendered HTML, consider using `getStaticProps`.

## Behavior

- Runs on the server.
- Can only be exported from a page.
- Returns JSON.
- Fetches data at request time to render the initial HTML of the page.
- Props passed to the page component are part of the initial HTML for hydration. Avoid passing sensitive information.
- When visiting the page through next/link or next/router, Next.js sends an API request to the server to run `getServerSideProps`.
- No need to call a Next.js API Route to fetch data; you can call a CMS, database, or third-party APIs directly.

**Good to know:**
- See the `getServerSideProps` API reference for parameters and props.
- Use the next-code-elimination tool to verify what Next.js eliminates from the client-side bundle.

## Error Handling

If an error occurs in `getServerSideProps`, it will show the `pages/500.js` file. During development, the development error overlay will be shown instead.

## Edge Cases

### Caching with Server-Side Rendering (SSR)

You can use caching headers (`Cache-Control`) inside `getServerSideProps` to cache dynamic responses. For example, using stale-while-revalidate.

```jsx
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
}
```

Before using `cache-control`, consider if `getStaticProps` with Incremental Static Regeneration (ISR) is a better fit for your use case.