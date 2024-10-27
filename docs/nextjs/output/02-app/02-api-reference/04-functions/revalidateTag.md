# revalidateTag

API Reference for the revalidateTag function.

`revalidateTag` allows you to purge cached data on-demand for a specific cache tag.

**Good to know**:
- `revalidateTag` is available in both Node.js and Edge runtimes.
- `revalidateTag` only invalidates the cache when the path is next visited. Calling `revalidateTag` with a dynamic route segment will not immediately trigger many revalidations at once. The invalidation only happens when the path is next visited.

## Parameters

```tsx
revalidateTag(tag: string): void;
```

- `tag`: A string representing the cache tag associated with the data you want to revalidate. Must be less than or equal to 256 characters. This value is case-sensitive.

You can add tags to `fetch` as follows:

```tsx
fetch(url, { next: { tags: [...] } });
```

## Returns

`revalidateTag` does not return a value.

## Examples

### Server Action

```ts
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

```js
'use server'

import { revalidateTag } from 'next/cache'

export default async function submit() {
  await addPost()
  revalidateTag('posts')
}
```

### Route Handler

```ts
import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

```js
import { revalidateTag } from 'next/cache'

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now() })
}
```