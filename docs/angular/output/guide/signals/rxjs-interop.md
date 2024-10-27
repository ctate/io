# RxJS Interop

IMPORTANT: The RxJS Interop package is available for developer preview. It's ready for you to try, but it might change before it is stable.

Angular's `@angular/core/rxjs-interop` package provides utilities to integrate Angular Signals with RxJS Observables.

## `toSignal`

Use the `toSignal` function to create a signal that tracks the value of an Observable. It behaves similarly to the `async` pipe in templates but is more flexible.

```ts
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  template: `{{ counter() }}`,
})
export class Ticker {
  counterObservable = interval(1000);
  counter = toSignal(this.counterObservable, { initialValue: 0 });
}
```

`toSignal` subscribes to the Observable immediately and automatically unsubscribes when the component or service is destroyed. Avoid calling it repeatedly for the same Observable; reuse the signal it returns.

### Injection Context

`toSignal` needs to run in an injection context, such as during the construction of a component or service. If not available, specify the `Injector` manually.

### Initial Values

Signals require a current value. You can handle the initial value of `toSignal` signals in several ways:

- **`initialValue` option**: Specify an `initialValue` for the signal before the Observable emits.
- **`undefined` initial values**: If no `initialValue` is provided, the signal returns `undefined` until the Observable emits.
- **`requireSync` option**: For Observables that emit synchronously (e.g., `BehaviorSubject`), set `requireSync: true` to ensure the signal always has a value.

### `manualCleanup`

By default, `toSignal` unsubscribes from the Observable when the component or service is destroyed. Use the `manualCleanup` option to override this behavior for Observables that complete naturally.

### Error and Completion

If an Observable produces an error, it is thrown when the signal is read. If it completes, the signal continues to return the most recently emitted value.

## `toObservable`

Use the `toObservable` utility to create an Observable that tracks the value of a signal. The signal's value is monitored with an effect that emits the value to the Observable when it changes.

```ts
import { Component, signal } from '@angular/core';

@Component(...)
export class SearchResults {
  query: Signal<string> = inject(QueryService).query;
  query$ = toObservable(this.query);

  results$ = this.query$.pipe(
    switchMap(query => this.http.get('/search?q=' + query))
  );
}
```

As the `query` signal changes, the `query$` Observable emits the latest query and triggers a new HTTP request.

### Injection Context

`toObservable` needs to run in an injection context. If not available, specify the `Injector` manually.

### Timing of `toObservable`

`toObservable` uses an effect to track the signal's value in a `ReplaySubject`. The first value may be emitted synchronously, while subsequent values will be asynchronous. Signals do not provide synchronous notifications of changes.

```ts
const obs$ = toObservable(mySignal);
obs$.subscribe(value => console.log(value));

mySignal.set(1);
mySignal.set(2);
mySignal.set(3);
```

Only the last value (3) will be logged.

### `outputFromObservable`

`outputFromObservable(...)` declares an Angular output that emits values based on an RxJS observable.

```ts
class MyDir {
  nameChange$ = new Observable<string>(/* ... */);
  nameChange = outputFromObservable(this.nameChange$); // OutputRef<string>
}
```

See more details in the output() API guide.

### `outputToObservable`

`outputToObservable(...)` converts an Angular output to an observable, allowing integration of Angular outputs into RxJS streams.

```ts
outputToObservable(myComp.instance.onNameChange)
  .pipe(...)
  .subscribe(...)
```

See more details in the output() API guide.