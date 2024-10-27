# Component testing scenarios

This guide explores common component testing use cases.

## Component binding

The `BannerComponent` presents static title text in the HTML template. After changes, it presents a dynamic title by binding to the component's `title` property.

To confirm that the component displays the correct content, you can add a test.

### Query for the `<h1>`

Write tests to inspect the value of the `<h1>` element wrapping the *title* property interpolation binding. Update the `beforeEach` to find that element with `querySelector`.

### `createComponent()` does not bind data

For the first test, check that the screen displays the default `title`. The test fails because binding happens during **change detection**. The `TestBed.createComponent` does not trigger change detection by default.

### `detectChanges()`

Call `fixture.detectChanges()` to perform data binding. Only then does the `<h1>` have the expected title. This delayed change detection allows inspection and state changes before Angular initiates data binding.

### Automatic change detection

To run change detection automatically, configure the `TestBed` with the `ComponentFixtureAutoDetect` provider. Import it from the testing utility library and add it to the `providers` array.

You can also use `fixture.autoDetectChanges()` to enable automatic change detection after state updates. Automatic change detection is on by default when using `provideExperimentalZonelessChangeDetection`.

### Change an input value with `dispatchEvent()`

To simulate user input, find the input element and set its `value` property. Raise the element's `input` event by calling `dispatchEvent()`.

## Component with external files

The `BannerComponent` can be defined with an *inline template* and *inline css*. Many components specify *external templates* and *external css* using `@Component.templateUrl` and `@Component.styleUrls`.

When running tests in a **non-CLI environment**, tests of components with external files might fail. Call `compileComponents()` to resolve this issue.

## Component with a dependency

Components often have service dependencies. The `WelcomeComponent` displays a welcome message based on the injected `UserService`.

### Provide service test doubles

A *component-under-test* can use test doubles instead of real services. This approach avoids complications with real services that may require user input or network access.

### Get injected services

Access the `UserService` injected into the `WelcomeComponent` from the component's injector, which is a property of the fixture's `DebugElement`.

### `TestBed.inject()`

Use `TestBed.inject()` to retrieve the injected service easily. This method is less verbose than using the fixture's `DebugElement`.

### Final setup and tests

Here's the complete `beforeEach()` using `TestBed.inject()`. The tests confirm that the `UserService` is called and working, validating the component's logic based on different service return values.

## Component with async service

The `AboutComponent` template hosts a `TwainComponent`, which displays quotes. The `quote` property returns an `Observable`.

### Testing with a spy

Use a spy to emulate service calls without hitting a remote server. The spy returns an observable with a test quote.

### Async test with `fakeAsync()`

Import `zone.js/testing` in your test setup file. Use `fakeAsync()` to confirm expected behavior when the service returns an `ErrorObservable`.

### The `tick()` function

Call `tick()` to advance the virtual clock and simulate the passage of time until all pending asynchronous activities finish.

### Async observables

Return an *asynchronous* observable from the `getQuote()` spy to reflect real-world behavior. Use an `asyncData` helper to create an observable that emits the data value in the next turn of the JavaScript engine.

### More async tests

With the `getQuote()` spy returning async observables, most tests will need to be async as well. Use `fixture.whenStable()` to wait for the observable to emit the next quote.

## Component with inputs and outputs

A component with inputs and outputs typically appears inside the view template of a host component. The goal is to verify that bindings work as expected.

### Test `DashboardHeroComponent` standalone

Set up the test by assigning a test hero to the component's `hero` property. Verify that the hero name is propagated to the template.

### Clicking

Clicking the hero should raise a `selected` event. The test subscribes to it explicitly, confirming that the event emits the correct hero object.

### `triggerEventHandler`

Use `DebugElement.triggerEventHandler` to raise any data-bound event by its event name.

### Click the element

Alternatively, call the native element's `click()` method.

### `click()` helper

Encapsulate the click-triggering process in a helper function for consistency.

## Component inside a test host

Test the `DashboardHeroComponent` when properly data-bound to a host component. The test host sets the component's `hero` input property and binds the `selected` event.

## Routing component

A *routing component* tells the `Router` to navigate to another component. Use the `provideRouter` function in the test module.

### Routed components

A *routed component* is the destination of a `Router` navigation. Tests can explore how the `HeroDetailComponent` responds to different `id` parameter values.

### Testing with the `RouterTestingHarness`

Demonstrate the component's behavior when the observed `id` refers to an existing hero.

## Nested component tests

Minimize setup complexity by stubbing unneeded components or using `NO_ERRORS_SCHEMA` in the `TestBed.schemas` metadata.

### Use both techniques together

Combine stubbing and `NO_ERRORS_SCHEMA` to reduce the visual surface of the component.

### `By.directive` and injected directives

Use `By.directive` to locate anchor elements with attached directives.

## Use a `page` object

Create a `Page` class to handle access to component properties and encapsulate logic for setting them.

## Calling `compileComponents()`

If running tests in a **non-CLI environment**, call `compileComponents()` to compile components that use external templates or CSS files.

### The async `beforeEach`

Write an async `beforeEach` to compile components.

### The synchronous `beforeEach`

The second `beforeEach()` contains the remaining setup steps.

### Consolidated setup

You can consolidate the two `beforeEach()` functions into a single async `beforeEach()`.

### `compileComponents()` is harmless

There's no harm in calling `compileComponents()` when it's not required.

## Setup with module imports

Configure the testing module with `providers` and `imports` for complex components.

### Import a shared module

Use a `SharedModule` to combine frequently requested parts.

### Import a feature module

Import the `HeroModule` to configure tests when there are many mutual dependencies.

## Override component providers

Use `TestBed.overrideComponent` to replace the component's providers with test doubles.

### The `overrideComponent` method

This method resets the component's `providers` metadata.

### Provide a *spy stub* (`HeroDetailServiceSpy`)

Replace the component's `providers` array with a new array containing a `HeroDetailServiceSpy`.

### The override tests

Control the component's hero directly by manipulating the spy-stub's `testHero`.