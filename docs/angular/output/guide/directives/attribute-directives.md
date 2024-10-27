# Attribute directives

Change the appearance or behavior of DOM elements and Angular components with attribute directives.

## Building an attribute directive

Create a highlight directive that sets the background color of the host element to yellow.

1. Use the CLI command `ng generate directive highlight`. This creates `src/app/highlight.directive.ts` and `src/app/highlight.directive.spec.ts`.

   The `@Directive()` decorator's configuration property specifies the directive's CSS attribute selector, `[appHighlight]`.

2. Import `ElementRef` from `@angular/core` to access the host DOM element via its `nativeElement` property.

3. Inject `ElementRef` in the directive's `constructor()` to reference the host DOM element.

4. Add logic to the `HighlightDirective` class to set the background to yellow.

Directives do not support namespaces.

## Applying an attribute directive

To use the `HighlightDirective`, add a `<p>` element to the HTML template with the directive as an attribute. Angular creates an instance of the `HighlightDirective` class and injects a reference to the `<p>` element, setting its background style to yellow.

## Handling user events

Detect when a user mouses into or out of the element and respond by setting or clearing the highlight color.

1. Import `HostListener` from `@angular/core`.

2. Add two event handlers with the `@HostListener()` decorator for mouse enter and leave events.

The handlers delegate to a helper method, `highlight()`, that sets the color on the host DOM element.

The complete directive is as follows:

The background color appears when the pointer hovers over the paragraph element and disappears when the pointer moves out.

## Passing values into an attribute directive

Set the highlight color while applying the `HighlightDirective`.

1. In `highlight.directive.ts`, import `Input` from `@angular/core`.

2. Add an `appHighlight` `@Input()` property to make it available for binding.

3. In `app.component.ts`, add a `color` property to the `AppComponent`.

4. Use property binding with the `appHighlight` directive selector to set the color.

The `[appHighlight]` attribute binding applies the highlighting directive and sets the highlight color.

### Setting the value with user input

Add radio buttons to bind your color choice to the `appHighlight` directive.

1. Add markup for choosing a color in `app.component.html`.

2. Revise the `AppComponent.color` to have no initial value.

3. In `highlight.directive.ts`, revise the `onMouseEnter` method to highlight with `appHighlight` or fall back to `red`.

4. Serve your application to verify that the user can choose the color with the radio buttons.

## Binding to a second property

Configure your application to allow setting a default color.

1. Add a second `Input()` property called `defaultColor` to `HighlightDirective`.

2. Revise the directive's `onMouseEnter` to highlight with `appHighlight`, then `defaultColor`, and fall back to `red`.

3. Bind to the `AppComponent.color` and set "violet" as the default color.

The default color is red if there is no default color binding. When the user chooses a color, it becomes the active highlight color.

## Deactivating Angular processing with `NgNonBindable`

To prevent expression evaluation, add `ngNonBindable` to the host element. This deactivates interpolation, directives, and binding in templates.

Applying `ngNonBindable` to an element stops binding for that element's child elements but allows directives to work on the element where `ngNonBindable` is applied. If applied to a parent element, Angular disables interpolation and binding for the element's children.