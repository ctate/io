# Pipes

## Overview

Pipes are special operators in Angular template expressions that transform data declaratively. They allow you to declare a transformation function once and use it across multiple templates. Angular pipes use the vertical bar character (`|`), inspired by the Unix pipe.

Note: Angular's pipe syntax differs from standard JavaScript, which uses the vertical bar for the bitwise OR operator. Angular template expressions do not support bitwise operators.

Example using built-in pipes:

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TitleCasePipe],
  template: `
    <main>
      <h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1>
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
```

When rendered, it will display:

```angular-html
<main>
  <h1>Purchases from Acme Corporation on Jul 8, 2024</h1>
  <p>Total: $123.45</p>
</main>
```

See the in-depth guide on i18n to learn more about how Angular localizes values.

### Built-in Pipes

Angular includes built-in pipes in the `@angular/common` package:

- **AsyncPipe**: Reads value from a `Promise` or RxJS `Observable`.
- **CurrencyPipe**: Transforms a number to a currency string, formatted according to locale rules.
- **DatePipe**: Formats a `Date` value according to locale rules.
- **DecimalPipe**: Transforms a number into a string with a decimal point, formatted according to locale rules.
- **I18nPluralPipe**: Maps a value to a string that pluralizes the value according to locale rules.
- **I18nSelectPipe**: Maps a key to a custom selector that returns a desired value.
- **JsonPipe**: Transforms an object to a string representation via `JSON.stringify`, intended for debugging.
- **KeyValuePipe**: Transforms Object or Map into an array of key-value pairs.
- **LowerCasePipe**: Transforms text to all lower case.
- **PercentPipe**: Transforms a number to a percentage string, formatted according to locale rules.
- **SlicePipe**: Creates a new Array or String containing a subset of the elements.
- **TitleCasePipe**: Transforms text to title case.
- **UpperCasePipe**: Transforms text to all upper case.

## Using Pipes

The pipe operator uses the vertical bar character (`|`) within a template expression. The left-hand operand is the value passed to the transformation function, and the right side operand is the pipe name with any additional arguments.

Example:

```angular-html
<p>Total: {{ amount | currency }}</p>
```

### Combining Multiple Pipes

You can apply multiple transformations using multiple pipe operators. Angular runs the pipes from left to right.

Example:

```angular-html
<p>The event will occur on {{ scheduledOn | date | uppercase }}.</p>
```

### Passing Parameters to Pipes

Some pipes accept parameters. Specify a parameter by appending the pipe name with a colon (`:`) followed by the parameter value.

Example:

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm' }}.</p>
```

You can also pass multiple parameters:

```angular-html
<p>The event will occur at {{ scheduledOn | date:'hh:mm':'UTC' }}.</p>
```

## How Pipes Work

Pipes are functions that accept an input value and return a transformed value.

Example:

```angular-ts
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <main>
      <p>Total: {{ amount | currency }}</p>
    </main>
  `,
})
export class AppComponent {
  amount = 123.45;
}
```

### Pipe Operator Precedence

The pipe operator has lower precedence than other binary operators, including `+`, `-`, `*`, `/`, `%`, `&&`, `||`, and `??`.

Example:

```angular-html
{{ (firstName + lastName | uppercase) }}
```

The pipe operator has higher precedence than the conditional (ternary) operator.

Example:

```angular-html
{{ (isAdmin ? 'Access granted' : 'Access denied') | uppercase }}
```

Always use parentheses when operator precedence may be ambiguous.

### Change Detection with Pipes

By default, all pipes are considered `pure`, executing only when a primitive input value or a changed object reference is detected. Mutations to object properties or array items are not detected unless the entire object or array reference is replaced.

## Creating Custom Pipes

Define a custom pipe by implementing a TypeScript class with the `@Pipe` decorator. A pipe must have:

- A name, specified in the pipe decorator.
- A method named `transform` that performs the value transformation.

Example of a custom pipe that transforms strings to kebab case:

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
  standalone: true,
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, '-');
  }
}
```

### Using the `@Pipe` Decorator

Import `Pipe` from `@angular/core` and use it as a decorator for the TypeScript class.

```angular-ts
import { Pipe } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
  standalone: true
})
export class MyCustomTransformationPipe {}
```

### Naming Convention for Custom Pipes

The naming convention for custom pipes consists of:

- `name`: Use camelCase. Avoid hyphens.
- `class name`: Use PascalCase version of the `name` with `Pipe` appended.

### Implement the `PipeTransform` Interface

Custom pipes should implement the `PipeTransform` interface from `@angular/core`.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
  standalone: true
})
export class MyCustomTransformationPipe implements PipeTransform {}
```

### Transforming the Value of a Pipe

Every transformation is invoked by the `transform` method with the first parameter being the input value.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
  standalone: true
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string): string {
    return `My custom transformation of ${value}.`;
  }
}
```

### Adding Parameters to a Custom Pipe

You can add parameters to your transformation by adding additional parameters to the `transform` method:

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomTransformation',
  standalone: true
})
export class MyCustomTransformationPipe implements PipeTransform {
  transform(value: string, format: string): string {
    let msg = `My custom transformation of ${value}.`;

    if (format === 'uppercase') {
      return msg.toUpperCase();
    } else {
      return msg;
    }
  }
}
```

### Detecting Change Within Arrays or Objects

To detect changes within arrays or objects, mark the pipe as impure by passing the `pure` flag with a value of `false`. Avoid creating impure pipes unless necessary, as they can incur performance penalties.

```angular-ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featuredItemsImpure',
  pure: false,
  standalone: true
})
export class FeaturedItemsImpurePipe implements PipeTransform {
  transform(value: string, format: string): string {
    let msg = `My custom transformation of ${value}.`;

    if (format === 'uppercase') {
      return msg.toUpperCase();
    } else {
      return msg;
    }
  }
}
```

It is common to include `Impure` in the pipe name and class name to indicate potential performance pitfalls to other developers.