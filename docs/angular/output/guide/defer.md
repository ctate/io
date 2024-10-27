# Deferrable Views

## Overview

Deferrable views allow you to defer the loading of specific dependencies in a component template, including components, directives, pipes, and associated CSS. Use the `@defer` block to specify loading conditions.

Deferrable views support triggers, prefetching, and sub-blocks for managing placeholder, loading, and error states. Custom conditions can be created with `when` and `prefetch when`.

```angular-html
@defer {
  <large-component />
}
```

## Why use Deferrable Views?

Deferrable views reduce the initial bundle size and defer heavy components, leading to faster initial loads and improved Core Web Vitals (CWV), particularly Largest Contentful Paint (LCP) and Time to First Byte (TTFB). Components that may cause layout shifts should be deferred if they are not visible to the user.

## Which dependencies are defer-loadable?

Dependencies in a `@defer` block must be:

1. Standalone (non-standalone dependencies cannot be deferred).
2. Not directly referenced outside of `@defer` blocks (including ViewChild queries).

Transitive dependencies can be standalone or NgModule-based and will still be deferred.

## Blocks

### `@defer`

The main `@defer` block lazily loads content, which appears once the specified trigger or `when` condition is met. By default, it triggers when the browser state is idle.

### `@placeholder`

The `@placeholder` block shows content before the `@defer` block is triggered. It can include any content, but its dependencies are eagerly loaded. A `minimum` parameter can be specified to prevent flickering.

```angular-html
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>Placeholder content</p>
}
```

### `@loading`

The `@loading` block displays content during the loading of deferred dependencies. It can show a loading spinner and accepts `minimum` and `after` parameters to manage display timing.

```angular-html
@defer {
  <large-component />
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
}
```

### `@error`

The `@error` block shows content if deferred loading fails. Its dependencies are eagerly loaded.

```angular-html
@defer {
  <calendar-cmp />
} @error {
  <p>Failed to load the calendar</p>
}
```

## Triggers

Triggers determine when a `@defer` block is activated. Use `on` for event-based triggers and `when` for boolean expressions.

### `on`

Specifies trigger conditions (e.g., interaction, viewport). Multiple triggers are OR conditions.

```angular-html
@defer (on viewport; on timer(5s)) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```

### `when`

Specifies a boolean condition for triggering the swap from placeholder to lazy-loaded content.

```angular-html
@defer (when cond) {
  <calendar-cmp />
}
```

### Trigger Types

- **on idle**: Triggers when the browser is idle.
- **on viewport**: Triggers when content enters the viewport.
- **on interaction**: Triggers on user interaction (click, keydown).
- **on hover**: Triggers on mouse hover.
- **on immediate**: Triggers immediately after rendering.
- **on timer**: Triggers after a specified duration.

## Prefetching

Use `prefetch` to specify conditions for prefetching dependencies. This allows resources to be fetched before the user interacts with the defer block.

```angular-html
@defer (on interaction; prefetch on idle) {
  <calendar-cmp />
} @placeholder {
  <img src="placeholder.png" />
}
```

## Testing

Angular's TestBed APIs simplify testing `@defer` blocks. You can configure the behavior to start in a "paused" state for manual control.

```typescript
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

## Behavior with Server-side Rendering (SSR) and Static Site Generation (SSG)

In SSR or SSG, defer blocks render their `@placeholder`, ignoring triggers.

## Behavior with `NgModule`

`@defer` blocks can be used in both standalone and NgModule-based components. Only standalone dependencies can be deferred.

## Nested `@defer` blocks

Avoid cascading requests by ensuring nested `@defer` blocks have different conditions.

## Avoiding Layout Shifts

Do not defer components visible in the user's viewport on initial load to prevent increased cumulative layout shift (CLS). Avoid immediate, timer, viewport, and custom conditions that load content during the initial render.