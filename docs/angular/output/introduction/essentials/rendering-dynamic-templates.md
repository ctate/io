# Rendering Dynamic Templates

Use Angular's template syntax to create dynamic HTML.

What you've learned so far enables you to break an application up into components of HTML, but this limits you to static templates (i.e., content that doesn't change). The next step is to learn how to make use of Angular's template syntax to create dynamic HTML.

## Rendering Dynamic Data

When displaying dynamic content in your template, Angular uses the double curly brace syntax to distinguish between static and dynamic content.

Example from a `TodoListItem` component:

```angular-ts
@Component({
  selector: 'todo-list-item',
  template: `
    <p>Title: {{ taskTitle }}</p>
  `,
})
export class TodoListItem {
  taskTitle = 'Read cup of coffee';
}
```

Output when rendered:

```angular-html
<p>Title: Read cup of coffee</p>
```

This syntax declares an **interpolation** between the dynamic data property inside the HTML. Angular automatically updates the DOM whenever the data changes.

## Dynamic Properties

To dynamically set the value of standard DOM properties on an HTML element, wrap the property in square brackets. This informs Angular that the declared value should be interpreted as a JavaScript-like statement.

Example for a form submit button:

```angular-ts
@Component({
  selector: 'sign-up-form',
  template: `
    <button type="submit" [disabled]="formIsInvalid">Submit</button>
  `,
})
export class SignUpForm {
  formIsInvalid = true;
}
```

Rendered HTML when `formIsInvalid` is true:

```angular-html
<button type="submit" disabled>Submit</button>
```

## Dynamic Attributes

To dynamically bind custom HTML attributes (e.g., `aria-`, `data-`), prepend the custom attribute with the `attr.` prefix.

Example:

```angular-ts
@Component({
  standalone: true,
  template: `
    <button [attr.data-test-id]="testId">Primary CTA</button>
  `,
})
export class AppBanner {
  testId = 'main-cta';
}
```

## Next Step

Now that you have dynamic data and templates in the application, it's time to learn how to enhance templates by conditionally hiding or showing certain elements, looping over elements, and more.

For more information, visit: essentials/conditionals-and-loops