# Accessibility

Chart.js charts are rendered on user-provided `canvas` elements. It is the user's responsibility to create the `canvas` element in an accessible manner. The `canvas` element is supported in all browsers and will render on screen, but its content is not accessible to screen readers.

Accessibility for `canvas` must be added using ARIA attributes on the `canvas` element or by including internal fallback content within the opening and closing canvas tags. 

For more detailed explanations and examples of `canvas` accessibility, refer to the website: pauljadam.com/demos/canvas.html.

## Examples

### Accessible `canvas` Elements

1. By setting the `role` and `aria-label`, this `canvas` has an accessible name:
   ```html
   <canvas id="goodCanvas1" width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
   ```

2. This `canvas` element has a text alternative via fallback content:
   ```html
   <canvas id="okCanvas2" width="400" height="100">
       <p>Hello Fallback World</p>
   </canvas>
   ```

### Inaccessible `canvas` Elements

1. This `canvas` element lacks an accessible name or role:
   ```html
   <canvas id="badCanvas1" width="400" height="100"></canvas>
   ```

2. This `canvas` element has inaccessible fallback content:
   ```html
   <canvas id="badCanvas2" width="400" height="100">Your browser does not support the canvas element.</canvas>
   ```