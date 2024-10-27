# Structural directives

Structural directives are applied to an `<ng-template>` element to conditionally or repeatedly render its content.

## Example use case

You will create a structural directive called `SelectDirective`, which fetches data from a specified data source and renders its template when the data is available. The directive uses an attribute selector `[select]` and has an input named `selectFrom`.

Example usage:

```angular-html
<ng-template select let-data [selectFrom]="source">
  <p>The data is: {{ data }}</p>
</ng-template>
```

The directive waits for the data to become available before rendering the `<ng-template>`. Note that `<ng-template>` does not render anything by default unless a structural directive is applied.

For more information, see the ng-template API documentation.

## Structural directive shorthand

Angular supports shorthand syntax for structural directives, allowing you to apply them directly on an element by prefixing the directive attribute with an asterisk (`*`), such as `*select`.

Example:

```angular-html
<p *select="let data from source">The data is: {{data}}</p>
```

This shorthand syntax is flexible and allows for additional attributes on the element to remain intact. For example:

```angular-html
<p class="data-view" *select="let data from source">The data is: {{data}}</p>
```

is equivalent to:

```angular-html
<ng-template select let-data [selectFrom]="source">
  <p class="data-view">The data is: {{data}}</p>
</ng-template>
```

## One structural directive per element

Only one structural directive can be applied per element using shorthand syntax. To apply multiple directives, use `<ng-container>` to create wrapper layers.

## Creating a structural directive

Follow these steps to create the `SelectDirective`:

1. **Generate the directive**:
   Run the command:
   ```shell
   ng generate directive select
   ```

2. **Make the directive structural**:
   Import `TemplateRef` and `ViewContainerRef`, and inject them in the constructor:
   ```ts
   import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';

   @Directive({
     standalone: true,
     selector: '[select]',
   })
   export class SelectDirective {
     constructor(private templateRef: TemplateRef, private viewContainerRef: ViewContainerRef) {}
   }
   ```

3. **Add the 'selectFrom' input**:
   Add a `selectFrom` `@Input()` property:
   ```ts
   export class SelectDirective {
     @Input({required: true}) selectFrom!: DataSource;
   }
   ```

4. **Add the business logic**:
   Implement the logic to fetch data and render the template:
   ```ts
   export class SelectDirective {
     async ngOnInit() {
       const data = await this.selectFrom.load();
       this.viewContainerRef.createEmbeddedView(this.templateRef, {
         $implicit: data,
       });
     }
   }
   ```

## Structural directive syntax reference

When writing structural directives, use the following syntax:

```
*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"
```

### Angular translation of shorthand

Angular translates shorthand into normal binding syntax as follows:

| Shorthand | Translation |
|:--- |:--- |
| `prefix` and naked `expression` | `[prefix]="expression"` |
| `keyExp` | `[prefixKey]="expression"` |
| `let local` | `let-local="export"` |

### Shorthand examples

| Shorthand | Interpretation |
|:--- |:--- |
| `*ngFor="let item of [1,2,3]"` | `<ng-template ngFor let-item [ngForOf]="[1, 2, 3]">` |
| `*ngIf="exp"` | `<ng-template [ngIf]="exp">` |

## Improving template type checking for custom directives

Enhance template type checking by adding template guards to your directive. Two types of guards are possible:

- `ngTemplateGuard_(input)` for narrowing input expressions.
- `ngTemplateContextGuard` for determining the context object type.

### Type narrowing with template guards

Example of narrowing input expression:

```ts
@Directive(...)
class ActorIsUser {
  @Input() actor: User|Robot;

  static ngTemplateGuard_actor(dir: ActorIsUser, expr: User|Robot): expr is User {
    return true;
  }
}
```

### Typing the directive's context

To type the context provided by a structural directive, implement a static `ngTemplateContextGuard`:

```ts
export interface SelectTemplateContext<T> {
  $implicit: T;
}

@Directive(...)
export class SelectDirective<T> {
  @Input({required: true}) selectFrom!: DataSource<T>;

  static ngTemplateContextGuard<T>(dir: SelectDirective<T>, ctx: any): ctx is SelectTemplateContext<T> {
    return true;
  }
}
```