# Sharing modules

Creating shared modules helps organize and streamline your code by consolidating commonly used directives, pipes, and components into one module. This module can then be imported wherever needed in your application.

Example of a shared module:

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { NewItemDirective } from './new-item.directive';
import { OrdersPipe } from './orders.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CustomerComponent,
    NewItemDirective,
    OrdersPipe
  ],
  exports: [
    CustomerComponent,
    NewItemDirective,
    OrdersPipe,
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }
```

Key points:

- Imports `CommonModule` for common directives.
- Declares and exports utility pipe, directive, and component classes.
- Re-exports `CommonModule` and `FormsModule`.

By re-exporting `CommonModule` and `FormsModule`, any module importing `SharedModule` gains access to directives like `NgIf` and `NgFor` from `CommonModule` and can use `[(ngModel)]` from `FormsModule`.

Even if components in `SharedModule` do not use `[(ngModel)]`, `SharedModule` can still export `FormsModule` without including it in its imports, allowing other modules to access it without direct dependency.

## More on NgModules

- Providers: www.angular.io/guide/ngmodules/providers
- Types of Feature Modules: www.angular.io/guide/ngmodules/module-types