# TypeScript

Next.js provides a TypeScript-first development experience for building your React application. It includes built-in TypeScript support for automatically installing necessary packages and configuring settings.

## New Projects

`create-next-app` now ships with TypeScript by default.

```bash
npx create-next-app@latest
```

## Existing Projects

To add TypeScript to your project, rename a file to `.ts` or `.tsx`. Run `next dev` and `next build` to automatically install necessary dependencies and create a `tsconfig.json` file with recommended options. If a `jsconfig.json` file exists, copy the `paths` compiler option to the new `tsconfig.json` and delete the old file. It is recommended to use `next.config.ts` for better type inference.

## TypeScript Plugin

Next.js includes a custom TypeScript plugin and type checker for advanced type-checking and auto-completion in editors like VSCode. Enable the plugin by:

1. Opening the command palette (`Ctrl/⌘` + `Shift` + `P`)
2. Searching for "TypeScript: Select TypeScript Version"
3. Selecting "Use Workspace Version"

### Plugin Features

The TypeScript plugin provides:

- Warnings for invalid values in segment config options.
- Available options and in-context documentation.
- Correct usage of the `use client` directive.
- Ensuring client hooks are used only in Client Components.

## Minimum TypeScript Version

It is recommended to use at least TypeScript `v4.5.2` for syntax features and performance improvements.

## Type Checking in Next.js Configuration

### Type Checking next.config.js

Add type checking in `next.config.js` using JSDoc:

```js
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

module.exports = nextConfig
```

### Type Checking next.config.ts

Use TypeScript in `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

export default nextConfig
```

**Note**: Module resolution in `next.config.ts` is limited to CommonJS.

## Statically Typed Links

Enable statically typed links by setting `experimental.typedRoutes` in `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
```

Next.js generates a link definition in `.next/types` for all existing routes, improving type safety.

## End-to-End Type Safety

The Next.js App Router enhances type safety by allowing direct fetching in components without serialization. This simplifies data flow and improves type safety.

## Async Server Component TypeScript Error

Ensure TypeScript is `5.1.3` or higher and `@types/react` is `18.2.8` or higher to avoid type errors with async Server Components.

## Passing Data Between Server & Client Components

Data passed between Server and Client Components is serialized as usual, but un-rendered data remains on the server.

## Static Generation and Server-side Rendering

Use `GetStaticProps`, `GetStaticPaths`, and `GetServerSideProps` types for static generation and server-side rendering:

```tsx
import type { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps = (async (context) => {
  // ...
}) satisfies GetStaticProps

export const getStaticPaths = (async () => {
  // ...
}) satisfies GetStaticPaths

export const getServerSideProps = (async (context) => {
  // ...
}) satisfies GetServerSideProps
```

## API Routes

Example of using built-in types for API routes:

```ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
}
```

## Custom App

Use the built-in type `AppProps` in a custom App:

```ts
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

## Path Aliases and baseUrl

Next.js supports the `tsconfig.json` `"paths"` and `"baseUrl"` options.

## Incremental Type Checking

Next.js supports incremental type checking when enabled in `tsconfig.json`, improving type checking speed in larger applications.

## Ignoring TypeScript Errors

To allow production builds with TypeScript errors, enable `ignoreBuildErrors` in `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

**Note**: Use `tsc --noEmit` to check for TypeScript errors before building.

## Custom Type Declarations

Create a new file for custom types instead of modifying `next-env.d.ts`, and reference it in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  },
  "include": [
    "new-types.d.ts",
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": ["node_modules"]
}
```

## Version Changes

| Version   | Changes                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `v15.0.0` | `next.config.ts` support added for TypeScript projects.                                                                              |
| `v13.2.0` | Statically typed links available in beta.                                                                                           |
| `v12.0.0` | SWC is now used by default for faster TypeScript and TSX builds.                                                                     |
| `v10.2.1` | Incremental type checking support added when enabled in `tsconfig.json`.                                                             |