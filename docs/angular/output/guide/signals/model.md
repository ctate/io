# Model inputs

**Model inputs** enable a component to propagate new values back to another component. They are defined similarly to standard inputs.

```angular-ts
import {Component, model, input} from '@angular/core';

@Component({...})
export class CustomCheckbox {
  checked = model(false); // Model input
  disabled = input(false); // Standard input
}
```

Model inputs allow the component author to write values into the property, while standard inputs are read-only. You can read the value of model inputs using the signal function in reactive contexts like `computed` and `effect`.

```angular-ts
import {Component, model, input} from '@angular/core';

@Component({
  selector: 'custom-checkbox',
  template: '<div (click)="toggle()"> ... </div>',
})
export class CustomCheckbox {
  checked = model(false);
  disabled = input(false);

  toggle() {
    this.checked.set(!this.checked()); // Write directly to model inputs
  }
}
```

When a component writes a new value into a model input, Angular propagates the new value back to the component binding that input, enabling **two-way binding**.

## Two-way binding with signals

You can bind a writable signal to a model input.

```angular-ts
@Component({
  ...,
  template: '<custom-checkbox [(checked)]="isAdmin" />',
})
export class UserProfile {
  protected isAdmin = signal(false);
}
```

In this example, `CustomCheckbox` writes values into its `checked` model input, which propagates back to the `isAdmin` signal in `UserProfile`, keeping them in sync.

## Two-way binding with plain properties

You can also bind a plain JavaScript property to a model input.

```angular-ts
@Component({
  ...,
  template: '<custom-checkbox [(checked)]="isAdmin" />',
})
export class UserProfile {
  protected isAdmin = false;
}
```

Here, `CustomCheckbox` writes values into its `checked` model input, which then propagates back to the `isAdmin` property, maintaining synchronization.

## Implicit `change` events

Declaring a model input automatically creates a corresponding output named with the model input's name suffixed with "Change".

```angular-ts
@Directive({...})
export class CustomCheckbox {
  checked = model(false); // Creates output "checkedChange"
}
```

Angular emits this change event whenever a new value is written into the model input.

## Customizing model inputs

Model inputs can be marked as required or given an alias, similar to standard inputs. They do not support input transforms.

## Differences between `model()` and `input()`

1. `model()` defines both an input and an output, with the output's name being the input's name suffixed with `Change`.
2. `ModelSignal` is a `WritableSignal`, allowing value changes from anywhere using `set` and `update` methods, emitting to its output. In contrast, `InputSignal` is read-only.
3. Model inputs do not support input transforms, while signal inputs do.

## When to use model inputs

Use model inputs for components that support two-way binding, especially when modifying a value based on user interaction, such as custom form controls like date pickers or comboboxes.