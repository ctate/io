# Custom App

Control page initialization and add a layout that persists for all pages by overriding the default App component used by Next.js.

Next.js uses the `App` component to initialize pages. You can override it to:

- Create a shared layout between page changes
- Inject additional data into pages
- Add global CSS

## Usage

To override the default `App`, create the file `pages/_app` as shown below:

```tsx
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

```jsx
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

The `Component` prop is the active `page`, so whenever you navigate between routes, `Component` will change to the new `page`. Any props you send to `Component` will be received by the `page`.

`pageProps` is an object with the initial props that were preloaded for your page by one of the data fetching methods, otherwise it's an empty object.

> **Good to know**:
>
> - If your app is running and you added a custom `App`, you'll need to restart the development server. This is only required if `pages/_app.js` didn't exist before.
> - `App` does not support Next.js Data Fetching methods like `getStaticProps` or `getServerSideProps`.

## `getInitialProps` with `App`

Using `getInitialProps` in `App` will disable Automatic Static Optimization for pages without `getStaticProps`.

**We do not recommend using this pattern.** Instead, consider incrementally adopting the App Router, which allows you to more easily fetch data for pages and layouts.

```tsx
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'

type AppOwnProps = { example: string }

export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx, example: 'data' }
}
```

```jsx
import App from 'next/app'

export default function MyApp({ Component, pageProps, example }) {
  return (
    <>
      <p>Data: {example}</p>
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx, example: 'data' }
}
```