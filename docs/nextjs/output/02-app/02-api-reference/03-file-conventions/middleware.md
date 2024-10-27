# middleware.js

## Description
API reference for the middleware.js file.

The `middleware.js|ts` file is used to write Middleware and run code on the server before a request is completed. You can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly based on the incoming request.

Middleware executes before routes are rendered and is useful for implementing custom server-side logic like authentication, logging, or handling redirects.

Use the file `middleware.ts` (or .js) in the root of your project to define Middleware, at the same level as `app` or `pages`, or inside `src` if applicable.

### Example Code

```tsx
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
```

```js
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
```

## Exports

### Middleware function
The file must export a single function, either as a default export or named `middleware`. Multiple middleware from the same file are not supported.

```js
// Example of default export
export default function middleware(request) {
  // Middleware logic
}
```

### Config object (optional)
A config object can be exported alongside the Middleware function, including the `matcher` to specify paths where the Middleware applies.

#### Matcher
The `matcher` option allows you to target specific paths for the Middleware to run on. You can specify these paths in several ways:

- Single path: Use a string, like `'/about'`.
- Multiple paths: Use an array, such as `matcher: ['/about', '/contact']`.

`matcher` supports complex path specifications through regular expressions, enabling precise control over which paths to include or exclude.

The `matcher` option also accepts an array of objects with the following keys:

- `source`: The path or pattern used to match the request paths.
- `regexp` (optional): A regular expression string for fine-tuning the matching.
- `locale` (optional): A boolean that, when set to `false`, ignores locale-based routing.
- `has` (optional): Specifies conditions based on the presence of specific request elements.
- `missing` (optional): Focuses on conditions where certain request elements are absent.

```js
export const config = {
  matcher: [
    {
      source: '/api/*',
      regexp: '^/api/(.*)',
      locale: false,
      has: [
        { type: 'header', key: 'Authorization', value: 'Bearer Token' },
        { type: 'query', key: 'userId', value: '123' },
      ],
      missing: [{ type: 'cookie', key: 'session', value: 'active' }],
    },
  ],
}
```

## Params

### `request`
The default export function accepts a single parameter, `request`, which is an instance of `NextRequest`, representing the incoming HTTP request.

```tsx
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware logic goes here
}
```

```js
export function middleware(request) {
  // Middleware logic goes here
}
```

**Good to know**: `NextRequest` represents incoming HTTP requests in Next.js Middleware, while `NextResponse` is used to manipulate and send back HTTP responses.

## NextResponse
Middleware can use the `NextResponse` object, which extends the Web Response API. By returning a `NextResponse` object, you can manipulate cookies, set headers, implement redirects, and rewrite paths.

**Good to know**: For redirects, you can also use `Response.redirect` instead of `NextResponse.redirect`.

## Runtime
Middleware only supports the Edge runtime. The Node.js runtime cannot be used.

## Version History

| Version   | Changes                                                                                       |
| --------- | --------------------------------------------------------------------------------------------- |
| `v13.1.0` | Advanced Middleware flags added                                                               |
| `v13.0.0` | Middleware can modify request headers, response headers, and send responses                   |
| `v12.2.0` | Middleware is stable, please see the upgrade guide                                            |
| `v12.0.9` | Enforce absolute URLs in Edge Runtime                                                        |
| `v12.0.0` | Middleware (Beta) added                                                                       |