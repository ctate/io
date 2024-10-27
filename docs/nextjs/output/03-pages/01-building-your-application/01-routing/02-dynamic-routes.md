# Dynamic Routes

Dynamic Routes are pages that allow you to add custom parameters to your URLs. Start creating Dynamic Routes and learn more.

## Overview

When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or prerendered at build time.

## Convention

A Dynamic Segment can be created by wrapping a file or folder name in square brackets: `[segmentName]`. For example, `[id]` or `[slug]`.

Dynamic Segments can be accessed from `useRouter`.

## Example

For example, a blog could include the following route `pages/blog/[slug].js` where `[slug]` is the Dynamic Segment for blog posts.

```jsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return <p>Post: {router.query.slug}</p>
}
```

Route Examples:

- Route: `pages/blog/[slug].js`
  - Example URL: `/blog/a`
    - Params: `{ slug: 'a' }`
  - Example URL: `/blog/b`
    - Params: `{ slug: 'b' }`
  - Example URL: `/blog/c`
    - Params: `{ slug: 'c' }`

## Catch-all Segments

Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets `[...segmentName]`.

For example, `pages/shop/[...slug].js` will match `/shop/clothes`, but also `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`, and so on.

Route Examples:

- Route: `pages/shop/[...slug].js`
  - Example URL: `/shop/a`
    - Params: `{ slug: ['a'] }`
  - Example URL: `/shop/a/b`
    - Params: `{ slug: ['a', 'b'] }`
  - Example URL: `/shop/a/b/c`
    - Params: `{ slug: ['a', 'b', 'c'] }`

## Optional Catch-all Segments

Catch-all Segments can be made optional by including the parameter in double square brackets: `[[...segmentName]]`.

For example, `pages/shop/[[...slug]].js` will also match `/shop`, in addition to `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`.

Route Examples:

- Route: `pages/shop/[[...slug]].js`
  - Example URL: `/shop`
    - Params: `{ slug: undefined }`
  - Example URL: `/shop/a`
    - Params: `{ slug: ['a'] }`
  - Example URL: `/shop/a/b`
    - Params: `{ slug: ['a', 'b'] }`
  - Example URL: `/shop/a/b/c`
    - Params: `{ slug: ['a', 'b', 'c'] }`

## Next Steps

For more information on what to do next, we recommend the following sections:

- pages/building-your-application/routing/linking-and-navigating
- pages/api-reference/functions/use-router