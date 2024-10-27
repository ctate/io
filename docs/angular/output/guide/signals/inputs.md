# Signal inputs

Signal inputs allow values to be bound from parent components, exposed using a `Signal`, and can change during the component's lifecycle.

## Input Variants

**Optional inputs**: 
- Default to optional unless specified with `input.required`.
- Can have an explicit initial value or default to `undefined`.

**Required inputs**: 
- Always have a value of the specified input type.
- Declared using the `input.required` function.

```typescript
import {Component, input} from '@angular/core';

@Component({...})
export class MyComp {
  // optional
  firstName = input<string>();         // InputSignal<string|undefined>
  age = input(0);                      // InputSignal<number>

  // required
  lastName = input.required<string>(); // InputSignal<string>
}
```

## Aliasing an Input

You can alias inputs to change their public name.

```typescript
class StudentDirective {
  age = input(0, {alias: 'studentAge'});
}
```

Users can bind to your input using `[studentAge]`, while accessing the value with `this.age`.

## Using in Templates

Signal inputs are read-only signals. Access the current value by calling the input signal.

```angular-html
<p>First name: {{firstName()}}</p>
<p>Last name: {{lastName()}}</p>
```

This access is reactive and notifies Angular when the input value changes.

## Deriving Values

You can derive values from inputs using `computed`.

```typescript
import {Component, input, computed} from '@angular/core';

@Component({...})
export class MyComp {
  age = input(0);
  ageMultiplied = computed(() => this.age() * 2);
}
```

Computed signals memoize values. See more in the dedicated section for computed.

## Monitoring Changes

Use the `effect` function to execute code whenever the input changes.

```typescript
import {input, effect} from '@angular/core';

class MyComp {
  firstName = input.required<string>();

  constructor() {
    effect(() => {
      console.log(this.firstName());
    });
  }
}
```

The `console.log` function runs every time `firstName` changes.

## Value Transforms

Transforms convert raw values from parent templates to the expected input type. They should be pure functions.

```typescript
class MyComp {
  disabled = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  });
}
```

This input accepts `boolean` and `string`, parsing to a `boolean` with the transform.

```angular-html
<my-custom-comp disabled>
```

**IMPORTANT**: Avoid transforms that change the meaning of the input or are impure. Use `computed` for transformations with different meanings or `effect` for impure code.

## Advantages of Signal Inputs over `@Input()`

1. **Type Safety**: 
   - Required inputs do not need initial values.
   - Transforms are checked against accepted input values.
2. **Automatic Dirty Checking**: 
   - Automatically marks `OnPush` components as dirty.
3. **Easy Value Derivation**: 
   - Use `computed` for derived values.
4. **Local Monitoring**: 
   - Easier monitoring with `effect` instead of `ngOnChanges` or setters.