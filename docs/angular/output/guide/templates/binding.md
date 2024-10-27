# Binding dynamic text, properties and attributes

In Angular, a **binding** creates a dynamic connection between a component's template and its data, ensuring that changes to the component's data automatically update the rendered template.

## Render dynamic text with text interpolation

Bind dynamic text in templates using double curly braces for **text interpolation**.

```angular-ts
@Component({
  template: `
    <p>Your color preference is {{ theme }}.</p>
  `,
  ...
})
export class AppComponent {
  theme = 'dark';
}
```

When rendered, Angular replaces `{{ theme }}` with `dark`.

```angular-html
<!-- Rendered Output -->
<p>Your color preference is dark.</p>
```

If `theme` changes to `'light'`, the output updates to:

```angular-html
<!-- Rendered Output -->
<p>Your color preference is light.</p>
```

All expression values are converted to strings.

## Binding dynamic properties and attributes

Use square brackets to bind dynamic values into object properties and HTML attributes.

### Native element properties

Bind to properties on an HTML element's DOM instance.

```angular-html
<button [disabled]="isFormValid">Save</button>
```

When `isFormValid` changes, Angular updates the `disabled` property.

### Component and directive properties

Bind component input properties using square brackets.

```angular-html
<my-listbox [value]="mySelection" />
```

Bind to directive properties as well.

```angular-html
<img [ngSrc]="profilePhotoUrl" alt="The current user's profile photo">
```

### Attributes

Bind HTML attributes without corresponding DOM properties using the `attr.` prefix.

```angular-html
<ul [attr.role]="listRole">
```

If the value is `null`, Angular removes the attribute.

### Text interpolation in properties and attributes

Use text interpolation syntax in properties and attributes.

```angular-html
<img src="profile-photo.jpg" alt="Profile photo of {{ firstName }}" >
```

For attributes, prefix with `attr.`.

```angular-html
<button attr.aria-label="Save changes to {{ objectType }}">
```

## CSS class and style property bindings

Angular supports binding CSS classes and style properties.

### CSS classes

Create a CSS class binding based on truthy or falsy values.

```angular-html
<ul [class.expanded]="isExpanded">
```

Bind directly to the `class` property with various value types:

- A string of CSS classes
- An array of CSS class strings
- An object with CSS class names as keys and truthiness as values

```angular-ts
@Component({
  template: `
    <ul [class]="listClasses"> ... </ul>
    <section [class]="sectionClasses"> ... </section>
    <button [class]="buttonClasses"> ... </button>
  `,
  ...
})
export class UserProfile {
  listClasses = 'full-width outlined';
  sectionClasses = ['expandable', 'elevated'];
  buttonClasses = {
    highlighted: true,
    embiggened: false,
  };
}
```

Static CSS classes and bindings combine in the rendered result.

```angular-ts
@Component({
  template: `<ul class="list" [class]="listType" [class.expanded]="isExpanded"> ...`,
  ...
})
export class Listbox {
  listType = 'box';
  isExpanded = true;
}
```

Angular does not guarantee the order of CSS classes.

### CSS style properties

Bind to CSS style properties directly.

```angular-html
<section [style.display]="isExpanded ? 'block' : 'none'">
```

Specify units for CSS properties.

```angular-html
<section [style.height.px]="sectionHeightInPixels">
```

Bind multiple style values:

```angular-ts
@Component({
  template: `
    <ul [style]="listStyles"> ... </ul>
    <section [style]="sectionStyles"> ... </section>
  `,
  ...
})
export class UserProfile {
  listStyles = 'display: flex; padding: 8px';
  sectionStyles = {
    border: '1px solid black',
    'font-weight': 'bold',
  };
}
```

When binding `style` to an object, create a new object instance to apply updates. Angular resolves collisions by following its style precedence order.