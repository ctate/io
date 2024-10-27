# Preview Mode

Next.js has the preview mode for statically generated pages. This feature is superseded by Draft Mode.

## Examples

- WordPress Example: github.com/vercel/next.js/tree/canary/examples/cms-wordpress (Demo: next-blog-wordpress.vercel.app)
- DatoCMS Example: github.com/vercel/next.js/tree/canary/examples/cms-datocms (Demo: next-blog-datocms.vercel.app)
- TakeShape Example: github.com/vercel/next.js/tree/canary/examples/cms-takeshape (Demo: next-blog-takeshape.vercel.app)
- Sanity Example: github.com/vercel/next.js/tree/canary/examples/cms-sanity (Demo: next-blog-sanity.vercel.app)
- Prismic Example: github.com/vercel/next.js/tree/canary/examples/cms-prismic (Demo: next-blog-prismic.vercel.app)
- Contentful Example: github.com/vercel/next.js/tree/canary/examples/cms-contentful (Demo: next-blog-contentful.vercel.app)
- Strapi Example: github.com/vercel/next.js/tree/canary/examples/cms-strapi (Demo: next-blog-strapi.vercel.app)
- Prepr Example: github.com/vercel/next.js/tree/canary/examples/cms-prepr (Demo: next-blog-prepr.vercel.app)
- Agility CMS Example: github.com/vercel/next.js/tree/canary/examples/cms-agilitycms (Demo: next-blog-agilitycms.vercel.app)
- Cosmic Example: github.com/vercel/next.js/tree/canary/examples/cms-cosmic (Demo: next-blog-cosmic.vercel.app)
- ButterCMS Example: github.com/vercel/next.js/tree/canary/examples/cms-buttercms (Demo: next-blog-buttercms.vercel.app)
- Storyblok Example: github.com/vercel/next.js/tree/canary/examples/cms-storyblok (Demo: next-blog-storyblok.vercel.app)
- GraphCMS Example: github.com/vercel/next.js/tree/canary/examples/cms-graphcms (Demo: next-blog-graphcms.vercel.app)
- Kontent Example: github.com/vercel/next.js/tree/canary/examples/cms-kontent-ai (Demo: next-blog-kontent.vercel.app)
- Umbraco Heartcore Example: github.com/vercel/next.js/tree/canary/examples/cms-umbraco-heartcore (Demo: next-blog-umbraco-heartcore.vercel.app)
- Plasmic Example: github.com/vercel/next.js/tree/canary/examples/cms-plasmic (Demo: nextjs-plasmic-example.vercel.app)
- Enterspeed Example: github.com/vercel/next.js/tree/canary/examples/cms-enterspeed (Demo: next-blog-demo.enterspeed.com)
- Makeswift Example: github.com/vercel/next.js/tree/canary/examples/cms-makeswift (Demo: nextjs-makeswift-example.vercel.app)

In the Pages documentation and the Data Fetching documentation, we discussed how to pre-render a page at build time (Static Generation) using `getStaticProps` and `getStaticPaths`.

Static Generation is useful when your pages fetch data from a headless CMS. However, it’s not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page. You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content. Next.js has a feature called Preview Mode which solves this problem.

## Step 1: Create and access a preview API route

First, create a preview API route, e.g., `pages/api/preview.js`.

In this API route, call `setPreviewData` on the response object. The argument for `setPreviewData` should be an object, e.g., `{}`.

```js
export default function handler(req, res) {
  res.setPreviewData({})
}
```

`res.setPreviewData` sets cookies on the browser which turns on the preview mode. Any requests to Next.js containing these cookies will be considered as the preview mode.

You can test this manually by creating an API route and accessing it from your browser:

```js
export default function handler(req, res) {
  res.setPreviewData({})
  res.end('Preview mode enabled')
}
```

If you open your browser’s developer tools and visit `/api/preview`, you’ll notice that the `__prerender_bypass` and `__next_preview_data` cookies will be set.

### Securely accessing it from your Headless CMS

To call this API route securely from your headless CMS, follow these steps:

1. Create a secret token string using a token generator. This secret will only be known by your Next.js app and your headless CMS.
2. If your headless CMS supports setting custom preview URLs, specify the following as the preview URL:

```bash
https://<your-site>/api/preview?secret=<token>&slug=<path>
```

3. In the preview API route, check that the secret matches and that the `slug` parameter exists. Call `res.setPreviewData` and redirect the browser to the path specified by `slug`.

```js
export default async (req, res) => {
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const post = await getPostBySlug(req.query.slug)

  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({})
  res.redirect(post.slug)
}
```

## Step 2: Update `getStaticProps`

Update `getStaticProps` to support the preview mode. If you request a page with the preview mode cookies set, `getStaticProps` will be called at request time.

```js
export async function getStaticProps(context) {
  // context.preview will be true if preview mode is enabled
  // context.previewData will contain the data passed to setPreviewData
}
```

You can use `context.preview` to modify the API endpoint URL to fetch different data based on the preview mode.

```js
export async function getStaticProps(context) {
  const res = await fetch(`https://.../${context.preview ? 'preview' : ''}`)
}
```

## More Details

### Specify the Preview Mode duration

`setPreviewData` takes an optional second parameter for options:

- `maxAge`: Specifies the duration for the preview session.
- `path`: Specifies the path the cookie should be applied under.

```js
setPreviewData(data, {
  maxAge: 60 * 60,
  path: '/about',
})
```

### Clear the Preview Mode cookies

To clear the Preview Mode cookies manually, create an API route that calls `clearPreviewData()`:

```js
export default function handler(req, res) {
  res.clearPreviewData({})
}
```

### `previewData` size limits

Preview data is limited to 2KB due to cookie size limitations.

### Works with `getServerSideProps`

Preview mode also works with `getServerSideProps`, providing access to `preview` and `previewData` in the context object.

### Works with API Routes

API Routes will have access to `preview` and `previewData` under the request object.

```js
export default function myApiRoute(req, res) {
  const isPreview = req.preview
  const previewData = req.previewData
}
```

### Unique per `next build`

The bypass cookie value and the private key for encrypting the `previewData` change with each `next build`, ensuring security.

To test Preview Mode locally over HTTP, your browser will need to allow third-party cookies and local storage access.