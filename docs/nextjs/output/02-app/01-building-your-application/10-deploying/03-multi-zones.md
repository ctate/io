# Multi-Zones

Learn how to build micro-frontends using Next.js Multi-Zones to deploy multiple Next.js apps under a single domain.

Multi-Zones are an approach to micro-frontends that separate a large application on a domain into smaller Next.js applications that each serve a set of paths. This is useful when there are collections of pages unrelated to the other pages in the application. By moving those pages to a separate zone (i.e., a separate application), you can reduce the size of each application, improving build times and removing unnecessary code. Since applications are decoupled, Multi-Zones also allow other applications on the domain to use their own choice of framework.

For example, you can split the following set of pages:

- `/blog/*` for all blog posts
- `/dashboard/*` for all pages when the user is logged in to the dashboard
- `/*` for the rest of your website not covered by other zones

With Multi-Zones support, you can create three applications that are served on the same domain and appear the same to the user, but can be developed and deployed independently.

Navigating between pages in the same zone will perform soft navigations, which do not require reloading the page. For example, navigating from `/` to `/products` will be a soft navigation. Navigating from a page in one zone to a page in another zone, such as from `/` to `/dashboard`, will perform a hard navigation, unloading the resources of the current page and loading the resources of the new page. Pages that are frequently visited together should reside in the same zone to avoid hard navigations.

## How to define a zone

A zone is a normal Next.js application where you configure an assetPrefix to avoid conflicts with pages and static files in other zones.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/blog-static',
}
```

Next.js assets, such as JavaScript and CSS, will be prefixed with `assetPrefix` to ensure they don't conflict with assets from other zones. These assets will be served under `/assetPrefix/_next/...` for each zone. The default application handling all paths not routed to another more specific zone does not need an `assetPrefix`.

In versions older than Next.js 15, an additional rewrite may be needed to handle static assets, which is no longer necessary in Next.js 15.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/blog-static',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog-static/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    }
  },
}
```

## How to route requests to the right zone

With the Multi Zones setup, you need to route the paths to the correct zone since they are served by different applications. You can use any HTTP proxy, but one of the Next.js applications can also route requests for the entire domain.

To route to the correct zone using a Next.js application, use rewrites. For each path served by a different zone, add a rewrite rule to send that path to the domain of the other zone.

```js
async rewrites() {
    return [
        {
            source: '/blog',
            destination: `${process.env.BLOG_DOMAIN}/blog`,
        },
        {
            source: '/blog/:path+',
            destination: `${process.env.BLOG_DOMAIN}/blog/:path+`,
        }
    ];
}
```

The destination should be a URL served by the zone, including scheme and domain. This should point to the zone's production domain but can also route requests to localhost in local development.

**Good to know**: URL paths should be unique to a zone. For example, two zones trying to serve `/blog` would create a routing conflict.

### Routing requests using middleware

Routing requests through rewrites is recommended to minimize latency overhead, but middleware can also be used for dynamic routing decisions, such as during a migration.

```js
export async function middleware(request) {
  const { pathname, search } = req.nextUrl;
  if (pathname === '/your-path' && myFeatureFlag.isEnabled()) {
    return NextResponse.rewrite(`${rewriteDomain}${pathname}${search}`);
  }
}
```

## Linking between zones

Links to paths in a different zone should use an `a` tag instead of the Next.js `<Link>` component. This is because Next.js will try to prefetch and soft navigate to any relative path in `<Link>`, which will not work across zones.

## Sharing code

The Next.js applications that make up the different zones can reside in any repository. However, it is often convenient to use a monorepo to share code more easily. For zones in different repositories, code can also be shared using public or private NPM packages.

Since the pages in different zones may be released at different times, feature flags can be useful for enabling or disabling features across the different zones.

For Next.js on Vercel applications, you can use a monorepo to deploy all affected zones with a single `git push`.

## Server Actions

When using Server Actions with Multi-Zones, explicitly allow the user-facing origin since your user-facing domain may serve multiple applications. In your `next.config.js` file, add the following lines:

```js
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['your-production-domain.com'],
    },
  },
}
```

Refer to serverActions.allowedOrigins for more information.