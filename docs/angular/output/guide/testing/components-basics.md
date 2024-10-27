# Basics of testing components

A component in Angular combines an HTML template and a TypeScript class, working together to create functionality. Testing a component involves ensuring that the template and class interact as intended.

## Component DOM testing

Components interact with the DOM and other components, making it essential to test their rendering and user interactions. Key questions to consider include:

- Is `Lightswitch.clicked()` user-invokable?
- Is `Lightswitch.message` displayed?
- Can users select the hero in `DashboardHeroComponent`?
- Is the hero name displayed correctly?
- Is the welcome message from `WelcomeComponent` shown?

To answer these questions, create the DOM elements associated with the components, examine the DOM for proper state display, and simulate user interactions.

### CLI-generated tests

The Angular CLI generates an initial test file when creating a new component. For example, the command:

```
ng generate component banner --inline-template --inline-style --module app
```

creates a `BannerComponent` and an initial test file, `banner-external.component.spec.ts`.

Note: `compileComponents` is asynchronous and uses the `waitForAsync` utility function from `@angular/core/testing`. Refer to the waitForAsync section for more details.

### Reduce the setup

The initial test file primarily contains boilerplate code. You can simplify it to focus on testing the component:

```typescript
TestBed.configureTestingModule({
  declarations: [BannerComponent]
});
```

The default test module is pre-configured with the `BrowserModule` from `@angular/platform-browser`.

### `createComponent()`

After configuring `TestBed`, call `createComponent()` to create an instance of the component and add it to the test-runner DOM. 

Important: Do not re-configure `TestBed` after calling `createComponent`.

### `ComponentFixture`

`ComponentFixture` is a test harness for interacting with the created component and its element. Access the component instance through the fixture:

```typescript
const fixture = TestBed.createComponent(BannerComponent);
const componentInstance = fixture.componentInstance;
```

### `beforeEach()`

To avoid duplicating `TestBed` configuration, use a Jasmine `beforeEach()` block:

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [BannerComponent]
  });
});
```

Add tests that access the component's element from `fixture.nativeElement`.

### `nativeElement`

`ComponentFixture.nativeElement` has the `any` type. Use standard HTML methods like `querySelector` to navigate the element tree.

### `DebugElement`

Access the component's element through `fixture.debugElement.nativeElement`. This abstraction allows safe interaction across different platforms.

### `By.css()`

For cross-platform compatibility, use `DebugElement` query methods. The `By` class helps create predicates for selecting nodes. 

Example:

```typescript
import { By } from '@angular/platform-browser';
const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
```

This method allows for selecting elements using standard CSS selectors while ensuring compatibility across platforms.