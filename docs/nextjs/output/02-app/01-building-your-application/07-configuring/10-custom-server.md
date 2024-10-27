# Custom Server

Start a Next.js app programmatically using a custom server.

Next.js includes its own server with `next start` by default. If you have an existing backend, you can still use it with Next.js (this is not a custom server). A custom Next.js server allows you to programmatically start a server for custom patterns. The majority of the time, you will not need this approach. However, it's available if you need to eject.

**Good to know**:
- Before deciding to use a custom server, keep in mind that it should only be used when the integrated router of Next.js can't meet your app requirements. A custom server will remove important performance optimizations, like Automatic Static Optimization.
- A custom server cannot be deployed on Vercel.
- When using standalone output mode, it does not trace custom server files. This mode outputs a separate minimal `server.js` file, instead. These cannot be used together.

Example of a custom server:

```ts
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
```

```js
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
```

`server.js` does not run through the Next.js Compiler or bundling process. Ensure the syntax and source code this file requires are compatible with the current Node.js version you are using.

To run the custom server, update the `scripts` in `package.json`:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

Alternatively, you can set up `nodemon`. The custom server uses the following import to connect the server with the Next.js application:

```js
import next from 'next'

const app = next({})
```

The `next` import is a function that receives an object with the following options:

| Option         | Type               | Description                                                                         |
| -------------- | ------------------ | ----------------------------------------------------------------------------------- |
| `conf`         | `Object`           | The same object you would use in `next.config.js`. Defaults to `{}`                 |
| `customServer` | `Boolean`          | (_Optional_) Set to false when the server was created by Next.js                    |
| `dev`          | `Boolean`          | (_Optional_) Whether or not to launch Next.js in dev mode. Defaults to `false`      |
| `dir`          | `String`           | (_Optional_) Location of the Next.js project. Defaults to `'.'`                     |
| `quiet`        | `Boolean`          | (_Optional_) Hide error messages containing server information. Defaults to `false` |
| `hostname`     | `String`           | (_Optional_) The hostname the server is running behind                              |
| `port`         | `Number`           | (_Optional_) The port the server is running behind                                  |
| `httpServer`   | `node:http#Server` | (_Optional_) The HTTP Server that Next.js is running behind                         |
| `turbo`        | `Boolean`          | (_Optional_) Enable Turbopack                                                       |

The returned `app` can then be used to let Next.js handle requests as required.

## Disabling file-system routing

By default, Next.js will serve each file in the `pages` folder under a pathname matching the filename. If your project uses a custom server, this behavior may result in the same content being served from multiple paths, which can present problems with SEO and UX.

To disable this behavior, open `next.config.js` and disable the `useFileSystemPublicRoutes` config:

```js
module.exports = {
  useFileSystemPublicRoutes: false,
}
```

Note that `useFileSystemPublicRoutes` disables filename routes from SSR; client-side routing may still access those paths. When using this option, guard against navigation to routes you do not want programmatically.

You may also wish to configure the client-side router to disallow client-side redirects to filename routes.