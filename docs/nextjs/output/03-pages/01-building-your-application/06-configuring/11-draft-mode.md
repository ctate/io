# Draft Mode

Next.js has draft mode to toggle between static and dynamic pages. You can learn how it works with Pages Router.

In the Pages documentation and the Data Fetching documentation, we discussed how to pre-render a page at build time (Static Generation) using `getStaticProps` and `getStaticPaths`.

Static Generation is useful when your pages fetch data from a headless CMS. However, it’s not ideal when you’re writing a draft on your headless CMS and want to view the draft immediately on your page. You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content. Next.js has a feature called Draft Mode which solves this problem. Here are instructions on how to use it.

## Step 1: Create and access the API route

First, create the API route. It can have any name, e.g., `pages/api/draft.ts`.

In this API route, you need to call `setDraftMode` on the response object.

```js
export default function handler(req, res) {
  res.setDraftMode({ enable: true });
}
```

This will set a cookie to enable draft mode. Subsequent requests containing this cookie will trigger Draft Mode, changing the behavior for statically generated pages.

You can test this manually by creating an API route like below and accessing it from your browser:

```ts filename="pages/api/draft.ts"
export default function handler(req, res) {
  res.setDraftMode({ enable: true });
  res.end('Draft mode is enabled');
}
```

If you open your browser’s developer tools and visit `/api/draft`, you’ll notice a `Set-Cookie` response header with a cookie named `__prerender_bypass`.

### Securely accessing it from your Headless CMS

You’d want to call this API route securely from your headless CMS. The specific steps will vary depending on which headless CMS you’re using, but here are some common steps:

1. Create a secret token string using a token generator. This secret will only be known by your Next.js app and your headless CMS.
2. If your headless CMS supports setting custom draft URLs, specify the following as the draft URL:

```bash filename="Terminal"
https://<your-site>/api/draft?secret=<token>&slug=<path>
```

- `<your-site>` should be your deployment domain.
- `<token>` should be replaced with the secret token you generated.
- `<path>` should be the path for the page that you want to view.

3. In the draft API route:
   - Check that the secret matches and that the `slug` parameter exists.
   - Call `res.setDraftMode`.
   - Redirect the browser to the path specified by `slug`.

```js
export default async (req, res) => {
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const post = await getPostBySlug(req.query.slug);

  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setDraftMode({ enable: true });
  res.redirect(post.slug);
}
```

If it succeeds, the browser will be redirected to the path you want to view with the draft mode cookie.

## Step 2: Update `getStaticProps`

Update `getStaticProps` to support draft mode. If you request a page with `getStaticProps` and the cookie is set, `getStaticProps` will be called at request time.

```js
export async function getStaticProps(context) {
  if (context.draftMode) {
    // dynamic data
  }
}
```

You can fetch different data based on `context.draftMode`.

```js
export async function getStaticProps(context) {
  const url = context.draftMode
    ? 'https://draft.example.com'
    : 'https://production.example.com';
  const res = await fetch(url);
  // ...
}
```

Access the draft API route (with `secret` and `slug`) from your headless CMS or manually to see the draft content.

## More Details

### Clear the Draft Mode cookie

To clear the Draft Mode cookie manually, create an API route that calls `setDraftMode({ enable: false })`:

```ts filename="pages/api/disable-draft.ts"
export default function handler(req, res) {
  res.setDraftMode({ enable: false });
}
```

Send a request to `/api/disable-draft` to invoke the API Route.

### Works with `getServerSideProps`

Draft Mode works with `getServerSideProps`, available as a `draftMode` key in the context object.

### Works with API Routes

API Routes will have access to `draftMode` on the request object.

```js
export default function myApiRoute(req, res) {
  if (req.draftMode) {
    // get draft data
  }
}
```

### Unique per `next build`

A new bypass cookie value will be generated each time you run `next build`. This ensures that the bypass cookie can’t be guessed. To test Draft Mode locally over HTTP, your browser will need to allow third-party cookies and local storage access.