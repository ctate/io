# generateMetadata

Learn how to add Metadata to your Next.js application for improved search engine optimization (SEO) and web shareability.

## Config-based Metadata Options

This section covers all Config-based Metadata options with `generateMetadata` and the static metadata object.

### Static Metadata

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
}
```

### Dynamic Metadata

```tsx
export async function generateMetadata({ params }) {
  return {
    title: '...',
  }
}
```

**Note**:
- The `metadata` object and `generateMetadata` function exports are only supported in Server Components.
- You cannot export both the `metadata` object and `generateMetadata` function from the same route segment.

## The `metadata` Object

To define static metadata, export a `Metadata` object from a `layout.js` or `page.js` file.

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default function Page() {}
```

Refer to the Metadata Fields for a complete list of supported options.

## `generateMetadata` Function

Dynamic metadata can be set by exporting a `generateMetadata` function that returns a `Metadata` object.

```tsx
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Page({ params, searchParams }: Props) {}
```

### Parameters

`generateMetadata` accepts the following parameters:

- `props` - An object containing the parameters of the current route:
  - `params` - An object containing dynamic route parameters.
  - `searchParams` - An object containing the current URL's search params.
  - `parent` - A promise of the resolved metadata from parent route segments.

### Returns

`generateMetadata` should return a `Metadata` object containing one or more metadata fields.

**Note**:
- If metadata doesn't depend on runtime information, it should be defined using the static `metadata` object rather than `generateMetadata`.
- `fetch` requests are automatically memoized for the same data across various components.
- `searchParams` are only available in `page.js` segments.

## Metadata Fields

### `title`

The `title` attribute sets the document title.

#### String

```jsx
export const metadata = {
  title: 'Next.js',
}
```

#### Template Object

```tsx
export const metadata: Metadata = {
  title: {
    template: '...',
    default: '...',
    absolute: '...',
  },
}
```

##### Default

`title.default` provides a fallback title for child route segments.

##### Template

`title.template` adds a prefix or suffix to titles defined in child route segments.

##### Absolute

`title.absolute` provides a title that ignores `title.template` set in parent segments.

### `description`

```jsx
export const metadata = {
  description: 'The React Framework for the Web',
}
```

### Basic Fields

```jsx
export const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
```

### `metadataBase`

`metadataBase` sets a base URL prefix for metadata fields requiring a fully qualified URL.

```jsx
export const metadata = {
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
}
```

### `openGraph`

```jsx
export const metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
```

### `robots`

```tsx
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
}
```

### `icons`

```jsx
export const metadata = {
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
  },
}
```

### `manifest`

```jsx
export const metadata = {
  manifest: 'https://nextjs.org/manifest.json',
}
```

### `twitter`

```jsx
export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    images: ['https://nextjs.org/og.png'],
  },
}
```

### `verification`

```jsx
export const metadata = {
  verification: {
    google: 'google',
    yandex: 'yandex',
  },
}
```

### `other`

Use the `other` option to render any custom metadata tag.

```jsx
export const metadata = {
  other: {
    custom: 'meta',
  },
}
```

## Unsupported Metadata

The following metadata types do not currently have built-in support but can still be rendered in the layout or page itself.

| Metadata                      | Recommendation                                                                                                                                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<meta http-equiv="...">`     | Use appropriate HTTP Headers via redirect, Middleware, or Security Headers. |
| `<base>`                      | Render the tag in the layout or page itself.                                                                                                                                                                                                       |
| `<noscript>`                  | Render the tag in the layout or page itself.                                                                                                                                                                                                       |
| `<style>`                     | Learn more about styling in Next.js.                                                                                                                                                            |
| `<script>`                    | Learn more about using scripts in Next.js.                                                                                                                                                          |
| `<link rel="stylesheet" />`   | Import stylesheets directly in the layout or page itself.                                                                                                                                                                                        |

## Types

You can add type safety to your metadata by using the `Metadata` type.

### `metadata` Object

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}
```

### `generateMetadata` Function

#### Regular Function

```tsx
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Next.js',
  }
}
```

#### Async Function

```tsx
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Next.js',
  }
}
```

#### With Segment Props

```tsx
import type { Metadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return {
    title: 'Next.js',
  }
}
```

#### With Parent Metadata

```tsx
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: 'Next.js',
  }
}
```

#### JavaScript Projects

For JavaScript projects, you can use JSDoc to add type safety.

```js
/** @type {import("next").Metadata} */
export const metadata = {
  title: 'Next.js',
}
```

## Version History

| Version   | Changes                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v13.2.0` | `viewport`, `themeColor`, and `colorScheme` deprecated in favor of the viewport configuration. |
| `v13.2.0` | `metadata` and `generateMetadata` introduced.                                                                                                           |