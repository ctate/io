# Directive composition API

Angular directives encapsulate reusable behaviors, allowing the application of attributes, CSS classes, and event listeners to elements. The *directive composition API* enables the application of directives to a component's host element from within the component's TypeScript class.

## Adding directives to a component

To apply directives, add a `hostDirectives` property to the component's decorator, referred to as *host directives*.

Example:

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

When rendering a component, Angular creates instances of each host directive, applying their host bindings to the component's host element. By default, host directive inputs and outputs are not part of the component's public API. For more information, see "Including inputs and outputs."

**Note:**
- Host directives are applied statically at compile time; they cannot be added dynamically at runtime.
- Directives in `hostDirectives` must be `standalone: true`.
- Angular ignores the `selector` of directives in `hostDirectives`.

## Including inputs and outputs

By default, inputs and outputs from host directives are not included in the component's API. You can explicitly include them by expanding the entry in `hostDirectives`:

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId'],
    outputs: ['menuClosed'],
  }],
})
export class AdminMenu { }
```

This allows consumers to bind them in a template:

```angular-html
<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()">
```

You can also alias inputs and outputs:

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId: id'],
    outputs: ['menuClosed: closed'],
  }],
})
export class AdminMenu { }
```

```angular-html
<admin-menu id="top-menu" (closed)="logMenuClosed()">
```

## Adding directives to another directive

You can add `hostDirectives` to other directives, enabling transitive aggregation of behaviors. 

Example:

```typescript
@Directive({...})
export class Menu { }

@Directive({...})
export class Tooltip { }

@Directive({
  standalone: true,
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

@Directive({
  standalone: true,
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }
```

## Host directive semantics

### Directive execution order

Host directives execute their constructor, lifecycle hooks, and bindings before the component or directive they are applied to.

Example:

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

Execution order:

1. `MenuBehavior` instantiated
2. `AdminMenu` instantiated
3. `MenuBehavior` receives inputs (`ngOnInit`)
4. `AdminMenu` receives inputs (`ngOnInit`)
5. `MenuBehavior` applies host bindings
6. `AdminMenu` applies host bindings

Components with `hostDirectives` can override host bindings specified by host directives.

This order extends to nested chains of host directives:

```typescript
@Directive({...})
export class Tooltip { }

@Directive({
  standalone: true,
  hostDirectives: [Tooltip],
})
export class CustomTooltip { }

@Directive({
  standalone: true,
  hostDirectives: [CustomTooltip],
})
export class EvenMoreCustomTooltip { }
```

Execution order:

1. `Tooltip` instantiated
2. `CustomTooltip` instantiated
3. `EvenMoreCustomTooltip` instantiated
4. `Tooltip` receives inputs (`ngOnInit`)
5. `CustomTooltip` receives inputs (`ngOnInit`)
6. `EvenMoreCustomTooltip` receives inputs (`ngOnInit`)
7. `Tooltip` applies host bindings
8. `CustomTooltip` applies host bindings
9. `EvenMoreCustomTooltip` applies host bindings

### Dependency injection

A component or directive specifying `hostDirectives` can inject instances of those host directives and vice versa. Both can define providers.

If both the component (with `hostDirectives`) and the host directives provide the same injection token, the component's providers take precedence.