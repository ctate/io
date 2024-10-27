# Two-way binding

**Two-way binding** allows simultaneous binding of a value to an element while enabling the element to propagate changes back through this binding.

## Syntax

The syntax for two-way binding is `[()]`, combining property binding `[]` and event binding `()`. This is informally known as "banana-in-a-box" in the Angular community.

## Two-way binding with form controls

Two-way binding is often used to synchronize component data with form controls. For instance, when a user inputs text, it updates the component's state.

Example:

```angular-ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <main>
      <h2>Hello {{ firstName }}!</h2>
      <input type="text" [(ngModel)]="firstName" />
    </main>
  `
})
export class AppComponent {
  firstName = 'Ada';
}
```

To implement two-way binding with native form controls:

1. Import `FormsModule` from `@angular/forms`.
2. Use the `ngModel` directive with the syntax `[(ngModel)]`.
3. Assign it the state to update (e.g., `firstName`).

Angular will ensure that updates in the text input reflect in the component state.

Learn more about `NgModel` in the official docs: guide/directives#displaying-and-updating-properties-with-ngmodel.

## Two-way binding between components

Two-way binding between a parent and child component requires additional configuration.

Example:

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  template: `
    <main>
      <h1>Counter: {{ initialCount }}</h1>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```

```angular-ts
// './counter/counter.component.ts';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  updateCount(amount: number): void {
    this.count += amount;
    this.countChange.emit(this.count);
  }
}
```

### Enabling two-way binding between components

To enable two-way binding for components:

**Child Component Requirements:**

1. An `@Input()` property.
2. A corresponding `@Output()` event emitter named `<InputPropertyName>Change`.
3. A method that emits the updated value to the event emitter.

Example:

```angular-ts
// './counter/counter.component.ts';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ /* Omitted for brevity */ })
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  updateCount(amount: number): void {
    this.count += amount;
    this.countChange.emit(this.count);
  }
}
```

**Parent Component Requirements:**

1. Wrap the `@Input()` property name in the two-way binding syntax.
2. Specify the property for the updated value.

Example:

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  template: `
    <main>
      <app-counter [(count)]="initialCount"></app-counter>
    </main>
  `,
})
export class AppComponent {
  initialCount = 18;
}
```