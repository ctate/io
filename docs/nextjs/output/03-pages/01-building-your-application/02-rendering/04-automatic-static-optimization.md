# Automatic Static Optimization

Next.js automatically optimizes your app to be static HTML whenever possible. This occurs when a page has no blocking data requirements, determined by the absence of `getServerSideProps` and `getInitialProps`.

This feature enables Next.js to create hybrid applications with both server-rendered and statically generated pages. Statically generated pages remain reactive, as Next.js hydrates the application client-side for full interactivity.

## Benefits

Optimized pages require no server-side computation and can be instantly streamed from multiple CDN locations, resulting in an ultra-fast loading experience for users.

## How It Works

If `getServerSideProps` or `getInitialProps` is present, Next.js renders the page on-demand per request (Server-Side Rendering). If not, Next.js statically optimizes the page by prerendering it to static HTML.

During prerendering, the router's `query` object will be empty. After hydration, Next.js updates the application to provide route parameters in the `query` object. The query will be updated after hydration in the following cases:

- The page is a dynamic route.
- The page has query values in the URL.
- Rewrites are configured in `next.config.js`, which may have parameters needing to be parsed.

To check if the query is fully updated, use the `isReady` field on `next/router`.

Parameters added with dynamic routes to a page using `getStaticProps` will always be available in the `query` object.

`next build` emits `.html` files for statically optimized pages. For example, the output for `pages/about.js` will be:

```
.next/server/pages/about.html
```

If `getServerSideProps` is added, it will be JavaScript:

```
.next/server/pages/about.js
```

## Caveats

- A custom App with `getInitialProps` disables optimization in pages without Static Generation.
- A custom Document with `getInitialProps` should check if `ctx.req` is defined before assuming server-side rendering, as `ctx.req` will be `undefined` for prerendered pages.
- Avoid using the `asPath` value on `next/router` in the rendering tree until the router's `isReady` field is true. Statically optimized pages only know `asPath` on the client, which may lead to mismatch errors if used as a prop.