# Server-side rendering

Server-side rendering (SSR) involves rendering pages on the server, delivering initial HTML content with the initial page state. Once the HTML is in the browser, Angular initializes the application using the data in the HTML.

## Why use SSR?

Advantages of SSR over client-side rendering (CSR):

- **Improved performance**: SSR delivers fully rendered HTML to the client, allowing the browser to display content before downloading JavaScript, benefiting users on low-bandwidth connections or mobile devices.
- **Improved Core Web Vitals**: SSR enhances performance metrics like First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS). More info on [Core Web Vitals (CWV)](https://web.dev/learn-core-web-vitals/).
- **Better SEO**: SSR facilitates easier crawling and indexing of application content by search engines.

## Enable server-side rendering

To create a **new** project with SSR, run:

```
ng new --ssr
```

To add SSR to an **existing** project, use:

```
ng add @angular/ssr
```

These commands set up the application for SSR and add necessary files.

```
my-app
|-- server.ts                       # application server
└── src
    |-- app
    |   └── app.config.server.ts    # server application configuration
    └── main.server.ts              # main server application bootstrapping
```

To verify SSR, run the application locally with `ng serve`. The initial HTML request should contain application content.

## Configure server-side rendering

In Angular v17 and later, `server.ts` is not used by `ng serve`. The dev server uses `main.server.ts` directly for SSR.

The `server.ts` file configures a Node.js Express server for Angular SSR. `CommonEngine` is used to render the application.

The `render` method of `CommonEngine` accepts:

| Properties          | Details                                                                                  | Default Value |
| ------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| `bootstrap`         | Method returning an `NgModule` or a promise resolving to an `ApplicationRef`.          |               |
| `providers`         | Array of platform-level providers for the current request.                             |               |
| `url`               | URL of the page to render.                                                              |               |
| `inlineCriticalCss` | Whether to inline critical CSS to reduce render-blocking requests.                     | `true`        |
| `publicPath`        | Base path for browser files and assets.                                                 |               |
| `document`          | Initial DOM for bootstrapping the server application.                                   |               |
| `documentFilePath`  | File path of the initial DOM for bootstrapping the server application.                  |               |

Angular CLI scaffolds an initial server implementation for SSR, which can be extended for features like API routes and static assets. See [Express documentation](https://expressjs.com/) for more details.

## Hydration

Hydration restores the server-side rendered application on the client, reusing server-rendered DOM structures and persisting application state. Hydration is enabled by default with SSR. More info in [the hydration guide](guide/hydration).

## Caching data when using HttpClient

`HttpClient` caches outgoing network requests on the server. This data is serialized and sent to the browser as part of the initial HTML. In the browser, `HttpClient` checks the cache and reuses data instead of making new requests during initial rendering. Caching stops once the application is [stable](api/core/ApplicationRef#isStable) in the browser.

By default, `HttpClient` caches all `HEAD` and `GET` requests without `Authorization` or `Proxy-Authorization` headers. Override settings using [`withHttpTransferCacheOptions`](api/platform-browser/withHttpTransferCacheOptions).

```
bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(withHttpTransferCacheOptions({
      includePostRequests: true
    }))
  ]
});
```

## Authoring server-compatible components

Some browser APIs may not be available on the server. Avoid using browser-specific global objects like `window`, `document`, `navigator`, or `location` on the server. Use the [`afterRender`](api/core/afterRender) and [`afterNextRender`](api/core/afterNextRender) lifecycle hooks to ensure code runs only in the browser.

```
import { Component, ViewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  @ViewChild('content') contentRef: ElementRef;

  constructor() {
    afterNextRender(() => {
      console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
    });
  }
}
```

## Using Angular Service Worker

When using Angular on the server with the Angular service worker, the initial server request is rendered as expected. However, subsequent requests are handled by the service worker and are always client-side rendered.