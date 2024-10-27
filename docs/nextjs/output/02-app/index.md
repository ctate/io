# App Router

The Next.js App Router introduces a new model for building applications using React's latest features such as Server Components, Streaming with Suspense, and Server Actions.

Get started with the App Router by creating your first page.

## Frequently Asked Questions

### How can I access the request object in a layout?

You cannot access the raw request object. However, you can access headers and cookies through server-only functions. Layouts do not rerender and can be cached and reused to avoid unnecessary computation when navigating between pages. This design enforces consistent behavior for layouts across different pages.

### How can I access the URL on a page?

By default, pages are Server Components. You can access route segments through the params prop and URL search params through the searchParams prop. For Client Components, use usePathname, useSelectedLayoutSegment, and useSelectedLayoutSegments for more complex routes.

### How can I redirect from a Server Component?

Use redirect to redirect from a page to a relative or absolute URL. redirect is a temporary (307) redirect, while permanentRedirect is a permanent (308) redirect. These functions will insert a meta tag to emit the redirect on the client side when used while streaming UI.

### How can I handle authentication with the App Router?

Common authentication solutions that support the App Router include:
- NextAuth.js
- Clerk
- Stack Auth
- Auth0
- Stytch
- Kinde
- WorkOS
- Manual handling of sessions or JWTs

### How can I set cookies?

You can set cookies in Server Actions or Route Handlers using the cookies function. You cannot set cookies from a page or layout directly after streaming starts. Cookies can also be set from Middleware.

### How can I build multi-tenant apps?

For building a single Next.js application that serves multiple tenants, an example showing the recommended architecture is available.

### How can I invalidate the App Router cache?

There are multiple layers of caching in Next.js, and thus, multiple ways to invalidate different parts of the cache.

### Are there any comprehensive, open-source applications built on the App Router?

Yes, examples include Next.js Commerce and the Platforms Starter Kit, both of which are open-source.

## Learn More

- Routing Fundamentals
- Data Fetching and Caching
- Incremental Static Regeneration
- Forms and Mutations
- Caching
- Rendering Fundamentals
- Server Components
- Client Components