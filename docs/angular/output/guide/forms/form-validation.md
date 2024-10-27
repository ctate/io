# Validating form input

You can enhance data quality by validating user input for accuracy and completeness. This guide explains how to validate user input from the UI and display useful validation messages in both reactive and template-driven forms.

## Validating input in template-driven forms

To add validation to a template-driven form, use the same validation attributes as with native HTML form validation. Angular uses directives to match these attributes with validator functions.

When a form control's value changes, Angular runs validation, generating either a list of validation errors (resulting in an `INVALID` status) or null (resulting in a VALID status).

You can inspect the control's state by exporting `ngModel` to a local template variable. For example, export `NgModel` into a variable called `name`.

### Features of the example

- The `<input>` element includes HTML validation attributes: `required` and `minlength`, along with a custom validator directive, `forbiddenName`.
- `#name="ngModel"` exports `NgModel` into a variable called `name`, allowing you to check control states like `valid` and `dirty`.
- The `*ngIf` directive on the `<div>` element reveals nested message `divs` only if `name` is invalid and the control is either `dirty` or `touched`.
- Each nested `<div>` can present a custom message for validation errors such as `required`, `minlength`, and `forbiddenName`.

To prevent displaying errors before user interaction, check for `dirty` or `touched` states.

## Validating input in reactive forms

In reactive forms, the component class is the source of truth. Validators are added directly to the form control model in the component class, and Angular calls these functions whenever the control's value changes.

### Validator functions

Validator functions can be synchronous or asynchronous.

- **Sync validators**: Synchronous functions that take a control instance and return either a set of validation errors or null. Pass these as the second argument when instantiating a `FormControl`.
- **Async validators**: Asynchronous functions that take a control instance and return a Promise or Observable that emits validation errors or null. Pass these as the third argument when instantiating a `FormControl`.

Angular only runs async validators if all sync validators pass.

### Built-in validator functions

You can use Angular's built-in validators, such as `required` and `minlength`, as functions from the `Validators` class. For a full list, see the Validators API reference.

To update the actor form to be a reactive form, use built-in validators in function form.

### Custom validators

Custom validators are necessary when built-in validators do not meet your application's needs. For example, the `forbiddenNameValidator` function detects a specific forbidden name and returns a validator function.

### Adding custom validators

- **Reactive forms**: Pass the custom validator function directly to the `FormControl`.
- **Template-driven forms**: Create a directive that wraps the validator function and register it with the `NG_VALIDATORS` provider.

## Control status CSS classes

Angular mirrors control properties onto form control elements as CSS classes. Use these classes to style form controls based on their state:

- `.ng-valid`
- `.ng-invalid`
- `.ng-pending`
- `.ng-pristine`
- `.ng-dirty`
- `.ng-untouched`
- `.ng-touched`
- `.ng-submitted` (enclosing form element only)

## Cross-field validation

Cross-field validators compare values of different fields in a form. For example, they can ensure that actor names and roles do not match.

### Adding cross-validation

- **Reactive forms**: Add a validator to the `FormGroup` that compares sibling controls.
- **Template-driven forms**: Create a directive to wrap the validator function and register it at the highest level in the form.

## Creating asynchronous validators

Asynchronous validators implement the `AsyncValidatorFn` and `AsyncValidator` interfaces. They must return a Promise or an observable that completes.

### Implementing a custom async validator

Create a validator class that checks if a role is already taken by consulting a database. The validator should handle potential errors gracefully.

### Adding async validators

- **Reactive forms**: Inject the async validator into the component class and pass it to the `FormControl`.
- **Template-driven forms**: Create a directive and register the `NG_ASYNC_VALIDATORS` provider.

### Optimizing performance

To avoid performance issues with async validators, change the `updateOn` property from `change` (default) to `submit` or `blur`.

## Interaction with native HTML form validation

By default, Angular disables native HTML form validation by adding the `novalidate` attribute to the enclosing `<form>`. To use native validation alongside Angular validation, re-enable it with the `ngNativeValidate` directive.