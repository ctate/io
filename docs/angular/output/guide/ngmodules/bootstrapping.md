# Launching your app with a root module

An NgModule describes how the application parts fit together. Every application has at least one Angular module, the *root* module, which must be present for bootstrapping the application on launch. By convention and by default, this NgModule is named `AppModule`.

When you use the Angular CLI `ng new` command with the `no-standalone` option to generate an app, the default `AppModule` looks like this:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The `@NgModule` decorator identifies `AppModule` as an `NgModule` class, taking a metadata object that tells Angular how to compile and launch the application.

**Metadata fields:**
- `declarations`: Includes the *root* application component.
- `imports`: Imports `BrowserModule` to enable browser-specific services (such as DOM rendering, sanitization).
- `providers`: The service providers.
- `bootstrap`: The *root* component that Angular creates and inserts into the `index.html` host web page.

## The `declarations` array

The `declarations` array tells Angular which components belong to that module. As you create more components, add them to `declarations`. The `declarations` array only takes declarables: [components](guide/components), [directives](guide/directives), and [pipes](guide/templates/pipes). All declarables must be in the `declarations` array and belong to exactly one module. Declaring the same class in multiple modules results in a compiler error.

Declared classes are usable within the module but private to components in a different module unless exported and imported.

Example of a `declarations` array:

```typescript
declarations: [
  YourComponent,
  YourPipe,
  YourDirective
],
```

### Using directives with `@NgModule`

Use the `declarations` array for directives. To use a directive, component, or pipe in a module, follow these steps:

1. Export it from the TypeScript file where you wrote it.
2. Import it into the file containing the `@NgModule` class.
3. Declare it in the `@NgModule` `declarations` array.

Example of an empty directive named `ItemDirective`:

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appItem]'
})
export class ItemDirective {
  // your code here
}
```

Next, import it into the `app.module.ts` file:

```typescript
import { ItemDirective } from './item.directive';
```

Add it to the `@NgModule` `declarations` array:

```typescript
declarations: [
  AppComponent,
  ItemDirective
],
```

Now you can use `ItemDirective` in a component. This example uses `AppModule`, but the same steps apply for a feature module. For more about directives, see [Attribute Directives](guide/directives/attribute-directives) and [Structural Directives](guide/directives/structural-directives). The same technique applies for [pipes](guide/templates/pipes) and [components](guide/components).

Remember, components, directives, and pipes belong to one module only. Declare them once in your application and share them by importing the necessary modules.

## The `imports` array

Modules accept an `imports` array in the `@NgModule` metadata object, indicating other NgModules that this module needs to function properly.

```typescript
imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule
],
```

This list includes modules that export components, directives, or pipes referenced by component templates in this module.

## The `providers` array

The `providers` array lists the services the application needs. Services listed here are available app-wide. You can scope them when using feature modules and lazy loading. For more information, see [Providers in modules](guide/ngmodules/providers).

## The `bootstrap` array

The application launches by bootstrapping the root `AppModule`. The bootstrapping process creates the component(s) listed in the `bootstrap` array and inserts each one into the browser DOM if it finds an element matching the component's `selector`.

Each bootstrapped component is the base of its own tree of components. While you can put more than one component tree on a host web page, most applications have only one component tree and bootstrap a single root component, commonly called `AppComponent`.

For bootstrapping a component based on an API response or mounting the `AppComponent` in a different DOM node, refer to `ApplicationRef.bootstrap()` documentation.

## More about Angular Modules

See [Frequently Used Modules](guide/ngmodules/frequent) to learn more about modules commonly seen in applications.