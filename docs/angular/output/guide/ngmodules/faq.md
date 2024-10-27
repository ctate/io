# NgModule FAQ

NgModules help organize an application into cohesive blocks of functionality. This page answers common questions about NgModule design and implementation.

## What classes should I add to the `declarations` array?

Add declarable classes—components, directives, and pipes—to a `declarations` list. Declare these classes in exactly one module of the application if they belong to that module.

## What is a `declarable`?

Declarables are class types—components, directives, and pipes—that can be added to a module's `declarations` list. They are the only classes that can be added to `declarations`.

## What classes should I *not* add to `declarations`?

Do not declare the following:

- Classes already declared in another module.
- Arrays of directives imported from another module.
- Module classes.
- Service classes.
- Non-Angular classes and objects (e.g., strings, numbers, functions).

## Why list the same component in multiple `NgModule` properties?

Membership in `declarations`, `bootstrap`, and `exports` serves different functions. A component can be declared in one module and bootstrapped in another, or imported from another module and re-exported.

## What does "Can't bind to 'x' since it isn't a known property of 'y'" mean?

This error usually indicates that the directive "x" hasn't been declared or the NgModule containing "x" hasn't been imported. Ensure "x" is exported if declared in a submodule.

## What should I import?

Import NgModules whose public declarable classes you need in this module's component templates. Always import `CommonModule` from `@angular/common` for access to Angular directives. Import `BrowserModule` only in the root `AppModule`. Import `FormsModule` from `@angular/forms` for `[(ngModel)]` binding.

## Should I import `BrowserModule` or `CommonModule`?

Import `BrowserModule` in the root `AppModule`. It provides essential services for browser applications and re-exports `CommonModule`. Do not import `BrowserModule` in other modules; use `CommonModule` instead.

## What if I import the same module twice?

Importing the same module multiple times is not a problem. Angular evaluates it once and caches the result. Avoid circular references between modules.

## What should I export?

Export declarable classes that other NgModules can use in their templates. You can export any declarable class, whether declared in this NgModule or an imported one. You can also re-export entire imported NgModules.

## What should I *not* export?

Do not export:

- Private components, directives, and pipes.
- Non-declarable objects (e.g., services, functions).
- Components loaded dynamically by the router.
- Pure service modules without public declarations.

## Can I re-export classes and modules?

Yes, NgModules can re-export classes and entire NgModules. However, avoid re-exporting pure service modules as they do not export declarable classes.

## What is the `forRoot()` method?

The `forRoot()` method is a convention for configuring singleton services and providers. For more information, see the `forRoot()` pattern section of the Singleton Services guide.

## Why is a service provided in a feature module visible everywhere?

Providers in the `@NgModule.providers` of a bootstrapped module have application scope. Importing a module adds its service providers to the application root injector, making them visible throughout the application.

## Why is a service provided in a lazy-loaded module visible only to that module?

Providers of lazy-loaded modules are module-scoped. When lazy-loaded, Angular creates a new execution context with its own injector, isolating the providers from the application root injector.

## What if two modules provide the same service?

The second module's provider "wins" if two modules provide the same service. The service provided by the root `AppModule` takes precedence over those from imported NgModules.

## How do I restrict service scope to a module?

To restrict service scope, avoid adding providers to eagerly loaded modules. Instead, load modules lazily or provide services in a component's `providers` list to limit their scope.

## Should I add application-wide providers to the root `AppModule` or the root `AppComponent`?

Define application-wide providers using `providedIn: 'root'` in the `@Injectable()` decorator. If not possible, register them in the root `AppModule`, not in the `AppComponent`.

## Should I add other providers to a module or a component?

Providers should be registered in modules rather than components unless you need to limit the scope to a specific component and its children.

## Why is it bad if a shared module provides a service to a lazy-loaded module?

Providing a service in a shared module can lead to multiple instances when the service is also provided in a lazy-loaded module, resulting in unexpected behavior.

## Why does lazy loading create a child injector?

Lazy-loaded modules create a child injector because the application root injector is closed to new providers once the application starts. This ensures that lazy-loaded providers are isolated.

## How can I tell if an NgModule or service was previously loaded?

To prevent multiple loads, inject the module or service from the root application injector in the constructor. If successful, it indicates a second load.

## What kinds of modules should I have and how should I use them?

### `SharedModule`

A `SharedModule` contains components, directives, and pipes used throughout the application. It should not have providers and should be imported in feature modules.

### Feature Modules

Feature modules encapsulate specific application domains, containing related components, services, and routing. They should be organized around specific functionalities.

## What's the difference between NgModules and JavaScript Modules?

NgModules and JavaScript modules work together. NgModules are classes with the `@NgModule` decorator, while JavaScript modules are files that export parts of the module. For more information, see JavaScript Modules vs. NgModules.

## What is a template reference?

A template reference is how Angular finds components, directives, and pipes in a template. The Angular compiler matches selectors and pipe names to the declared classes.

## What is the Angular compiler?

The Angular compiler converts application code into performant JavaScript code, guiding the compilation process with `@NgModule` metadata. It creates component factories that represent components in JavaScript.