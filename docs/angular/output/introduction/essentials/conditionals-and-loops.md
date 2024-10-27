# Conditionals and Loops

Conditionally show and/or repeat content based on dynamic data.

One of the advantages of using a framework like Angular is that it provides built-in solutions for common problems developers encounter, such as displaying content based on conditions or rendering lists of items.

Angular uses built-in control flow blocks to dictate when and how templates should be rendered.

## Conditional Rendering

A common scenario is showing or hiding content based on a condition, such as user permission levels.

### `@if` Block

Angular uses `@if` control flow blocks to conditionally hide and show parts of a template.

```angular-ts
// user-controls.component.ts
@Component({
  standalone: true,
  selector: 'user-controls',
  template: `
    @if (isAdmin) {
      <button>Erase database</button>
    }
  `,
})
export class UserControls {
  isAdmin = true;
}
```

In this example, the `<button>` element is rendered only if `isAdmin` is true.

### `@else` Block

To show fallback UI when a condition is not met, use the `@else` block.

```angular-ts
// user-controls.component.ts
@Component({
  standalone: true,
  selector: 'user-controls',
  template: `
    @if (isAdmin) {
      <button>Erase database</button>
    } @else {
      <p>You are not authorized.</p>
    }
  `,
})
export class UserControls {
  isAdmin = true;
}
```

## Rendering a List

Another common scenario is rendering a list of items.

### `@for` Block

Angular provides the `@for` block for rendering repeated elements.

```angular-html
<!-- ingredient-list.component.html -->
<ul>
  @for (ingredient of ingredientList; track ingredient.name) {
    <li>{{ ingredient.quantity }} - {{ ingredient.name }}</li>
  }
</ul>
```

```angular-ts
// ingredient-list.component.ts
@Component({
  standalone: true,
  selector: 'ingredient-list',
  templateUrl: './ingredient-list.component.html',
})
export class IngredientList {
  ingredientList = [
    {name: 'noodles', quantity: 1},
    {name: 'miso broth', quantity: 1},
    {name: 'egg', quantity: 2},
  ];
}
```

The `track` keyword is used to provide a unique identifier for each item, ensuring proper updates and tracking within Angular.

## Next Step

With the ability to determine when and how templates are rendered, the next topic is handling user input.

For more information, visit: essentials/handling-user-interaction