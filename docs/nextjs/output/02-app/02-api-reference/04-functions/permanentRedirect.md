# permanentRedirect

## Description
The `permanentRedirect` function allows you to redirect the user to another URL. It can be used in Server Components, Client Components, Route Handlers, and Server Actions.

When used in a streaming context, it inserts a meta tag to emit the redirect on the client side. In a server action, it serves a 303 HTTP redirect response. Otherwise, it serves a 308 (Permanent) HTTP redirect response.

If a resource doesn't exist, use the `notFound` function instead.

**Note**: To return a 307 (Temporary) HTTP redirect instead of 308 (Permanent), use the `redirect` function.

## Parameters
The `permanentRedirect` function accepts two arguments:

```js
permanentRedirect(path, type)
```

| Parameter | Type                                                          | Description                                                 |
| --------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `path`    | `string`                                                      | The URL to redirect to. Can be a relative or absolute path. |
| `type`    | `'replace'` (default) or `'push'` (default in Server Actions) | The type of redirect to perform.                            |

By default, `permanentRedirect` uses `push` in Server Actions and `replace` elsewhere. You can override this behavior by specifying the `type` parameter. The `type` parameter has no effect in Server Components.

## Returns
`permanentRedirect` does not return a value.

## Example
Invoking the `permanentRedirect()` function throws a `NEXT_REDIRECT` error and terminates rendering of the route segment in which it was thrown.

```jsx
import { permanentRedirect } from 'next/navigation'

async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}

export default async function Profile({ params }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    permanentRedirect('/login')
  }

  // ...
}
```

**Note**: `permanentRedirect` does not require you to use `return permanentRedirect()` as it uses the TypeScript `never` type.