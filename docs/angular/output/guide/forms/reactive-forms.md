# Reactive forms

Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide covers creating and updating a basic form control, using multiple controls in a group, validating form values, and creating dynamic forms.

## Overview of reactive forms

Reactive forms use an explicit and immutable approach to managing form state. Each change returns a new state, maintaining model integrity. Built around observable streams, reactive forms allow synchronous access to input values, ensuring data consistency and predictability.

Reactive forms differ from template-driven forms by providing synchronous data access, immutability with observable operators, and change tracking through observable streams. Template-driven forms rely on directives embedded in the template and mutable data.

## Adding a basic form control

### Steps to use form controls

1. Register the reactive forms module in your application.
2. Generate a new component and instantiate a new `FormControl`.
3. Register the `FormControl` in the template.

### Example: Adding a single form control

1. **Import the ReactiveFormsModule**: Import `ReactiveFormsModule` from `@angular/forms` and add it to your NgModule's `imports` array.
2. **Generate a new component**: Use `ng generate component` to create a component for the control.
3. **Register the control in the template**: Use the `formControl` binding provided by `FormControlDirective` to associate the control with a form element.

### Displaying a form control value

Display the value using:
- `valueChanges` observable with `AsyncPipe` or `subscribe()`.
- `value` property for a snapshot of the current value.

### Replacing a form control value

Use the `setValue()` method to update the control's value programmatically. This method validates the new value against the control's structure.

## Grouping form controls

Reactive forms allow grouping multiple related controls into a single input form using:
- **Form group**: Manages a fixed set of controls.
- **Form array**: Manages a dynamic set of controls.

### Example: Managing multiple form controls

1. Generate a `ProfileEditor` component and import `FormGroup` and `FormControl`.
2. Create a `FormGroup` instance and associate it with the view.
3. Save form data using the `ngSubmit` event.

### Creating nested form groups

Nested form groups allow for better organization of complex forms. Create a nested group by adding a child form group to the parent form group.

## Updating parts of the data model

Use `setValue()` to replace the entire value or `patchValue()` to update specific properties in the model.

## Using the FormBuilder service

The `FormBuilder` service simplifies creating form controls. Steps include:
1. Import `FormBuilder`.
2. Inject `FormBuilder` into the component.
3. Use `control()`, `group()`, and `array()` methods to generate controls.

## Validating form input

Form validation ensures user input is complete and correct. Steps to add validation:
1. Import a validator function.
2. Add the validator to the form field.
3. Handle validation status.

## Creating dynamic forms

`FormArray` manages unnamed controls, allowing dynamic insertion and removal. Steps include:
1. Import `FormArray`.
2. Define a `FormArray` control.
3. Access the control with a getter method.
4. Display the form array in a template.

## Reactive forms API summary

### Classes

- **AbstractControl**: Base class for `FormControl`, `FormGroup`, and `FormArray`.
- **FormControl**: Manages value and validity of an individual control.
- **FormGroup**: Manages value and validity of a group of controls.
- **FormArray**: Manages value and validity of an array of controls.
- **FormBuilder**: Service for creating control instances.
- **FormRecord**: Tracks value and validity of a collection of controls.

### Directives

- **FormControlDirective**: Syncs a standalone `FormControl` to a form element.
- **FormControlName**: Syncs `FormControl` in a `FormGroup` to a form element.
- **FormGroupDirective**: Syncs a `FormGroup` to a DOM element.
- **FormGroupName**: Syncs a nested `FormGroup` to a DOM element.
- **FormArrayName**: Syncs a nested `FormArray` to a DOM element.