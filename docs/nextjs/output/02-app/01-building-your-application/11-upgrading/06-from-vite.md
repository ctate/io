# Migrating from Vite

This guide will help you migrate an existing Vite application to Next.js.

## Why Switch?

Reasons to switch from Vite to Next.js include:

### Slow Initial Page Loading Time

Client-side applications often experience slow initial loading due to:

1. The need for the entire application bundle to download before data requests can be made.
2. Application code growth with new features and dependencies.

### No Automatic Code Splitting

Manual code splitting can worsen performance. Next.js provides automatic code splitting through its router.

### Network Waterfalls

Sequential client-server requests can lead to poor performance. Next.js allows server-side data fetching to eliminate client-server waterfalls.

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
  distDir: './dist',
}

export default nextConfig
```

### Step 3: Update TypeScript Configuration

If using TypeScript, update `tsconfig.json`:

1. Remove project reference to `tsconfig.node.json`.
2. Add `./dist/types/**/*.ts` and `./next-env.d.ts` to the `include` array.
3. Add `./node_modules` to the `exclude` array.
4. Add `{ "name": "next" }` to the `plugins` array in `compilerOptions`.
5. Set `esModuleInterop` to `true`.
6. Set `jsx` to `preserve`.
7. Set `allowJs` to `true`.
8. Set `forceConsistentCasingInFileNames` to `true`.
9. Set `incremental` to `true`.

Example `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["./src", "./dist/types/**/*.ts", "./next-env.d.ts"],
  "exclude": ["./node_modules"]
}
```

### Step 4: Create the Root Layout

Create a root layout file in the `app` directory:

1. Create a new `app` directory in your `src` directory.
2. Create a `layout.tsx` file inside that `app` directory:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <title>My App</title>
        <meta name="description" content="My App is a..." />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

3. Move metadata files into the `app` directory and remove their `<link>` tags from `<head>`.
4. Use the Metadata API to manage metadata:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
```

### Step 5: Create the Entrypoint Page

1. Create a `[[...slug]]` directory in your `app` directory.
2. Create a `page.tsx` file inside the `app/[[...slug]]` directory:

```tsx
import '../../index.css'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return '...' // Update this later
}
```

3. Create a `client.tsx` file for client-only rendering:

```tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../App'), { ssr: false })

export function ClientOnly() {
  return <App />
}
```

4. Update your entrypoint page to use the new component:

```tsx
import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <ClientOnly />
}
```

### Step 6: Update Static Image Imports

1. Convert absolute import paths for images to relative imports:

```tsx
import logo from '../public/logo.png'
```

2. Use the image `src` property in your `<img>` tag:

```tsx
<img src={logo.src} />
```

### Step 7: Migrate the Environment Variables

1. Change `VITE_` prefix to `NEXT_PUBLIC_`.
2. Update `import.meta.env` usages to their Next.js equivalents.

### Step 8: Update Scripts in `package.json`

Update your `scripts` in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Add `.next` and `next-env.d.ts` to your `.gitignore`:

```txt
.next
next-env.d.ts
dist
```

Run `npm run dev` to test your application.

### Step 9: Clean Up

Delete Vite-related artifacts:

- `main.tsx`
- `index.html`
- `vite-env.d.ts`
- `tsconfig.node.json`
- `vite.config.ts`
- Uninstall Vite dependencies

## Next Steps

You now have a functioning Next.js application as a single-page application. Consider migrating to Next.js features such as:

- Next.js App Router for automatic code splitting and streaming server-rendering.
- Optimize images with the `<Image>` component.
- Optimize fonts with `next/font`.
- Optimize third-party scripts with the `<Script>` component.
- Update ESLint configuration for Next.js rules.