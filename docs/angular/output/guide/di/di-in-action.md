# DI in action

This guide explores additional features of dependency injection in Angular.

## Custom providers with `@Inject`

Using a custom provider allows you to provide a concrete implementation for implicit dependencies, such as built-in browser APIs. The following example uses an `InjectionToken` to provide the localStorage browser API as a dependency in the `BrowserStorageService`:

```typescript
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
}
```

The `factory` function returns the `localStorage` property attached to the browser's window object. The `Inject` decorator specifies a custom provider for the dependency, which can be overridden during testing with a mock API of `localStorage`.

## Inject the component's DOM element

Some visual effects and third-party tools require direct DOM access. Angular exposes the underlying element of a `@Component` or `@Directive` via injection using the `ElementRef` injection token:

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private element: ElementRef) {}

  update() {
    this.element.nativeElement.style.color = 'red';
  }
}
```

## Resolve circular dependencies with a forward reference

The order of class declaration matters in TypeScript. You can't refer directly to a class until it's defined. Circular references can occur when class 'A' refers to class 'B' and vice versa. The Angular `forwardRef()` function creates an indirect reference that Angular can resolve later.

You may also face issues when a class references itself in its `providers` array. You can break such circular references by using `forwardRef`.

```typescript
providers: [
  {
    provide: PARENT_MENU_ITEM,
    useExisting: forwardRef(() => MenuItem),
  },
],
```