# Forms in Angular

Handling user input with forms is the cornerstone of many common applications. Applications use forms to enable users to log in, update profiles, enter sensitive information, and perform various data-entry tasks.

Angular provides two approaches to handling user input through forms: reactive and template-driven. Both capture user input events, validate input, create a form model, and track changes.

This guide helps you decide which form type works best for your situation, introduces common building blocks, summarizes key differences, and demonstrates those differences in setup, data flow, and testing.

## Choosing an approach

Reactive forms and template-driven forms process and manage form data differently, each offering distinct advantages.

- **Reactive forms**: Provide direct access to the underlying form's object model. They are more robust, scalable, reusable, and testable. Use reactive forms if forms are central to your application or if you're using reactive patterns.
  
- **Template-driven forms**: Rely on directives in the template to create and manipulate the underlying object model. They are useful for simple forms but do not scale as well. Use template-driven forms for basic requirements managed solely in the template.

### Key differences

|                                                    | Reactive                             | Template-driven                 |
|:---                                                |:---                                  |:---                             |
| Setup of form model                                | Explicit, created in component class | Implicit, created by directives |
| Data model                                         | Structured and immutable             | Unstructured and mutable        |
| Data flow                                          | Synchronous                          | Asynchronous                    |
| Form validation                                    | Functions                            | Directives                      |

### Scalability

Reactive forms are more scalable, providing direct access to the form API and using synchronous data flow, making large-scale forms easier to create and test. Template-driven forms focus on simple scenarios and abstract the form API, leading to less reusability and more complex testing.

## Setting up the form model

Both reactive and template-driven forms track value changes between user input elements and the form data in your component model. They share underlying building blocks but differ in how they create and manage form-control instances.

### Common form foundation classes

| Base classes           | Details |
|:---                    |:---     |
| `FormControl`          | Tracks the value and validation status of an individual form control.               |
| `FormGroup`            | Tracks the same values and status for a collection of form controls.                |
| `FormArray`            | Tracks the same values and status for an array of form controls.                    |
| `ControlValueAccessor` | Bridges Angular `FormControl` instances and built-in DOM elements. |

### Setup in reactive forms

In reactive forms, define the form model directly in the component class. The `[formControl]` directive links the `FormControl` instance to a specific form element.

**Important**: In reactive forms, the form model is the source of truth, providing the value and status of the form element.

### Setup in template-driven forms

In template-driven forms, the form model is implicit. The `NgModel` directive creates and manages a `FormControl` instance for a given form element.

**Important**: In template-driven forms, the source of truth is the template, with `NgModel` managing the `FormControl` instance.

## Data flow in forms

Angular keeps the view in sync with the component model and vice versa. Reactive and template-driven forms differ in how they handle data flow.

### Data flow in reactive forms

In reactive forms, each form element is directly linked to the form model. Updates are synchronous.

**View-to-model flow**:
1. User types a value.
2. Input emits an "input" event.
3. `ControlValueAccessor` relays the new value to the `FormControl`.
4. `FormControl` emits the new value through `valueChanges`.

**Model-to-view flow**:
1. User calls `setValue()` on the `FormControl`.
2. `FormControl` emits the new value.
3. Control value accessor updates the input element.

### Data flow in template-driven forms

In template-driven forms, each form element is linked to a directive managing the form model.

**View-to-model flow**:
1. User types a value.
2. Input emits an "input" event.
3. Control value accessor triggers `setValue()` on the `FormControl`.
4. `FormControl` emits the new value through `valueChanges`.
5. `NgModel` emits an `ngModelChange` event, updating the component property.

**Model-to-view flow**:
1. Component updates the property.
2. Change detection triggers.
3. `NgModel` sets the `FormControl` value asynchronously.
4. Control value accessor updates the input element.

### Mutability of the data model

| Forms                 | Details |
|:---                   |:---     |
| Reactive forms        | Keep the data model pure and immutable, returning a new data model on changes. |
| Template-driven forms | Rely on mutability with two-way data binding, making change detection less efficient. |

## Form validation

Validation is crucial for managing forms. Angular provides built-in validators and allows custom validators.

| Forms                 | Details |
|:---                   |:---     |
| Reactive forms        | Define custom validators as functions.                                 |
| Template-driven forms | Tied to template directives, requiring custom validator directives. |

For more information, see Form Validation.

## Testing

Testing is essential for complex applications. Reactive and template-driven forms have different testing strategies.

### Testing reactive forms

Reactive forms allow straightforward testing without rendering the UI. Status and data are queried and manipulated directly.

**View-to-model test**:
1. Query the input element.
2. Dispatch an "input" event with a new value.
3. Assert the component's `favoriteColorControl` value.

**Model-to-view test**:
1. Set a new value on `favoriteColorControl`.
2. Query the input element.
3. Assert the input value matches the control value.

### Testing template-driven forms

Testing template-driven forms requires understanding the change detection process.

**View-to-model test**:
1. Query the input element.
2. Dispatch an "input" event with a new value.
3. Run change detection.
4. Assert the component property matches the input value.

**Model-to-view test**:
1. Set the component property value.
2. Run change detection.
3. Query the input element.
4. Assert the input value matches the component property.

## Next steps

To learn more about reactive forms, see:

- Reactive forms
- Form validation
- Dynamic forms

To learn more about template-driven forms, see:

- Template Driven Forms tutorial
- Form validation
- NgForm directive API reference