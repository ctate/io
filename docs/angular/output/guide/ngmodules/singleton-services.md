# Singleton services

A singleton service is a service for which only one instance exists in an application.

## Providing a singleton service

To make a service a singleton in Angular, use one of the following methods:

- Set the `providedIn` property of the `@Injectable()` to `"root"`.
- Include the service in the `AppModule` or a module imported only by the `AppModule`.

### Using `providedIn`

The preferred method is to set `providedIn` to `root` in the service's `@Injectable()` decorator, which tells Angular to provide the service in the application root.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
}
```

### NgModule `providers` array

In Angular versions prior to 6.0, services were registered in the `@NgModule` `providers` field:

```typescript
@NgModule({
  // ...
  providers: [UserService],
})
```

If this NgModule is the root `AppModule`, `UserService` becomes a singleton available throughout the application. However, using `providedIn` is preferable as of Angular 6.0 for tree-shakability.

## The `forRoot()` pattern

Typically, use `providedIn` for services and `forRoot()`/`forChild()` for routing. Understanding `forRoot()` helps ensure a service remains a singleton.

If a module defines both providers and declarations, loading it in multiple feature modules can duplicate service registration, leading to multiple instances. To prevent this:

- Use the `providedIn` syntax instead of registering the service in the module.
- Separate services into their own module imported once.
- Define `forRoot()` and `forChild()` methods in the module.

For more information, see the Lazy Loading Feature Modules guide.

Use `forRoot()` to separate providers from a module, allowing the root module to import it with `providers` and child modules without `providers`.

1. Create a static method `forRoot()` on the module.
2. Place the providers into the `forRoot()` method.

```typescript
@NgModule({...})
export class GreetingModule {
  static forRoot(config: UserServiceConfig): ModuleWithProviders<GreetingModule> {
    return {
      ngModule: GreetingModule,
      providers: [
        {provide: UserServiceConfig, useValue: config }
      ]
    };
  }
}
```

### `forRoot()` and the `Router`

`RouterModule` provides the `Router` service and router directives. The root application module imports `RouterModule` to access the router and its directives. Feature modules must also import `RouterModule` for their components to use router directives.

Without `forRoot()`, each feature module would instantiate a new `Router`, breaking the application. Using `forRoot()`, the root module imports `RouterModule.forRoot(...)` to get a single `Router`, while feature modules use `RouterModule.forChild(...)`.

If a module has both providers and declarations, you can use this technique to separate them, a pattern seen in legacy applications. However, since Angular 6.0, the best practice is to use the `@Injectable()` `providedIn` property.

### How `forRoot()` works

`forRoot()` takes a service configuration object and returns a ModuleWithProviders, which includes:

- `ngModule`: The `GreetingModule` class.
- `providers`: The configured providers.

Angular accumulates all imported providers before appending those in `@NgModule.providers`, ensuring that items in the `AppModule` providers take precedence.

The sample application imports `GreetingModule` and uses its `forRoot()` method once in `AppModule`, preventing multiple instances.

In the example, `UserServiceConfig` is optionally injected in `UserService`:

```typescript
constructor(@Optional() config?: UserServiceConfig) {
  if (config) {
    this._userName = config.userName;
  }
}
```

Here's `forRoot()` that takes a `UserServiceConfig` object:

```typescript
@NgModule({...})
export class GreetingModule {
  static forRoot(config: UserServiceConfig): ModuleWithProviders<GreetingModule> {
    return {
      ngModule: GreetingModule,
      providers: [
        {provide: UserServiceConfig, useValue: config }
      ]
    };
  }
}
```

Call it within the `imports` list of the `AppModule`:

```typescript
import { GreetingModule } from './greeting/greeting.module';

@NgModule({
  // ...
  imports: [
    // ...
    GreetingModule.forRoot({userName: 'Miss Marple'}),
  ],
})
```

The application will display "Miss Marple" as the user. Import `GreetingModule` as a JavaScript import and avoid using `forRoot` in more than one `@NgModule` `imports` list.

## Prevent reimport of the `GreetingModule`

Only the root `AppModule` should import `GreetingModule`. If a lazy-loaded module imports it, multiple instances of a service may be generated.

To prevent a lazy-loaded module from re-importing `GreetingModule`, add the following constructor:

```typescript
constructor(@Optional() @SkipSelf() parentModule?: GreetingModule) {
  if (parentModule) {
    throw new Error(
      'GreetingModule is already loaded. Import it in the AppModule only');
  }
}
```

This constructor injects `GreetingModule` into itself. The `@SkipSelf()` decorator instructs Angular to look for `GreetingModule` in an ancestor injector, avoiding circular injection.

If `GreetingModule` is improperly imported into a lazy-loaded module, Angular creates a lazy-loaded module with its own injector. `@SkipSelf()` causes Angular to look for `GreetingModule` in the parent injector, which is the root injector. If found, the constructor throws an error.

## More on NgModules

Helpful resources:
- Sharing Modules
- Lazy Loading Modules
- NgModule FAQ