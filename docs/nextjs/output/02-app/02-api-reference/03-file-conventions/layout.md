# layout.js

## Overview

The `layout` file is used to define a layout in your Next.js application.

### Example Layouts

**Dashboard Layout (TypeScript)**

```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

**Dashboard Layout (JavaScript)**

```jsx
export default function DashboardLayout({ children }) {
  return <section>{children}</section>
}
```

**Root Layout (TypeScript)**

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Root Layout (JavaScript)**

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Reference

### Props

#### `children` (required)

Layout components should accept and use a `children` prop. During rendering, `children` will be populated with the route segments the layout is wrapping.

#### `params` (optional)

A promise that resolves to an object containing the dynamic route parameters from the root segment down to that layout.

**Example Layout with Params (TypeScript)**

```tsx
export default async function Layout({
  params,
}: {
  params: Promise<{ team: string }>
}) {
  const team = (await params).team
}
```

**Example Layout with Params (JavaScript)**

```jsx
export default async function Layout({ params }) {
  const team = (await params).team
}
```

**Example Route and Params**

- `app/dashboard/[team]/layout.js` - URL: `/dashboard/1`, `params`: `Promise<{ team: '1' }>`
- `app/shop/[tag]/[item]/layout.js` - URL: `/shop/1/2`, `params`: `Promise<{ tag: '1', item: '2' }>`
- `app/blog/[...slug]/layout.js` - URL: `/blog/1/2`, `params`: `Promise<{ slug: ['1', '2'] }}`

### Root Layouts

The `app` directory must include a root `app/layout.js`.

**Root Layout Example (TypeScript)**

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

**Root Layout Example (JavaScript)**

```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

- The root layout must define `<html>` and `<body>` tags.
- Do not manually add `<head>` tags; use the Metadata API instead.
- Route groups can create multiple root layouts, but navigating across them will cause a full page load.

## Caveats

### Layouts do not receive `searchParams`

Layouts do not receive the `searchParams` prop. Use the Page `searchParams` prop or the `useSearchParams` hook in a Client Component within the layout.

### Layouts cannot access `pathname`

Layouts cannot access `pathname`. Extract logic that depends on pathname into a Client Component.

**Example Layout with Client Component (TypeScript)**

```tsx
import { ClientComponent } from '@/app/ui/ClientComponent'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientComponent />
      <main>{children}</main>
    </>
  )
}
```

**Example Layout with Client Component (JavaScript)**

```jsx
import { ClientComponent } from '@/app/ui/ClientComponent'

export default function Layout({ children }) {
  return (
    <>
      <ClientComponent />
      <main>{children}</main>
    </>
  )
}
```

## Examples

### Displaying Content Based on `params`

**Example Dashboard Layout (TypeScript)**

```tsx
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ team: string }>
}) {
  const { team } = await params

  return (
    <section>
      <header>
        <h1>Welcome to {team}'s Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}
```

**Example Dashboard Layout (JavaScript)**

```jsx
export default async function DashboardLayout({ children, params }) {
  const { team } = await params

  return (
    <section>
      <header>
        <h1>Welcome to {team}'s Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}
```

### Reading `params` in Client Components

**Example Page Component (TypeScript)**

```tsx
'use client'

import { use } from 'react'

export function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
}
```

**Example Page Component (JavaScript)**

```js
'use client'

import { use } from 'react'

export function Page({ params }) {
  const { slug } = use(params)
}
```

## Version History

- `v15.0.0-RC`: `params` is now a promise.
- `v13.0.0`: `layout` introduced.