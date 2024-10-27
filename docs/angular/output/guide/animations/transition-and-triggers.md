# Animation transitions and triggers

This guide covers special transition states like the `*` wildcard and `void`, detailing their use for elements entering and leaving a view. It also explores multiple animation triggers, callbacks, and sequence-based animations using keyframes.

## Predefined states and wildcard matching

In Angular, transition states can be defined using the `state()` function or the predefined `*` wildcard and `void` states.

### Wildcard state

The `*` wildcard matches any animation state, useful for defining transitions that apply regardless of the element's start or end state. For example, a transition of `open => *` applies when the element's state changes from open to anything else.

The following code sample demonstrates using the wildcard state with `open` and `closed` states, allowing transitions to be defined without specifying each state-to-state pair.

Use double arrow syntax for state-to-state transitions in both directions.

### Use wildcard state with multiple transition states

In cases with multiple potential states, wildcard states reduce coding. For example, if a button can change from `open` to `closed` or `inProgress`, using a wildcard state simplifies the transitions.

The `* => *` transition applies to any change between two states, and transitions are matched in the order defined. More specific transitions should be listed before `* => *`.

### Use wildcards with styles

The wildcard `*` can be used with a style to animate with the current style value, serving as a fallback if the state isn't declared within the trigger.

### Void state

The `void` state configures transitions for elements entering or leaving a page. 

### Combine wildcard and void states

Combining wildcard and void states triggers animations for entering and leaving:

- `* => void` applies when the element leaves a view.
- `void => *` applies when the element enters a view.
- The wildcard `*` matches any state, including `void`.

## Animate entering and leaving a view

To animate elements entering or leaving a page, you can add behaviors such as having a hero fly onto the page from the left when added and fly out to the right when removed.

The `void` state is applied when the HTML element isn't attached to a view.

## Aliases :enter and :leave

`:enter` and `:leave` are aliases for `void => *` and `* => void` transitions, used by several animation functions. 

Use these aliases to target elements that are inserted or removed from a view.

### Use `*ngIf` and `*ngFor` with :enter and :leave

The `:enter` transition runs when `*ngIf` or `*ngFor` views are added, and `:leave` runs when they are removed. 

As a rule, any element added to the DOM by Angular passes via the `:enter` transition, while only elements directly removed pass via the `:leave` transition.

## Transition :increment and :decrement

The `transition()` function can take `:increment` and `:decrement` to trigger transitions when a numeric value increases or decreases.

## Boolean values in transitions

A trigger with a Boolean binding can be matched using a `transition()` expression comparing `true` and `false`. This pattern is an alternative to creating two named states.

## Multiple animation triggers

You can define multiple animation triggers for a component. Parent animations take priority, blocking child animations unless the parent queries them using the `animateChild()` function.

### Disable an animation on an HTML element

Use the `@.disabled` binding to turn off animations on an element and its nested elements. 

To disable all animations for an Angular application, place the `@.disabled` binding on the topmost component.

## Animation callbacks

The `trigger()` function emits callbacks when animations start and finish. These can be used for various purposes, such as indicating progress during slow operations.

## Keyframes

Use `keyframes()` to create animations with multiple steps. The `offset` defines when each style change occurs, and specifying offsets is optional.

### Keyframes with a pulsation

Keyframes can create a pulse effect by defining styles at specific offsets throughout the animation.

### Animatable properties and units

Angular animations support animating any property considered animatable by the browser. For properties with numeric values, define a unit by providing the value as a string with the appropriate suffix.

### Automatic property calculation with wildcards

Use the wildcard `*` under `style()` for properties whose values are unknown until runtime, allowing for dynamic animations.

### Keyframes summary

The `keyframes()` function allows specifying multiple interim styles within a single transition, with optional offsets for style changes.

## More on Angular animations

You might also be interested in:

- Introduction to Angular animations
- Complex animation sequences
- Reusable animations
- Route transition animations