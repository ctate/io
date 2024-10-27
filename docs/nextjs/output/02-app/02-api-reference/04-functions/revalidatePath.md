# revalidatePath

`revalidatePath` allows you to purge cached data on-demand for a specific path.

**Good to know**:
- `revalidatePath` is available in both Node.js and Edge runtimes.
- It only invalidates the cache when the included path is next visited. Calling `revalidatePath` with a dynamic route segment will not trigger immediate revalidations.
- Currently, it invalidates all routes in the client-side Router Cache. This behavior will be updated to apply only to the specific path in the future.
- It invalidates only the specific path in the server-side Route Cache.

## Parameters

```tsx
revalidatePath(path: string, type?: 'page' | 'layout'): void;
```

- `path`: A string representing the filesystem path associated with the data to revalidate (e.g., `/product/[slug]/page`) or the literal route segment (e.g., `/product/123`). Must be less than 1024 characters and is case-sensitive.
- `type`: (optional) `'page'` or `'layout'` to specify the type of path to revalidate. Required if `path` contains a dynamic segment.

## Returns

`revalidatePath` does not return a value.

## Examples

### Revalidating A Specific URL

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')
```

### Revalidating A Page Path

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')
// or with route groups
revalidatePath('/(main)/blog/[slug]', 'page')
```

### Revalidating A Layout Path

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'layout')
// or with route groups
revalidatePath('/(main)/post/[slug]', 'layout')
```

### Revalidating All Data

```ts
import { revalidatePath } from 'next/cache'
revalidatePath('/', 'layout')
```

### Server Action

```ts filename="app/actions.ts"
'use server'

import { revalidatePath } from 'next/cache'

export default async function submit() {
  await submitForm()
  revalidatePath('/')
}
```

### Route Handler

```ts filename="app/api/revalidate/route.ts"
import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
```

```js filename="app/api/revalidate/route.js"
import { revalidatePath } from 'next/cache'

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}
```