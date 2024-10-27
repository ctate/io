# Radar Chart

A radar chart is a way of showing multiple data points and the variation between them. They are often useful for comparing the points of two or more different data sets.

```javascript
const data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
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

The radar chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset.

| Name | Type | Scriptable | Indexable | Default |
| ---- | ---- | :----: | :----: | ---- |
| `backgroundColor` | `Color` | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderCapStyle` | `string` | Yes | - | `'butt'` |
| `borderColor` | `Color` | Yes | - | `'rgba(0, 0, 0, 0.1)'` |
| `borderDash` | `number[]` | Yes | - | `[]` |
| `borderDashOffset` | `number` | Yes | - | `0.0` |
| `borderJoinStyle` | `'round'`|'bevel'|'miter' | Yes | - | `'miter'` |
| `borderWidth` | `number` | Yes | - | `3` |
| `hoverBackgroundColor` | `Color` | Yes | - | `undefined` |
| `hoverBorderCapStyle` | `string` | Yes | - | `undefined` |
| `hoverBorderColor` | `Color` | Yes | - | `undefined` |
| `hoverBorderDash` | `number[]` | Yes | - | `undefined` |
| `hoverBorderDashOffset` | `number` | Yes | - | `undefined` |
| `hoverBorderJoinStyle` | `'round'`|'bevel'|'miter' | Yes | - | `undefined` |
| `hoverBorderWidth` | `number` | Yes | - | `undefined` |
| `clip` | `number`|`object`|`false` | - | `undefined` |
| `data` | `number[]` | - | - | **required** |
| `fill` | `boolean`|`string` | Yes | - | `false` |
| `label` | `string` | - | - | `''` |
| `order` | `number` | - | - | `0` |
| `tension` | `number` | - | - | `0` |
| `pointBackgroundColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderColor` | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'` |
| `pointBorderWidth` | `number` | Yes | Yes | `1` |
| `pointHitRadius` | `number` | Yes | Yes | `1` |
| `pointHoverBackgroundColor` | `Color` | Yes | Yes | `undefined` |
| `pointHoverBorderColor` | `Color` | Yes | Yes | `undefined` |
| `pointHoverBorderWidth` | `number` | Yes | Yes | `1` |
| `pointHoverRadius` | `number` | Yes | Yes | `4` |
| `pointRadius` | `number` | Yes | Yes | `3` |
| `pointRotation` | `number` | Yes | Yes | `0` |
| `pointStyle` | `pointStyle` | Yes | Yes | `'circle'` |
| `spanGaps` | `boolean` | - | - | `undefined` |

All these values, if `undefined`, fallback to the scopes described in option resolution.

### General

| Name | Description |
| ---- | ---- |
| `clip` | How to clip relative to chartArea. Positive value allows overflow, negative value clips that many pixels inside chartArea. `0` = clip at chartArea. Clipping can also be configured per side. |
| `label` | The label for the dataset which appears in the legend and tooltips. |
| `order` | The drawing order of dataset. Also affects order for tooltip and legend. |

### Point Styling

The style of each point can be controlled with the following properties:

| Name | Description |
| ---- | ---- |
| `pointBackgroundColor` | The fill color for points. |
| `pointBorderColor` | The border color for points. |
| `pointBorderWidth` | The width of the point border in pixels. |
| `pointHitRadius` | The pixel size of the non-displayed point that reacts to mouse events. |
| `pointRadius` | The radius of the point shape. If set to 0, the point is not rendered. |
| `pointRotation` | The rotation of the point in degrees. |
| `pointStyle` | Style of the point. |

All these values, if `undefined`, fallback first to the dataset options then to the associated elements.point options.

### Line Styling

The style of the line can be controlled with the following properties:

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
| `tension` | Bezier curve tension of the line. Set to 0 to draw straight lines. |
| `spanGaps` | If true, lines will be drawn between points with no or null data. If false, points with null data will create a break in the line. |

If the value is `undefined`, the values fallback to the associated elements.line options.

### Interactions

The interaction with each point can be controlled with the following properties:

| Name | Description |
| ---- | ----------- |
| `pointHoverBackgroundColor` | Point background color when hovered. |
| `pointHoverBorderColor` | Point border color when hovered. |
| `pointHoverBorderWidth` | Border width of point when hovered. |
| `pointHoverRadius` | The radius of the point when hovered. |

## Scale Options

The radar chart supports only a single scale. The options for this scale are defined in the `scales.r` property.

```javascript
options = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 50,
            suggestedMax: 100
        }
    }
};
```

## Default Options

It is common to want to apply a configuration setting to all created radar charts. The global radar chart settings are stored in `Chart.overrides.radar`. Changing the global options only affects charts created after the change. Existing charts are not changed.

## Data Structure

The `data` property of a dataset for a radar chart is specified as an array of numbers. Each point in the data array corresponds to the label at the same index.

```javascript
data: [20, 10]
```

For a radar chart, to provide context of what each point means, we include an array of strings that show around each point in the chart.

```javascript
data: {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
        data: [20, 10, 4, 2]
    }]
}
```

## Internal data format

`{x, y}`