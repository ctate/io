# Understanding dependency injection

Dependency injection (DI) is a core concept in Angular, allowing classes with Angular decorators (Components, Directives, Pipes, Injectables) to configure their dependencies.

## Roles in DI System

- **Dependency Consumer**: The class that requires a dependency.
- **Dependency Provider**: The class that provides the dependency.

Angular uses an `Injector` to manage these interactions. When a dependency is requested, the injector checks its registry for an existing instance. If none exists, it creates a new instance. The application-wide injector is created during the bootstrap process.

For more information, see Dependency providers.

## Providing a Dependency

### HeroService Example

To use `HeroService` as a dependency:

1. Add the `@Injectable` decorator:

```typescript
@Injectable()
class HeroService {}
```

2. Provide the service in various locations:

- **Preferred**: At the application root level using `providedIn`.
- At the Component level.
- At the application root level using `ApplicationConfig`.
- In `NgModule` based applications.

### Preferred: At the Application Root Level Using `providedIn`

Using `providedIn: 'root'` allows the service to be injected into all classes and enables tree-shaking:

```typescript
@Injectable({
  providedIn: 'root'
})
class HeroService {}
```

### At the Component Level

Services can be provided at the `@Component` level using the `providers` field:

```typescript
@Component({
  standalone: true,
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
```

This creates a new instance of the service for each component instance.

### At the Application Root Level Using `ApplicationConfig`

You can provide a service at the application level using `ApplicationConfig`:

```typescript
export const appConfig: ApplicationConfig = {
    providers: [
      { provide: HeroService },
    ]
};
```

In `main.ts`:

```typescript
bootstrapApplication(AppComponent, appConfig)
```

### `NgModule` Based Applications

In `@NgModule` applications, use the `providers` field of the `@NgModule` decorator:

Services provided in a module are available to all declarations of that module or any modules sharing the same `ModuleInjector`.

## Injecting/Consuming a Dependency

To inject a dependency, declare it in the class constructor:

```typescript
@Component({ … })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
```

Alternatively, use the `inject` method:

```typescript
@Component({ … })
class HeroListComponent {
  private service = inject(HeroService);
}
```

Angular checks the injector for existing instances of the service. If none exist, it creates one using the registered provider.

## What's Next

For further reading, see Creating an injectable service.