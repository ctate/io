# Tooltip

## Tooltip Configuration

Namespace: `options.plugins.tooltip`, the global options for the chart tooltips is defined in `Chart.defaults.plugins.tooltip`.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `enabled` | `boolean` | `true` | Are on-canvas tooltips enabled? |
| `external` | `function` | `null` | See external tooltip section. |
| `mode` | `string` | `interaction.mode` | Sets which elements appear in the tooltip. |
| `intersect` | `boolean` | `interaction.intersect` | If true, the tooltip mode applies only when the mouse position intersects with an element. |
| `position` | `string` | `'average'` | The mode for positioning the tooltip. |
| `callbacks` | `object` | | See the callbacks section. |
| `itemSort` | `function` | | Sort tooltip items. |
| `filter` | `function` | | Filter tooltip items. |
| `backgroundColor` | `Color` | `'rgba(0, 0, 0, 0.8)'` | Background color of the tooltip. |
| `titleColor` | `Color` | `'#fff'` | Color of title text. |
| `titleFont` | `Font` | `{weight: 'bold'}` | See Fonts. |
| `titleAlign` | `string` | `'left'` | Horizontal alignment of the title text lines. |
| `titleSpacing` | `number` | `2` | Spacing to add to top and bottom of each title line. |
| `titleMarginBottom` | `number` | `6` | Margin to add on bottom of title section. |
| `bodyColor` | `Color` | `'#fff'` | Color of body text. |
| `bodyFont` | `Font` | `{}` | See Fonts. |
| `bodyAlign` | `string` | `'left'` | Horizontal alignment of the body text lines. |
| `bodySpacing` | `number` | `2` | Spacing to add to top and bottom of each tooltip item. |
| `footerColor` | `Color` | `'#fff'` | Color of footer text. |
| `footerFont` | `Font` | `{weight: 'bold'}` | See Fonts. |
| `footerAlign` | `string` | `'left'` | Horizontal alignment of the footer text lines. |
| `footerSpacing` | `number` | `2` | Spacing to add to top and bottom of each footer line. |
| `footerMarginTop` | `number` | `6` | Margin to add before drawing the footer. |
| `padding` | `Padding` | `6` | Padding inside the tooltip. |
| `caretPadding` | `number` | `2` | Extra distance to move the end of the tooltip arrow away from the tooltip point. |
| `caretSize` | `number` | `5` | Size, in px, of the tooltip arrow. |
| `cornerRadius` | `number` | `6` | Radius of tooltip corner curves. |
| `multiKeyBackground` | `Color` | `'#fff'` | Color to draw behind the colored boxes when multiple items are in the tooltip. |
| `displayColors` | `boolean` | `true` | If true, color boxes are shown in the tooltip. |
| `boxWidth` | `number` | `bodyFont.size` | Width of the color box if displayColors is true. |
| `boxHeight` | `number` | `bodyFont.size` | Height of the color box if displayColors is true. |
| `boxPadding` | `number` | `1` | Padding between the color box and the text. |
| `usePointStyle` | `boolean` | `false` | Use the corresponding point style instead of color boxes. |
| `borderColor` | `Color` | `'rgba(0, 0, 0, 0)'` | Color of the border. |
| `borderWidth` | `number` | `0` | Size of the border. |
| `rtl` | `boolean` | | `true` for rendering the tooltip from right to left. |
| `textDirection` | `string` | canvas' default | This will force the text direction on the canvas for rendering the tooltips. |
| `xAlign` | `string` | `undefined` | Position of the tooltip caret in the X direction. |
| `yAlign` | `string` | `undefined` | Position of the tooltip caret in the Y direction. |

Note: If you need more visual customizations, please use an HTML tooltip.

### Position Modes

Possible modes are:

* `'average'`
* `'nearest'`

`'average'` mode will place the tooltip at the average position of the items displayed in the tooltip. `'nearest'` will place the tooltip at the position of the element closest to the event position.

### Tooltip Alignment

The `xAlign` and `yAlign` options define the position of the tooltip caret. If these parameters are unset, the optimal caret position is determined.

Supported values for `xAlign`:

* `'left'`
* `'center'`
* `'right'`

Supported values for `yAlign`:

* `'top'`
* `'center'`
* `'bottom'`

### Text Alignment

The `titleAlign`, `bodyAlign`, and `footerAlign` options define the horizontal position of the text lines with respect to the tooltip box. Supported values:

* `'left'` (default)
* `'right'`
* `'center'`

These options are only applied to text lines. Color boxes are always aligned to the left edge.

### Sort Callback

Allows sorting of tooltip items. Must implement a function that can be passed to Array.prototype.sort. This function can also accept a third parameter that is the data object passed to the chart.

### Filter Callback

Allows filtering of tooltip items. Must implement a function that can be passed to Array.prototype.filter. This function can also accept a fourth parameter that is the data object passed to the chart.

## Tooltip Callbacks

Namespace: `options.plugins.tooltip.callbacks`, the tooltip has the following callbacks for providing text. For all functions, `this` will be the tooltip object created from the `Tooltip` constructor. If the callback returns `undefined`, then the default callback will be used. To remove things from the tooltip, the callback should return an empty string.

Namespace: `data.datasets[].tooltip.callbacks`, items marked with `Yes` in the column `Dataset override` can be overridden per dataset.

A tooltip item context is generated for each item that appears in the tooltip. This is the primary model that the callback methods interact with. For functions that return text, arrays of strings are treated as multiple lines of text.

| Name | Arguments | Return Type | Dataset override | Description |
| ---- | --------- | ----------- | ---------------- | ----------- |
| `beforeTitle` | `TooltipItem[]` | `string | string[] | undefined` | Returns the text to render before the title. |
| `title` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render as the title of the tooltip. |
| `afterTitle` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render after the title. |
| `beforeBody` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render before the body section. |
| `beforeLabel` | `TooltipItem` | `string | string[] | undefined` | Yes | Returns text to render before an individual label. |
| `label` | `TooltipItem` | `string | string[] | undefined` | Yes | Returns text to render for an individual item in the tooltip. |
| `labelColor` | `TooltipItem` | `object | undefined` | Yes | Returns the colors to render for the tooltip item. |
| `labelTextColor` | `TooltipItem` | `Color | undefined` | Yes | Returns the colors for the text of the label for the tooltip item. |
| `labelPointStyle` | `TooltipItem` | `object | undefined` | Yes | Returns the point style to use instead of color boxes if usePointStyle is true. |
| `afterLabel` | `TooltipItem` | `string | string[] | undefined` | Yes | Returns text to render after an individual label. |
| `afterBody` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render after the body section. |
| `beforeFooter` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render before the footer section. |
| `footer` | `TooltipItem[]` | `string | string[] | undefined` | Returns text to render as the footer of the tooltip. |
| `afterFooter` | `TooltipItem[]` | `string | string[] | undefined` | Text to render after the footer section. |

### Label Callback

The `label` callback can change the text that displays for a given data point. A common example is to show a unit. 

Example:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        }
    }
});
```

### Label Color Callback

Example to return a red box with a blue dashed border:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    labelColor: function(context) {
                        return {
                            borderColor: 'rgb(0, 0, 255)',
                            backgroundColor: 'rgb(255, 0, 0)',
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 2,
                        };
                    },
                    labelTextColor: function(context) {
                        return '#543453';
                    }
                }
            }
        }
    }
});
```

### Label Point Style Callback

Example to draw triangles instead of the regular color box:

```javascript
const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    labelPointStyle: function(context) {
                        return {
                            pointStyle: 'triangle',
                            rotation: 0
                        };
                    }
                }
            }
        }
    }
});
```

### Tooltip Item Context

The tooltip items passed to the tooltip callbacks implement the following interface.

```javascript
{
    chart: Chart,
    label: string,
    parsed: object,
    raw: object,
    formattedValue: string,
    dataset: object,
    datasetIndex: number,
    dataIndex: number,
    element: Element,
}
```

## External (Custom) Tooltips

External tooltips allow you to hook into the tooltip rendering process to render the tooltip in your own custom way. The `external` option takes a function which is passed a context parameter containing the `chart` and `tooltip`. 

Example:

```javascript
const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        plugins: {
            tooltip: {
                enabled: false,
                external: function(context) {
                    let tooltipEl = document.getElementById('chartjs-tooltip');

                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<table></table>';
                        document.body.appendChild(tooltipEl);
                    }

                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    if (tooltipModel.body) {
                        const titleLines = tooltipModel.title || [];
                        const bodyLines = tooltipModel.body.map(getBody);

                        let innerHtml = '<thead>';
                        titleLines.forEach(function(title) {
                            innerHtml += '<tr><th>' + title + '</th></tr>';
                        });
                        innerHtml += '</thead><tbody>';

                        bodyLines.forEach(function(body, i) {
                            const colors = tooltipModel.labelColors[i];
                            let style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            const span = '<span style="' + style + '">' + body + '</span>';
                            innerHtml += '<tr><td>' + span + '</td></tr>';
                        });
                        innerHtml += '</tbody>';

                        let tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    const position = context.chart.canvas.getBoundingClientRect();
                    const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                }
            }
        }
    }
});
```

## Tooltip Model

The tooltip model contains parameters that can be used to render the tooltip.

```javascript
{
    chart: Chart,
    dataPoints: TooltipItem[],
    xAlign: string,
    yAlign: string,
    x: number,
    y: number,
    width: number,
    height: number,
    caretX: number,
    caretY: number,
    body: object[],
    beforeBody: string[],
    afterBody: string[],
    title: string[],
    footer: string[],
    labelColors: TooltipLabelStyle[],
    labelTextColors: Color[],
    labelPointStyles: { pointStyle: PointStyle; rotation: number }[],
    opacity: number,
    options: Object
}
```

## Custom Position Modes

New modes can be defined by adding functions to the `Chart.Tooltip.positioners` map.

Example:

```javascript
import { Tooltip } from 'chart.js';

Tooltip.positioners.myCustomPositioner = function(elements, eventPosition) {
    const tooltip = this;

    return {
        x: 0,
        y: 0
    };
};

// Then, to use it...
new Chart.js(ctx, {
    data,
    options: {
        plugins: {
            tooltip: {
                position: 'myCustomPositioner'
            }
        }
    }
});
```

If you're using TypeScript, you'll also need to register the new mode:

```typescript
declare module 'chart.js' {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}
```