# Component selectors

Tip: This guide assumes you've already read the Essentials Guide. Read that first if you're new to Angular.

Every component defines a CSS selector that determines how the component is used:

```typescript
@Component({
  selector: 'profile-photo',
  ...
})
export class ProfilePhoto { }
```

You use a component by creating a matching HTML element in the templates of other components:

```typescript
@Component({
  template: `
    <profile-photo />
    <button>Upload a new profile photo</button>`,
  ...,
})
export class UserProfile { }
```

**Angular matches selectors statically at compile-time.** Changing the DOM at run-time does not affect the components rendered.

**An element can match exactly one component selector.** If multiple component selectors match a single element, Angular reports an error.

**Component selectors are case-sensitive.**

## Types of selectors

Angular supports a limited subset of basic CSS selector types in component selectors:

- **Type selector**: Matches elements based on their HTML tag name. Example: `profile-photo`
- **Attribute selector**: Matches elements based on the presence of an HTML attribute. Example: `[dropzone]`, `[type="reset"]`
- **Class selector**: Matches elements based on the presence of a CSS class. Example: `.menu-item`

For attribute values, Angular supports matching an exact attribute value with the equals (`=`) operator. Other attribute value operators are not supported.

Angular component selectors do not support combinators or specifying namespaces.

### The `:not` pseudo-class

Angular supports the `:not` pseudo-class. You can append this pseudo-class to any other selector to narrow which elements a component's selector matches. For example:

```typescript
@Component({
  selector: '[dropzone]:not(textarea)',
  ...
})
export class DropZone { }
```

Angular does not support any other pseudo-classes or pseudo-elements in component selectors.

### Combining selectors

You can combine multiple selectors by concatenating them. For example:

```typescript
@Component({
  selector: 'button[type="reset"]',
  ...
})
export class ResetButton { }
```

You can also define multiple selectors with a comma-separated list:

```typescript
@Component({
  selector: 'drop-zone, [dropzone]',
  ...
})
export class DropZone { }
```

Angular creates a component for each element that matches any of the selectors in the list.

## Choosing a selector

The majority of components should use a custom element name as their selector. All custom element names should include a hyphen as described by the HTML specification. Angular reports an error if it encounters a custom tag name that does not match any available components.

See Advanced component configuration for details on using native custom elements in Angular templates.

### Selector prefixes

The Angular team recommends using a short, consistent prefix for all custom components defined inside your project. For example, if you were to build YouTube with Angular, you might prefix your components with `yt-`, resulting in components like `yt-menu`, `yt-player`, etc. By default, the Angular CLI uses `app-`.

Angular uses the `ng` selector prefix for its own framework APIs. Never use `ng` as a selector prefix for your own custom components.

### When to use an attribute selector

Consider an attribute selector when you want to create a component on a standard native element. For example:

```typescript
@Component({
  selector: 'button[yt-upload]',
  ...
})
export class YouTubeUploadButton { }
```

This approach allows consumers of the component to directly use all the element's standard APIs without extra work, which is especially valuable for ARIA attributes such as `aria-label`.

Angular does not report errors when it encounters custom attributes that don't match an available component. When using components with attribute selectors, consumers may forget to import the component or its NgModule, resulting in the component not rendering. See Importing and using components for more information.

Components that define attribute selectors should use lowercase, dash-case attributes, following the same prefixing recommendation described above.