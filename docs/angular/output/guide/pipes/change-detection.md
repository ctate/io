# Change detection with pipes

Pipes are used with data-bound values that may change due to user actions. Angular executes the pipe whenever it detects a change for primitive input values (e.g., `String`, `Number`) or object references (e.g., `Date`, `Array`).

The `exponentialStrength` pipe executes every time the user changes the value or the exponent. Angular detects each change and immediately runs the pipe. This is effective for primitive input values, but for changes inside composite objects (like modifying an array element), understanding change detection and using an `impure` pipe is necessary.

## How change detection works

Angular monitors data-bound values through a change detection process that runs after every DOM event (keystrokes, mouse moves, timer ticks, server responses). 

Example files:
- `flying-heroes.component.html (v1)`: Displays hero names using `*ngFor`.
- `flying-heroes.component.ts (v1)`: Manages the heroes array.

Angular updates the display when a hero is added or when the **Reset** button is clicked, replacing the `heroes` array with a new one.

However, executing a pipe for every change can slow down performance. Angular uses a faster change-detection algorithm for executing pipes.

## Detecting pure changes to primitives and object references

Pipes are defined as *pure* by default, executing only when a *pure change* is detected. A pure change is a change to a primitive input value or a changed object reference.

A pure pipe must use a pure function, which processes inputs and returns values without side effects. Angular ignores changes within objects and arrays, as checking a primitive value or object reference is faster than deep checks.

If an array is used as input for a pure pipe, it may not behave as expected. For example, if a hero is added by pushing it onto the `heroes` array, the pipe won't run because the array reference hasn't changed.

To achieve the desired behavior, replace the array with a new one containing the updated elements. Angular will detect the change in the array reference and execute the pipe.

In summary, mutating the input array prevents the pure pipe from executing, while replacing it allows execution and display updates. Alternatively, use an *impure* pipe to detect changes within composite objects.

## Detecting impure changes within composite objects

To execute a custom pipe after a change within a composite object, define the pipe as `impure`. Angular executes an impure pipe every time it detects a change (e.g., keystrokes, mouse events).

**IMPORTANT**: Use impure pipes cautiously, as they can slow down your application.

Make a pipe impure by setting its `pure` flag to `false`. 

The `FlyingHeroesImpurePipe` extends `FlyingHeroesPipe`, inheriting its characteristics. The only change is setting the `pure` flag to `false`.

`FlyingHeroesImpurePipe` is suitable for an impure pipe because its `transform` function is trivial and fast.

You can derive a `FlyingHeroesImpureComponent` from `FlyingHeroesComponent`, changing only the pipe in the template.