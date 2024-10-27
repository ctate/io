# Angular elements overview

_Angular elements_ are Angular components packaged as _custom elements_ (Web Components), a web standard for defining new HTML elements in a framework-agnostic way.

Custom elements are a Web Platform feature available on all browsers supported by Angular. A custom element extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. The browser maintains a `CustomElementRegistry` of defined custom elements, mapping an instantiable JavaScript class to an HTML tag.

The `@angular/elements` package exports a `createCustomElement()` API that bridges Angular's component interface and change detection functionality to the built-in DOM API. Transforming a component to a custom element makes all the required Angular infrastructure available to the browser, automatically connecting your component-defined view with change detection and data binding.

## Using custom elements

Custom elements bootstrap themselves when added to the DOM and are destroyed when removed. Once added, they behave like any other HTML element, requiring no special knowledge of Angular.

To add the `@angular/elements` package to your workspace, run:

```
npm install @angular/elements --save
```

### How it works

The `createCustomElement()` function converts a component into a class that can be registered with the browser as a custom element. After registration, use the new element like a built-in HTML element:

```html
<my-popup message="Use Angular!"></my-popup>
```

When placed on a page, the browser creates an instance of the registered class. The component's template, using Angular syntax, provides the content, and input properties correspond to input attributes for the element.

## Transforming components to custom elements

Angular provides the `createCustomElement()` function for converting a component and its dependencies to a custom element. This process implements the `NgElementConstructor` interface, creating a constructor class configured to produce a self-bootstrapping instance of your component.

Use the browser's `customElements.define()` function to register the configured constructor and its associated custom-element tag. Avoid using the component's selector as the custom element tag name to prevent unexpected behavior.

### Mapping

A custom element _hosts_ an Angular component, bridging the data and logic defined in the component with standard DOM APIs.

- The creation API parses the component for input properties, defining corresponding attributes for the custom element. Property names are transformed to be compatible with custom elements, resulting in dash-separated lowercase names (e.g., `my-input-prop` for `@Input('myInputProp') inputProp`).
  
- Component outputs are dispatched as HTML Custom Events, with the event name matching the output name (e.g., `valueChanged` for `@Output() valueChanged = new EventEmitter()`).

For more information, see Web Component documentation for Creating custom events.

## Example: A Popup Service

Using an Angular custom element simplifies adding components at runtime by providing all necessary infrastructure automatically. You still need to exclude the component from compilation if not used in your application.

The Popup Service example application defines a component that can be loaded dynamically or converted to a custom element.

- `popup.component.ts`: Defines a simple pop-up element displaying an input message with animation and styling.
- `popup.service.ts`: Creates an injectable service providing two ways to invoke the `PopupComponent`: as a dynamic component or as a custom element.
- `app.component.ts`: Defines the application's root component, using the `PopupService` to add the pop-up to the DOM at runtime.

The demo shows both methods, with one button adding the popup dynamically and the other using the custom element.

```typescript
// popup.component.ts
@Component(…)
class PopupComponent {
  @Input() message: string;
}

// popup.service.ts
@Injectable({ providedIn: 'root' })
export class PopupService {
  // Service methods for dynamic and custom element usage
}

// app.component.ts
@Component(…)
class AppComponent {
  constructor(private popupService: PopupService) {
    // Convert PopupComponent to a custom element
  }
}
```

## Typings for custom elements

Generic DOM APIs return an element type appropriate for specified arguments. For unknown elements, methods return a generic type (e.g., `HTMLElement` for custom elements).

Custom elements created with Angular extend `NgElement` (which extends `HTMLElement`). These custom elements have a property for each input of the corresponding component.

To get correct types for custom elements, cast the return value of DOM methods to the correct type using `NgElement` and `WithProperties`:

```typescript
const aDialog = document.createElement('my-dialog') as NgElement & WithProperties<{content: string}>;
aDialog.content = 'Hello, world!'; // TypeScript checks type
```

Alternatively, augment the `HTMLElementTagNameMap` to define each custom element's type once:

```typescript
declare global {
  interface HTMLElementTagNameMap {
    'my-dialog': NgElement & WithProperties<{content: string}>;
  }
}
```

Now, TypeScript can infer the correct type for custom elements:

```typescript
document.createElement('my-dialog'); //--> NgElement & WithProperties<{content: string}>
```