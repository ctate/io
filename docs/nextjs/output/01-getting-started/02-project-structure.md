# Next.js Project Structure

This page provides an overview of the project structure of a Next.js application. It covers top-level files and folders, configuration files, and routing conventions within the `app` and `pages` directories.

## Top-level Folders

Top-level folders are used to organize your application's code and static assets.

| Folder | Description |
| --- | --- |
| `app` | App Router |
| `pages` | Pages Router |
| `public` | Static assets to be served |
| `src` | Optional application source folder |

## Top-level Files

Top-level files are used to configure your application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.

| File | Description |
| --- | --- |
| `next.config.js` | Configuration file for Next.js |
| `package.json` | Project dependencies and scripts |
| `instrumentation.ts` | OpenTelemetry and Instrumentation file |
| `middleware.ts` | Next.js request middleware |
| `.env` | Environment variables |
| `.env.local` | Local environment variables |
| `.env.production` | Production environment variables |
| `.env.development` | Development environment variables |
| `.eslintrc.json` | Configuration file for ESLint |
| `.gitignore` | Git files and folders to ignore |
| `next-env.d.ts` | TypeScript declaration file for Next.js |
| `tsconfig.json` | Configuration file for TypeScript |
| `jsconfig.json` | Configuration file for JavaScript |

## `app` Routing Conventions

The following file conventions are used to define routes and handle metadata in the `app` router.

### Routing Files

| File | Description |
| --- | --- |
| `layout` | Layout |
| `page` | Page |
| `loading` | Loading UI |
| `not-found` | Not found UI |
| `error` | Error UI |
| `global-error` | Global error UI |
| `route` | API endpoint |
| `template` | Re-rendered layout |
| `default` | Parallel route fallback page |

### Nested Routes

| Folder | Description |
| --- | --- |
| `folder` | Route segment |
| `folder/folder` | Nested route segment |

### Dynamic Routes

| Folder | Description |
| --- | --- |
| `[folder]` | Dynamic route segment |
| `[...folder]` | Catch-all route segment |
| `[[...folder]]` | Optional catch-all route segment |

### Route Groups and Private Folders

| Folder | Description |
| --- | --- |
| `(folder)` | Group routes without affecting routing |
| `_folder` | Opt folder and all child segments out of routing |

### Parallel and Intercepted Routes

| Folder | Description |
| --- | --- |
| `@folder` | Named slot |
| `(.)folder` | Intercept same level |
| `(..)folder` | Intercept one level above |
| `(..)(..)folder` | Intercept two levels above |
| `(...)folder` | Intercept from root |

### Metadata File Conventions

#### App Icons

| File | Description |
| --- | --- |
| `favicon` | Favicon file |
| `icon` | App Icon file |
| `icon` | Generated App Icon |
| `apple-icon` | Apple App Icon file |
| `apple-icon` | Generated Apple App Icon |

#### Open Graph and Twitter Images

| File | Description |
| --- | --- |
| `opengraph-image` | Open Graph image file |
| `opengraph-image` | Generated Open Graph image |
| `twitter-image` | Twitter image file |
| `twitter-image` | Generated Twitter image |

#### SEO

| File | Description |
| --- | --- |
| `sitemap` | Sitemap file |
| `sitemap` | Generated Sitemap |
| `robots` | Robots file |
| `robots` | Generated Robots file |

## `pages` Routing Conventions

The following file conventions are used to define routes in the `pages` router.

### Special Files

| File | Description |
| --- | --- |
| `_app` | Custom App |
| `_document` | Custom Document |
| `_error` | Custom Error Page |
| `404` | 404 Error Page |
| `500` | 500 Error Page |

### Routes

| Folder | Description |
| --- | --- |
| `index` | Home page |
| `folder/index` | Nested page |
| `file` | Nested page |

### Dynamic Routes

| Folder | Description |
| --- | --- |
| `[folder]/index` | Dynamic route segment |
| `[...folder]/index` | Catch-all route segment |
| `[[...folder]]/index` | Optional catch-all route segment |
| `[file]` | Dynamic route segment |
| `[...file]` | Catch-all route segment |
| `[[...file]]` | Optional catch-all route segment |