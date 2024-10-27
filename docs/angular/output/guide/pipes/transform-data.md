# Custom pipes for new transforms

Create custom pipes to encapsulate transformations not provided by built-in pipes. Use your custom pipe in template expressions to transform input values for display.

## Marking a class as a pipe

To mark a class as a pipe, apply the `@Pipe` decorator to the class. Use UpperCamelCase for the pipe class name and camelCase for the `name` string. Avoid hyphens in the `name`.

Refer to Pipe names in the Angular coding style guide for more details.

Use `name` in template expressions like a built-in pipe.

```ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'greet',
  standalone: true,
})
export class GreetPipe {}
```

## Using the PipeTransform interface

Implement the PipeTransform interface in your custom pipe class to perform transformations. Angular calls the `transform` method with the binding value as the first argument and any parameters as the second argument, returning the transformed value.

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'greet',
  standalone: true,
})
export class GreetPipe implements PipeTransform {
  transform(value: string, param1: boolean, param2: boolean): string {
    return `Hello ${value}`;
  }
}
```

## Example: Transforming a value exponentially

In a game, you may want to implement a transformation that raises a value exponentially to increase a hero's power. For instance, if the hero's score is 2, boosting the power exponentially by 10 results in a score of 1024 (`2**10`). Use a custom pipe for this transformation.

The following code example shows two component definitions:

- **exponential-strength.pipe.ts**: Defines a custom pipe named `exponentialStrength` with a `transform` method that performs the transformation, accepting an `exponent` parameter.
- **power-booster.component.ts**: Demonstrates how to use the pipe, specifying a value (`2`) and the exponent parameter (`10`). 

```ts
// src/app/exponential-strength.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentialStrength',
  standalone: true,
})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent: number): number {
    return Math.pow(value, exponent);
  }
}

// src/app/power-booster.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-power-booster',
  template: `<p>{{ 2 | exponentialStrength:10 }}</p>`,
})
export class PowerBoosterComponent {}
```