# Built-in directives

Directives are classes that add additional behavior to elements in your Angular applications. Use Angular's built-in directives to manage forms, lists, styles, and what users see.

## Directive Types

- **Components**: Used with a template; the most common directive type.
- **Attribute directives**: Change the appearance or behavior of an element, component, or another directive.
- **Structural directives**: Change the DOM layout by adding and removing DOM elements.

This guide covers built-in attribute directives and structural directives.

## Built-in Attribute Directives

Attribute directives listen to and modify the behavior of other HTML elements, attributes, properties, and components. Common attribute directives include:

- **NgClass**: Adds and removes a set of CSS classes.
- **NgStyle**: Adds and removes a set of HTML styles.
- **NgModel**: Adds two-way data binding to an HTML form element.

### Adding and Removing Classes with NgClass

To use `NgClass`, import it into the component's `imports` list. Use `[ngClass]` on the element to style, setting it equal to an expression or method.

### Setting Inline Styles with NgStyle

To use `NgStyle`, import it into the component's `imports` list. Use `ngStyle` to set multiple inline styles based on the component's state.

### Displaying and Updating Properties with NgModel

To use `NgModel`, import `FormsModule` into the component's `imports` list. Use `[(ngModel)]` binding on an HTML form element to display and update a data property.

## Built-in Structural Directives

Structural directives are responsible for HTML layout, typically by adding, removing, and manipulating host elements. Common built-in structural directives include:

- **NgIf**: Conditionally creates or disposes of subviews from the template.
- **NgFor**: Repeats a node for each item in a list.
- **NgSwitch**: Switches among alternative views based on a condition.

### Adding or Removing an Element with NgIf

To use `NgIf`, import it into the component's `imports` list. Bind `*ngIf` to a condition expression to add or remove an element.

### Listing Items with NgFor

To use `NgFor`, import it into the component's `imports` list. Define a block of HTML for rendering a single item and use `*ngFor` with `let item of items`.

### Switching Cases with NgSwitch

To use `NgSwitch`, import it into the component's `imports` list. Add `[ngSwitch]` to an element bound to a switch value, and use `*ngSwitchCase` and `*ngSwitchDefault` for the cases.

## Helpful Links

- For more information on attribute directives, visit: guide/directives/attribute-directives
- For structural directives, visit: guide/directives/structural-directives
- For directive composition API, visit: guide/directives/directive-composition-api