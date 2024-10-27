# Complex animation sequences

Angular allows for coordinated animation sequences, enabling animations for entire grids or lists of elements as they enter and leave a page. You can run multiple animations in parallel or sequentially.

## Functions for Complex Animations

- **`query()`**: Finds one or more inner HTML elements.
- **`stagger()`**: Applies a cascading delay to animations for multiple elements.
- **`group()`**: Runs multiple animation steps in parallel.
- **`sequence()`**: Runs animation steps one after another.

## The `query()` Function

The `query()` function is essential for complex animations, allowing you to find child elements and apply animations. Examples include:

- `query()` followed by `animate()`: Queries simple HTML elements and applies animations.
- `query()` followed by `animateChild()`: Queries child elements with their own animation metadata.

The first argument of `query()` is a CSS selector string, which can include Angular-specific tokens:

- `:enter`, `:leave`: For entering/leaving elements.
- `:animating`: For elements currently animating.
- `@*`, `@triggerName`: For elements with any or a specific trigger.
- `:self`: The animating element itself.

**Note**: Not all child elements are considered entering/leaving. For more information, refer to the query API docs.

## Animate Multiple Elements with `query()` and `stagger()`

Use `query()` to find elements entering the page and `stagger()` to define a timing gap between animations. For example:

- Query elements entering the page.
- Set initial styles (transparent, transformed).
- Use `stagger()` to delay each animation by 30 milliseconds.
- Animate each element for 0.5 seconds with a custom easing curve.

## Parallel Animation with `group()`

To animate multiple properties of the same element in parallel, use the `group()` function. This function groups animation steps rather than elements. For example, apply two independent animations to the same element using `group()` for both `:enter` and `:leave`.

## Sequential vs. Parallel Animations

To create animations that occur one after the other, use the `sequence()` function. Within `sequence()`, use:

- `style()`: Applies styling data immediately.
- `animate()`: Applies styling data over a time interval.

## Filter Animation Example

In the example page under the Filter/Stagger tab, entering text in the **Search Heroes** box filters the list in real time. The `filterAnimation` trigger in the HTML template contains three transitions, performing the following tasks:

- Skips animations on initial page load.
- Filters heroes based on search input.
- Hides elements leaving the DOM by setting opacity and width to 0.
- Animates elements entering the DOM over 300 milliseconds with a staggered delay of 50 milliseconds.

## Animating Items in a Reordering List

To animate items in an `*ngFor` list when their order changes, assign a `TrackByFunction` to the `NgForOf` directive. This ensures Angular tracks elements correctly, allowing for proper animations.

## Animations and Component View Encapsulation

Angular animations do not directly consider View Encapsulation. Components using `ViewEncapsulation.Emulated` behave as if using `ViewEncapsulation.None`. However, `ViewEncapsulation.ShadowDom` can interfere with animations due to its DOM structure. Avoid applying animations to views with ShadowDom encapsulation.

## Animation Sequence Summary

Angular animations start with `query()` to find inner elements, followed by `stagger()`, `group()`, and `sequence()` to control animation steps.

## More on Angular Animations

You might also be interested in:

- Introduction to Angular animations
- Transition and triggers
- Reusable animations
- Route transition animations