# Testing Attribute Directives

An *attribute directive* modifies the behavior of an element, component, or another directive. Its name reflects how the directive is applied: as an attribute on a host element.

## Testing the `HighlightDirective`

The `HighlightDirective` in the sample application sets the background color of an element based on a data-bound color or a default color (lightgray). It also sets a custom property (`customProperty`) to `true` to demonstrate functionality.

The directive is used in the `AboutComponent`.

Testing the `HighlightDirective` within the `AboutComponent` requires techniques from the "Nested component tests" section of Component testing scenarios.

However, testing a single use case may not cover the directive's full capabilities. Finding and testing all components that use the directive can be tedious and may not ensure complete coverage.

*Class-only tests* may help, but since attribute directives manipulate the DOM, isolated unit tests do not provide confidence in the directive's efficacy. 

A better approach is to create an artificial test component that demonstrates all ways to apply the directive.

The `<input>` case binds the `HighlightDirective` to the name of a color value in the input box, with the initial value set to "cyan," which should be the background color of the input box.

### Noteworthy Techniques

- The `By.directive` predicate retrieves elements with the directive when their types are unknown.
- The `:not` pseudo-class in `By.css('h2:not([highlight])')` finds `<h2>` elements without the directive. `By.css('*:not([highlight])')` finds any element that does not have the directive.
- `DebugElement.styles` provides access to element styles without a real browser, but `nativeElement` can be used for clarity.
- Angular adds a directive to the injector of the element to which it is applied. The test for the default color uses the injector of the second `<h2>` to access its `HighlightDirective` instance and `defaultColor`.
- `DebugElement.properties` allows access to the artificial custom property set by the directive.