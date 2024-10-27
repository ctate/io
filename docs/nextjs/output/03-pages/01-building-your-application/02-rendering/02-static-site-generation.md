# Static Site Generation (SSG)

Use Static Site Generation (SSG) to pre-render pages at build time.

## Examples

- WordPress Example: github.com/vercel/next.js/tree/canary/examples/cms-wordpress (Demo: next-blog-wordpress.vercel.app)
- Blog Starter using markdown files: github.com/vercel/next.js/tree/canary/examples/blog-starter (Demo: next-blog-starter.vercel.app)
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
- Builder.io Example: github.com/vercel/next.js/tree/canary/examples/cms-builder-io (Demo: cms-builder-io.vercel.app)
- TinaCMS Example: github.com/vercel/next.js/tree/canary/examples/cms-tina (Demo: cms-tina-example.vercel.app)
- Static Tweet (Demo: static-tweet.vercel.app)
- Enterspeed Example: github.com/vercel/next.js/tree/canary/examples/cms-enterspeed (Demo: next-blog-demo.enterspeed.com)

## Overview

If a page uses Static Generation, the page HTML is generated at build time. In production, the page HTML is generated when you run `next build`. This HTML will then be reused on each request and can be cached by a CDN.

In Next.js, you can statically generate pages with or without data.

### Static Generation without Data

By default, Next.js pre-renders pages using Static Generation without fetching data.

```jsx
function About() {
  return <div>About</div>
}

export default About
```

### Static Generation with Data

Some pages require fetching external data for pre-rendering. There are two scenarios:

1. Your page content depends on external data: Use `getStaticProps`.
2. Your page paths depend on external data: Use `getStaticPaths` (usually in addition to `getStaticProps`).

#### Scenario 1: Page Content Depends on External Data

Example: A blog page fetching the list of blog posts from a CMS.

```jsx
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}
```

#### Scenario 2: Page Paths Depend on External Data

Example: Creating dynamic routes for blog posts.

```jsx
export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  return { paths, fallback: false }
}

export default function Post({ post }) {
  // Render post...
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}
```

### When to Use Static Generation

Use Static Generation whenever possible for faster page loads. Suitable for:

- Marketing pages
- Blog posts and portfolios
- E-commerce product listings
- Help and documentation

Ask: "Can I pre-render this page ahead of a user's request?" If yes, choose Static Generation.

Not suitable for pages with frequently updated data. Alternatives include:

- Static Generation with Client-side data fetching.
- Server-Side Rendering: Pre-renders a page on each request, slower but always up-to-date.