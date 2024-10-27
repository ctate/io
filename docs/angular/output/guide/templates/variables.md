# Variables in templates

Angular has two types of variable declarations in templates: local template variables and template reference variables.

## Local template variables with `@let`

Angular's `@let` syntax allows you to define a local variable and re-use it across a template, similar to the JavaScript `let` syntax.

### Using `@let`

Use `@let` to declare a variable based on a template expression. Angular keeps the variable's value up-to-date.

```angular-html
@let name = user.name;
@let greeting = 'Hello, ' + name;
@let data = data$ | async;
@let pi = 3.1459;
@let coordinates = {x: 50, y: 100};
@let longExpression = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ' +
                      'sed do eiusmod tempor incididunt ut labore et dolore magna ' +
                      'Ut enim ad minim veniam...';
```

Each `@let` block can declare one variable only.

### Referencing the value of `@let`

Once declared, you can reuse the variable in the same template:

```angular-html
@let user = user$ | async;

@if (user) {
  <h1>Hello, {{user.name}}</h1>
  <user-avatar [photo]="user.photo"/>

  <ul>
    @for (snack of user.favoriteSnacks; track snack.id) {
      <li>{{snack.name}}</li>
    }
  </ul>

  <button (click)="update(user)">Update profile</button>
}
```

### Assignability

Unlike JavaScript's `let`, `@let` cannot be reassigned after declaration. Angular keeps the variable's value updated.

```angular-html
@let value = 1;

<!-- Invalid - This does not work! -->
<button (click)="value = value + 1">Increment the value</button>
```

### Variable scope

`@let` declarations are scoped to the current view and its descendants. They cannot be accessed by parent views or siblings.

```angular-html
@let topLevel = value;

<div>
  @let insideDiv = value;
</div>

{{topLevel}} <!-- Valid -->
{{insideDiv}} <!-- Valid -->

@if (condition) {
  {{topLevel + insideDiv}} <!-- Valid -->

  @let nested = value;

  @if (condition) {
    {{topLevel + insideDiv + nested}} <!-- Valid -->
  }
}

<div *ngIf="condition">
  {{topLevel + insideDiv}} <!-- Valid -->

  @let nestedNgIf = value;

  <div *ngIf="condition">
     {{topLevel + insideDiv + nestedNgIf}} <!-- Valid -->
  </div>
</div>

{{nested}} <!-- Error, not hoisted from @if -->
{{nestedNgIf}} <!-- Error, not hoisted from *ngIf -->
```

### Full syntax

The `@let` syntax is defined as:

- The `@let` keyword.
- Followed by whitespace.
- Followed by a valid JavaScript name.
- Followed by the = symbol.
- Followed by an Angular expression (multi-line allowed).
- Terminated by the `;` symbol.

## Template reference variables

Template reference variables allow you to declare a variable that references a value from an element in your template.

A template reference variable can refer to:

- A DOM element
- An Angular component or directive
- A TemplateRef from an ng-template

### Declaring a template reference variable

Declare a variable on an element by adding an attribute that starts with the hash character (`#`).

```angular-html
<input #taskInput placeholder="Enter task name">
```

### Assigning values to template reference variables

Angular assigns a value to template variables based on the element on which the variable is declared.

```angular-html
<my-datepicker #startDate />
```

For `<ng-template>`, the variable refers to a TemplateRef instance.

```angular-html
<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

For other displayed elements, the variable refers to the HTMLElement instance.

```angular-html
<input #taskInput placeholder="Enter task name">
```

#### Assigning a reference to an Angular directive

Directives may have an `exportAs` property for referencing in a template.

```angular-ts
@Directive({
  selector: '[dropZone]',
  exportAs: 'dropZone',
})
export class DropZone { /* ... */ }
```

Declare a template variable on an element to assign it a directive instance.

```angular-html
<section dropZone #firstZone="dropZone"> ... </section>
```

### Using template reference variables with queries

Template variables can also mark an element for component and directive queries.

```angular-html
<input #description value="Original description">
```

```angular-ts
@Component({
  /* ... */,
  template: `<input #description value="Original description">`,
})
export class AppComponent {
  @ViewChild('description') input: ElementRef | undefined;
}
```

For more information, see "Referencing children with queries".