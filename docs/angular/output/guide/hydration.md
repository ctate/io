# Hydration

## What is hydration

Hydration restores the server-side rendered application on the client by reusing server-rendered DOM structures, persisting application state, and transferring already retrieved application data.

## Why is hydration important?

Hydration enhances application performance by avoiding the re-creation of DOM nodes. Angular matches existing DOM elements to the application structure at runtime, leading to performance improvements measurable by Core Web Vitals (CWV) statistics, such as First Input Delay (FID), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS). Improved CWV metrics positively impact SEO performance.

Without hydration, server-side rendered Angular applications destroy and re-render the DOM, causing UI flicker and negatively affecting CWV metrics. Enabling hydration allows for DOM reuse and prevents flicker.

## How do you enable hydration in Angular

Hydration is enabled for server-side rendered (SSR) applications. Follow the Angular SSR Guide to enable SSR first.

### Using Angular CLI

If you used Angular CLI to enable SSR, the hydration code is already included in your application.

### Manual setup

For custom setups, import `provideClientHydration` from `@angular/platform-browser` in your main application component or module and add it to the bootstrapping providers list.

```typescript
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideClientHydration()]
});
```

For NgModules, add `provideClientHydration` to your root app module's provider list.

```typescript
import {provideClientHydration} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent],
  providers: [provideClientHydration()],
})
export class AppModule {}
```

IMPORTANT: Ensure `provideClientHydration()` is included in the server bootstrap configuration. In default project structures, adding it to the root `AppModule` is sufficient.

### Verify that hydration is enabled

After configuring hydration, load your application in the browser. You may need to fix instances of Direct DOM Manipulation for hydration to work fully. In development mode, check the console for hydration-related stats. Use the Angular DevTools browser extension to see the hydration status of components.

## Capturing and replaying events

Starting from v18, enable the Event Replay feature to capture events before hydration and replay them afterward using `withEventReplay()`.

```typescript
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(withEventReplay())
  ]
});
```

## Constraints

Hydration requires the same generated DOM structure on both the server and client, including whitespaces and comment nodes. The HTML produced by server-side rendering must not be altered.

### Direct DOM Manipulation

Components using native DOM APIs or `innerHTML`/`outerHTML` can cause hydration errors. Refactor components to avoid direct DOM manipulation or use `ngSkipHydration` as a temporary solution.

### Valid HTML structure

Invalid HTML structures can lead to DOM mismatch errors during hydration. Common issues include:

- `<table>` without `<tbody>`
- `<div>` inside `<p>`
- `<a>` inside `<h1>`
- `<a>` inside another `<a>`

Use a syntax validator to check HTML validity.

### Preserve Whitespaces Configuration

Use the default setting of `false` for `preserveWhitespaces`. Ensure consistent settings in `tsconfig.server.json` and `tsconfig.app.json` to avoid hydration issues.

### Custom or Noop Zone.js are not yet supported

Custom or "noop" Zone.js implementations may lead to timing issues with the "stable" event, affecting hydration. This configuration is not fully supported.

## Errors

Common hydration errors include node mismatches and invalid host nodes. Ensure valid HTML structure and avoid direct DOM manipulation to prevent these errors. For a full reference on hydration-related errors, visit the Errors Reference Guide.

## How to skip hydration for particular components

Use the `ngSkipHydration` attribute to skip hydration for components that may not work properly with hydration enabled.

```angular-html
<app-example ngSkipHydration />
```

Alternatively, set `ngSkipHydration` as a host binding.

```typescript
@Component({
  ...
  host: {ngSkipHydration: 'true'},
})
class ExampleComponent {}
```

Using `ngSkipHydration` means the component will behave as if hydration is not enabled, losing hydration benefits. Use this attribute cautiously, as it can disable hydration for the entire application if added to the root component.

## I18N

Support for internationalization with hydration is in developer preview. By default, Angular skips hydration for components using i18n blocks. To enable hydration for i18n blocks, add `withI18nSupport` to your `provideClientHydration` call.

```typescript
import {
  bootstrapApplication,
  provideClientHydration,
  withI18nSupport,
} from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideClientHydration(withI18nSupport())]
});
```

## Third Party Libraries with DOM Manipulation

Third-party libraries that manipulate the DOM may cause DOM mismatch errors when hydration is enabled. If you encounter such errors, add the `ngSkipHydration` attribute to the component using that library.