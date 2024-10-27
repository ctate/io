# Advanced component configuration

Tip: This guide assumes you've already read the Essentials Guide. Read that first if you're new to Angular.

## ChangeDetectionStrategy

The `@Component` decorator accepts a `changeDetection` option that controls the component's **change detection mode**. There are two options:

- **`ChangeDetectionStrategy.Default`**: The default strategy where Angular checks for DOM updates whenever any application-wide activity occurs, such as user interaction, network responses, or timers.

- **`ChangeDetectionStrategy.OnPush`**: An optional mode that reduces the amount of checking. Angular only checks for DOM updates when:
  - A component input changes due to a binding in a template.
  - An event listener in the component runs.
  - The component is explicitly marked for check using `ChangeDetectorRef.markForCheck` or similar methods like `AsyncPipe`.

When an OnPush component is checked, Angular also checks all of its ancestor components.

## PreserveWhitespaces

By default, Angular removes and collapses unnecessary whitespace in templates. You can change this by setting `preserveWhitespaces` to `true` in a component's metadata.

## Custom element schemas

By default, Angular throws an error for unknown HTML elements. To disable this behavior, include `CUSTOM_ELEMENTS_SCHEMA` in the `schemas` property of your component metadata.

```angular-ts
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  ...,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<some-unknown-component></some-unknown-component>'
})
export class ComponentWithCustomElements { }
```

Angular does not support any other schemas at this time.