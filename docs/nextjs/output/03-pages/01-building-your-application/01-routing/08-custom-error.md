# Custom Errors

Override and extend the built-in Error page to handle custom errors.

## 404 Page

A 404 page may be accessed frequently. Server-rendering an error page for every visit increases the load on the Next.js server, leading to higher costs and slower experiences. To mitigate this, Next.js provides a static 404 page by default.

### Customizing The 404 Page

To create a custom 404 page, create a `pages/404.js` file. This file is statically generated at build time.

```jsx
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

Good to know: You can use `getStaticProps` inside this page if you need to fetch data at build time.

## 500 Page

Server-rendering an error page for every visit complicates error responses. Next.js provides a static 500 page by default.

### Customizing The 500 Page

To customize the 500 page, create a `pages/500.js` file. This file is statically generated at build time.

```jsx
export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
}
```

Good to know: You can use `getStaticProps` inside this page if you need to fetch data at build time.

### More Advanced Error Page Customizing

500 errors are handled by the `Error` component on both client-side and server-side. To override it, define the file `pages/_error.js`:

```jsx
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
```

`pages/_error.js` is only used in production. In development, an error with the call stack will indicate where the error originated.

### Reusing the Built-in Error Page

To render the built-in error page, import the `Error` component:

```jsx
import Error from 'next/error'

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.status
  const json = await res.json()

  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Next stars: {stars}</div>
}
```

The `Error` component accepts `title` as a property for a text message along with a `statusCode`. If you have a custom `Error` component, ensure to import that instead. `next/error` exports the default component used by Next.js.

### Caveats

- `Error` does not currently support Next.js Data Fetching methods like `getStaticProps` or `getServerSideProps`.
- `_error`, like `_app`, is a reserved pathname. `_error` is used to define customized layouts and behaviors of error pages. Accessing `/_error` directly will render 404 when routed or rendered in a custom server.