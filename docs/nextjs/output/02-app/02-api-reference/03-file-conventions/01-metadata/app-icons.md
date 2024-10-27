# Favicon, Icon, and Apple Icon

## Overview

The `favicon`, `icon`, or `apple-icon` file conventions allow you to set icons for your application, useful for web browser tabs, phone home screens, and search engine results.

## Setting App Icons

There are two methods to set app icons:

- Using image files (.ico, .jpg, .png)
- Using code to generate an icon (.js, .ts, .tsx)

## Image Files (.ico, .jpg, .png)

To set an app icon using an image file, place a `favicon`, `icon`, or `apple-icon` image file within your `/app` directory. The `favicon` image must be located in the root of `app/`. Next.js will evaluate the file and automatically add the appropriate tags to your app's `<head>` element.

| File Convention             | Supported File Types                    | Valid Locations |
| --------------------------- | --------------------------------------- | --------------- |
| favicon                     | .ico                                    | app/            |
| icon                        | .ico, .jpg, .jpeg, .png, .svg         | app/**/*        |
| apple-icon                  | .jpg, .jpeg, .png                      | app/**/*        |

### Favicon

Add a `favicon.ico` image file to the root `/app` route segment.

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
```

### Icon

Add an `icon.(ico|jpg|jpeg|png|svg)` image file.

```html
<link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
```

### Apple Icon

Add an `apple-icon.(jpg|jpeg|png)` image file.

```html
<link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
```

**Notes:**
- Multiple icons can be set by adding a number suffix to the file name (e.g., `icon1.png`, `icon2.png`).
- Favicons can only be set in the root `/app` segment; use `icon` for more granularity.
- The appropriate `<link>` tags and attributes are determined by the icon type and file metadata.
- `sizes="any"` is used for `.svg` files or when the image size is undetermined.

## Generate Icons Using Code (.js, .ts, .tsx)

You can also programmatically generate icons using code by creating an `icon` or `apple-icon` route that exports a function.

| File Convention | Supported File Types |
| --------------- | -------------------- |
| icon            | .js, .ts, .tsx       |
| apple-icon      | .js, .ts, .tsx       |

The easiest way to generate an icon is to use the `ImageResponse` API from `next/og`.

```tsx
import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 24, background: 'black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        A
      </div>
    ),
    { ...size }
  )
}
```

```html
<link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
```

**Notes:**
- Generated icons are statically optimized by default unless using Dynamic APIs or uncached data.
- You cannot generate a `favicon` icon; use `icon` or a `favicon.ico` file instead.
- App icons are cached by default unless using a Dynamic API or dynamic config option.

### Props

The default export function can receive the following props:

#### `params` (optional)

An object containing dynamic route parameters.

```tsx
export default function Icon({ params }: { params: { slug: string } }) {
  // ...
}
```

| Route                           | URL         | `params`                  |
| ------------------------------- | ----------- | ------------------------- |
| app/shop/icon.js               | /shop       | undefined                 |
| app/shop/[slug]/icon.js        | /shop/1     | { slug: '1' }            |
| app/shop/[tag]/[item]/icon.js  | /shop/1/2   | { tag: '1', item: '2' }  |

### Returns

The function should return a `Blob`, `ArrayBuffer`, `TypedArray`, `DataView`, `ReadableStream`, or `Response`.

**Note:** `ImageResponse` satisfies this return type.

### Config Exports

You can configure the icon's metadata by exporting `size` and `contentType` variables.

| Option                        | Type                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| size                          | { width: number; height: number }                                                                             |
| contentType                   | string - image MIME type                                                                                       |

#### Size

```tsx
export const size = { width: 32, height: 32 }
```

```html
<link rel="icon" sizes="32x32" />
```

#### Content Type

```tsx
export const contentType = 'image/png'
```

```html
<link rel="icon" type="image/png" />
```

#### Route Segment Config

`icon` and `apple-icon` are specialized Route Handlers that can use the same route segment configuration options as Pages and Layouts.

## Version History

| Version   | Changes                                      |
| --------- | -------------------------------------------- |
| v13.3.0  | favicon, icon, and apple-icon introduced     |