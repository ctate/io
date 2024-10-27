# Environment Variables

Learn to add and access environment variables in your Next.js application.

Next.js comes with built-in support for environment variables, allowing you to:

- Use `.env` to load environment variables
- Bundle environment variables for the browser by prefixing with `NEXT_PUBLIC_`

## Loading Environment Variables

Next.js loads environment variables from `.env*` files into `process.env`.

Example `.env` file:
```
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

This loads `process.env.DB_HOST`, `process.env.DB_USER`, and `process.env.DB_PASS` into the Node.js environment, allowing usage in data fetching methods and API routes.

Example using `getStaticProps`:
```js
export async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  // ...
}
```

### Loading Environment Variables with `@next/env`

To load environment variables outside of the Next.js runtime, use the `@next/env` package.

Install the package:
```bash
npm install @next/env
```

Load environment variables:
```tsx
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
```

Example configuration:
```tsx
import './envConfig.ts'

export default defineConfig({
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
})
```

### Referencing Other Variables

Next.js expands variables using `$` to reference other variables in `.env*` files.

Example:
```
TWITTER_USER=nextjs
TWITTER_URL=https://x.com/$TWITTER_USER
```

## Bundling Environment Variables for the Browser

Non-`NEXT_PUBLIC_` environment variables are only available in the Node.js environment. To make a variable accessible in the browser, prefix it with `NEXT_PUBLIC_`.

Example:
```
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

This will inline the variable into the JavaScript bundle during `next build`.

Example usage:
```js
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)
```

Dynamic lookups will not be inlined.

### Runtime Environment Variables

Next.js supports both build time and runtime environment variables. By default, environment variables are only available on the server. To expose a variable to the browser, it must be prefixed with `NEXT_PUBLIC_`.

Example for dynamic rendering:
```tsx
import { connection } from 'next/server'

export default async function Component() {
  await connection()
  const value = process.env.MY_VALUE
  // ...
}
```

## Default Environment Variables

You can set defaults in `.env`, `.env.development`, and `.env.production`.

## Environment Variables on Vercel

When deploying to Vercel, configure environment variables in the Project Settings. You can pull Development Environment Variables into a `.env.local` file using:
```bash
vercel env pull
```

## Test Environment Variables

For testing, use a `.env.test` file. This file will not load `.env.local` to ensure consistent test results.

Example for Jest setup:
```js
import { loadEnvConfig } from '@next/env'

export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
```

## Environment Variable Load Order

Environment variables are looked up in the following order:

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (Not checked when `NODE_ENV` is `test`.)
4. `.env.$(NODE_ENV)`
5. `.env`

## Good to know

- If using a `/src` directory, `.env.*` files should remain in the root of your project.
- If `NODE_ENV` is unassigned, Next.js assigns `development` for `next dev` and `production` for other commands.

## Version History

| Version  | Changes                                       |
| -------- | --------------------------------------------- |
| `v9.4.0` | Support for `.env` and `NEXT_PUBLIC_` introduced. |