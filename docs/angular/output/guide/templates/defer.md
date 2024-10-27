# Deferred loading with `@defer`

Deferrable views, or `@defer` blocks, reduce the initial bundle size by deferring the loading of non-essential code, resulting in faster initial loads and improved Core Web Vitals (CWV), particularly Largest Contentful Paint (LCP) and Time to First Byte (TTFB).

To use this feature, wrap a section of your template in a `@defer` block:

```angular-html
@defer {
  <large-component />
}
```

Code for components, directives, and pipes inside the `@defer` block is split into a separate JavaScript file and loaded only when necessary.

## Which dependencies are deferred?

Components, directives, pipes, and component CSS styles can be deferred. For dependencies within a `@defer` block to be deferred, they must:

1. Be standalone. Non-standalone dependencies cannot be deferred and are eagerly loaded.
2. Not be referenced outside of `@defer` blocks within the same file.

Transitive dependencies can still be declared in an `NgModule` and participate in deferred loading.

## Managing different stages of deferred loading

`@defer` blocks have several sub-blocks for handling different loading stages.

### `@defer`

Defines the content section that is lazily loaded. It is not rendered initially and loads once the specified trigger occurs or the `when` condition is met. By default, it triggers when the browser state becomes idle.

```angular-html
@defer {
  <large-component />
}
```

### Show placeholder content with `@placeholder`

The `@placeholder` block declares content to show before the `@defer` block is triggered.

```angular-html
@defer {
  <large-component />
} @placeholder {
  <p>Placeholder content</p>
}
```

The `@placeholder` block can specify a `minimum` time for displaying the placeholder.

```angular-html
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>Placeholder content</p>
}
```

### Show loading content with `@loading`

The `@loading` block shows content while deferred dependencies are loading.

```angular-html
@defer {
  <large-component />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @placeholder {
  <p>Placeholder content</p>
}
```

It accepts `minimum` and `after` parameters to prevent flickering.

```angular-html
@defer {
  <large-component />
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
}
```

### Show error state with `@error`

The `@error` block displays if deferred loading fails.

```angular-html
@defer {
  <large-component />
} @error {
  <p>Failed to load large component.</p>
}
```

## Controlling deferred content loading with triggers

Triggers control when Angular loads and displays deferred content. Multiple triggers can be defined, separated by a semicolon.

### `on`

Specifies conditions for triggering the `@defer` block. Available triggers include:

- `idle`: Triggers when the browser is idle.
- `viewport`: Triggers when specified content enters the viewport.
- `interaction`: Triggers on user interaction with a specified element.
- `hover`: Triggers on mouse hover over a specified area.
- `immediate`: Triggers immediately after non-deferred content finishes rendering.
- `timer`: Triggers after a specified duration.

### `when`

Accepts a custom conditional expression to load deferred content when the condition becomes truthy.

```angular-html
@defer (when condition) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

## Prefetching data with `prefetch`

You can specify a **prefetch trigger** to load JavaScript associated with the `@defer` block before the content is shown.

```angular-html
@defer (on interaction; prefetch on idle) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

## Testing `@defer` blocks

Angular provides TestBed APIs for testing `@defer` blocks. You can configure the behavior to start in a "paused" state for manual control.

```angular-ts
it('should render a defer block in different states', async () => {
  TestBed.configureTestingModule({deferBlockBehavior: DeferBlockBehavior.Manual});
  @Component({
    template: `
      @defer {
        <large-component />
      } @placeholder {
        Placeholder
      } @loading {
        Loading...
      }
    `
  })
  class ComponentA {}
  const componentFixture = TestBed.createComponent(ComponentA);
  const deferBlockFixture = (await componentFixture.getDeferBlocks())[0];
  expect(componentFixture.nativeElement.innerHTML).toContain('Placeholder');
  await deferBlockFixture.render(DeferBlockState.Loading);
  expect(componentFixture.nativeElement.innerHTML).toContain('Loading');
  await deferBlockFixture.render(DeferBlockState.Complete);
  expect(componentFixture.nativeElement.innerHTML).toContain('large works!');
});
```

## Compatibility with `NgModule`

`@defer` blocks work with both standalone and NgModule-based components, but only standalone components can be deferred.

## Server-side rendering (SSR) and static-site generation (SSG)

In SSR or SSG, defer blocks always render their `@placeholder`. Triggers are ignored on the server.

## Best practices for deferring views

- Avoid cascading loads with nested `@defer` blocks by using different triggers.
- Avoid layout shifts by not deferring components visible in the viewport on initial load.