# Lazy-loading feature modules

By default, NgModules are eagerly loaded, meaning all NgModules load with the application, regardless of necessity. For large applications, consider lazy loading to load NgModules as needed, keeping initial bundle sizes smaller and decreasing load times.

## Lazy loading basics

To lazy load Angular modules, use `loadChildren` in your `AppRoutingModule` routes configuration:

```typescript
const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];
```

In the lazy-loaded module's routing module, add a route for the component:

```typescript
const routes: Routes = [
  {
    path: '',
    component: ItemsComponent
  }
];
```

Remove the `ItemsModule` from the `AppModule`.

## Step-by-step setup

### Set up an application

If you don't have an application, create one with the Angular CLI:

```shell
ng new customer-app --no-standalone --routing
```

Navigate into the project:

```shell
cd customer-app
```

### Create a feature module with routing

Create a feature module with a component:

```shell
ng generate module customers --route customers --module app.module
```

This creates a `customers` directory with `CustomersModule` and `CustomersRoutingModule`. The command does not add a reference to it in `app.module.ts`.

Update `app-routing.module.ts`:

```typescript
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  }
];
```

### Add another feature module

Create a second lazy-loaded feature module:

```shell
ng generate module orders --route orders --module app.module
```

Update `app-routing.module.ts`:

```typescript
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  }
];
```

### Set up the UI

Replace the default markup in `app.component.html`:

```html
<h1>{{title}}</h1>
<button type="button" routerLink="/customers">Customers</button>
<button type="button" routerLink="/orders">Orders</button>
<button type="button" routerLink="">Home</button>
<router-outlet></router-outlet>
```

Run the application:

```shell
ng serve
```

Visit `localhost:4200` to see the application.

### Imports and route configuration

Add a default route in `app-routing.module.ts`:

```typescript
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
```

### Inside the feature module

The `customers.module.ts` file should look like this:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }
```

The `customers-routing.module.ts` file:

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
```

### Verify lazy loading

Use Chrome developer tools to verify lazy loading. Open the Network Tab and click on the Orders or Customers button. If a chunk appears, the feature module is being lazy loaded.

## `forRoot()` and `forChild()`

The Angular CLI adds `RouterModule.forRoot(routes)` to the `AppRoutingModule` imports array, indicating it is the root routing module. Use `forRoot()` only once in the application.

Feature routing modules use `RouterModule.forChild(routes)`, allowing for multiple modules.

## Preloading

Preloading improves UX by loading parts of your application in the background.

### Preloading modules and standalone components

To enable preloading, import `PreloadAllModules`:

```typescript
import { PreloadAllModules } from '@angular/router';
```

Specify the preloading strategy in `AppRoutingModule`:

```typescript
RouterModule.forRoot(
  appRoutes,
  {
    preloadingStrategy: PreloadAllModules
  }
);
```

### Preloading component data

Create a resolver service:

```shell
ng generate service <service-name>
```

Implement the `Resolve` interface:

```typescript
import { Resolve } from '@angular/router';

export class CrisisDetailResolverService implements Resolve<Crisis> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> {
    // your logic goes here
  }
}
```

Import the resolver into your module's routing module and add a `resolve` object to the component's route configuration.

## Troubleshooting lazy-loading modules

Common errors include importing common modules in multiple places. Test by generating the module with and without the `--route` parameter.

For more information on Angular Modules, see NgModules.

## More on NgModules and routing

You might also be interested in:

* Routing and Navigation
* Providers
* Types of Feature Modules
* Route-level code-splitting in Angular
* Route preloading strategies in Angular