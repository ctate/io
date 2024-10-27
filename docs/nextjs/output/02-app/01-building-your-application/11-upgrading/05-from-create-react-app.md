# Migrating from Create React App

This guide will help you migrate an existing Create React App site to Next.js.

## Why Switch?

### Slow Initial Page Loading Time
Create React App uses client-side React, leading to slow initial loading times due to:
1. The need for the entire application bundle to download before data requests can be made.
2. Application code growth with new features and dependencies.

### No Automatic Code Splitting
Manual code splitting can worsen performance. Next.js provides automatic code splitting through its router.

### Network Waterfalls
Sequential client-server requests can degrade performance. Next.js allows server-side data fetching to eliminate client-server waterfalls.

### Fast and Intentional Loading States
Next.js supports streaming through React Suspense, allowing intentional loading of UI parts without network waterfalls.

### Choose the Data Fetching Strategy
Next.js allows data fetching at build time, request time on the server, or on the client, enabling efficient caching.

### Middleware
Next.js Middleware runs code on the server before a request completes, useful for authentication and internationalization.

### Built-in Optimizations
Next.js optimizes images, fonts, and third-party scripts automatically.

## Migration Steps

### Step 1: Install the Next.js Dependency
Install `next` as a dependency:
```bash
npm install next@latest
```

### Step 2: Create the Next.js Configuration File
Create a `next.config.mjs` at the root of your project:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './build',
}

export default nextConfig
```

### Step 3: Create the Root Layout
Create a new `app` directory in your `src` directory and a `layout.tsx` file:
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

### Step 4: Metadata
Remove default meta charset and viewport tags from `<head>`:
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```
Move metadata into an exported `metadata` object:
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}
```

### Step 5: Styles
Import global CSS in `app/layout.tsx`:
```tsx
import '../index.css'
```
For Tailwind, install `postcss` and `autoprefixer`:
```bash
npm install postcss autoprefixer
```
Create a `postcss.config.js`:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Step 6: Create the Entrypoint Page
Create a `[[...slug]]` directory in your `app` directory and a `page.tsx` file:
```tsx
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return '...' // Update this later
}
```
Create a `client.tsx` file:
```tsx
'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```
Update your entrypoint page:
```tsx
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

### Step 7: Update Static Image Imports
Convert absolute image imports to relative:
```tsx
import logo from '../public/logo.png'
```
Use the image `src` property:
```tsx
<img src={logo.src} />
```

### Step 8: Migrate the Environment Variables
Change `REACT_APP_` prefix to `NEXT_PUBLIC_` for client-side environment variables.

### Step 9: Update Scripts in `package.json`
Update your `scripts`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve@latest ./build"
  }
}
```
Add `.next` and `next-env.d.ts` to `.gitignore`:
```txt
.next
next-env.d.ts
```

### Step 10: Clean Up
Delete Create React App artifacts:
- `public/index.html`
- `src/index.tsx`
- `src/react-app-env.d.ts`
- `reportWebVitals` setup
- Uninstall CRA dependencies (`react-scripts`)

## Bundler Compatibility
Next.js supports custom webpack configurations and Turbopack for improved local development performance.

## Next Steps
After migration, consider:
- Migrating to Next.js App Router for automatic code splitting and server rendering.
- Optimizing images with the `<Image>` component.
- Optimizing fonts and third-party scripts.
- Updating ESLint configuration for Next.js rules.