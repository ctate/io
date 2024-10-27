# Configuring dependency providers

The previous sections described how to use class instances as dependencies. You can also use values like `boolean`, `string`, `Date`, and objects as dependencies. Angular provides APIs to make dependency configuration flexible.

## Specifying a provider token

When you specify the service class as the provider token, the injector instantiates that class using the `new` operator. For example, the app component provides a `Logger` instance:

```typescript
providers: [Logger],
```

You can configure DI to associate the `Logger` provider token with a different class or value. The class provider syntax expands into a provider configuration defined by the `Provider` interface:

```typescript
[{ provide: Logger, useClass: Logger }]
```

The expanded provider configuration includes:

- `provide`: The token that serves as the key for consuming the dependency value.
- Provider definition object, which can be:
  - `useClass`: Instantiate a provided class.
  - `useExisting`: Alias a token to reference an existing one.
  - `useFactory`: Define a function that constructs a dependency.
  - `useValue`: Provide a static value as a dependency.

### Class providers: useClass

The `useClass` provider key creates and returns a new instance of the specified class. This allows you to substitute an alternative implementation for a common class. For example:

```typescript
[{ provide: Logger, useClass: BetterLogger }]
```

If the alternative class has its own dependencies, specify both in the providers metadata:

```typescript
[
  UserService, // dependency needed in `EvenBetterLogger`.
  { provide: Logger, useClass: EvenBetterLogger },
]
```

Example of `EvenBetterLogger`:

```typescript
@Injectable()
export class EvenBetterLogger extends Logger {
  constructor(private userService: UserService) {}

  override log(message: string) {
    const name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}
```

### Alias providers: useExisting

The `useExisting` provider key maps one token to another, creating an alias. For example:

```typescript
[
  NewLogger,
  { provide: OldLogger, useExisting: NewLogger },
]
```

### Factory providers: useFactory

The `useFactory` provider key creates a dependency object by calling a factory function. This allows for dynamic values based on information available in DI. For example, to control the display of secret heroes in `HeroService`:

```typescript
class HeroService {
  constructor(private logger: Logger, private isAuthorized: boolean) { }

  getHeroes() {
    const auth = this.isAuthorized ? 'authorized' : 'unauthorized';
    this.logger.log(`Getting heroes for ${auth} user.`);
    return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
  }
}
```

Factory function example:

```typescript
const heroServiceFactory = (logger: Logger, userService: UserService) =>
  new HeroService(logger, userService.user.isAuthorized);
```

Factory provider:

```typescript
export const heroServiceProvider = {
  provide: HeroService,
  useFactory: heroServiceFactory,
  deps: [Logger, UserService]
};
```

### Value providers: useValue

The `useValue` key associates a static value with a DI token. This is useful for runtime configuration constants or mock data in tests.

## Using an `InjectionToken` object

Use an `InjectionToken` object for non-class dependencies. Example of defining a token:

```typescript
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  title: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config description');
```

Register the dependency provider:

```typescript
const MY_APP_CONFIG_VARIABLE: AppConfig = {
  title: 'Hello',
};

providers: [{ provide: APP_CONFIG, useValue: MY_APP_CONFIG_VARIABLE }]
```

Inject the configuration object:

```typescript
export class AppComponent {
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.title = config.title;
  }
}
```

### Interfaces and DI

The TypeScript `AppConfig` interface supports typing but has no role in DI. Interfaces are design-time artifacts and do not exist at runtime. Therefore, you cannot use an interface as a provider token or inject it:

```typescript
// Can't use interface as provider token
[{ provide: AppConfig, useValue: MY_APP_CONFIG_VARIABLE }]
```

```typescript
export class AppComponent {
  // Can't inject using the interface as the parameter type
  constructor(private config: AppConfig) {}
}
```