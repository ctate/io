# Internationalization (i18n) Routing

Next.js has built-in support for internationalized (i18n) routing since v10.0.0. You can provide a list of locales, the default locale, and domain-specific locales, and Next.js will automatically handle the routing.

The i18n routing support complements existing i18n library solutions like react-intl, react-i18next, lingui, rosetta, next-intl, next-translate, next-multilingual, tolgee, and paraglide-next by streamlining routes and locale parsing.

## Getting Started

To get started, add the `i18n` config to your `next.config.js` file. Locales are UTS Locale Identifiers, a standardized format for defining locales.

Examples of Locale Identifiers:
- `en-US` - English as spoken in the United States
- `nl-NL` - Dutch as spoken in the Netherlands
- `nl` - Dutch, no specific region

If a user locale is `nl-BE` and it is not listed in your configuration, they will be redirected to `nl` if available, or to the default locale otherwise. It is good practice to include country locales that will act as fallbacks.

```js
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
        http: true,
      },
    ],
  },
}
```

## Locale Strategies

### Sub-path Routing

Sub-path Routing puts the locale in the URL path.

```js
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
}
```

Available URLs for `pages/blog.js`:
- `/blog`
- `/fr/blog`
- `/nl-nl/blog`

### Domain Routing

Domain routing allows locales to be served from different domains.

```js
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL', 'nl-BE'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
        locales: ['nl-BE'],
      },
    ],
  },
}
```

Available URLs for `pages/blog.js`:
- `example.com/blog`
- `www.example.com/blog`
- `example.fr/blog`
- `example.nl/blog`
- `example.nl/nl-BE/blog`

## Automatic Locale Detection

Next.js will try to automatically detect the user's preferred locale based on the `Accept-Language` header and the current domain. If a locale other than the default is detected, the user will be redirected accordingly.

### Prefixing the Default Locale

With Next.js 12 and Middleware, you can add a prefix to the default locale.

```js
module.exports = {
  i18n: {
    locales: ['default', 'en', 'de', 'fr'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
}
```

Middleware example:

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url))
  }
}
```

### Disabling Automatic Locale Detection

Disable automatic locale detection with:

```js
module.exports = {
  i18n: {
    localeDetection: false,
  },
}
```

## Accessing Locale Information

Access locale information via the Next.js router using the `useRouter()` hook. Available properties:
- `locale` - currently active locale
- `locales` - all configured locales
- `defaultLocale` - configured default locale

## Transition Between Locales

Use `next/link` or `next/router` to transition between locales.

Example with `next/link`:

```jsx
import Link from 'next/link'

export default function IndexPage() {
  return (
    <Link href="/another" locale="fr">
      To /fr/another
    </Link>
  )
}
```

Example with `next/router`:

```jsx
import { useRouter } from 'next/router'

export default function IndexPage() {
  const router = useRouter()

  return (
    <div onClick={() => router.push('/another', '/another', { locale: 'fr' })}>
      to /fr/another
    </div>
  )
}
```

## Leveraging the `NEXT_LOCALE` Cookie

Set a `NEXT_LOCALE=the-locale` cookie to take priority over the accept-language header. This cookie can be set using a language switcher.

## Search Engine Optimization

Next.js automatically adds the `lang` attribute to the `<html>` tag. Add `hreflang` meta tags using next/head.

## Static Generation

Internationalized Routing does not integrate with `output: 'export'`. For pages using `getStaticProps` with Dynamic Routes, return all locale variants from `getStaticPaths`.

Example:

```jsx
export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      { params: { slug: 'post-1' }, locale: 'en-US' },
      { params: { slug: 'post-1' }, locale: 'fr' },
    ],
    fallback: true,
  }
}
```

## Limits for the i18n Config

- `locales`: 100 total locales
- `domains`: 100 total locale domain items

These limits are to prevent potential performance issues at build time. Workarounds can be implemented using Middleware in Next.js 12.