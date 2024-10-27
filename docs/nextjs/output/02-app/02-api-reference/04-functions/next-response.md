# NextResponse

API Reference for NextResponse.

NextResponse extends the Web Response API with additional convenience methods.

## cookies

Read or mutate the Set-Cookie header of the response.

### set(name, value)

Set a cookie with the given value on the response.

```ts
let response = NextResponse.next()
response.cookies.set('show-banner', 'false')
return response
```

### get(name)

Return the value of the cookie by name. Returns `undefined` if not found.

```ts
let response = NextResponse.next()
response.cookies.get('show-banner')
```

### getAll()

Return all cookies on the response or values of a specific cookie.

```ts
let response = NextResponse.next()
response.cookies.getAll('experiments')
response.cookies.getAll()
```

### delete(name)

Delete the cookie from the response.

```ts
let response = NextResponse.next()
response.cookies.delete('experiments')
```

## json()

Produce a response with the given JSON body.

```ts
import { NextResponse } from 'next/server'

export async function GET(request) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}
```

## redirect()

Produce a response that redirects to a URL.

```ts
import { NextResponse } from 'next/server'

return NextResponse.redirect(new URL('/new', request.url))
```

Modify the URL before redirecting.

```ts
import { NextResponse } from 'next/server'

const loginUrl = new URL('/login', request.url)
loginUrl.searchParams.set('from', request.nextUrl.pathname)
return NextResponse.redirect(loginUrl)
```

## rewrite()

Produce a response that rewrites (proxies) the given URL while preserving the original URL.

```ts
import { NextResponse } from 'next/server'

return NextResponse.rewrite(new URL('/proxy', request.url))
```

## next()

Useful for Middleware, allowing early return and continued routing.

```ts
import { NextResponse } from 'next/server'

return NextResponse.next()
```

Forward headers when producing the response.

```ts
import { NextResponse } from 'next/server'

const newHeaders = new Headers(request.headers)
newHeaders.set('x-version', '123')
return NextResponse.next({
  request: {
    headers: newHeaders,
  },
})
```