# Creating an injectable service

A service is a class with a narrow, well-defined purpose, providing any value, function, or feature that an application needs. Angular distinguishes components from services to enhance modularity and reusability. Components should focus on user experience, while services handle tasks like data fetching, input validation, and logging.

Angular facilitates the separation of application logic into services, making them available to components through Dependency Injection (DI).

## Service examples

Example of a simple logging service:

```typescript
export class Logger {
  log(msg: unknown) { console.log(msg); }
  error(msg: unknown) { console.error(msg); }
  warn(msg: unknown) { console.warn(msg); }
}
```

A `HeroService` that depends on the `Logger` and `BackendService`:

```typescript
export class HeroService {
  private heroes: Hero[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) {}

  async getHeroes() {
    this.heroes = await this.backend.getAll(Hero);
    this.logger.log(`Fetched ${this.heroes.length} heroes.`);
    return this.heroes;
  }
}
```

## Creating an injectable service

Use the Angular CLI to create a new service. For example, to generate a `HeroService` in the `src/app/heroes` folder, run:

```sh
ng generate service heroes/hero
```

This creates a default `HeroService`:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {}
```

The `@Injectable()` decorator allows Angular to use this class in the DI system. The `providedIn: 'root'` metadata means the service is available throughout the application.

Add a `getHeroes()` method to return heroes from `mock.heroes.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes() {
    return HEROES;
  }
}
```

Define components and services in separate files for clarity and maintainability.

## Injecting services

To inject a service into a component, use the component's `constructor()`:

```typescript
constructor(heroService: HeroService)
```

## Injecting services in other services

When a service depends on another service, use the same injection pattern. For example, `HeroService` using `Logger`:

```typescript
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private logger: Logger) {}

  getHeroes() {
    this.logger.log('Getting heroes.');
    return HEROES;
  }
}
```

## What's next

- Configuring dependency providers: https://angular.io/guide/di/dependency-injection-providers
- `InjectionTokens`: https://angular.io/guide/di/dependency-injection-providers#using-an-injectiontoken-object