# Create template fragments with ng-template

Inspired by the native `<template>` element, the `<ng-template>` element lets you declare a **template fragment** – a section of content that you can dynamically or programmatically render.

## Creating a template fragment

You can create a template fragment inside any component template with the `<ng-template>` element:

```angular-html
<p>This is a normal element</p>

<ng-template>
  <p>This is a template fragment</p>
</ng-template>
```

When rendered, the content of the `<ng-template>` element is not displayed on the page. You can reference the template fragment and write code to dynamically render it.

### Binding context for fragments

Template fragments may contain bindings with dynamic expressions:

```angular-ts
@Component({
  /* ... */,
  template: `<ng-template>You've selected {{count}} items.</ng-template>`,
})
export class ItemCounter {
  count: number = 0;
}
```

Expressions in a template fragment are evaluated against the component in which the fragment is declared.

## Getting a reference to a template fragment

You can reference a template fragment in three ways:

- By declaring a template reference variable on the `<ng-template>` element
- By querying for the fragment with a component or directive query
- By injecting the fragment in a directive applied directly to an `<ng-template>` element.

In all cases, the fragment is represented by a `TemplateRef` object.

### Referencing a template fragment with a template reference variable

Add a template reference variable to an `<ng-template>` element to reference that fragment:

```angular-html
<p>This is a normal element</p>

<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

You can reference this fragment anywhere else in the template via the `myFragment` variable.

### Referencing a template fragment with queries

You can get a reference to a template fragment using any component or directive query API. For example, with a `@ViewChild` query:

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>This is a normal element</p>

    <ng-template>
      <p>This is a template fragment</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  @ViewChild(TemplateRef) myFragment: TemplateRef<unknown> | undefined;
}
```

If a template contains multiple fragments, assign a name to each fragment with a template reference variable:

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>This is a normal element</p>

    <ng-template #fragmentOne>
      <p>This is one template fragment</p>
    </ng-template>

    <ng-template #fragmentTwo>
      <p>This is another template fragment</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  @ViewChild('fragmentOne', {read: TemplateRef}) fragmentOne: TemplateRef<unknown> | undefined;
  @ViewChild('fragmentTwo', {read: TemplateRef}) fragmentTwo: TemplateRef<unknown> | undefined;
}
```

### Injecting a template fragment

A directive can inject a `TemplateRef` if applied directly to an `<ng-template>` element:

```angular-ts
@Directive({
  selector: '[myDirective]'
})
export class MyDirective {
  private fragment = inject(TemplateRef);
}
```

```angular-html
<ng-template myDirective>
  <p>This is one template fragment</p>
</ng-template>
```

## Rendering a template fragment

Once you have a reference to a template fragment's `TemplateRef` object, you can render it in two ways: using the `NgTemplateOutlet` directive or in TypeScript code with `ViewContainerRef`.

### Using `NgTemplateOutlet`

The `NgTemplateOutlet` directive accepts a `TemplateRef` and renders the fragment as a sibling to the element with the outlet. Use `NgTemplateOutlet` on an `<ng-container>` element:

```angular-html
<p>This is a normal element</p>

<ng-template #myFragment>
  <p>This is a fragment</p>
</ng-template>

<ng-container [ngTemplateOutlet]="myFragment" />
```

### Using `ViewContainerRef`

A **view container** is a node in Angular's component tree that can contain content. Any component or directive can inject `ViewContainerRef` to get a reference to a view container.

Use the `createEmbeddedView` method on `ViewContainerRef` to dynamically render a template fragment:

```angular-ts
@Component({
  /* ... */,
  selector: 'component-with-fragment',
  template: `
    <h2>Component with a fragment</h2>
    <ng-template #myFragment>
      <p>This is the fragment</p>
    </ng-template>
    <my-outlet [fragment]="myFragment" />
  `,
})
export class ComponentWithFragment { }

@Component({
  /* ... */,
  selector: 'my-outlet',
  template: `<button (click)="showFragment()">Show</button>`,
})
export class MyOutlet {
  private viewContainer = inject(ViewContainerRef);
  @Input() fragment: TemplateRef<unknown> | undefined;

  showFragment() {
    if (this.fragment) {
      this.viewContainer.createEmbeddedView(this.fragment);
    }
  }
}
```

## Passing parameters when rendering a template fragment

When declaring a template fragment, you can declare parameters accepted by the fragment. Use `let-` to define parameters:

```angular-html
<ng-template let-pizzaTopping="topping">
  <p>You selected: {{pizzaTopping}}</p>
</ng-template>
```

### Using `NgTemplateOutlet`

Bind a context object to the `ngTemplateOutletContext` input:

```angular-html
<ng-template #myFragment let-pizzaTopping="topping">
  <p>You selected: {{pizzaTopping}}</p>
</ng-template>

<ng-container
  [ngTemplateOutlet]="myFragment"
  [ngTemplateOutletContext]="{topping: 'onion'}"
/>
```

### Using `ViewContainerRef`

Pass a context object as the second argument to `createEmbeddedView`:

```angular-ts
this.viewContainer.createEmbeddedView(this.myFragment, {topping: 'onion'});
```

## Structural directives

A **structural directive** is any directive that injects `TemplateRef` and `ViewContainerRef` to programmatically render the injected `TemplateRef`. Use an asterisk (`*`) to apply the directive:

```angular-html
<section *myDirective>
  <p>This is a fragment</p>
</section>
```

This is equivalent to:

```angular-html
<ng-template myDirective>
  <section>
    <p>This is a fragment</p>
  </section>
</ng-template>
```

## Additional resources

For examples of how `ng-template` is used in other libraries, check out:

- Tabs from Angular Material - nothing gets rendered into the DOM until the tab is activated
- Table from Angular Material - allows developers to define different ways to render data