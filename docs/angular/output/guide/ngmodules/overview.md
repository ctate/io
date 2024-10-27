# NgModules

**NgModules** configure the injector, the compiler, and help organize related components, directives, and pipes.

An NgModule is a class marked by the `@NgModule` decorator, which takes a metadata object that describes how to compile a component's template and create an injector at runtime. It identifies the module's components, directives, and pipes, making some public through the `exports` property for external use. It can also add service providers to the application dependency injectors.

## Angular Modularity

Modules organize an application and extend it with capabilities from external libraries. Angular libraries are NgModules, such as `FormsModule`, `HttpClientModule`, and `RouterModule`. Third-party libraries available as NgModules include the Material Design component library (material.angular.io), Ionic (ionicframework.com), and Angular's Firebase integration (github.com/angular/angularfire).

NgModules consolidate components, directives, and pipes into cohesive blocks of functionality focused on feature areas, business domains, workflows, or utility collections. They can add services, either internally developed or sourced externally, like the Angular router and HTTP client.

Modules can be loaded eagerly at application start or lazy-loaded asynchronously by the router.

NgModule metadata does the following:
- Declares which components, directives, and pipes belong to the module.
- Makes some components, directives, and pipes public for use in other module templates.
- Imports other modules with necessary components, directives, and pipes.
- Provides services for other application components.

Every Module-based Angular application has at least one module, the root module, which you bootstrap to launch the application. The root module suffices for applications with few components, but as the application grows, you can refactor it into feature modules representing related functionality, which are then imported into the root module.

## The Basic NgModule

The Angular CLI generates a basic `AppModule` when creating a new application with the `--no-standalone` option.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

At the top are the import statements. The `@NgModule` configuration states which components and directives belong to it (`declarations`) and which other modules it uses (`imports`). For more information on the structure of an `@NgModule`, refer to Bootstrapping (guide/ngmodules/bootstrapping).

## More on NgModules

- Feature Modules (guide/ngmodules/feature-modules)
- Providers (guide/ngmodules/providers)
- Types of NgModules (guide/ngmodules/module-types)