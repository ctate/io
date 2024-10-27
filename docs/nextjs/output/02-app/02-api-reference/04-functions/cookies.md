# Cookies

`cookies` is an **async** function that allows you to read the HTTP incoming request cookies in Server Components, and read/write outgoing request cookies in Server Actions or Route Handlers.

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```js
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

## Reference

### Methods

- `get('name')`: Returns an object with the name and value of the specified cookie.
- `getAll()`: Returns a list of all cookies with a matching name.
- `has('name')`: Returns a boolean indicating if the specified cookie exists.
- `set(name, value, options)`: Sets the outgoing request cookie.
- `delete(name)`: Deletes the specified cookie.
- `clear()`: Deletes all cookies.
- `toString()`: Returns a string representation of the cookies.

### Options

When setting a cookie, the following properties from the `options` object are supported:

- `name`: Specifies the name of the cookie.
- `value`: Specifies the value to be stored in the cookie.
- `expires`: Defines the exact date when the cookie will expire.
- `maxAge`: Sets the cookie’s lifespan in seconds.
- `domain`: Specifies the domain where the cookie is available.
- `path`: Limits the cookie's scope to a specific path within the domain.
- `secure`: Ensures the cookie is sent only over HTTPS connections.
- `httpOnly`: Restricts the cookie to HTTP requests, preventing client-side access.
- `sameSite`: Controls the cookie's cross-site request behavior.
- `priority`: Specifies the cookie's priority.
- `encode('value')`: Specifies a function to encode a cookie's value.
- `partitioned`: Indicates whether the cookie is partitioned.

## Good to know

- `cookies` is an **asynchronous** function that returns a promise. Use `async/await` or React's `use` function to access cookies.
- In version 14 and earlier, `cookies` was synchronous. It can still be accessed synchronously in Next.js 15, but this behavior will be deprecated.
- `cookies` is a Dynamic API whose returned values cannot be known ahead of time. Using it in a layout or page opts a route into dynamic rendering.
- The `.delete` method can only be called in a Server Action or Route Handler, and must belong to the same domain and protocol as the cookie you want to delete.
- HTTP does not allow setting cookies after streaming starts, so use `.set` in a Server Action or Route Handler.

## Examples

### Getting a cookie

Use the `cookies().get('name')` method to get a single cookie:

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

```jsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

### Getting all cookies

Use the `cookies().getAll()` method to get all cookies with a matching name. If `name` is unspecified, it returns all available cookies.

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

```jsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>Name: {cookie.name}</p>
      <p>Value: {cookie.value}</p>
    </div>
  ))
}
```

### Setting a cookie

Use the `cookies().set(name, value, options)` method in a Server Action or Route Handler to set a cookie. The `options` object is optional.

```tsx
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // or
  cookieStore.set('name', 'lee', { secure: true })
  // or
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/',
  })
}
```

```js
'use server'

import { cookies } from 'next/headers'

export async function create(data) {
  const cookieStore = await cookies()

  cookieStore.set('name', 'lee')
  // or
  cookieStore.set('name', 'lee', { secure: true })
  // or
  cookieStore.set({
    name: 'name',
    value: 'lee',
    httpOnly: true,
    path: '/',
  })
}
```

### Checking if a cookie exists

Use the `cookies().has(name)` method to check if a cookie exists:

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

```jsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  return '...'
}
```

### Deleting cookies

There are three ways to delete a cookie.

Using the `delete()` method:

```tsx
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).delete('name')
}
```

```js
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).delete('name')
}
```

Setting a new cookie with the same name and an empty value:

```tsx
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', '')
}
```

```js
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', '')
}
```

Setting the `maxAge` to 0 will immediately expire a cookie. `maxAge` accepts a value in seconds.

```tsx
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', 'value', { maxAge: 0 })
}
```

```js
'use server'

import { cookies } from 'next/headers'

export async function delete(data) {
  (await cookies()).set('name', 'value', { maxAge: 0 })
}
```

## Version History

- `v15.0.0-RC`: `cookies` is now an async function. A codemod is available.
- `v13.0.0`: `cookies` introduced.