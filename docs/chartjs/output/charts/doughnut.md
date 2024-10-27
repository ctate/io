# Doughnut and Pie Charts

Pie and doughnut charts are commonly used charts divided into segments, where the arc of each segment shows the proportional value of each piece of data. They effectively illustrate relational proportions between data.

Pie and doughnut charts are the same class in Chart.js, differing only in their default `cutout` value: `0` for pie charts and `'50%'` for doughnuts. They are registered under two aliases in the `Chart` core.

## Doughnut Example

```js
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};

module.exports = {
  actions: [],
  config: config,
};
```

## Pie Example

```js
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'pie',
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
- `options.datasets.doughnut` - options for all doughnut datasets
- `options.datasets.pie` - options for all pie datasets
- `options.elements.arc` - options for all arc elements
- `options` - options for the whole chart

### Properties

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | Color | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `borderAlign` | 'center'|'inner' | Yes | Yes | `'center'` |
| `borderColor` | Color | Yes | Yes | `'#fff'` |
| `borderDash` | number[] | Yes | - | `[]` |
| `borderDashOffset` | number | Yes | - | `0.0` |
| `borderJoinStyle` | 'round'|'bevel'|'miter' | Yes | Yes | `undefined` |
| `borderRadius` | number|object | Yes | Yes | `0` |
| `borderWidth` | number | Yes | Yes | `2` |
| `circumference` | number | - | - | `undefined` |
| `clip` | number|object|false | - | `undefined` |
| `data` | number[] | - | - | **required** |
| `hoverBackgroundColor` | Color | Yes | Yes | `undefined` |
| `hoverBorderColor` | Color | Yes | Yes | `undefined` |
| `hoverBorderDash` | number[] | Yes | - | `undefined` |
| `hoverBorderDashOffset` | number | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | 'round'|'bevel'|'miter' | Yes | Yes | `undefined` |
| `hoverBorderWidth` | number | Yes | Yes | `undefined` |
| `hoverOffset` | number | Yes | Yes | `0` |
| `offset` | number|number[] | Yes | Yes | `0` |
| `rotation` | number | - | - | `undefined` |
| `spacing` | number | - | - | `0` |
| `weight` | number | - | - | `1` |

### General Properties

| Name | Description |
| ---- | ---- |
| `circumference` | Per-dataset override for the sweep that the arcs cover |
| `clip` | How to clip relative to chartArea |
| `rotation` | Per-dataset override for the starting angle to draw arcs from |

### Styling Properties

| Name | Description |
| ---- | ---- |
| `backgroundColor` | Arc background color |
| `borderColor` | Arc border color |
| `borderDash` | Arc border length and spacing of dashes |
| `borderDashOffset` | Arc border offset for line dashes |
| `borderJoinStyle` | Arc border join style |
| `borderWidth` | Arc border width (in pixels) |
| `offset` | Arc offset (in pixels) |
| `spacing` | Fixed arc offset (in pixels) |
| `weight` | Relative thickness of the dataset |

### Border Alignment

Supported values for `borderAlign`:

- `'center'` (default)
- `'inner'`

### Border Radius

If a number, it applies to all corners of the arc. If an object, specific properties can be defined for each corner.

### Interactions

| Name | Description |
| ---- | ----------- |
| `hoverBackgroundColor` | Arc background color when hovered |
| `hoverBorderColor` | Arc border color when hovered |
| `hoverBorderDash` | Arc border length and spacing of dashes when hovered |
| `hoverBorderDashOffset` | Arc border offset for line dashes when hovered |
| `hoverBorderJoinStyle` | Arc border join style when hovered |
| `hoverBorderWidth` | Arc border width when hovered (in pixels) |
| `hoverOffset` | Arc offset when hovered (in pixels) |

## Config Options

Customization options specific to Pie & Doughnut charts:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `cutout` | number|string | `50%` for doughnut, `0` for pie | Portion of the chart cut out of the middle |
| `radius` | number|string | `100%` | Outer radius of the chart |
| `rotation` | number | 0 | Starting angle to draw arcs from |
| `circumference` | number | 360 | Sweep to allow arcs to cover |
| `animation.animateRotate` | boolean | `true` | If true, the chart will animate in with a rotation animation |
| `animation.animateScale` | boolean | `false` | If true, will animate scaling the chart from the center outwards |

## Default Options

Default values for each Doughnut type can be changed at `Chart.overrides.doughnut`. Pie charts have similar defaults at `Chart.overrides.pie`, differing only in `cutout` being set to 0.

## Data Structure

For a pie chart, datasets must contain an array of data points (numbers). An array of labels is also needed for tooltips.

```javascript
data = {
    datasets: [{
        data: [10, 20, 30]
    }],
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
```