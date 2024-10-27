# Hierarchical injectors

Injectors in Angular allow you to manage the visibility of injectables in your applications. By understanding the rules of injectors, you can decide where to declare a provider—at the application level, in a Component, or in a Directive.

Angular applications can grow large, and a common strategy to manage complexity is to structure the application into a tree of components. Some sections of your application may operate independently, requiring their own local copies of services and dependencies. These services may be shared with other parts of the application or kept private.

Hierarchical dependency injection enables you to isolate sections of the application, allowing for private dependencies or shared dependencies between parent and child components.

## Types of injector hierarchies

Angular has two injector hierarchies:

- **EnvironmentInjector hierarchy**: Configured using `@Injectable()` or the `providers` array in `ApplicationConfig`.
- **ElementInjector hierarchy**: Created implicitly at each DOM element and is empty by default unless configured in the `providers` property on `@Directive()` or `@Component()`.

**Note**: For `NgModule` based applications, you can provide dependencies using the `ModuleInjector` hierarchy with `@NgModule()` or `@Injectable()`.

### EnvironmentInjector

The `EnvironmentInjector` can be configured using:

- The `@Injectable()` `providedIn` property to refer to `root` or `platform`.
- The `ApplicationConfig` `providers` array.

Using the `@Injectable()` `providedIn` property is preferable as it allows for tree-shaking, optimizing bundle sizes by removing unused services.

Example of providing a service in the root `EnvironmentInjector`:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Provides this service in the root EnvironmentInjector
})
export class ItemService {
  name = 'telephone';
}
```

### ModuleInjector

In `NgModule` based applications, the `ModuleInjector` can be configured using:

- The `@Injectable()` `providedIn` property.
- The `@NgModule()` `providers` array.

`ModuleInjector` is a flattening of all providers arrays reachable through `NgModule.imports`. Child `ModuleInjector` hierarchies are created when lazy loading other `@NgModules`.

### Platform injector

The platform injector is configured by the `ApplicationConfig` instance during application bootstrap. The `bootstrapApplication()` method creates a child injector of the platform injector.

The `NullInjector()` is the top of the tree. If a service is not found, an error is thrown unless `@Optional()` is used.

### ElementInjector

Angular creates `ElementInjector` hierarchies for each DOM element. Providing a service in the `@Component()` decorator using its `providers` or `viewProviders` property configures an `ElementInjector`.

Example of configuring an `ElementInjector`:

```typescript
@Component({
  providers: [{ provide: ItemService, useValue: { name: 'lamp' } }]
})
export class TestComponent {}
```

### Resolution rules

When resolving a token for a component/directive, Angular resolves it in two phases:

1. Against its parents in the `ElementInjector` hierarchy.
2. Against its parents in the `EnvironmentInjector` hierarchy.

If a provider is registered at different levels, the first one encountered is used. If not found, an error is thrown.

### Resolution modifiers

Angular's resolution behavior can be modified with `@Optional()`, `@Self()`, `@SkipSelf()`, and `@Host()`. These modifiers change where the injector starts and stops looking for a service.

- **@Optional()**: Makes a service optional; returns `null` if not found.
- **@Self()**: Limits the search to the current `ElementInjector`.
- **@SkipSelf()**: Starts the search in the parent `ElementInjector`.
- **@Host()**: Stops the search at the current component.

### Example: Providing services in `@Component()`

Services can be provided in two ways:

- With a `providers` array: `@Component({ providers: [SomeService] })`
- With a `viewProviders` array: `@Component({ viewProviders: [SomeService] })`

### Visibility of provided tokens

Visibility decorators influence where the search for the injection token begins and ends. Place them at the point of injection (constructor) rather than at declaration.

### Example: `ElementInjector` use cases

- **Service isolation**: Provide a service in a specific component to restrict its access.
- **Multiple edit sessions**: Use component-level providers to manage separate instances of a service.
- **Specialized providers**: Substitute a more specialized implementation of a service deeper in the component tree.

## More on dependency injection

For further information, refer to the DI Providers documentation.