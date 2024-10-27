# Line Chart

A line chart is a way of plotting data points on a line, often used to show trend data or compare two data sets.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
};

module.exports = {
  actions: [],
  config: config,
};
```

## Dataset Properties

Namespaces:

- `data.datasets[index]` - options for this dataset only
- `options.datasets.line` - options for all line datasets
- `options.elements.line` - options for all line elements
- `options.elements.point` - options for all point elements
- `options` - options for the whole chart

### Properties

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | Color | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderCapStyle` | string | Yes | - | `'butt'` |
| `borderColor` | Color | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderDash` | number[] | Yes | - | `[]` |
| `borderDashOffset` | number | Yes | - | `0.0` |
| `borderJoinStyle` | 'round'|'bevel'|'miter' | Yes | - | `'miter'` |
| `borderWidth` | number | Yes | - | `3` |
| `clip` | number|object|false | - | `undefined` |
| `cubicInterpolationMode` | string | Yes | - | `'default'` |
| `data` | object|object[]|number[]|string[] | - | **required** |
| `drawActiveElementsOnTop` | boolean | Yes | Yes | `true` |
| `fill` | boolean|string | Yes | - | `false` |
| `hoverBackgroundColor` | Color | Yes | - | `undefined` |
| `hoverBorderCapStyle` | string | Yes | - | `undefined` |
| `hoverBorderColor` | Color | Yes | - | `undefined` |
| `hoverBorderDash` | number[] | Yes | - | `undefined` |
| `hoverBorderDashOffset` | number | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | 'round'|'bevel'|'miter' | Yes | - | `undefined` |
| `hoverBorderWidth` | number | Yes | - | `undefined` |
| `indexAxis` | string | - | - | `'x'` |
| `label` | string | - | - | `''` |
| `order` | number | - | - | `0` |
| `pointBackgroundColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderWidth` | number | Yes | Yes | `1` |
| `pointHitRadius` | number | Yes | Yes | `1` |
| `pointHoverBackgroundColor` | Color | Yes | Yes | `undefined` |
| `pointHoverBorderColor` | Color | Yes | Yes | `undefined` |
| `pointHoverBorderWidth` | number | Yes | Yes | `1` |
| `pointHoverRadius` | number | Yes | Yes | `4` |
| `pointRadius` | number | Yes | Yes | `3` |
| `pointRotation` | number | Yes | Yes | `0` |
| `pointStyle` | pointStyle | Yes | Yes | `'circle'` |
| `segment` | object | - | - | `undefined` |
| `showLine` | boolean | - | - | `true` |
| `spanGaps` | boolean|number | - | - | `undefined` |
| `stack` | string | - | - | `'line'` |
| `stepped` | boolean|string | - | - | `false` |
| `tension` | number | - | - | `0` |
| `xAxisID` | string | - | - | first x axis |
| `yAxisID` | string | - | - | first y axis |

### General Properties

| Name | Description |
| ---- | ---- |
| `clip` | How to clip relative to chartArea. |
| `drawActiveElementsOnTop` | Draw the active points of a dataset over the other points. |
| `indexAxis` | The base axis of the dataset. |
| `label` | The label for the dataset. |
| `order` | The drawing order of dataset. |
| `stack` | The ID of the group to which this dataset belongs. |
| `xAxisID` | The ID of the x-axis to plot this dataset on. |
| `yAxisID` | The ID of the y-axis to plot this dataset on. |

### Point Styling Properties

| Name | Description |
| ---- | ---- |
| `pointBackgroundColor` | The fill color for points. |
| `pointBorderColor` | The border color for points. |
| `pointBorderWidth` | The width of the point border in pixels. |
| `pointHitRadius` | The pixel size of the non-displayed point that reacts to mouse events. |
| `pointRadius` | The radius of the point shape. |
| `pointRotation` | The rotation of the point in degrees. |
| `pointStyle` | Style of the point. |

### Line Styling Properties

| Name | Description |
| ---- | ---- |
| `backgroundColor` | The line fill color. |
| `borderCapStyle` | Cap style of the line. |
| `borderColor` | The line color. |
| `borderDash` | Length and spacing of dashes. |
| `borderDashOffset` | Offset for line dashes. |
| `borderJoinStyle` | Line joint style. |
| `borderWidth` | The line width (in pixels). |
| `fill` | How to fill the area under the line. |
| `tension` | Bezier curve tension of the line. |
| `showLine` | If false, the line is not drawn for this dataset. |
| `spanGaps` | If true, lines will be drawn between points with no or null data. |

### Interactions Properties

| Name | Description |
| ---- | ---- |
| `pointHoverBackgroundColor` | Point background color when hovered. |
| `pointHoverBorderColor` | Point border color when hovered. |
| `pointHoverBorderWidth` | Border width of point when hovered. |
| `pointHoverRadius` | The radius of the point when hovered. |

### cubicInterpolationMode

Supported interpolation modes:

- `'default'`
- `'monotone'`

### Segment

Line segment styles can be overridden by scriptable options in the `segment` object. 

### Stepped

Supported values for `stepped`:

- `false`: No Step Interpolation (default)
- `true`: Step-before Interpolation
- `'before'`: Step-before Interpolation
- `'after'`: Step-after Interpolation
- `'middle'`: Step-middle Interpolation

## Default Options

Global line chart settings are stored in `Chart.overrides.line`. Changing global options affects only charts created after the change.

```javascript
Chart.overrides.line.spanGaps = true;
```

## Data Structure

All supported data structures can be used with line charts.

## Stacked Area Chart

Line charts can be configured into stacked area charts by enabling stacking on the y-axis.

```javascript
const stackedLine = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                stacked: true
            }
        }
    }
});
```

## Vertical Line Chart

To create a vertical line chart, set the `indexAxis` property to `'y'`.

```javascript
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }
};

module.exports = {
  actions: [],
  config: config,
};
```

### Config Options

Configuration options for the vertical line chart are the same as for the line chart. 

## Internal Data Format

`{x, y}`