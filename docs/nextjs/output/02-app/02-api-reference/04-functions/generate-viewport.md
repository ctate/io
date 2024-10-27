# generateViewport

## Description
API Reference for the generateViewport function.

## Overview
You can customize the initial viewport of the page with the static `viewport` object or the dynamic `generateViewport` function.

**Good to know**:
- The `viewport` object and `generateViewport` function exports are **only supported in Server Components**.
- You cannot export both the `viewport` object and `generateViewport` function from the same route segment.
- If you're migrating `metadata` exports, use the metadata-to-viewport-export codemod to update your changes.

## The `viewport` object
To define the viewport options, export a `viewport` object from a `layout.jsx` or `page.jsx` file.

```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function Page() {}
```

```jsx
export const viewport = {
  themeColor: 'black',
}

export default function Page() {}
```

## `generateViewport` function
`generateViewport` should return a `Viewport` object containing one or more viewport fields.

```tsx
export function generateViewport({ params }) {
  return {
    themeColor: '...',
  }
}
```

```jsx
export function generateViewport({ params }) {
  return {
    themeColor: '...',
  }
}
```

**Good to know**:
- If the viewport doesn't depend on runtime information, it should be defined using the static `viewport` object rather than `generateViewport`.

## Viewport Fields

### `themeColor`
Learn more about `theme-color`.

**Simple theme color**
```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}
```

```jsx
export const viewport = {
  themeColor: 'black',
}
```

```html
<meta name="theme-color" content="black" />
```

**With media attribute**
```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

```jsx
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

```html
<meta name="theme-color" media="(prefers-color-scheme: light)" content="cyan" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
```

### `width`, `initialScale`, `maximumScale`, and `userScalable`
**Good to know**: The `viewport` meta tag is automatically set, and manual configuration is usually unnecessary as the default is sufficient.

```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

```jsx
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

### `colorScheme`
Learn more about `color-scheme`.

```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  colorScheme: 'dark',
}
```

```jsx
export const viewport = {
  colorScheme: 'dark',
}
```

```html
<meta name="color-scheme" content="dark" />
```

## Types
You can add type safety to your viewport object by using the `Viewport` type.

### `viewport` object
```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}
```

### `generateViewport` function

#### Regular function
```tsx
import type { Viewport } from 'next'

export function generateViewport(): Viewport {
  return {
    themeColor: 'black',
  }
}
```

#### With segment props
```tsx
import type { Viewport } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateViewport({ params, searchParams }: Props): Viewport {
  return {
    themeColor: 'black',
  }
}

export default function Page({ params, searchParams }: Props) {}
```

#### JavaScript Projects
For JavaScript projects, you can use JSDoc to add type safety.
```js
/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: 'black',
}
```

## Version History
| Version   | Changes                                       |
| --------- | --------------------------------------------- |
| `v14.0.0` | `viewport` and `generateViewport` introduced. |