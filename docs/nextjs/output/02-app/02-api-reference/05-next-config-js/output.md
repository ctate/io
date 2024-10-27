# Output

Next.js automatically traces which files are needed by each page to allow for easy deployment of your application. 

During a build, Next.js will automatically trace each page and its dependencies to determine all of the files that are needed for deploying a production version of your application. This feature helps reduce the size of deployments drastically. Starting with Next.js 12, you can leverage Output File Tracing in the `.next/` directory to only include the necessary files, removing the need for the deprecated `serverless` target.

## How it Works

During `next build`, Next.js uses `@vercel/nft` to statically analyze `import`, `require`, and `fs` usage to determine all files that a page might load. The production server is also traced for its needed files and output at `.next/next-server.js.nft.json`.

To leverage the `.nft.json` files emitted to the `.next` output directory, read the list of files in each trace that are relative to the `.nft.json` file and copy them to your deployment location.

## Automatically Copying Traced Files

Next.js can automatically create a `standalone` folder that copies only the necessary files for a production deployment, including select files in `node_modules`. Enable this in your `next.config.js`:

```js
module.exports = {
  output: 'standalone',
}
```

This creates a folder at `.next/standalone` for deployment without installing `node_modules`. A minimal `server.js` file is also output, which can be used instead of `next start`. This minimal server does not copy the `public` or `.next/static` folders by default, as these should ideally be handled by a CDN.

> Good to know:
> - If your project needs to listen to a specific port or hostname, define `PORT` or `HOSTNAME` environment variables before running `server.js`. For example, run `PORT=8080 HOSTNAME=0.0.0.0 node server.js` to start the server on `http://0.0.0.0:8080`.

## Caveats

- In monorepo setups, the project directory is used for tracing by default. To include files outside of the folder, set `outputFileTracingRoot` in your `next.config.js`:

```js
module.exports = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
}
```

- Next.js might fail to include required files or incorrectly include unused files. Use `outputFileTracingExcludes` and `outputFileTracingIncludes` in `next.config.js` to manage this:

```js
module.exports = {
  outputFileTracingExcludes: {
    '/api/hello': ['./un-necessary-folder/**/*'],
  },
  outputFileTracingIncludes: {
    '/api/another': ['./necessary-folder/**/*'],
    '/api/login/\\[\\[\\.\\.\\.slug\\]\\]': [
      './node_modules/aws-crt/dist/bin/**/*',
    ],
  },
}
```

**Note:** The key of `outputFileTracingIncludes`/`outputFileTracingExcludes` is a glob, so special characters need to be escaped.

- Currently, Next.js does not do anything with the emitted `.nft.json` files. These files must be read by your deployment platform to create a minimal deployment.

## Experimental `turbotrace`

Tracing dependencies can be slow due to complex computations. `turbotrace` in Rust is a faster alternative. To enable it, add the following configuration to your `next.config.js`:

```js
module.exports = {
  experimental: {
    turbotrace: {
      logLevel?: 'bug' | 'fatal' | 'error' | 'warning' | 'hint' | 'note' | 'suggestions' | 'info',
      logDetail?: boolean,
      logAll?: boolean,
      contextDirectory?: string,
      processCwd?: string,
      memoryLimit?: number,
    },
  },
}
```