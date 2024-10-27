# Responsive Charts

When changing the chart size based on the window size, a major limitation is that the canvas render size (`canvas.width` and `.height`) cannot be expressed with relative values, unlike the display size (`canvas.style.width` and `.height`). These sizes are independent, meaning the canvas render size does not adjust automatically based on the display size, leading to inaccurate rendering.

The following examples do not work:

- `<canvas height="40vh" width="80vw">`: invalid values; the canvas doesn't resize.
- `<canvas style="height:40vh; width:80vw">`: invalid behavior; the canvas is resized but becomes blurry.
- `<canvas style="margin: 0 auto;">`: invalid behavior; the canvas continually shrinks. Chart.js requires a dedicated container for each canvas, and this styling should be applied there.

Chart.js provides options to enable responsiveness and control the resize behavior of charts by detecting when the canvas display size changes and updating the render size accordingly.

## Configuration Options

Namespace: `options`

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `responsive` | `boolean` | `true` | Resizes the chart canvas when its container does. |
| `maintainAspectRatio` | `boolean` | `true` | Maintains the original canvas aspect ratio `(width / height)` when resizing. |
| `aspectRatio` | `number` | `1` or `2` | Canvas aspect ratio (i.e., `width / height`). A value of 1 represents a square canvas. This option is ignored if the height is explicitly defined. Default value varies by chart type; radial charts default to `1`, others default to `2`. |
| `onResize` | `function` | `null` | Called when a resize occurs. Receives two arguments: the chart instance and the new size. |
| `resizeDelay` | `number` | `0` | Delay the resize update by the specified milliseconds. This can ease the resize process by debouncing the update of the elements. |

## Important Note

Detecting when the canvas size changes cannot be done directly from the canvas element. Chart.js uses its parent container to update the canvas render and display sizes. This method requires the container to be relatively positioned and dedicated to the chart canvas only. Responsiveness can be achieved by setting relative values for the container size:

```html
<div class="chart-container" style="position: relative; height:40vh; width:80vw">
    <canvas id="chart"></canvas>
</div>
```

The chart can also be programmatically resized by modifying the container size:

```javascript
chart.canvas.parentNode.style.height = '128px';
chart.canvas.parentNode.style.width = '128px';
```

For the above code to correctly resize the chart height, the `maintainAspectRatio` option must be set to `false`.

## Printing Resizable Charts

CSS media queries allow changing styles when printing a page. The CSS applied from these media queries may cause charts to need to resize. However, the resize won't happen automatically. To support resizing charts when printing, hook the `onbeforeprint` event and manually trigger resizing of each chart:

```javascript
function beforePrintHandler () {
    for (let id in Chart.instances) {
        Chart.instances[id].resize();
    }
}
```

Due to complexities in when the browser lays out the document for printing and when resize events are fired, Chart.js may not properly resize for the print layout. To work around this, pass an explicit size to `.resize()` and use an `onafterprint` event to restore the automatic size when done:

```javascript
window.addEventListener('beforeprint', () => {
  myChart.resize(600, 600);
});
window.addEventListener('afterprint', () => {
  myChart.resize();
});
```