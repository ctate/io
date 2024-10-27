# Deploying

Learn how to deploy your Next.js app to production, either managed or self-hosted.

Congratulations, it's time to ship to production.

You can deploy managed Next.js with Vercel, or self-host on a Node.js server, Docker image, or even static HTML files. When deploying using `next start`, all Next.js features are supported.

## Production Builds

Running `next build` generates an optimized version of your application for production. HTML, CSS, and JavaScript files are created based on your pages. JavaScript is compiled and browser bundles are minified using the Next.js Compiler to help achieve the best performance and support all modern browsers.

Next.js produces a standard deployment output used by managed and self-hosted Next.js, ensuring all features are supported across both methods of deployment.

## Managed Next.js with Vercel

Vercel, the creators and maintainers of Next.js, provide managed infrastructure and a developer experience platform for your Next.js applications.

Deploying to Vercel is zero-configuration and provides additional enhancements for scalability, availability, and performance globally. However, all Next.js features are still supported when self-hosted.

## Self-Hosting

You can self-host Next.js in three different ways:

- A Node.js server
- A Docker container
- A static export

### Node.js Server

Next.js can be deployed to any hosting provider that supports Node.js. Ensure your `package.json` has the `"build"` and `"start"` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Run `npm run build` to build your application, then run `npm run start` to start the Node.js server. This server supports all Next.js features.

### Docker Image

Next.js can be deployed to any hosting provider that supports Docker containers. This approach is suitable for container orchestrators such as Kubernetes or when running inside a container in any cloud provider.

1. Install Docker on your machine.
2. Clone the example repository.
3. Build your container: `docker build -t nextjs-docker .`
4. Run your container: `docker run -p 3000:3000 nextjs-docker`

Next.js through Docker supports all Next.js features.

### Static HTML Export

Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.

Since Next.js supports static export, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets, including tools like AWS S3, Nginx, or Apache.

Running as a static export does not support Next.js features that require a server.

## Features

### Image Optimization

Image Optimization through `next/image` works self-hosted with zero configuration when deploying using `next start`. If you prefer a separate service to optimize images, you can configure an image loader.

Image Optimization can be used with a static export by defining a custom image loader in `next.config.js`. Note that images are optimized at runtime, not during the build.

### Middleware

Middleware works self-hosted with zero configuration when deploying using `next start`. It requires access to the incoming request and is not supported when using a static export.

### Environment Variables

Next.js supports both build time and runtime environment variables. By default, environment variables are only available on the server. To expose an environment variable to the browser, it must be prefixed with `NEXT_PUBLIC_`.

To read runtime environment variables, use `getServerSideProps` or incrementally adopt the App Router.

### Caching and ISR

Next.js can cache responses, generated static pages, build outputs, and other static assets like images, fonts, and scripts. Caching and revalidating pages use the same shared cache, stored on disk by default.

#### Automatic Caching

Next.js sets the `Cache-Control` header for immutable assets and dynamically rendered pages to prevent user-specific data from being cached.

#### Static Assets

You can host static assets on a different domain or CDN using the `assetPrefix` configuration in `next.config.js`.

#### Configuring Caching

Generated cache assets will be stored in memory and on disk. You can configure the Next.js cache location to share the cache across multiple containers or instances.

### Build Cache

Next.js generates an ID during `next build` to identify which version of your application is being served. Use the `generateBuildId` command in `next.config.js` to ensure consistent build IDs across containers.

### Version Skew

Next.js mitigates most instances of version skew and automatically reloads the application to retrieve new assets when detected.

### Streaming and Suspense

The Next.js App Router supports streaming responses when self-hosting. Configure your proxy to disable buffering to enable streaming.

### Partial Prerendering

Partial Prerendering works by default with Next.js and is not a CDN feature.

### Usage with CDNs

When using a CDN, the page will include `Cache-Control: private` response header for dynamic APIs, ensuring the resulting HTML page is marked as non-cachable.

## Manual Graceful Shutdowns

When self-hosting, you might want to run code when the server shuts down on `SIGTERM` or `SIGINT` signals. Set the env variable `NEXT_MANUAL_SIG_HANDLE` to `true` and register a handler for that signal inside your `_document.js` file.