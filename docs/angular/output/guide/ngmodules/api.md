# NgModule API

NgModules organize Angular applications through metadata in the `@NgModule` decorator, categorized as follows:

- **Static**: Compiler configuration via the `declarations` array for directive selectors.
- **Runtime**: Injector configuration using the `providers` array.
- **Composability / Grouping**: Combining NgModules with `imports` and `exports` arrays.

```typescript
@NgModule({
  declarations: [], // Configure the selectors
  providers: [], // Runtime injector configuration
  imports: [], // Composing NgModules together
  exports: [] // Making NgModules available to other parts of the app
})
```

## `@NgModule` metadata

### Properties

- **`declarations`**: List of declarable classes (*components*, *directives*, *pipes*) belonging to this module. The template is compiled within the context of an NgModule, determining selectors based on:
  - All selectors of directives in `declarations`.
  - All selectors of directives exported from imported NgModules.
  Components, directives, and pipes must belong to exactly one module.

- **`providers`**: List of dependency-injection providers registered with the NgModule's injector. Services become available for injection into any child component, directive, pipe, or service. Lazy-loaded modules have their own injector, scoped to the lazy module's injector.

- **`imports`**: List of modules folded into this module, allowing access to exported properties. A component template can reference another component, directive, or pipe if declared in this module or exported from an imported module.

- **`exports`**: List of declarations that an importing module can use. Exported declarations form the module's public API. Importing a module does not automatically re-export its imports; they must be explicitly imported.

- **`bootstrap`**: List of components automatically bootstrapped, typically containing the root component of the application.

## More on NgModules

- Feature Modules: guide/ngmodules/feature-modules
- Providers: guide/ngmodules/providers
- Types of Feature Modules: guide/ngmodules/module-types