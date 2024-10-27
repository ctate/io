# Draft Mode

Draft Mode allows you to preview draft content from your headless CMS in your Next.js application. This is useful for static pages generated at build time, enabling you to switch to dynamic rendering and see draft changes without rebuilding your entire site.

## Step 1: Create a Route Handler

Create a Route Handler, for example, `app/api/draft/route.ts`.

```ts
export async function GET(request: Request) {
  return new Response('')
}
```

```js
export async function GET() {
  return new Response('')
}
```

Import the `draftMode` function and call the `enable()` method.

```ts
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.enable()
  return new Response('Draft mode is enabled')
}
```

```js
import { draftMode } from 'next/headers'

export async function GET(request) {
  const draft = await draftMode()
  draft.enable()
  return new Response('Draft mode is enabled')
}
```

This sets a cookie to enable draft mode. Subsequent requests with this cookie will trigger draft mode and alter the behavior of statically generated pages. Test this by visiting `/api/draft` and checking the `Set-Cookie` response header for a cookie named `__prerender_bypass`.

## Step 2: Access the Route Handler from your Headless CMS

These steps assume your headless CMS supports custom draft URLs. If not, you can still secure your draft URLs but will need to construct and access them manually.

1. Create a secret token string known only to your Next.js app and your headless CMS.
2. If your headless CMS supports custom draft URLs, specify a draft URL, e.g.:

```bash
https://<your-site>/api/draft?secret=<token>&slug=<path>
```

- `<your-site>`: your deployment domain.
- `<token>`: the secret token you generated.
- `<path>`: the path for the page you want to view (e.g., `&slug=/posts/one`).

3. In your Route Handler, check that the secret matches and that the `slug` parameter exists. If valid, call `draftMode.enable()` to set the cookie and redirect to the specified `slug`:

```ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== 'MY_SECRET_TOKEN' || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(post.slug)
}
```

```js
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== 'MY_SECRET_TOKEN' || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(post.slug)
}
```

If successful, the browser will redirect to the desired path with the draft mode cookie.

## Step 3: Preview the Draft Content

Update your page to check the value of `draftMode().isEnabled`. If the cookie is set, data will be fetched at request time instead of build time, and `isEnabled` will be `true`.

```tsx
import { draftMode } from 'next/headers'

async function getData() {
  const { isEnabled } = await draftMode()

  const url = isEnabled
    ? 'https://draft.example.com'
    : 'https://production.example.com'

  const res = await fetch(url)

  return res.json()
}

export default async function Page() {
  const { title, desc } = await getData()

  return (
    <main>
      <h1>{title}</h1>
      <p>{desc}</p>
    </main>
  )
}
```

```jsx
import { draftMode } from 'next/headers'

async function getData() {
  const { isEnabled } = await draftMode()

  const url = isEnabled
    ? 'https://draft.example.com'
    : 'https://production.example.com'

  const res = await fetch(url)

  return res.json()
}

export default async function Page() {
  const { title, desc } = await getData()

  return (
    <main>
      <h1>{title}</h1>
      <p>{desc}</p>
    </main>
  )
}
```

Access the draft Route Handler (with `secret` and `slug`) from your headless CMS or manually using the URL to view the draft content. If you update your draft without publishing, you should be able to see the draft.