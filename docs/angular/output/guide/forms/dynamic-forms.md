# Building dynamic forms

Many forms, such as questionnaires, can be similar in format and intent. To generate different versions of such forms quickly, create a dynamic form template based on metadata describing the business object model. This technique is useful for forms that need to change frequently due to business and regulatory requirements, such as questionnaires that vary based on context.

In this tutorial, you will build a dynamic form for an online application for heroes seeking employment. The agency can modify the application process without changing the application code by using dynamic forms.

## Steps to Build a Dynamic Form

1. Enable reactive forms for a project.
2. Establish a data model to represent form controls.
3. Populate the model with sample data.
4. Develop a component to create form controls dynamically.

The form will include input validation and styling to enhance user experience, with a Submit button enabled only when all user input is valid.

## Enable Reactive Forms for Your Project

Dynamic forms are based on reactive forms. Import `ReactiveFormsModule` from the `@angular/forms` library into the necessary components.

Example setup in the root module:
```typescript
// dynamic-form.component.ts
// dynamic-form-question.component.ts
```

## Create a Form Object Model

A dynamic form requires an object model to describe all scenarios needed by the form functionality. The example hero-application form consists of questions, where each control must ask a question and accept an answer.

The `DynamicFormQuestionComponent` defines a question as the fundamental object in the model. The `QuestionBase` class represents the question and its answer.

```typescript
// src/app/question-base.ts
```

### Define Control Classes

From the base class, derive `TextboxQuestion` and `DropdownQuestion` to represent different control types. The `TextboxQuestion` uses an `<input>` element, while the `DropdownQuestion` presents a list of choices in a select box.

```typescript
// question-textbox.ts
// question-dropdown.ts
```

### Compose Form Groups

A service creates grouped sets of input controls based on the form model. The `QuestionControlService` collects `FormGroup` instances that consume metadata from the question model, allowing for default values and validation rules.

```typescript
// src/app/question-control.service.ts
```

## Compose Dynamic Form Contents

The dynamic form is represented by a container component. Each question is represented in the form component's template by an `<app-question>` tag, which corresponds to an instance of `DynamicFormQuestionComponent`. This component renders individual questions based on the data-bound question object.

```html
<!-- dynamic-form-question.component.html -->
<!-- dynamic-form-question.component.ts -->
```

The `DynamicFormQuestionComponent` uses a `ngSwitch` statement to determine which type of question to display, utilizing directives with `formControlName` and `formGroup` selectors.

### Supply Data

Create the `QuestionService` to supply a specific set of questions from hard-coded sample data. In a real-world app, this service might fetch data from a backend system. The `QuestionService` provides an array of questions bound to `@Input()` questions.

```typescript
// src/app/question.service.ts
```

## Create a Dynamic Form Template

The `DynamicFormComponent` is the main container for the form, represented using `<app-dynamic-form>` in a template. It presents a list of questions by binding each to an `<app-question>` element.

```html
<!-- dynamic-form.component.html -->
<!-- dynamic-form.component.ts -->
```

### Display the Form

To display the dynamic form, the `AppComponent` passes the `questions` array from the `QuestionService` to the form container component.

```typescript
// app.component.ts
```

This separation of model and data allows repurposing components for any type of survey compatible with the question object model.

### Ensuring Valid Data

The form template uses dynamic data binding to render the form without hardcoded assumptions about specific questions. The _Save_ button is disabled until the form is valid. When valid, clicking _Save_ renders the current form values as JSON.

## Next Steps

- Validating form input: guide/forms/reactive-forms#validating-form-input
- Form validation guide: guide/forms/form-validation