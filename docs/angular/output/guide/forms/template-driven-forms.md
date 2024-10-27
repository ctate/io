# Building a template-driven form

This tutorial demonstrates how to create a template-driven form in Angular, where control elements are bound to data properties with input validation to maintain data integrity and enhance user experience.

Template-driven forms utilize two-way data binding to synchronize the data model in the component with changes made in the template.

**Template vs Reactive forms**: Angular supports two approaches for interactive forms. Template-driven forms use form-specific directives in the Angular template, while reactive forms offer a model-driven approach. Template-driven forms are ideal for small or simple forms, whereas reactive forms are better for complex forms. For more information, see "Choosing an approach".

You can create various forms with Angular templates, including login forms, contact forms, and business forms. You can creatively layout controls, bind them to data, specify validation rules, display validation errors, and provide visual feedback.

## Objectives

This tutorial covers how to:

- Build an Angular form with a component and template.
- Use `ngModel` for two-way data bindings to read and write input-control values.
- Provide visual feedback using CSS classes that track control states.
- Display validation errors and conditionally allow input based on form status.
- Share information across HTML elements using template reference variables.

## Build a template-driven form

Template-driven forms rely on directives defined in the `FormsModule`.

- **Directives**:
  - `NgModel`: Synchronizes value changes in the form element with the data model, enabling input validation and error handling.
  - `NgForm`: Creates a top-level `FormGroup` instance and binds it to a `<form>` element to track aggregated form value and validation status.
  - `NgModelGroup`: Creates and binds a `FormGroup` instance to a DOM element.

### Step overview

1. Build the basic form:
   - Define a sample data model.
   - Include the `FormsModule`.
2. Bind form controls to data properties using `ngModel` and two-way data-binding syntax.
3. Track input validity and control status using `ngModel`.
4. Respond to a button-click event by adding to the model data.
5. Handle form submission using the `ngSubmit` output property of the form.

## Build the form

1. Create the `Actor` class to define the data model.

2. Define the form layout in the `ActorFormComponent` class.

3. Create a new actor instance to show an example actor in the initial form.

4. Enable the Forms feature and register the form component.

5. Display the form in the application layout defined by the root component's template.

6. Use style classes from Twitter Bootstrap for styling.

7. Require that an actor's skill is chosen from a predefined list of `skills` using the `NgForOf` directive.

## Bind input controls to data properties

Bind input controls to the corresponding `Actor` properties with two-way data binding using the `ngModel` directive.

1. Edit the template file `actor-form.component.html`.
2. Add the `ngModel` directive to the `<input>` tag next to the **Name** label.

### Access the overall form status

Declare a template reference variable to access the `NgForm` directive instance.

1. Update the `<form>` tag with a template reference variable, `#actorForm`.

2. Run the app and observe the data flow between the input box and the model.

### Naming control elements

Define a `name` attribute for each element using `[(ngModel)]` to register the element with the `NgForm` directive.

1. Add `[(ngModel)]` bindings and `name` attributes to **Studio** and **Skill**.

## Track form states

Angular applies the `ng-submitted` class to form elements after submission, which can be used to change the form's style.

## Track control states

Adding the `NgModel` directive to a control adds class names that describe its state. The following classes are applied based on the control's state:

- `ng-touched` / `ng-untouched`
- `ng-dirty` / `ng-pristine`
- `ng-valid` / `ng-invalid`

### Create visual feedback for states

Define CSS classes for `ng-*` states in a new `forms.css` file and include it in the project.

### Show and hide validation error messages

Provide error messages for the **Name** input box when it is required and invalid.

1. Add a local reference to the input.
2. Add an error message `<div>`.
3. Make the error message conditional based on the control's state.

## Add a new actor

To allow users to add a new actor, add a **New Actor** button that responds to a click event.

1. Place a "New Actor" `<button>` at the bottom of the form.
2. Add the actor-creation method to the actor data model.
3. Bind the button's click event to the `newActor()` method.

## Submit the form with `ngSubmit`

To submit the form, bind the form's `ngSubmit` event property to the `onSubmit()` method.

1. Bind the disabled property of the **Submit** button to the form's validity.

### Respond to form submission

Wrap the form in a `<div>` and bind its `hidden` property to the `submitted` property.

1. Add HTML to show a read-only actor while the form is in the submitted state.
2. Test the Edit button to switch back to the editable form.

## Summary

The Angular form utilizes various framework features for data modification, validation, and more, including:

- Angular HTML form template
- Form component class with `@Component` decorator
- Handling form submission with `NgForm.ngSubmit`
- Template-reference variables
- `[(ngModel)]` syntax for two-way data binding
- `name` attributes for validation and tracking
- Controlling the **Submit** button's enabled state
- Custom CSS classes for visual feedback

Final code for the application includes:

- actor-form/actor-form.component.ts
- actor-form/actor-form.component.html
- actor.ts
- app.module.ts
- app.component.html
- app.component.ts
- main.ts
- forms.css