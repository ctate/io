# redirect

## Description
API Reference for the redirect function.

The `redirect` function allows you to redirect the user to another URL. It can be used in Server Components, Route Handlers, and Server Actions.

When used in a streaming context, it inserts a meta tag to emit the redirect on the client side. In a server action, it serves a 303 HTTP redirect response. Otherwise, it serves a 307 HTTP redirect response.

If a resource doesn't exist, use the `notFound` function instead.

**Good to know**:
- In Server Actions and Route Handlers, `redirect` should be called after the `try/catch` block.
- To return a 308 (Permanent) HTTP redirect instead of 307 (Temporary), use the `permanentRedirect` function.

## Parameters
The `redirect` function accepts two arguments:

```js
redirect(path, type)
```

| Parameter | Type                                                          | Description                                                 |
| --------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `path`    | `string`                                                      | The URL to redirect to. Can be a relative or absolute path. |
| `type`    | `'replace'` (default) or `'push'` (default in Server Actions) | The type of redirect to perform.                            |

By default, `redirect` uses `push` in Server Actions and `replace` elsewhere. You can override this behavior by specifying the `type` parameter. The `type` parameter has no effect in Server Components.

## Returns
`redirect` does not return a value.

## Example

### Server Component
Invoking the `redirect()` function throws a `NEXT_REDIRECT` error and terminates rendering of the route segment in which it was thrown.

```jsx
import { redirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }

  // ...
}
```

**Good to know**: `redirect` does not require you to use `return redirect()` as it uses the TypeScript `never` type.

### Client Component
`redirect` can be used in a Client Component through a Server Action. Use the `useRouter` hook for event handlers.

```tsx
'use client'

import { navigate } from './actions'

export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>Submit</button>
    </form>
  )
}
```

```jsx
'use client'

import { navigate } from './actions'

export function ClientRedirect() {
  return (
    <form action={navigate}>
      <input type="text" name="id" />
      <button>Submit</button>
    </form>
  )
}
```

```ts
'use server'

import { redirect } from 'next/navigation'

export async function navigate(data: FormData) {
  redirect(`/posts/${data.get('id')}`)
}
```

```js
'use server'

import { redirect } from 'next/navigation'

export async function navigate(data) {
  redirect(`/posts/${data.get('id')}`)
}
```

## FAQ

### Why does `redirect` use 307 and 308?
`redirect()` uses `307` for a temporary redirect and `308` for a permanent redirect. Traditionally, `302` was used for temporary redirects, but many browsers changed the request method from `POST` to `GET` when using `302`, which is not ideal for operations like creating a new user.

The `307` status code preserves the request method as `POST`, ensuring that requests remain consistent.

- `302` - Temporary redirect, changes request method from `POST` to `GET`
- `307` - Temporary redirect, preserves request method as `POST`

The `redirect()` method uses a `307` by default, ensuring requests are preserved as `POST`.

## Version History

| Version   | Changes                |
| --------- | ---------------------- |
| `v13.0.0` | `redirect` introduced. |