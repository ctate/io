# Linear Radial Axis

The linear radial scale is used to chart numerical data. Linear interpolation determines where a value lies in relation to the center of the axis.

## Configuration Options

### Linear Radial Axis specific options

Namespace: `options.scales[scaleId]`

| Name            | Type     | Default | Description                                                                 |
|-----------------|----------|---------|-----------------------------------------------------------------------------|
| `animate`       | `boolean`| `true`  | Whether to animate scaling the chart from the center.                      |
| `angleLines`    | `object` |         | Angle line configuration.                                                  |
| `beginAtZero`   | `boolean`| `false` | If true, scale will include 0 if it is not already included.              |
| `pointLabels`   | `object` |         | Point label configuration.                                                 |
| `startAngle`    | `number` | `0`     | Starting angle of the scale in degrees, 0 is at the top.                  |

### Common options for all axes

Namespace: `options.scales[scaleId]`

| Name            | Type     | Default | Description                                                                 |
|-----------------|----------|---------|-----------------------------------------------------------------------------|
| `type`          | `string` |         | Type of scale being employed. Custom scales can be created and registered. |
| `alignToPixels` | `boolean`| `false` | Align pixel values to device pixels.                                       |
| `backgroundColor` | `Color` |         | Background color of the scale area.                                        |
| `display`       | `boolean`| `true`  | Controls the axis global visibility.                                       |
| `grid`          | `object` |         | Grid line configuration.                                                   |
| `min`           | `number` |         | User defined minimum number for the scale.                                 |
| `max`           | `number` |         | User defined maximum number for the scale.                                 |
| `reverse`       | `boolean`| `false` | Reverse the scale.                                                         |
| `stacked`       | `boolean`| `false` | Should the data be stacked.                                                |
| `suggestedMax`  | `number` |         | Adjustment used when calculating the maximum data value.                   |
| `suggestedMin`  | `number` |         | Adjustment used when calculating the minimum data value.                   |
| `ticks`         | `object` |         | Tick configuration.                                                        |
| `weight`        | `number` | `0`     | The weight used to sort the axis.                                         |

## Tick Configuration

### Linear Radial Axis specific tick options

Namespace: `options.scales[scaleId].ticks`

| Name            | Type     | Scriptable | Default | Description                                                                 |
|-----------------|----------|------------|---------|-----------------------------------------------------------------------------|
| `count`         | `number` | Yes        | `undefined` | The number of ticks to generate.                                          |
| `format`        | `object` | Yes        |         | The `Intl.NumberFormat` options used by the default label formatter.      |
| `maxTicksLimit` | `number` | Yes        | `11`    | Maximum number of ticks and gridlines to show.                            |
| `precision`     | `number` | Yes        |         | If defined, the step size will be rounded to this many decimal places.    |
| `stepSize`      | `number` | Yes        |         | User defined fixed step size for the scale.                               |

The scriptable context is described in the Options section.

## Grid Line Configuration

Namespace: `options.scales[scaleId].grid`

| Name              | Type     | Scriptable | Indexable | Default                          | Description                                   |
|-------------------|----------|------------|-----------|----------------------------------|-----------------------------------------------|
| `borderDash`      | `number[]` |          |           | `[]`                            | Length and spacing of dashes on grid lines.  |
| `borderDashOffset`| `number` | Yes        |           | `0.0`                           | Offset for line dashes.                       |
| `circular`        | `boolean`|            |           | `false`                         | If true, gridlines are circular.              |
| `color`           | `Color`  | Yes        | Yes       | `Chart.defaults.borderColor`   | The color of the grid lines.                  |
| `display`         | `boolean`|            |           | `true`                          | If false, do not display grid lines.          |
| `lineWidth`       | `number` | Yes        | Yes       | `1`                             | Stroke width of grid lines.                    |

The scriptable context is described in the Options section.

## Axis Range Settings

The `suggestedMax` and `suggestedMin` settings change the data values used to scale the axis, useful for extending the range while maintaining auto-fit behavior.

```javascript
let minDataValue = Math.min(mostNegativeValue, options.ticks.suggestedMin);
let maxDataValue = Math.max(mostPositiveValue, options.ticks.suggestedMax);
```

In this example, the largest positive value is 50, but the data maximum is expanded to 100. The lowest data value below the `suggestedMin` is ignored.

```javascript
let chart = new Chart(ctx, {
    type: 'radar',
    data: {
        datasets: [{
            label: 'First dataset',
            data: [0, 20, 40, 50]
        }],
        labels: ['January', 'February', 'March', 'April']
    },
    options: {
        scales: {
            r: {
                suggestedMin: 50,
                suggestedMax: 100
            }
        }
    }
});
```

In contrast, the `min` and `max` settings set explicit ends to the axes, which may hide some data points.

## Step Size

If set, the scale ticks will be enumerated by multiples of `stepSize`. If not set, ticks are labeled automatically using the nice numbers algorithm.

```javascript
let options = {
    scales: {
        r: {
            max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
        }
    }
};
```

## Angle Line Options

Namespace: `options.scales[scaleId].angleLines`

| Name            | Type     | Scriptable | Default | Description                                                                 |
|-----------------|----------|------------|---------|-----------------------------------------------------------------------------|
| `display`       | `boolean`|            | `true`  | If true, angle lines are shown.                                            |
| `color`         | `Color`  | Yes        | `Chart.defaults.borderColor` | Color of angled lines.            |
| `lineWidth`     | `number` | Yes        | `1`     | Width of angled lines.                                                     |
| `borderDash`    | `number[]` | Yes      | `[]`    | Length and spacing of dashes on angled lines.                             |
| `borderDashOffset` | `number` | Yes      | `0.0`   | Offset for line dashes.                                                   |

The scriptable context is described in the Options section.

## Point Label Options

Namespace: `options.scales[scaleId].pointLabels`

| Name              | Type     | Scriptable | Default | Description                                                                 |
|-------------------|----------|------------|---------|-----------------------------------------------------------------------------|
| `backdropColor`   | `Color`  | `true`     | `undefined` | Background color of the point label.                                     |
| `backdropPadding` | `Padding`|            | `2`     | Padding of label backdrop.                                                 |
| `borderRadius`    | `number` | `true`     | `0`     | Border radius of the point label.                                         |
| `display`         | `boolean`| `string`   | `true`  | If true, point labels are shown.                                          |
| `callback`        | `function`|           |         | Callback function to transform data labels to point labels.               |
| `color`           | `Color`  | Yes        | `Chart.defaults.color` | Color of label.                  |
| `font`            | `Font`   | Yes        | `Chart.defaults.font` | See Fonts.                       |
| `padding`         | `number` | Yes        | `5`     | Padding between chart and point labels.                                   |
| `centerPointLabels` | `boolean`|           | `false` | If true, point labels are centered.                                       |

The scriptable context is described in the Options section.

## Internal data format

Internally, the linear radial scale uses numeric data.