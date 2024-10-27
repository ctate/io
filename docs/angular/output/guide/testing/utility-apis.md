# Testing Utility APIs

This page describes the most useful Angular testing features.

The Angular testing utilities include `TestBed`, `ComponentFixture`, and functions that control the test environment. The `TestBed` and `ComponentFixture` classes are covered separately.

## Stand-alone Functions Summary

| Function                     | Details |
|:---                          |:---     |
| `waitForAsync`              | Runs the body of a test (`it`) or setup (`beforeEach`) function within a special async test zone. See waitForAsync guide. |
| `fakeAsync`                 | Runs the body of a test (`it`) within a special fakeAsync test zone, enabling a linear control flow coding style. See fakeAsync guide. |
| `tick`                      | Simulates the passage of time and completion of pending asynchronous activities by flushing timer and micro-task queues. Accepts an optional argument to move the virtual clock forward. See tick guide. |
| `inject`                    | Injects one or more services from the current `TestBed` injector into a test function. Cannot inject a service provided by the component itself. See debugElement.injector discussion. |
| `discardPeriodicTasks`      | Flushes the task queue to avoid errors when a `fakeAsync()` test ends with pending timer event tasks. |
| `flushMicrotasks`           | Flushes the micro-task queue to avoid errors when a `fakeAsync()` test ends with pending micro-tasks. |
| `ComponentFixtureAutoDetect`| A provider token for a service that turns on automatic change detection. |
| `getTestBed`                | Gets the current instance of the `TestBed`. Usually unnecessary as static class methods are typically sufficient. |

## `TestBed` Class Summary

The `TestBed` class is a principal Angular testing utility. Its API is extensive and can be overwhelming. Read the early part of this guide to get the basics before exploring the full API.

The module definition passed to `configureTestingModule` is a subset of the `@NgModule` metadata properties.

```javascript
type TestModuleMetadata = {
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: Array<SchemaMetadata | any[]>;
};
```

Each override method takes a `MetadataOverride<T>` where `T` is the kind of metadata appropriate to the method.

```javascript
type MetadataOverride<T> = {
  add?: Partial<T>;
  remove?: Partial<T>;
  set?: Partial<T>;
};
```

The `TestBed` API consists of static class methods that update or reference a global instance of the `TestBed`. Call `TestBed` methods within a `beforeEach()` to ensure a fresh start before each test.

### Important Static Methods

| Methods                                                        | Details |
|:---                                                            |:---     |
| `configureTestingModule`                                       | Refines the testing module configuration for a particular set of tests. |
| `compileComponents`                                            | Compiles the testing module asynchronously. Must be called if any components have a `templateUrl` or `styleUrls`. |
| `createComponent<T>`                                          | Creates an instance of a component of type `T` based on the current `TestBed` configuration. |
| `overrideModule`                                              | Replaces metadata for the given `NgModule`. |
| `overrideComponent`                                           | Replaces metadata for the given component class. |
| `overrideDirective`                                           | Replaces metadata for the given directive class. |
| `overridePipe`                                                | Replaces metadata for the given pipe class. |
| `inject`                                                      | Retrieves a service from the current `TestBed` injector. |
| `initTestEnvironment`                                         | Initializes the testing environment for the entire test run. |
| `resetTestEnvironment`                                        | Resets the initial test environment, including the default testing module. |

## The `ComponentFixture`

The `TestBed.createComponent<T>` creates an instance of the component `T` and returns a strongly typed `ComponentFixture`.

### `ComponentFixture` Properties

| Properties          | Details |
|:---                 |:---     |
| `componentInstance` | The instance of the component class created by `TestBed.createComponent`. |
| `debugElement`      | The `DebugElement` associated with the root element of the component. |
| `nativeElement`     | The native DOM element at the root of the component. |
| `changeDetectorRef` | The `ChangeDetectorRef` for the component. |

### `ComponentFixture` Methods

| Methods             | Details |
|:---                 |:---     |
| `detectChanges`     | Triggers a change detection cycle for the component. |
| `autoDetectChanges` | Automatically detects changes if set to `true`. |
| `checkNoChanges`    | Ensures there are no pending changes. |
| `isStable`          | Returns `true` if the fixture is stable. |
| `whenStable`        | Returns a promise that resolves when the fixture is stable. |
| `destroy`           | Triggers component destruction. |

### `DebugElement`

The `DebugElement` provides insights into the component's DOM representation.

| Members               | Details |
|:---                   |:---     |
| `nativeElement`       | The corresponding DOM element. |
| `query`               | Returns the first `DebugElement` that matches the predicate. |
| `queryAll`            | Returns all `DebugElements` that match the predicate. |
| `injector`            | The host dependency injector. |
| `componentInstance`   | The element's own component instance. |
| `context`             | Provides parent context for this element. |
| `children`            | The immediate `DebugElement` children. |
| `parent`              | The `DebugElement` parent. |
| `name`                | The element tag name. |
| `triggerEventHandler` | Triggers the event by its name. |
| `listeners`           | Callbacks attached to the component's `@Output` properties. |
| `providerTokens`      | This component's injector lookup tokens. |
| `source`              | Where to find this element in the source component template. |
| `references`          | Dictionary of objects associated with template local variables. |

The Angular `By` class has three static methods for common predicates:

| Static method             | Details |
|:---                       |:---     |
| `By.all`                  | Returns all elements. |
| `By.css(selector)`        | Returns elements with matching CSS selectors. |
| `By.directive(directive)` | Returns elements matched to an instance of the directive class. |