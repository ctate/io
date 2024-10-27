# Production Checklist

## Overview

Before taking your Next.js application to production, consider implementing optimizations and patterns for the best user experience, performance, and security. This document provides best practices for building your application, preparing for production, and post-deployment, along with automatic Next.js optimizations.

## Automatic Optimizations

These Next.js optimizations are enabled by default and require no configuration:

### App-Only

- **Server Components:** Next.js uses Server Components by default, which run on the server and do not require JavaScript to render on the client, minimizing client-side JavaScript bundle size.
- **Code-splitting:** Server Components enable automatic code-splitting by route segments. Consider lazy loading Client Components and third-party libraries as needed.
- **Prefetching:** Next.js prefetches routes in the background when they enter the user's viewport, making navigation nearly instant. You can opt out of prefetching if necessary.
- **Static Rendering:** Next.js statically renders components at build time and caches the results to enhance performance. Dynamic Rendering can be opted into for specific routes.
- **Caching:** Next.js caches data requests, rendered results, and static assets to reduce network requests. You may opt out of caching if needed.

### Pages-Only

- **Code-splitting:** Next.js automatically code-splits application code by pages, loading only the necessary code for the current page. Lazy loading third-party libraries is also recommended.
- **Prefetching:** Similar to App-Only, Next.js prefetches routes in the background for faster navigation.
- **Automatic Static Optimization:** Pages without blocking data requirements are automatically determined to be static and can be cached and served from multiple CDN locations. Server-side Rendering can be opted into as needed.

## During Development

### Routing and Rendering

#### App-Only

- **Layouts:** Use layouts to share UI across pages and enable partial rendering on navigation.
- **`<Link>` Component:** Utilize the `<Link>` component for client-side navigation and prefetching.
- **Error Handling:** Create custom error pages to handle catch-all and 404 errors gracefully.
- **Composition Patterns:** Follow recommended patterns for Server and Client Components and manage `"use client"` boundaries to avoid increasing client-side JavaScript bundle size.
- **Dynamic APIs:** Be cautious with Dynamic APIs, as they can opt the entire route into Dynamic Rendering.

#### Pages-Only

- **`<Link>` Component:** Use for client-side navigation and prefetching.
- **Custom Errors:** Handle 500 and 404 errors gracefully.

### Data Fetching and Caching

#### App-Only

- **Server Components:** Fetch data on the server using Server Components.
- **Route Handlers:** Access backend resources from Client Components without calling Route Handlers from Server Components.
- **Streaming:** Use Loading UI and React Suspense to progressively send UI from the server to the client.
- **Parallel Data Fetching:** Fetch data in parallel to reduce network waterfalls and consider preloading data.
- **Data Caching:** Ensure data requests are cached appropriately.
- **Static Images:** Use the public directory for caching static assets like images.

#### Pages-Only

- **API Routes:** Use Route Handlers to access backend resources securely.
- **Data Caching:** Verify caching for data requests and use Incremental Static Regeneration to update static pages.
- **Static Images:** Cache static assets in the public directory.

### UI and Accessibility

#### App-Only

- **Forms and Validation:** Use Server Actions for form submissions and server-side validation.

- **Font Module:** Optimize fonts using the Font Module to reduce layout shift.
- **`<Image>` Component:** Optimize images to prevent layout shift and serve modern formats.
- **`<Script>` Component:** Optimize third-party scripts to prevent blocking the main thread.
- **ESLint:** Use `eslint-plugin-jsx-a11y` to catch accessibility issues early.

### Security

#### App-Only

- **Tainting:** Prevent sensitive data exposure by tainting data objects.
- **Server Actions:** Ensure user authorization for Server Actions and follow recommended security practices.

#### Pages-Only

- **Environment Variables:** Add `.env.*` files to `.gitignore` and prefix public variables with `NEXT_PUBLIC_`.
- **Content Security Policy:** Consider adding a Content Security Policy to protect against security threats.

### Metadata and SEO

#### App-Only

- **Metadata API:** Use the Metadata API to enhance SEO with page titles and descriptions.
- **Open Graph Images:** Create OG images for social sharing.
- **Sitemaps and Robots:** Generate sitemaps and robots files for search engine indexing.

#### Pages-Only

- **`<Head>` Component:** Use `next/head` to add page titles and descriptions.

### Type Safety

- **TypeScript and TS Plugin:** Utilize TypeScript and the TypeScript plugin for improved type safety.

## Before Going to Production

Run `next build` to build your application locally and catch any build errors, then run `next start` to measure performance in a production-like environment.

### Core Web Vitals

- **Lighthouse:** Run Lighthouse in incognito mode to assess user experience and identify improvement areas.

#### App-Only

- **`useReportWebVitals` Hook:** Use this hook to send Core Web Vitals data to analytics tools.

### Analyzing Bundles

Use the `@next/bundle-analyzer` plugin to analyze JavaScript bundle sizes and identify large modules. Additional tools include Import Cost, Package Phobia, Bundle Phobia, and bundlejs.

## After Deployment

Monitor and improve application performance using available tools and integrations, especially for Vercel deployments:

- **Analytics:** Built-in analytics dashboard for traffic insights.
- **Speed Insights:** Real-world performance insights based on visitor data.
- **Logging:** Runtime and activity logs for debugging and monitoring.

Following these recommendations will help you build a faster, more reliable, and secure application for your users.