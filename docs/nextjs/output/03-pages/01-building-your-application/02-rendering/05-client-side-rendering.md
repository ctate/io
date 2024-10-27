# Client-side Rendering (CSR)

Learn how to implement client-side rendering in the Pages Router.

In Client-Side Rendering (CSR) with React, the browser downloads a minimal HTML page and the JavaScript needed for the page. The JavaScript updates the DOM and renders the page. Initially, users may notice a slight delay before seeing the full page, as it isn't fully rendered until all JavaScript is downloaded, parsed, and executed.

After the initial load, navigating to other pages is typically faster, as only necessary data needs to be fetched, allowing JavaScript to re-render parts of the page without a full refresh.

In Next.js, you can implement client-side rendering in two ways:

1. Using React's `useEffect()` hook inside your pages instead of server-side rendering methods.
2. Using a data fetching library like SWR or TanStack Query to fetch data on the client (recommended).

### Example using `useEffect()`

```jsx
import React, { useState, useEffect } from 'react'

export function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    }

    fetchData().catch((e) => {
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])

  return <p>{data ? `Your data: ${data}` : 'Loading...'}</p>
}
```

In this example, the component starts by rendering `Loading...`. Once the data is fetched, it re-renders to display the data.

Although fetching data in `useEffect` is common in older React applications, using a data-fetching library is recommended for better performance, caching, and optimistic updates. Here's a minimum example using SWR:

### Example using SWR

```jsx
import useSWR from 'swr'

export function Page() {
  const { data, error, isLoading } = useSWR(
    'https://api.example.com/data',
    fetcher
  )

  if (error) return <p>Failed to load.</p>
  if (isLoading) return <p>Loading...</p>

  return <p>Your Data: {data}</p>
}
```

**Good to know**: CSR can impact SEO, as some search engine crawlers might not execute JavaScript and only see the initial empty or loading state. It may also lead to performance issues for users with slower internet connections or devices, as they must wait for all JavaScript to load and run before seeing the full page. Next.js promotes a hybrid approach, allowing a combination of server-side rendering, static site generation, and client-side rendering based on the needs of each page. In the App Router, you can also use Loading UI with Suspense to show a loading indicator while the page is being rendered.