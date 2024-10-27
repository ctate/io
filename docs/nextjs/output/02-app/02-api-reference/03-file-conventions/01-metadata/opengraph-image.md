# opengraph-image and twitter-image

## Overview

The `opengraph-image` and `twitter-image` file conventions allow you to set Open Graph and Twitter images for a route segment, enhancing how links to your site appear on social networks and messaging apps.

## Setting Images

There are two methods to set Open Graph and Twitter images:

- Using image files (.jpg, .png, .gif)
- Using code to generate images (.js, .ts, .tsx)

## Image Files (.jpg, .png, .gif)

To set a route segment's shared image, place an `opengraph-image` or `twitter-image` image file in the segment. Next.js will evaluate the file and add the appropriate tags to your app's `<head>` element.

| File Convention                                 | Supported File Types            |
| ----------------------------------------------- | ------------------------------- |
| opengraph-image                                 | .jpg, .jpeg, .png, .gif        |
| twitter-image                                   | .jpg, .jpeg, .png, .gif        |
| opengraph-image.alt                             | .txt                            |
| twitter-image.alt                               | .txt                            |

**Note**: The `twitter-image` file size must not exceed 5MB, and the `opengraph-image` file size must not exceed 8MB. Exceeding these limits will cause the build to fail.

### `opengraph-image`

Add an `opengraph-image.(jpg|jpeg|png|gif)` image file to any route segment.

```html
<meta property="og:image" content="<generated>" />
<meta property="og:image:type" content="<generated>" />
<meta property="og:image:width" content="<generated>" />
<meta property="og:image:height" content="<generated>" />
```

### `twitter-image`

Add a `twitter-image.(jpg|jpeg|png|gif)` image file to any route segment.

```html
<meta name="twitter:image" content="<generated>" />
<meta name="twitter:image:type" content="<generated>" />
<meta name="twitter:image:width" content="<generated>" />
<meta name="twitter:image:height" content="<generated>" />
```

### `opengraph-image.alt.txt`

Add an accompanying `opengraph-image.alt.txt` file in the same route segment as the `opengraph-image.(jpg|jpeg|png|gif)` image for its alt text.

```txt
About Acme
```

```html
<meta property="og:image:alt" content="About Acme" />
```

### `twitter-image.alt.txt`

Add an accompanying `twitter-image.alt.txt` file in the same route segment as the `twitter-image.(jpg|jpeg|png|gif)` image for its alt text.

```txt
About Acme
```

```html
<meta property="twitter:image:alt" content="About Acme" />
```

## Generate Images Using Code (.js, .ts, .tsx)

You can programmatically generate images using code by creating an `opengraph-image` or `twitter-image` route that exports a function.

| File Convention   | Supported File Types |
| ----------------- | -------------------- |
| opengraph-image    | .js, .ts, .tsx      |
| twitter-image      | .js, .ts, .tsx      |

**Note**: Generated images are statically optimized by default unless they use Dynamic APIs or uncached data. You can generate multiple images in the same file using `generateImageMetadata`. 

The easiest way to generate an image is to use the `ImageResponse` API from `next/og`.

### Example

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'About Acme'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const interSemiBold = fetch(new URL('./Inter-SemiBold.ttf', import.meta.url)).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div style={{ fontSize: 128, background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        About Acme
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: await interSemiBold, style: 'normal', weight: 400 }],
    }
  )
}
```

### Props

The default export function receives the following props:

#### `params` (optional)

An object containing the dynamic route parameters from the root segment down to the segment where `opengraph-image` or `twitter-image` is located.

### Returns

The default export function should return a `Blob`, `ArrayBuffer`, `TypedArray`, `DataView`, `ReadableStream`, or `Response`.

**Note**: `ImageResponse` satisfies this return type.

### Config Exports

You can configure the image's metadata by exporting `alt`, `size`, and `contentType` variables.

#### `alt`

```tsx
export const alt = 'My images alt text'
```

```html
<meta property="og:image:alt" content="My images alt text" />
```

#### `size`

```tsx
export const size = { width: 1200, height: 630 }
```

```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

#### `contentType`

```tsx
export const contentType = 'image/png'
```

```html
<meta property="og:image:type" content="image/png" />
```

### Route Segment Config

`opengraph-image` and `twitter-image` are specialized Route Handlers that can use the same route segment configuration options as Pages and Layouts.

## Examples

### Using External Data

This example uses the `params` object and external data to generate the image.

```tsx
import { ImageResponse } from 'next/og'

export const alt = 'About Acme'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) => res.json())

  return new ImageResponse(
    (
      <div style={{ fontSize: 48, background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {post.title}
      </div>
    ),
    { ...size }
  )
}
```

### Using Edge Runtime with Local Assets

This example uses the Edge runtime to fetch a local image and passes it as an `ArrayBuffer`.

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default async function Image() {
  const logoSrc = await fetch(new URL('./logo.png', import.meta.url)).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logoSrc} height="100" />
      </div>
    )
  )
}
```

### Using Node.js Runtime with Local Assets

This example uses the Node.js runtime to fetch a local image.

```tsx
import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer

  return new ImageResponse(
    (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logoSrc} height="100" />
      </div>
    )
  )
}
```

## Version History

| Version   | Changes                                           |
| --------- | ------------------------------------------------- |
| v13.3.0  | opengraph-image and twitter-image introduced.     |