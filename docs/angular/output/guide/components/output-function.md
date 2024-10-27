# Function-based outputs

The `output()` function declares an output in a directive or component, allowing you to emit values to parent components.

```typescript
import {Component, output} from '@angular/core';

@Component({...})
export class MyComp {
  nameChange = output<string>(); // OutputEmitterRef<string>

  setNewName(newName: string) {
    this.nameChange.emit(newName);
  }
}
```

Outputs are recognized by Angular when using the `output` function as a class member initializer. Parent components can listen to outputs in templates using event binding syntax.

```angular-html
<my-comp (nameChange)="showNewName($event)" />
```

## Aliasing an output

You can alias outputs to change their public name.

```typescript
class MyComp {
  nameChange = output({alias: 'ngxNameChange'});
}
```

Users can bind to your output using `(ngxNameChange)`, while you access the emitter with `this.nameChange`.

## Subscribing programmatically

Consumers can create your component dynamically with a `ComponentRef`. Parents can subscribe to outputs by accessing the property of type `OutputRef`.

```typescript
const myComp = viewContainerRef.createComponent(...);

myComp.instance.nameChange.subscribe(newName => {
  console.log(newName);
});
```

Angular cleans up the subscription when `myComp` is destroyed. An object with a function to unsubscribe earlier is also returned.

## Using RxJS observables as source

You can emit output values based on RxJS observables using the `outputFromObservable` function.

```typescript
import {Directive} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';

@Directive(...)
class MyDir {
  nameChange$ = this.dataService.get(); // Observable<Data>
  nameChange = outputFromObservable(this.nameChange$);
}
```

Subscriptions to the observable are forwarded, but stop when the owning directive is destroyed.

## Converting an output to an observable

You can subscribe to outputs by calling `.subscribe` on `OutputRef`. Angular provides a helper function to convert an `OutputRef` to an observable.

```typescript
import {outputToObservable} from '@angular/core/rxjs-interop';

@Component(...)
class MyComp {
  nameChange = output<string>();
}

// Instance reference to `MyComp`.
const myComp: MyComp;

outputToObservable(this.myComp.instance.nameChange) // Observable<string>
  .pipe(...)
  .subscribe(...);
```

## Why you should use `output()` over decorator-based `@Output()`?

The `output()` function offers several benefits over decorator-based `@Output` and `EventEmitter`:

1. Simpler mental model and API:
   - No error or completion channels from RxJS.
   - Outputs are simple emitters; values can be emitted using `.emit`.

2. More accurate types:
   - `OutputEmitterRef.emit(value)` is correctly typed, while `EventEmitter` can cause runtime errors.