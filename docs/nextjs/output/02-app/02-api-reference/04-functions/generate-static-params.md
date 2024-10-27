# generateStaticParams

The `generateStaticParams` function can be used with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

```jsx
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

**Good to know**:
- Use the `dynamicParams` segment config option to control behavior for dynamic segments not generated with `generateStaticParams`.
- Return an empty array from `generateStaticParams` or use `export const dynamic = 'force-static'` to revalidate paths at runtime.
- During `next dev`, `generateStaticParams` is called when navigating to a route.
- During `next build`, `generateStaticParams` runs before generating corresponding Layouts or Pages.
- During revalidation (ISR), `generateStaticParams` will not be called again.
- `generateStaticParams` replaces the `getStaticPaths` function in the Pages Router.

## Parameters

`options.params` (optional)

If multiple dynamic segments in a route use `generateStaticParams`, the child `generateStaticParams` function is executed for each set of `params` the parent generates.

The `params` object contains populated `params` from the parent `generateStaticParams`, which can be used to generate the `params` in a child segment.

## Returns

`generateStaticParams` should return an array of objects where each object represents the populated dynamic segments of a single route.

- Each property in the object is a dynamic segment to be filled in for the route.
- The property name is the segment's name, and the property value is what that segment should be filled in with.

Example Route | `generateStaticParams` Return Type
--------------|-----------------------------------
`/product/[id]` | `{ id: string }[]`
`/products/[category]/[product]` | `{ category: string, product: string }[]`
`/products/[...slug]` | `{ slug: string[] }[]`

## Single Dynamic Segment

```tsx
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default async function Page({ params }) {
  const { id } = await params
  // ...
}
```

## Multiple Dynamic Segments

```tsx
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
  ]
}

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default async function Page({ params }) {
  const { category, product } = await params
  // ...
}
```

## Catch-all Dynamic Segment

```tsx
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default async function Page({ params }) {
  const { slug } = await params
  // ...
}
```

## Examples

### Static Rendering

#### All paths at build time

To statically render all paths at build time, supply the full list of paths to `generateStaticParams`:

```tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

#### Subset of paths at build time

To statically render a subset of paths at build time, return a partial list of paths:

```tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  // Render the first 10 posts at build time
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}
```

Then, use the `dynamicParams` segment config option to control behavior for dynamic segments not generated with `generateStaticParams`.

```jsx
// All posts besides the top 10 will be a 404
export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
  const topPosts = posts.slice(0, 10)

  return topPosts.map((post) => ({
    slug: post.slug,
  }))
}
```

#### All paths at runtime

To statically render all paths the first time they're visited, return an empty array or utilize `export const dynamic = 'force-static'`:

```jsx
export async function generateStaticParams() {
  return []
}
```

**Good to know:** Always return an array from `generateStaticParams`, even if empty. Otherwise, the route will be dynamically rendered.

```jsx
export const dynamic = 'force-static'
```

### Disable rendering for unspecified paths

To prevent unspecified paths from being statically rendered at runtime, add the `export const dynamicParams = false` option in a route segment. This will serve only paths provided by `generateStaticParams`, and unspecified routes will 404 or match in the case of catch-all routes.

### Multiple Dynamic Segments in a Route

You can generate params for dynamic segments above the current layout or page, but not below. For example, given the `app/products/[category]/[product]` route:

- `app/products/[category]/[product]/page.js` can generate params for both `[category]` and `[product]`.
- `app/products/[category]/layout.js` can only generate params for `[category]`.

#### Generate params from the bottom up

Generate multiple dynamic segments from the child route segment.

```tsx
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }))
}

export default function Page({ params }) {
  // ...
}
```

#### Generate params from the top down

Generate the parent segments first and use the result to generate the child segments.

```tsx
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())

  return products.map((product) => ({
    category: product.category.slug,
  }))
}

export default function Layout({ params }) {
  // ...
}
```

A child route segment's `generateStaticParams` function is executed once for each segment a parent `generateStaticParams` generates.

The child `generateStaticParams` function can use the `params` returned from the parent `generateStaticParams` function to dynamically generate its own segments.

```tsx
export async function generateStaticParams({ params: { category } }) {
  const products = await fetch(`https://.../products?category=${category}`).then((res) => res.json())

  return products.map((product) => ({
    product: product.id,
  }))
}

export default function Page({ params }) {
  // ...
}
```

**Good to know**: `fetch` requests are automatically memoized for the same data across all `generate`-prefixed functions, Layouts, Pages, and Server Components. React `cache` can be used if `fetch` is unavailable.

## Version History

Version | Changes
--------|--------
`v13.0.0` | `generateStaticParams` introduced.