# Custom Document

A custom `Document` can update the `<html>` and `<body>` tags used to render a Page.

To override the default `Document`, create the file `pages/_document` as shown below:

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

```jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

**Good to know**:
- `_document` is only rendered on the server, so event handlers like `onClick` cannot be used in this file.
- `<Html>`, `<Head />`, `<Main />`, and `<NextScript />` are required for the page to be properly rendered.

## Caveats

- The `<Head />` component used in `_document` is not the same as `next/head`. The `<Head />` component here should only be used for any `<head>` code that is common for all pages. For all other cases, such as `<title>` tags, use `next/head` in your pages or components.
- React components outside of `<Main />` will not be initialized by the browser. Do not add application logic here or custom CSS (like `styled-jsx`). For shared components in all pages (like a menu or a toolbar), refer to Layouts.
- `Document` does not support Next.js Data Fetching methods like `getStaticProps` or `getServerSideProps`.

## Customizing `renderPage`

Customizing `renderPage` is advanced and only needed for libraries like CSS-in-JS to support server-side rendering. This is not needed for built-in `styled-jsx` support.

**We do not recommend using this pattern.** Instead, consider incrementally adopting the App Router, which allows you to more easily fetch data for pages and layouts.

```tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })

    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })

    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

**Good to know**:
- `getInitialProps` in `_document` is not called during client-side transitions.
- The `ctx` object for `_document` is equivalent to the one received in `getInitialProps`, with the addition of `renderPage`.