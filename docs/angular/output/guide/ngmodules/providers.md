# Providing dependencies in modules

A provider is an instruction to the Dependency Injection system on how to obtain a value for a dependency, typically services you create and provide.

## Providing a service

To create a service in an Angular application generated with the Angular CLI, use the following command in the root project directory, replacing *User* with your service name:

```
ng generate service User
```

This command creates a `UserService` skeleton:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
}
```

You can now inject `UserService` anywhere in your application. The `@Injectable()` decorator specifies that Angular should provide the service in the root injector.

## Provider scope

When you add a service provider to the root application injector, it's available throughout the application. Always provide your service in the root injector unless you want it available only when a specific `@NgModule` is imported.

## Limiting provider scope by lazy loading modules

In a basic CLI-generated app, modules are eagerly loaded, making all providers available throughout the application. However, with lazy loading, modules are loaded only when needed, such as during routing. Services listed in provider arrays of lazy-loaded modules aren't available in the root injector.

When the Angular router lazy-loads a module, it creates a new child injector for that module, populated with module-specific providers. Components created within a lazy-loaded module get their own local instance of services, while components in external modules receive instances from the root injector.

Not all services can be lazy-loaded. For example, the Router only works in the root module. As of Angular version 9, you can provide a new instance of a service with each lazy-loaded module:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class UserService {
}
```

With `providedIn: 'any'`, eagerly loaded modules share a singleton instance, while lazy-loaded modules get unique instances.

## Limiting provider scope with components

You can limit provider scope by adding the service to the component's `providers` array. This method is useful for eagerly loaded modules needing a service exclusive to them. Providing a service in a component limits it to that component and its descendants:

```typescript
@Component({
  // ...
  providers: [UserService]
})
export class AppComponent {}
```

## Providing services in modules vs. components

Generally, provide services needed throughout the application in the root module and scope services by providing them in lazy-loaded modules. The router operates at the root level, so providers in a component, even `AppComponent`, won't be visible to lazy-loaded modules.

Register a provider with a component when you need to limit a service instance to that component and its child components. For example, a `UserEditorComponent` needing a private copy of a caching `UserService` should register the service with itself.

## Injector hierarchy and service instances

Services are singletons within the scope of an injector, meaning there is at most one instance of a service in a given injector. Angular has a hierarchical injection system, allowing nested injectors to create their own service instances. When a new component with specified `providers` is created, a new child injector is also created. Similarly, lazy-loaded NgModules can create their own injectors.

Child modules and component injectors are independent and create separate instances of provided services. When an NgModule or component instance is destroyed, its injector and service instances are also destroyed.

For more information, see Hierarchical injectors.

## More on NgModules

- Singleton Services
- Lazy Loading Modules
- Dependency providers
- NgModule FAQ