# App Router Incremental Adoption Guide

This guide will help you:

- Update your Next.js application from version 12 to version 13
- Upgrade features that work in both the `pages` and the `app` directories
- Incrementally migrate your existing application from `pages` to `app`

## Upgrading

### Node.js Version

The minimum Node.js version is now **v18.17**. See the Node.js documentation for more information.

### Next.js Version

To update to Next.js version 13, run the following command using your preferred package manager:

```bash
npm install next@latest react@latest react-dom@latest
```

### ESLint Version

If you're using ESLint, you need to upgrade your ESLint version:

```bash
npm install -D eslint-config-next@latest
```

> You may need to restart the ESLint server in VS Code for the ESLint changes to take effect. Open the Command Palette (`cmd+shift+p` on Mac; `ctrl+shift+p` on Windows) and search for `ESLint: Restart ESLint Server`.

## Next Steps

After you've updated, see the following sections for next steps:

- Upgrade new features: A guide to help you upgrade to new features such as the improved Image and Link Components.
- Migrate from the `pages` to `app` directory: A step-by-step guide to help you incrementally migrate from the `pages` to the `app` directory.

## Upgrading New Features

Next.js 13 introduced the new App Router with new features and conventions. The new Router is available in the `app` directory and co-exists with the `pages` directory.

Upgrading to Next.js 13 does **not** require using the new App Router. You can continue using `pages` with new features that work in both directories, such as the updated Image component, Link component, Script component, and Font optimization.

### `<Image/>` Component

Next.js 12 introduced new improvements to the Image Component with a temporary import: `next/future/image`. These improvements included less client-side JavaScript, easier ways to extend and style images, better accessibility, and native browser lazy loading.

In version 13, this new behavior is now the default for `next/image`.

There are two codemods to help you migrate to the new Image Component:

- `next-image-to-legacy-image` codemod: Safely and automatically renames `next/image` imports to `next/legacy/image`. Existing components will maintain the same behavior.
- `next-image-experimental` codemod: Dangerously adds inline styles and removes unused props. This will change the behavior of existing components to match the new defaults. To use this codemod, you need to run the `next-image-to-legacy-image` codemod first.

### `<Link>` Component

The `<Link>` Component no longer requires manually adding an `<a>` tag as a child. This behavior was added as an experimental option in version 12.2 and is now the default. In Next.js 13, `<Link>` always renders `<a>` and allows you to forward props to the underlying tag.

Example:

```jsx
import Link from 'next/link'

// Next.js 12: `<a>` has to be nested otherwise it's excluded
<Link href="/about">
  <a>About</a>
</Link>

// Next.js 13: `<Link>` always renders `<a>` under the hood
<Link href="/about">
  About
</Link>
```

To upgrade your links to Next.js 13, you can use the `new-link` codemod.

### `<Script>` Component

The behavior of `next/script` has been updated to support both `pages` and `app`, but some changes need to be made to ensure a smooth migration:

- Move any `beforeInteractive` scripts you previously included in `_document.js` to the root layout file (`app/layout.tsx`).
- The experimental `worker` strategy does not yet work in `app` and scripts denoted with this strategy will either have to be removed or modified to use a different strategy (e.g. `lazyOnload`).
- `onLoad`, `onReady`, and `onError` handlers will not work in Server Components so make sure to move them to a Client Component or remove them altogether.

### Font Optimization

Previously, Next.js helped you optimize fonts by inlining font CSS. Version 13 introduces the new `next/font` module which gives you the ability to customize your font loading experience while still ensuring great performance and privacy. `next/font` is supported in both the `pages` and `app` directories.

While inlining CSS still works in `pages`, it does not work in `app`. You should use `next/font` instead.

## Migrating from `pages` to `app`

Moving to the App Router may be the first time using React features that Next.js builds on top of such as Server Components, Suspense, and more. We recommend reducing the combined complexity of these updates by breaking down your migration into smaller steps. The `app` directory is intentionally designed to work simultaneously with the `pages` directory to allow for incremental page-by-page migration.

- The `app` directory supports nested routes and layouts.
- Use nested folders to define routes and a special `page.js` file to make a route segment publicly accessible.
- Special file conventions are used to create UI for each route segment. The most common special files are `page.js` and `layout.js`.
  - Use `page.js` to define UI unique to a route.
  - Use `layout.js` to define UI that is shared across multiple routes.
  - `.js`, `.jsx`, or `.tsx` file extensions can be used for special files.
- You can colocate other files inside the `app` directory such as components, styles, tests, and more.
- Data fetching functions like `getServerSideProps` and `getStaticProps` have been replaced with a new API inside `app`. `getStaticPaths` has been replaced with `generateStaticParams`.
- `pages/_app.js` and `pages/_document.js` have been replaced with a single `app/layout.js` root layout.
- `pages/_error.js` has been replaced with more granular `error.js` special files.
- `pages/404.js` has been replaced with the `not-found.js` file.
- `pages/api/*` API Routes have been replaced with the `route.js` (Route Handler) special file.

### Step 1: Creating the `app` directory

Update to the latest Next.js version (requires 13.4 or greater):

```bash
npm install next@latest
```

Then, create a new `app` directory at the root of your project (or `src/` directory).

### Step 2: Creating a Root Layout

Create a new `app/layout.tsx` file inside the `app` directory. This is a root layout that will apply to all routes inside `app`.

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

- The `app` directory must include a root layout.
- The root layout must define `<html>`, and `<body>` tags since Next.js does not automatically create them.
- The root layout replaces the `pages/_app.tsx` and `pages/_document.tsx` files.
- `.js`, `.jsx`, or `.tsx` extensions can be used for layout files.

To manage `<head>` HTML elements, you can use the built-in SEO support:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
```

#### Migrating `_document.js` and `_app.js`

If you have an existing `_app` or `_document` file, you can copy the contents (e.g. global styles) to the root layout (`app/layout.tsx`). Styles in `app/layout.tsx` will not apply to `pages/*`. You should keep `_app`/`_document` while migrating to prevent your `pages/*` routes from breaking. Once fully migrated, you can then safely delete them.

If you are using any React Context providers, they will need to be moved to a Client Component.

#### Migrating the `getLayout()` pattern to Layouts (Optional)

Next.js recommended adding a property to Page components to achieve per-page layouts in the `pages` directory. This pattern can be replaced with native support for nested layouts in the `app` directory.

### Step 3: Migrating `next/head`

In the `pages` directory, the `next/head` React component is used to manage `<head>` HTML elements such as `title` and `meta`. In the `app` directory, `next/head` is replaced with the new built-in SEO support.

**Before:**

```tsx
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
    </>
  )
}
```

**After:**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page Title',
}

export default function Page() {
  return '...'
}
```

### Step 4: Migrating Pages

Pages in the `app` directory are Server Components by default. This is different from the `pages` directory where pages are Client Components.

We recommend breaking down the migration of a page into two main steps:

- Step 1: Move the default exported Page Component into a new Client Component.
- Step 2: Import the new Client Component into a new `page.js` file inside the `app` directory.

**Step 1: Create a new Client Component**

- Create a new separate file inside the `app` directory (i.e. `app/home-page.tsx` or similar) that exports a Client Component. To define Client Components, add the `'use client'` directive to the top of the file (before any imports).

```tsx
'use client'

export default function HomePage({ recentPosts }) {
  return (
    <div>
      {recentPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

**Step 2: Create a new page**

- Create a new `app/page.tsx` file inside the `app` directory. This is a Server Component by default.
- Import the `home-page.tsx` Client Component into the page.

```tsx
import HomePage from './home-page'

async function getPosts() {
  const res = await fetch('https://...')
  const posts = await res.json()
  return posts
}

export default async function Page() {
  const recentPosts = await getPosts()
  return <HomePage recentPosts={recentPosts} />
}
```

### Step 5: Migrating Routing Hooks

In `app`, you should use the three new hooks imported from `next/navigation`: `useRouter()`, `usePathname()`, and `useSearchParams()`.

- The new `useRouter` hook is imported from `next/navigation` and has different behavior to the `useRouter` hook in `pages` which is imported from `next/router`.
- The new `useRouter` does not return the `pathname` string. Use the separate `usePathname` hook instead.
- The new `useRouter` does not return the `query` object. Use the `useSearchParams` and `useParams` hooks instead.
- These new hooks are only supported in Client Components.

```tsx
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
}
```

### Step 6: Migrating Data Fetching Methods

The `pages` directory uses `getServerSideProps` and `getStaticProps` to fetch data for pages. Inside the `app` directory, these previous data fetching functions are replaced with a simpler API built on top of `fetch()` and `async` React Server Components.

```tsx
export default async function Page() {
  const staticData = await fetch(`https://...`, { cache: 'force-cache' })
  const dynamicData = await fetch(`https://...`, { cache: 'no-store' })
  const revalidatedData = await fetch(`https://...`, {
    next: { revalidate: 10 },
  })

  return <div>...</div>
}
```

#### Server-side Rendering (`getServerSideProps`)

In the `app` directory, we can colocate our data fetching inside our React components using Server Components. This allows us to send less JavaScript to the client, while maintaining the rendered HTML from the server.

```tsx
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()
  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

#### Accessing Request Object

In the `app` directory, you can retrieve request-based data using the new read-only functions:

- `headers`: Based on the Web Headers API, can be used inside Server Components to retrieve request headers.
- `cookies`: Based on the Web Cookies API, can be used inside Server Components to retrieve cookies.

```tsx
import { cookies, headers } from 'next/headers'

export default async function Page() {
  const theme = (await cookies()).get('theme')
  const authHeader = (await headers()).get('authorization')
  return '...'
}
```

#### Static Site Generation (`getStaticProps`)

In the `app` directory, data fetching with `fetch()` will default to `cache: 'force-cache'`, which will cache the request data until manually invalidated.

```tsx
async function getProjects() {
  const res = await fetch(`https://...`)
  const projects = await res.json()
  return projects
}

export default async function Index() {
  const projects = await getProjects()
  return projects.map((project) => <div>{project.name}</div>)
}
```

#### Dynamic paths (`getStaticPaths`)

In the `app` directory, `getStaticPaths` is replaced with `generateStaticParams`.

```tsx
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

async function getPost(params) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()
  return post
}

export default async function Post({ params }) {
  const post = await getPost(params)
  return <PostLayout post={post} />
}
```

### Replacing `fallback`

In the `app` directory, the `config.dynamicParams` property controls how params outside of `generateStaticParams` are handled:

- **`true`**: (default) Dynamic segments not included in `generateStaticParams` are generated on demand.
- **`false`**: Dynamic segments not included in `generateStaticParams` will return a 404.

### Incremental Static Regeneration (`getStaticProps` with `revalidate`)

In the `app` directory, data fetching with `fetch()` can use `revalidate`, which will cache the request for the specified amount of seconds.

```tsx
async function getPosts() {
  const res = await fetch(`https://.../posts`, { next: { revalidate: 60 } })
  const data = await res.json()
  return data.posts
}

export default async function PostList() {
  const posts = await getPosts()
  return posts.map((post) => <div>{post.name}</div>)
}
```

### API Routes

API Routes continue to work in the `pages/api` directory without any changes. However, they have been replaced by Route Handlers in the `app` directory.

```ts
export async function GET(request: Request) {}
```

### Step 7: Styling

In the `app` directory, global styles can be added to any layout, page, or component.

If you're using Tailwind CSS, you'll need to add the `app` directory to your `tailwind.config.js` file:

```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

You'll also need to import your global styles in your `app/layout.js` file:

```jsx
import '../styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Codemods

Next.js provides Codemod transformations to help upgrade your codebase when a feature is deprecated. See Codemods for more information.