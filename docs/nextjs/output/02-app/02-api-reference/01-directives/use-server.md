# Use Server

Learn how to use the `use server` directive to execute code on the server.

The `use server` directive designates a function or file to be executed on the server side. It can be used at the top of a file to indicate that all functions in the file are server-side, or inline at the top of a function to mark the function as a Server Function. This is a React feature.

## Using `use server` at the top of a file

The following example shows a file with a `use server` directive at the top. All functions in the file are executed on the server.

```tsx
'use server'
import { db } from '@/lib/db' // Your database client

export async function createUser(data: { name: string; email: string }) {
  const user = await db.user.create({ data })
  return user
}
```

```jsx
'use server'
import { db } from '@/lib/db' // Your database client

export async function createUser(data) {
  const user = await db.user.create({ data })
  return user
}
```

### Using Server Functions in a Client Component

To use Server Functions in Client Components, create your Server Functions in a dedicated file using the `use server` directive at the top of the file. These Server Functions can then be imported into Client and Server Components and executed.

Assuming you have a `fetchUsers` Server Function in `actions.ts`:

```tsx
'use server'
import { db } from '@/lib/db' // Your database client

export async function fetchUsers() {
  const users = await db.user.findMany()
  return users
}
```

```jsx
'use server'
import { db } from '@/lib/db' // Your database client

export async function fetchUsers() {
  const users = await db.user.findMany()
  return users
}
```

Then you can import the `fetchUsers` Server Function into a Client Component and execute it on the client-side.

```tsx
'use client'
import { fetchUsers } from '../actions'

export default function MyButton() {
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

```jsx
'use client'
import { fetchUsers } from '../actions'

export default function MyButton() {
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

## Using `use server` inline

In the following example, `use server` is used inline at the top of a function to mark it as a Server Function:

```tsx
import { db } from '@/lib/db' // Your database client

export default function UserList() {
  async function fetchUsers() {
    'use server'
    const users = await db.user.findMany()
    return users
  }

  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

```jsx
import { db } from '@/lib/db' // Your database client

export default function UserList() {
  async function fetchUsers() {
    'use server'
    const users = await db.user.findMany()
    return users
  }

  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

## Security considerations

When using the `use server` directive, ensure that all server-side logic is secure and that sensitive data remains protected.

### Authentication and authorization

Always authenticate and authorize users before performing sensitive server-side operations.

```tsx
'use server'

import { db } from '@/lib/db' // Your database client
import { authenticate } from '@/lib/auth' // Your authentication library

export async function createUser(
  data: { name: string; email: string },
  token: string
) {
  const user = authenticate(token)
  if (!user) {
    throw new Error('Unauthorized')
  }
  const newUser = await db.user.create({ data })
  return newUser
}
```

```jsx
'use server'

import { db } from '@/lib/db' // Your database client
import { authenticate } from '@/lib/auth' // Your authentication library

export async function createUser(data, token) {
  const user = authenticate(token)
  if (!user) {
    throw new Error('Unauthorized')
  }
  const newUser = await db.user.create({ data })
  return newUser
}
```

## Reference

See the React documentation for more information on `use server`.