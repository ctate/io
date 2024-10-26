# Redirecting
There are a few ways you can handle redirects in Next.js. This page will go through each available option, use cases, and how to manage large numbers of redirects.

## Available Redirect Options

| API | Purpose | Where | Status Code |
| --- | --- | --- | --- |
| `redirect` | Redirect user after a mutation or event | Server Components, Server Actions, Route Handlers | 307 (Temporary) or 303 (Server Action) |
| `permanentRedirect` | Redirect user after a mutation or event | Server Components, Server Actions, Route Handlers | 308 (Permanent) |
| `useRouter` | Perform a client-side navigation | Event Handlers in Client Components | N/A |
| `redirects` in `next.config.js` | Redirect an incoming request based on a path | `next.config.js` file | 307 (Temporary) or 308 (Permanent) |
| `NextResponse.redirect` | Redirect an incoming request based on a condition | Middleware | Any |

## `redirect` Function

The `redirect` function allows you to redirect the user to another URL. You can call `redirect` in Server Components, Route Handlers, and Server Actions.

```tsx
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(id: string) {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }

  revalidatePath('/posts') // Update cached posts
  redirect(`/post/${id}`) // Navigate to the new post page
}
```

### Good to Know

* `redirect` returns a 307 (Temporary Redirect) status code by default. When used in a Server Action, it returns a 303 (See Other), which is commonly used for redirecting to a success page as a result of a POST request.
* `redirect` internally throws an error so it should be called outside of `try/catch` blocks.
* `redirect` can be called in Client Components during the rendering process but not in event handlers. You can use the `useRouter` hook instead.
* `redirect` also accepts absolute URLs and can be used to redirect to external links.
* If you'd like to redirect before the render process, use `next.config.js` or Middleware.

## `permanentRedirect` Function

The `permanentRedirect` function allows you to permanently redirect the user to another URL. You can call `permanentRedirect` in Server Components, Route Handlers, and Server Actions.

```tsx
import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export async function updateUsername(username: string, formData: FormData) {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }

  revalidateTag('username') // Update all references to the username
  permanentRedirect(`/profile/${username}`) // Navigate to the new user profile
}
```

### Good to Know

* `permanentRedirect` returns a 308 (permanent redirect) status code by default.
* `permanentRedirect` also accepts absolute URLs and can be used to redirect to external links.
* If you'd like to redirect before the render process, use `next.config.js` or Middleware.

## `useRouter` Hook

If you need to redirect inside an event handler in a Client Component, you can use the `push` method from the `useRouter` hook.

```tsx
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

### Good to Know

* If you don't need to programmatically navigate a user, you should use a `<Link>` component.

## `redirects` in `next.config.js`

The `redirects` option in the `next.config.js` file allows you to redirect an incoming request path to a different destination path.

```js
module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // Wildcard path matching
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
    ]
  },
}
```

### Good to Know

* `redirects` can return a 307 (Temporary Redirect) or 308 (Permanent Redirect) status code with the `permanent` option.
* `redirects` may have a limit on platforms. For example, on Vercel, there's a limit of 1,024 redirects. To manage a large number of redirects (1000+), consider creating a custom solution using Middleware.
* `redirects` runs before Middleware.

## `NextResponse.redirect` in Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, redirect to a different URL using `NextResponse.redirect`.

```tsx
import { NextResponse, NextRequest } from 'next/server'
import { authenticate } from 'auth-provider'

export function middleware(request: NextRequest) {
  const isAuthenticated = authenticate(request)

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/login', request.url))
}
```

### Good to Know

* Middleware runs after `redirects` in `next.config.js` and before rendering.

## Managing Redirects at Scale (Advanced)

To manage a large number of redirects (1000+), you may consider creating a custom solution using Middleware. This allows you to handle redirects programmatically without having to redeploy your application.

### 1. Creating and Storing a Redirect Map

A redirect map is a list of redirects that you can store in a database or JSON file.

```json
{
  "/old": {
    "destination": "/new",
    "permanent": true
  },
  "/blog/post-old": {
    "destination": "/blog/post-new",
    "permanent": true
  }
}
```

### 2. Optimizing Data Lookup Performance

Reading a large dataset for every incoming request can be slow and expensive. There are two ways you can optimize data lookup performance:

* Use a database that is optimized for fast reads, such as Vercel Edge Config or Redis.
* Use a data lookup strategy such as a Bloom filter to efficiently check if a redirect exists before reading the larger redirects file or database.

### Example Implementation

```tsx
import { NextResponse, NextRequest } from 'next/server'
import { ScalableBloomFilter } from 'bloom-filters'
import GeneratedBloomFilter from './redirects/bloom-filter.json'

// Initialize bloom filter from a generated JSON file
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)

export async function middleware(request: NextRequest) {
  // Get the path for the incoming request
  const pathname = request.nextUrl.pathname

  // Check if the path is in the bloom filter
  if (bloomFilter.has(pathname)) {
    // Forward the pathname to the Route Handler
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin
    )

    try {
      // Fetch redirect data from the Route Handler
      const redirectData = await fetch(api)

      if (redirectData.ok) {
        const redirectEntry = await redirectData.json()

        if (redirectEntry) {
          // Determine the status code
          const statusCode = redirectEntry.permanent ? 308 : 307

          // Redirect to the destination
          return NextResponse.redirect(redirectEntry.destination, statusCode)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  // No redirect found, continue the request without redirecting
  return NextResponse.next()
}
```

### Good to Know

* To generate a bloom filter, you can use a library like `bloom-filters`.
* You should validate requests made to your Route Handler to prevent malicious requests.