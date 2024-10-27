# Sharing Code

Dependency injection allows you to share code.

When you need to share logic between components, Angular leverages the design pattern of dependency injection that allows you to create a “service” which enables you to inject code into components while managing it from a single source of truth.

## What are services?

Services are reusable pieces of code that can be injected. Similar to defining a component, services consist of:

- A **TypeScript decorator** that declares the class as an Angular service via `@Injectable` and defines what part of the application can access the service using the `providedIn` property (typically set to `'root'`).
- A **TypeScript class** that defines the code accessible when the service is injected.

### Example: Calculator Service

```angular-ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  add(x: number, y: number) {
    return x + y;
  }
}
```

## How to use a service

To use a service in a component:

1. Import the service.
2. Declare a class field where the service is injected. Assign the class field to the result of the built-in function `inject`.

### Example: Receipt Component

```angular-ts
import { Component, inject } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-receipt',
  template: `<h1>The total is {{ totalCost }}</h1>`,
})
export class Receipt {
  private calculatorService = inject(CalculatorService);
  totalCost = this.calculatorService.add(50, 25);
}
```

In this example, the `CalculatorService` is used by calling the Angular function `inject` and passing in the service.

## Next Step

Next Steps After Essentials: essentials/next-steps