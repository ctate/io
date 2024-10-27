# Signal queries

A component or directive can define queries to find child elements and read values from their injectors. Queries are commonly used to retrieve references to components, directives, DOM elements, and more. There are two categories of queries: view queries and content queries.

Signal queries provide results as a reactive signal primitive, which can be used in `computed` and `effect`, allowing composition with other signals.

If you're familiar with Angular queries, refer to "Comparing signal-based queries to decorator-based queries" for a comparison.

## View queries

View queries retrieve results from the elements in the component's own template.

### `viewChild`

Declare a query targeting a single result with the `viewChild` function.

```angular-ts
@Component({
  template: `
    <div #el></div>
    <my-component />
  `
})
export class TestComponent {
  divEl = viewChild<ElementRef>('el');  // Signal<ElementRef|undefined>
  cmp = viewChild(MyComponent);          // Signal<MyComponent|undefined>
}
```

### `viewChildren`

Query for multiple results with the `viewChildren` function.

```angular-ts
@Component({
  template: `
    <div #el></div>
    @if (show) {
      <div #el></div>
    }
  `
})
export class TestComponent {
  show = true;
  divEls = viewChildren<ElementRef>('el');  // Signal<ReadonlyArray<ElementRef>>
}
```

### View query options

The `viewChild` and `viewChildren` functions accept two arguments:

- A **locator** to specify the query target (string or injectable token).
- A set of **options** to adjust query behavior.

Signal-based view queries accept one option: `read`, which indicates the type of result to inject from the matched nodes.

```angular-ts
@Component({
  template: `<my-component/>`
})
export class TestComponent {
  cmp = viewChild(MyComponent, {read: ElementRef});  // Signal<ElementRef|undefined>
}
```

## Content queries

Content queries retrieve results from the elements nested inside the component tag in the template.

### `contentChild`

Query for a single result with the `contentChild` function.

```ts
@Component({...})
export class TestComponent {
  headerEl = contentChild<ElementRef>('h');  // Signal<ElementRef|undefined>
  header = contentChild(MyHeader);            // Signal<MyHeader|undefined>
}
```

### `contentChildren`

Query for multiple results with the `contentChildren` function.

```ts
@Component({...})
export class TestComponent {
  divEls = contentChildren<ElementRef>('h');  // Signal<ReadonlyArray<ElementRef>>
}
```

### Content query options

The `contentChild` and `contentChildren` functions accept two arguments:

- A **locator** to specify the query target (string or injectable token).
- A set of **options** to adjust query behavior.

Content queries accept the following options:

- `descendants`: By default, content queries find only direct children. Set to `true` to include all descendants, but queries never descend into components.
- `read`: Indicates the type of result to retrieve from the matched nodes.

### Required child queries

If a child query does not find a result, its value is `undefined`. This may occur if the target element is hidden by a control flow statement. To enforce the presence of at least one matching result, mark child queries as `required`. If a `required` query does not find results, Angular throws an error.

```angular-ts
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div #requiredEl></div>
  `,
})
export class App {
  existingEl = viewChild.required('requiredEl');     // required and existing result
  missingEl = viewChild.required('notInATemplate');  // required but NOT existing result
  
  ngAfterViewInit() {
    console.log(this.existingEl()); // OK :-)
    console.log(this.missingEl());  // Runtime error: result marked as required but not available! 
  }
}
```

## Results availability timing

Signal query declaration functions (e.g., `viewChild`) execute while the directive is instantiated, before the template is rendered. Consequently, there is a period where the signal instance is created but no query results are collected. By default, Angular returns `undefined` for child queries or an empty array for children queries before results are available. Required queries will throw if accessed at this point.

Angular computes signal-based query results lazily, meaning results are not collected unless there is a code path that reads the signal. Query results can change over time due to view manipulation or direct calls to the `ViewContainerRef` API. Angular delays query resolution until it finishes rendering a given template to avoid returning incomplete results.

## Query declaration functions and associated rules

The `viewChild`, `contentChild`, `viewChildren`, and `contentChildren` functions are recognized by the Angular compiler. These functions can only be called within component or directive property initializers.

```angular-ts
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div #el></div>
  `,
})
export class App {
  el = viewChild('el'); // all good!

  constructor() {
    const myConst = viewChild('el'); // NOT SUPPORTED
  }
}
```

## Comparing signal-based queries to decorator-based queries

Signal queries are an alternative to queries declared using the `@ContentChild`, `@ContentChildren`, `@ViewChild`, or `@ViewChildren` decorators. The new approach exposes query results as signals, allowing composition with other signals and driving change detection. Benefits include:

- **More predictable timing**: Access query results as soon as they're available.
- **Simpler API surface**: All queries return a signal; multiple results are handled as a standard array.
- **Improved type safety**: Fewer use cases include `undefined` in possible results.
- **More accurate type inference**: TypeScript can infer more accurate types with type predicates or explicit `read` options.
- **Lazier updates**: Angular updates signal-based query results lazily, performing no work unless the code explicitly reads the results.

The underlying query mechanism remains similar, targeting elements in a template or content, but the type of results and timing of availability differ. The authoring format for declaring signal-based queries has changed, with the functions recognized by Angular when used as initializers of class members.