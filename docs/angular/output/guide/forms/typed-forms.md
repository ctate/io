# Typed Forms

As of Angular 14, reactive forms are strictly typed by default. Familiarity with Angular Reactive Forms is recommended.

## Overview of Typed Forms

With Angular reactive forms, you explicitly specify a *form model*. For example, a basic user login form:

```ts
const login = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});
```

Angular provides APIs for interacting with this `FormGroup`, such as `login.value`, `login.controls`, and `login.patchValue`. In previous versions, many APIs included `any`, making them not type-safe. For instance:

```ts
const emailDomain = login.value.email.domain; // Invalid in strict typing
```

Strictly typed reactive forms prevent such errors, enhancing safety, autocomplete in IDEs, and explicit form structure. These improvements apply only to reactive forms.

## Untyped Forms

Non-typed forms are still supported. To use them, import the `Untyped` symbols from `@angular/forms`:

```ts
const login = new UntypedFormGroup({
  email: new UntypedFormControl(''),
  password: new UntypedFormControl(''),
});
```

Each `Untyped` symbol retains the same semantics as in previous versions.

## `FormControl`: Getting Started

A simple form with a single control:

```ts
const email = new FormControl('angularrox@gmail.com');
```

This control is inferred as `FormControl<string|null>`. TypeScript enforces this type throughout the `FormControl` API.

### Nullability

The control type includes `null` because it can become `null` when reset:

```ts
email.reset(); // email.value is now null
```

To make the control non-nullable, use the `nonNullable` option:

```ts
const email = new FormControl('angularrox@gmail.com', {nonNullable: true});
email.reset(); // email.value remains 'angularrox@gmail.com'
```

### Specifying an Explicit Type

You can specify the type explicitly. For a control initialized to `null`:

```ts
const email = new FormControl<string|null>(null);
email.setValue('angularrox@gmail.com'); // No error
```

## `FormArray`: Dynamic, Homogenous Collections

A `FormArray` contains an open-ended list of controls:

```ts
const names = new FormArray([new FormControl('Alex')]);
names.push(new FormControl('Jess'));
```

The inner controls type is `FormControl<string|null>`. For different element types, use `UntypedFormArray`.

## `FormGroup` and `FormRecord`

`FormGroup` is for forms with a fixed set of keys, while `FormRecord` is for dynamic groups.

### Partial Values

For a login form:

```ts
const login = new FormGroup({
    email: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
});
```

Disabling controls means `login.value` is `Partial<{email: string, password: string}>`, where each member might be undefined. Use `login.getRawValue()` to access values including disabled controls.

### Optional Controls and Dynamic Groups

Use optional fields for controls that may be present:

```ts
interface LoginForm {
  email: FormControl<string>;
  password?: FormControl<string>;
}

const login = new FormGroup<LoginForm>({
  email: new FormControl('', {nonNullable: true}),
  password: new FormControl('', {nonNullable: true}),
});

login.removeControl('password');
```

### `FormRecord`

For unknown keys, use `FormRecord`:

```ts
const addresses = new FormRecord<FormControl<string|null>>({});
addresses.addControl('Andrew', new FormControl('2340 Folsom St'));
```

For dynamic and heterogeneous controls, use `UntypedFormGroup`.

## `FormBuilder` and `NonNullableFormBuilder`

`FormBuilder` supports new types. The `NonNullableFormBuilder` type specifies `{nonNullable: true}` for every control, reducing boilerplate:

```ts
const fb = new FormBuilder();
const login = fb.nonNullable.group({
  email: '',
  password: '',
});
```

Both inner controls will be non-nullable. You can also inject it using the name `NonNullableFormBuilder`.