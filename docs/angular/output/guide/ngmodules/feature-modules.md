# Feature modules

Feature modules are NgModules designed to organize code within an application. They help delineate areas of functionality, making collaboration easier and managing the size of the root module.

## Feature modules vs. root modules

Feature modules are an organizational best practice, providing a cohesive set of functionality for specific application needs, such as user workflows or routing. While everything can be done in the root module, feature modules help partition the application into focused areas, collaborating with the root module and other modules through shared services, components, directives, and pipes.

## How to make a feature module

To create a feature module using the Angular CLI, run the following command in the root project directory:

```
ng generate module CustomerDashboard
```

This creates a folder called `customer-dashboard` with a file named `customer-dashboard.module.ts` containing:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CustomerDashboardModule { }
```

Feature modules import `CommonModule` instead of `BrowserModule`, which is only imported once in the root module. The `declarations` array is for adding components, directives, and pipes specific to the module.

To add a component, use the following command:

```
ng generate component customer-dashboard/CustomerDashboard
```

This generates a folder for the new component and updates `CustomerDashboardModule`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomerDashboardComponent
  ],
  exports: [
    CustomerDashboardComponent
  ]
})
export class CustomerDashboardModule { }
```

## Importing a feature module

To use the feature module in your app, import it into the root module, `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomerDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now, `AppModule` recognizes the feature module, allowing `AppComponent` to use the customer dashboard component.

## Rendering a feature module's component template

The CLI generates a template for `CustomerDashboardComponent` located at `customer-dashboard.component.html`:

```html
<p>
  customer-dashboard works!
</p>
```

To display this in `AppComponent`, ensure `CustomerDashboardComponent` is exported in `CustomerDashboardModule`:

```typescript
exports: [
  CustomerDashboardComponent
]
```

Then, in `app.component.html`, add the tag `<app-customer-dashboard>`:

```html
<h1>
  {{title}}
</h1>

<app-customer-dashboard></app-customer-dashboard>
```

Now, both the title and the `CustomerDashboardComponent` template render.

## More on NgModules

- Lazy Loading Modules with the Angular Router
- Providers
- Types of Feature Modules