# Introduction to Angular animations

Animation provides the illusion of motion by changing the styling of HTML elements over time. Well-designed animations enhance user experience by:

- Preventing abrupt transitions between web pages
- Allowing users to perceive application responses to their actions
- Intuitively directing user attention where needed

Animations typically involve multiple style transformations, such as moving, changing color, growing or shrinking, fading, or sliding elements. Angular's animation system leverages CSS functionality, enabling animation of any animatable property, including positions, sizes, transforms, and colors. A list of animatable properties can be found on the W3C's CSS Transitions page.

## About this guide

This guide introduces basic Angular animation features to help you integrate animations into your project.

## Getting started

The primary Angular modules for animations are `@angular/animations` and `@angular/platform-browser`. To add animations to your project, import the necessary modules along with standard Angular functionality.

### Enabling the animations module

Import `provideAnimationsAsync` from `@angular/platform-browser/animations/async` and add it to the providers list in the `bootstrapApplication` function call.

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
  ]
});
```

**Important:** For immediate animations upon application load, use `provideAnimations` from `@angular/platform-browser/animations` instead of `provideAnimationsAsync`.

For `NgModule` based applications, import `BrowserAnimationsModule` to introduce animation capabilities into your Angular root application module.

### Importing animation functions into component files

If you plan to use specific animation functions in component files, import them from `@angular/animations`.

See all available animation functions at the end of this guide.

### Adding the animation metadata property

In the component file, add a metadata property called `animations:` within the `@Component()` decorator to define the animation trigger.

### Animating a transition

To animate a transition, specify that a button displays either **Open** or **Closed** based on user actions. For example, in the `open` state, the button is visible and yellow, while in the `closed` state, it is translucent and blue.

Use the `style()` function to specify CSS styles for animations, collecting styles in an animation state with names like `open` or `closed`.

**Helpful:** Create a new `open-close` component to animate with simple transitions by running:

```shell
ng g component open-close
```

### Animation state and styles

Use Angular's `state()` function to define different states for transitions. This function takes a unique name and a `style()` function to define styles associated with that state.

### Transitions and timing

Define an animation *transition* to specify changes between states over time using the `transition()` function, which accepts two arguments: a direction expression and one or more `animate()` steps.

The `animate()` function defines the length, delay, and easing of a transition, and can include `keyframes()` for multi-step animations.

#### Animation metadata: duration, delay, and easing

The `animate()` function accepts `timings` and `styles` input parameters. The `timings` parameter can be a number or a string defined in three parts:

```typescript
animate (duration)
```

or

```typescript
animate ('duration delay easing')
```

The first part, `duration`, is required and can be expressed in milliseconds or seconds. The second argument, `delay`, has the same syntax as `duration`. The third argument, `easing`, controls the animation's acceleration and deceleration.

**Helpful:** See the Material Design website's topic on Natural easing curves for general information on easing curves.

### Triggering the animation

An animation requires a *trigger* to know when to start. The `trigger()` function collects states and transitions, giving the animation a name to attach to the triggering element in the HTML template.

### Defining animations and attaching them to the HTML template

Define animations in the component's metadata under the `animations:` property within the `@Component()` decorator. Attach the trigger to an element in the template using Angular property binding syntax.

```typescript
<div [@triggerName]="expression">…</div>;
```

The animation executes when the expression value changes to a new state.

**Helpful:** Use `*ngIf` with the animation trigger in the HTML template for conditional animations.

### Code review

Here are the code files discussed in the transition example.

### Summary

You learned to add animation to a transition between two states using `style()` and `state()` along with `animate()` for timing. Explore more advanced features in Angular animations under the Animation section.

## Animations API summary

The `@angular/animations` module provides a domain-specific language (DSL) for creating and controlling animations in Angular applications. See the API reference for a complete listing and syntax details of core functions.

| Function name                     | Description                                                                                                                                                                                                |
|:---                               |:---                                                                                                                                                                                                         |
| `trigger()`                       | Initiates the animation and serves as a container for other animation function calls. Binds to `triggerName` in the HTML template. Uses array syntax. |
| `style()`                         | Defines one or more CSS styles for animations. Controls visual appearance during animations. Uses object syntax.                                                                 |
| `state()`                         | Creates a named set of CSS styles for successful transition to a given state. The state can be referenced by name in other animation functions.                              |
| `animate()`                       | Specifies timing information for a transition, with optional values for `delay` and `easing`. Can include `style()` calls.                                                                            |
| `transition()`                    | Defines the animation sequence between two named states. Uses array syntax.                                                                                                                                 |
| `keyframes()`                     | Allows sequential style changes within a specified time interval. Use within `animate()`. Can include multiple `style()` calls within each `keyframe()`.                       |
| `group()`                         | Specifies a group of animation steps to run in parallel. Continues only after all inner animation steps complete. Used within `sequence()` or `transition()`.     |
| `query()`                         | Finds one or more inner HTML elements within the current element.                                                                                                                                           |
| `sequence()`                      | Specifies a list of animation steps that run sequentially.                                                                                                                                  |
| `stagger()`                       | Staggers the starting time for animations for multiple elements.                                                                                                                                            |
| `animation()`                     | Produces a reusable animation that can be invoked from elsewhere. Used with `useAnimation()`.                                                                                                      |
| `useAnimation()`                  | Activates a reusable animation. Used with `animation()`.                                                                                                                                                    |
| `animateChild()`                  | Allows animations on child components to run within the same timeframe as the parent.                                                                                                                    |

## More on Angular animations

**Helpful:** Check out this presentation shown at the AngularConnect conference in November 2017, and the accompanying source code.

You might also be interested in the following:

- Transition and triggers
- Complex animation sequences
- Reusable animations
- Route transition animations