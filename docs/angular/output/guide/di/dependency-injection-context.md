# Injection context

The dependency injection (DI) system relies on a runtime context where the current injector is available. Injectors function only when code is executed in this context.

The injection context is available in the following situations:

- During the construction of a class instantiated by the DI system, such as an `@Injectable` or `@Component`.
- In the initializer for fields of such classes.
- In the factory function specified for `useFactory` of a `Provider` or an `@Injectable`.
- In the `factory` function specified for an `InjectionToken`.
- Within a stack frame that runs in an injection context.

Understanding when you are in an injection context allows you to use the `inject` function to inject instances.

## Class constructors

The DI system instantiates a class in an injection context, allowing the injection of a token using the `inject` function.

```typescript
class MyComponent {
  private service1: Service1;
  private service2: Service2 = inject(Service2); // In context

  constructor() {
    this.service1 = inject(Service1); // In context
  }
}
```

## Stack frame in context

Some APIs, like router guards, are designed to run in an injection context, enabling the use of `inject` within the guard function to access a service.

Example for `CanActivateFn`:

```typescript
const canActivateTeam: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(PermissionsService).canActivate(inject(UserToken), route.params.id);
    };
```

## Run within an injection context

To run a function in an injection context without being in one, use `runInInjectionContext`. This requires access to an injector, such as the `EnvironmentInjector`.

```typescript
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      inject(SomeService); // Use the injected service as needed
    });
  }
}
```

Note that `inject` will return an instance only if the injector can resolve the required token.

## Asserts the context

Angular provides the `assertInInjectionContext` helper function to confirm that the current context is an injection context.

## Using DI outside of a context

Calling `inject` or `assertInInjectionContext` outside of an injection context will throw error NG0203.