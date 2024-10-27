# Referencing component children with queries

Tip: This guide assumes you've already read the Essentials Guide. Read that first if you're new to Angular.

A component can define **queries** to find child elements and read values from their injectors. Queries are commonly used to retrieve references to child components, directives, DOM elements, and more. There are two categories of queries: **view queries** and **content queries**.

## View queries

View queries retrieve results from the elements in the component's _view_ — the elements defined in the component's own template. Use the `@ViewChild` decorator for a single result.

```angular-ts
@Component({
  selector: 'custom-card-header',
  ...
})
export class CustomCardHeader {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  @ViewChild(CustomCardHeader) header: CustomCardHeader;

  ngAfterViewInit() {
    console.log(this.header.text);
  }
}
```

In this example, `CustomCard` queries for a child `CustomCardHeader` and accesses the result in `ngAfterViewInit`. If the query does not find a result, its value is `undefined`, which may occur if the target element is hidden by `NgIf`. Angular keeps the result of `@ViewChild` up to date as your application state changes.

**View query results become available in the `ngAfterViewInit` lifecycle method**. Before this point, the value is `undefined.** 

You can also query for multiple results with the `@ViewChildren` decorator.

```angular-ts
@Component({
  selector: 'custom-card-action',
  ...,
})
export class CustomCardAction {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: `
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
})
export class CustomCard {
  @ViewChildren(CustomCardAction) actions: QueryList<CustomCardAction>;

  ngAfterViewInit() {
    this.actions.forEach(action => {
      console.log(action.text);
    });
  }
}
```

`@ViewChildren` creates a `QueryList` object containing the query results. You can subscribe to changes via the `changes` property.

**Queries never pierce through component boundaries.** View queries can only retrieve results from the component's template.

## Content queries

Content queries retrieve results from the elements in the component's _content_— the elements nested inside the component in the template where it's used. Use the `@ContentChild` decorator for a single result.

```angular-ts
@Component({
  selector: 'custom-toggle',
  ...
})
export class CustomToggle {
  text: string;
}

@Component({
  selector: 'custom-expando',
  ...
})
export class CustomExpando {
  @ContentChild(CustomToggle) toggle: CustomToggle;

  ngAfterContentInit() {
    console.log(this.toggle.text);
  }
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
  `
})
export class UserProfile { }
```

In this example, `CustomExpando` queries for a child `CustomToggle` and accesses the result in `ngAfterContentInit`. If the query does not find a result, its value is `undefined`. By default, content queries find only _direct_ children of the component.

**Content query results become available in the `ngAfterContentInit` lifecycle method**. 

You can also query for multiple results with the `@ContentChildren` decorator.

```angular-ts
@Component({
  selector: 'custom-menu-item',
  ...
})
export class CustomMenuItem {
  text: string;
}

@Component({
  selector: 'custom-menu',
  ...,
})
export class CustomMenu {
  @ContentChildren(CustomMenuItem) items: QueryList<CustomMenuItem>;

  ngAfterContentInit() {
    this.items.forEach(item => {
      console.log(item.text);
    });
  }
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-menu>
      <custom-menu-item>Cheese</custom-menu-item>
      <custom-menu-item>Tomato</custom-menu-item>
    </custom-menu>
  `
})
export class UserProfile { }
```

`@ContentChildren` creates a `QueryList` object containing the query results. 

**Queries never pierce through component boundaries.** Content queries can only retrieve results from the same template as the component itself.

## Query locators

The first parameter for each query decorator is its **locator**. Most of the time, you want to use a component or directive as your locator. You can alternatively specify a string locator corresponding to a template reference variable.

```angular-ts
@Component({
  ...,
  template: `
    <button #save>Save</button>
    <button #cancel>Cancel</button>
  `
})
export class ActionBar {
  @ViewChild('save') saveButton: ElementRef<HTMLButtonElement>;
}
```

If more than one element defines the same template reference variable, the query retrieves the first matching element. Angular does not support CSS selectors as query locators.

### Queries and the injector tree

For advanced cases, you can use any `ProviderToken` as a locator. This allows you to locate elements based on component and directive providers.

```angular-ts
const SUB_ITEM = new InjectionToken<string>('sub-item');

@Component({
  ...,
  providers: [{provide: SUB_ITEM, useValue: 'special-item'}],
})
export class SpecialItem { }

@Component({...})
export class CustomList {
  @ContentChild(SUB_ITEM) subItemType: string;
}
```

## Query options

All query decorators accept an options object as a second parameter, controlling how the query finds its results.

### Static queries

`@ViewChild` and `@ContentChild` queries accept the `static` option.

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  @ViewChild(CustomCardHeader, {static: true}) header: CustomCardHeader;

  ngOnInit() {
    console.log(this.header.text);
  }
}
```

Setting `static: true` guarantees that the target of this query is _always_ present, making the result available earlier in the `ngOnInit` lifecycle method. Static query results do not update after initialization.

The `static` option is not available for `@ViewChildren` and `@ContentChildren` queries.

### Content descendants

By default, content queries find only _direct_ children of the component. 

```angular-ts
@Component({
  selector: 'custom-expando',
  ...
})
export class CustomExpando {
  @ContentChild(CustomToggle) toggle: CustomToggle;
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-expando>
      <some-other-component>
        <custom-toggle>Show</custom-toggle>
      </some-other-component>
    </custom-expando>
  `
})
export class UserProfile { }
```

In this example, `CustomExpando` cannot find `<custom-toggle>` because it is not a direct child. By setting `descendants: true`, you configure the query to traverse all descendants in the same template. Queries never pierce into components to traverse elements in other templates.

View queries do not have this option because they always traverse into descendants.

### Reading specific values from an element's injector

You can specify the `read` option to retrieve a different value from the element matched by the locator.

```ts
@Component({...})
export class CustomExpando {
  @ContentChild(ExpandoContent, {read: TemplateRef}) toggle: TemplateRef;
}
```

Developers commonly use `read` to retrieve `ElementRef` and `TemplateRef`.

## Using QueryList

`@ViewChildren` and `@ContentChildren` provide a `QueryList` object containing a list of results. `QueryList` offers convenience APIs for working with results, such as `map`, `reduce`, and `forEach`. You can get an array of the current results by calling `toArray`. You can subscribe to the `changes` property to respond to any changes in the results.

## Common query pitfalls

When using queries, common pitfalls can make your code harder to understand and maintain. 

- Maintain a single source of truth for state shared between multiple components to avoid out-of-sync issues.
- Avoid directly writing state to child components to prevent brittle code and potential errors.
- Never directly write state to parent or ancestor components to maintain code clarity and prevent errors.