# Route Segment Config

Learn about how to configure options for Next.js route segments.

The options outlined on this page are disabled if the `dynamicIO` flag is on, and will eventually be deprecated in the future.

The Route Segment options allow you to configure the behavior of a Page, Layout, or Route Handler by directly exporting the following variables:

| Option                                  | Type                                                                                                                      | Default                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| experimental_ppr                        | `boolean`                                                                                                                 |                            |
| dynamic                                 | `'auto' | 'force-dynamic' | 'error' | 'force-static'`                                                                  | `'auto'`                   |
| dynamicParams                           | `boolean`                                                                                                                 | `true`                     |
| revalidate                              | `false | 0 | number`                                                                                                    | `false`                    |
| fetchCache                              | `'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'` | `'auto'`                   |
| runtime                                 | `'nodejs' | 'edge'`                                                                                                      | `'nodejs'`                 |
| preferredRegion                         | `'auto' | 'global' | 'home' | string | string[]`                                                                      | `'auto'`                   |
| maxDuration                             | `number`                                                                                                                  | Set by deployment platform |

## Options

### experimental_ppr

Enable Partial Prerendering (PPR) for a layout or page.

```tsx
export const experimental_ppr = true
```

```jsx
export const experimental_ppr = true
```

### dynamic

Change the dynamic behavior of a layout or page to fully static or fully dynamic.

```tsx
export const dynamic = 'auto'
```

```js
export const dynamic = 'auto'
```

- **'auto'** (default): Caches as much as possible without preventing components from opting into dynamic behavior.
- **'force-dynamic'**: Forces dynamic rendering, rendering routes for each user at request time.
- **'error'**: Forces static rendering and caches data, causing an error if any components use Dynamic APIs or uncached data.
- **'force-static'**: Forces static rendering and caches data, returning empty values for cookies, headers, and useSearchParams.

### dynamicParams

Control behavior when a dynamic segment is visited that was not generated with generateStaticParams.

```tsx
export const dynamicParams = true
```

```js
export const dynamicParams = true
```

- **true** (default): Dynamic segments not included in generateStaticParams are generated on demand.
- **false**: Returns a 404 for dynamic segments not included in generateStaticParams.

### revalidate

Set the default revalidation time for a layout or page.

```tsx
export const revalidate = false
```

```js
export const revalidate = false
```

- **false** (default): Caches any fetch requests that set their cache option to 'force-cache'.
- **0**: Ensures a layout or page is always dynamically rendered.
- **number**: Sets the default revalidation frequency to n seconds.

### fetchCache

Override the default behavior of fetch requests in a layout or page.

```tsx
export const fetchCache = 'auto'
```

```js
export const fetchCache = 'auto'
```

- **'auto'** (default): Caches fetch requests before Dynamic APIs and does not cache after.
- **'default-cache'**: Sets the cache option to 'force-cache' if no option is provided.
- **'only-cache'**: Ensures all fetch requests opt into caching.
- **'force-cache'**: Sets the cache option of all fetch requests to 'force-cache'.
- **'default-no-store'**: Sets the cache option to 'no-store' if no option is provided.
- **'only-no-store'**: Ensures all fetch requests opt out of caching.
- **'force-no-store'**: Sets the cache option of all fetch requests to 'no-store'.

### runtime

Recommended to use Node.js for rendering and Edge for Middleware.

```tsx
export const runtime = 'nodejs'
```

```js
export const runtime = 'nodejs'
```

### preferredRegion

```tsx
export const preferredRegion = 'auto'
```

```js
export const preferredRegion = 'auto'
```

### maxDuration

Set execution limits for server-side logic.

```tsx
export const maxDuration = 5
```

```js
export const maxDuration = 5
```

### generateStaticParams

Define the list of route segment parameters that will be statically generated at build time.

## Version History

| Version      |                                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v15.0.0-RC  | `export const runtime = "experimental-edge"` deprecated. A codemod is available. |