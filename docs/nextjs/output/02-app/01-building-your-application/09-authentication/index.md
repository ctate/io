# Authentication

Understanding authentication is crucial for protecting your application's data. This guide covers how to implement authentication in your Next.js application.

## Key Concepts

1. **Authentication**: Verifies if the user is who they say they are, requiring proof of identity (e.g., username and password).
2. **Session Management**: Tracks the user's authentication state across requests.
3. **Authorization**: Determines what routes and data the user can access.

## Authentication Flow

The examples on this page demonstrate basic username and password authentication. For increased security and simplicity, consider using an authentication library that provides built-in solutions for authentication, session management, and authorization.

## Authentication

### Sign-up and Login Functionality

Use the `<form>` element with React's Server Actions and `useFormState` to capture user credentials, validate form fields, and call your Authentication Provider's API or database.

#### 1. Capture User Credentials

Create a form that invokes a Server Action on submission:

```tsx
import { signup } from '@/app/actions/auth'

export function SignupForm() {
  return (
    <form action={signup}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}
```

#### 2. Validate Form Fields on the Server

Use the Server Action to validate form fields. Consider using a schema validation library like Zod or Yup.

Example using Zod:

```ts
import { z } from 'zod'

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.' })
    .trim(),
})
```

#### 3. Create a User or Check User Credentials

After validating form fields, create a new user account or check if the user exists by calling your authentication provider's API or database.

Example:

```tsx
export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  }).returning({ id: users.id })

  const user = data[0]

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // Create user session and redirect user
}
```

### Session Management

Session management ensures that the user's authenticated state is preserved across requests. It involves creating, storing, refreshing, and deleting sessions or tokens.

#### Types of Sessions

1. **Stateless**: Session data is stored in the browser's cookies.
2. **Database**: Session data is stored in a database, with the user's browser receiving an encrypted session ID.

#### Stateless Sessions

To create and manage stateless sessions:

1. Generate a secret key for signing your session.
2. Write logic to encrypt/decrypt session data using a session management library.
3. Manage cookies using the Next.js cookies API.

Example of generating a secret key:

```bash
openssl rand -base64 32
```

Store it in your environment variables:

```bash
SESSION_SECRET=your_secret_key
```

Example of encrypting and decrypting sessions:

```ts
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
```

#### Database Sessions

To create and manage database sessions:

1. Create a table in your database to store session data.
2. Implement functionality to insert, update, and delete sessions.
3. Encrypt the session ID before storing it in the user's browser.

Example:

```ts
import { db } from '@/app/lib/db'

export async function createSession(id) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const data = await db.insert(sessions).values({
    userId: id,
    expiresAt,
  }).returning({ id: sessions.id })

  const sessionId = data[0].id
  const session = await encrypt({ sessionId, expiresAt })

  const cookieStore = await cookies()
  cookieStore().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
```

## Authorization

Once a user is authenticated and a session is created, implement authorization to control what the user can access and do within your application.

### Optimistic Checks with Middleware

Use Middleware to perform optimistic checks and redirect users based on permissions:

```tsx
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}
```

### Creating a Data Access Layer (DAL)

Centralize your data requests and authorization logic in a DAL. Use a function that verifies the user's session as they interact with your application.

Example:

```ts
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
})
```

### Using Data Transfer Objects (DTO)

Return only the necessary data that will be used in your application, avoiding exposure of sensitive information.

Example:

```ts
export async function getProfileDTO(slug) {
  const data = await db.query.users.findMany({
    where: eq(users.slug, slug),
  })
  const user = data[0]

  return {
    username: user.username,
    phonenumber: user.phonenumber,
  }
}
```

## Resources

### Auth Libraries

- Auth0
- Clerk
- Kinde
- NextAuth.js
- Stack Auth
- Supabase
- Stytch
- WorkOS

### Session Management Libraries

- Iron Session
- Jose

### Further Reading

- How to think about security in Next.js
- Understanding XSS Attacks
- Understanding CSRF Attacks
- The Copenhagen Book