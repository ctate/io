# Reusable animations

This topic provides examples of creating reusable animations.

## Create reusable animations

To create a reusable animation, use the `animation()` function to define an animation in a separate `.ts` file and declare this animation definition as a `const` export variable. You can then import and reuse this animation in any of your application components using the `useAnimation()` function.

In the code snippet, `transitionAnimation` is made reusable by declaring it as an export variable.

**Helpful:** The `height`, `opacity`, `backgroundColor`, and `time` inputs are replaced during runtime.

You can also export a part of an animation. For example, the following snippet exports the animation `trigger`.

From this point, you can import reusable animation variables in your component class. For example, the following code snippet imports the `transitionAnimation` variable and uses it via the `useAnimation()` function.

## More on Angular animations

You might also be interested in the following resources:

- Introduction to Angular animations (guide/animations)
- Transition and triggers (guide/animations/transition-and-triggers)
- Complex animation sequences (guide/animations/complex-sequences)
- Route transition animations (guide/animations/route-animations)