# Version 15

Upgrade your Next.js Application from Version 14 to 15.

## Upgrading from 14 to 15

To update to Next.js version 15, use the `upgrade` codemod:

```bash
npx @next/codemod@canary upgrade latest
```

For manual installation, ensure you install the latest Next & React RC:

```bash
npm i next@canary react@rc react-dom@rc eslint-config-next@rc
```

**Good to know:**
- If you see a peer dependencies warning, update `react` and `react-dom` to the suggested versions, or use the `--force` or `--legacy-peer-deps` flag to ignore the warning. This won't be necessary once both Next.js 15 and React 19 are stable.
- If using TypeScript, temporarily override the React types. Refer to the React 19 RC upgrade guide for more information.

## React 19

- Minimum versions of `react` and `react-dom` is now 19.
- `useFormState` is replaced by `useActionState`, which is recommended and includes additional properties like reading the `pending` state directly.
- `useFormStatus` now includes additional keys like `data`, `method`, and `action`. If not using React 19, only the `pending` key is available.

## Async Request APIs (Breaking change)

Previously synchronous Dynamic APIs that rely on runtime information are now **asynchronous**:

- `cookies`
- `headers`
- `draftMode`
- `params` in `layout.js`, `page.js`, `route.js`, `default.js`, `opengraph-image`, `twitter-image`, `icon`, and `apple-icon`.
- `searchParams` in `page.js`

A codemod is available to automate the migration, and the APIs can temporarily be accessed synchronously.

### `cookies`

#### Recommended Async Usage

```tsx
import { cookies } from 'next/headers'

const cookieStore = await cookies()
const token = cookieStore.get('token')
```

#### Temporary Synchronous Usage

```tsx
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers'

const cookieStore = cookies() as unknown as UnsafeUnwrappedCookies
const token = cookieStore.get('token') // will log a warning in dev
```

### `headers`

#### Recommended Async Usage

```tsx
import { headers } from 'next/headers'

const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

#### Temporary Synchronous Usage

```tsx
import { headers, type UnsafeUnwrappedHeaders } from 'next/headers'

const headersList = headers() as unknown as UnsafeUnwrappedHeaders
const userAgent = headersList.get('user-agent') // will log a warning in dev
```

### `draftMode`

#### Recommended Async Usage

```tsx
import { draftMode } from 'next/headers'

const { isEnabled } = await draftMode()
```

#### Temporary Synchronous Usage

```tsx
import { draftMode, type UnsafeUnwrappedDraftMode } from 'next/headers'

const { isEnabled } = draftMode() as unknown as UnsafeUnwrappedDraftMode // will log a warning in dev
```

### `params` & `searchParams`

#### Asynchronous Layout

```tsx
type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { slug } = await params
}
```

#### Synchronous Layout

```tsx
import { use } from 'react'

type Params = Promise<{ slug: string }>

export default function Layout(props: { children: React.ReactNode; params: Params }) {
  const params = use(props.params)
  const slug = params.slug
}
```

#### Asynchronous Page

```tsx
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}

export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
}
```

#### Synchronous Page

```tsx
import { use } from 'react'

type Params = Promise<{ slug: string }>
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const slug = params.slug
  const query = searchParams.query
}
```

#### Route Handlers

```tsx
type Params = Promise<{ slug: string }>

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const slug = params.slug
}
```

<AppOnly>

## `runtime` configuration (Breaking change)

The `runtime` segment configuration previously supported a value of `experimental-edge` in addition to `edge`. Update your `runtime` configuration to `edge`. A codemod is available to automate this.

</AppOnly>

## `fetch` requests

`fetch` requests are no longer cached by default. To opt specific `fetch` requests into caching, pass the `cache: 'force-cache'` option.

To opt all `fetch` requests in a layout or page into caching, use the `export const fetchCache = 'default-cache'` segment config option.

## Route Handlers

`GET` functions in Route Handlers are no longer cached by default. To opt `GET` methods into caching, use a route config option such as `export const dynamic = 'force-static'`.

## Client-side Router Cache

When navigating between pages via `<Link>` or `useRouter`, page segments are no longer reused from the client-side router cache. To opt page segments into caching, use the `staleTimes` config option.

## `next/font`

The `@next/font` package has been removed in favor of the built-in `next/font`. A codemod is available to safely and automatically rename your imports.

## bundlePagesRouterDependencies

`experimental.bundlePagesExternals` is now stable and renamed to `bundlePagesRouterDependencies`.

## serverExternalPackages

`experimental.serverComponentsExternalPackages` is now stable and renamed to `serverExternalPackages`.

## Speed Insights

Auto instrumentation for Speed Insights was removed in Next.js 15. Follow the Vercel Speed Insights Quickstart guide to continue using Speed Insights.

## `NextRequest` Geolocation

The `geo` and `ip` properties on `NextRequest` have been removed. A codemod is available to automate this migration. If using Vercel, use the `geolocation` and `ipAddress` functions from `@vercel/functions` instead.