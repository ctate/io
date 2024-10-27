# Accepting data with input properties

This guide assumes you've already read the Essentials Guide. Read that first if you're new to Angular.

If you're familiar with other web frameworks, input properties are similar to _props_.

When creating a component, you can mark specific class properties as **bindable** by adding the `@Input` decorator:

```typescript
@Component({...})
export class CustomSlider {
  @Input() value = 0;
}
```

This allows you to bind to the property in a template:

```angular-html
<custom-slider [value]="50" />
```

Angular refers to properties marked with the `@Input` decorator as **inputs**. You pass data to a component by setting its inputs.

**Angular records inputs statically at compile-time**. Inputs cannot be added or removed at run-time.

When extending a component class, **inputs are inherited by the child class**.

**Input names are case-sensitive.**

## Customizing inputs

The `@Input` decorator accepts a config object to change the input's behavior.

### Required inputs

Specify the `required` option to enforce that an input must always have a value:

```typescript
@Component({...})
export class CustomSlider {
  @Input({required: true}) value = 0;
}
```

If a component is used without all required inputs, Angular reports an error at build-time.

### Input transforms

You can specify a `transform` function to change the value of an input when set by Angular:

```typescript
@Component({
  selector: 'custom-slider',
  ...
})
export class CustomSlider {
  @Input({transform: trimString}) label = '';
}

function trimString(value: string | undefined) {
  return value?.trim() ?? '';
}
```

In this example, whenever `systemVolume` changes, Angular runs `trimString` and sets `label` to the result.

**Input transform functions must be statically analyzable at build-time**. They cannot be set conditionally or as the result of an expression evaluation.

**Input transform functions should always be pure functions**. Relying on external state can lead to unpredictable behavior.

#### Type checking

The type of the transform function's parameter determines the types of values that can be set to the input:

```typescript
@Component({...})
export class CustomSlider {
  @Input({transform: appendPx}) widthPx: string = '';
}

function appendPx(value: number) {
  return `${value}px`;
}
```

Here, `widthPx` accepts a `number` while the property is a `string`.

#### Built-in transformations

Angular includes two built-in transform functions for common scenarios: coercing values to boolean and numbers:

```typescript
import {Component, Input, booleanAttribute, numberAttribute} from '@angular/core';

@Component({...})
export class CustomSlider {
  @Input({transform: booleanAttribute}) disabled = false;
  @Input({transform: numberAttribute}) number = 0;
}
```

`booleanAttribute` treats the presence of the attribute as a "true" value, while `numberAttribute` attempts to parse the value to a number.

### Input aliases

You can specify the `alias` option to change the name of an input in templates:

```typescript
@Component({...})
export class CustomSlider {
  @Input({alias: 'sliderValue'}) value = 0;
}
```

```angular-html
<custom-slider [sliderValue]="50" />
```

This alias does not affect usage in TypeScript code. Avoid aliasing inputs unless necessary.

The `@Input` decorator also accepts the alias as its first parameter.

## Inputs with getters and setters

A property with a getter and setter can be an input:

```typescript
export class CustomSlider {
  @Input()
  get value(): number {
    return this.internalValue;
  }

  set value(newValue: number) {
    this.internalValue = newValue;
  }

  private internalValue = 0;
}
```

You can create a _write-only_ input by only defining a public setter:

```typescript
export class CustomSlider {
  @Input()
  set value(newValue: number) {
    this.internalValue = newValue;
  }

  private internalValue = 0;
}
```

Prefer using input transforms instead of getters and setters if possible. Avoid complex or costly getters and setters, as Angular may invoke an input's setter multiple times.

## Specify inputs in the `@Component` decorator

You can specify a component's inputs with the `inputs` property in the `@Component` decorator, useful for inherited properties:

```typescript
@Component({
  ...,
  inputs: ['disabled'],
})
export class CustomSlider extends BaseSlider { }
```

You can specify an input alias in the `inputs` list:

```typescript
@Component({
  ...,
  inputs: ['disabled: sliderDisabled'],
})
export class CustomSlider extends BaseSlider { }
```

## Choosing input names

Avoid input names that collide with properties on DOM elements. Name collisions can confuse whether the bound property belongs to the component or the DOM element.

Avoid adding prefixes for component inputs, as any custom properties can be assumed to belong to the component.