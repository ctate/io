# Runtime Config

Add client and server runtime configuration to your Next.js app.

**Warning:**
- This feature is deprecated. We recommend using environment variables instead, which can also support reading runtime values.
- You can run code on server startup using the `register` function.
- This feature does not work with Automatic Static Optimization, Output File Tracing, or React Server Components.

To add runtime configuration to your app, open `next.config.js` and add the `publicRuntimeConfig` and `serverRuntimeConfig` configs:

```js
module.exports = {
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
}
```

Place any server-only runtime config under `serverRuntimeConfig`. Anything accessible to both client and server-side code should be under `publicRuntimeConfig`.

A page that relies on `publicRuntimeConfig` must use `getInitialProps` or `getServerSideProps`, or your application must have a Custom App with `getInitialProps` to opt-out of Automatic Static Optimization. Runtime configuration won't be available to any page (or component in a page) without being server-side rendered.

To access the runtime configs in your app, use `next/config`:

```jsx
import getConfig from 'next/config'
import Image from 'next/image'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
console.log(serverRuntimeConfig.mySecret)
console.log(publicRuntimeConfig.staticFolder)

function MyImage() {
  return (
    <div>
      <Image
        src={`${publicRuntimeConfig.staticFolder}/logo.png`}
        alt="logo"
        layout="fill"
      />
    </div>
  )
}

export default MyImage
```