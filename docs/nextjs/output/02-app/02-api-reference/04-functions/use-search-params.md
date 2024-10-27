# useSearchParams

`useSearchParams` is a **Client Component** hook that allows reading the current URL's **query string**.

`useSearchParams` returns a **read-only** version of the `URLSearchParams` interface.

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  return <>Search: {search}</>
}
```

```jsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  return <>Search: {search}</>
}
```

## Parameters

`useSearchParams` does not take any parameters.

## Returns

`useSearchParams` returns a **read-only** version of the `URLSearchParams` interface, which includes utility methods for reading the URL's query string:

- `URLSearchParams.get()`: Returns the first value associated with the search parameter. For example:

  | URL                  | `searchParams.get("a")`                                                                                         |
  | -------------------- | --------------------------------------------------------------------------------------------------------------- |
  | `/dashboard?a=1`     | `'1'`                                                                                                           |
  | `/dashboard?a=`      | `''`                                                                                                            |
  | `/dashboard?b=3`     | `null`                                                                                                          |
  | `/dashboard?a=1&a=2` | `'1'` _- use `getAll()` to get all values_ |

- `URLSearchParams.has()`: Returns a boolean value indicating if the given parameter exists. For example:

  | URL              | `searchParams.has("a")` |
  | ---------------- | ----------------------- |
  | `/dashboard?a=1` | `true`                  |
  | `/dashboard?b=3` | `false`                 |

- Learn more about other **read-only** methods of `URLSearchParams`, including `getAll()`, `keys()`, `values()`, `entries()`, `forEach()`, and `toString()`.

> **Good to know**:
>
> - `useSearchParams` is a Client Component hook and is **not supported** in Server Components to prevent stale values during partial rendering.
> - If an application includes the `/pages` directory, `useSearchParams` will return `ReadonlyURLSearchParams | null`. The `null` value is for compatibility during migration since search params cannot be known during pre-rendering of a page that doesn't use `getServerSideProps`.

## Behavior

### Static Rendering

If a route is statically rendered, calling `useSearchParams` will cause the Client Component tree up to the closest `Suspense` boundary to be client-side rendered. This allows a part of the route to be statically rendered while the dynamic part that uses `useSearchParams` is client-side rendered.

Wrap the Client Component that uses `useSearchParams` in a `<Suspense/>` boundary to allow any Client Components above it to be statically rendered and sent as part of initial HTML.

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  console.log(search)
  return <>Search: {search}</>
}
```

```jsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  console.log(search)
  return <>Search: {search}</>
}
```

```tsx
import { Suspense } from 'react'
import SearchBar from './search-bar'

function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

```jsx
import { Suspense } from 'react'
import SearchBar from './search-bar'

function SearchBarFallback() {
  return <>placeholder</>
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

### Dynamic Rendering

If a route is dynamically rendered, `useSearchParams` will be available on the server during the initial server render of the Client Component.

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  console.log(search)
  return <>Search: {search}</>
}
```

```jsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  console.log(search)
  return <>Search: {search}</>
}
```

```tsx
import SearchBar from './search-bar'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

```jsx
import SearchBar from './search-bar'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <nav>
        <SearchBar />
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}
```

> **Good to know**: Setting the `dynamic` route segment config option to `force-dynamic` can be used to force dynamic rendering.

### Server Components

#### Pages

To access search params in Pages (Server Components), use the `searchParams` prop.

#### Layouts

Layouts (Server Components) do not receive the `searchParams` prop because a shared layout is not re-rendered during navigation, which could lead to stale `searchParams` between navigations. Instead, use the Page `searchParams` prop or the `useSearchParams` hook in a Client Component, which is re-rendered on the client with the latest `searchParams`.

## Examples

### Updating `searchParams`

You can use `useRouter` or `Link` to set new `searchParams`. After a navigation is performed, the current page will receive an updated `searchParams` prop.

```tsx
'use client'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>
      <button
        onClick={() => {
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>
      <Link
        href={pathname + '?' + createQueryString('sort', 'desc')}
      >
        DESC
      </Link>
    </>
  )
}
```

```jsx
'use client'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>
      <button
        onClick={() => {
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>
      <Link
        href={pathname + '?' + createQueryString('sort', 'desc')}
      >
        DESC
      </Link>
    </>
  )
}
```

## Version History

| Version   | Changes                       |
| --------- | ----------------------------- |
| `v13.0.0` | `useSearchParams` introduced. |