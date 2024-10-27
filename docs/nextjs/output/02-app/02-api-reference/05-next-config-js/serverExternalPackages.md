# serverExternalPackages

Opt-out specific dependencies from the Server Components bundling and use native Node.js `require`.

Dependencies used inside Server Components and Route Handlers will automatically be bundled by Next.js. If a dependency is using Node.js specific features, you can choose to opt-out specific dependencies from the Server Components bundling.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@acme/ui'],
}

module.exports = nextConfig
```

Next.js includes a short list of popular packages that currently are working on compatibility and automatically opted out:

- @appsignal/nodejs
- @aws-sdk/client-s3
- @aws-sdk/s3-presigned-post
- @blockfrost/blockfrost-js
- @highlight-run/node
- @jpg-store/lucid-cardano
- @libsql/client
- @mikro-orm/core
- @mikro-orm/knex
- @node-rs/argon2
- @node-rs/bcrypt
- @prisma/client
- @react-pdf/renderer
- @sentry/profiling-node
- @sparticuz/chromium
- @swc/core
- argon2
- autoprefixer
- aws-crt
- bcrypt
- better-sqlite3
- canvas
- cpu-features
- cypress
- dd-trace
- eslint
- express
- firebase-admin
- import-in-the-middle
- isolated-vm
- jest
- jsdom
- keyv
- libsql
- mdx-bundler
- mongodb
- mongoose
- newrelic
- next-mdx-remote
- next-seo
- node-cron
- node-pty
- node-web-audio-api
- oslo
- pg
- playwright
- playwright-core
- postcss
- prettier
- prisma
- puppeteer-core
- puppeteer
- require-in-the-middle
- rimraf
- sharp
- shiki
- sqlite3
- ts-node
- ts-morph
- typescript
- vscode-oniguruma
- webpack
- websocket
- zeromq

Version Changes:
- v15.0.0: Moved from experimental to stable. Renamed from serverComponentsExternalPackages to serverExternalPackages.